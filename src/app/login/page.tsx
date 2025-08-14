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
import { useState,useEffect } from "react";
import { Button } from "@/components/ui/button"
import { useSearchParams } from "next/navigation";


export default function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("error") === "belum_login") {
      setMessage("Kamu belum login");
    }
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (res.ok) {
      setMessage("Login berhasil!");
      console.log("Redirecting to dashboard...");
      setTimeout(() => {
        window.location.assign("/dashboard");
      }, 1000); 
    } else {
      setMessage(data.error || "Login gagal");
    }
  };

    return (
      <Card className="w-full max-w-sm mt-10 mx-auto">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Masuk ke akun mu
        </CardDescription>
        <CardAction>
        <Button variant="link"> <a href="/register">Register Dimari</a></Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin}>
          <div className="flex flex-col gap-6">
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
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Lupa password? Klik disini
                </a>
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