"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

export type TabItem = { id: string; label: string; panel: ReactNode };

type Props = { items: TabItem[]; label: string };

/**
 * Abas verticais (padrão WAI-ARIA Tabs, ativação automática).
 * Teclado: ↑/↓ (e ←/→) trocam de aba, Home/End vão à primeira/última.
 * Todos os painéis vêm renderizados no HTML do servidor (bom para buscadores e IAs);
 * os inativos ficam com `hidden`.
 */
export function TestimonialTabs({ items, label }: Props) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (index: number) => {
    const next = (index + items.length) % items.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const keys: Record<string, () => void> = {
      ArrowDown: () => select(active + 1),
      ArrowRight: () => select(active + 1),
      ArrowUp: () => select(active - 1),
      ArrowLeft: () => select(active - 1),
      Home: () => select(0),
      End: () => select(items.length - 1),
    };
    const action = keys[event.key];
    if (action) {
      event.preventDefault();
      action();
    }
  };

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,33.3125rem)_minmax(0,1fr)] lg:gap-x-[clamp(2rem,4.8vw,4.25rem)]">
      <div
        role="tablist"
        aria-label={label}
        aria-orientation="vertical"
        className="flex gap-6 overflow-x-auto max-lg:-mx-gutter max-lg:px-gutter lg:flex-col lg:gap-0 lg:overflow-visible"
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
              aria-controls={`${baseId}-panel-${item.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={onKeyDown}
              className="group flex min-h-10 shrink-0 items-center gap-4 text-left text-lead font-medium leading-none tracking-snug text-text-muted transition-colors hover:text-text-primary aria-selected:text-text-primary lg:aria-selected:py-2"
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

      {items.map((item, index) => (
        <div
          key={item.id}
          role="tabpanel"
          id={`${baseId}-panel-${item.id}`}
          aria-labelledby={`${baseId}-tab-${item.id}`}
          hidden={index !== active}
          tabIndex={0}
          className="lg:col-start-2 lg:row-start-1 lg:row-span-2"
        >
          {item.panel}
        </div>
      ))}
    </div>
  );
}
