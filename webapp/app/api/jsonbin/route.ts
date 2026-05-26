import { NextRequest, NextResponse } from "next/server";
import { readBin, writeBin } from "@/lib/jsonbin";

export async function GET(request: NextRequest) {
  try {
    const binId = request.nextUrl.searchParams.get("binId");
    if (!binId) {
      return NextResponse.json(
        { error: "Missing required query param: binId" },
        { status: 400 },
      );
    }

    const data = await readBin(binId);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      binId?: string;
      payload?: unknown;
    };

    if (!body.binId) {
      return NextResponse.json(
        { error: "Missing required field: binId" },
        { status: 400 },
      );
    }

    if (typeof body.payload === "undefined") {
      return NextResponse.json(
        { error: "Missing required field: payload" },
        { status: 400 },
      );
    }

    const data = await writeBin(body.binId, body.payload);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}
