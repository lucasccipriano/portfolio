"use client";

import Image from "next/image";
import { useState } from "react";
import type { Locale } from "@/i18n/config";
import { ImageLightbox } from "../ImageLightbox";

type Props = {
  src: string;
  alt: string;
  ratio: number;
  sizes: string;
  locale: Locale;
  enlargeLabel: string;
  closeLabel: string;
  className?: string;
  priority?: boolean;
};

/** Imagem do case que abre ampliada (mesmo overlay do carrossel) ao clicar. */
export function ZoomableImage({ src, alt, ratio, sizes, locale, enlargeLabel, closeLabel, className = "", priority }: Props) {
  const [open, setOpen] = useState(false);
  const [withKeyboard, setWithKeyboard] = useState(false);
  // Tamanho intrínseco aproximado, só para o overlay manter a proporção.
  const image = { src, width: 2400, height: Math.round(2400 / ratio) };

  return (
    <>
      <button
        type="button"
        onClick={(event) => {
          setWithKeyboard(event.detail === 0);
          setOpen(true);
        }}
        className={`relative block w-full cursor-zoom-in overflow-hidden ${className}`}
        style={{ aspectRatio: ratio }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          quality={90}
          className="object-cover"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
        />
        <span className="sr-only">{enlargeLabel}</span>
      </button>
      <ImageLightbox
        item={open ? { image, alt: { en: alt, "pt-br": alt } } : null}
        locale={locale}
        closeLabel={closeLabel}
        restoreFocus={withKeyboard}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
