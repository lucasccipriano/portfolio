import type { MetadataRoute } from "next";
import { profile } from "@/content/profile";

/**
 * Manifest do site (atalho na tela inicial do Android / app instalado).
 * Os ícones do favicon ficam em src/app (favicon.ico, icon.svg, icon1.png, apple-icon.png)
 * e o Next.js gera as tags sozinho; os dois PNGs abaixo ficam em public/.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.name} — Product Designer`,
    short_name: profile.name,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      { src: "/web-app-manifest-192x192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/web-app-manifest-512x512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
