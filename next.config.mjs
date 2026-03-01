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
    ],
  },
};

export default nextConfig;
