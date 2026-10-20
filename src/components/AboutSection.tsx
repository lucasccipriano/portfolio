import Image from "next/image";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { profile } from "@/content/profile";
import { portrait, travelPhotos } from "@/content/media";
import { ExternalLink } from "./ExternalLink";
import { ArrowUpRightIcon, FlagPortugal } from "./Icons";
import { SectionHeading } from "./SectionHeading";

type Props = { locale: Locale; dict: Dictionary };

const socialLinkClass =
  "inline-flex min-h-6 items-center justify-end gap-2 text-body font-medium text-text-secondary underline-offset-4 hover:text-text-primary hover:underline";

export function AboutSection({ locale, dict }: Props) {
  const socials = [
    { label: dict.about.email, href: `mailto:${profile.contact.email}`, external: false },
    { label: "LinkedIn", href: profile.social.linkedin, external: true },
    { label: "Instagram", href: profile.social.instagram, external: true },
    { label: "Unsplash", href: profile.social.unsplash, external: true },
  ];

  return (
    <section id="about" aria-labelledby="about-title">
      <div className="container-page">
        <header className="flex flex-col gap-4 pt-section">
          <SectionHeading id="about-title" size="title">
            {dict.about.title}
          </SectionHeading>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="flex items-center gap-2 text-lead leading-none tracking-snug text-text-secondary">
              {dict.about.subtitle}
              <FlagPortugal className="shrink-0" />
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

      {/* Faixa de fotos: rola na horizontal, inclusive pelo teclado (região focável). */}
      <div
        role="region"
        aria-label={dict.a11y.travelGallery}
        tabIndex={0}
        className="mx-auto mt-14 max-w-[90rem] overflow-x-auto overscroll-x-contain pb-2 [scrollbar-width:thin] focus-visible:outline-offset-[-2px]"
      >
        <ul className="flex w-max items-center gap-4 pl-gutter pr-gutter sm:gap-6">
          <li className="relative h-[clamp(12rem,9rem+9vw,17.375rem)] shrink-0 overflow-hidden rounded-[0.6875rem] border-[0.4375rem] border-surface aspect-[209/278]">
            <Image
              src={portrait.src}
              alt={portrait.alt[locale]}
              width={portrait.width}
              height={portrait.height}
              sizes="210px"
              className="size-full object-cover object-bottom"
            />
          </li>
          {travelPhotos.map((photo) => (
            <li
              key={photo.src}
              className="relative h-[clamp(12rem,9rem+9vw,17.375rem)] shrink-0 overflow-hidden rounded-card bg-surface-placeholder"
              style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
            >
              <Image
                src={photo.src}
                alt={photo.alt[locale]}
                width={photo.width}
                height={photo.height}
                sizes="500px"
                className="size-full object-cover"
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="container-page">
        <div className="flex flex-col gap-10 border-b border-border pt-[clamp(3rem,2rem+3vw,4.5rem)] pb-section md:flex-row md:items-center md:justify-between">
          <p className="max-w-[46.75rem] text-lead tracking-snug text-text-primary">
            <span aria-hidden="true">— </span>
            {dict.about.bio}
          </p>
          <ul className="flex flex-col gap-1.5 md:items-end" aria-label={locale === "pt-br" ? "Contato e redes" : "Contact and profiles"}>
            {socials.map((item) => (
              <li key={item.label}>
                {item.external ? (
                  <ExternalLink href={item.href} newTabLabel={dict.a11y.opensInNewTab} className={socialLinkClass}>
                    {item.label}
                    <ArrowUpRightIcon size={16} />
                  </ExternalLink>
                ) : (
                  <a href={item.href} className={socialLinkClass}>
                    {item.label}
                    <ArrowUpRightIcon size={16} />
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
