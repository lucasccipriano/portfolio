import type { ComponentProps, ReactNode } from "react";

type Props = Omit<ComponentProps<"a">, "target" | "rel"> & {
  children: ReactNode;
  /** Texto lido por leitores de tela avisando que abre em nova aba. */
  newTabLabel: string;
};

/** Link externo: abre em nova aba, sem acesso ao `window.opener`, e avisa o leitor de tela. */
export function ExternalLink({ children, newTabLabel, ...rest }: Props) {
  return (
    <a {...rest} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="sr-only"> {newTabLabel}</span>
    </a>
  );
}
