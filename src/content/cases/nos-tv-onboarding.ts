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

/** Vídeos do case em /public/videos/onboarding (WebM + MP4 para Safari + poster). */
const video = (name: string) => ({
  webm: `/videos/onboarding/${name}.webm`,
  mp4: `/videos/onboarding/${name}.mp4`,
  poster: `/videos/onboarding/${name}-poster.jpg`,
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
    "A primeira versão não apresentou bons resultados nos testes com usuários, o que nos levou a uma abordagem mais simples: tooltips contextuais que introduzem as funcionalidades ao longo da jornada. A solução foi validada em uma rodada de testes de usabilidade com cerca de 9 usuários e lançada com a nova versão da TV para cerca de 1 milhão de assinantes.",
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
    // TODO(Lucas): no Figma os quatro itens têm o mesmo texto provisório; escreva a descrição de cada um.
    others: [
      { title: "Onboarding contínuo" },
      { title: "Evitar uso excessivo de tooltips" },
      { title: "Identificar touchpoints nos fluxos de navegação" },
      { title: "Princípio de custo irrecuperável" },
    ],
  },

  flow: {
    eyebrow: "Onboarding flow",
    title: "Principais áreas contempladas pelo onboarding",
    items: [
      {
        title: "Home",
        text: "Tela de boas-vindas ao assinante sobre a atualização e tooltips contextuais",
        image: { file: "flow-home", alt: "Página inicial da nova UMA com “Agora na TV” e a campanha “Oferta de 1 mês”." },
      },
      {
        title: "Live TV",
        // TODO(Lucas): no Figma, Live TV, Program info, EPG Guide, Pesquisa e Settings repetem o texto da Home.
        text: "Tela de boas-vindas ao assinante sobre a atualização",
        image: { file: "flow-live-tv", alt: "Player de TV ao vivo exibindo Doctor Who, com a barra de progresso e o botão “Programação do canal”." },
      },
      {
        title: "Program info",
        text: "Tela de boas-vindas ao assinante sobre a atualização",
        image: { file: "flow-program-info", alt: "Página de detalhes de Doctor Who, com sinopse, ações e lista de temporadas." },
      },
      {
        title: "EPG Guide",
        text: "Tela de boas-vindas ao assinante sobre a atualização",
        image: { file: "flow-epg", alt: "Guia de programação com canais, dias da semana e programas em exibição." },
      },
      {
        title: "Pesquisa",
        text: "Tela de boas-vindas ao assinante sobre a atualização",
        image: { file: "flow-search", alt: "Tela de pesquisa com teclado na tela e a dica para pesquisar por voz pelo comando." },
      },
      {
        title: "Settings",
        text: "Tela de boas-vindas ao assinante sobre a atualização",
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
        image: { file: "final-welcome", alt: "Welcome screen da UMA: logo amarelo, “Bem-vindo”, texto de apresentação e botão “Começar”." },
      },
      {
        title: "Player hints",
        text: ["Dicas de navegação na primeira interação com a nova interface."],
        image: { file: "final-player-hints", alt: "Player com dicas de navegação: Info sobre o programa, Mais opções e Programação do canal." },
      },
      {
        title: "Walkthrough (que pode ser usado como product tour)",
        text: ["Os passos de walkthrough são usados na maioria dos casos do onboarding."],
        image: { file: "final-walkthrough", alt: "Guia de canais com um passo do walkthrough sobre filtros e categorias." },
      },
      {
        title: "Walkthrough com Now & Next (com destaque)",
        text: [
          "Usado em interfaces mais complexas, nas quais é preciso mostrar os passos para realizar uma ação.",
          "A diferença para o walkthrough normal é apenas a opacidade.",
        ],
        image: { file: "final-walkthrough-now-next", alt: "Walkthrough sobre o Now & Next destacando a emissão em direto de um jogo de futebol." },
      },
      {
        title: "Tooltip contextual",
        text: [
          "As dicas dão uma explicação curta e direta sobre um ícone, área, botão etc. Também podem chamar a atenção do usuário para alguma novidade na interface. Sempre aparecem antes de a ação ser realizada.",
        ],
        image: { file: "final-tooltip", alt: "Página de Doctor Who com uma tooltip contextual azul explicando o botão de recomeçar." },
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
    "The first version didn’t perform well in user tests, which led us to a simpler approach: contextual tooltips that introduce features along the journey. The solution was validated in a round of usability tests with around 9 users and shipped with the new TV version to around 1 million subscribers.",
  ],
  team: pt.team,
  timeline: "2024 → 2 months",
  platform: pt.platform,

  heroVideo: {
    ...heroVideoFiles,
    description: "Video of the new UMA TV player showing the film Tenet: the playback bar appears with the contextual hint “Watch from the start”.",
  },
  heroImage: { file: pt.heroImage.file, alt: "New UMA TV player showing the film Tenet on TVCine Top, with the hint “Press OK for more options”." },
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
      { title: "Continuous onboarding" },
      { title: "Avoid overusing tooltips" },
      { title: "Identify touchpoints in navigation flows" },
      { title: "Sunk cost principle" },
    ],
  },

  flow: {
    eyebrow: "Onboarding flow",
    title: "Main areas covered by the onboarding",
    items: [
      { ...pt.flow.items[0], text: "Welcome screen about the update and contextual tooltips", image: { ...pt.flow.items[0].image, alt: "New UMA home page with “On TV now” and the “1-month offer” campaign." } },
      { ...pt.flow.items[1], text: "Welcome screen about the update", image: { ...pt.flow.items[1].image, alt: "Live TV player showing Doctor Who, with the progress bar and the “Channel schedule” button." } },
      { ...pt.flow.items[2], text: "Welcome screen about the update", image: { ...pt.flow.items[2].image, alt: "Doctor Who details page with synopsis, actions and season list." } },
      { ...pt.flow.items[3], text: "Welcome screen about the update", image: { ...pt.flow.items[3].image, alt: "Programme guide with channels, weekdays and shows on air." } },
      { ...pt.flow.items[4], title: "Search", text: "Welcome screen about the update", image: { ...pt.flow.items[4].image, alt: "Search screen with an on-screen keyboard and a tip to search by voice with the remote." } },
      { ...pt.flow.items[5], text: "Welcome screen about the update", image: { ...pt.flow.items[5].image, alt: "Settings on the “Manage profiles” tab, with the profile list and the TV profile." } },
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
      { ...pt.finalComponents.items[0], text: ["Welcome screen for subscribers about the update."], image: { ...pt.finalComponents.items[0].image, alt: "UMA welcome screen: yellow logo, “Bem-vindo” (Welcome), intro text and a “Começar” (Start) button." } },
      { ...pt.finalComponents.items[1], text: ["Navigation tips at the first interaction with the new interface."], image: { ...pt.finalComponents.items[1].image, alt: "Player with navigation tips: programme info, more options and channel schedule." } },
      { ...pt.finalComponents.items[2], title: "Walkthrough (also usable as a product tour)", text: ["Walkthrough steps are used in most onboarding cases."], image: { ...pt.finalComponents.items[2].image, alt: "Channel guide with a walkthrough step about filters and categories." } },
      { ...pt.finalComponents.items[3], title: "Walkthrough with Now & Next (with highlight)", text: ["Used in more complex interfaces where we need to show the steps to complete an action.", "The only difference from the regular walkthrough is the opacity."], image: { ...pt.finalComponents.items[3].image, alt: "Walkthrough over Now & Next highlighting a live football match." } },
      { ...pt.finalComponents.items[4], title: "Contextual tooltip", text: ["Tips give a short, direct explanation of an icon, area, button, etc. They can also draw attention to something new in the interface. They always appear before the action is taken."], image: { ...pt.finalComponents.items[4].image, alt: "Doctor Who page with a blue contextual tooltip explaining the restart button." } },
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
          alt: "Video of the “Welcome to NOS TV” screen over the player, with hints for the remote buttons (rewind/forward, programme info, more actions and channel guide) and the button “Press any key to start watching TV”.",
        },
      },
      {
        title: "Other flows",
        image: {
          ...pt.usability.screens[1].image,
          alt: "Video of the Doctor Who page where contextual tooltips appear on the buttons, such as “Watch from the start” and “Watch later”.",
        },
      },
    ],
  },
};

export const nosTvOnboarding: Record<Locale, CaseContent> = { "pt-br": pt, en };
