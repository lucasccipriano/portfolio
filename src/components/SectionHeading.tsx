import type { ReactNode } from "react";

type Props = {
  id: string;
  children: ReactNode;
  /** Contador em sobrescrito, como no Figma: "Works⁽¹⁾". */
  count?: number;
  /** Texto lido por leitores de tela no lugar do contador, ex.: "1 projeto". */
  countLabel?: string;
  size?: "display" | "title";
  className?: string;
};

export function SectionHeading({ id, children, count, countLabel, size = "display", className = "" }: Props) {
  const sizeClass = size === "display" ? "text-display" : "text-title tracking-snug";
  return (
    <h2 id={id} className={`flex items-start font-medium tracking-tight text-text-primary ${sizeClass} ${className}`}>
      <span>{children}</span>
      {typeof count === "number" && (
        <>
          <span aria-hidden="true" className="ml-0.5 text-[0.375em] font-normal leading-[1.2] text-text-secondary">
            ({count})
          </span>
          {countLabel && <span className="sr-only">, {countLabel}</span>}
        </>
      )}
    </h2>
  );
}
