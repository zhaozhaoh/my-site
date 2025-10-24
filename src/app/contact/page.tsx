"use client";

import { useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [touched, setTouched] = useState(false);

  // ===== 这就是“提交函数” onSubmit =====
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);

    // 简单校验
    const emailOk = /\S+@\S+\.\S+/.test(email);
    const msgOk = message.trim().length > 0;
    if (!emailOk || !msgOk) return;

    // 把表单以 JSON 发到 /api/contact
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({name, email, message }),
    });

    if (res.ok) {
      alert("提交成功！");
      setEmail("");
      setMessage("");
      setTouched(false);
       // 跳转到成功页
        window.location.href = "/contact/success";
    } else {
      alert("提交失败，请稍后再试");
    }
  }
  // ===== 提交函数到此结束 =====

  const emailErr = touched && !/\S+@\S+\.\S+/.test(email);
  const msgErr = touched && message.trim().length === 0;

  return (
    <main style={{ padding: 24, maxWidth: 520 }}>
      <h1>联系我</h1>

      <form onSubmit={onSubmit}>
        
        <div style={{ marginTop: 12 }}>
          <label>姓名</label><br />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setTouched(true)}
            placeholder="你的名字"
            style={{ width: "100%", padding: 8 }}
            maxLength={100}
            required
            name="name"
            id="name"
            type="text"
          />
        </div>

        <div style={{ marginTop: 12 }}>
          <label>邮箱</label><br />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setTouched(true)}
            placeholder="you@example.com"
            style={{ width: "100%", padding: 8 }}
          />
          {emailErr && <div style={{ color: "red" }}>请输入有效邮箱</div>}
        </div>

        <div style={{ marginTop: 12 }}>
          <label>留言</label><br />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onBlur={() => setTouched(true)}
            placeholder="想说的话…"
            rows={4}
            style={{ width: "100%", padding: 8 }}
          />
          {msgErr && <div style={{ color: "red" }}>留言不能为空</div>}
        </div>

        <button type="submit" style={{ marginTop: 12, padding: "8px 16px" }}>
          提交
        </button>
      </form>
    </main>
  );
}
