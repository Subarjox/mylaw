"use client"
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { useState } from "react";

export default function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (res.ok) {
      setMessage("Login berhasil!");
      window.location.href = "/login";
    } else {
      setMessage(data.error || "Login gagal");
    }
  };

    return (
        <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          /><br /><br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          /><br /><br />
          <button type="submit">Login</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    );
}