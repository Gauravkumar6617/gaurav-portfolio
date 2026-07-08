import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createSessionToken, COOKIE_NAME } from "@/lib/auth";

// In-memory rate limiting to slow down password guessing.
const attempts = new Map<string, { count: number; resetTime: number }>();
const WINDOW_MS = 60_000;
const MAX_ATTEMPTS = 5;

function isRateLimited(ip: string) {
  const now = Date.now();
  const existing = attempts.get(ip);
  if (!existing || now > existing.resetTime) {
    attempts.set(ip, { count: 1, resetTime: now + WINDOW_MS });
    return false;
  }
  if (existing.count >= MAX_ATTEMPTS) return true;
  existing.count++;
  return false;
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many attempts. Try again in a minute." },
      { status: 429 },
    );
  }

  const body = await request.json().catch(() => null);
  const password = typeof body?.password === "string" ? body.password : "";

  const hash = process.env.ADMIN_PASSWORD_HASH;
  if (!hash) {
    return NextResponse.json(
      { error: "Admin login is not configured" },
      { status: 500 },
    );
  }

  const valid = password.length > 0 && bcrypt.compareSync(password, hash);
  if (!valid) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const token = await createSessionToken();
  const response = NextResponse.json({ success: true });
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return response;
}
