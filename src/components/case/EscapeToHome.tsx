"use client";

import { useEffect } from "react";

/**
 * Atalho de teclado da página do case: Esc volta para a home.
 * Não age quando outro componente já tratou o Esc (lightbox, menu de e-mail),
 * quando há um <dialog> aberto ou quando o foco está num campo de texto.
 */
export function EscapeToHome({ href }: { href: string }) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || event.defaultPrevented || event.isComposing) return;
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (document.querySelector("dialog[open]")) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest("input:not([type=range]), textarea, select, [contenteditable='true']")) return;
      // Carrega a página do zero, como os links internos do site.
      window.location.assign(href);
    };
    // Bubble: os componentes internos (lightbox, menus) recebem o Esc antes.
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [href]);

  return null;
}
