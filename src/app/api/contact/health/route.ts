import { NextRequest, NextResponse } from "next/server";

type Status = { configured: boolean; ok: boolean; detail: string };

async function checkSheets(): Promise<Status> {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!url) return { configured: false, ok: false, detail: "GOOGLE_SHEETS_WEBHOOK_URL not set" };
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _healthCheck: true, timestamp: new Date().toISOString() }),
    });
    const text = await res.text().catch(() => "");
    if (!res.ok) return { configured: true, ok: false, detail: `HTTP ${res.status}: ${text.slice(0, 160)}` };
    return { configured: true, ok: true, detail: `HTTP ${res.status} ${text.slice(0, 80)}` };
  } catch (e) {
    return { configured: true, ok: false, detail: e instanceof Error ? e.message : String(e) };
  }
}

async function checkResend(): Promise<Status> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFICATION_EMAIL;
  if (!apiKey || !to) {
    return { configured: false, ok: false, detail: "RESEND_API_KEY or NOTIFICATION_EMAIL not set" };
  }
  try {
    const res = await fetch("https://api.resend.com/domains", {
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    if (!res.ok) {
      return { configured: true, ok: false, detail: `auth check failed: HTTP ${res.status}` };
    }
    const data = (await res.json()) as { data?: Array<{ name: string; status: string }> };
    const verified = (data.data || []).filter((d) => d.status === "verified").map((d) => d.name);
    const fromAddr = process.env.RESEND_FROM || "Temple Landscaping <onboarding@resend.dev>";
    const usingSandbox = /onboarding@resend\.dev/i.test(fromAddr);
    let detail = `notify=${to}, from=${fromAddr}, verified domains=${verified.length ? verified.join(",") : "none"}`;
    if (usingSandbox) detail += " — WARNING: sandbox sender, mail likely lands in spam";
    return { configured: true, ok: true, detail };
  } catch (e) {
    return { configured: true, ok: false, detail: e instanceof Error ? e.message : String(e) };
  }
}

async function checkTwilio(): Promise<Status> {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_PHONE_NUMBER;
  const to = process.env.OWNER_PHONE_NUMBER;
  if (!sid || !token || !from || !to) {
    return { configured: false, ok: false, detail: "twilio env vars not set" };
  }
  try {
    const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}.json`, {
      headers: { Authorization: `Basic ${Buffer.from(`${sid}:${token}`).toString("base64")}` },
    });
    if (!res.ok) return { configured: true, ok: false, detail: `auth check failed: HTTP ${res.status}` };
    return { configured: true, ok: true, detail: `from=${from}, to=${to}` };
  } catch (e) {
    return { configured: true, ok: false, detail: e instanceof Error ? e.message : String(e) };
  }
}

export async function GET(request: NextRequest) {
  const auth = request.nextUrl.searchParams.get("key");
  const expected = process.env.HEALTH_CHECK_KEY;
  if (expected && auth !== expected) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const [sheets, email, sms] = await Promise.all([checkSheets(), checkResend(), checkTwilio()]);
  const allHealthy = [sheets, email, sms].every((s) => !s.configured || s.ok);

  return NextResponse.json(
    {
      healthy: allHealthy,
      checked_at: new Date().toISOString(),
      integrations: { sheets, email, sms },
    },
    { status: allHealthy ? 200 : 503 }
  );
}
