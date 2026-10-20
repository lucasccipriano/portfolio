import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { profile } from "@/content/profile";
import { baseOpenGraph, localizedAlternates } from "@/lib/metadata";
import { homeGraph } from "@/lib/structured-data";
import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { WorksSection } from "@/components/WorksSection";
import { AboutSection } from "@/components/AboutSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ClosingFooter } from "@/components/ClosingFooter";
import { JsonLd } from "@/components/JsonLd";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = getDictionary(lang);
  return {
    title: { absolute: dict.meta.homeTitle },
    description: profile.description[lang],
    alternates: localizedAlternates(lang),
    openGraph: {
      ...baseOpenGraph(lang),
      type: "profile",
      title: dict.meta.homeTitle,
      description: profile.description[lang],
      url: `/${lang}`,
      firstName: "Lucas",
      lastName: "Cipriano",
    },
  };
}

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <>
      <SiteHeader locale={lang} dict={dict} isHome />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Hero locale={lang} dict={dict} />
        <WorksSection locale={lang} dict={dict} />
        <AboutSection locale={lang} dict={dict} />
        <TestimonialsSection locale={lang} dict={dict} />
      </main>
      <ClosingFooter locale={lang} dict={dict} isHome />
      <JsonLd data={homeGraph(lang)} />
    </>
  );
}
