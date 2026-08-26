import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAdminToken, AUTH_COOKIE_NAME } from "@/libs/auth";

// Protects everything under /admin except the login page itself.
// If there's no valid admin JWT cookie, redirect to /admin/login.
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const admin = token ? verifyAdminToken(token) : null;

  if (!admin) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
  runtime: "nodejs", // jsonwebtoken needs Node's crypto module, not the Edge runtime
};
