import Image from "next/image";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { testimonialCompanies, testimonials, type Testimonial } from "@/content/testimonials";
import { SectionHeading } from "./SectionHeading";
import { TestimonialTabs } from "./TestimonialTabs";

type Props = { locale: Locale; dict: Dictionary };

/** Cartão do depoimento (Figma "Frame 70", nó 364:717): logo da empresa e o texto. */
function TestimonialCard({ item, locale, dict }: { item: Testimonial; locale: Locale; dict: Dictionary }) {
  const paragraphs = item.quote[locale];
  const textLang = locale === "pt-br" ? "pt-BR" : "en";
  // Versão no idioma do site; se não for o idioma em que foi escrito, avisa o leitor de tela que é tradução.
  const isTranslation = item.quoteLang !== textLang;

  return (
    <div className="flex w-full flex-col gap-6 rounded-card bg-surface-subtle p-6 sm:p-8">
      {item.logo ? (
        // eslint-disable-next-line @next/next/no-img-element -- SVG pequeno e estático, não precisa de otimização
        <img src={item.logo.src} alt={item.company} width={item.logo.width} height={item.logo.height} className="h-6 w-auto self-start" />
      ) : (
        <p className="text-[1.25rem] font-bold leading-6 tracking-[-0.02em] text-text-primary">{item.company}</p>
      )}

      <blockquote
        lang={textLang}
        aria-describedby={`testimonial-author-${item.id}`}
        className="flex flex-col gap-4 text-[clamp(1.125rem,1rem+0.4vw,1.25rem)] leading-[1.3] text-[#222]"
      >
        {paragraphs.map((paragraph, index) => (
          <p key={index}>
            {index === 0 && "“"}
            {paragraph}
            {index === paragraphs.length - 1 && "”"}
          </p>
        ))}
      </blockquote>
      {isTranslation && <p className="sr-only">{dict.a11y.originalLanguageNote}</p>}
    </div>
  );
}

/** Autor do depoimento (Figma "Frame 14788", nó 364:738): foto, nome e cargo, à direita do cartão. */
function TestimonialAuthor({ item, locale }: { item: Testimonial; locale: Locale }) {
  return (
    <p id={`testimonial-author-${item.id}`} className="flex items-center gap-4 lg:flex-col lg:items-start lg:gap-6">
      {item.author.photo && (
        <Image
          src={item.author.photo}
          alt=""
          width={128}
          height={128}
          sizes="64px"
          // Qualidade máxima: na padrão (75) a conversão para AVIF/WebP borrava o rosto. Continua leve (64px).
          quality={100}
          className="size-14 shrink-0 rounded-media object-cover lg:size-16"
        />
      )}
      <span className="flex flex-col gap-[3px]">
        <span className="text-[clamp(1.25rem,1.1rem+0.5vw,1.5rem)] font-medium leading-tight tracking-[-0.03em] text-text-primary">
          {item.author.name}
        </span>
        <span className="text-[clamp(1.0625rem,1rem+0.3vw,1.25rem)] leading-snug tracking-[-0.03em] text-text-secondary">
          {item.author.role[locale]}
        </span>
      </span>
    </p>
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

      <div data-reveal className="mt-[clamp(2.5rem,2rem+2vw,4.0625rem)]">
        <TestimonialTabs
          label={dict.a11y.testimonialsList}
          pauseLabel={dict.a11y.pauseTestimonials}
          playLabel={dict.a11y.playTestimonials}
          items={testimonialCompanies.map((company) => {
            const item = testimonials.find((t) => t.company === company);
            if (!item) return { id: company.toLowerCase(), label: company, disabled: true };
            return {
              id: item.id,
              label: item.company,
              card: <TestimonialCard item={item} locale={locale} dict={dict} />,
              aside: <TestimonialAuthor item={item} locale={locale} />,
            };
          })}
        />
      </div>
    </section>
  );
}
