/**
 * Tiny in-memory IP rate limiter for serverless functions.
 *
 * Buckets are stored in module memory, which on Vercel means per-isolate.
 * That's an OK floor for low-volume forms — abusers spamming a college
 * contact page from one IP will get throttled inside whichever isolate
 * routed them. For higher guarantees use Upstash Redis.
 */
type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

export function rateLimit(key: string, limit = 5, windowMs = 60_000): { ok: boolean; retryAfter?: number } {
  const now = Date.now();
  const b = buckets.get(key);
  if (!b || b.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true };
  }
  if (b.count >= limit) {
    return { ok: false, retryAfter: Math.ceil((b.resetAt - now) / 1000) };
  }
  b.count += 1;
  return { ok: true };
}
