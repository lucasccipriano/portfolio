import type { Locale } from "@/i18n/config";

export type Testimonial = {
  id: string;
  company: string;
  /** Logo da empresa (SVG). Opcional: sem logo, o nome aparece em texto. */
  logo?: { src: string; width: number; height: number };
  /** Idioma original do depoimento — não traduzimos falas de terceiros. */
  quoteLang: "pt-BR" | "en";
  quote: string[];
  author: {
    name: string;
    role: Record<Locale, string>;
    photo?: string;
  };
  /** Projeto relacionado (painel à direita no desktop). Opcional. */
  project?: {
    title: Record<Locale, string>;
    description: Record<Locale, string>;
    image?: { src: string; width: number; height: number; alt: Record<Locale, string> };
  };
};

/**
 * Empresas listadas na seção, na ordem do Figma. As que ainda não têm depoimento
 * aparecem na lista, mas não podem ser selecionadas.
 */
export const testimonialCompanies = ["Privacy", "NOS", "Globo", "Cielo", "Unigranrio"];

/**
 * Depoimentos reais. Ligados à lista acima pelo nome da empresa (`company`).
 * TODO(Lucas): adicionar os demais depoimentos (texto, autor, cargo, foto, logo)
 * e, se quiser o painel da direita do Figma, o `project` de cada um.
 */
export const testimonials: Testimonial[] = [
  {
    id: "globo",
    company: "Globo",
    logo: { src: "/images/testimonials/globo-logo.svg", width: 83, height: 24 },
    quoteLang: "pt-BR",
    quote: [
      "O Lucas é um product designer fora da curva e muito experiente. Trabalhamos juntos na Globo, onde o Lucas atuou com excelência de ponta a ponta na evolução dos produtos, desde as fases de discovery, prototipagem, handoffs e acompanhamento de resultados.",
      "Sempre com muita atenção aos detalhes, explorava profundamente os problemas e distintas soluções com muita experiência para compreender a viabilidade das iniciativas e simplificar as soluções.",
      "Também é uma pessoa excelente de se trabalhar. Comunicativo, organizado e disseminador de conhecimento.",
    ],
    author: {
      name: "Rafael Maciel",
      role: { en: "Staff Product Designer at Globo", "pt-br": "Staff Product Designer na Globo" },
      photo: "/images/testimonials/rafael.png",
    },
  },
];
