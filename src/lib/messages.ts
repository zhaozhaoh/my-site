import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { supabaseAdmin } from '@/lib/supabase';

export type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

const DATA_PATH = path.join(process.cwd(), "data", "messages.json");

// 目的：首次调用也不报错，确保文件存在
async function ensureFile() {
  try {
    await fs.access(DATA_PATH);
  } catch {
    await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
    await fs.writeFile(DATA_PATH, "[]", "utf8");
  }
}

// 仅用于写入 DB 的输入类型（保留你原有的字段名 message）
type NewMessageInput = {
  name: string;
  email?: string;
  message: string;   // 你本地类型用的是 message 字段
  ip?: string;
  ua?: string;
  hp?: string;       // honeypot：只用于早退，不入库
};

export async function addMessage(input: NewMessageInput) {
  // ✅ 蜜罐命中：静默早退（不写库、不报错）
  if (input.hp) return;

  // 写入 Supabase（表结构是 content 列，这里把 message → content 做映射）
  const { error } = await supabaseAdmin.from('messages').insert({
    name: input.name,
    email: input.email ?? null,
    content: input.message,      // 🔁 关键：你代码里的 message → DB 的 content
    ip: input.ip ?? null,
    ua: input.ua ?? null,
    // created_at 让数据库用默认 now()
  });

  if (error) {
    // 保持抛错，交由 API 层捕获
    throw error;
  }
}

  
export const getMessages = async (): Promise<Message[]> => {
  const { data, error } = await supabaseAdmin
    .from('messages')
    .select('id,name,email,content,created_at')
    .order('created_at', { ascending: false });

  if (error) {
    // 你之前有容错就保留：读失败返回空数组
    return [];
  }

  // 映射 DB 字段 → 你现有类型字段名
  return (data ?? []).map(row => ({
    id: String(row.id),
    name: row.name ?? '',
    email: row.email ?? '',
    message: row.content ?? '',      // 🔁 content → message
    createdAt: new Date(row.created_at).toISOString(), // 🔁 created_at → createdAt
  }));
};



