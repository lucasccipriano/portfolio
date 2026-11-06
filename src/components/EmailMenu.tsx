"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

export type EmailMenuLabels = {
  menu: string;
  gmail: string;
  outlook: string;
  copy: string;
  copied: string;
  copyFailed: string;
  opensInNewTab: string;
};

type Props = {
  email: string;
  labels: EmailMenuLabels;
  /** Conteúdo do botão (texto e ícone), com o mesmo visual dos outros links. */
  children: ReactNode;
  triggerClassName: string;
  /**
   * Lado em que o menu se alinha ao botão. "end-lg"/"end-md": à esquerda no celular,
   * à direita a partir de 1024px / 768px (acompanha listas que só se alinham à direita nesse tamanho).
   */
  align?: "start" | "end" | "end-lg" | "end-md";
  /** Abrir para cima (ex.: no rodapé, perto do fim da página). */
  placement?: "bottom" | "top";
};

/**
 * Link de e-mail que abre um menu com três opções:
 * Gmail e Outlook (abrem um e-mail novo já endereçado, em nova aba) e copiar o endereço.
 *
 * Acessibilidade (padrão WAI-ARIA "menu button"):
 * - botão com aria-haspopup/aria-expanded; Enter, Espaço ou ↓ abrem e focam o 1º item;
 * - ↑/↓, Home/End navegam; Esc fecha e devolve o foco; Tab ou clique fora fecham;
 * - o "copiado" é anunciado por uma região aria-live e mostrado no próprio item.
 */
export function EmailMenu({ email, labels, children, triggerClassName, align = "start", placement = "bottom" }: Props) {
  const [open, setOpen] = useState(false);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  const menuId = useId();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const closeTimer = useRef<number | undefined>(undefined);

  const to = encodeURIComponent(email);
  const options = [
    { key: "gmail", label: labels.gmail, href: `https://mail.google.com/mail/?view=cm&fs=1&to=${to}` },
    { key: "outlook", label: labels.outlook, href: `https://outlook.live.com/mail/0/deeplink/compose?to=${to}` },
  ];

  const focusItem = (index: number) => {
    const items = itemRefs.current.filter(Boolean) as HTMLElement[];
    items[(index + items.length) % items.length]?.focus();
  };

  const close = (returnFocus: boolean) => {
    setOpen(false);
    window.clearTimeout(closeTimer.current);
    if (returnFocus) triggerRef.current?.focus();
  };

  // Fecha ao clicar fora ou quando o foco sai do menu.
  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) close(false);
    };
    const onFocus = (event: FocusEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) close(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("focusin", onFocus);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("focusin", onFocus);
    };
  }, [open]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  const openMenu = (focusIndex: number) => {
    setCopyState("idle");
    setOpen(true);
    // Espera o menu aparecer para mover o foco.
    requestAnimationFrame(() => focusItem(focusIndex));
  };

  const onTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      openMenu(event.key === "ArrowDown" ? 0 : -1);
    }
  };

  const onMenuKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const items = itemRefs.current.filter(Boolean) as HTMLElement[];
    const current = items.indexOf(document.activeElement as HTMLElement);
    const actions: Record<string, () => void> = {
      ArrowDown: () => focusItem(current + 1),
      ArrowUp: () => focusItem(current - 1),
      Home: () => focusItem(0),
      End: () => focusItem(-1),
      Escape: () => close(true),
    };
    const action = actions[event.key];
    if (action) {
      event.preventDefault();
      // Esc fecha só este menu, não o menu do header no celular.
      event.stopPropagation();
      action();
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
    // Deixa o "copiado" visível um instante antes de fechar.
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => close(true), 1600);
  };

  const itemClass =
    "flex min-h-11 w-full items-center gap-3 whitespace-nowrap rounded-lg px-3 text-left text-body font-medium text-text-primary outline-none hover:bg-surface-subtle focus-visible:bg-surface-subtle focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-focus";

  return (
    <div ref={wrapperRef} className="relative inline-flex">
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={() => (open ? close(false) : openMenu(0))}
        onKeyDown={onTriggerKeyDown}
        className={triggerClassName}
      >
        {children}
      </button>

      {open && (
        <div
          id={menuId}
          role="menu"
          aria-label={labels.menu}
          onKeyDown={onMenuKeyDown}
          data-align={align}
          data-placement={placement}
          className="absolute z-30 w-max min-w-56 rounded-xl border border-border bg-surface p-1.5 text-text-primary shadow-[0_12px_32px_rgba(0,0,0,0.14)] data-[align=end]:right-0 data-[align=start]:left-0 data-[align=end-lg]:left-0 lg:data-[align=end-lg]:left-auto lg:data-[align=end-lg]:right-0 data-[align=end-md]:left-0 md:data-[align=end-md]:left-auto md:data-[align=end-md]:right-0 data-[placement=bottom]:top-full data-[placement=bottom]:mt-2 data-[placement=top]:bottom-full data-[placement=top]:mb-2"
        >
          {options.map((option, index) => (
            <a
              key={option.key}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              role="menuitem"
              tabIndex={-1}
              href={option.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => close(false)}
              className={itemClass}
            >
              {option.key === "gmail" ? <GmailIcon /> : <OutlookIcon />}
              {option.label}
              <span className="sr-only"> {labels.opensInNewTab}</span>
            </a>
          ))}
          <div role="separator" className="mx-2 my-1 h-px bg-border" />
          <button
            ref={(el) => {
              itemRefs.current[options.length] = el;
            }}
            type="button"
            role="menuitem"
            tabIndex={-1}
            onClick={copy}
            className={itemClass}
          >
            {copyState === "copied" ? <CheckIcon /> : <CopyIcon />}
            <span className="flex flex-col">
              <span>{copyState === "copied" ? labels.copied : copyState === "failed" ? labels.copyFailed : labels.copy}</span>
              <span className="text-caption font-normal text-text-secondary">{email}</span>
            </span>
          </button>
        </div>
      )}

      {/* Anuncia o resultado da cópia para leitores de tela. */}
      <span role="status" aria-live="polite" className="sr-only">
        {copyState === "copied" ? labels.copied : copyState === "failed" ? labels.copyFailed : ""}
      </span>
    </div>
  );
}

const iconProps = { width: 18, height: 18, viewBox: "0 0 24 24", "aria-hidden": true, focusable: false, className: "shrink-0" } as const;

function GmailIcon() {
  return (
    <svg {...iconProps} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
    </svg>
  );
}

function OutlookIcon() {
  return (
    <svg {...iconProps} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M7 15V9h3.5M7 12h3" strokeLinecap="round" />
      <path d="M14 9.5 17 12l-3 2.5" strokeLinecap="round" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg {...iconProps} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
      <rect x="8" y="8" width="12" height="12" rx="2" />
      <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg {...iconProps} fill="none" stroke="#1a7f37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}
