import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { profile } from "@/content/profile";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { EscapeToHome } from "./EscapeToHome";
import { ScrollHeader } from "../ScrollHeader";

type Props = { locale: Locale; dict: Dictionary; caseName: string };

/** Header das páginas de case (Figma "Resumido"): nome + case à esquerda, "Back to home" + Esc + idiomas à direita. */
export function CaseHeader({ locale, dict, caseName }: Props) {
  const home = `/${locale}`;

  return (
    <ScrollHeader className="z-40 flex h-(--header-h) items-center bg-white">
      <div className="container-page flex items-center justify-between gap-6">
        {/* Nome acessível = texto visível (WCAG 2.5.3): a vírgula escondida só separa as duas linhas na leitura. */}
        <a href={home} className="flex flex-col">
          <span className="whitespace-nowrap text-brand font-bold tracking-wide text-[#1b1818]">
            {profile.name}
          </span>
          <span className="sr-only">, </span>
          <span className="text-body leading-normal tracking-wide text-text-secondary">
            {caseName}
          </span>
        </a>

        <div className="flex items-center gap-[clamp(1rem,4vw,4.5rem)]">
          <a
            href={home}
            aria-keyshortcuts="Escape"
            className="group inline-flex min-h-6 items-center gap-3 rounded-sm text-body font-medium leading-normal tracking-wide text-text-primary"
          >
            <span className="whitespace-nowrap underline-offset-4 decoration-1 group-hover:underline">
              {/* No celular o rótulo encurta ("Voltar" / "Back") para caber ao lado dos idiomas. */}
              <span className="hidden sm:inline">{dict.project.backToHome}</span>
              <span className="sm:hidden" aria-hidden="true">
                {dict.project.back}
              </span>
              <span className="sr-only sm:hidden">{dict.project.backToHome}</span>
            </span>
            <kbd
              aria-hidden="true"
              className="hidden rounded-[0.375rem] border border-border px-1.5 py-0.5 font-sans text-caption leading-none font-medium text-text-secondary sm:inline-block"
            >
              Esc
            </kbd>
            <span className="sr-only">({dict.project.escHint})</span>
          </a>
          <LanguageSwitcher current={locale} label={dict.nav.language} />
        </div>
      </div>
      <EscapeToHome href={home} />
    </ScrollHeader>
  );
}
