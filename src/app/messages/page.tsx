// src/app/messages/page.tsx
import { getMessages } from "../../lib/messages";

export const dynamic = "force-dynamic"; // 开发期强制不缓存
export const revalidate = 0;

export default async function MessagesPage() {
  const list = await getMessages();

  return (
    <main style={{ padding: 24, maxWidth: 720 }}>
      <h1>留言列表</h1>

      {list.length === 0 ? (
        <p>暂无留言</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {list.map((m, i) => {
            const created = new Date(String((m as any).createdAt || "")).toLocaleString();
            const name = String((m as any).name ?? "Anonymous");
            const msg = String((m as any).message ?? "");
            return (
              <li
                key={String((m as any).id ?? i)}
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
