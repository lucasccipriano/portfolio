import type { Locale } from "@/i18n/config";
import type { CaseContent } from "./types";

/**
 * Case: Onboarding da nova UMA TV (NOS).
 * Fonte: Figma "Resumido" (nó 132:1180). Texto em PT-BR revisado; EN traduzido a partir dele.
 *
 * Imagens: salve os arquivos em /public/images/work/nos-tv-onboarding/ com os nomes de `file`
 * (extensão .png, .jpg, .webp ou .avif). Enquanto um arquivo não existir, a página mostra
 * um espaço reservado com o nome esperado.
 */
export const caseFolder = "/images/work/nos-tv-onboarding";

/**
 * Vídeos do case: o .webm fica em /public/videos/onboarding (versões em inglês terminam em "-en").
 * O MP4 (para Safari) e a capa (.jpg) são gerados a partir dele em /public/videos/onboarding/gerados, com o mesmo nome.
 */
const video = (name: string) => ({
  webm: `/videos/onboarding/${name}.webm`,
  mp4: `/videos/onboarding/gerados/${name}.mp4`,
  poster: `/videos/onboarding/gerados/${name}.jpg`,
});
const heroVideoFiles = video("onboarding_UMA_fluxo");

const pt: CaseContent = {
  labels: {
    summary: "Resumo",
    team: "Equipe",
    timeline: "Timeline",
    platform: "Plataforma",
    beforeAfterLabel: "Comparação entre a versão anterior e a nova versão da UMA TV",
    compareLeft: "Versão anterior",
    compareRight: "Nova versão",
    enlarge: "(ampliar imagem)",
    enlargeVideo: "(ampliar vídeo)",
    close: "Fechar",
    opensInNewTab: "(abre em nova aba)",
    pauseVideo: "Pausar vídeo",
    playVideo: "Reproduzir vídeo",
  },
  summary: [
    "A UMA TV é o principal produto de TV da NOS, no qual atuei por mais de 2 anos como Product Designer Sênior. Como parte da evolução para uma experiência multiplataforma (STB, Apple TV, Android TV), liderei o processo do onboarding para o produto.",
    "A primeira versão não apresentou bons resultados nos testes com usuários e com prazo apertado para entrega, decidimos adotar uma abordagem mais simples: tooltips contextuais que introduzem as funcionalidades ao longo da jornada.",
    "A solução foi validada em uma rodada de testes de usabilidade, com cerca de 9 usuários, e lançada com a nova versão da TV para cerca de 1 milhão de assinantes.",
  ],
  team: [
    { role: "Design Manager", name: "Nelson Delicado" },
    { role: "Visual Designer", name: "Renato Reis" },
    { role: "Product Designer", name: "Lucas Cipriano" },
    { role: "UX Researcher", name: "Lúcia Abreu" },
    { role: "Product Owner", name: "Mariana Marques" },
  ],
  timeline: "2024 → 2 meses",
  platform: "TV STB, Android TV, tvOS",

  heroVideo: {
    ...heroVideoFiles,
    description:
      "Vídeo do player da nova UMA TV exibindo o filme Tenet: a barra de reprodução aparece com a dica contextual “Ver do início”.",
  },
  heroImage: {
    file: "hero",
    alt: "Player da nova UMA TV exibindo o filme Tenet no canal TVCine Top, com a dica “Pressione OK para mais opções”.",
  },
  closingImage: {
    file: "bg-final",
    alt: "Mosaico inclinado de telas da nova UMA TV sobre fundo escuro: página inicial, player, oferta de 1 mês grátis e boas-vindas.",
  },
  coverImage: {
    file: "cover-tv-room",
    alt: "Televisão numa sala escura mostrando a página inicial da nova UMA TV, com o menu lateral e fileiras de conteúdos.",
  },

  problem: {
    eyebrow: "Problema",
    title: "O produto mudou.\nO hábito dos usuários, não.",
    paragraphs: [
      "A UMA TV está no mercado há mais de 10 anos, e seus usuários construíram hábitos sólidos em torno dela. A nova versão traz uma experiência completamente diferente da atual. Para quem já usa, isso significa reaprender o que dominava. Para quem chega, significa entender um produto amplo de uma só vez.",
      "O desafio não era ensinar um produto novo, era fazer a transição sem perder ninguém no caminho.",
    ],
    risksIntro: "Sem uma transição bem conduzida, o risco é:",
    risks: ["Queda de uso", "Aumento de chamados no suporte", "Resistência à atualização"],
  },
  comparison: {
    left: {
      file: "compare-old",
      ratio: 1440 / 810,
      alt: "Versão anterior da UMA TV: grade de filmes como Super Mario Bros., Horizon e Divergente.",
    },
    right: {
      file: "compare-new",
      ratio: 1440 / 810,
      alt: "Nova UMA TV: página inicial com o destaque “Agora na TV” e a campanha “Oferta de 1 mês”.",
    },
  },

  challenges: {
    eyebrow: "Desafio",
    title: "Principais desafios para o onboarding",
    items: [
      {
        title: "Complexidade no primeiro contato",
        text: "A nova plataforma introduziu diversos recursos e conceitos, o que tornou a primeira interação potencialmente complexa para os usuários.",
      },
      {
        title: "Falta de orientação inicial",
        text: "Sem uma orientação clara, os usuários podem ter dificuldade para entender por onde começar e o que fazer em seguida.",
      },
      {
        title: "Sobrecarga de informações",
        text: "Apresentar muitas informações de uma só vez pode sobrecarregar os usuários e tornar a experiência mais difícil de entender.",
      },
      {
        title: "Possíveis perdas de referência",
        text: "Usuários antigos não reconhecem onde estão os fluxos que já dominavam.",
      },
    ],
  },

  opportunity: {
    eyebrow: "Oportunidade",
    statement:
      "Criar um onboarding intuitivo e relevante para diferentes perfis de usuário, mantendo uma única experiência",
    objectivesLabel: "Objetivos",
    objectives: [
      "Garantir uma experiência positiva ao usuário, facilitar a adoção da nova interface e aumentar a retenção a longo prazo.",
      "Favorecer uma adaptação mais rápida e guiar os usuários com menos experiência.",
    ],
  },

  personas: {
    eyebrow: "Target personas",
    title: "Qual perfil de usuário mais precisa do onboarding?",
    intro:
      "Com base em dados que já tínhamos sobre o comportamento dos assinantes, criamos uma protopersona de cada perfil.",
    items: [
      {
        emoji: "🤓",
        name: "Heavy Users",
        description: "Usuários experientes, adaptados a novas tecnologias e interfaces.",
        traits: [
          { icon: "bolt", text: "Navegam com autonomia" },
          { icon: "skip", text: "Costumam pular o tutorial" },
          { icon: "gear", text: "Buscam eficiência e atalhos" },
        ],
        onboarding: "Não intrusivo, com opção clara de pular.",
      },
      {
        emoji: "🕵️‍♂️",
        name: "Exploratórios",
        description: "Curiosos que gostam de descobrir funcionalidades e explorar a interface.",
        traits: [
          { icon: "search", text: "Exploram funcionalidades" },
          { icon: "star", text: "Interagem com o onboarding" },
          { icon: "bulb", text: "Têm interesse em novidades" },
        ],
        onboarding: "Destaque para novas funcionalidades e descoberta progressiva.",
      },
      {
        emoji: "👵",
        name: "Elders",
        description: "Usuários com menor fluência digital, hábitos consolidados e maior resistência a mudanças.",
        traits: [
          { icon: "tv", text: "Assistem principalmente TV ao vivo" },
          { icon: "lock", text: "Preferem o que já conhecem" },
          { icon: "people", text: "Inseguros com mudanças" },
        ],
        onboarding: "Simples, contextual e com foco no essencial.",
      },
      {
        emoji: "👶",
        name: "Newbies",
        description:
          "Pouca familiaridade com a nova experiência; precisam de orientação nos principais fluxos e funcionalidades.",
        traits: [
          { icon: "question", text: "Primeiro contato" },
          { icon: "book", text: "Precisam de orientação" },
          { icon: "compass", text: "Podem se sentir perdidos no início" },
        ],
        onboarding: "Orientação nos principais fluxos e funcionalidades.",
      },
    ],
  },

  heuristics: {
    eyebrow: "Heurísticas",
    title: "Princípios para construir um bom onboarding",
    intro:
      "O objetivo principal do onboarding é ajudar os usuários não só no primeiro contato com a nova interface, mas durante toda a jornada de consumo. Para isso, defini algumas heurísticas essenciais para criar um processo de onboarding de sucesso.",
    steps: [
      {
        title: "Onboarding começa na instalação/atualização",
        paragraphs: [
          "Existem duas formas de começar o onboarding: a primeira é pela atualização do software, para clientes que já possuem a STB; a segunda é para novos clientes, cujo primeiro contato já será com o novo produto.",
          "Para os dois casos, definimos que usaríamos:",
        ],
        bullets: [
          { text: "Vídeo introdutório com um resumo da atualização enquanto a instalação está sendo feita" },
          { text: "Interface de boas-vindas com dicas para o usuário" },
        ],
        image: {
          file: "heuristic-installation",
          ratio: 731 / 411,
          alt: "Tela de instalação da UMA com o logo amarelo e a mensagem “A preparar a sua experiência de televisão”.",
        },
      },
      {
        title: "Explorativo",
        paragraphs: [
          "Ao usar a nova interface pela primeira vez, o onboarding deve focar nas novidades e funcionalidades (antigas e novas).",
          "Esse onboarding pode ser feito de três formas:",
        ],
        bullets: [
          {
            lead: "Tutorial interativo:",
            text: "guiar o usuário por uma série de passos interativos que destacam as principais funcionalidades e características da interface.",
          },
          {
            lead: "Exploratório:",
            text: "à medida que o usuário explora outras áreas da plataforma, o walkthrough continua conforme necessário, destacando novas funcionalidades e dando suporte.",
          },
          {
            lead: "Dicas:",
            text: "dicas contextuais que aparecem conforme o usuário navega pelas interfaces, com informações relevantes sobre a funcionalidade.",
          },
        ],
        image: {
          file: "heuristic-exploratory",
          ratio: 731 / 411,
          alt: "Guia de canais da UMA com um passo do tutorial sobre filtros e categorias, mostrando o comando e os botões Anterior e Concluir.",
        },
      },
      {
        title: "Proativo",
        paragraphs: [
          "Depois que o usuário passa pela instalação e pelo onboarding (ou não) de todas as áreas, deve existir uma área de ajuda caso ainda tenha alguma dificuldade.",
          "Além disso, também deve existir um ponto de acesso na página inicial que leve o usuário para a área de Tutoriais.",
        ],
        bullets: [],
        image: {
          file: "heuristic-proactive",
          ratio: 731 / 411,
          alt: "Área de Tutoriais nas definições da UMA, com cartões coloridos como “Alterar o seu guia predefinido” e “Reiniciar a sua box”.",
        },
      },
    ],
    othersTitle: "Outros pontos",
    // Ordem em grade de 2 colunas: linha 1 = contínuo | tooltips; linha 2 = touchpoints | custo irrecuperável (Figma).
    others: [
      {
        title: "Onboarding contínuo",
        text: "O onboarding deve começar cedo, a partir da instalação ou atualização da box, acompanhando o usuário até um possível offboarding do produto.",
      },
      {
        title: "Evitar uso excessivo de tooltips",
        text: "É crucial que o usuário não seja bombardeado com tooltips desnecessárias: elas devem ser usadas apenas para informações relevantes.",
      },
      {
        title: "Identificar touchpoints nos fluxos de navegação",
        text: "Nem todo fluxo e touchpoint precisa necessariamente ser coberto pelo onboarding.",
      },
      {
        title: "Princípio de custo irrecuperável",
        href: "https://www.researchgate.net/publication/4812596_The_psychology_of_sunk_cost",
        text: "Ter uma barra de progresso pode ser um recurso poderoso para motivar os usuários a concluir uma tarefa.",
      },
    ],
  },

  flow: {
    eyebrow: "Onboarding flow",
    title: "Principais áreas contempladas pelo onboarding",
    items: [
      {
        title: "Home",
        text: "Área principal da TV, que reúne conteúdos personalizados, ofertas e o continue watching.",
        image: { file: "flow-home", alt: "Página inicial da nova UMA com “Agora na TV” e a campanha “Oferta de 1 mês”." },
      },
      {
        title: "Live TV",
        text: "Player que muda as funcionalidades conforme o tipo de conteúdo.",
        image: { file: "flow-live-tv", alt: "Player de TV ao vivo exibindo Doctor Who, com a barra de progresso e o botão “Programação do canal”." },
      },
      {
        title: "Program info",
        text: "Funcionalidades e informações do conteúdo que está sendo assistido.",
        image: { file: "flow-program-info", alt: "Página de detalhes de Doctor Who, com sinopse, ações e lista de temporadas." },
      },
      {
        title: "EPG Guide",
        text: "Guia de programação dos canais e filtros por categoria.",
        image: { file: "flow-epg", alt: "Guia de programação com canais, dias da semana e programas em exibição." },
      },
      {
        title: "Pesquisa",
        text: "Página de busca de conteúdos, elencos, apps e canais de TV.",
        image: { file: "flow-search", alt: "Tela de pesquisa com teclado na tela e a dica para pesquisar por voz pelo comando." },
      },
      {
        title: "Settings",
        text: "Configurações relacionadas ao perfil e à box.",
        image: { file: "flow-settings", alt: "Definições na aba “Gerir perfis”, com a lista de perfis e o perfil da TV." },
      },
    ],
  },

  critique: {
    title: "Design critique",
    intro:
      "Após o brainstorming, os wireframes dos componentes de onboarding foram apresentados ao time, que escolheu por votação quais se adaptariam melhor à experiência em TV.",
    teamTitle: "O time era composto por",
    team: ["Visual Designer", "Design Manager", "Product Designers (TV, apps Android e Apple, streaming e web)", "UX Research"],
    board: {
      title: "O que não pode faltar em um onboarding?",
      lang: "pt-PT",
      groups: [
        { title: "Saltar o tutorial", color: "yellow", notes: ["Ser skippable", "Possibilidade de saltar o onboarding"] },
        {
          title: "Contextual",
          color: "slate",
          notes: [
            "Ser contextual (2x)",
            "Contexto é importante, tips no momento certo",
            "Orientação e introdução: começar por explicar o que se segue nos next steps ou utilizar wording que seja comum para este tipo de processo",
          ],
        },
        {
          title: "Contextual/Clareza",
          color: "gray",
          notes: ["Incluir demonstração e highlights das várias áreas de foco", "Vídeo animação quando a funcionalidade for complexa"],
        },
        {
          title: "Clareza",
          color: "salmon",
          notes: ["Ser claro", "Ser claro e não mostrar tantas opções de decisão", "Claro e resumido, mas com “link” para algo mais detalhado"],
        },
        {
          title: "Interação",
          color: "orange",
          notes: [
            "Conhecer principais funcionalidades",
            "Dicas de funcionalidades",
            "Não é necessário login",
            "Incluir fluxo que permita ao utilizador experimentar o contexto do onboarding",
            "Onboarding = Tutoriais",
          ],
        },
        { title: "Outros", color: "green", notes: ["Ser recuperável", { text: "Multicanal", color: "pink" }] },
      ],
    },
    examples: [
      {
        title: "Walkthrough",
        text: "Esse componente pode ser usado para uma dica contextual única ou um tutorial sobre funcionalidades e fluxos.",
        image: { file: "wireframe-walkthrough", ratio: 978 / 549, alt: "Wireframe do componente de walkthrough: cartão com passo, título, texto, área de imagem e botão." },
      },
      {
        title: "Walkthrough com Now & Next",
        text: "Aproveitamos um componente já desenhado na interface, o Now & Next (que mostra a programação de um canal), para usar no tutorial em diferentes fluxos.",
        image: { file: "wireframe-now-next", ratio: 978 / 549, alt: "Wireframe do walkthrough sobre o componente Now & Next, com a ilustração do comando destacando botões." },
      },
      {
        title: "Tooltips contextuais",
        text: "As dicas são usadas para dar uma explicação curta e direta sobre um ícone, área, botão ou componente.",
        image: { file: "wireframe-tooltip", ratio: 978 / 549, alt: "Wireframe de tooltip contextual sobre o botão de recomeçar no player de Doctor Who." },
      },
    ],
  },

  finalComponents: {
    eyebrow: "Resultado final",
    title: "Componentes finais desenhados para validação",
    intro: "Estes foram os componentes desenhados para validar com usuários e que depois foram reutilizados em outros fluxos da TV.",
    items: [
      {
        title: "Welcome screen",
        text: ["Tela de boas-vindas ao assinante sobre a atualização."],
        image: {
          file: "final-welcome",
          video: video("welcome-screen"),
          alt: "Vídeo da welcome screen da UMA: logo amarelo, “Bem-vindo”, texto de apresentação e botão “Começar”; ao saltar a introdução, um aviso pede confirmação e depois indica onde rever a introdução nas Definições.",
        },
      },
      {
        title: "Player hints",
        text: ["Dicas de navegação na primeira interação com a nova interface."],
        image: {
          file: "final-player-hints",
          video: video("player-hints"),
          alt: "Vídeo do player com dicas de navegação (Info sobre o programa, Mais opções e Programação do canal), seguido pelo walkthrough da página de Tenet: ações, elenco e onde o filme está disponível.",
        },
      },
      {
        title: "Walkthrough (que pode ser usado como product tour)",
        text: ["Os passos de walkthrough são usados na maioria dos casos do onboarding."],
        image: {
          file: "final-walkthrough",
          video: video("guia-epg"),
          alt: "Vídeo do walkthrough no guia de programação, em 4 passos: canais de TV, dias da semana, programas e conteúdos, e filtros por categoria.",
        },
      },
      {
        title: "Walkthrough com Now & Next (com destaque)",
        text: [
          "Usado em interfaces mais complexas, nas quais é preciso mostrar os passos para realizar uma ação.",
          "A diferença para o walkthrough normal é apenas a opacidade.",
        ],
        image: {
          file: "final-walkthrough-now-next",
          video: video("walkthrough-destaques-pt"),
          alt: "Vídeo de um jogo de futebol em direto em que o walkthrough dos destaques do jogo mostra, em 2 passos, os melhores momentos (golos, substituições, faltas) e como voltar à emissão em direto.",
        },
      },
      {
        title: "Tooltip contextual",
        text: [
          "As dicas dão uma explicação curta e direta sobre um ícone, área, botão etc. Também podem chamar a atenção do usuário para alguma novidade na interface. Sempre aparecem antes de a ação ser realizada.",
        ],
        image: {
          file: "final-tooltip",
          video: video("program-info"),
          alt: "Vídeo da página de Doctor Who em que tooltips contextuais azuis aparecem conforme o foco passa pelos botões: ver do início, gravar, ver mais tarde e onde ver.",
        },
      },
    ],
  },

  usability: {
    eyebrow: "Usability test",
    title: "Validando o onboarding com usuários",
    intro: [
      "O protótipo para o teste de usabilidade foi criado com foco em 3 fluxos: Live TV, Destaques e Guia EPG.",
      "Em cada fluxo havia tarefas relacionadas a ele, que o usuário deveria concluir.",
    ],
    overviewLabel: "Overview do teste",
    results: [
      { count: 6, total: 9, tone: "negative", text: "6 de 9 usuários tiveram dificuldades com a proposta do onboarding" },
      { count: 3, total: 9, tone: "negative", text: "3 de 9 usuários não conseguiram completar ao menos 1 tarefa com os componentes de walkthrough" },
      { count: 9, total: 9, tone: "positive", text: "Todos os usuários entenderam como funcionam as tooltips contextuais" },
    ],
    decisionTitle: "Decisão final",
    decision: [
      "Com prazo apertado para lançar a nova TV, decidi adaptar o onboarding apenas com tooltips contextuais, pois foi o componente mais bem avaliado.",
      "As regras para as tooltips foram definidas para aparecerem apenas 1 vez em contextos importantes ou quando houver alguma novidade na plataforma.",
      "Também alterei a Welcome screen e as Player hints, unificando as duas em uma só interface de introdução.",
    ],
    screens: [
      {
        title: "Welcome screen + Player hints",
        image: {
          file: "decision-welcome-hints",
          video: video("decision-welcome-hints"),
          alt: "Vídeo da tela “Bem-vindo à TV da NOS” sobre o player, com as dicas dos botões do comando (recuar/avançar, info do programa, mais ações e programação do canal) e o botão “Prima qualquer tecla para começar a ver TV”.",
        },
      },
      {
        title: "Demais fluxos",
        image: {
          file: "decision-other-flows",
          video: video("decision-other-flows"),
          alt: "Vídeo da página de Doctor Who em que tooltips contextuais aparecem nos botões, como “Ver do início” e “Ver mais tarde”.",
        },
      },
    ],
  },
  reflections: {
    title: "Reflexões finais",
    paragraphs: [
      "Com o lançamento da nova TV muito próximo, precisamos priorizar um onboarding mais simples, que pudesse ser validado e entregue a tempo. Não era a visão completa que tínhamos desenhado, mas foi a escolha certa para não atrasar o lançamento.",
      "O projeto também mudou minha forma de enxergar o onboarding: menos como um tour de boas-vindas e mais como algo distribuído ao longo da jornada, que acompanha o usuário no momento em que ele precisa.",
    ],
    differentTitle: "O que eu faria diferente",
    different: [
      {
        title: "Onboarding personalizado por persona",
        text: "Com o prazo apertado, tive que escolher entre estender o desenvolvimento ou lançar a TV com uma experiência única de onboarding para todos os usuários. Escolhi lançar. Hoje, eu deixaria a personalização documentada como próxima etapa do roadmap para que ela não se perdesse depois do lançamento.",
      },
      {
        title: "Protótipos mais próximos da experiência real com IA",
        text: "Os protótipos foram feitos no Figma, que não reproduz bem a navegação por comando numa TV. Isso tomou muito tempo de prototipagem e gerou atritos nos testes que não eram necessariamente do design. Hoje, eu usaria IA para prototipar em código, com navegação real por comando, e testaria algo bem mais próximo do produto final.",
      },
    ],
  },
};

const en: CaseContent = {
  labels: {
    summary: "Summary",
    team: "Team",
    timeline: "Timeline",
    platform: "Platform",
    beforeAfterLabel: "Comparison between the previous and the new version of UMA TV",
    compareLeft: "Previous version",
    compareRight: "New version",
    enlarge: "(enlarge image)",
    enlargeVideo: "(enlarge video)",
    close: "Close",
    opensInNewTab: "(opens in a new tab)",
    pauseVideo: "Pause video",
    playVideo: "Play video",
  },
  summary: [
    "UMA TV is NOS’s main TV product, where I worked for more than 2 years as a Senior Product Designer. As part of its evolution into a multi-platform experience (STB, Apple TV, Android TV), I led the onboarding process for the product.",
    "The first version didn’t perform well in user tests and, with a tight delivery deadline, we decided to take a simpler approach: contextual tooltips that introduce features along the journey.",
    "The solution was validated in a round of usability tests with around 9 users and shipped with the new TV version to around 1 million subscribers.",
  ],
  team: pt.team,
  timeline: "2024 → 2 months",
  platform: pt.platform,

  heroVideo: {
    ...video("onboarding_UMA_fluxo-en"),
    description: "Video of the new UMA TV player showing the film Tenet: the playback bar appears with the contextual hint “Watch from the start”.",
  },
  heroImage: { file: pt.heroImage.file, alt: "New UMA TV player showing the film Tenet on TVCine Top, with the hint “Press OK for more options”." },
  closingImage: {
    file: "bg-final",
    alt: "Tilted mosaic of new UMA TV screens on a dark background: home page, player, 1-month free offer and welcome screen.",
  },
  coverImage: { file: pt.coverImage.file, alt: "A TV in a dark room showing the new UMA TV home page, with the side menu and rows of content." },

  problem: {
    eyebrow: "Problem",
    title: "The product changed.\nUsers’ habits didn’t.",
    paragraphs: [
      "UMA TV has been on the market for more than 10 years, and its users built solid habits around it. The new version brings a completely different experience. For existing users, that means relearning what they had mastered. For newcomers, it means understanding a broad product all at once.",
      "The challenge wasn’t teaching a new product; it was making the transition without losing anyone along the way.",
    ],
    risksIntro: "Without a well-managed transition, the risks are:",
    risks: ["Drop in usage", "More support calls", "Resistance to the update"],
  },
  comparison: {
    left: { ...pt.comparison.left, alt: "Previous UMA TV: a grid of films such as Super Mario Bros., Horizon and Divergent." },
    right: { ...pt.comparison.right, alt: "New UMA TV: home page with “Agora na TV” (On TV now) and the “1-month offer” campaign." },
  },

  challenges: {
    eyebrow: "Challenge",
    title: "Main onboarding challenges",
    items: [
      { title: "Complexity at first contact", text: "The new platform introduced many features and concepts, which made the first interaction potentially complex for users." },
      { title: "Lack of initial guidance", text: "Without clear guidance, users may struggle to understand where to start and what to do next." },
      { title: "Information overload", text: "Showing too much information at once can overwhelm users and make the experience harder to understand." },
      { title: "Losing familiar references", text: "Long-time users can’t find the flows they had already mastered." },
    ],
  },

  opportunity: {
    eyebrow: "Opportunity",
    statement: "Create an intuitive, relevant onboarding for different user profiles, while keeping a single experience",
    objectivesLabel: "Goals",
    objectives: [
      "Ensure a positive user experience, ease adoption of the new interface and increase long-term retention.",
      "Enable faster adaptation and guide less experienced users.",
    ],
  },

  personas: {
    eyebrow: "Target personas",
    title: "Which user profile needs onboarding the most?",
    intro: "Based on data we already had about subscriber behaviour, we created a proto-persona for each profile.",
    items: [
      {
        ...pt.personas.items[0],
        description: "Experienced users, comfortable with new technologies and interfaces.",
        traits: [
          { icon: "bolt", text: "Navigate on their own" },
          { icon: "skip", text: "Usually skip the tutorial" },
          { icon: "gear", text: "Look for efficiency and shortcuts" },
        ],
        onboarding: "Non-intrusive, with a clear option to skip.",
      },
      {
        ...pt.personas.items[1],
        name: "Explorers",
        description: "Curious users who like discovering features and exploring the interface.",
        traits: [
          { icon: "search", text: "Explore features" },
          { icon: "star", text: "Engage with onboarding" },
          { icon: "bulb", text: "Interested in what’s new" },
        ],
        onboarding: "Highlight new features and progressive discovery.",
      },
      {
        ...pt.personas.items[2],
        description: "Users with lower digital fluency, settled habits and more resistance to change.",
        traits: [
          { icon: "tv", text: "Mostly watch live TV" },
          { icon: "lock", text: "Prefer what they already know" },
          { icon: "people", text: "Feel insecure about changes" },
        ],
        onboarding: "Simple, contextual and focused on the essentials.",
      },
      {
        ...pt.personas.items[3],
        description: "Little familiarity with the new experience; need guidance through the main flows and features.",
        traits: [
          { icon: "question", text: "First contact" },
          { icon: "book", text: "Need guidance" },
          { icon: "compass", text: "May feel lost at first" },
        ],
        onboarding: "Guidance through the main flows and features.",
      },
    ],
  },

  heuristics: {
    eyebrow: "Heuristics",
    title: "Principles for building good onboarding",
    intro:
      "The main goal of onboarding is to help users not only at their first contact with the new interface, but throughout their whole viewing journey. To do that, I defined a few heuristics that are essential to a successful onboarding process.",
    steps: [
      {
        title: "Onboarding starts at installation/update",
        paragraphs: [
          "There are two ways onboarding begins: through the software update, for customers who already have the set-top box; and for new customers, whose first contact is already the new product.",
          "For both cases, we decided to use:",
        ],
        bullets: [
          { text: "An intro video summarising the update while installation runs" },
          { text: "A welcome screen with tips for the user" },
        ],
        image: { ...pt.heuristics.steps[0].image, alt: "UMA installation screen with the yellow logo and the message “Preparing your TV experience”." },
      },
      {
        title: "Exploratory",
        paragraphs: [
          "When using the new interface for the first time, onboarding should focus on what’s new and on features (old and new).",
          "This onboarding can happen in three ways:",
        ],
        bullets: [
          { lead: "Interactive tutorial:", text: "guide users through a series of interactive steps that highlight the interface’s main features." },
          { lead: "Exploratory:", text: "as users explore other areas of the platform, the walkthrough continues as needed, highlighting new features and offering support." },
          { lead: "Tips:", text: "contextual tips that appear as users navigate the interfaces, with relevant information about each feature." },
        ],
        image: { ...pt.heuristics.steps[1].image, alt: "UMA channel guide with a tutorial step about filters and categories, showing the remote and Previous/Done buttons." },
      },
      {
        title: "Proactive",
        paragraphs: [
          "After users go through installation and onboarding (or not) across all areas, there should be a help area in case they still struggle.",
          "There should also be an entry point on the home page that takes users to the Tutorials area.",
        ],
        bullets: [],
        image: { ...pt.heuristics.steps[2].image, alt: "Tutorials area in UMA settings, with colourful cards such as “Change your default guide” and “Restart your box”." },
      },
    ],
    othersTitle: "Other principles",
    others: [
      {
        title: "Continuous onboarding",
        text: "Onboarding should start early, from the box installation or update, and stay with the user up to a possible offboarding from the product.",
      },
      {
        title: "Avoid overusing tooltips",
        text: "It’s crucial not to bombard users with unnecessary tooltips: they should only be used for relevant information.",
      },
      {
        title: "Identify touchpoints in navigation flows",
        text: "Not every flow and touchpoint needs to be covered by the onboarding.",
      },
      {
        title: "Sunk cost principle",
        href: pt.heuristics.others[3].href,
        text: "A progress bar can be a powerful way to motivate users to complete a task.",
      },
    ],
  },

  flow: {
    eyebrow: "Onboarding flow",
    title: "Main areas covered by the onboarding",
    items: [
      { ...pt.flow.items[0], text: "The TV’s main area, bringing together personalised content, offers and continue watching.", image: { ...pt.flow.items[0].image, alt: "New UMA home page with “On TV now” and the “1-month offer” campaign." } },
      { ...pt.flow.items[1], text: "A player whose features change with the type of content.", image: { ...pt.flow.items[1].image, alt: "Live TV player showing Doctor Who, with the progress bar and the “Channel schedule” button." } },
      { ...pt.flow.items[2], text: "Features and information about what’s being watched.", image: { ...pt.flow.items[2].image, alt: "Doctor Who details page with synopsis, actions and season list." } },
      { ...pt.flow.items[3], text: "Channel programme guide and category filters.", image: { ...pt.flow.items[3].image, alt: "Programme guide with channels, weekdays and shows on air." } },
      { ...pt.flow.items[4], title: "Search", text: "Search for content, cast, apps and TV channels.", image: { ...pt.flow.items[4].image, alt: "Search screen with an on-screen keyboard and a tip to search by voice with the remote." } },
      { ...pt.flow.items[5], text: "Profile and box settings.", image: { ...pt.flow.items[5].image, alt: "Settings on the “Manage profiles” tab, with the profile list and the TV profile." } },
    ],
  },

  critique: {
    title: "Design critique",
    intro:
      "After brainstorming, the wireframes of the onboarding components were presented to the team, who voted on which would best fit a TV experience.",
    teamTitle: "The team included",
    team: ["Visual Designer", "Design Manager", "Product Designers (TV, Android and Apple apps, streaming and web)", "UX Research"],
    board: {
      title: "What can’t be missing from onboarding?",
      lang: "en",
      groups: [
        { title: "Skip the tutorial", color: "yellow", notes: ["Be skippable", "Option to skip the onboarding"] },
        {
          title: "Contextual",
          color: "slate",
          notes: [
            "Be contextual (2x)",
            "Context matters: tips at the right moment",
            "Guidance and introduction: start by explaining what comes next or use wording that is common for this kind of process",
          ],
        },
        {
          title: "Contextual/Clarity",
          color: "gray",
          notes: ["Include a demo and highlights of the main focus areas", "Animated video when the feature is complex"],
        },
        {
          title: "Clarity",
          color: "salmon",
          notes: ["Be clear", "Be clear and don’t show too many choices", "Clear and short, but with a “link” to something more detailed"],
        },
        {
          title: "Interaction",
          color: "orange",
          notes: [
            "Learn the main features",
            "Feature tips",
            "No login required",
            "Include a flow that lets users try the onboarding context",
            "Onboarding = Tutorials",
          ],
        },
        { title: "Other", color: "green", notes: ["Be recoverable", { text: "Multichannel", color: "pink" }] },
      ],
    },
    examples: [
      { ...pt.critique.examples[0], text: "This component can be used for a single contextual tip or a tutorial about features and flows.", image: { ...pt.critique.examples[0].image, alt: "Walkthrough component wireframe: card with step, title, text, image area and button." } },
      { ...pt.critique.examples[1], title: "Walkthrough with Now & Next", text: "We reused a component already in the interface, Now & Next (which shows a channel’s schedule), for the tutorial in different flows.", image: { ...pt.critique.examples[1].image, alt: "Walkthrough wireframe over the Now & Next component, with a remote illustration highlighting buttons." } },
      { ...pt.critique.examples[2], title: "Contextual tooltips", text: "Tips give a short, direct explanation of an icon, area, button or component.", image: { ...pt.critique.examples[2].image, alt: "Contextual tooltip wireframe about the restart button on the Doctor Who player." } },
    ],
  },

  finalComponents: {
    eyebrow: "Final result",
    title: "Final components designed for validation",
    intro: "These were the components designed to validate with users, later reused in other TV flows.",
    items: [
      { ...pt.finalComponents.items[0], text: ["Welcome screen for subscribers about the update."], image: { ...pt.finalComponents.items[0].image, video: video("welcome-screen-en"), alt: "Video of the UMA welcome screen: yellow logo, “Welcome”, intro text and a “Get started” button; skipping the intro asks for confirmation and then shows where to find the introduction again in Settings." } },
      { ...pt.finalComponents.items[1], text: ["Navigation tips at the first interaction with the new interface."], image: { ...pt.finalComponents.items[1].image, video: video("player-hints-en"), alt: "Video of the player with navigation tips (Program info, More options and Channel guide), followed by the walkthrough of the Tenet page: actions, cast and where the film is available." } },
      { ...pt.finalComponents.items[2], title: "Walkthrough (also usable as a product tour)", text: ["Walkthrough steps are used in most onboarding cases."], image: { ...pt.finalComponents.items[2].image, video: video("guia-epg-en"), alt: "Video of the walkthrough in the programme guide, in 4 steps: TV channels, days of the week, shows and content, and category filters." } },
      { ...pt.finalComponents.items[3], title: "Walkthrough with Now & Next (with highlight)", text: ["Used in more complex interfaces where we need to show the steps to complete an action.", "The only difference from the regular walkthrough is the opacity."], image: { ...pt.finalComponents.items[3].image, video: video("walkthrough-destaques-en"), alt: "Video of a live football match where the match highlights walkthrough shows, in 2 steps, the best moments (goals, substitutions, fouls) and how to return to the live broadcast." } },
      { ...pt.finalComponents.items[4], title: "Contextual tooltip", text: ["Tips give a short, direct explanation of an icon, area, button, etc. They can also draw attention to something new in the interface. They always appear before the action is taken."], image: { ...pt.finalComponents.items[4].image, video: video("program-info-en"), alt: "Video of the Doctor Who page where blue contextual tooltips appear as focus moves across the buttons: watch from the start, record, watch later and where to watch." } },
    ],
  },

  usability: {
    eyebrow: "Usability test",
    title: "Validating the onboarding with users",
    intro: [
      "The usability test prototype focused on 3 flows: Live TV, Highlights and the EPG guide.",
      "Each flow had related tasks for users to complete.",
    ],
    overviewLabel: "Test overview",
    results: [
      { count: 6, total: 9, tone: "negative", text: "6 out of 9 users struggled with the proposed onboarding" },
      { count: 3, total: 9, tone: "negative", text: "3 out of 9 users couldn’t complete at least 1 task with the walkthrough components" },
      { count: 9, total: 9, tone: "positive", text: "All users understood how the contextual tooltips work" },
    ],
    decisionTitle: "Final decision",
    decision: [
      "With a tight deadline to launch the new TV, I decided to adapt the onboarding to use only contextual tooltips, as they were the best-rated component.",
      "Tooltips were set to appear only once, in important contexts or when there’s something new on the platform.",
      "I also changed the Welcome screen and Player hints, merging them into a single introduction screen.",
    ],
    screens: [
      {
        title: "Welcome screen + Player hints",
        image: {
          ...pt.usability.screens[0].image,
          video: video("decision-welcome-hints-en"),
          alt: "Video of the “Welcome to NOS TV” screen over the player, with hints for the remote buttons (rewind/forward, programme info, more actions and channel guide) and the button “Press any key to start watching TV”.",
        },
      },
      {
        title: "Other flows",
        image: {
          ...pt.usability.screens[1].image,
          video: video("decision-other-flows-en"),
          alt: "Video of the Doctor Who page where contextual tooltips appear on the buttons, such as “Watch from the start” and “Watch later”.",
        },
      },
    ],
  },
  reflections: {
    title: "Final reflections",
    paragraphs: [
      "With the new TV launch very close, we had to prioritise a simpler onboarding that could be validated and delivered on time. It wasn’t the full vision we had designed, but it was the right call so the launch wasn’t delayed.",
      "The project also changed how I see onboarding: less as a welcome tour and more as something spread across the journey, supporting users at the moment they need it.",
    ],
    differentTitle: "What I would do differently",
    different: [
      {
        title: "Onboarding personalised by persona",
        text: "With a tight deadline, I had to choose between extending development or launching the TV with a single onboarding experience for every user. I chose to launch. Today, I would document personalisation as the next step on the roadmap so it wouldn’t get lost after the launch.",
      },
      {
        title: "Prototypes closer to the real experience, using AI",
        text: "The prototypes were built in Figma, which doesn’t reproduce remote-control navigation on a TV well. That took a lot of prototyping time and caused friction in the tests that wasn’t really about the design. Today, I would use AI to prototype in code, with real remote navigation, and test something much closer to the final product.",
      },
    ],
  },
};

export const nosTvOnboarding: Record<Locale, CaseContent> = { "pt-br": pt, en };
