import type { MetadataRoute } from "next";
import { activeLocales, htmlLang } from "@/i18n/config";
import { siteUrl } from "@/content/profile";
import { projects } from "@/content/projects";

/** Data real da última alteração de conteúdo da home. Atualize ao mudar o texto. */
const HOME_UPDATED = "2026-10-20";

const alternates = (path: string) => ({
  languages: Object.fromEntries(activeLocales.map((l) => [htmlLang[l], `${siteUrl}/${l}${path}`])),
});

export default function sitemap(): MetadataRoute.Sitemap {
  const home = activeLocales.map((l) => ({
    url: `${siteUrl}/${l}`,
    lastModified: HOME_UPDATED,
    alternates: alternates(""),
  }));

  const work = projects.flatMap((p) =>
    activeLocales.map((l) => ({
      url: `${siteUrl}/${l}/work/${p.slug}`,
      lastModified: p.dateModified,
      alternates: alternates(`/work/${p.slug}`),
    })),
  );

  return [...home, ...work];
}
