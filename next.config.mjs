import { withSentryConfig } from "@sentry/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.rhcglobalbridge.com",
        pathname: "/wp-content/**",
      },
      {
        protocol: "https",
        hostname: "www.rhcglobalbridge.com",
        pathname: "/wp-content/themes/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "primary.jwwb.nl",
        pathname: "/**",
      },
    ],
  },
  // English uses no locale prefix; French uses /fr. External links sometimes
  // include an /en prefix (legacy or hand-authored). Redirect those so users
  // and crawlers land on the canonical English URL instead of a 404.
  async redirects() {
    return [
      { source: "/en", destination: "/", permanent: true },
      { source: "/en/", destination: "/", permanent: true },
      { source: "/en/:path*", destination: "/:path*", permanent: true },
    ];
  },
};

// Wrap with Sentry only when DSN is configured. The wrapper is a no-op
// at runtime if DSN is missing, but we still want to skip its build-time
// source-map upload + auth-token requirement when not in use.
const sentryEnabled = Boolean(process.env.NEXT_PUBLIC_SENTRY_DSN);

export default sentryEnabled
  ? withSentryConfig(nextConfig, {
      // Suppress Sentry CLI logs during local dev unless explicitly verbose
      silent: !process.env.SENTRY_VERBOSE,
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      authToken: process.env.SENTRY_AUTH_TOKEN,
      // Only upload source maps on Vercel/CI builds where the auth token exists
      sourcemaps: { disable: !process.env.SENTRY_AUTH_TOKEN },
      // Tunneling avoids ad-blocker false-positives on production
      tunnelRoute: "/monitoring",
      hideSourceMaps: true,
      disableLogger: true,
    })
  : nextConfig;
