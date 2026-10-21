"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

export type TabItem = {
  id: string;
  label: string;
  /** Empresa listada, mas ainda sem depoimento: aparece na lista e não pode ser selecionada. */
  disabled?: boolean;
  /** Cartão do depoimento (coluna da esquerda, abaixo da lista). */
  card?: ReactNode;
  /** Projeto relacionado (coluna da direita). Opcional. */
  aside?: ReactNode;
};

type Props = { items: TabItem[]; label: string };

/**
 * Abas verticais (padrão WAI-ARIA Tabs, ativação automática), no layout do Figma:
 * - esquerda: lista de empresas e, abaixo dela, o cartão do depoimento;
 * - direita: projeto relacionado, alinhado ao topo da lista.
 * No celular tudo vira uma coluna: lista, depoimento, projeto.
 *
 * Teclado: ↑/↓ (e ←/→) trocam de aba, Home/End vão à primeira/última; abas sem
 * depoimento são puladas. Todos os painéis vêm no HTML do servidor (bom para
 * buscadores e IAs); os inativos ficam com `hidden`.
 */
export function TestimonialTabs({ items, label }: Props) {
  const enabled = items.map((item, index) => (item.disabled ? -1 : index)).filter((index) => index >= 0);
  const [active, setActive] = useState(enabled[0] ?? 0);
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (position: number) => {
    if (enabled.length === 0) return;
    const next = enabled[(position + enabled.length) % enabled.length];
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const current = enabled.indexOf(active);
    const keys: Record<string, () => void> = {
      ArrowDown: () => select(current + 1),
      ArrowRight: () => select(current + 1),
      ArrowUp: () => select(current - 1),
      ArrowLeft: () => select(current - 1),
      Home: () => select(0),
      End: () => select(enabled.length - 1),
    };
    const action = keys[event.key];
    if (action) {
      event.preventDefault();
      action();
    }
  };

  return (
    <div className="grid gap-y-12 lg:grid-cols-[minmax(0,33.3125rem)_minmax(0,1fr)] lg:grid-rows-[auto_1fr] lg:gap-x-6">
      <div
        role="tablist"
        aria-label={label}
        aria-orientation="vertical"
        className="relative z-10 flex gap-6 self-start overflow-x-auto max-lg:-mx-gutter max-lg:px-gutter lg:col-start-1 lg:row-start-1 lg:flex-col lg:gap-0 lg:overflow-visible"
      >
        {items.map((item, index) => {
          const selected = index === active;
          return (
            <button
              key={item.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${item.id}`}
              aria-selected={selected}
              aria-controls={item.disabled ? undefined : `${baseId}-panel-${item.id}`}
              aria-disabled={item.disabled || undefined}
              tabIndex={selected ? 0 : -1}
              onClick={() => {
                if (!item.disabled) setActive(index);
              }}
              onKeyDown={onKeyDown}
              className="group flex min-h-10 shrink-0 items-center gap-4 text-left text-lead font-medium leading-none tracking-snug text-text-muted transition-colors aria-selected:text-text-primary aria-disabled:cursor-default not-aria-disabled:hover:text-text-primary lg:aria-selected:py-2"
            >
              <span
                aria-hidden="true"
                className="relative hidden h-10 w-[3px] shrink-0 overflow-hidden rounded-full bg-border group-aria-selected:block"
              >
                <span className="absolute inset-x-0 top-0 h-[7px] rounded-full bg-text-primary" />
              </span>
              {item.label}
            </button>
          );
        })}
      </div>

      {items.map((item, index) =>
        item.disabled ? null : (
          <div
            key={item.id}
            role="tabpanel"
            id={`${baseId}-panel-${item.id}`}
            aria-labelledby={`${baseId}-tab-${item.id}`}
            hidden={index !== active}
            tabIndex={0}
            // No desktop o painel ocupa a grade toda (subgrid) para pôr o cartão
            // abaixo da lista e o projeto à direita; a lista fica por cima (z-10).
            className="flex flex-col gap-12 focus-visible:outline-offset-8 lg:col-span-2 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:grid lg:grid-cols-subgrid lg:grid-rows-subgrid lg:gap-y-12"
          >
            {item.card && <div className="lg:col-start-1 lg:row-start-2">{item.card}</div>}
            {item.aside && <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">{item.aside}</div>}
          </div>
        ),
      )}
    </div>
  );
}
