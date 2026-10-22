import Image from "next/image";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { testimonialCompanies, testimonials, type Testimonial } from "@/content/testimonials";
import { SectionHeading } from "./SectionHeading";
import { TestimonialTabs } from "./TestimonialTabs";

type Props = { locale: Locale; dict: Dictionary };

function TestimonialCard({ item, locale, dict }: { item: Testimonial; locale: Locale; dict: Dictionary }) {
  const isTranslatedContext = item.quoteLang === "pt-BR" && locale !== "pt-br";

  return (
    <figure className="flex max-w-[33.3125rem] flex-col gap-6 rounded-card bg-surface-subtle p-6">
      {item.logo ? (
        // eslint-disable-next-line @next/next/no-img-element -- SVG pequeno e estático, não precisa de otimização
        <img src={item.logo.src} alt={item.company} width={item.logo.width} height={item.logo.height} className="h-6 w-auto self-start" />
      ) : (
        <p className="text-body font-bold">{item.company}</p>
      )}

      <blockquote lang={item.quoteLang} className="flex flex-col gap-2 text-body-lg leading-[1.333] text-[#222]">
        {item.quote.map((paragraph, index) => (
          <p key={index}>
            {index === 0 && "“"}
            {paragraph}
            {index === item.quote.length - 1 && "”"}
          </p>
        ))}
      </blockquote>
      {isTranslatedContext && <p className="sr-only">{dict.a11y.originalLanguageNote}</p>}

      <figcaption className="flex items-center justify-between gap-4">
        <span className="flex flex-col">
          <span className="text-body-lg font-medium leading-normal tracking-[-0.03em] text-text-primary">{item.author.name}</span>
          <span className="text-body leading-none tracking-[-0.03em] text-text-secondary">{item.author.role[locale]}</span>
        </span>
        {item.author.photo && (
          <Image
            src={item.author.photo}
            alt=""
            width={112}
            height={112}
            sizes="56px"
            // Otimizada pelo Next (AVIF/WebP no tamanho exibido, 1x/2x); qualidade 90 para o rosto não borrar.
            quality={90}
            className="size-14 shrink-0 rounded-media object-cover"
          />
        )}
      </figcaption>
    </figure>
  );
}

export function TestimonialsSection({ locale, dict }: Props) {
  if (testimonials.length === 0) return null;

  const title = testimonials.length === 1 ? dict.testimonials.singular : dict.testimonials.title;

  return (
    <section aria-labelledby="testimonials-title" className="container-page pt-section pb-section">
      <div data-reveal>
        <SectionHeading id="testimonials-title" count={testimonials.length}>
          {title}
        </SectionHeading>
      </div>

      <div data-reveal className="mt-[clamp(3rem,2rem+3vw,5.5rem)]">
        <TestimonialTabs
          label={dict.a11y.testimonialsList}
          items={testimonialCompanies.map((company) => {
            const item = testimonials.find((t) => t.company === company);
            if (!item) return { id: company.toLowerCase(), label: company, disabled: true };
            return {
              id: item.id,
              label: item.company,
              card: <TestimonialCard item={item} locale={locale} dict={dict} />,
              aside: item.project && (
                <div className="flex flex-col gap-6">
                  <div>
                    <h3 className="text-title font-medium leading-[1.3] tracking-tight">{item.project.title[locale]}</h3>
                    <p className="text-lead font-medium tracking-tight text-text-muted">{item.project.description[locale]}</p>
                  </div>
                  {item.project.image && (
                    <Image
                      src={item.project.image.src}
                      alt={item.project.image.alt[locale]}
                      width={item.project.image.width}
                      height={item.project.image.height}
                      sizes="(min-width: 1024px) 755px, 100vw"
                      className="aspect-[755/424] w-full rounded-card bg-surface-subtle object-cover"
                    />
                  )}
                </div>
              ),
            };
          })}
        />
      </div>
    </section>
  );
}
