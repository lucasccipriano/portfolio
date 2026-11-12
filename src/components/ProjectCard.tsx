import Image from "next/image";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Project } from "@/content/projects";
import { ComingSoonCursor } from "./ComingSoonCursor";
import { HoverVideo } from "./HoverVideo";
import { ArrowRightIcon } from "./Icons";

type Props = {
  project: Project;
  locale: Locale;
  dict: Dictionary;
  headingLevel?: "h3" | "h2";
  /** Linha fina (#eee) no fim da coluna de texto, separando do próximo case (Figma "Line 2", nó 352:1726). Só a partir de 1024px. */
  divider?: boolean;
};

/**
 * Card de projeto (Figma "Frame 62").
 * O card inteiro é clicável por um único link no título (padrão "stretched link"),
 * para não repetir dois links iguais para quem navega pelo teclado.
 * Case bloqueado (`locked`): ainda sem link, com "Em breve" no lugar de "Ver mais".
 */
export function ProjectCard({
  project,
  locale,
  dict,
  headingLevel: Heading = "h3",
  divider = false,
}: Props) {
  const href = `/${locale}/work/${project.slug}`;
  const period = `${project.period.start} – ${project.period.end}`;
  const soon = Boolean(project.locked);

  return (
    <article
      // Case bloqueado: com mouse, o cursor vira a pílula "Em breve" (ComingSoonCursor).
      className={`group relative grid rounded-sm has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-8 has-[a:focus-visible]:outline-focus gap-8 lg:grid-cols-[minmax(0,33.3125rem)_minmax(0,1fr)] lg:gap-[clamp(2rem,4.8vw,4.25rem)] ${soon ? "[@media(hover:hover)_and_(pointer:fine)]:cursor-none" : ""}`}
    >
      {soon && <ComingSoonCursor label={dict.works.comingSoon} />}
      <div className="flex flex-col justify-between gap-8 lg:order-1 lg:min-h-[27.25rem]">
        <div className="flex flex-col gap-6">
          <p className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-body uppercase tracking-wide text-text-secondary">
            <span>{project.company}</span>
            <span className="flex items-center gap-2">
              <span>{project.category[locale]}</span>
              <span aria-hidden="true">•</span>
              <span>
                <span className="sr-only">{dict.project.period}: </span>
                {period}
              </span>
            </span>
          </p>
          <Heading className="max-w-[13em] text-title font-medium leading-none tracking-tight text-text-primary">
            {soon ? (
              project.title[locale]
            ) : (
              <a
                href={href}
                className="after:absolute after:inset-0 after:z-10 after:content-[''] focus-visible:outline-none"
              >
                {project.title[locale]}
              </a>
            )}
          </Heading>
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-[23.6875rem] text-body-lg text-text-secondary">
              {project.summary[locale]}
            </p>
            {soon ? (
              // Sem link: o aviso é lido normalmente (não é decorativo como o "Ver mais").
              <span className="shrink-0 text-body font-medium uppercase tracking-[-0.026em] text-text-primary">
                {dict.works.comingSoon}
              </span>
            ) : (
              <span
                aria-hidden="true"
                className="inline-flex shrink-0 items-center gap-2 text-body font-medium uppercase tracking-[-0.026em] text-text-primary underline-offset-4 group-hover:underline"
              >
                {dict.works.seeMore}
                <ArrowRightIcon
                  size={20}
                  className="transition-transform group-hover:translate-x-1"
                />
              </span>
            )}
          </div>
          {divider && <div aria-hidden="true" className="h-px bg-[#eee] max-lg:hidden" />}
        </div>
      </div>

      <div
        className={`relative overflow-hidden bg-surface-placeholder max-lg:-mx-gutter max-lg:order-first lg:order-2 lg:-mr-gutter lg:min-h-[27.25rem] ${
          project.cover.logo
            ? "grid aspect-[775/436] place-items-center lg:aspect-auto"
            : ""
        }`}
        style={
          project.cover.background
            ? { backgroundColor: project.cover.background }
            : undefined
        }
      >
        {project.cover.logo ? (
          // Logo centralizado (Figma: 350px num quadro de 775px ≈ 45%), vetorial: nítido em qualquer tamanho.
          <Image
            src={project.cover.src}
            alt={project.cover.alt[locale]}
            width={project.cover.width}
            height={project.cover.height}
            unoptimized
            className="h-auto w-[45%] max-w-[21.875rem] transition-transform duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <Image
            src={project.cover.src}
            alt={project.cover.alt[locale]}
            width={project.cover.width}
            height={project.cover.height}
            sizes="(min-width: 1440px) 775px, (min-width: 1024px) 54vw, 100vw"
            className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        )}
        {project.hoverVideo && <HoverVideo sources={project.hoverVideo} />}
      </div>
    </article>
  );
}
