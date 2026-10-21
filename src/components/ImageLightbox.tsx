"use client";

import Image from "next/image";
import { useEffect, useRef, type ReactNode } from "react";
import type { Locale } from "@/i18n/config";
import type { CarouselImage } from "@/content/media";
import { CloseIcon } from "./Icons";

type Props = {
  item: CarouselImage | null;
  locale: Locale;
  closeLabel: string;
  /** Devolver o foco à imagem clicada ao fechar (ver LightboxDialog). */
  restoreFocus: boolean;
  onClose: () => void;
};

type DialogProps = {
  open: boolean;
  /** Nome acessível do diálogo (texto alternativo da imagem ou descrição do vídeo). */
  label?: string;
  closeLabel: string;
  /**
   * Devolver o foco ao elemento clicado ao fechar. Necessário para quem usa teclado;
   * desligado quando foi aberto com o mouse, para não deixar contorno de foco.
   */
  restoreFocus: boolean;
  onClose: () => void;
  children: ReactNode;
};

/** Classes da imagem ampliada: tamanho original, reduzido só o necessário para caber na tela. */
const lightboxMediaClass =
  "h-auto max-h-[calc(100dvh-7rem)] w-auto max-w-[calc(100vw-2rem)] rounded-card object-contain shadow-2xl sm:max-w-[calc(100vw-6rem)]";

/**
 * Overlay escuro para mídia ampliada (imagens e vídeos).
 * Usa <dialog> nativo em modo modal: o foco fica preso dentro dele, Esc fecha
 * e, ao fechar, o foco volta para o elemento que abriu (só quando foi aberto pelo teclado).
 * Formas de fechar: botão "Fechar" sempre visível, tecla Esc e clique fora da mídia.
 */
export function LightboxDialog({ open, label, closeLabel, restoreFocus, onClose, children }: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) {
      dialog.close(); // o navegador devolve o foco ao elemento que abriu o diálogo
      if (!restoreFocus && document.activeElement instanceof HTMLElement) document.activeElement.blur();
    }

    if (!open) return;
    // Trava a rolagem da página por trás do overlay.
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [open, restoreFocus]);

  return (
    <dialog
      ref={dialogRef}
      aria-label={label}
      onClose={onClose}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        // Clique no overlay (fora da mídia e do botão) fecha.
        if (event.target === event.currentTarget) onClose();
      }}
      className="on-inverse m-0 h-dvh max-h-none w-screen max-w-none cursor-zoom-out overflow-hidden bg-transparent p-0 text-text-inverse backdrop:bg-black/85 backdrop:backdrop-blur-sm open:flex open:items-center open:justify-center open:animate-lightbox-in"
    >
      {open && (
        <>
          {children}
          <button
            type="button"
            onClick={onClose}
            autoFocus
            className="fixed right-4 top-4 inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full bg-white py-2 pl-4 pr-3 text-body font-medium text-text-primary shadow-lg transition-colors hover:bg-[#e8e8e8] sm:right-6 sm:top-6"
          >
            {closeLabel}
            <CloseIcon size={20} />
            <kbd aria-hidden="true" className="ml-1 hidden rounded border border-border px-1.5 py-0.5 font-sans text-caption text-text-secondary sm:inline">
              Esc
            </kbd>
          </button>
        </>
      )}
    </dialog>
  );
}

/** Imagem ampliada sobre o overlay. */
export function ImageLightbox({ item, locale, closeLabel, restoreFocus, onClose }: Props) {
  return (
    <LightboxDialog
      open={item !== null}
      label={item?.alt[locale]}
      closeLabel={closeLabel}
      restoreFocus={restoreFocus}
      onClose={onClose}
    >
      {item && (
        <Image
          src={item.image}
          alt={item.alt[locale]}
          width={item.image.width}
          height={item.image.height}
          sizes="100vw"
          quality={100}
          loading="eager"
          className={`pointer-events-none select-none ${lightboxMediaClass}`}
        />
      )}
    </LightboxDialog>
  );
}
