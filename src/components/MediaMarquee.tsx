"use client";

import Image from "next/image";
import { useState } from "react";
import type { Locale } from "@/i18n/config";
import type { MediaImage } from "@/content/media";
import { PauseIcon, PlayIcon } from "./Icons";

type Props = {
  items: MediaImage[];
  locale: Locale;
  label: string;
  pauseLabel: string;
  playLabel: string;
};

/**
 * Faixa de mockups em movimento contínuo (Figma: 5 cards 970×550 que vazam a tela).
 * - Pausa com botão visível (WCAG 2.2.2), ao passar o mouse e ao focar.
 * - Com "reduzir movimento" ligado, não anima: vira uma faixa com rolagem horizontal.
 * - A segunda cópia da lista existe só para o loop e fica escondida de leitores de tela.
 */
export function MediaMarquee({ items, locale, label, pauseLabel, playLabel }: Props) {
  const [paused, setPaused] = useState(false);

  const renderList = (copy: boolean) => (
    <ul
      className="flex shrink-0 gap-4 pr-4"
      aria-hidden={copy || undefined}
      // `inert` evita foco/leitura na cópia decorativa
      {...(copy ? { inert: true } : {})}
    >
      {items.map((item, index) => (
        <li
          key={`${copy ? "copy-" : ""}${item.src}`}
          className="relative aspect-[970/550] w-[min(80vw,60.625rem)] shrink-0 overflow-hidden rounded-media bg-surface-media"
        >
          <Image
            src={item.src}
            alt={copy ? "" : item.alt[locale]}
            width={item.width}
            height={item.height}
            sizes="(min-width: 1213px) 970px, 80vw"
            className="size-full object-cover"
            loading={!copy && index === 0 ? "eager" : "lazy"}
            fetchPriority={!copy && index === 0 ? "high" : undefined}
          />
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-label={label} className="group/marquee relative">
      <div className="overflow-hidden motion-reduce:overflow-x-auto motion-reduce:[scrollbar-width:thin]">
        <div
          data-paused={paused}
          className="flex w-max animate-marquee group-hover/marquee:[animation-play-state:paused] group-focus-within/marquee:[animation-play-state:paused] data-[paused=true]:[animation-play-state:paused] motion-reduce:animate-none"
        >
          {renderList(false)}
          <div className="contents motion-reduce:hidden">{renderList(true)}</div>
        </div>
      </div>

      <div className="container-page mt-4 flex justify-end motion-reduce:hidden">
        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-caption font-medium text-text-secondary hover:text-text-primary"
        >
          {paused ? <PlayIcon /> : <PauseIcon />}
          {paused ? playLabel : pauseLabel}
        </button>
      </div>
    </section>
  );
}
