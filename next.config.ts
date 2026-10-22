import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // 75 = padrão do Next; 90 = carrossel de telas (texto pequeno); 100 = máxima (Privacy e Kings Lendas).
    qualities: [75, 90, 100],
    // Larguras geradas para telas grandes. 980/1960 = cards do carrossel do topo (970px no desktop, 1x e 2x):
    // sem elas o navegador baixava a versão de 1080px para um espaço de 970px.
    deviceSizes: [640, 750, 828, 980, 1080, 1200, 1920, 1960, 2048, 3840],
  },
  // Cabeçalhos de segurança (Lighthouse › Práticas recomendadas): sem iframe de outros sites (clickjacking),
  // janela isolada de outras origens, sem "adivinhar" tipo de arquivo e sem vazar o caminho completo ao sair do site.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
  partialPrefetching: true,
  experimental: {
    // CSS no próprio HTML (<style>) em vez de um arquivo à parte: some a requisição que bloqueava
    // a renderização e o encadeamento HTML → CSS (Lighthouse). Com Tailwind o CSS é pequeno (~11 KB).
    inlineCss: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
