import { addMessage } from "@/lib/messages";

import { ContactSchema } from "@/lib/contactSchema";

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ ping: "ok" });
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const parsed = ContactSchema.safeParse(data);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, errors: parsed.error.flatten() },
        { status: 400 }
      );
    }

    // 反垃圾：honeypot 被填则不继续处理，但返回成功
    if (parsed.data.hp) {
      return NextResponse.json({ ok: true, spam: true });
    }

     // 4) 写入文件 data/messages.json
    const saved = await addMessage({
      name: parsed.data.name,
      email: parsed.data.email,
      message: parsed.data.message,
    });

    // 5) 返回写入后的记录（含 id / createdAt）
    return NextResponse.json({ ok: true, data: saved });
  } catch {
    // JSON 解析失败等异常
    return NextResponse.json(
      { ok: false, message: "Invalid JSON" },
      { status: 400 }
    );
  }
}