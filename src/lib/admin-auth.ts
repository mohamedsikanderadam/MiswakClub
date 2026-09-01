import "server-only";
import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "mc_admin_session";
const SESSION_TTL_MS = 12 * 60 * 60 * 1000;

function password(): string {
  return process.env.ADMIN_PASSWORD ?? "";
}

function secret(): string {
  // Falling back to the password keeps local setup to a single variable while
  // still allowing an independent signing secret in production.
  return process.env.ADMIN_SESSION_SECRET || password();
}

/** The dashboard stays locked until the owner sets a password. */
export function isAdminConfigured(): boolean {
  return password().length >= 12;
}

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function verifyPassword(candidate: string): boolean {
  if (!isAdminConfigured()) return false;
  return safeEqual(candidate, password());
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

export function createSessionToken(): string {
  const payload = `${Date.now() + SESSION_TTL_MS}.${randomBytes(12).toString("base64url")}`;
  return `${payload}.${sign(payload)}`;
}

export function isValidSessionToken(token: string | undefined): boolean {
  if (!token || !isAdminConfigured()) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [expiry, nonce, signature] = parts;
  if (!safeEqual(signature, sign(`${expiry}.${nonce}`))) return false;
  const expiresAt = Number(expiry);
  return Number.isFinite(expiresAt) && expiresAt > Date.now();
}

export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  return isValidSessionToken(store.get(ADMIN_COOKIE)?.value);
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: SESSION_TTL_MS / 1000,
} as const;
