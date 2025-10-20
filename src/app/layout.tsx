import Link from "next/link";

export const metadata = { title: "我的站点" };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif" }}>
        <header
          style={{
            padding: "12px 16px",
            borderBottom: "1px solid #eee",
            display: "flex",
            gap: 12,
          }}
        >
          <Link href="/">首页</Link>
          <Link href="/about">关于我</Link>
        </header>
        <div>{children}</div>
      </body>
    </html>
  );
}


