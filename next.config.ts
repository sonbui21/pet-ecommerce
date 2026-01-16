import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // cacheComponents: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pet-shop-21.s3.ap-southeast-1.amazonaws.com",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
