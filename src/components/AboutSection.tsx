import Image from "next/image";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { profile } from "@/content/profile";
import { portrait, travelPhotos } from "@/content/media";
import { EmailMenu } from "./EmailMenu";
import { ExternalLink } from "./ExternalLink";
import { ArrowUpRightIcon } from "./Icons";
import { MediaMarquee } from "./MediaMarquee";
import { SectionHeading } from "./SectionHeading";
import { revealDelay } from "@/lib/reveal";

type Props = { locale: Locale; dict: Dictionary };

/** No hover, a seta diagonal (↗) gira para a horizontal (→) e anda para a direita, como no "Ver mais". */
const hoverArrow = "transition-transform duration-200 group-hover:translate-x-1 group-hover:rotate-45 group-focus-visible:translate-x-1 group-focus-visible:rotate-45";

const socialLinkClass =
  "group inline-flex min-h-6 items-center justify-end gap-2 text-body font-medium text-text-secondary underline-offset-4 hover:text-text-primary hover:underline";

export function AboutSection({ locale, dict }: Props) {
  const socials = [
    { label: "LinkedIn", href: profile.social.linkedin },
    { label: "Instagram", href: profile.social.instagram },
    { label: "Unsplash", href: profile.social.unsplash },
  ];

  return (
    <section id="about" aria-labelledby="about-title">
      <div className="container-page">
        <header data-reveal className="flex flex-col gap-4 pt-section">
          <SectionHeading id="about-title" size="title">
            {dict.about.title}
          </SectionHeading>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="flex items-center gap-2 text-lead leading-none tracking-snug text-text-secondary">
              {dict.about.subtitle}
              {/* eslint-disable-next-line @next/next/no-img-element -- SVG pequeno e decorativo */}
              <img src="/images/about/portugal-flag.svg" alt="" width={30} height={20} className="shrink-0" />
            </p>
            <ExternalLink
              href={profile.social.unsplash}
              newTabLabel={dict.a11y.opensInNewTab}
              className="group inline-flex min-h-6 items-center gap-2 text-body font-medium uppercase tracking-[-0.026em] text-text-primary underline-offset-4 hover:underline"
            >
              {dict.about.seeMore}
              <span className="sr-only"> {dict.about.seeMoreAbout} (Unsplash)</span>
              <ArrowUpRightIcon size={24} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </ExternalLink>
          </div>
        </header>
      </div>

      {/* Faixa de fotos em movimento: o retrato fica fixo e as fotos passam por trás dele. */}
      <div data-reveal style={revealDelay(120)} className="mt-14">
        <MediaMarquee
          variant="about"
          showPauseButton={false}
          items={travelPhotos}
          locale={locale}
          label={dict.a11y.travelGallery}
          pauseLabel={dict.a11y.pauseMotion}
          playLabel={dict.a11y.playMotion}
          enlargeLabel={dict.a11y.enlargeImage}
          closeLabel={dict.a11y.closeImage}
          leading={
            // Borda branca externa de 7px: a foto mantém o tamanho cheio e a borda fica por fora
            // (por isso o -ml, para a foto alinhar com a margem da página).
            <div className="-ml-[0.4375rem] shrink-0 rounded-[0.6875rem] bg-surface p-[0.4375rem]">
              <div className="relative aspect-[209/278] h-(--about-h) overflow-hidden rounded-[0.25rem]">
                <Image
                  src={portrait.src}
                  alt={portrait.alt[locale]}
                  width={portrait.width}
                  height={portrait.height}
                  // Largura real: altura do carrossel (--about-h) × 209/278.
                  sizes="(min-width: 1440px) 210px, (max-width: 533px) 145px, calc((9rem + 9vw) * 0.752)"
                  className="size-full object-cover object-bottom"
                />
              </div>
            </div>
          }
        />
      </div>

      <div className="container-page">
        <div className="flex flex-col gap-10 pt-[clamp(3rem,2rem+3vw,4.5rem)] pb-section md:flex-row md:items-center md:justify-between">
          <p data-reveal className="max-w-[46.75rem] text-lead tracking-snug text-text-primary">
            <span aria-hidden="true">— </span>
            {dict.about.bio}
          </p>
          <ul data-reveal style={revealDelay(120)} className="flex flex-col gap-1.5 md:items-end" aria-label={locale === "pt-br" ? "Contato e redes" : "Contact and profiles"}>
            <li>
              <EmailMenu
                email={profile.contact.email}
                labels={{ ...dict.email, opensInNewTab: dict.a11y.opensInNewTab }}
                triggerClassName={`${socialLinkClass} cursor-pointer`}
                align="end"
              >
                {dict.about.email}
                <ArrowUpRightIcon size={16} className={hoverArrow} />
              </EmailMenu>
            </li>
            {socials.map((item) => (
              <li key={item.label}>
                <ExternalLink href={item.href} newTabLabel={dict.a11y.opensInNewTab} className={socialLinkClass}>
                  {item.label}
                  <ArrowUpRightIcon size={16} className={hoverArrow} />
                </ExternalLink>
              </li>
            ))}
          </ul>
        </div>
        <div data-reveal aria-hidden="true" className="h-px bg-border" />
      </div>
    </section>
  );
}
