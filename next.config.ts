import type { NextConfig } from "next";

const nextConfig: NextConfig = {
reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "/**", // Matches any path
      },
    ],
  },
};

export default nextConfig;
