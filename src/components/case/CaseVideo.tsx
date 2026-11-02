"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { isRevealed, revealActive } from "@/lib/reveal";
import { LightboxDialog } from "../ImageLightbox";

type Props = {
  webm: string;
  mp4: string;
  poster: string;
  /** Descrição do vídeo para leitores de tela. */
  description: string;
  pauseLabel: string;
  playLabel: string;
  /** Texto do botão que amplia o vídeo (leitores de tela). */
  enlargeLabel: string;
  closeLabel: string;
  className?: string;
  /** Largura exibida, para a imagem de capa (poster) vir no tamanho certo. */
  sizes?: string;
  /** Vídeo no topo da página: a capa é pré-carregada com prioridade (é o maior elemento da tela). */
  preload?: boolean;
};

/**
 * Vídeo do case (abertura e telas): toca sozinho quando aparece na tela, sem som e em loop.
 * - Botão de pausar/reproduzir (WCAG 2.2.2: movimento com mais de 5s precisa poder ser pausado).
 * - Com "reduzir movimento" ligado, começa parado no primeiro quadro (poster).
 * - Pausa sozinho quando sai da tela, para não gastar bateria/CPU.
 * - Clicar no vídeo abre ampliado (mesmo overlay das imagens), continuando do mesmo ponto e com controles.
 */
export function CaseVideo({
  webm,
  mp4,
  poster,
  description,
  pauseLabel,
  playLabel,
  enlargeLabel,
  closeLabel,
  className = "",
  sizes = "100vw",
  preload = false,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  /** O vídeo já tem quadro para mostrar? Até lá aparece a capa otimizada (imagem por baixo). */
  const [hasFrame, setHasFrame] = useState(false);
  // Pausa escolhida pela pessoa (ou por "reduzir movimento"): o vídeo não volta sozinho.
  const userPaused = useRef(false);
  const [expanded, setExpanded] = useState(false);
  const [withKeyboard, setWithKeyboard] = useState(false);
  // O vídeo da página estava tocando quando foi ampliado? Volta a tocar ao fechar.
  const resumeAfterExpand = useRef(false);

  const expand = (fromKeyboard: boolean) => {
    const video = videoRef.current;
    resumeAfterExpand.current = Boolean(video && !video.paused);
    video?.pause();
    setWithKeyboard(fromKeyboard);
    setExpanded(true);
  };
  const collapse = () => {
    setExpanded(false);
    if (resumeAfterExpand.current) videoRef.current?.play().catch(() => setPlaying(false));
  };

  // O vídeo do topo pode carregar o 1º quadro antes de o React ligar o onLoadedData (o evento se perde
  // e o vídeo ficaria invisível atrás da capa, tocando). Confere o estado atual ao montar.
  useEffect(() => {
    const video = videoRef.current;
    if (video && video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) setHasFrame(true);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      userPaused.current = true;
      return;
    }

    // Só começa quando o vídeo está de fato aparecendo; ao sair por completo,
    // pausa e volta para o início, para a pessoa sempre ver desde o começo.
    let visible = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        // "Aparecendo" = metade do vídeo na tela, ou 40% da altura da tela ocupada por ele (vídeos altos).
        const shown = entry.intersectionRect.height;
        const enough = Math.min(entry.boundingClientRect.height * 0.5, window.innerHeight * 0.4);
        if (entry.isIntersecting && shown >= enough) {
          visible = true;
          if (!userPaused.current && document.visibilityState === "visible") {
            // Espera o efeito de entrada (data-reveal) terminar, para o vídeo começar já visível.
            const reveal = video.closest("[data-reveal]");
            const pending = reveal && revealActive() && !isRevealed(reveal);
            const start = () => visible && !userPaused.current && video.play().catch(() => setPlaying(false));
            if (pending) window.setTimeout(start, 1100);
            else start();
          }
        } else if (!entry.isIntersecting) {
          visible = false;
          video.pause();
          if (!userPaused.current) video.currentTime = 0;
        }
      },
      { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] },
    );
    // Aba em segundo plano: pausa; ao voltar, retoma se ainda estiver visível.
    const onVisibility = () => {
      if (document.visibilityState !== "visible") video.pause();
      else if (visible && !userPaused.current) video.play().catch(() => setPlaying(false));
    };
    observer.observe(video);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      userPaused.current = false;
      video.play().catch(() => setPlaying(false));
    } else {
      userPaused.current = true;
      video.pause();
    }
  };

  return (
    <figure className={`relative overflow-hidden bg-surface-media ${className}`} style={{ aspectRatio: 16 / 9 }}>
      {/* Capa como imagem otimizada (AVIF/WebP no tamanho exibido) em vez do `poster` do vídeo,
          que seria sempre o JPG grande. Fica por baixo até o vídeo ter o primeiro quadro. */}
      <Image
        src={poster}
        alt=""
        fill
        sizes={sizes}
        preload={preload}
        fetchPriority={preload ? "high" : undefined}
        loading={preload ? "eager" : "lazy"}
        className="object-cover"
      />
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        // Só o vídeo do topo baixa os dados de início; os outros baixam quando forem tocar (economiza banda no carregamento).
        preload={preload ? "metadata" : "none"}
        aria-hidden="true"
        tabIndex={-1}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onLoadedData={() => setHasFrame(true)}
        onPlaying={() => setHasFrame(true)}
        data-ready={hasFrame}
        className="absolute inset-0 size-full object-cover opacity-0 data-[ready=true]:opacity-100"
      >
        <source src={webm} type='video/webm; codecs="vp9"' />
        <source src={mp4} type="video/mp4" />
      </video>
      <figcaption className="sr-only">{description}</figcaption>

      {/* Área clicável do vídeo inteiro (o botão de pausar fica por cima dela). */}
      <button
        type="button"
        onClick={(event) => expand(event.detail === 0)}
        className="absolute inset-0 cursor-zoom-in focus-visible:outline-offset-[-4px]"
      >
        <span className="sr-only">{enlargeLabel}</span>
      </button>

      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? pauseLabel : playLabel}
        className="absolute right-[clamp(0.75rem,2vw,1.5rem)] bottom-[clamp(0.75rem,2vw,1.5rem)] flex size-11 cursor-pointer items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-md transition-colors hover:bg-black/75 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        {playing ? (
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
            <rect x="3" y="2" width="3.5" height="12" rx="1" fill="currentColor" />
            <rect x="9.5" y="2" width="3.5" height="12" rx="1" fill="currentColor" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
            <path d="M4 2.5v11a.8.8 0 0 0 1.2.7l9-5.5a.8.8 0 0 0 0-1.4l-9-5.5A.8.8 0 0 0 4 2.5Z" fill="currentColor" />
          </svg>
        )}
      </button>

      {/* O <dialog> modal fica na camada de topo: não é cortado pelo overflow do figure. */}
      <LightboxDialog open={expanded} label={description} closeLabel={closeLabel} restoreFocus={withKeyboard} onClose={collapse}>
        <video
          muted
          loop
          playsInline
          autoPlay
          controls
          poster={poster}
          // Ocupa o máximo da tela em 16:9 desde o início (antes de o vídeo carregar ele não tem tamanho).
          className="aspect-video w-[min(calc(100vw-2rem),calc((100dvh-7rem)*16/9))] rounded-card bg-black shadow-2xl sm:w-[min(calc(100vw-6rem),calc((100dvh-7rem)*16/9))]"
          onLoadedMetadata={(event) => {
            // Continua do ponto em que o vídeo da página estava.
            event.currentTarget.currentTime = videoRef.current?.currentTime ?? 0;
          }}
        >
          <source src={webm} type='video/webm; codecs="vp9"' />
          <source src={mp4} type="video/mp4" />
        </video>
      </LightboxDialog>
    </figure>
  );
}
