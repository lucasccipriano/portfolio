import type { CSSProperties } from "react";

/** O efeito de entrada está ligado? (mesma condição do CSS em globals.css; só roda no navegador). */
export const revealActive = () => window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

/** Elementos `data-reveal` que já apareceram (em memória: o Reveal não marca atributos no DOM). */
const revealedElements = new WeakSet<Element>();
export const isRevealed = (el: Element) => revealedElements.has(el);

const REVEAL_KEYFRAMES: Keyframe[] = [
  { opacity: 0, translate: "0 30px" },
  { opacity: 1, translate: "0 0" },
];

/**
 * Faz o elemento aparecer (opacidade 0 → 1, subindo 30px), como nos sites Framer de referência:
 * 0,8s com curva cubic-bezier(.35, 0, 0, 1) e 0,2s de atraso, mais `--reveal-delay` do elemento.
 * `instant`: aparece já no estado final (acima da tela, troca de idioma).
 */
export function revealElement(el: Element, instant = false) {
  if (revealedElements.has(el)) return;
  revealedElements.add(el);
  const delay = parseFloat(getComputedStyle(el).getPropertyValue("--reveal-delay")) || 0;
  el.animate(
    REVEAL_KEYFRAMES,
    instant
      ? { duration: 0, fill: "forwards" }
      : { duration: 800, delay: 200 + delay, easing: "cubic-bezier(0.35, 0, 0, 1)", fill: "both" },
  );
}

/** Caminho sem o prefixo de idioma ("/pt-br/work/x" → "/work/x"). */
export const withoutLocale = (path: string) => path.replace(/^\/(pt-br|en)(?=\/|$)/, "");

/**
 * Continua na mesma página, ignorando o idioma? (troca de idioma, ou o layout recriado por ela).
 * Nesse caso não se volta ao topo.
 */
export const isSamePage = (previous: string | null, next: string) =>
  previous !== null && withoutLocale(previous) === withoutLocale(next);

/**
 * Troca de idioma em andamento: idioma de destino (valor do <html lang>) ou null.
 * Enquanto houver, os conteúdos novos que chegam na tela aparecem sem animação (ver Reveal).
 * Fica em memória, e não no <html>: o React limpa os atributos do <html> ao recriar o layout no idioma novo.
 */
let instantSwapLang: string | null = null;
export const startInstantSwap = (lang: string) => {
  instantSwapLang = lang;
};
export const instantSwapLangValue = () => instantSwapLang;
export const endInstantSwap = () => {
  instantSwapLang = null;
};

/** Atraso do efeito de entrada (`data-reveal`), para criar cascata entre elementos. */
export const revealDelay = (ms: number): CSSProperties => ({ ["--reveal-delay" as string]: `${ms}ms` });
