import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET || "dev-only-secret-change-me";
const TOKEN_NAME = "admin_token";
const TOKEN_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export function signAdminToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_MAX_AGE });
}

export function verifyAdminToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

export async function hashPassword(plain) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(plain, salt);
}

export async function comparePassword(plain, hash) {
  return bcrypt.compare(plain, hash);
}

export const AUTH_COOKIE_NAME = TOKEN_NAME;
export const AUTH_COOKIE_MAX_AGE = TOKEN_MAX_AGE;

// Reads the admin_token cookie from a NextRequest (App Router API routes)
// and returns the decoded payload, or null if missing/invalid.
export function getAdminFromRequest(request) {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}
