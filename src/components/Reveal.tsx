"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { byDocumentOrder, endInstantSwap, instantSwapLangValue, isRevealed, revealActive, revealElement } from "@/lib/reveal";

/**
 * Efeito de entrada dos conteúdos (como nos sites Framer de referência):
 * cada elemento com `data-reveal` começa transparente e 30px abaixo (CSS em globals.css)
 * e sobe suavemente quando entra na tela (animação em revealElement, src/lib/reveal.ts).
 *
 * - O CSS só esconde algo com JavaScript ligado e sem "reduzir movimento"; este componente marca
 *   o <html> com `reveal-ready` para desligar o "plano B" do CSS (mostrar tudo após 4s se o JS falhar).
 * - Não altera atributos dos elementos: o conteúdo da página pode hidratar depois deste componente,
 *   e o React acusaria diferença com o HTML do servidor.
 * - Elementos que já passaram (acima da tela) aparecem direto, sem animação.
 * - Atraso opcional por elemento via `--reveal-delay` (efeito cascata em listas).
 * - Troca de idioma (startInstantSwap, chamado pelo LanguageSwitcher): os textos novos que chegam
 *   na tela (ou acima dela) aparecem direto, sem refazer o efeito. Isso acontece no MutationObserver,
 *   antes da pintura, para eles não piscarem escondidos. O modo termina no primeiro efeito que já vê
 *   o <html lang> no idioma escolhido (o layout é recriado na troca: é a nova instância que encerra).
 */
export function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("reveal-ready");
    if (!revealActive()) {
      endInstantSwap();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // Entradas que chegam juntas (scroll rápido) aparecem na ordem da página.
        const ready = entries
          .filter((entry) => entry.isIntersecting || entry.boundingClientRect.bottom < 0)
          .sort((a, b) => byDocumentOrder(a.target, b.target));
        for (const entry of ready) {
          revealElement(entry.target, !entry.isIntersecting);
          observer.unobserve(entry.target);
        }
      },
      // Começa assim que o elemento entra na tela (sem esperar), para não sobrar faixa em branco no fim da tela.
      { rootMargin: "0px", threshold: 0 },
    );

    // Desktop: cards empilháveis (data-stack-reveal) não têm fade; só no celular, onde não empilham.
    const desktop = window.matchMedia("(min-width: 64rem)");
    const scan = () => {
      const instant = instantSwapLangValue() !== null;
      document.querySelectorAll("[data-reveal]").forEach((el) => {
        if (isRevealed(el)) return;
        if (desktop.matches && el.hasAttribute("data-stack-reveal")) return;
        if (instant && el.getBoundingClientRect().top < window.innerHeight) revealElement(el, true);
        else observer.observe(el);
      });
    };
    scan();
    // A página no idioma novo já chegou e já foi tratada: volta o efeito normal para o resto do scroll.
    let timer = 0;
    if (root.lang === instantSwapLangValue()) timer = window.setTimeout(endInstantSwap, 300);
    // Conteúdo que aparece depois (troca de página, troca de idioma, streaming) também entra no efeito.
    const mutations = new MutationObserver(scan);
    mutations.observe(document.body, { childList: true, subtree: true });
    // Ao passar de desktop para celular, os cards empilháveis passam a ter fade.
    desktop.addEventListener("change", scan);

    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
      mutations.disconnect();
      desktop.removeEventListener("change", scan);
    };
  }, [pathname]);

  return null;
}
