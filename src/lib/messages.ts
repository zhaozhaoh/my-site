import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";

type Message = {
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

export async function addMessage(input: Omit<Message, "id" | "createdAt">) {
  await ensureFile();
  const raw = await fs.readFile(DATA_PATH, "utf8");
  const list = (() => {
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed as Message[] : [];
    } catch {
      return [];
    }
  })();

  const item: Message = {
    id: randomUUID(),
    ...input,
    createdAt: new Date().toISOString(),
  };

  list.push(item);
  await fs.writeFile(DATA_PATH, JSON.stringify(list, null, 2), "utf8");
  return item;
}
  
export const getMessages = async (): Promise<Message[]> => {
  try {
    await ensureFile();
    const raw = await fs.readFile(DATA_PATH, "utf8");
    const parsed = JSON.parse(raw);
    const list = Array.isArray(parsed) ? (parsed as Message[]) : [];
    return [...list].sort((a, b) => {
      const ta = Date.parse(String(a.createdAt ?? ""));
      const tb = Date.parse(String(b.createdAt ?? ""));
      if (isNaN(ta) && isNaN(tb)) return 0;
      if (isNaN(ta)) return 1;
      if (isNaN(tb)) return -1;
      return tb - ta;
    });
  } catch {
    return [];
  }
};



