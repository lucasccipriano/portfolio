import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // 75 = padrão do Next; 90 = carrossel de telas (texto pequeno); 100 = máxima (Privacy e Kings Lendas).
    qualities: [75, 90, 100],
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
