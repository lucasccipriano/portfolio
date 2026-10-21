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
        if (!entry.isIntersecting) return;
        setState("active");
        observer.disconnect();
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    observer.observe(row);
    return () => observer.disconnect();
  }, []);

  const color = tone === "negative" ? "text-[#f0372a]" : "text-[#5aa300]";

  return (
    <div ref={ref} aria-hidden="true" className="flex flex-wrap gap-x-[clamp(0.25rem,1.2vw,1rem)] gap-y-2">
      {Array.from({ length: total }, (_, i) => {
        const highlighted = i < count && state !== "idle";
        return (
          <PersonIcon
            key={i}
            className={`size-[clamp(1.75rem,4vw,3.5rem)] transition-colors duration-300 ${highlighted ? color : "text-[#d9d9d9]"}`}
            style={state === "active" && i < count ? { transitionDelay: `${START_MS + i * STEP_MS}ms` } : undefined}
          />
        );
      })}
    </div>
  );
}
