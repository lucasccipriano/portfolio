"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { isSamePage } from "@/lib/reveal";

/** Última página vista (fica fora do componente porque o layout é recriado ao trocar de idioma). */
let lastPath: string | null = null;

/** Vai para o topo na hora, mesmo com `scroll-behavior: smooth` no <html>. */
function jumpToTop() {
  const root = document.documentElement;
  const previous = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";
  window.scrollTo(0, 0);
  root.style.scrollBehavior = previous;
}

/**
 * Ao entrar numa página, a rolagem começa do topo (sem animação).
 * - Vale para links internos e para quando a página é aberta ou recarregada
 *   (o navegador não restaura a posição antiga: `scrollRestoration = "manual"`).
 * - Exceções: links com âncora (ex.: "/pt-br#work"), voltar/avançar dentro do site
 *   e troca de idioma, que mantêm a posição esperada.
 */
export function ScrollReset() {
  const pathname = usePathname();
  const fromHistory = useRef(false);

  useEffect(() => {
    window.history.scrollRestoration = "manual";
    const onPopState = () => {
      fromHistory.current = true;
    };
    window.addEventListener("popstate", onPopState);
    // Primeira carga: alguns navegadores ainda mexem na rolagem até o evento "load".
    const onLoad = () => {
      if (!window.location.hash) jumpToTop();
    };
    if (document.readyState !== "complete") window.addEventListener("load", onLoad, { once: true });
    return () => {
      window.removeEventListener("popstate", onPopState);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  useEffect(() => {
    const samePage = isSamePage(lastPath, pathname);
    lastPath = pathname;
    if (fromHistory.current || samePage || window.location.hash) {
      fromHistory.current = false;
      return;
    }
    jumpToTop();
  }, [pathname]);

  return null;
}
