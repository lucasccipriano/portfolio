"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  as?: "ol" | "ul";
  className?: string;
  /** Introdução que fica parada acima dos cards enquanto eles se empilham (só no desktop). */
  lead?: ReactNode;
  children: ReactNode;
};

/**
 * Lista de cards que se empilham ao rolar (efeito da seção "Clear steps" do template Orchid):
 * - No desktop (lg+), cada item fica `sticky` e o próximo sobe por cima dele.
 * - Todos os cards ganham a altura do mais alto, para o de cima cobrir o de baixo por completo.
 * - O bloco parado (introdução, se houver, + card) fica centralizado na altura da tela abaixo do header:
 *   o mesmo espaço em cima e embaixo.
 * - `lead`: a introdução fica parada e os cards param logo abaixo dela; ela sai junto com o último card.
 *   Se introdução + card não couberem, a introdução rola normalmente e só o card fica centralizado.
 * - Card mais alto que o espaço abaixo do header: para logo abaixo do header (o título do card fica visível).
 * - No celular vira uma lista normal.
 *
 * Os filhos devem ser <li> com `stackItemClass` (src/lib/stack.ts).
 */
export function StackList({ as: Tag = "ol", className = "", lead, children }: Props) {
  const leadRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement & HTMLUListElement>(null);
  const [pinLead, setPinLead] = useState(false);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const getCards = () => Array.from(list.children) as HTMLElement[];

    const measure = () => {
      const cards = getCards();
      const leadEl = leadRef.current;
      cards.forEach((card) => {
        card.style.minHeight = "";
        card.style.top = "";
      });
      if (leadEl) {
        leadEl.style.top = "";
        leadEl.style.marginBottom = "";
      }
      list.style.marginTop = "";
      const stacking = cards.length > 1 && getComputedStyle(cards[0]).position === "sticky";
      if (!stacking) {
        setPinLead(false);
        return;
      }

      const height = Math.max(...cards.map((card) => card.offsetHeight));
      const leadHeight = leadEl?.offsetHeight ?? 0;
      const headerHeight = document.querySelector("header.sticky")?.getBoundingClientRect().height ?? 0;
      // Espaço visível abaixo do header fixo.
      const available = window.innerHeight - headerHeight;
      const withLead = leadEl !== null && leadHeight + height <= available;
      const block = (withLead ? leadHeight : 0) + height;
      // Mesmo espaço em cima e embaixo; sem espaço sobrando, logo abaixo do header.
      const blockTop = headerHeight + Math.max(0, (available - block) / 2);

      setPinLead(withLead);
      if (withLead && leadEl) {
        leadEl.style.top = `${blockTop}px`;
        // A introdução precisa soltar junto com o último card (e não ficar parada enquanto ele sobe por cima dela):
        // uma margem inferior da altura de um card faz o sticky dela terminar nesse momento. A margem negativa
        // igual na lista se anula com ela (margens colapsam), então o layout não muda.
        leadEl.style.marginBottom = `${height}px`;
        list.style.marginTop = `${-height}px`;
      }
      const cardTop = blockTop + (withLead ? leadHeight : 0);
      cards.forEach((card) => {
        card.style.minHeight = `${height}px`;
        card.style.top = `${cardTop}px`;
      });
    };

    measure();
    // Imagens carregando, fontes e mudança de largura alteram a altura dos cards e da introdução.
    const resizeObserver = new ResizeObserver(() => requestAnimationFrame(measure));
    getCards().forEach((card) => resizeObserver.observe(card));
    if (leadRef.current) resizeObserver.observe(leadRef.current);
    window.addEventListener("resize", measure);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div>
      {lead && (
        <div ref={leadRef} data-pin={pinLead} className="bg-white data-[pin=true]:sticky">
          {lead}
        </div>
      )}
      <Tag ref={listRef} className={className}>
        {children}
      </Tag>
    </div>
  );
}
