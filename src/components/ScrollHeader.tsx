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
 * - Ao ir para uma âncora da página (ex.: "Works"), ele some e fica escondido até a rolagem terminar,
 *   para não cobrir o título da seção (as âncoras levam o título para perto do topo).
 */
export function ScrollHeader({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const header = ref.current;
    if (!header) return;
    let lastY = window.scrollY;
    let frame = 0;
    let anchoring = false;
    let anchorTimer = 0;

    const busy = () =>
      header.contains(document.activeElement) ||
      header.querySelector('[data-open="true"], [aria-expanded="true"]') !==
        null;

    const update = () => {
      frame = 0;
      const y = Math.max(0, window.scrollY);
      if (anchoring) {
        lastY = y;
        return;
      }
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
    const onFocus = () => {
      if (!anchoring) setHidden(false);
    };

    /** Fim da ida até a âncora: volta ao comportamento normal (rolar para cima mostra o header). */
    let anchorStartY = 0;
    const endAnchoring = () => {
      anchoring = false;
      window.clearTimeout(anchorTimer);
      window.removeEventListener("scrollend", onAnchorScrollEnd);
      lastY = window.scrollY;
    };
    // O navegador pode disparar um "scrollend" atrasado (de uma rolagem anterior) logo após o clique:
    // só conta o fim de rolagem depois que a página realmente saiu do lugar.
    const onAnchorScrollEnd = () => {
      if (Math.abs(window.scrollY - anchorStartY) > 2) endAnchoring();
    };
    const hideForAnchor = () => {
      anchoring = true;
      anchorStartY = window.scrollY;
      setHidden(true);
      window.removeEventListener("scrollend", onAnchorScrollEnd);
      window.addEventListener("scrollend", onAnchorScrollEnd);
      // Rede de segurança: navegadores sem "scrollend" ou âncora que não move a página.
      window.clearTimeout(anchorTimer);
      anchorTimer = window.setTimeout(endAnchoring, 2000);
    };
    /** Clique num link para uma âncora desta mesma página. */
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey
      )
        return;
      const link = (event.target as Element | null)?.closest?.("a[href*='#']");
      if (!(link instanceof HTMLAnchorElement)) return;
      const url = new URL(link.href, window.location.href);
      if (
        url.pathname !== window.location.pathname ||
        !url.hash ||
        url.hash === "#"
      )
        return;
      const target = document.getElementById(
        decodeURIComponent(url.hash.slice(1)),
      );
      if (target) hideForAnchor();
    };

    // Página aberta já numa âncora (ex.: "/pt-br#work" vindo de um case): começa com o header escondido.
    if (window.location.hash && window.scrollY > header.offsetHeight)
      setHidden(true);

    window.addEventListener("scroll", onScroll, { passive: true });
    header.addEventListener("focusin", onFocus);
    document.addEventListener("click", onClick);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(anchorTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scrollend", onAnchorScrollEnd);
      header.removeEventListener("focusin", onFocus);
      document.removeEventListener("click", onClick);
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
