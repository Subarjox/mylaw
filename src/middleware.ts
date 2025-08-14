import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      console.log("Token valid:", decoded);

      // Untuk debugging, jangan redirect ke /dashboard lagi
      return new NextResponse(JSON.stringify({ status: "valid", decoded }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });

    } catch (err) {
      console.log("Token invalid:", err);
      return new NextResponse(JSON.stringify({ status: "invalid" }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
  }

  return new NextResponse(JSON.stringify({ status: "no_token" }), {
    status: 401,
    headers: { "Content-Type": "application/json" }
  });
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
