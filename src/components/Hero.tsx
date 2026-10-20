import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { profile } from "@/content/profile";
import { heroMedia } from "@/content/media";
import { MediaMarquee } from "./MediaMarquee";

type Props = { locale: Locale; dict: Dictionary };

export function Hero({ locale, dict }: Props) {
  return (
    <section aria-labelledby="hero-title" >
      <div className="container-page pt-[clamp(3rem,1.5rem+6vw,8.75rem)] pb-[clamp(3rem,1.5rem+6vw,8.75rem)]">
        <h1
          id="hero-title"
          className="max-w-[72.875rem] text-hero font-medium tracking-tight text-pretty text-text-primary"
        >
          {dict.hero.intro} <br className="max-md:hidden" />
          {dict.hero.middle} <br className="max-md:hidden" />
          {dict.hero.currently} <span className="text-text-accent">{profile.currentCompany.name}</span>
        </h1>
        <p className="mt-4 text-subhero text-text-secondary">{dict.hero.previously}</p>
      </div>

      <MediaMarquee
        items={heroMedia}
        locale={locale}
        label={dict.a11y.heroGallery}
        pauseLabel={dict.a11y.pauseMotion}
        playLabel={dict.a11y.playMotion}
      />
    </section>
  );
}
