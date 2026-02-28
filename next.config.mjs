/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      // Browsers and tools often request /favicon.ico by default; serve our dynamic icon.
      { source: "/favicon.ico", destination: "/icon" },
    ];
  },
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
    ],
  },
};

export default nextConfig;
