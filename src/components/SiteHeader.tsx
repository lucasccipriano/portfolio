import { htmlLang, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { profile } from "@/content/profile";
import { EmailMenu } from "./EmailMenu";
import { ArrowUpRightIcon } from "./Icons";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { LisbonClock } from "./LisbonClock";
import { MenuDisclosure } from "./MenuDisclosure";
import { ScrollHeader } from "./ScrollHeader";

type Props = { locale: Locale; dict: Dictionary; isHome?: boolean };

const itemLabel = "text-body font-medium tracking-wide text-text-primary";
const itemHint = "text-caption tracking-wide text-text-secondary";
const linkBase =
  "group flex flex-col rounded-sm py-2 lg:py-0 underline-offset-4 decoration-1 [&:hover_.label]:underline";

export function SiteHeader({ locale, dict, isHome = false }: Props) {
  const home = `/${locale}`;
  // Fora da home, as âncoras apontam para as seções da home.
  const anchor = (id: string) => (isHome ? `#${id}` : `${home}#${id}`);

  return (
    <ScrollHeader className="z-40 flex h-(--header-h) items-center bg-white">
      <div className="container-page flex items-center justify-between">
        {/* Nome acessível = texto visível (WCAG 2.5.3): a vírgula escondida só separa as duas linhas na leitura. */}
        <a href={home} className="flex flex-col">
          <span className="text-brand font-bold tracking-wide text-text-primary">{profile.name}</span>
          <span className="sr-only">, </span>
          <span className="text-body tracking-wide text-text-secondary">{profile.jobTitle[locale]}</span>
        </a>

        <MenuDisclosure openLabel={dict.a11y.openMenu} closeLabel={dict.a11y.closeMenu}>
          <nav aria-label={dict.a11y.mainNav} className="lg:ml-auto lg:w-[min(100%,49.5625rem)]">
            <ul className="flex flex-col divide-y divide-border lg:flex-row lg:items-start lg:justify-between lg:divide-y-0">
              <li className="flex flex-col py-2 lg:py-0">
                <span className={itemLabel}>{dict.nav.location}</span>
                <LisbonClock
                  locale={htmlLang[locale] === "pt-BR" ? "pt-BR" : "en"}
                  timeZone={profile.location.timeZone}
                  label={dict.a11y.localTime}
                />
              </li>
              <li>
                <a href={anchor("work")} className={`${linkBase} lg:items-center`}>
                  <span className={`label ${itemLabel}`}>{dict.nav.work}</span>
                  <span className={itemHint}>
                    <span aria-hidden="true">{dict.nav.workYears}</span>
                    <span className="sr-only">2019–2026</span>
                  </span>
                </a>
              </li>
              <li>
                <a href={anchor("about")} className={linkBase}>
                  <span className={`label ${itemLabel}`}>{dict.nav.about}</span>
                </a>
              </li>
              <li>
                <a href={profile.cv.href} className={linkBase} target="_blank" rel="noopener" type="application/pdf">
                  <span className={`label ${itemLabel} inline-flex items-center`}>
                    {dict.nav.cv}
                    <ArrowUpRightIcon size={20} />
                  </span>
                  <span className={itemHint}>
                    {dict.nav.cvHint}
                    <span className="sr-only">
                      {" "}
                      (PDF{profile.cv.sizeLabel ? `, ${profile.cv.sizeLabel}` : ""}) {dict.a11y.opensInNewTab}
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <EmailMenu
                  email={profile.contact.email}
                  labels={{ ...dict.email, opensInNewTab: dict.a11y.opensInNewTab }}
                  triggerClassName={`${linkBase} cursor-pointer text-left`}
                  align="end-lg"
                >
                  <span className={`label ${itemLabel}`}>{dict.nav.contact}</span>
                </EmailMenu>
              </li>
              <li className="py-3 lg:py-0">
                <LanguageSwitcher current={locale} label={dict.nav.language} />
              </li>
            </ul>
          </nav>
        </MenuDisclosure>
      </div>
    </ScrollHeader>
  );
}
