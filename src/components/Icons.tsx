/**
 * Ícones do Figma como componentes SVG (sem biblioteca de ícones).
 * Decorativos por padrão: o texto ao lado já descreve a ação.
 * TODO: confirmar os paths com os SVGs exportados do Figma (download bloqueado no momento).
 */
type IconProps = { size?: number; className?: string };

const decorative = { "aria-hidden": true, focusable: false } as const;

export function ArrowUpRightIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className} {...decorative}>
      <path d="M6 14 14 6M7.5 6H14v6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowRightIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className} {...decorative}>
      <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MenuIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...decorative}>
      <path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function CloseIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...decorative}>
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function PauseIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className={className} {...decorative}>
      <rect x="4" y="3" width="2.5" height="10" rx="1" />
      <rect x="9.5" y="3" width="2.5" height="10" rx="1" />
    </svg>
  );
}

export function PlayIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className={className} {...decorative}>
      <path d="M5 3.2v9.6a.6.6 0 0 0 .9.5l7.6-4.8a.6.6 0 0 0 0-1L5.9 2.7a.6.6 0 0 0-.9.5Z" />
    </svg>
  );
}

/** Bandeira de Portugal (Figma: 30×20, cantos arredondados). */
export function FlagPortugal({ className }: { className?: string }) {
  return (
    <svg width="30" height="20" viewBox="0 0 30 20" className={className} {...decorative}>
      <defs>
        <clipPath id="flag-pt-clip">
          <rect width="30" height="20" rx="10" />
        </clipPath>
      </defs>
      <g clipPath="url(#flag-pt-clip)">
        <rect width="12" height="20" fill="#046A38" />
        <rect x="12" width="18" height="20" fill="#DA291C" />
        <circle cx="12" cy="10" r="4.6" fill="#FFE900" />
        <path d="M9.6 7.4h4.8v3.8a2.4 2.4 0 0 1-4.8 0z" fill="#fff" stroke="#DA291C" strokeWidth=".9" />
      </g>
    </svg>
  );
}
