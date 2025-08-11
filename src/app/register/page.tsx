"use client"
import { Inter } from "next/font/google";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";
import { Button } from "@/components/ui/button"

export default function login() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({username, email, password })
    });

    const data = await res.json();
    if (res.ok) {
      setMessage("Register berhasil!");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000); 
    } else {
      setMessage(data.error || "Register berhasil!");
    }
  };

    return (
      <Card className="w-full max-w-sm mt-10 mx-auto">
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>
          Daftar Menuju kematian wak
        </CardDescription>
        <CardAction>
          <Button variant="link"> <a href="/login">Login Dimari</a></Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin}>
          <div className="flex flex-col gap-6">
          <div className="grid gap-2">
              <Label htmlFor="email">Username</Label>
              <Input
              type="usename"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input 
              type="text"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              />
            </div>
          </div>
          <Button type="submit" className="w-full mt-4">
          Login
        </Button>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">

        <CardDescription>
        {message && <p>{message}</p>}
        </CardDescription>
      </CardFooter>
    </Card>

    );
}