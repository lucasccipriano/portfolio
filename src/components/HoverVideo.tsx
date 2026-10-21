"use client";

import { useEffect, useRef, useState } from "react";

export type HoverVideoSources = {
  /** Vídeo principal (WebM/VP9, mais leve). */
  webm: string;
  /** Alternativa para navegadores sem WebM (MP4/H.264). */
  mp4: string;
};

type Props = { sources: HoverVideoSources };

/**
 * Vídeo que toca por cima da imagem de capa enquanto o mouse está sobre o card
 * (toda a área clicável do case, não só a imagem).
 * - Fica dentro do contêiner da imagem (que precisa ser `relative`) e não muda o layout.
 * - Só baixa o vídeo no primeiro hover (`preload="none"`), para não pesar no carregamento.
 * - Aparece só quando já está tocando, para nunca mostrar um quadro preto.
 * - Ao tirar o mouse, some e volta para o início.
 * - É decorativo (sem som, `aria-hidden`); a imagem com `alt` continua por baixo.
 * - Não toca com "reduzir movimento" ligado nem em telas de toque.
 *
 * O hover é detectado no <article> do card, que é a área coberta pelo link do case.
 */
export function HoverVideo({ sources }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const media = video?.parentElement;
    const card = media?.closest("article") ?? media;
    if (!video || !media || !card) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inside = false;

    const enter = () => {
      if (inside || reducedMotion.matches) return;
      inside = true;
      video.play().catch(() => {
        /* reprodução bloqueada: fica a imagem */
      });
    };
    const leave = () => {
      if (!inside) return;
      inside = false;
      video.pause();
      setVisible(false);
      video.currentTime = 0;
    };
    const onEnter = (event: PointerEvent) => {
      if (event.pointerType === "mouse") enter();
    };
    const onPlaying = () => {
      if (inside) setVisible(true);
    };

    card.addEventListener("pointerenter", onEnter);
    card.addEventListener("pointerleave", leave);
    video.addEventListener("playing", onPlaying);
    return () => {
      card.removeEventListener("pointerenter", onEnter);
      card.removeEventListener("pointerleave", leave);
      video.removeEventListener("playing", onPlaying);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      tabIndex={-1}
      data-visible={visible}
      className="pointer-events-none absolute inset-0 size-full object-cover opacity-0 transition-[opacity,transform] duration-500 group-hover:scale-[1.02] data-[visible=true]:opacity-100"
    >
      <source src={sources.webm} type='video/webm; codecs="vp9"' />
      <source src={sources.mp4} type="video/mp4" />
    </video>
  );
}
