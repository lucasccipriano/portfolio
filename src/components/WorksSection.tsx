import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { projects } from "@/content/projects";
import { ProjectCard } from "./ProjectCard";
import { SectionHeading } from "./SectionHeading";

type Props = { locale: Locale; dict: Dictionary };

export function WorksSection({ locale, dict }: Props) {
  const countLabel =
    locale === "pt-br"
      ? `${projects.length} ${projects.length === 1 ? "projeto" : "projetos"}`
      : `${projects.length} ${projects.length === 1 ? "project" : "projects"}`;

  // Âncora "#work": o título "Works" para a 48px do topo (pula o respiro de cima da seção e desconta o
  // scroll-padding do header, que some ao ir para a âncora).
  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="container-page scroll-mt-[calc(3rem-var(--header-h)-1.5rem-var(--spacing-section))]"
    >
      <div className="pt-section pb-[clamp(4rem,3rem+3vw,8.125rem)]">
        <header data-reveal className="flex flex-col gap-2">
          <SectionHeading
            id="work-title"
            count={projects.length}
            countLabel={countLabel}
          >
            {dict.works.title}
          </SectionHeading>
          <p className="text-lead tracking-snug text-text-primary">
            {dict.works.subtitle}
          </p>
        </header>

        <ul className="mt-[clamp(3rem,2rem+3vw,5rem)] flex flex-col gap-section">
          {projects.map((project, index) => (
            <li key={project.slug} data-reveal>
              <ProjectCard
                project={project}
                locale={locale}
                dict={dict}
                divider={index < projects.length - 1}
              />
            </li>
          ))}
        </ul>
      </div>
      <div data-reveal aria-hidden="true" className="h-px bg-border" />
    </section>
  );
}
