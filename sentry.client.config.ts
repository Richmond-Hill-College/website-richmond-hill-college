/**
 * Sentry browser configuration.
 *
 * Initializes Sentry only when NEXT_PUBLIC_SENTRY_DSN is set, so dev runs
 * without it stay quiet. Sample rates are conservative; bump in production
 * once a baseline is established.
 */
import * as Sentry from "@sentry/nextjs";

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

if (dsn) {
  Sentry.init({
    dsn,
    environment: process.env.NEXT_PUBLIC_VERCEL_ENV ?? process.env.NODE_ENV,
    tracesSampleRate: 0.1,
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: 0.5,
    integrations: [],
  });
}
