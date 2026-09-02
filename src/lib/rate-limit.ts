/**
 * Fixed-window in-memory rate limiter.
 *
 * Sufficient for a single-region waitlist deployment. For multi-region or
 * high-volume traffic, swap the store for Upstash Redis / Vercel KV — the
 * call signature stays the same (see README, "Security").
 */

type Entry = { count: number; resetAt: number };

const buckets = new Map<string, Entry>();
const MAX_KEYS = 10_000;

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
};

export function rateLimit(
  key: string,
  limit = 5,
  windowMs = 60_000,
): RateLimitResult {
  const now = Date.now();

  if (buckets.size > MAX_KEYS) {
    for (const [bucketKey, entry] of buckets) {
      if (entry.resetAt <= now) buckets.delete(bucketKey);
    }
  }

  const entry = buckets.get(key);
  if (!entry || entry.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, retryAfterSeconds: 0 };
  }

  entry.count += 1;
  const allowed = entry.count <= limit;
  return {
    allowed,
    remaining: Math.max(0, limit - entry.count),
    retryAfterSeconds: allowed
      ? 0
      : Math.ceil((entry.resetAt - now) / 1000),
  };
}

/** Best-effort client IP from proxy headers. */
export function clientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return headers.get("x-real-ip") ?? "unknown";
}
