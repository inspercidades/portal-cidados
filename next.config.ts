import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.BUILD_STANDALONE === 'false' ? undefined : 'standalone',
  async redirects() {
    return [
      {
        source: "/geoportal",
        destination: "/mapas",
        permanent: true,
      },
      {
        source: "/geoportal/:path*",
        destination: "/mapas/:path*",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [],
    // Servir imagens em formatos modernos (melhora LCP e Core Web Vitals).
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
