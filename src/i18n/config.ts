export const locales = ["pt-br", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/**
 * Inglês publicado? Com `false`, o site fica só em PT-BR: o seletor PT/EN some, /en/... redireciona
 * para /pt-br/... e o inglês sai do sitemap e do hreflang. Os textos em inglês continuam no código.
 * Para reativar: troque para `true` e devolva as linhas em inglês em public/llms.txt.
 */
export const ENGLISH_ENABLED = true;

/** Idiomas publicados (os que aparecem no site, no sitemap e no seletor). */
export const activeLocales: readonly Locale[] = ENGLISH_ENABLED ? locales : ["pt-br"];

export const isActiveLocale = (value: string): value is Locale => (activeLocales as readonly string[]).includes(value);

/** Idioma de quem não tem um idioma publicado escolhido. */
export const fallbackLocale: Locale = isActiveLocale(defaultLocale) ? defaultLocale : activeLocales[0];

/** Valor usado em `<html lang>`, `hreflang` e JSON-LD (BCP 47). */
export const htmlLang: Record<Locale, string> = {
  "pt-br": "pt-BR",
  en: "en",
};

/** Usado em Open Graph (`og:locale`). */
export const ogLocale: Record<Locale, string> = {
  "pt-br": "pt_BR",
  en: "en_US",
};

/** Nome do cookie que guarda a escolha manual de idioma. */
export const LOCALE_COOKIE = "NEXT_LOCALE";

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

/** Regra pedida: visitantes no Brasil veem PT-BR, o resto do mundo vê EN. */
export const localeForCountry = (country: string | null | undefined): Locale | null => {
  if (!country) return null;
  const locale: Locale = country.toUpperCase() === "BR" ? "pt-br" : "en";
  return isActiveLocale(locale) ? locale : fallbackLocale;
};
