import type { CSSProperties } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { profile } from "@/content/profile";
import { revealDelay } from "@/lib/reveal";
import { EmailMenu } from "./EmailMenu";
import { ExternalLink } from "./ExternalLink";

type Props = { locale: Locale; dict: Dictionary; isHome?: boolean };

/** "Obrigado" em vários idiomas (Figma "Desktop - 5"). Posições em px do frame de 1440px. */
const thanks: { text: string; lang: string; left: number; top: number; rotate: number; compact?: boolean; dir?: "rtl" }[] = [
  { text: "Thank you", lang: "en", left: 144, top: 66, rotate: 0, compact: true },
  { text: "谢谢", lang: "zh", left: 540, top: 44, rotate: 0 },
  { text: "Gracias", lang: "es", left: 798, top: 78, rotate: 4.44 },
  { text: "धन्यवाद", lang: "hi", left: 1134, top: 81, rotate: -7.13 },
  { text: "شكرًا", lang: "ar", left: 52, top: 295, rotate: 0, dir: "rtl" },
  { text: "Grazie", lang: "it", left: 312, top: 306, rotate: 4.33 },
  { text: "Merci", lang: "fr", left: 635, top: 314, rotate: -8.02 },
  { text: "Спасибо", lang: "ru", left: 923, top: 295, rotate: 4.44 },
  { text: "Danke", lang: "de", left: 1128, top: 272, rotate: 5.17 },
];

const FRAME_W = 1440;
const FRAME_H = 420;
/** Converte px do frame em unidade de container (o desenho escala junto com a largura). */
const cq = (px: number) => `${(px / FRAME_W) * 100}cqw`;

const footerLink =
  "inline-flex min-h-6 items-center text-body font-medium leading-none tracking-[-0.01em] text-text-inverse-secondary underline-offset-4 hover:text-text-inverse hover:underline";

export function ClosingFooter({ locale, dict, isHome = false }: Props) {
  const anchor = (id: string) => (isHome ? `#${id}` : `/${locale}#${id}`);
  const year = 2026;

  return (
    <footer id="contact" className="on-inverse bg-surface-inverse text-text-inverse">
      {/* Composição "OBRIGADO" — decorativa; o título real fica para leitores de tela. */}
      <h2 className="sr-only">{dict.closing.thanks}</h2>
      <div className="mx-auto max-w-[90rem] [container-type:inline-size]" aria-hidden="true">
        <div className="relative" style={{ height: cq(FRAME_H) }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- SVG vetorial do Figma, sem ganho com otimização */}
          <img
            src="/images/footer/obrigado.svg"
            alt=""
            width={1312}
            height={208}
            data-reveal
            className="absolute"
            style={{ left: cq(64), top: cq(120), width: cq(1312), height: "auto" }}
          />
          {thanks.map((item, index) => (
            <span
              key={item.lang}
              lang={item.lang}
              dir={item.dir}
              data-reveal
              className="absolute whitespace-nowrap rounded-full bg-surface-inverse-raised font-medium tracking-[-0.03em] text-text-inverse max-sm:hidden"
              style={
                {
                  left: cq(item.left),
                  top: cq(item.top),
                  fontSize: cq(32),
                  lineHeight: 0.72,
                  padding: item.compact ? `${cq(24)} ${cq(16)}` : cq(24),
                  transform: item.rotate ? `rotate(${item.rotate}deg)` : undefined,
                  // Os "obrigados" entram em cascata depois do OBRIGADO principal.
                  ...revealDelay(150 + index * 70),
                } as CSSProperties
              }
            >
              {item.text}
            </span>
          ))}
        </div>
      </div>

      <div className="container-page">
        <div data-reveal className="mx-auto mt-6 flex max-w-[38.875rem] flex-col gap-2 pb-10">
          <p className="text-subhero font-medium leading-none tracking-[-0.03em]">{dict.closing.openTo}</p>
          <p className="flex flex-col gap-1 text-body-lg leading-none text-text-inverse-secondary sm:flex-row sm:justify-between">
            <span>{profile.availability.onsite[locale]}</span>
            <span>{profile.availability.remote[locale]}</span>
          </p>
        </div>

        <div data-reveal aria-hidden="true" className="h-px bg-border-inverse" />
        <div data-reveal style={revealDelay(120)} className="flex flex-col gap-6 pt-10 pb-8">
          <div className="grid gap-10 sm:grid-cols-[1fr_auto_auto] sm:gap-x-[clamp(3rem,15vw,28rem)] lg:grid-cols-[1fr_1fr_auto]">
            <p className="flex flex-col">
              <span className="text-brand font-bold tracking-wide">{profile.name}</span>
              <span className="text-body tracking-wide text-text-inverse-secondary">{profile.jobTitle[locale]}</span>
            </p>

            <nav aria-labelledby="footer-connect">
              <h3 id="footer-connect" className="text-body-lg font-medium leading-none tracking-[-0.03em]">
                {dict.footer.connect}
              </h3>
              <ul className="mt-3 flex flex-col gap-3">
                <li>
                  <ExternalLink href={profile.social.linkedin} newTabLabel={dict.a11y.opensInNewTab} className={footerLink}>
                    LinkedIn
                  </ExternalLink>
                </li>
                <li>
                  <EmailMenu
                    email={profile.contact.email}
                    labels={{ ...dict.email, opensInNewTab: dict.a11y.opensInNewTab }}
                    triggerClassName={`${footerLink} cursor-pointer`}
                    placement="top"
                  >
                    {dict.footer.sendMessage}
                  </EmailMenu>
                </li>
              </ul>
            </nav>

            <nav aria-labelledby="footer-me">
              <h3 id="footer-me" className="text-body-lg font-medium leading-none tracking-[-0.03em]">
                {dict.footer.me}
              </h3>
              <ul className="mt-3 flex flex-col gap-3">
                <li>
                  <a href={anchor("about")} className={footerLink}>
                    {dict.nav.about}
                  </a>
                </li>
                <li>
                  <a href={profile.cv.href} target="_blank" rel="noopener" type="application/pdf" className={footerLink}>
                    {dict.footer.cvLong}
                    <span className="sr-only">
                      {" "}
                      (PDF{profile.cv.sizeLabel ? `, ${profile.cv.sizeLabel}` : ""}) {dict.a11y.opensInNewTab}
                    </span>
                  </a>
                </li>
                <li>
                  <ExternalLink href={profile.social.unsplash} newTabLabel={dict.a11y.opensInNewTab} className={footerLink}>
                    Unsplash
                  </ExternalLink>
                </li>
                <li>
                  <ExternalLink href={profile.social.instagram} newTabLabel={dict.a11y.opensInNewTab} className={footerLink}>
                    Instagram
                  </ExternalLink>
                </li>
              </ul>
            </nav>
          </div>

          <p className="text-center text-caption font-medium leading-none tracking-[-0.03em]">
            © {year} {profile.name}. {dict.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
