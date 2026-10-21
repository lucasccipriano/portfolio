import type { Locale } from "@/i18n/config";

type Localized<T = string> = Record<Locale, T>;

export type Project = {
  slug: string;
  company: string;
  category: Localized;
  period: { start: number; end: number };
  title: Localized;
  /** Nome curto do case (aparece no header da página do case). */
  shortTitle: Localized;
  summary: Localized;
  cover: { src: string; width: number; height: number; alt: Localized };
  /** Vídeo opcional que toca sobre a capa enquanto o mouse está em cima (arquivos em /public/videos). */
  hoverVideo?: { webm: string; mp4: string };
  /** Ficha do projeto (vira <dl> e JSON-LD). */
  facts: {
    role: Localized;
    platforms: Localized;
    team: Localized<string[]>;
  };
  datePublished: string;
  dateModified: string;
  keywords: string[];
};

export const projects: Project[] = [
  {
    slug: "nos-tv-onboarding",
    company: "NOS",
    category: { en: "TV platform", "pt-br": "Plataforma de TV" },
    period: { start: 2023, end: 2025 },
    shortTitle: { en: "TV Onboarding", "pt-br": "TV Onboarding" },
    title: {
      en: "Designing the onboarding for a new TV experience",
      "pt-br": "Desenhando o onboarding de uma nova experiência de TV",
    },
    summary: {
      en: "How the onboarding for a new NOS TV platform was designed, exploring flows, interactions, and interfaces to create an intuitive experience from the very first interaction",
      "pt-br":
        "Como foi desenhado o onboarding da nova plataforma de TV da NOS, explorando fluxos, interações e interfaces para criar uma experiência intuitiva desde a primeira interação",
    },
    cover: {
      src: "/images/work/uma.png",
      width: 1550,
      height: 872,
      alt: {
        en: "Welcome screen of the UMA TV platform: the yellow UMA logo, the text “Bem-vindo” and a “Começar” button over a dark photo of a man.",
        "pt-br":
          "Tela de boas-vindas da plataforma UMA na TV: logo amarelo da UMA, o texto “Bem-vindo” e o botão “Começar” sobre a foto escura de um homem.",
      },
    },
    hoverVideo: {
      webm: "/videos/home/home-video-uma.webm",
      mp4: "/videos/home/home-video-uma.mp4",
    },
    facts: {
      role: { en: "Product Designer", "pt-br": "Product Designer" },
      platforms: { en: "TV STB, Android TV, tvOS", "pt-br": "TV STB, Android TV, tvOS" },
      team: {
        en: ["Design Manager", "Visual Designer", "Product Designer", "UX Researcher", "Product Owner"],
        "pt-br": ["Design Manager", "Visual Designer", "Product Designer", "UX Researcher", "Product Owner"],
      },
    },
    datePublished: "2026-10-20",
    dateModified: "2026-10-20",
    keywords: ["onboarding", "TV", "streaming", "Android TV", "tvOS", "NOS", "UX"],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
