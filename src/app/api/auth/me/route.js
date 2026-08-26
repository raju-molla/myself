import { NextResponse } from "next/server";
import { getAdminFromRequest } from "@/libs/auth";

// GET /api/auth/me — used by the client to check if the current admin session is valid
export async function GET(request) {
  const admin = getAdminFromRequest(request);
  if (!admin) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json({ authenticated: true, email: admin.email }, { status: 200 });
}
