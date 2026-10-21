import type { TraitIcon } from "@/content/cases/types";

/** Ícones simples (16px) dos traços das personas. Decorativos: o texto ao lado já diz tudo. */
const paths: Record<TraitIcon, React.ReactNode> = {
  bolt: <path d="M9 1.5 3.5 9H8l-1 5.5L12.5 7H8l1-5.5Z" fill="currentColor" />,
  skip: <path d="M2 3.5v9l5.5-4.5L2 3.5Zm6 0v9l5.5-4.5L8 3.5Z" fill="currentColor" />,
  gear: (
    <>
      <circle cx="8" cy="8" r="2.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2M3.4 3.4l1.4 1.4M11.2 11.2l1.4 1.4M3.4 12.6l1.4-1.4M11.2 4.8l1.4-1.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
  search: (
    <>
      <circle cx="7" cy="7" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="m10.2 10.2 3.3 3.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
  star: <path d="m8 1.8 1.9 3.9 4.3.6-3.1 3 .7 4.3L8 11.6l-3.8 2 .7-4.3-3.1-3 4.3-.6L8 1.8Z" fill="currentColor" />,
  bulb: (
    <>
      <path d="M8 1.8a4.3 4.3 0 0 0-2.6 7.7c.6.5.9 1.1.9 1.8h3.4c0-.7.3-1.3.9-1.8A4.3 4.3 0 0 0 8 1.8Z" fill="currentColor" />
      <path d="M6.3 12.8h3.4M6.8 14.4h2.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </>
  ),
  tv: (
    <>
      <rect x="1.8" y="2.8" width="12.4" height="8.6" rx="1.4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M6.6 5.4v3.4l3-1.7-3-1.7ZM5 14h6" fill="currentColor" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  lock: (
    <>
      <rect x="3" y="7" width="10" height="7.2" rx="1.6" fill="currentColor" />
      <path d="M5.2 7V5.2a2.8 2.8 0 0 1 5.6 0V7" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </>
  ),
  people: (
    <>
      <circle cx="5.8" cy="5.4" r="2.3" fill="currentColor" />
      <circle cx="11.2" cy="6" r="1.9" fill="currentColor" />
      <path d="M1.6 13.6c0-2.4 1.9-4.2 4.2-4.2s4.2 1.8 4.2 4.2H1.6ZM10.8 13.6c0-1.3-.4-2.5-1.1-3.4a3.5 3.5 0 0 1 5 3.4h-3.9Z" fill="currentColor" />
    </>
  ),
  question: (
    <>
      <circle cx="8" cy="8" r="6.2" fill="currentColor" />
      <path d="M6.3 6.2a1.8 1.8 0 1 1 2.5 1.6c-.5.2-.8.6-.8 1.1v.4" fill="none" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="8" cy="11.4" r=".8" fill="white" />
    </>
  ),
  book: <path d="M1.8 3.4c2-.6 4.2-.4 6.2.8 2-1.2 4.2-1.4 6.2-.8v9.4c-2-.6-4.2-.4-6.2.8-2-1.2-4.2-1.4-6.2-.8V3.4Zm6.2.8v9.4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />,
  compass: (
    <>
      <circle cx="8" cy="8" r="6.2" fill="currentColor" />
      <path d="m10.6 5.4-1.6 3.6-3.6 1.6 1.6-3.6 3.6-1.6Z" fill="white" />
    </>
  ),
};

export function TraitIconSvg({ icon }: { icon: TraitIcon }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      {paths[icon]}
    </svg>
  );
}

/** Ícone de pessoa usado no resumo do teste de usabilidade. */
export function PersonIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 56 56" className={className} style={style} aria-hidden="true" focusable="false">
      <circle cx="28" cy="18" r="10" fill="currentColor" />
      <path d="M9 48c0-10.5 8.5-17 19-17s19 6.5 19 17v1H9v-1Z" fill="currentColor" />
    </svg>
  );
}
