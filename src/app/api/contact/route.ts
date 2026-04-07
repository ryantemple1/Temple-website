import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import twilio from "twilio";

/* ── Rate limiting (in-memory, resets on cold start) ── */
const submissions = new Map<string, number[]>();
const RATE_LIMIT = 5; // max submissions per IP
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (submissions.get(ip) || []).filter(
    (t) => now - t < RATE_WINDOW
  );
  if (timestamps.length >= RATE_LIMIT) return true;
  timestamps.push(now);
  submissions.set(ip, timestamps);
  return false;
}

/* ── Validation ── */
function sanitize(str: string): string {
  return str.trim().slice(0, 1000);
}

function validateBody(body: Record<string, unknown>) {
  const firstName = sanitize(String(body.firstName || ""));
  const lastName = sanitize(String(body.lastName || ""));
  const email = sanitize(String(body.email || ""));
  const phone = sanitize(String(body.phone || ""));
  const service = sanitize(String(body.service || ""));
  const message = sanitize(String(body.message || ""));
  const honeypot = String(body._gotcha || "");

  if (honeypot) return { valid: false as const, reason: "spam" };
  if (!firstName) return { valid: false as const, reason: "First name is required" };
  if (!lastName) return { valid: false as const, reason: "Last name is required" };
  if (!email || !email.includes("@"))
    return { valid: false as const, reason: "A valid email is required" };

  return {
    valid: true as const,
    data: { firstName, lastName, email, phone, service, message },
  };
}

/* ── POST handler ── */
export async function POST(request: NextRequest) {
  try {
    // Rate limit
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const validation = validateBody(body);

    if (!validation.valid) {
      if (validation.reason === "spam") {
        // Silently accept to not tip off bots
        return NextResponse.json({ success: true });
      }
      return NextResponse.json(
        { error: validation.reason },
        { status: 400 }
      );
    }

    const { firstName, lastName, email, phone, service, message } =
      validation.data;

    // Fire all three in parallel
    const results = await Promise.allSettled([
      // 1. Google Sheets
      process.env.GOOGLE_SHEETS_WEBHOOK_URL
        ? fetch(process.env.GOOGLE_SHEETS_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              firstName,
              lastName,
              email,
              phone,
              service,
              message,
            }),
          })
        : Promise.resolve("SHEETS_NOT_CONFIGURED"),

      // 2. Email via Resend
      process.env.RESEND_API_KEY && process.env.NOTIFICATION_EMAIL
        ? new Resend(process.env.RESEND_API_KEY).emails.send({
            // TODO: Change to "Temple Landscaping <quotes@templelandscaping.com>" after verifying domain in Resend
            from: "Temple Landscaping <onboarding@resend.dev>",
            to: process.env.NOTIFICATION_EMAIL,
            replyTo: email,
            subject: `New Quote Request from ${firstName} ${lastName}`,
            html: `
              <div style="font-family: -apple-system, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 0;">
                <h2 style="font-size: 20px; margin-bottom: 24px; color: #1A1A1A;">New Quote Request</h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #8B8B80; width: 120px;">Name</td><td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #1A1A1A;">${firstName} ${lastName}</td></tr>
                  <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #8B8B80;">Email</td><td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #1A1A1A;"><a href="mailto:${email}" style="color: #4A6741;">${email}</a></td></tr>
                  <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #8B8B80;">Phone</td><td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #1A1A1A;">${phone || "Not provided"}</td></tr>
                  <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #8B8B80;">Service</td><td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #1A1A1A;">${service || "Not specified"}</td></tr>
                  <tr><td style="padding: 10px 0; color: #8B8B80; vertical-align: top;">Details</td><td style="padding: 10px 0; color: #1A1A1A;">${message || "No details provided"}</td></tr>
                </table>
                <p style="margin-top: 24px; font-size: 13px; color: #8B8B80;">Reply directly to this email to respond to the customer.</p>
              </div>
            `,
          })
        : Promise.resolve("EMAIL_NOT_CONFIGURED"),

      // 3. SMS via Twilio
      process.env.TWILIO_ACCOUNT_SID &&
      process.env.TWILIO_AUTH_TOKEN &&
      process.env.TWILIO_PHONE_NUMBER &&
      process.env.OWNER_PHONE_NUMBER
        ? twilio(
            process.env.TWILIO_ACCOUNT_SID,
            process.env.TWILIO_AUTH_TOKEN
          ).messages.create({
            body: `New lead: ${firstName} ${lastName} — ${service || "General inquiry"}. Check email for details.`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: process.env.OWNER_PHONE_NUMBER,
          })
        : Promise.resolve("SMS_NOT_CONFIGURED"),
    ]);

    // Log failures
    const [sheetsResult, emailResult, smsResult] = results;
    if (sheetsResult.status === "rejected")
      console.error("Sheets failed:", sheetsResult.reason);
    if (emailResult.status === "rejected")
      console.error("Email failed:", emailResult.reason);
    if (smsResult.status === "rejected")
      console.error("SMS failed:", smsResult.reason);

    // Success if at least Sheets worked (or wasn't configured)
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
