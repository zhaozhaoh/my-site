import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ ping: "ok" });
}

export async function POST(req: Request) {
  const data = await req.json();
  console.log("server:/api/contact ->", data);
  return NextResponse.json({ ok: true });
}
