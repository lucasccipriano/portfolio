import type { StaticImageData } from "next/image";
import type { Locale } from "@/i18n/config";

// lp-privacy2.png (3840px) é mais nítida que lp-privacy.png (1920px) em telas Retina.
import lpPrivacy from "../../public/images/carrossel-works/lp-privacy2.png";
import nosTv from "../../public/images/carrossel-works/nostv.png";
import flamengoRiver from "../../public/images/carrossel-works/FlamengovsRiverPlate.webp";
import gabigol from "../../public/images/carrossel-works/Gabigol.webp";
import crypto from "../../public/images/carrossel-works/crypto.png";
import godOfWar from "../../public/images/carrossel-works/godofwar.png";
import kingsLendas from "../../public/images/carrossel-works/kingslendasfantasy.png";

import travel01 from "../../public/images/about/travel-01.jpg";
import travel02 from "../../public/images/about/travel-02.jpg";
import travel03 from "../../public/images/about/travel-03.jpg";
import travel04 from "../../public/images/about/travel-04.jpg";
import travel05 from "../../public/images/about/travel-05.jpg";
import travel06 from "../../public/images/about/travel-06.jpg";
import travel07 from "../../public/images/about/travel-07.jpg";
import travel08 from "../../public/images/about/travel-08.jpg";
import travel09 from "../../public/images/about/travel-09.jpg";
import travel10 from "../../public/images/about/travel-10.jpg";
import travel11 from "../../public/images/about/travel-11.jpg";

export type MediaImage = {
  src: string;
  width: number;
  height: number;
  alt: Record<Locale, string>;
};

/**
 * Imagem do carrossel do hero. Importada de forma estática a partir de
 * `public/images/carrossel-works/`: o Next.js lê largura/altura do arquivo, gera
 * AVIF/WebP nos tamanhos certos e cria o placeholder desfocado.
 */
export type CarouselImage = {
  image: StaticImageData;
  alt: Record<Locale, string>;
  /** Enquadramento dentro do card (CSS object-position). Padrão: "center". */
  position?: string;
  /** Zoom da imagem dentro do card, como no Figma. Padrão: 1. */
  scale?: number;
  /** Qualidade da compressão (precisa estar em `images.qualities` no next.config). Padrão: 90. */
  quality?: 90 | 100;
  /** Formato do card (só na faixa do About). Padrão: "landscape" (16:9). */
  shape?: "landscape" | "portrait";
};

/** Faixa de trabalhos abaixo do hero, na mesma ordem do Figma (a primeira é a imagem LCP). */
export const heroMedia: CarouselImage[] = [
  {
    image: lpPrivacy,
    quality: 100,
    alt: {
      en: "Privacy landing page in orange and white with the headline “Muito prazer, somos a Privacy”, creator photos and the steps to start earning.",
      "pt-br":
        "Landing page da Privacy em laranja e branco com o título “Muito prazer, somos a Privacy”, fotos de criadoras e os passos para começar a faturar.",
    },
  },
  {
    image: flamengoRiver,
    alt: {
      en: "iPhone live activity for the Copa Libertadores final: Flamengo 2 × 1 River Plate at minute 91, with 70% ball possession for Flamengo.",
      "pt-br":
        "Live activity no iPhone da final da Copa Libertadores: Flamengo 2 × 1 River Plate aos 91 minutos, com 70% de posse de bola do Flamengo.",
    },
  },
  {
    image: nosTv,
    /** Figma: imagem ampliada ~115% e centralizada. */
    scale: 1.147,
    alt: {
      en: "NOS TV home screen on a television in a dark room, with the side menu and rows of films and series.",
      "pt-br": "Tela inicial da NOS TV numa televisão em uma sala escura, com o menu lateral e fileiras de filmes e séries.",
    },
  },
  {
    image: kingsLendas,
    quality: 100,
    alt: {
      en: "Kings Lendas fantasy game on a tablet: line-up builder with a field map, player list, match-ups and most-picked players.",
      "pt-br":
        "Fantasy game Kings Lendas num tablet: montagem de escalação com mapa, lista de jogadores, confrontos da rodada e mais escalados.",
    },
  },
  {
    image: crypto,
    /** Figma: imagem 4:3 alinhada ao topo (corta só embaixo). */
    position: "top",
    alt: {
      en: "Crypto app screens: Bitcoin at R$ 342,150.00 with a price chart, the user’s Bitcoin balance and market statistics.",
      "pt-br":
        "Telas de um app de cripto: Bitcoin a R$ 342.150,00 com gráfico de preço, o saldo de Bitcoin do usuário e estatísticas de mercado.",
    },
  },
  {
    image: godOfWar,
    alt: {
      en: "God of War character page with a close-up of Kratos, his biography and a selector of other characters.",
      "pt-br": "Página de personagem de God of War com close de Kratos, a biografia dele e um seletor de outros personagens.",
    },
  },
  {
    image: gabigol,
    alt: {
      en: "iPhone live activity “Destaque da Partida” featuring Gabriel Barbosa, number 9: 2 goals, 2 cards, 4 shots on target and 5 attempts.",
      "pt-br":
        "Live activity no iPhone “Destaque da Partida” com Gabriel Barbosa, camisa 9: 2 gols, 2 cartões, 4 chutes a gol e 5 finalizações.",
    },
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

/** Fotos de viagem (faixa do About). Formato do card segue o Figma: 16:9 ou retrato (200×278). */
export const travelPhotos: CarouselImage[] = [
  {
    image: travel01,
    alt: {
      en: "Parco Sempione in Milan in autumn, with a long lawn leading to the Arco della Pace.",
      "pt-br": "Parco Sempione, em Milão, no outono, com um longo gramado até o Arco della Pace.",
    },
  },
  {
    image: travel02,
    alt: { en: "The Eiffel Tower lit up at night in Paris.", "pt-br": "A Torre Eiffel iluminada à noite, em Paris." },
  },
  {
    image: travel03,
    alt: {
      en: "Big Ben and the Palace of Westminster in London under a deep blue sky.",
      "pt-br": "Big Ben e o Palácio de Westminster, em Londres, sob um céu azul intenso.",
    },
  },
  {
    image: travel04,
    shape: "portrait",
    alt: {
      en: "Church bell tower and historic buildings seen from a narrow street under a clear blue sky.",
      "pt-br": "Torre de igreja e prédios históricos vistos de uma rua estreita, sob céu azul.",
    },
  },
  {
    image: travel05,
    alt: {
      en: "View over Lisbon’s rooftops to São Jorge Castle and the Tagus river at sunset.",
      "pt-br": "Vista dos telhados de Lisboa até o Castelo de São Jorge e o rio Tejo ao entardecer.",
    },
  },
  {
    image: travel06,
    shape: "portrait",
    alt: {
      en: "Airplane window showing mountains and clouds far below.",
      "pt-br": "Janela de avião mostrando montanhas e nuvens lá embaixo.",
    },
  },
  {
    image: travel07,
    alt: {
      en: "Pink Art Deco villa at Serralves, in Porto, with a manicured garden in front.",
      "pt-br": "Casa de Serralves, no Porto, em art déco rosa, com um jardim bem cuidado à frente.",
    },
  },
  {
    image: travel08,
    alt: {
      en: "Large bronze sculpture of a broken torso in front of a red-brick church, with two people beside it.",
      "pt-br": "Grande escultura de bronze de um torso partido em frente a uma igreja de tijolos, com duas pessoas ao lado.",
    },
  },
  {
    image: travel09,
    shape: "portrait",
    alt: {
      en: "Mountain ranges seen from above under a deep blue sky.",
      "pt-br": "Cadeias de montanhas vistas do alto, sob um céu azul intenso.",
    },
  },
  {
    image: travel10,
    alt: {
      en: "Praça do Comércio in Lisbon, with the equestrian statue and yellow arcades under a cloudy sky.",
      "pt-br": "Praça do Comércio, em Lisboa, com a estátua equestre e as arcadas amarelas sob céu nublado.",
    },
  },
  {
    image: travel11,
    alt: {
      en: "Turquoise sea with a breakwater and lighthouse, and mountains on the horizon.",
      "pt-br": "Mar turquesa com um quebra-mar e um farol, e montanhas no horizonte.",
    },
  },
];
