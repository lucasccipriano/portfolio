import type { CSSProperties } from "react";

/** O efeito de entrada está ligado? (mesma condição do CSS em globals.css; só roda no navegador). */
export const revealActive = () => window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

/** Elementos `data-reveal` que já apareceram (em memória: o Reveal não marca atributos no DOM). */
const revealedElements = new WeakSet<Element>();
export const isRevealed = (el: Element) => revealedElements.has(el);

const isDesktop = () => window.matchMedia("(min-width: 64rem)").matches;

/* ---------- Celular: fade em fila, bloco a bloco ----------
   No scroll rápido vários elementos entram ao mesmo tempo; cada um com seu atraso fazia um conteúdo de
   um bloco mais abaixo aparecer antes do bloco que está na tela. No celular os fades entram numa fila:
   na ordem em que entram (e, se entram juntos, na ordem da página), um começa depois do outro.
   Elementos do mesmo bloco (a mesma <section>/<header>) entram em cascata curta; um bloco novo
   só começa depois do anterior, com um respiro maior. */
/** Espera antes do primeiro fade, depois que o elemento entra na tela. */
const MOBILE_WAIT_MS = 400;
/** Intervalo entre elementos do mesmo bloco. */
const MOBILE_STEP_MS = 120;
/** Intervalo extra quando a fila passa para o próximo bloco. */
const MOBILE_BLOCK_GAP_MS = 180;
/** No scroll muito rápido a fila não atrasa mais que isto: o que está na tela não fica esperando à toa.
    (A ordem se mantém: o anterior sempre começa antes ou junto.) */
const MOBILE_MAX_WAIT_MS = 1000;

let queueNextStart = 0;
let queueLastBlock: Element | null = null;
const blockOf = (el: Element) => el.closest("section, article > header, header, footer") ?? document.body;

/** Quando (em ms a partir de agora) o fade deste elemento deve começar no celular. */
function mobileQueueDelay(el: Element) {
  const now = performance.now();
  const block = blockOf(el);
  const newBlock = queueLastBlock !== null && block !== queueLastBlock;
  // Fila parada (nada esperando): recomeça com a espera normal.
  const earliest = now + MOBILE_WAIT_MS;
  const queued = queueNextStart + (newBlock ? MOBILE_BLOCK_GAP_MS : 0);
  const start = Math.max(earliest, Math.min(queued, now + MOBILE_MAX_WAIT_MS));
  queueNextStart = start + MOBILE_STEP_MS;
  queueLastBlock = block;
  return start - now;
}

/** Ordena elementos na ordem em que aparecem na página (para entradas que chegam juntas). */
export const byDocumentOrder = (a: Element, b: Element) =>
  a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;

const REVEAL_KEYFRAMES: Keyframe[] = [
  { opacity: 0, translate: "0 30px" },
  { opacity: 1, translate: "0 0" },
];

/**
 * Faz o elemento aparecer (opacidade 0 → 1, subindo 30px), como nos sites Framer de referência:
 * 0,8s com curva cubic-bezier(.35, 0, 0, 1). Desktop: começa ao entrar na tela (mais `--reveal-delay`).
 * Celular: entra na fila bloco a bloco (ver acima).
 * `instant`: aparece já no estado final (acima da tela, troca de idioma).
 */
export function revealElement(el: Element, instant = false) {
  if (revealedElements.has(el)) return;
  revealedElements.add(el);
  if (instant) {
    el.animate(REVEAL_KEYFRAMES, { duration: 0, fill: "forwards" });
    return;
  }
  // Desktop: imediato, mais o `--reveal-delay` do elemento. Celular: a fila define o momento.
  const delay = isDesktop()
    ? parseFloat(getComputedStyle(el).getPropertyValue("--reveal-delay")) || 0
    : mobileQueueDelay(el);
  el.animate(REVEAL_KEYFRAMES, { duration: 800, delay, easing: "cubic-bezier(0.35, 0, 0, 1)", fill: "both" });
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
