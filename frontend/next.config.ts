import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hips.hearstapps.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "sm.mashable.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.thedirect.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "static.toiimg.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        pathname: "/**",
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
