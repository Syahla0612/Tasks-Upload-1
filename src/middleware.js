import { NextResponse } from "next/server";
import { cekBasicAuth } from "@/lib/auth";

export function middleware(request) {
  if (!process.env.ADMIN_PASSWORD) {
    return new NextResponse("ADMIN_PASSWORD belum diatur di Vercel (Settings > Environment Variables).", {
      status: 503,
    });
  }
  if (cekBasicAuth(request.headers.get("authorization"))) return NextResponse.next();

  return new NextResponse("Perlu login admin.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Admin", charset="UTF-8"' },
  });
}

export const config = { matcher: ["/admin", "/admin/:path*"] };
