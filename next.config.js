/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Batas body Server Action (file maksimal 4 MB + sedikit ruang)
    serverActions: { bodySizeLimit: "5mb" },
  },
  // pdfjs-dist tidak butuh paket "canvas" di browser
  turbopack: {
    resolveAlias: { canvas: "./src/lib/kosong.js" },
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
};

module.exports = nextConfig;
