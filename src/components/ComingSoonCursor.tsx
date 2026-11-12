"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

const noop = () => () => {};

/**
 * Cursor "Em breve" do case bloqueado: uma pílula preta que segue o mouse
 * enquanto ele está sobre o card. Só com mouse (no toque não existe hover) e decorativa:
 * o "Em breve" continua escrito no card para leitores de tela.
 * Fica dentro do card e escuta o mouse no elemento pai (o próprio card).
 */
export function ComingSoonCursor({ label }: { label: string }) {
  const anchorRef = useRef<HTMLSpanElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);
  // A pílula vai direto no <body>: dentro do card, o efeito de entrada (translate) prenderia o
  // `position: fixed` ao card em vez da janela.
  const mounted = useSyncExternalStore(noop, () => true, () => false);

  useEffect(() => {
    const card = anchorRef.current?.parentElement;
    if (!card) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");

    let frame = 0;
    let x = 0;
    let y = 0;
    const place = () => {
      frame = 0;
      const pill = pillRef.current;
      if (pill) pill.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    };
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !fine.matches) return;
      x = event.clientX;
      y = event.clientY;
      if (!frame) frame = requestAnimationFrame(place);
      setVisible(true);
    };
    const onLeave = () => setVisible(false);

    card.addEventListener("pointermove", onMove);
    card.addEventListener("pointerenter", onMove);
    card.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      card.removeEventListener("pointermove", onMove);
      card.removeEventListener("pointerenter", onMove);
      card.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <span ref={anchorRef} aria-hidden="true" className="contents">
      {mounted &&
        createPortal(
          <span
            ref={pillRef}
            aria-hidden="true"
            data-visible={visible}
            className="pointer-events-none fixed top-0 left-0 z-50 whitespace-nowrap rounded-full bg-[#111] px-4 py-2.5 text-[0.875rem] font-medium leading-none text-white opacity-0 transition-opacity duration-150 data-[visible=true]:opacity-100 motion-reduce:transition-none"
          >
            {label}
          </span>,
          document.body,
        )}
    </span>
  );
}
