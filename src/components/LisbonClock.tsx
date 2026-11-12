"use client";

import { useEffect, useState } from "react";

type Props = { locale: "pt-BR" | "en"; timeZone: string; label: string };

/**
 * Relógio com a hora local de Lisboa (detalhe do Figma).
 * Renderiza um marcador no servidor e só mostra a hora no navegador,
 * evitando divergência de hidratação. Não é anunciado a cada segundo.
 */
export function LisbonClock({ locale, timeZone, label }: Props) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    const first = window.setTimeout(tick, 0);
    const id = window.setInterval(tick, 1000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, []);

  const text = now
    ? new Intl.DateTimeFormat(locale, {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        timeZone,
      }).format(now)
    : "--:--:--";

  return (
    <time
      dateTime={now?.toISOString()}
      title={label}
      className="block min-w-[10ch] text-caption tracking-wide text-text-secondary tabular-nums"
      suppressHydrationWarning
    >
      {text}
    </time>
  );
}
