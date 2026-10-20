import type { Locale } from "@/i18n/config";

export type MediaImage = {
  src: string;
  width: number;
  height: number;
  alt: Record<Locale, string>;
};

/**
 * Faixa de mockups abaixo do hero.
 * TODO(Lucas): revisar os textos alternativos 3–5 depois que as imagens forem baixadas do Figma.
 */
export const heroMedia: MediaImage[] = [
  {
    src: "/images/hero/hero-1.jpg",
    width: 1940,
    height: 1100,
    alt: {
      en: "Hand holding a phone with an events app: greeting to Lucas Cipriano, a carousel to pick a music style showing “Bandas de rock” and icons for buffet, barbecue, bartender and photography services.",
      "pt-br":
        "Mão segurando um celular com um app de eventos: saudação a Lucas Cipriano, carrossel para escolher um estilo musical mostrando “Bandas de rock” e ícones de serviços de buffet, churrasco, barman e fotografia.",
    },
  },
  {
    src: "/images/hero/hero-2.jpg",
    width: 1940,
    height: 1100,
    alt: {
      en: "iPhone live activity showing a Copa Libertadores match: Flamengo 2, minute 91, with 70% ball possession.",
      "pt-br":
        "Live activity no iPhone mostrando um jogo da Copa Libertadores: Flamengo 2, aos 91 minutos, com 70% de posse de bola.",
    },
  },
  {
    src: "/images/hero/hero-3.jpg",
    width: 1938,
    height: 1100,
    alt: { en: "Product design project mockup.", "pt-br": "Mockup de projeto de product design." },
  },
  {
    src: "/images/hero/hero-4.jpg",
    width: 1938,
    height: 1100,
    alt: { en: "Product design project mockup.", "pt-br": "Mockup de projeto de product design." },
  },
  {
    src: "/images/hero/hero-5.jpg",
    width: 1938,
    height: 1100,
    alt: { en: "Product design project mockup.", "pt-br": "Mockup de projeto de product design." },
  },
];

export const portrait: MediaImage = {
  src: "/images/about/portrait.jpg",
  width: 418,
  height: 556,
  alt: {
    en: "Black-and-white portrait of Lucas Cipriano, with glasses and a moustache, outdoors.",
    "pt-br": "Retrato em preto e branco de Lucas Cipriano, de óculos e bigode, ao ar livre.",
  },
};

/** Fotos de viagem (faixa do About). Larguras seguem o Figma: 16:9 ou retrato (200px). */
export const travelPhotos: MediaImage[] = [
  {
    src: "/images/about/travel-01.jpg",
    width: 988,
    height: 556,
    alt: {
      en: "Park with autumn trees and a neoclassical arch at the end of a long lawn.",
      "pt-br": "Parque com árvores de outono e um arco neoclássico ao fundo de um longo gramado.",
    },
  },
  {
    src: "/images/about/travel-02.jpg",
    width: 988,
    height: 556,
    alt: { en: "The Eiffel Tower lit up at night.", "pt-br": "A Torre Eiffel iluminada à noite." },
  },
  ...[3, 4, 5, 6, 7, 8, 9, 10, 11].map((n) => {
    const portraitShape = [4, 6, 9].includes(n);
    return {
      src: `/images/about/travel-${String(n).padStart(2, "0")}.jpg`,
      width: portraitShape ? 400 : 988,
      height: 556,
      // TODO(Lucas): descrever cada foto depois do download.
      alt: { en: "Travel photograph by Lucas Cipriano.", "pt-br": "Fotografia de viagem de Lucas Cipriano." },
    };
  }),
];
