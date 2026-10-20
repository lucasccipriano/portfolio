import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/profile";

/**
 * Crawlers de busca e de IA.
 * Confira os nomes na documentação de cada empresa antes de publicar — eles mudam.
 */
const answerEngines = [
  "OAI-SearchBot", // ChatGPT Search
  "ChatGPT-User",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
];

/**
 * Bots de treinamento de modelos. Decisão pessoal: hoje PERMITIDOS (mais chance de ser conhecido pelos modelos).
 * Para bloquear, troque `allow: "/"` por `disallow: "/"` neste grupo.
 */
const trainingBots = ["GPTBot", "ClaudeBot", "Google-Extended", "Applebot-Extended", "CCBot"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: answerEngines, allow: "/" },
      { userAgent: trainingBots, allow: "/" },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
