// src/app/layout.tsx
import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        {/* 顶部导航 */}
        <nav style={{ padding: 12, borderBottom: "1px solid #eee", display: "flex", gap: 12 }}>
          <Link href="/">首页</Link>
          <Link href="/about">关于我</Link>
          <Link href="/contact">联系我</Link>
          <Link href="/messages">留言</Link>
        </nav>

        {/* 页面内容 */}
        <div style={{ padding: 24 }}>{children}</div>
      </body>
    </html>
  );
}
