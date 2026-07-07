/**
 * Neon Postgres client.
 *
 * Uses the HTTP-based @neondatabase/serverless driver so it works in Edge and
 * Node runtimes on Vercel without persistent connection pooling. The contact
 * form is the only DB consumer right now; if more tables are added, consider
 * a Drizzle/Prisma layer.
 *
 * DATABASE_URL is required in production. In dev/CI without a connection
 * string, `getSql()` returns null and callers fall back to email-only delivery
 * so the form still works without a database.
 */
import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

let cached: NeonQueryFunction<false, false> | null | undefined;

export function getSql(): NeonQueryFunction<false, false> | null {
  if (cached !== undefined) return cached;
  const url = process.env.DATABASE_URL?.trim();
  if (!url) {
    if (process.env.NODE_ENV === "production") {
      console.warn("[db] DATABASE_URL not set in production; DB writes disabled");
    }
    cached = null;
    return cached;
  }
  cached = neon(url);
  return cached;
}

/** True iff a DB connection is configured. Used to decide whether to persist. */
export function dbAvailable(): boolean {
  return Boolean(process.env.DATABASE_URL?.trim());
}
