"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

type Place = { city: string; timeZone: string; label: string };
type Props = {
  locale: "pt-BR" | "en";
  /** Padrão: Lisboa. */
  place: Place;
  /** Mostrado para quem acessa do continente americano (fuso do navegador "America/..."). */
  americas: Place;
  cityClassName?: string;
};

const noop = () => () => {};
/** O fuso do navegador indica de que continente a pessoa acessa (sem pedir localização). */
const isInAmericas = () => {
  try {
    return Intl.DateTimeFormat()
      .resolvedOptions()
      .timeZone.startsWith("America/");
  } catch {
    return false;
  }
};

/**
 * Cidade + relógio do header (detalhe do Figma): Lisboa por padrão e São Paulo para quem
 * acessa do continente americano. O servidor renderiza Lisboa e um marcador no lugar da hora;
 * o navegador troca a cidade (se for o caso) e mostra a hora, evitando divergência de hidratação.
 * Não é anunciado a cada segundo.
 */
export function LisbonClock({
  locale,
  place: lisbon,
  americas,
  cityClassName,
}: Props) {
  const inAmericas = useSyncExternalStore(noop, isInAmericas, () => false);
  const { city, timeZone, label } = inAmericas ? americas : lisbon;
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
    <>
      <span className={cityClassName}>{city}</span>
      <time
        dateTime={now?.toISOString()}
        title={label}
        className="block min-w-[10ch] text-caption tracking-wide text-text-secondary tabular-nums"
        suppressHydrationWarning
      >
        {text}
      </time>
    </>
  );
}
