import { NextResponse } from "next/server";
import { comparePassword, signAdminToken, AUTH_COOKIE_NAME, AUTH_COOKIE_MAX_AGE } from "@/libs/auth";

// POST /api/auth/login
// Validates credentials against ADMIN_EMAIL / ADMIN_PASSWORD_HASH env vars
// and sets a secure, httpOnly JWT cookie on success.
export async function POST(request) {
  try {
    const { email, password } = await request.json();

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
    console.log("Admin email:", adminEmail, "Admin password hash:", adminPasswordHash);

    if (!adminEmail || !adminPasswordHash) {
      console.error("ADMIN_EMAIL / ADMIN_PASSWORD_HASH are not configured in the environment");
      return NextResponse.json(
        { message: "Admin login is not configured on the server" },
        { status: 500 }
      );
    }

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    const emailMatches = email.trim().toLowerCase() === adminEmail.trim().toLowerCase();
    const passwordMatches = emailMatches ? await comparePassword(password, adminPasswordHash) : false;
    
    console.log("Email matches:", emailMatches, "Password matches:", adminPasswordHash);

    if (!emailMatches || !passwordMatches) {
      // Generic message — never reveal whether the email or the password was wrong.
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
    }

    const token = signAdminToken({ email: adminEmail, role: "admin" });

    const response = NextResponse.json({ message: "Logged in" }, { status: 200 });
    response.cookies.set(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: AUTH_COOKIE_MAX_AGE,
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Failed to log in", error: error.message },
      { status: 500 }
    );
  }
}
