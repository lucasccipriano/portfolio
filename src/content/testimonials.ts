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
 * aparecem na lista, mas não podem ser selecionadas (e ficam fora da troca automática).
 */
export const testimonialCompanies = ["Privacy", "Globo", "Unigranrio"];

/**
 * Depoimentos reais. Ligados à lista acima pelo nome da empresa (`company`).
 * TODO(Lucas): adicionar os depoimentos de Privacy e Unigranrio (texto, autor, cargo, foto, logo)
 * e, se quiser o painel da direita do Figma, o `project` de cada um. Com 2 ou mais depoimentos,
 * a troca automática (loading ao lado do nome da empresa) começa sozinha.
 */
/**
 * PROVISÓRIO (igual ao Figma): projeto ainda sem conteúdo. Mostra título/descrição de exemplo e o
 * retângulo cinza no lugar da imagem. Trocar pelo projeto real de cada depoimento.
 */
const placeholderProject: Testimonial["project"] = {
  title: { "pt-br": "Title do project", en: "Title do project" },
  description: { "pt-br": "Descrição do projeto de 3 linhas com lorem", en: "Descrição do projeto de 3 linhas com lorem" },
};

export const testimonials: Testimonial[] = [
  // TODO(Lucas): PROVISÓRIO — trocar pelo depoimento real da Privacy (texto, autor, cargo, foto, logo).
  {
    id: "privacy",
    company: "Privacy",
    quoteLang: "pt-BR",
    quote: [
      "Tive a oportunidade de trabalhar com ele na Privacy e acompanhar de perto seu trabalho como Product Designer Sênior. Um dos seus principais diferenciais é o cuidado com a qualidade visual das soluções, combinando um bom senso estético com atenção à estrutura visual, ao refinamento de UI e aos detalhes que fazem diferença na experiência do usuário. Também valoriza o writing, entendendo a importância da clareza e da comunicação em cada etapa da jornada.",
      "Outro aspecto positivo é sua iniciativa em buscar métricas e aprofundar o entendimento dos dados para fundamentar decisões de design, conectando o olhar de craft às necessidades e aos objetivos do produto. Também demonstra curiosidade e abertura para explorar novas possibilidades, especialmente na aplicação de IA aos processos de design, e segue sempre evoluindo seus conhecimentos em foundations e Design Systems.",
      "É um profissional comprometido com a qualidade do que entrega, atento à evolução das práticas de design e que busca ampliar continuamente seu repertório. Recomendo sua parceria para times que valorizam o cuidado com a experiência do usuário, a qualidade visual e a evolução constante do produto.",
    ],
    author: {
      name: "Vinicius Prado",
      role: { en: "Lead Product Designer at Privacy", "pt-br": "Lead Product Designer na Privacy" },
      photo: "/images/testimonials/vinicius.png",
  },

    project: placeholderProject,
  },
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
    project: {
      title: { "pt-br": "Multicontet - Backstage Globo", en: "Backstage Globo" },
      description: { "pt-br": "Trabalhamos junto no time do Multicontet, no qual o principal produto era o CMS responsável pela criação de conteúdo nos sites da Globo (g1, globo.com, ge, gshow, autoesporte entre outros)", en: "Descrição do projeto de 3 linhas com lorem" },
    },
  },
  // TODO(Lucas): PROVISÓRIO — trocar pelo depoimento real da Unigranrio (texto, autor, cargo, foto, logo).
  {
    id: "unigranrio",
    company: "Unigranrio",
    quoteLang: "pt-BR",
    quote: [
      "Um profissional, muito competente, com a mente aberta e muito criativo. Tive o prazer de trabalhar com ele durante o período que estava na Universidade Unigranrio, colaborando nos projetos da equipe de inovação tecnológica.",
      "A capacidade de Lucas em criar interfaces era impressionante, sempre trazia ótimas idéias para os projetos. Ele sempre lapidava nossas idéias deixando-as em outro nível.",
      "Lucas sem dúvidas agregaria a qualquer equipe.",
    ],
    author: {
      name: "Allison Verdan",
      role: { en: "Developer", "pt-br": "Desenvolvedor" },
      photo: "/images/testimonials/allison.png",
    },
    // Título e descrição ainda provisórios; a imagem já é a real.
    project: {
      ...placeholderProject,
      image: {
        src: "/images/testimonials/unigranrio-shot.png",
        width: 1600,
        height: 1200,
        alt: {
          "pt-br":
            "Duas telas do site de pós-graduação da Unigranrio: a página inicial, com o título “Pós-graduação Unigranrio” e os cursos em destaque, e a página de um curso, com o formulário de inscrição.",
          en: "Two screens of Unigranrio’s postgraduate website: the home page, with the title “Pós-graduação Unigranrio” and featured courses, and a course page with the sign-up form.",
        },
      },
    },
  },
];
