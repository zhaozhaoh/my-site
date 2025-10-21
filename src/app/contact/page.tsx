"use client";
import { useState } from "react";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [touched, setTouched] = useState(false); // 是否动过表单

  // 很宽松的邮箱校验：只用于演示
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const requiredOk = email.trim().length > 0 && message.trim().length > 0;
  const formOk = emailOk && requiredOk;

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();      // 先不真正提交
    setTouched(true);
    if (!formOk) return;     // 不通过就不提交
    alert("已通过本地校验（下一课做真正提交）");
  }

  return (
    <main style={{ padding: 24, maxWidth: 520 }}>
      <h1>联系我</h1>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <label>
          邮箱
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setTouched(true)}
            placeholder="you@example.com"
          />
        </label>

        {/* 邮箱提示 */}
        {touched && email.trim().length === 0 && (
          <p style={{ color: "crimson", margin: 0 }}>邮箱是必填项</p>
        )}
        {touched && email.trim().length > 0 && !emailOk && (
          <p style={{ color: "crimson", margin: 0 }}>邮箱格式不对</p>
        )}

        <label>
          留言
          <textarea
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onBlur={() => setTouched(true)}
            placeholder="想对我说的话…"
          />
        </label>
        {touched && message.trim().length === 0 && (
          <p style={{ color: "crimson", margin: 0 }}>留言是必填项</p>
        )}

        <button disabled={!formOk}>提交</button>
        {!formOk && (
          <small style={{ color: "#666" }}>请先把必填项填对再提交</small>
        )}
      </form>
    </main>
  );
}
