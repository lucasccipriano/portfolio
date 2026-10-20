/** Injeta JSON-LD no HTML do servidor (visível mesmo sem JavaScript). */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Escapa "<" para impedir que o conteúdo feche a tag <script>.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
