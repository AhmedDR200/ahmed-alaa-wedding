import { NextResponse, type NextRequest } from "next/server";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const key = process.env.IMGBB_KEY;
  if (!key) {
    return NextResponse.json(
      { error: "IMGBB_KEY env var is not set" },
      { status: 500 },
    );
  }
  let body: { image?: string };
  try {
    body = (await request.json()) as { image?: string };
  } catch {
    return NextResponse.json({ error: "invalid JSON body" }, { status: 400 });
  }
  if (!body.image) {
    return NextResponse.json(
      { error: "missing image (base64 string, no data: prefix)" },
      { status: 400 },
    );
  }

  const form = new FormData();
  form.append("image", body.image);
  const res = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, {
    method: "POST",
    body: form,
  });
  if (!res.ok) {
    return NextResponse.json(
      { error: `imgbb http ${res.status}` },
      { status: 502 },
    );
  }
  const data = (await res.json()) as {
    success?: boolean;
    data?: { url?: string };
  };
  if (!data?.success || !data.data?.url) {
    return NextResponse.json(
      { error: "imgbb bad response" },
      { status: 502 },
    );
  }
  return NextResponse.json({ url: data.data.url });
}
