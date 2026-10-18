import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true, 
  },
};

export default nextConfig;