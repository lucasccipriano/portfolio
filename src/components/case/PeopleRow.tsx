"use client";

import { useEffect, useRef, useState } from "react";
import { instantSwapLangValue, revealActive } from "@/lib/reveal";
import { PersonIcon } from "./CaseIcons";

type Props = { total: number; count: number; tone: "positive" | "negative" };

/** Intervalo entre um ícone e o próximo ganhar cor. */
const STEP_MS = 90;
/** Espera o efeito de entrada do bloco antes de começar a colorir. */
const START_MS = 500;

/**
 * Fileira de ícones de pessoa do resultado do teste (Figma: verde/vermelho para o grupo destacado, cinza para o resto).
 * Quando aparece na tela, todos começam cinza e os do grupo ganham cor um por um, da esquerda para a direita.
 * Sem JavaScript ou com "reduzir movimento", já aparecem coloridos.
 */
export function PeopleRow({ total, count, tone }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  // "idle": antes de aparecer (cinza só com o efeito ligado); "active": colorindo.
  const [state, setState] = useState<"static" | "idle" | "active">("static");

  useEffect(() => {
    const row = ref.current;
    // Troca de idioma: os ícones já ficam coloridos, sem refazer a animação.
    if (!row || !revealActive() || instantSwapLangValue() !== null) return;
    setState("idle");
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Rolagem rápida no celular pode pular a fileira inteira entre dois quadros (nunca "intersecta"):
        // se ela já passou para cima da tela, colore também.
        if (!entry.isIntersecting && entry.boundingClientRect.top > 0) return;
        setState("active");
        observer.disconnect();
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(row);
    return () => observer.disconnect();
  }, []);

  const color = tone === "negative" ? "text-[#f0372a]" : "text-[#5aa300]";

  return (
    // Figma: a fileira ocupa a coluna inteira (9 ícones de 56px com 16px entre eles = 632px), de ponta a ponta.
    // Em telas menores os ícones encolhem junto, sem quebrar linha.
    <div
      ref={ref}
      aria-hidden="true"
      className="grid w-full max-w-[40.25rem] gap-x-[clamp(0.5rem,1.2vw,1rem)]"
      style={{ gridTemplateColumns: `repeat(${total}, minmax(0, 1fr))` }}
    >
      {Array.from({ length: total }, (_, i) => {
        const highlighted = i < count && state !== "idle";
        return (
          <PersonIcon
            key={i}
            className={`aspect-square h-auto w-full transition-colors duration-300 ${highlighted ? color : "text-[#d9d9d9]"}`}
            style={state === "active" && i < count ? { transitionDelay: `${START_MS + i * STEP_MS}ms` } : undefined}
          />
        );
      })}
    </div>
  );
}
