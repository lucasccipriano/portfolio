import { notFound } from "next/navigation";

/** Rota que só existe para dar 404: não há página para validar como navegação instantânea. */
export const instant = false;

/** Qualquer caminho desconhecido dentro de /pt-br ou /en cai na 404 personalizada. */
export default function CatchAll() {
  notFound();
}
