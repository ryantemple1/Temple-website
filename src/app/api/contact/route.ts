import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import twilio from "twilio";

/* ── Rate limiting (in-memory, resets on cold start) ── */
const submissions = new Map<string, number[]>();
const RATE_LIMIT = 5;
const RATE_WINDOW = 60 * 60 * 1000;

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

type Outcome = { ok: true } | { ok: false; reason: string } | { skipped: true; reason: string };

async function sendToSheets(payload: Record<string, string>): Promise<Outcome> {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!url) return { skipped: true, reason: "GOOGLE_SHEETS_WEBHOOK_URL not set" };
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      return { ok: false, reason: `HTTP ${res.status} ${body.slice(0, 200)}` };
    }
    const text = await res.text().catch(() => "");
    if (text && !/"?status"?\s*:\s*"?ok/i.test(text) && !/^\s*ok/i.test(text)) {
      return { ok: false, reason: `unexpected body: ${text.slice(0, 200)}` };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, reason: e instanceof Error ? e.message : String(e) };
  }
}

async function sendEmail(payload: {
  firstName: string; lastName: string; email: string; phone: string; service: string; message: string;
}): Promise<Outcome> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFICATION_EMAIL;
  if (!apiKey || !to) return { skipped: true, reason: "RESEND_API_KEY or NOTIFICATION_EMAIL not set" };
  const fromAddr = process.env.RESEND_FROM || "Temple Landscaping <onboarding@resend.dev>";
  const { firstName, lastName, email, phone, service, message } = payload;
  try {
    const result = await new Resend(apiKey).emails.send({
      from: fromAddr,
      to,
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
    });
    if (result.error) return { ok: false, reason: `${result.error.name}: ${result.error.message}` };
    return { ok: true };
  } catch (e) {
    return { ok: false, reason: e instanceof Error ? e.message : String(e) };
  }
}

async function sendSms(payload: { firstName: string; lastName: string; service: string }): Promise<Outcome> {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_PHONE_NUMBER;
  const to = process.env.OWNER_PHONE_NUMBER;
  if (!sid || !token || !from || !to) return { skipped: true, reason: "twilio env vars not set" };
  try {
    await twilio(sid, token).messages.create({
      body: `New lead: ${payload.firstName} ${payload.lastName} — ${payload.service || "General inquiry"}. Check email for details.`,
      from,
      to,
    });
    return { ok: true };
  } catch (e) {
    return { ok: false, reason: e instanceof Error ? e.message : String(e) };
  }
}

function statusOf(o: Outcome): string {
  if ("skipped" in o) return `skipped (${o.reason})`;
  if (o.ok) return "ok";
  return `failed (${o.reason})`;
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const validation = validateBody(body);

    if (!validation.valid) {
      if (validation.reason === "spam") return NextResponse.json({ success: true });
      return NextResponse.json({ error: validation.reason }, { status: 400 });
    }

    const data = validation.data;

    const [sheets, email, sms] = await Promise.all([
      sendToSheets(data),
      sendEmail(data),
      sendSms(data),
    ]);

    const sheetsStatus = statusOf(sheets);
    const emailStatus = statusOf(email);
    const smsStatus = statusOf(sms);

    console.log(
      `[contact] from=${data.email} sheets=${sheetsStatus} email=${emailStatus} sms=${smsStatus}`
    );

    const sheetsOk = "ok" in sheets && sheets.ok === true;
    const emailOk = "ok" in email && email.ok === true;
    const allCriticalFailed =
      !sheetsOk &&
      !emailOk &&
      !("skipped" in sheets) &&
      !("skipped" in email);

    if (allCriticalFailed) {
      return NextResponse.json(
        {
          error: "We received an error sending your request. Please call or text us instead.",
          integrations: { sheets: sheetsStatus, email: emailStatus, sms: smsStatus },
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      integrations: { sheets: sheetsStatus, email: emailStatus, sms: smsStatus },
    });
  } catch (err) {
    console.error("[contact] uncaught error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
