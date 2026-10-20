export const locales = ["pt-br", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

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
  return country.toUpperCase() === "BR" ? "pt-br" : "en";
};
