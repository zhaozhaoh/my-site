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
          <a href="/">首页</a>
          <a href="/about">关于我</a>
        </header>
        <div>{children}</div>
      </body>
    </html>
  );
}

