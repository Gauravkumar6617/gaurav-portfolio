import "server-only";
import { NextRequest } from "next/server";
import { verifySessionToken, COOKIE_NAME } from "@/lib/auth";

export async function isAdminRequest(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  return verifySessionToken(token);
}
