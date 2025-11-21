import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, // ارورهای TS رو در زمان build نادیده می‌گیره
  },
  images: {
    domains: [
      "aerius-images.s3.amazonaws.com",
      "img.youtube.com", // برای تصاویر Thumbnail
      "i.ytimg.com", // برخی URLهای دیگر Thumbnails یوتیوب
      "aerius-images.s3.amazonaws.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
};

export default nextConfig;
