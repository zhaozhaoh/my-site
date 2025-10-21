// app/contact/layout.tsx（仅 contact 分支是蓝）
export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <header style={{background:'#cde'}}>联系页专用导航</header>
      {children}
    </section>
  );
}
