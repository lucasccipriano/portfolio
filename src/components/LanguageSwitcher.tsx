"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALE_COOKIE, locales, type Locale } from "@/i18n/config";
import { startInstantSwap, withoutLocale } from "@/lib/reveal";

type Props = { current: Locale; label: string };

const short: Record<Locale, string> = { "pt-br": "PT", en: "EN" };
const full: Record<Locale, string> = { "pt-br": "Português (Brasil)", en: "English" };
const hrefLang: Record<Locale, string> = { "pt-br": "pt-BR", en: "en" };

/**
 * Troca de idioma mantendo a página atual. A escolha fica salva por 1 ano e passa a valer sobre a localização.
 * É o único link interno com navegação do Next (os outros são <a> comuns, que recarregam a página):
 * o texto troca na hora, na mesma posição da tela e sem refazer o efeito de entrada.
 */
export function LanguageSwitcher({ current, label }: Props) {
  const pathname = usePathname() ?? `/${current}`;
  const rest = withoutLocale(pathname);

  return (
    <nav aria-label={label}>
      <ul className="flex items-center gap-1 text-body font-medium tracking-wide">
        {locales.map((locale, index) => {
          const isCurrent = locale === current;
          return (
            <li key={locale} className="flex items-center gap-1">
              {index > 0 && (
                <span aria-hidden="true" className="text-text-secondary">
                  /
                </span>
              )}
              <Link
                href={`/${locale}${rest}`}
                hrefLang={hrefLang[locale]}
                lang={hrefLang[locale]}
                aria-current={isCurrent ? "true" : undefined}
                aria-label={full[locale]}
                prefetch={false}
                scroll={false}
                onClick={() => {
                  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
                  if (!isCurrent) startInstantSwap(hrefLang[locale]);
                }}
                className="inline-flex min-h-6 min-w-6 items-center justify-center px-1 text-text-secondary underline-offset-4 hover:text-text-primary hover:underline aria-[current=true]:text-text-primary aria-[current=true]:underline"
              >
                {short[locale]}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
