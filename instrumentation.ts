/**
 * Next.js instrumentation entry point.
 * Loads the appropriate Sentry config for whichever runtime is starting up.
 * Only runs when NEXT_PUBLIC_SENTRY_DSN / SENTRY_DSN is configured.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config");
  }
  if (process.env.NEXT_RUNTIME === "edge") {
    await import("./sentry.edge.config");
  }
}
