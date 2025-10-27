import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   async rewrites() {
   return [
      {
        source: "/api/:path*",
        destination: "http://localhost:5000/api/v1/:path*", // your Node.js backend
      },
    ];
  },
  allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev'],
  
};

export default nextConfig;
