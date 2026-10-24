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
    // Next 16 só permite quality 75 por padrão. O header usa 100 nas logos.
    qualities: [75, 100],
  },
};

export default nextConfig;
