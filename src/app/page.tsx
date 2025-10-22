"use client";              // ← 声明这是客户端组件
import { useState } from "react";

export default function Home() {
  const [n, setN] = useState(0);     // 状态：数字 n
  return (
    <main style={{ padding: 24 }}>
      <h1>空心的爱</h1>
      <p>下面是一个客户端计数器：</p>
      <button onClick={() => setN(n + 1)}>点我 +1（{n}）</button>
    </main>
  );
}