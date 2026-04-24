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

export default nextConfig;
