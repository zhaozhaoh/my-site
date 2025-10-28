// src/app/messages/page.tsx
import { getMessages } from "../../lib/messages";
import type { Message } from "../../lib/messages";

export const dynamic = "force-dynamic";
function formatTime(input: unknown) {
  const d = new Date(String(input ?? ""));
  if (isNaN(d.getTime())) return "未知时间";
  const now = new Date();
  const isToday =
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate();
  const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
  const hm = `${pad(d.getHours())}:${pad(d.getMinutes())}`;
  return isToday ? `今天 ${hm}` : `${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${hm}`;
}


export const revalidate = 0;

export default async function MessagesPage() {
  const list: Message[] = await getMessages(); // 明确类型

  return (
    <main style={{ padding: 24, maxWidth: 720 }}>
      <h1>留言列表</h1>

      {list.length === 0 ? (
        <p>暂无留言</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {list.map((m, i) => {
            const created = formatTime(m.createdAt);
            const name = String(m.name ?? "Anonymous");
            const msg = String(m.message ?? "");
            const key = m.id ?? String(i);
            return (
              <li
                key={key}
                style={{ borderBottom: "1px solid #eee", padding: "12px 0" }}
              >
                <div style={{ fontSize: 12, opacity: 0.7 }}>{created}</div>
                <div style={{ fontWeight: 600 }}>{name}</div>
                <div>{msg}</div>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
