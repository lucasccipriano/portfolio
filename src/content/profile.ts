import type { Locale } from "@/i18n/config";

/**
 * Fonte única dos dados de perfil.
 * Tudo que aparece no header, rodapé e JSON-LD sai daqui, para nunca divergir.
 *
 * TODO(Lucas): substituir os valores marcados com TODO pelos reais.
 */

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://lucascipriano.com").replace(/\/$/, "");

type Localized<T = string> = Record<Locale, T>;

export const profile = {
  name: "Lucas Cipriano",
  /** Mantém o texto do Figma. Use exatamente o mesmo cargo no LinkedIn e demais perfis. */
  jobTitle: {
    en: "Product Designer Senior",
    "pt-br": "Product Designer Sênior",
  } satisfies Localized,
  /** Empresas listadas no hero ("Previously: …"), cada uma com link para o produto. */
  previousCompanies: [
    { name: "Privacy", url: "https://privacy.com.br/" },
    { name: "NOS", url: "https://www.nos.pt/tv/boxv4" },
    { name: "Globo", url: "https://globoplay.globo.com/" },
    { name: "Cielo", url: "https://cielo.com.br/gateway-de-pagamento/" },
  ],
  yearsOfExperience: 8,
  careerStartYear: 2019,
  location: {
    city: "Lisbon",
    cityLocalized: { en: "Lisbon", "pt-br": "Lisboa" } satisfies Localized,
    countryCode: "PT",
    timeZone: "Europe/Lisbon",
  },
  nationality: "BR",
  languages: ["pt-BR", "en"],
  knowsAbout: [
    "Product Design",
    "UX Design",
    "UI Design",
    "Interaction Design",
    "User Research",
    "Design Systems",
    "Onboarding",
    "TV and Streaming",
    "Fintech",
    "EdTech",
    "Social Networks",
    "Creator Economy",
  ],
  /** Descrição factual usada em meta description e JSON-LD (precisa refletir o que está visível na página). */
  description: {
    en: "Lucas Cipriano is a Brazilian Product Designer based in Lisbon, Portugal, with 8 years of experience designing digital products used by millions in fintech, education, TV and streaming, social networks and the creator economy. Previously at Privacy, NOS, Globo and Cielo. Open to work and relocation.",
    "pt-br":
      "Lucas Cipriano é um Product Designer brasileiro baseado em Lisboa, Portugal, com 8 anos de experiência em produtos digitais usados por milhões de pessoas em fintech, educação, TV e streaming, redes sociais e creator economy. Antes, Privacy, NOS, Globo e Cielo. Aberto a oportunidades e relocação.",
  } satisfies Localized,
  availability: {
    onsite: { en: "On-site: Portugal, Europe", "pt-br": "Presencial: Portugal, Europa" } satisfies Localized,
    remote: { en: "Remote: USA, Latin America, Brazil", "pt-br": "Remoto: EUA, América Latina, Brasil" } satisfies Localized,
  },
  image: "/images/about/portrait.jpg",
  cv: {
    // Para trocar o currículo: substitua o PDF em /public/cv/ (mesmo nome) e atualize o tamanho.
    href: "/cv/lucas-cipriano-cv.pdf",
    sizeLabel: "105 KB" as string | null,
  },
  contact: {
    email: "lucasccipriano@gmail.com",
  },
  /** Perfis externos. Vão para os links da página e para `sameAs` no JSON-LD. */
  social: {
    linkedin: "https://www.linkedin.com/in/lucas-cipriano/",
    instagram: "https://www.instagram.com/lucasccipriano/",
    unsplash: "https://unsplash.com/pt-br/@lucasccipriano",
  },
} as const;

export const sameAs = Object.values(profile.social).filter((url) => !url.includes("TODO"));

export const personId = `${siteUrl}/#person`;
export const websiteId = `${siteUrl}/#website`;
