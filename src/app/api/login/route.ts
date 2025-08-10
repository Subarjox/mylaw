import { db } from "@/app/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { RowDataPacket } from "mysql2";

interface User extends RowDataPacket {
    id: number;
    email: string;
    password: string;
  }
  
  export async function POST(req: Request) {
    try {
      const { email, password } = await req.json();
  
      const [rows] = await db.query<User[]>(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );
  
      const user = rows[0];
      if (!user) {
        return Response.json({ error: "User not found" }, { status: 404 });
      }
  
      if (!user.password) {
        return Response.json({ error: "Password not set" }, { status: 400 });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return Response.json({ error: "Invalid credentials" }, { status: 401 });
      }
  
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET!,
        { expiresIn: "1h" }
      );
  
      return new Response(JSON.stringify({ message: "Login successful" }), {
        status: 200,
        headers: {
          "Set-Cookie": `token=${token}; HttpOnly; Path=/; Max-Age=3600`,
          "Content-Type": "application/json"
        }
      });
  
    } catch (error) {
      console.error(error);
      return Response.json({ error: "Server error" }, { status: 500 });
    }
  }
  