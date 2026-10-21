"use client";

import Image from "next/image";
import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

type Side = { src: string | null; alt: string; label: string; file: string };

type Props = {
  left: Side;
  right: Side;
  ratio: number;
  /** Nome acessível do controle deslizante. */
  label: string;
};

/**
 * Comparação de duas telas com divisor arrastável (Figma: linha branca + ícone de mão no centro).
 * - Arrastar com mouse ou dedo em qualquer ponto da imagem move o divisor.
 * - Teclado: o divisor é um <input type="range"> (setas, Home/End, PageUp/PageDown).
 * - Leitores de tela recebem as duas imagens com texto alternativo e o valor em %.
 */
export function BeforeAfter({ left, right, ratio, label }: Props) {
  const [position, setPosition] = useState(50);
  const boxRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const moveTo = (clientX: number) => {
    const box = boxRef.current?.getBoundingClientRect();
    if (!box) return;
    setPosition(Math.min(100, Math.max(0, ((clientX - box.left) / box.width) * 100)));
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    moveTo(event.clientX);
  };

  const renderSide = (side: Side, clip: string) => (
    <div className="absolute inset-0" style={{ clipPath: clip }}>
      {side.src ? (
        <Image src={side.src} alt={side.alt} fill sizes="100vw" quality={90} className="object-cover" draggable={false} />
      ) : (
        <div className="flex size-full items-center justify-center bg-surface-media text-caption text-text-inverse-secondary">
          {side.file}
        </div>
      )}
    </div>
  );

  return (
    <div className="relative">
      <div
        ref={boxRef}
        onPointerDown={onPointerDown}
        onPointerMove={(event) => dragging.current && moveTo(event.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
        className="relative w-full cursor-ew-resize touch-pan-y select-none overflow-hidden bg-surface-media"
        style={{ aspectRatio: ratio }}
      >
        {renderSide(right, `inset(0 0 0 ${position}%)`)}
        {renderSide(left, `inset(0 ${100 - position}% 0 0)`)}

        {/* Rótulos de cada lado */}
        <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-caption font-medium text-white">
          {left.label}
        </span>
        <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-black/60 px-3 py-1 text-caption font-medium text-white">
          {right.label}
        </span>

        {/* Divisor e alça */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 w-1 -translate-x-1/2 bg-white" style={{ left: `${position}%` }}>
          <span className="absolute left-1/2 top-1/2 flex size-[clamp(3.5rem,6vw,8.5rem)] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/30 text-white backdrop-blur-md">
            <svg width="44%" height="44%" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 12c4-4 10-5 14-5s10 1 14 5M12 7l-2 5 5 1M36 7l2 5-5 1" />
              <path d="M21 40V22a2.5 2.5 0 0 1 5 0v8l1-.5a2.5 2.5 0 0 1 3.4 1l.1.2 1-.5a2.5 2.5 0 0 1 3.4 1.2l.6-.2A2.5 2.5 0 0 1 38 33v3a8 8 0 0 1-8 8h-3.5a6 6 0 0 1-4.7-2.3L16 34a2.4 2.4 0 0 1 3.6-3.2L21 32" />
            </svg>
          </span>
        </div>
      </div>

      {/* Controle acessível: invisível, mas focável e operável pelo teclado. */}
      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={Math.round(position)}
        onChange={(event) => setPosition(Number(event.target.value))}
        aria-label={label}
        aria-valuetext={`${left.label} ${Math.round(position)}%, ${right.label} ${100 - Math.round(position)}%`}
        className="peer absolute inset-0 size-full cursor-ew-resize appearance-none opacity-0 pointer-events-none"
      />
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 hidden outline-2 -outline-offset-4 outline-white peer-focus-visible:block" />
    </div>
  );
}
