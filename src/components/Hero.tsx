import { Fragment } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { profile } from "@/content/profile";
import { heroMedia } from "@/content/media";
import { MediaMarquee } from "./MediaMarquee";
import { revealDelay } from "@/lib/reveal";
import { ExternalLink } from "./ExternalLink";

type Props = { locale: Locale; dict: Dictionary };

export function Hero({ locale, dict }: Props) {
  return (
    <section aria-labelledby="hero-title" >
      <div className="container-page pt-[clamp(3rem,1.5rem+6vw,8.75rem)] pb-[clamp(3rem,1.5rem+6vw,8.75rem)]">
        <h1
          id="hero-title"
          className="reveal-intro max-w-[72.875rem] text-hero font-medium tracking-tight text-pretty text-text-primary"
        >
          {dict.hero.intro} <br className="max-md:hidden" />
          {dict.hero.middle} <br className="max-md:hidden" />
          {dict.hero.openToWork}
        </h1>
        <p style={revealDelay(120)} className="reveal-intro mt-4 text-subhero text-text-secondary">
          {dict.hero.previously}{" "}
          {profile.previousCompanies.map((company, i, all) => (
            <Fragment key={company.name}>
              {i > 0 && (i === all.length - 1 ? ` ${dict.hero.and} ` : ", ")}
              <ExternalLink
                href={company.url}
                newTabLabel={dict.a11y.opensInNewTab}
                className="underline-offset-4 hover:text-text-primary hover:underline"
              >
                {company.name}
              </ExternalLink>
            </Fragment>
          ))}
        </p>
      </div>

      <div style={revealDelay(240)} className="reveal-intro">
      <MediaMarquee
        items={heroMedia}
        locale={locale}
        label={dict.a11y.heroGallery}
        pauseLabel={dict.a11y.pauseMotion}
        playLabel={dict.a11y.playMotion}
        enlargeLabel={dict.a11y.enlargeImage}
        closeLabel={dict.a11y.closeImage}
      />
      </div>
    </section>
  );
}
