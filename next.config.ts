import type { NextConfig } from "next";

// Quando o Payload entrar, este arquivo passa a ser embrulhado por
// `withPayload(...)` de `@payloadcms/next/withPayload`. Nada mais muda aqui.
const nextConfig: NextConfig = {
  reactStrictMode: true,

  // As fotos vêm de `public/assets/`, servidas como arquivo estático. Quando o
  // Payload assumir a mídia, as URLs passam a sair do banco e é aqui que entra
  // o `remotePatterns` do domínio de upload.
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
