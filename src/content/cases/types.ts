/**
 * Estrutura de um case study. Todo o texto é escrito por idioma (PT-BR e EN)
 * no arquivo do case; a página só monta o layout.
 */

/** Imagem do case. `file` é o nome do arquivo (sem extensão) dentro da pasta do case em /public. */
export type CaseVideoFiles = { webm: string; mp4: string; poster: string };

export type CaseImage = {
  file: string;
  alt: string;
  /** Proporção do espaço reservado (Figma). Padrão: 16/9. */
  ratio?: number;
  /** Vídeo que substitui a imagem (a imagem/alt servem de descrição). */
  video?: CaseVideoFiles;
};

export type NumberedItem = { title: string; text?: string };

export type Persona = {
  emoji: string;
  name: string;
  description: string;
  traits: { icon: TraitIcon; text: string }[];
  onboarding: string;
};

export type TraitIcon =
  | "bolt"
  | "skip"
  | "gear"
  | "search"
  | "star"
  | "bulb"
  | "tv"
  | "lock"
  | "people"
  | "question"
  | "book"
  | "compass";

export type StickyColor = "yellow" | "slate" | "gray" | "salmon" | "orange" | "green" | "pink";

export type ResultRow = {
  /** Quantos participantes estão no grupo destacado. */
  count: number;
  total: number;
  tone: "negative" | "positive";
  text: string;
};

export type CaseContent = {
  /** Rótulos fixos da página (não variam entre cases). */
  labels: {
    summary: string;
    team: string;
    timeline: string;
    platform: string;
    beforeAfterLabel: string;
    compareLeft: string;
    compareRight: string;
    enlarge: string;
    enlargeVideo: string;
    close: string;
    opensInNewTab: string;
    pauseVideo: string;
    playVideo: string;
  };
  summary: string[];
  team: { role: string; name: string }[];
  timeline: string;
  platform: string;

  heroImage: CaseImage;
  /** Vídeo opcional no topo do case (substitui a heroImage; a imagem vira fallback). Arquivos em /public/videos. */
  heroVideo?: CaseVideoFiles & { description: string };
  coverImage: CaseImage;

  problem: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    risksIntro: string;
    risks: string[];
  };
  /** Comparação lado a lado com divisor arrastável (esquerda × direita). */
  comparison: { left: CaseImage; right: CaseImage };

  challenges: { eyebrow: string; title: string; items: NumberedItem[] };

  opportunity: { eyebrow: string; statement: string; objectivesLabel: string; objectives: string[] };

  personas: { eyebrow: string; title: string; intro: string; items: Persona[] };

  heuristics: {
    eyebrow: string;
    title: string;
    intro: string;
    steps: { title: string; paragraphs: string[]; bullets: { lead?: string; text: string }[]; image: CaseImage }[];
    othersTitle: string;
    /** `href`: o título vira link externo (ex.: artigo de referência). */
    others: (NumberedItem & { href?: string })[];
  };

  flow: { eyebrow: string; title: string; items: { title: string; text: string; image: CaseImage }[] };

  critique: {
    title: string;
    intro: string;
    teamTitle: string;
    team: string[];
    board: {
      title: string;
      groups: { title: string; color: StickyColor; notes: (string | { text: string; color: StickyColor })[] }[];
      /** Idioma original das notas (vieram do time em Portugal). */
      lang: string;
    };
    examples: { title: string; text: string; image: CaseImage }[];
  };

  finalComponents: { eyebrow: string; title: string; intro: string; items: { title: string; text: string[]; image: CaseImage }[] };

  usability: {
    eyebrow: string;
    title: string;
    intro: string[];
    overviewLabel: string;
    results: ResultRow[];
    decisionTitle: string;
    decision: string[];
    screens: { title: string; image: CaseImage }[];
  };

  /** Reflexões finais + "O que eu faria diferente" (Figma: título à esquerda, texto à direita). */
  reflections?: {
    title: string;
    paragraphs: string[];
    differentTitle: string;
    different: { title: string; text: string }[];
  };

  /** Imagem de encerramento, de ponta a ponta, no fim do case (Figma "bg-final"). */
  closingImage?: CaseImage;
};
