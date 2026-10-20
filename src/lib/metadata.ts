import type { Metadata } from "next";
import { htmlLang, locales, ogLocale, type Locale } from "@/i18n/config";
import { profile, siteUrl } from "@/content/profile";

/**
 * Canonical + hreflang para uma página que existe nos dois idiomas.
 * `path` é o caminho sem o prefixo de idioma, ex.: "" (home) ou "/work/nos-tv-onboarding".
 * O x-default aponta para a raiz, que escolhe o idioma por país.
 */
export function localizedAlternates(locale: Locale, path = ""): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[htmlLang[l]] = `${siteUrl}/${l}${path}`;
  languages["x-default"] = path ? `${siteUrl}/en${path}` : `${siteUrl}/`;
  return { canonical: `${siteUrl}/${locale}${path}`, languages };
}

export function baseOpenGraph(locale: Locale): NonNullable<Metadata["openGraph"]> {
  return {
    siteName: profile.name,
    locale: ogLocale[locale],
    alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
  };
}
