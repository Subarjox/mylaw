import { db } from "@/app/lib/db";
import { RowDataPacket } from "mysql2";

    export async function GET() {
        try {
          const [rows] = await db.query<RowDataPacket[]>(
            "SELECT p.*, u.username FROM product p JOIN user u ON p.id_user = u.id_user"
          );
          return Response.json(rows);
        } catch (err) {
          console.error(err);
          return Response.json({ error: "Gagal mengambil data produk" }, { status: 500 });
        }
      }