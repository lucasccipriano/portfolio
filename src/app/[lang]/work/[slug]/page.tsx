import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { hasLocale, htmlLang, activeLocales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getProject, projects } from "@/content/projects";
import { profile } from "@/content/profile";
import { baseOpenGraph, localizedAlternates } from "@/lib/metadata";
import { projectGraph } from "@/lib/structured-data";
import { SiteHeader } from "@/components/SiteHeader";
import { ClosingFooter } from "@/components/ClosingFooter";
import { JsonLd } from "@/components/JsonLd";
import { ArrowRightIcon } from "@/components/Icons";
import { CaseStudy } from "@/components/case/CaseStudy";
import { CaseHeader } from "@/components/case/CaseHeader";
import { getCase } from "@/content/cases";
import { LockedCase } from "@/components/case/LockedCase";

/**
 * Página toda depende do slug, e todos os slugs são gerados no build (generateStaticParams):
 * a navegação pode esperar a página pronta, sem estado de carregamento parcial.
 */
export const instant = false;

export async function generateStaticParams() {
  return activeLocales.flatMap((lang) => projects.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/work/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const project = getProject(slug);
  if (!hasLocale(lang) || !project) return {};
  // Case protegido: só a tela de desbloqueio, fora dos buscadores.
  if (project.locked) {
    return { title: project.title[lang], robots: { index: false, follow: false } };
  }
  return {
    title: project.title[lang],
    description: project.summary[lang],
    alternates: localizedAlternates(lang, `/work/${project.slug}`),
    openGraph: {
      ...baseOpenGraph(lang),
      type: "article",
      title: project.title[lang],
      description: project.summary[lang],
      url: `/${lang}/work/${project.slug}`,
      publishedTime: project.datePublished,
      modifiedTime: project.dateModified,
      authors: [profile.name],
      images: [{ url: project.cover.src, width: project.cover.width, height: project.cover.height, alt: project.cover.alt[lang] }],
    },
  };
}

export default async function ProjectPage({ params }: PageProps<"/[lang]/work/[slug]">) {
  const { lang, slug } = await params;
  const project = getProject(slug);
  if (!hasLocale(lang) || !project) notFound();
  const dict = getDictionary(lang);

  // Case protegido por senha: tela inteira de desbloqueio (header com Voltar/Esc, sem rodapé).
  if (project.locked) {
    return (
      <>
        <CaseHeader locale={lang} dict={dict} caseName={project.shortTitle[lang]} />
        <main id="main" tabIndex={-1} className="focus:outline-none">
          <LockedCase
            locale={lang}
            logo={{ src: project.cover.src, width: project.cover.width, height: project.cover.height, alt: project.cover.alt[lang] }}
          />
        </main>
      </>
    );
  }

  const caseStudy = getCase(project.slug);
  const date = new Intl.DateTimeFormat(htmlLang[lang], { dateStyle: "long", timeZone: "UTC" });

  const facts = [
    { term: dict.project.company, value: project.company },
    { term: dict.project.role, value: project.facts.role[lang] },
    { term: dict.project.period, value: `${project.period.start} – ${project.period.end}` },
    { term: dict.project.platforms, value: project.facts.platforms[lang] },
    { term: dict.project.team, value: project.facts.team[lang].join(", ") },
  ];

  return (
    <>
      {caseStudy ? (
        <CaseHeader locale={lang} dict={dict} caseName={project.shortTitle[lang]} />
      ) : (
        <SiteHeader locale={lang} dict={dict} />
      )}
      <main id="main" tabIndex={-1} className="focus:outline-none">
        {caseStudy ? (
          <CaseStudy project={project} content={caseStudy.content[lang]} folder={caseStudy.folder} locale={lang} />
        ) : (
        <article className="container-page pt-[clamp(2rem,1rem+4vw,5rem)] pb-section">
          <nav aria-label="Breadcrumb" className="mb-8">
            <a
              href={`/${lang}#work`}
              className="inline-flex min-h-6 items-center gap-2 text-body font-medium text-text-secondary underline-offset-4 hover:text-text-primary hover:underline"
            >
              <ArrowRightIcon size={16} className="rotate-180" />
              {dict.project.backToWork}
            </a>
          </nav>

          <header className="flex flex-col gap-6">
            <p className="text-body uppercase tracking-wide text-text-secondary">
              {project.company} · {project.category[lang]}
            </p>
            <h1 className="max-w-[20em] text-hero font-medium tracking-tight">{project.title[lang]}</h1>
          </header>

          {/* Bloco-resumo: o trecho mais "citável" da página. */}
          <section aria-labelledby="summary-title" className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,40rem)_minmax(0,1fr)] lg:gap-24">
            <div>
              <h2 id="summary-title" className="sr-only">
                {dict.project.summaryTitle}
              </h2>
              <p className="text-lead text-text-primary">{project.summary[lang]}</p>
              <p className="mt-6 text-body text-text-secondary">
                {dict.project.published} <time dateTime={project.datePublished}>{date.format(new Date(project.datePublished))}</time>
                {project.dateModified !== project.datePublished && (
                  <>
                    {" · "}
                    {dict.project.updated} <time dateTime={project.dateModified}>{date.format(new Date(project.dateModified))}</time>
                  </>
                )}
              </p>
            </div>
            <dl className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-3 self-start text-body">
              {facts.map((fact) => (
                <div key={fact.term} className="contents">
                  <dt className="text-text-secondary">{fact.term}</dt>
                  <dd className="text-text-primary">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <div className="mt-12 overflow-hidden bg-surface-placeholder max-lg:-mx-gutter">
            <Image
              src={project.cover.src}
              alt={project.cover.alt[lang]}
              width={project.cover.width}
              height={project.cover.height}
              sizes="(min-width: 1440px) 1312px, 100vw"
              loading="eager"
              fetchPriority="high"
              className="w-full object-cover"
            />
          </div>

          <p className="mt-12 max-w-[40rem] text-body-lg text-text-secondary">{dict.project.fullCaseSoon}</p>
        </article>
        )}
      </main>
      <ClosingFooter locale={lang} dict={dict} />
      <JsonLd data={projectGraph(project, lang)} />
    </>
  );
}
