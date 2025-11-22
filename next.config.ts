import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   async rewrites() {
   return [
      {
        source: "/api/:path*",
        destination: "/api/:path*", 
      },
    ];
  },
  // async redirects() {

  // },
  allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev'],
  
};

export default nextConfig;
