import { NextResponse, type NextRequest } from "next/server";
import { activeLocales, fallbackLocale, isActiveLocale, LOCALE_COOKIE, localeForCountry, locales, type Locale } from "@/i18n/config";

/**
 * Escolhe o idioma de quem chega sem idioma na URL (ex.: "/" ou "/work/x").
 *
 * Ordem de decisão:
 * 1. Escolha manual salva no cookie (seletor PT/EN do header).
 * 2. País da requisição, informado pela hospedagem: Brasil → PT-BR, resto → EN.
 *    Vercel: `x-vercel-ip-country`. Cloudflare: `cf-ipcountry`.
 * 3. Sem país (ex.: rodando local): idioma do navegador (pt-BR → PT-BR).
 * 4. Padrão: EN.
 *
 * As rotas /pt-br e /en nunca são redirecionadas, então buscadores e IAs
 * conseguem rastrear as duas versões (ligadas por hreflang).
 */
function pickLocale(request: NextRequest): Locale {
  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  if (saved && isActiveLocale(saved)) return saved;

  const country = request.headers.get("x-vercel-ip-country") ?? request.headers.get("cf-ipcountry");
  const byCountry = localeForCountry(country);
  if (byCountry) return byCountry;

  const acceptLanguage = request.headers.get("accept-language")?.toLowerCase() ?? "";
  if (/(^|,)\s*pt-br\b/.test(acceptLanguage) && isActiveLocale("pt-br")) return "pt-br";

  return fallbackLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const prefix = locales.find((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`));
  if (prefix && activeLocales.includes(prefix)) return;

  // Idioma oculto (ex.: inglês desligado em ENGLISH_ENABLED): leva para a mesma página no idioma publicado.
  // 307 (temporário), porque o idioma volta a ser publicado depois.
  if (prefix) {
    const url = request.nextUrl.clone();
    url.pathname = `/${fallbackLocale}${pathname.slice(prefix.length + 1)}`;
    return NextResponse.redirect(url, 307);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${pickLocale(request)}${pathname === "/" ? "" : pathname}`;

  const response = NextResponse.redirect(url, 307);
  // A resposta depende de quem pede (país/cookie): nunca guardar em cache compartilhado.
  response.headers.set("Cache-Control", "private, no-store");
  response.headers.set("Vary", "Cookie, Accept-Language");
  return response;
}

export const config = {
  matcher: [
    // Tudo, menos arquivos internos, arquivos com extensão (imagens, fontes, robots.txt, sitemap.xml, llms.txt…)
    "/((?!_next|api|.*\\..*).*)",
  ],
};
