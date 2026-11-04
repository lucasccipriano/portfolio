import { Fragment } from "react";
import type { ReactNode } from "react";
import type { Locale } from "@/i18n/config";
import type { CaseContent, StickyColor } from "@/content/cases/types";
import type { Project } from "@/content/projects";
import { resolveLocalizedImage } from "@/lib/case-images";
import { BeforeAfter } from "./BeforeAfter";
import { CaseFigure } from "./CaseFigure";
import { CaseVideo } from "./CaseVideo";
import { StackList } from "./StackList";
import { ExternalLink } from "../ExternalLink";
import { revealDelay } from "@/lib/reveal";
import { stackItemClass } from "@/lib/stack";
import { PeopleRow } from "./PeopleRow";
import { TraitIconSvg } from "./CaseIcons";

type Props = { project: Project; content: CaseContent; folder: string; locale: Locale };

/* ---------- Peças de layout reutilizadas em todas as seções (Figma "Resumido") ---------- */

const eyebrowClass = "text-body leading-normal uppercase tracking-wide text-text-secondary";
/** Algumas seções do Figma usam o eyebrow em Medium. */
const eyebrowMedium = `${eyebrowClass} font-medium`;
const headingClass = "text-heading font-bold leading-[1.2] tracking-[-0.03em] text-text-primary";
/** Valores fixos do Figma no desktop (≥1024px); um pouco menores no mobile. */
const text20 = "text-[1.125rem] leading-[1.6875rem] lg:text-[1.25rem] lg:leading-[1.875rem]"; // 20/30
const text24 = "text-[1.25rem] leading-[1.625rem] lg:text-[1.5rem] lg:leading-[1.95rem]"; // 24/31.2
const bodyXl = `${text20} font-normal text-black`;
/** Duas colunas do Figma: título à esquerda, conteúdo com 644px à direita. */
/** Reflexões finais (Figma): título à esquerda, texto com 755px à direita. */
const reflectionCols = "grid gap-x-[clamp(2rem,6vw,6.375rem)] gap-y-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,47.1875rem)]";
const twoCols = "grid gap-x-[clamp(2rem,6vw,6.375rem)] gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,40.25rem)]";

function Section({ id, children, last = false }: { id: string; children: ReactNode; last?: boolean }) {
  return (
    <>
      <section aria-labelledby={`${id}-title`} className="py-[clamp(3.5rem,2rem+5vw,6.5rem)]">
        {children}
      </section>
      {/* Linha divisória como elemento próprio, para ter o mesmo efeito de entrada dos conteúdos. */}
      {!last && <div data-reveal aria-hidden="true" className="h-px bg-border" />}
    </>
  );
}

function SectionHeader({
  id,
  eyebrow,
  title,
  className = "",
  strong = false,
  loose = false,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  className?: string;
  /** Eyebrow em Medium (Problema, Desafio, Personas…). */
  strong?: boolean;
  /** Título com line-height 40px em vez de 1.2. */
  loose?: boolean;
}) {
  return (
    <div data-reveal className={className}>
      {eyebrow && <p className={strong ? eyebrowMedium : eyebrowClass}>{eyebrow}</p>}
      {/* "\n" no texto vira quebra de linha (como no Figma). */}
      <h2 id={`${id}-title`} className={`${headingClass} whitespace-pre-line ${loose ? "leading-[1.25]" : ""}`}>
        {title}
      </h2>
    </div>
  );
}

const pad2 = (n: number) => String(n).padStart(2, "0");

const stickyColors: Record<StickyColor, string> = {
  yellow: "bg-[#ffe27a]",
  slate: "bg-[#c3cbdc]",
  gray: "bg-[#e3e3e3]",
  salmon: "bg-[#ffaea6]",
  orange: "bg-[#ffc983]",
  green: "bg-[#92e2ab]",
  pink: "bg-[#ffbdf0]",
};

/* ---------------------------------------------------------------------------------------- */

export function CaseStudy({ project, content: c, folder, locale }: Props) {
  const figureLabels = { enlarge: c.labels.enlarge, close: c.labels.close };
  const fig = (image: CaseContent["heroImage"], extra?: { sizes?: string; className?: string; priority?: boolean }) => (
    <CaseFigure folder={folder} image={image} locale={locale} labels={figureLabels} {...extra} />
  );

  return (
    <article>
      {/* ---------- Abertura ---------- */}
      <header className="container-page pt-[clamp(2.5rem,1rem+5vw,5rem)] text-center">
        <h1 className="reveal-intro mx-auto max-w-[14em] text-case-title font-medium tracking-[-0.03em] text-balance">
          {project.title[locale]}
        </h1>
        <p style={revealDelay(120)} className={`reveal-intro mx-auto mt-6 max-w-[60.5rem] ${text24} font-normal text-balance text-text-secondary`}>{project.summary[locale]}</p>
      </header>

      <div style={revealDelay(240)} className="reveal-intro container-page mt-[clamp(2.5rem,1.5rem+3vw,4.5rem)]">
        {c.heroVideo ? (
          <CaseVideo
            {...c.heroVideo}
            pauseLabel={c.labels.pauseVideo}
            playLabel={c.labels.playVideo}
            enlargeLabel={c.labels.enlargeVideo}
            closeLabel={c.labels.close}
            className="rounded-[1.5rem]"
            sizes="(min-width: 1440px) 1312px, calc(100vw - 2 * var(--spacing-gutter))"
            preload
          />
        ) : (
          fig(c.heroImage, { className: "rounded-[1.5rem]", priority: true })
        )}
      </div>

      <div className="container-page">
        {/* ---------- Resumo + ficha ---------- */}
        <Section id="summary" last>
          {/* Figma: a ficha (equipe em cima, timeline/plataforma embaixo) ocupa a mesma altura dos parágrafos,
              alinhada com o primeiro e com o último. Por isso o título fica numa linha própria do grid. */}
          <div className="grid gap-x-12 lg:grid-cols-[minmax(0,40.25rem)_minmax(0,35.375rem)] lg:grid-rows-[auto_1fr] lg:justify-between">
            <h2 data-reveal id="summary-title" className={`${headingClass} lg:col-start-1`}>
              {c.labels.summary}
            </h2>
            <div data-reveal className="mt-6 flex flex-col gap-6 lg:col-start-1">
              {c.summary.map((paragraph) => (
                <p key={paragraph} className={bodyXl}>
                  {paragraph.split("\n").map((line, index) => (
                    <Fragment key={index}>
                      {index > 0 && <br className="max-lg:hidden" />}
                      {index > 0 && " "}
                      {line}
                    </Fragment>
                  ))}
                </p>
              ))}
            </div>

            <div
              data-reveal
              style={revealDelay(120)}
              className="mt-12 flex flex-col gap-12 lg:col-start-2 lg:row-start-2 lg:mt-6 lg:justify-between"
            >
              <div>
                <h3 className="text-body-xl font-medium leading-normal text-[#333]">{c.labels.team}</h3>
                <dl className="mt-3 grid grid-cols-2 gap-x-[clamp(1.5rem,6.12vw,5.5rem)] gap-y-6 sm:grid-cols-[repeat(3,8.125rem)]">
                  {c.team.map((member) => (
                    <div key={member.name} className="flex flex-col">
                      <dt className="text-body leading-[1.95] text-text-secondary">{member.role}</dt>
                      {/* Figma: nome em uma linha e sobrenome na seguinte. */}
                      <dd className="text-body font-medium leading-normal text-black">
                        {member.name.split(" ").map((part, index) => (
                          <span key={part} className="block">
                            {index > 0 && <span className="sr-only"> </span>}
                            {part}
                          </span>
                        ))}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
              <dl className="flex flex-wrap gap-x-[clamp(2rem,6.12vw,5.5rem)] gap-y-6">
                <div className="flex flex-col gap-[0.8125rem]">
                  <dt className="text-body-xl font-medium leading-normal text-[#333]">{c.labels.timeline}</dt>
                  <dd className="text-body font-medium leading-normal text-text-secondary">{c.timeline}</dd>
                </div>
                <div className="flex flex-col gap-[0.8125rem]">
                  <dt className="text-body-xl font-medium leading-normal text-[#333]">{c.labels.platform}</dt>
                  <dd className="text-body font-medium leading-normal text-text-secondary">{c.platform}</dd>
                </div>
              </dl>
            </div>
          </div>
        </Section>
      </div>

      {/* Imagem de ambiente, de ponta a ponta do layout */}
      <div data-reveal>{fig(c.coverImage, { sizes: "100vw" })}</div>

      <div className="container-page">
        {/* ---------- Problema ---------- */}
        <section aria-labelledby="problem-title" className="pt-[clamp(3.5rem,2rem+5vw,6.5rem)]">
          <div className={twoCols}>
            <SectionHeader id="problem" eyebrow={c.problem.eyebrow} title={c.problem.title} className="max-w-[28rem]" strong loose />
            <div data-reveal style={revealDelay(120)} className="flex flex-col gap-6 lg:pt-[1.375rem]">
              {c.problem.paragraphs.map((paragraph) => (
                <p key={paragraph} className={`${bodyXl} tracking-[-0.02em]`}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div data-reveal className={`${twoCols} mt-[clamp(3rem,1rem+4.5vw,5rem)]`}>
            <p className="text-body-xl leading-[1.35] tracking-[-0.02em] text-text-primary" id="risks-intro">
              {c.problem.risksIntro}
            </p>
            <ol aria-labelledby="risks-intro" className="flex flex-col gap-6">
              {c.problem.risks.map((risk, index) => (
                <li key={risk} className="text-body-xl font-medium text-black">
                  <span aria-hidden="true">{pad2(index + 1)}. </span>
                  {risk}
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>

      {/* Comparação nova × anterior, de ponta a ponta */}
      <div data-reveal className="mt-[clamp(3.5rem,2rem+5vw,6.5rem)]">
        <BeforeAfter
          label={c.labels.beforeAfterLabel}
          ratio={c.comparison.left.ratio ?? 16 / 9}
          left={{ ...c.comparison.left, src: resolveLocalizedImage(folder, c.comparison.left.file, locale), label: c.labels.compareLeft }}
          right={{ ...c.comparison.right, src: resolveLocalizedImage(folder, c.comparison.right.file, locale), label: c.labels.compareRight }}
        />
      </div>

      <div className="container-page">
        {/* ---------- Desafios ---------- */}
        <Section id="challenges">
          <div className={twoCols}>
            <SectionHeader id="challenges" eyebrow={c.challenges.eyebrow} title={c.challenges.title} className="max-w-[37rem]" strong loose />
            <ol className="flex flex-col gap-10 lg:pt-[1.375rem]">
              {c.challenges.items.map((item, index) => (
                <li key={item.title} data-reveal style={revealDelay(80 * index)} className="flex flex-col gap-4">
                  <h3 className={`${text24} font-medium text-black`}>
                    <span aria-hidden="true">{pad2(index + 1)}. </span>
                    {item.title}
                  </h3>
                  {item.text && <p className="text-body-xl leading-[1.3] text-black">{item.text}</p>}
                </li>
              ))}
            </ol>
          </div>
        </Section>

        {/* ---------- Oportunidade e objetivos ---------- */}
        <Section id="opportunity">
          <div data-reveal>
          <p className={eyebrowMedium}>{c.opportunity.eyebrow}</p>
          <h2 id="opportunity-title" className="max-w-[20.5em] text-statement font-medium tracking-[-0.03em] text-text-primary">
            {c.opportunity.statement}
          </h2>
          </div>
          <h3 data-reveal className={`${eyebrowMedium} mt-14`}>{c.opportunity.objectivesLabel}</h3>
          <ol className="mt-8 grid max-w-[75.0625rem] gap-8 md:grid-cols-2 md:gap-x-[clamp(2rem,9vw,8.5rem)] lg:grid-cols-[minmax(0,33.3125rem)_minmax(0,33.25rem)] lg:justify-between">
            {c.opportunity.objectives.map((objective, index) => (
              <li key={objective} data-reveal style={revealDelay(100 * index)} className={`${text24} font-medium text-black`}>
                <span aria-hidden="true">{pad2(index + 1)}. </span>
                {objective}
              </li>
            ))}
          </ol>
        </Section>

        {/* ---------- Personas ---------- */}
        <Section id="personas">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,26.3125rem)_minmax(0,47.625rem)] lg:justify-between">
            <div className="flex flex-col gap-6">
              <SectionHeader id="personas" eyebrow={c.personas.eyebrow} title={c.personas.title} strong loose />
              <p data-reveal style={revealDelay(80)} className="text-body-lg text-text-secondary">{c.personas.intro}</p>
            </div>
            <ul className="grid gap-8 sm:grid-cols-2">
              {c.personas.items.map((persona, index) => (
                <li key={persona.name} data-reveal style={revealDelay(100 * index)} className="flex flex-col overflow-hidden rounded-[1.5rem] bg-[#f9f9f9]">
                  <div className="flex items-center gap-6 px-6 pt-6">
                    <span aria-hidden="true" className="text-[4rem] leading-none">
                      {persona.emoji}
                    </span>
                    <div className="text-[#333]">
                      <h3 className="text-body-xl font-bold">{persona.name}</h3>
                      <p className="text-body leading-[1.3]">{persona.description}</p>
                    </div>
                  </div>
                  <ul className="flex flex-1 flex-col gap-2 px-10 pt-6 pb-8">
                    {persona.traits.map((trait) => (
                      <li key={trait.text} className="flex items-center gap-4 text-body font-medium leading-6 tracking-[-0.02em] text-black">
                        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#d9d9d9] text-[#333]">
                          <TraitIconSvg icon={trait.icon} />
                        </span>
                        {trait.text}
                      </li>
                    ))}
                  </ul>
                  <p className="bg-[#efefef] px-[clamp(1rem,10%,2.6rem)] pt-4 pb-6 text-body leading-[1.3125] tracking-[-0.02em] text-black">
                    <strong className="font-medium">Onboarding:</strong> {persona.onboarding}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* ---------- Heurísticas ---------- */}
        <Section id="heuristics">
          <StackList
            className="flex flex-col gap-14 lg:gap-10"
            trimEnd
            lead={
              <div className="max-w-[75rem] pb-14 lg:pb-10">
                <SectionHeader id="heuristics" eyebrow={c.heuristics.eyebrow} title={c.heuristics.title} />
                <p data-reveal style={revealDelay(80)} className={`${bodyXl} mt-6`}>{c.heuristics.intro}</p>
              </div>
            }
          >
            {c.heuristics.steps.map((step, index) => (
              <li
                key={step.title}
                // Desktop: só o primeiro card entra com fade (os outros chegam cobrindo o anterior).
                // Celular (sem empilhar): todos entram com fade — ver stackRevealClass.
                data-reveal=""
                data-stack-reveal={index === 0 ? undefined : ""}
                // content-start: a altura extra do card (igualada pela StackList) fica no fim, sem esticar a linha.
                className={`${stackItemClass} grid content-start gap-8 lg:grid-cols-[minmax(0,33.25rem)_minmax(0,45.6875rem)] lg:justify-between`}
              >
                {/* A coluna de texto estica até a base da imagem: a linha fica alinhada com ela,
                    ou 40px abaixo do último parágrafo quando o texto for mais alto. */}
                <div className={`flex flex-col ${index < c.heuristics.steps.length - 1 ? "border-b border-border pb-10" : ""}`}>
                  <div className="flex flex-col gap-3">
                    <h3 className={`${text24} font-medium tracking-[-0.03em] text-text-primary`}>
                      <span aria-hidden="true">{index + 1}. </span>
                      {step.title}
                    </h3>
                    {step.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="text-body-lg leading-normal text-black">
                        {paragraph}
                      </p>
                    ))}
                    {step.bullets.length > 0 && (
                      <ul className="mt-5 flex list-disc flex-col gap-6 pl-7 text-body-lg leading-normal text-[#333]">
                        {step.bullets.map((bullet) => (
                          <li key={bullet.text}>
                            {bullet.lead && <strong className="font-bold">{bullet.lead} </strong>}
                            {bullet.text}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                {fig(step.image, { className: "rounded-media max-lg:order-first", sizes: "(min-width: 1024px) 731px, 100vw" })}
              </li>
            ))}
          </StackList>

          {/* Desktop: 80px entre o fim do último card (imagem) e "Outros pontos" (64px + 16px de padding).
              relative z-10 bg-white: fica por cima da sobra do último card (ver StackList trimEnd). */}
          <div data-reveal className="mt-14 grid gap-8 pt-4 lg:relative lg:z-10 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,61.0625rem)] lg:bg-white">
            <h3 className="text-body-xl font-medium leading-[1.2] tracking-[-0.03em] text-[#333]">{c.heuristics.othersTitle}</h3>
            <ul className="grid gap-x-16 gap-y-10 sm:grid-cols-2">
              {c.heuristics.others.map((item) => (
                <li key={item.title} className="flex flex-col gap-4">
                  <p className="text-body-xl font-medium text-black">
                    {item.href ? (
                      <ExternalLink href={item.href} newTabLabel={c.labels.opensInNewTab} className="underline decoration-1 underline-offset-4 hover:decoration-2">
                        {item.title}
                      </ExternalLink>
                    ) : (
                      item.title
                    )}
                  </p>
                  {item.text && <p className="text-body-lg leading-[1.45] text-black">{item.text}</p>}
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* ---------- Áreas do onboarding ---------- */}
        <Section id="flow">
          <SectionHeader id="flow" eyebrow={c.flow.eyebrow} title={c.flow.title} />
          <ul className="mt-14 grid gap-x-6 gap-y-12 md:grid-cols-2">
            {c.flow.items.map((item, index) => (
              <li key={item.title} data-reveal style={revealDelay((index % 2) * 120)} className="flex flex-col gap-6">
                <div>
                  <h3 className="text-body-xl font-medium tracking-[-0.03em] text-text-primary">{item.title}</h3>
                  <p className="text-body leading-[1.3125] text-text-secondary">{item.text}</p>
                </div>
                {fig(item.image, { className: "rounded-media", sizes: "(min-width: 768px) 644px, 100vw" })}
              </li>
            ))}
          </ul>
        </Section>

        {/* ---------- Design critique ---------- */}
        <Section id="critique">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,33.125rem)_minmax(0,40.25rem)] lg:items-end lg:justify-between">
            <div data-reveal className="flex flex-col gap-6">
              <h2 id="critique-title" className={headingClass}>
                {c.critique.title}
              </h2>
              <p className="text-[1.25rem] leading-[1.875rem] font-normal tracking-[-0.03em] text-text-primary lg:text-[1.5rem] lg:leading-[2.25rem]">{c.critique.intro}</p>
            </div>
            <div data-reveal style={revealDelay(120)} className="flex flex-col gap-4">
              <h3 className="text-body-xl font-medium leading-normal text-black">{c.critique.teamTitle}</h3>
              <ol className="flex list-decimal flex-col gap-4 pl-[1.875rem] text-body-xl leading-[1.3] text-black">
                {c.critique.team.map((member) => (
                  <li key={member}>{member}</li>
                ))}
              </ol>
            </div>
          </div>

          {/* Quadro de post-its, em HTML (o texto fica legível para buscadores e leitores de tela). */}
          <div data-reveal className="mt-14 rounded-[1.5rem] bg-[#f9f9f9] p-[clamp(1.5rem,4vw,3.5rem)] pt-[clamp(1.5rem,3.4vw,3rem)]">
            <h3 className="text-subtitle font-bold leading-[1.2] tracking-[-0.03em] text-text-primary">{c.critique.board.title}</h3>
            <div className="mt-10 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-[18.5rem_28.25rem_15.25rem] lg:justify-between" lang={c.critique.board.lang}>
              {c.critique.board.groups.map((group) => (
                <div key={group.title}>
                  <h4 className="text-body-xl font-bold leading-normal tracking-[-0.03em] text-[#333]">{group.title}</h4>
                  <ul className="mt-4 flex flex-wrap gap-4">
                    {group.notes.map((note) => {
                      const text = typeof note === "string" ? note : note.text;
                      const color = typeof note === "string" ? group.color : note.color;
                      const long = text.length > 60;
                      return (
                        <li
                          key={text}
                          className={`${stickyColors[color]} flex ${long ? "min-h-[8.75rem] w-full max-w-[15.25rem]" : "size-[8.75rem]"} p-3 text-body font-medium leading-[1.3] text-[#1e1e1e] shadow-[0_1px_2px_rgba(0,0,0,0.12),0_2px_6px_rgba(0,0,0,0.06)]`}
                        >
                          {text}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <ul className="mt-14 flex flex-col gap-8">
            {c.critique.examples.map((example) => (
              <li key={example.title} data-reveal className="grid items-start gap-6 lg:grid-cols-[minmax(0,19.375rem)_minmax(0,61.125rem)] lg:justify-between">
                <div>
                  <h3 className="text-body-xl font-medium tracking-[-0.03em] text-text-primary">{example.title}</h3>
                  <p className="text-body leading-[1.3125] text-text-secondary">{example.text}</p>
                </div>
                {fig(example.image, { sizes: "(min-width: 1024px) 978px, 100vw" })}
              </li>
            ))}
          </ul>
        </Section>

        {/* ---------- Componentes finais ---------- */}
        <Section id="final">
          <SectionHeader id="final" eyebrow={c.finalComponents.eyebrow} title={c.finalComponents.title} />
          <p data-reveal style={revealDelay(80)} className={`${bodyXl} mt-6`}>{c.finalComponents.intro}</p>
          <StackList as="ul" className="mt-14 flex flex-col gap-12 lg:mt-10 lg:gap-8">
            {c.finalComponents.items.map((item, index) => (
              // Desktop: só o primeiro card entra com fade; no celular (sem empilhar) todos entram.
              <li key={item.title} data-reveal="" data-stack-reveal={index === 0 ? undefined : ""} className={`${stackItemClass} flex flex-col gap-6`}>
                <div className="flex flex-col gap-2">
                  <h3 className="text-body-xl font-medium tracking-[-0.03em] text-text-primary">{item.title}</h3>
                  {item.text.map((line) => (
                    <p key={line} className="max-w-[54rem] text-body leading-[1.3125] text-text-secondary">
                      {line}
                    </p>
                  ))}
                </div>
                {/* Largura total do grid quando cabe; em telas baixas a imagem (16:9) encolhe para o card inteiro
                    (título + texto ≈ 10rem com os respiros) caber centralizado abaixo do header no empilhamento. */}
                {item.image.video ? (
                  <CaseVideo
                    {...item.image.video}
                    description={item.image.alt}
                    pauseLabel={c.labels.pauseVideo}
                    playLabel={c.labels.playVideo}
                    enlargeLabel={c.labels.enlargeVideo}
                    closeLabel={c.labels.close}
                    className="w-full rounded-media lg:max-w-[calc((100svh-10rem)*16/9)]"
                    sizes="(min-width: 1440px) 1312px, calc(100vw - 2 * var(--spacing-gutter))"
                  />
                ) : (
                  fig(item.image, { className: "rounded-media lg:max-w-[calc((100svh-10rem)*16/9)]" })
                )}
              </li>
            ))}
          </StackList>
        </Section>

        {/* ---------- Teste de usabilidade e decisão ---------- */}
        <Section id="usability" last={!c.reflections}>
          <SectionHeader id="usability" eyebrow={c.usability.eyebrow} title={c.usability.title} />
          <div data-reveal style={revealDelay(80)} className="mt-6 flex flex-col gap-2">
            {c.usability.intro.map((line) => (
              <p key={line} className={bodyXl}>
                {line}
              </p>
            ))}
          </div>

          <div data-reveal className={`${twoCols} mt-14`}>
            <h3 className="text-body-xl leading-[1.35] tracking-[-0.02em] text-text-primary">{c.usability.overviewLabel}</h3>
            <ul className="flex flex-col gap-10">
              {c.usability.results.map((row) => (
                <li key={row.text} className="flex flex-col gap-6">
                  <PeopleRow total={row.total} count={row.count} tone={row.tone} />
                  <p className="text-body-lg leading-normal text-text-primary">{row.text}</p>
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal className={`${twoCols} mt-20`}>
            <h3 className={headingClass}>{c.usability.decisionTitle}</h3>
            <div className="flex flex-col gap-6">
              {c.usability.decision.map((paragraph) => (
                <p key={paragraph} className="text-body-xl tracking-[-0.02em] text-text-primary">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <ul className="mt-8 grid gap-10 md:mt-20 md:grid-cols-2">
            {c.usability.screens.map((screen, index) => (
              <li key={screen.title} data-reveal style={revealDelay(120 * index)} className="flex flex-col gap-6">
                <h4 className="text-body-xl font-medium tracking-[-0.03em] text-text-primary">{screen.title}</h4>
                {screen.image.video ? (
                  <CaseVideo
                    {...screen.image.video}
                    description={screen.image.alt}
                    pauseLabel={c.labels.pauseVideo}
                    playLabel={c.labels.playVideo}
                    enlargeLabel={c.labels.enlargeVideo}
                    closeLabel={c.labels.close}
                    className="rounded-media"
                    sizes="(min-width: 1440px) 636px, (min-width: 768px) 48vw, 100vw"
                  />
                ) : (
                  fig(screen.image, { className: "rounded-media", sizes: "(min-width: 768px) 636px, 100vw" })
                )}
              </li>
            ))}
          </ul>
        </Section>

        {c.reflections && c.reflections.paragraphs.length > 0 && (
          <Section id="reflections" last>
            {/* Figma: duas linhas (título à esquerda, texto em 755px à direita), 104px entre elas. */}
            <div className="flex flex-col gap-[clamp(3.5rem,2rem+5vw,6.5rem)]">
              <div className={reflectionCols}>
                <h2 data-reveal id="reflections-title" className={`${headingClass} leading-[1.25]`}>
                  {c.reflections.title}
                </h2>
                <div data-reveal style={revealDelay(80)} className="flex flex-col gap-10">
                  {c.reflections.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-body-xl leading-[1.3] text-black">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              <section aria-labelledby="different-title" className={reflectionCols}>
                <h2 data-reveal id="different-title" className={`${headingClass} leading-[1.25]`}>
                  {c.reflections.differentTitle}
                </h2>
                <ol className="flex flex-col gap-10">
                  {c.reflections.different.map((item, index) => (
                    <li key={item.title} data-reveal style={revealDelay(80 * index)} className="flex flex-col gap-4">
                      <h3 className={`${text24} font-medium text-black`}>
                        <span aria-hidden="true">{pad2(index + 1)}. </span>
                        {item.title}
                      </h3>
                      <p className="text-body-xl leading-[1.3] text-black">{item.text}</p>
                    </li>
                  ))}
                </ol>
              </section>
            </div>
          </Section>
        )}
      </div>

      {/* Imagem de encerramento, de ponta a ponta do layout (Figma "bg-final"). */}
      {c.closingImage && <div data-reveal>{fig(c.closingImage, { sizes: "100vw" })}</div>}
    </article>
  );
}
