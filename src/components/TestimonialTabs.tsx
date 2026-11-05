"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";
import { replayReveal } from "@/lib/reveal";

export type TabItem = {
  id: string;
  label: string;
  /** Empresa listada, mas ainda sem depoimento: aparece na lista e não pode ser selecionada. */
  disabled?: boolean;
  /** Tempo (ms) do loading deste depoimento antes de passar para o próximo. */
  duration?: number;
  /** Cartão do depoimento (coluna do meio). */
  card?: ReactNode;
  /** Autor do depoimento (coluna da direita, alinhado à base do cartão). Opcional. */
  aside?: ReactNode;
};

type Props = { items: TabItem[]; label: string; pauseLabel: string; playLabel: string };

/** Tempo do loading de cada depoimento. */
const DEFAULT_DURATION = 10000;

const DESKTOP = "(min-width: 64rem)";
/** Loading (protótipo do Figma): pílula com 5% da trilha que cresce até preenchê-la, pontas sempre arredondadas.
    Desktop: trilha vertical (cresce para baixo). Abaixo de 1024px: horizontal, embaixo do nome (cresce para a direita). */
const PROGRESS_FRAMES_Y: Keyframe[] = [
  { clipPath: "inset(0 0 95% 0 round 999px)" },
  { clipPath: "inset(0 0 0 0 round 999px)" },
];
const PROGRESS_FRAMES_X: Keyframe[] = [
  { clipPath: "inset(0 95% 0 0 round 999px)" },
  { clipPath: "inset(0 0 0 0 round 999px)" },
];

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const subscribeReducedMotion = (onChange: () => void) => {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

/**
 * Abas verticais (padrão WAI-ARIA Tabs, ativação automática), no layout do Figma (nó 355:2022), em 3 colunas:
 * - esquerda: lista de empresas; meio: cartão do depoimento (topo alinhado à lista);
 * - direita: autor (foto, nome, cargo), alinhado à base do cartão.
 * Abaixo de 1024px tudo vira uma coluna: lista, depoimento, autor.
 *
 * Troca automática (com 2+ depoimentos): ao lado da empresa ativa, uma barra preta enche a trilha cinza
 * (loading de 10s); quando termina, o próximo depoimento entra com fade.
 * - Clicar numa empresa mostra o depoimento dela e o loading recomeça do zero (a troca continua).
 * - Pausa com o cursor sobre os nomes das empresas, o depoimento ou a imagem (e com a imagem ampliada aberta);
 *   continua do mesmo ponto ao tirar o cursor. Também para pelo botão de pausar. Não começa com "reduzir movimento".
 * - Botão de pausar/retomar para teclado e leitores de tela (visível ao receber foco) — WCAG 2.2.2.
 * - A troca automática não move o foco nem é anunciada (seria interrupção para leitores de tela).
 *
 * Teclado: ↑/↓ (e ←/→) trocam de aba, Home/End vão à primeira/última; abas sem
 * depoimento são puladas. Todos os painéis vêm no HTML do servidor (bom para
 * buscadores e IAs); os inativos ficam com `hidden`.
 */
export function TestimonialTabs({ items, label, pauseLabel, playLabel }: Props) {
  const enabled = items.map((item, index) => (item.disabled ? -1 : index)).filter((index) => index >= 0);
  const [active, setActive] = useState(enabled[0] ?? 0);
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
  const canRotate = enabled.length > 1 && !reducedMotion;
  /** Troca automática desligada pelo botão de pausar. */
  const [stopped, setStopped] = useState(false);
  /** Só anima a entrada depois da primeira troca (o primeiro depoimento já entra com a seção). */
  const [changed, setChanged] = useState(false);
  /** Muda a cada troca (inclusive clicar na empresa já ativa) para o loading recomeçar do zero. */
  const [cycle, setCycle] = useState(0);

  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Troca de depoimento: o novo entra com o mesmo efeito de entrada do resto do site
  // (cartão primeiro, autor 120ms depois, como nos blocos de duas colunas).
  useEffect(() => {
    if (!changed) return;
    const panel = panelRefs.current[active];
    if (!panel) return;
    Array.from(panel.children).forEach((part, index) => replayReveal(part, index * 120));
  }, [active, cycle, changed]);

  const rotating = canRotate && !stopped;
  /** Cursor (mouse) sobre a lista, o depoimento ou o autor: o loading fica pausado. */
  const [hovered, setHovered] = useState(false);
  const running = rotating && !hovered;
  const hoverProps = {
    onPointerEnter: (event: PointerEvent<HTMLElement>) => event.pointerType === "mouse" && setHovered(true),
    onPointerLeave: (event: PointerEvent<HTMLElement>) => event.pointerType === "mouse" && setHovered(false),
  };
  const activeDuration = items[active]?.duration ?? DEFAULT_DURATION;
  const nextIndex = enabled.length > 0 ? enabled[(enabled.indexOf(active) + 1) % enabled.length] : active;

  /** Barra de loading da aba ativa e quanto do ciclo atual já passou (para retomar do mesmo ponto após pausar). */
  const barRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const progressRef = useRef({ cycle: -1, elapsed: 0 });

  // Loading: um cronômetro decide a troca (não depende do evento de fim da animação, que falha em alguns
  // navegadores e ao redimensionar); a barra é só o desenho do tempo, animada pelo navegador (fluida).
  // Ao cruzar 1024px a barra muda de orientação e continua do mesmo ponto.
  useEffect(() => {
    if (!running) return;
    if (progressRef.current.cycle !== cycle) progressRef.current = { cycle, elapsed: 0 };
    const startedAt = performance.now() - progressRef.current.elapsed;
    const bar = barRefs.current[active];
    const desktop = window.matchMedia(DESKTOP);
    let animation: Animation | null = null;

    const draw = () => {
      animation?.cancel();
      if (!bar || typeof bar.animate !== "function") return;
      // Remove a animação congelada de uma pausa anterior (esta continua do mesmo ponto).
      bar.getAnimations().forEach((previous) => previous.cancel());
      animation = bar.animate(desktop.matches ? PROGRESS_FRAMES_Y : PROGRESS_FRAMES_X, {
        duration: activeDuration,
        easing: "linear",
        fill: "both",
      });
      animation.currentTime = Math.min(activeDuration, performance.now() - startedAt);
    };
    draw();
    desktop.addEventListener("change", draw);

    const timer = window.setTimeout(
      () => {
        setChanged(true);
        setActive(nextIndex);
        setCycle((value) => value + 1);
      },
      Math.max(0, activeDuration - (performance.now() - startedAt)),
    );

    return () => {
      progressRef.current.elapsed = performance.now() - startedAt;
      window.clearTimeout(timer);
      desktop.removeEventListener("change", draw);
      animation?.pause(); // pausado: a barra fica parada onde estava
    };
  }, [active, cycle, running, activeDuration, nextIndex]);

  const goTo = (index: number) => {
    setChanged(true);
    setActive(index);
    setCycle((value) => value + 1);
  };

  /** Escolha da pessoa: mostra o depoimento escolhido; o loading recomeça e a troca segue a partir dele. */
  const choose = (position: number) => {
    if (enabled.length === 0) return;
    const next = enabled[(position + enabled.length) % enabled.length];
    goTo(next);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const current = enabled.indexOf(active);
    const keys: Record<string, () => void> = {
      ArrowDown: () => choose(current + 1),
      ArrowRight: () => choose(current + 1),
      ArrowUp: () => choose(current - 1),
      ArrowLeft: () => choose(current - 1),
      Home: () => choose(0),
      End: () => choose(enabled.length - 1),
    };
    const action = keys[event.key];
    if (action) {
      event.preventDefault();
      action();
    }
  };

  return (
    // Colunas a partir de 1024px (Figma em 1440): lista (136px, cabe o nome ativo com a barra) · respiro ·
    // cartão (até 755px) · respiro (64px) · autor (o resto, mín. 240px). Os respiros encolhem até 1024px.
    <div className="relative grid gap-y-6 lg:grid-cols-[8.5rem_clamp(1.5rem,-8.19rem+15.14vw,5.4375rem)_minmax(0,47.1875rem)_clamp(2rem,-2.925rem+7.69vw,4rem)_minmax(15rem,1fr)]">
      {canRotate && (
        <button
          type="button"
          data-rotation-toggle="true"
          onClick={() => setStopped((value) => !value)}
          className="sr-only z-20 rounded-full bg-text-primary px-4 py-2 text-body font-medium text-white focus-visible:not-sr-only focus-visible:absolute focus-visible:-top-12 focus-visible:left-0"
        >
          {stopped ? playLabel : pauseLabel}
        </button>
      )}

      <div
        {...hoverProps}
        role="tablist"
        aria-label={label}
        aria-orientation="vertical"
        className="relative z-10 flex gap-6 self-start overflow-x-auto max-lg:-mx-gutter max-lg:px-gutter lg:col-start-1 lg:row-start-1 lg:flex-col lg:gap-0 lg:overflow-visible"
      >
        {items.map((item, index) => {
          const selected = index === active;
          return (
            <button
              key={item.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${item.id}`}
              aria-selected={selected}
              aria-controls={item.disabled ? undefined : `${baseId}-panel-${item.id}`}
              aria-disabled={item.disabled || undefined}
              tabIndex={selected ? 0 : -1}
              onClick={() => {
                if (!item.disabled) choose(enabled.indexOf(index));
              }}
              onKeyDown={onKeyDown}
              className="group flex min-h-10 shrink-0 flex-col items-stretch gap-2 text-left lg:flex-row lg:items-center lg:gap-4 text-lead font-medium leading-none tracking-snug text-text-secondary transition-colors lg:text-[1.5rem] lg:tracking-[-0.02em] lg:text-text-muted aria-selected:text-text-primary aria-disabled:cursor-default not-aria-disabled:cursor-pointer not-aria-disabled:hover:text-text-primary lg:aria-selected:py-2"
            >
              {/* Cinza claro (Figma #a0a0a0) só a partir de 1024px, onde o nome tem 24px (texto grande: contraste 3:1 basta).
                  Menor que isso, cinza mais escuro para manter o contraste de texto normal (4.5:1). */}
              {/* Trilha do loading. Abaixo de 1024px: horizontal, embaixo do nome (as outras abas guardam o
                  espaço, invisível, para a lista não pular). A partir de 1024px: vertical, à esquerda do nome. */}
              <span
                aria-hidden="true"
                className="relative order-last h-[3px] w-full shrink-0 overflow-hidden rounded-full bg-border invisible group-aria-selected:visible lg:order-first lg:hidden lg:h-10 lg:w-[3px] lg:group-aria-selected:block"
              >
                {selected &&
                  (rotating ? (
                    // Loading (animado pelo efeito acima). O recorte inicial no CSS evita a barra cheia antes do JS.
                    <span
                      key={`progress-${cycle}`}
                      ref={(el) => {
                        barRefs.current[index] = el;
                      }}
                      className="absolute inset-0 rounded-full bg-text-primary [clip-path:inset(0_95%_0_0_round_999px)] lg:[clip-path:inset(0_0_95%_0_round_999px)]"
                    />
                  ) : (
                    <span className="absolute inset-y-0 left-0 w-[7px] rounded-full bg-text-primary lg:inset-x-0 lg:inset-y-auto lg:top-0 lg:h-[7px] lg:w-auto" />
                  ))}
              </span>
              {item.label}
            </button>
          );
        })}
      </div>

      {items.map((item, index) =>
        item.disabled ? null : (
          <div
            key={item.id}
            ref={(el) => {
              panelRefs.current[index] = el;
            }}
            role="tabpanel"
            id={`${baseId}-panel-${item.id}`}
            aria-labelledby={`${baseId}-tab-${item.id}`}
            hidden={index !== active}
            tabIndex={0}
            // No desktop o painel ocupa a linha toda (subgrid) para pôr o cartão ao lado da lista
            // e o autor à direita; a lista fica por cima (z-10).
            className="flex flex-col gap-6 focus-visible:outline-offset-8 lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:grid lg:grid-cols-subgrid"
          >
            {item.card && (
              <div {...hoverProps} className="lg:col-start-3">
                {item.card}
              </div>
            )}
            {item.aside && (
              <div {...hoverProps} className="lg:col-start-5 lg:self-end">
                {item.aside}
              </div>
            )}
          </div>
        ),
      )}
    </div>
  );
}
