import { db } from "@/app/lib/db";
import bcrypt from "bcryptjs";
import { RowDataPacket, ResultSetHeader } from "mysql2";

interface User extends RowDataPacket {
  id_user: number;
  username: string;
  email: string;
  password: string;
}

export async function POST(req: Request) {
  try {
    const {username, email, password } = await req.json();
    const [rows] = await db.query<User[]>(
      "SELECT * FROM user WHERE email = ?",
      [email]
    );

    if (rows.length > 0) {
      return Response.json({ error: "Email sudah digunakan" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query<ResultSetHeader>(
      "INSERT INTO user (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );

    return Response.json(
      { message: "Registrasi berhasil", id: result.insertId },
      { status: 201 }
    );

  } catch (err) {
    console.error("Error terjadi :", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
