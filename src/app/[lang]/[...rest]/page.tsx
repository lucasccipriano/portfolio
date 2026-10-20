import { notFound } from "next/navigation";

/** Qualquer caminho desconhecido dentro de /pt-br ou /en cai na 404 personalizada. */
export default function CatchAll() {
  notFound();
}
