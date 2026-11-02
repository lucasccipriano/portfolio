"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** Quanto a página precisa andar (px) numa direção para o header reagir: evita piscar com tremidas do scroll. */
const SCROLL_TOLERANCE = 6;

/**
 * Header que some ao rolar para baixo e volta ao rolar para cima.
 * - No topo da página (até a altura do header) ele sempre aparece.
 * - Nunca some com o foco do teclado dentro dele, nem com o menu do celular / menu de e-mail abertos.
 * - Ganhar foco (Tab de volta) faz ele aparecer.
 * - Com "reduzir movimento", aparece e some sem animação.
 */
export function ScrollHeader({ className = "", children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const header = ref.current;
    if (!header) return;
    let lastY = window.scrollY;
    let frame = 0;

    const busy = () =>
      header.contains(document.activeElement) ||
      header.querySelector('[data-open="true"], [aria-expanded="true"]') !== null;

    const update = () => {
      frame = 0;
      const y = Math.max(0, window.scrollY);
      const delta = y - lastY;
      if (y <= header.offsetHeight) {
        setHidden(false);
        lastY = y;
      } else if (delta > SCROLL_TOLERANCE) {
        if (!busy()) setHidden(true);
        lastY = y;
      } else if (delta < -SCROLL_TOLERANCE) {
        setHidden(false);
        lastY = y;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onFocus = () => setHidden(false);

    window.addEventListener("scroll", onScroll, { passive: true });
    header.addEventListener("focusin", onFocus);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      header.removeEventListener("focusin", onFocus);
    };
  }, []);

  return (
    <header
      ref={ref}
      data-hidden={hidden}
      className={`sticky top-0 transition-transform duration-300 ease-out data-[hidden=true]:-translate-y-full ${className}`}
    >
      {children}
    </header>
  );
}
