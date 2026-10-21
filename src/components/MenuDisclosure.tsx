"use client";

import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from "react";
import { CloseIcon, MenuIcon } from "./Icons";

type Props = {
  openLabel: string;
  closeLabel: string;
  children: ReactNode;
};

/**
 * Menu do header.
 * - Desktop (lg+): conteúdo sempre visível, botão escondido.
 * - Mobile: botão com aria-expanded/aria-controls; fecha com Esc, ao clicar num link
 *   ou fora do painel, e devolve o foco ao botão quando fecha pelo teclado.
 */
export function MenuDisclosure({ openLabel, closeLabel, children }: Props) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const close = useCallback((returnFocus: boolean) => {
    setOpen(false);
    if (returnFocus) buttonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      // Ignora o Esc já tratado por um menu interno (ex.: menu de e-mail).
      if (event.key === "Escape" && !event.defaultPrevented) close(true);
    };
    const onPointer = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) close(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open, close]);

  return (
    <div ref={wrapperRef} className="lg:contents">
      <button
        ref={buttonRef}
        type="button"
        className="-mr-2.5 inline-flex size-11 items-center justify-center rounded-full lg:hidden"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? closeLabel : openLabel}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </button>

      <div
        id={panelId}
        data-open={open}
        className="max-lg:absolute max-lg:inset-x-0 max-lg:top-full max-lg:z-20 max-lg:border-b max-lg:border-border max-lg:bg-surface max-lg:px-gutter max-lg:pb-8 max-lg:pt-2 max-lg:data-[open=false]:hidden lg:contents"
        onClick={(event) => {
          if ((event.target as HTMLElement).closest("a")) close(false);
        }}
      >
        {children}
      </div>
    </div>
  );
}
