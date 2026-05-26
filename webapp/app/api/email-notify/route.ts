import { NextResponse, type NextRequest } from "next/server";

export const runtime = "nodejs";

type Body = {
  recipient: "ahmed" | "alaa";
  from: "ahmed" | "alaa";
  time: string;
};

export async function POST(request: NextRequest) {
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;
  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_ID;
  const ahmedEmail = process.env.AHMED_EMAIL;
  const alaaEmail = process.env.ALAA_EMAIL;

  if (!publicKey || !serviceId || !templateId || !ahmedEmail || !alaaEmail) {
    return NextResponse.json(
      { error: "EmailJS env vars are not configured" },
      { status: 500 },
    );
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "invalid JSON body" }, { status: 400 });
  }
  if (
    !body.recipient ||
    !body.from ||
    (body.recipient !== "ahmed" && body.recipient !== "alaa") ||
    (body.from !== "ahmed" && body.from !== "alaa")
  ) {
    return NextResponse.json({ error: "invalid payload" }, { status: 400 });
  }

  const toEmail = body.recipient === "ahmed" ? ahmedEmail : alaaEmail;
  const toName = body.recipient === "ahmed" ? "Ahmed" : "Alaa";
  const fromName = body.from === "ahmed" ? "Ahmed" : "Alaa";

  const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        to_email: toEmail,
        to_name: toName,
        from_name: fromName,
        time: body.time,
      },
    }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    return NextResponse.json(
      { error: `emailjs http ${res.status}`, detail: text.slice(0, 200) },
      { status: 502 },
    );
  }
  return NextResponse.json({ ok: true });
}
