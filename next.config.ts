import type { NextConfig } from "next";

// Quando o Payload entrar, este arquivo passa a ser embrulhado por
// `withPayload(...)` de `@payloadcms/next/withPayload`. Nada mais muda aqui.
const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Liga `app/global-not-found.tsx`, a 404 de endereço que não existe em
  // lugar nenhum (`/xyz`). O Next ainda marca isto como experimental.
  experimental: {
    globalNotFound: true,
  },

  // As fotos vêm de `public/assets/`, servidas como arquivo estático. Quando o
  // Payload assumir a mídia, as URLs passam a sair do banco e é aqui que entra
  // o `remotePatterns` do domínio de upload.
  images: {
    formats: ["image/avif", "image/webp"],
  },

  // Desde 01/10 a V2 é o que /, /sobre, /pecas etc. servem (ver os `page.tsx`
  // dessas pastas, que viraram reexportação de `v2/*`). Quem ainda tiver um
  // link ou favorito em /v2/algo cai no endereço limpo correspondente.
  // `permanent: false` de propósito: ainda dá pra desfazer essa decisão sem
  // brigar com cache de navegador por redirecionamento permanente.
  async redirects() {
    return [
      { source: "/v2", destination: "/", permanent: false },
      { source: "/v2/sobre", destination: "/sobre", permanent: false },
      { source: "/v2/pecas", destination: "/pecas", permanent: false },
      {
        source: "/v2/pecas/:slug",
        destination: "/pecas/:slug",
        permanent: false,
      },
      {
        source: "/v2/exposicoes",
        destination: "/exposicoes",
        permanent: false,
      },
      {
        source: "/v2/onde-encontrar",
        destination: "/onde-encontrar",
        permanent: false,
      },
      { source: "/v2/contato", destination: "/contato", permanent: false },
    ];
  },
};

export default nextConfig;
