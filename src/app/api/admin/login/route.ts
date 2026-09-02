import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  createSessionToken,
  isAdminConfigured,
  sessionCookieOptions,
  verifyPassword,
} from "@/lib/admin-auth";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const limit = rateLimit(`admin-login:${clientIp(request.headers)}`, 5, 300_000);
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many attempts. Try again later." },
      { status: 429 },
    );
  }

  if (!isAdminConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Admin access is not configured." },
      { status: 503 },
    );
  }

  let candidate = "";
  try {
    const body = (await request.json()) as { password?: unknown };
    candidate = typeof body.password === "string" ? body.password : "";
  } catch {
    candidate = "";
  }

  if (!verifyPassword(candidate)) {
    return NextResponse.json(
      { ok: false, error: "Incorrect password." },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, createSessionToken(), sessionCookieOptions);
  return response;
}
