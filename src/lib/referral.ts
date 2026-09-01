import { randomBytes } from "node:crypto";
import { siteConfig } from "@/config/site";

/** Unambiguous alphabet: no O/0, I/1 confusion. */
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

/** Cryptographically random referral code — never derived from database ids. */
export function generateReferralCode(length = 8): string {
  const bytes = randomBytes(length);
  let code = "";
  for (const byte of bytes) code += ALPHABET[byte % ALPHABET.length];
  return code;
}

export function referralUrl(code: string, baseUrl = siteConfig.url): string {
  return `${baseUrl.replace(/\/$/, "")}/?ref=${code}`;
}
