"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import type { Locale } from "@/i18n/config";
import type { CarouselImage } from "@/content/media";
import { ImageLightbox } from "./ImageLightbox";
import { PauseIcon, PlayIcon } from "./Icons";

type Props = {
  items: CarouselImage[];
  locale: Locale;
  label: string;
  pauseLabel: string;
  playLabel: string;
  enlargeLabel: string;
  closeLabel: string;
  /**
   * "hero": cards grandes 970×550 que vão de ponta a ponta da tela.
   * "about": fotos de altura fixa (16:9 ou retrato) que passam por trás de `leading`.
   */
  variant?: "hero" | "about";
  /**
   * Elemento fixo à esquerda (ex.: retrato no About). As imagens passam por trás dele
   * e somem na borda esquerda dele: nada aparece à esquerda desse elemento.
   */
  leading?: ReactNode;
  /** Mostrar o botão "Pausar animação" abaixo da faixa. Padrão: true. */
  showPauseButton?: boolean;
};

/** Altura das fotos do About (Figma: 278px no frame de 1440). */
const ABOUT_HEIGHT = "clamp(12rem, 9rem + 9vw, 17.375rem)";

const variants = {
  hero: {
    card: () => "aspect-[970/550] w-[min(80vw,60.625rem)] bg-surface-media",
    sizes: "(min-width: 1213px) 970px, 80vw",
    eagerFirst: true,
    /** Espaço entre os cards (Figma: 16px). */
    list: "gap-4 pr-4",
  },
  about: {
    card: (item: CarouselImage) =>
      `h-(--about-h) bg-surface-placeholder ${item.shape === "portrait" ? "aspect-[200/278]" : "aspect-video"}`,
    sizes: "(min-width: 768px) 500px, 340px",
    eagerFirst: false,
    /** Espaço entre as fotos: 8px. */
    list: "gap-2 pr-2",
  },
} as const;

/**
 * Velocidade do carrossel: segundos que cada card leva para passar.
 * Maior = mais devagar. A velocidade não muda quando você adiciona ou remove imagens.
 */
const SECONDS_PER_CARD = 12;

/** Distância (px) que o mouse precisa andar para um clique virar arraste. */
const DRAG_THRESHOLD = 6;

/**
 * Faixa de trabalhos em movimento contínuo.
 *
 * Movimento: a faixa é um contêiner com rolagem horizontal; a animação apenas
 * avança o `scrollLeft`. Por isso dá para rolar e arrastar à mão quando ela para,
 * e ao retomar ela continua exatamente de onde o usuário deixou.
 *
 * Pausa (WCAG 2.2.2):
 * - mouse sobre as imagens ou sobre o botão → pausa temporária;
 * - botão "Pausar" → pausa fixa;
 * - foco de teclado dentro do carrossel ou imagem ampliada aberta → pausa.
 *
 * Rolagem manual:
 * - arrastar com o mouse (clicar e puxar);
 * - trackpad / Shift + roda do mouse (rolagem horizontal), sempre;
 * - roda do mouse (vertical) só com a pausa fixa ligada, para não prender a
 *   rolagem da página quando alguém só passa o mouse por cima.
 *
 * Com "reduzir movimento" ligado não há animação: vira uma faixa de rolagem comum.
 * A segunda cópia da lista existe só para o loop e fica escondida de leitores de tela.
 */
export function MediaMarquee({
  items,
  locale,
  label,
  pauseLabel,
  playLabel,
  enlargeLabel,
  closeLabel,
  variant = "hero",
  leading,
  showPauseButton = true,
}: Props) {
  const config = variants[variant];
  const scrollerRef = useRef<HTMLDivElement>(null);
  const firstListRef = useRef<HTMLUListElement>(null);

  /** Pausa fixa, ligada pelo botão. */
  const [pinned, setPinned] = useState(false);
  /** Pausa temporária: mouse sobre as imagens ou sobre o botão. */
  const [hovering, setHovering] = useState(false);
  /** Foco de teclado dentro do carrossel. */
  const [keyboardFocus, setKeyboardFocus] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  /** Como a imagem foi aberta: teclado precisa do foco de volta no card; mouse não. */
  const [openedWithKeyboard, setOpenedWithKeyboard] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const running = !pinned && !hovering && !keyboardFocus && !dragging && openIndex === null && !reducedMotion;

  // Posição "contínua" (com fração de pixel), para a animação lenta não travar no arredondamento.
  const pos = useRef(0);
  const pinnedRef = useRef(pinned);
  useEffect(() => {
    pinnedRef.current = pinned;
  }, [pinned]);

  /** Mantém a posição dentro de uma volta, para o loop ser infinito nos dois sentidos. */
  const scrollToPos = useCallback((value: number) => {
    const el = scrollerRef.current;
    const loop = firstListRef.current?.offsetWidth ?? 0;
    if (!el) return;
    pos.current = loop ? ((value % loop) + loop) % loop : value;
    el.scrollLeft = pos.current;
  }, []);

  // Preferência do sistema por menos movimento.
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  // Animação: avança o scroll continuando de onde a faixa está agora.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!running || !el) return;

    pos.current = el.scrollLeft;
    let last = performance.now();
    let frame = requestAnimationFrame(function tick(now) {
      const loop = firstListRef.current?.offsetWidth ?? 0;
      const dt = Math.min(now - last, 100) / 1000; // evita saltos ao voltar de outra aba
      last = now;
      if (loop) {
        // Se algo mexeu no scroll por fora (ex.: foco), segue a partir dali.
        if (Math.abs(el.scrollLeft - pos.current) > 2) pos.current = el.scrollLeft;
        scrollToPos(pos.current + (loop / (items.length * SECONDS_PER_CARD)) * dt);
      }
      frame = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(frame);
  }, [running, items.length, scrollToPos]);

  // Rolagem manual com trackpad / roda do mouse.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onWheel = (event: WheelEvent) => {
      const horizontal = Math.abs(event.deltaX) > Math.abs(event.deltaY);
      const delta = horizontal ? event.deltaX : event.shiftKey || pinnedRef.current ? event.deltaY : 0;
      if (!delta) return; // roda vertical sem pausa fixa: deixa a página rolar
      event.preventDefault();
      scrollToPos(el.scrollLeft + delta);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [scrollToPos]);

  // Arrastar com o mouse (no toque, a rolagem nativa já funciona).
  const drag = useRef<{ startX: number; startScroll: number; moved: boolean; id: number } | null>(null);
  const suppressClick = useRef(false);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    suppressClick.current = false;
    if (event.pointerType !== "mouse" || event.button !== 0 || reducedMotion) return;
    drag.current = { startX: event.clientX, startScroll: event.currentTarget.scrollLeft, moved: false, id: event.pointerId };
  };
  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const state = drag.current;
    if (!state) return;
    const dx = event.clientX - state.startX;
    if (!state.moved && Math.abs(dx) < DRAG_THRESHOLD) return;
    if (!state.moved) {
      state.moved = true;
      setDragging(true);
      event.currentTarget.setPointerCapture(state.id);
    }
    scrollToPos(state.startScroll - dx);
  };
  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const state = drag.current;
    drag.current = null;
    if (!state?.moved) return;
    // O "clique" que termina o arraste não abre a imagem. Ele pode nem chegar ao card
    // (o ponteiro está capturado), então a trava se desfaz logo em seguida.
    suppressClick.current = true;
    window.setTimeout(() => {
      suppressClick.current = false;
    }, 0);
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(state.id)) event.currentTarget.releasePointerCapture(state.id);
  };

  const hoverHandlers = {
    onPointerEnter: (event: ReactPointerEvent<HTMLElement>) => {
      if (event.pointerType === "mouse") setHovering(true);
    },
    onPointerLeave: () => setHovering(false),
  };

  const renderList = (copy: boolean) => (
    <ul
      ref={copy ? undefined : firstListRef}
      className={`flex shrink-0 ${config.list}`}
      aria-hidden={copy || undefined}
      // A cópia fica escondida de leitores de tela e fora do Tab (tabIndex -1 nos botões),
      // mas continua clicável: depois de uma volta completa, é ela que aparece na tela.
    >
      {items.map((item, index) => (
        <li
          key={`${copy ? "copy-" : ""}${item.image.src}`}
          className={`relative shrink-0 overflow-hidden rounded-card ${config.card(item)}`}
        >
          <button
            type="button"
            tabIndex={copy ? -1 : undefined}
            onClick={(event) => {
              if (suppressClick.current) {
                suppressClick.current = false;
                event.preventDefault();
                return;
              }
              // `detail === 0` = acionado por teclado (Enter/Espaço), não por clique.
              setOpenedWithKeyboard(event.detail === 0);
              setOpenIndex(index);
            }}
            className="block size-full cursor-zoom-in rounded-card focus-visible:outline-offset-[-4px]"
          >
            <Image
              src={item.image}
              alt={copy ? "" : item.alt[locale]}
              sizes={config.sizes}
              // Telas de interface têm texto pequeno: qualidade acima do padrão (75) evita borrões.
              quality={item.quality ?? 90}
              draggable={false}
              className="size-full object-cover"
              style={{ objectPosition: item.position, transform: item.scale ? `scale(${item.scale})` : undefined }}
              loading={config.eagerFirst && !copy && index === 0 ? "eager" : "lazy"}
              fetchPriority={config.eagerFirst && !copy && index === 0 ? "high" : undefined}
              placeholder={(config.eagerFirst && !copy && index === 0) || !item.image.blurDataURL ? "empty" : "blur"}
            />
            {!copy && <span className="sr-only">{enlargeLabel}</span>}
          </button>
        </li>
      ))}
    </ul>
  );

  const scroller = (
    <div
      ref={scrollerRef}
      data-dragging={dragging}
      {...hoverHandlers}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onFocus={(event) => setKeyboardFocus(event.target.matches(":focus-visible"))}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setKeyboardFocus(false);
      }}
      className="overflow-x-auto overscroll-x-contain select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden data-[dragging=true]:cursor-grabbing data-[dragging=true]:[&_button]:cursor-grabbing motion-reduce:[scrollbar-width:thin]"
    >
      <div className="flex w-max items-center">
        {/* Espaço reservado para o retrato fixo: largura da foto + 7px da borda externa + 8px de espaço. */}
        {leading && <div aria-hidden="true" className="mr-[0.9375rem] aspect-[209/278] h-(--about-h) shrink-0" />}
        {renderList(false)}
        {!reducedMotion && renderList(true)}
      </div>
    </div>
  );

  return (
    <section
      aria-label={label}
      className="relative"
      style={variant === "about" ? ({ "--about-h": ABOUT_HEIGHT } as CSSProperties) : undefined}
    >
      {leading ? (
        <div className="mx-auto max-w-[90rem] pl-gutter">
          <div className="relative">
            {scroller}
            {/* Fundo branco reto atrás do elemento fixo: as fotos não aparecem nos cantos arredondados dele. */}
            <div className="absolute inset-y-0 left-0 z-10 flex items-center bg-surface">{leading}</div>
          </div>
        </div>
      ) : (
        scroller
      )}

      {showPauseButton && !reducedMotion && (
        <div className="container-page mt-4 flex justify-end">
          <button
            type="button"
            onClick={() => setPinned((value) => !value)}
            {...hoverHandlers}
            className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-caption font-medium text-text-secondary hover:text-text-primary"
          >
            {pinned ? <PlayIcon /> : <PauseIcon />}
            {pinned ? playLabel : pauseLabel}
          </button>
        </div>
      )}

      <ImageLightbox
        item={openIndex === null ? null : items[openIndex]}
        locale={locale}
        closeLabel={closeLabel}
        restoreFocus={openedWithKeyboard}
        onClose={() => {
          setOpenIndex(null);
          // Quem abriu com o mouse não está navegando por teclado: o carrossel volta a andar.
          if (!openedWithKeyboard) setKeyboardFocus(false);
        }}
      />
    </section>
  );
}
