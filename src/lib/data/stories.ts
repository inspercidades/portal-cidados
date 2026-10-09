export interface Story {
  id: string;
  title: string;
  description: string;
  image: string;
  images: string[]; // Array de imagens para animação no hover
  href?: string;
}

/** Rotas publicadas em /historias. A navegação do índice só aceita estes caminhos. */
export type StoryHref =
  | "/historias/habitacao"
  | "/historias/faixa-azul"
  | "/historias/ilhas-de-calor"
  | "/historias/desigualdades-em-saude-sp"
  | "/historias/adensamento";

export interface StoryListing {
  id: string;
  /** Título curto, a pergunta que a história responde. */
  title: string;
  /** Sequência exibida no card do índice. Paths locais em /public. */
  images: readonly string[];
  href: StoryHref;
}

/**
 * Ordem compartilhada pela home e por /historias: a mesma do índice do Caio,
 * da mais recente para a mais antiga.
 */
const STORY_LISTINGS: readonly StoryListing[] = [
  {
    id: "5",
    title:
      "Levar transporte até a periferia, ou deixar mais gente morar no centro?",
    images: ["/assets/viz5/habitacao.png"],
    href: "/historias/habitacao",
  },
  {
    id: "4",
    title: "A Faixa Azul tornou o trânsito mais seguro?",
    images: [
      "/assets/viz4/viz4.1.png",
      "/assets/viz4/viz4.2.png",
      "/assets/viz4/viz4.3.png",
      "/assets/viz4/viz4.4.png",
    ],
    href: "/historias/faixa-azul",
  },
  {
    id: "3",
    title: "Ilhas de calor e qualidade do ar na Maré",
    images: [
      "/assets/viz3/viz3.1.png",
      "/assets/viz3/viz3.2.png",
      "/assets/viz3/viz3.3.png",
      "/assets/viz3/viz3.4.png",
    ],
    href: "/historias/ilhas-de-calor",
  },
  {
    id: "2",
    title: "Retrato das desigualdades em saúde",
    images: [
      "/assets/viz2/viz2.1.png",
      "/assets/viz2/viz2.2.png",
      "/assets/viz2/viz2.3.png",
    ],
    href: "/historias/desigualdades-em-saude-sp",
  },
  {
    id: "1",
    title: "Verticalização gera adensamento populacional?",
    images: [
      "/assets/viz1/viz1.2.png",
      "/assets/viz1/viz1.4.png",
      "/assets/viz1/viz1.3.png",
      "/assets/viz1/viz1.1.png",
    ],
    href: "/historias/adensamento",
  },
];

export function getStoryListings(): readonly StoryListing[] {
  return STORY_LISTINGS;
}

export function isInternalStoryHref(href: string): href is StoryHref {
  return STORY_LISTINGS.some((story) => story.href === href);
}

export function getStoriesForHome(): Story[] {
  return [
    {
      id: "5",
      title:
        "Levar transporte até a periferia, ou deixar mais gente morar no centro? O que é melhor pra cidade?",
      description:
        "Levar transporte até a periferia, ou deixar mais gente morar no centro? O que é melhor pra cidade?",
      image: "/assets/viz5/habitacao.png",
      images: ["/assets/viz5/habitacao.png"],
      href: "/historias/habitacao",
    },
    {
      id: "4",
      title:
        "A Faixa Azul tornou o trânsito mais seguro? Avaliação do impacto das faixas dedicadas à motociclistas nos sinistros em São Paulo",
      description:
        "Avaliação do impacto das faixas exclusivas para motociclistas nos sinistros de trânsito em São Paulo",
      image: "/assets/viz4/viz4.1.png",
      images: [
        "/assets/viz4/viz4.1.png",
        "/assets/viz4/viz4.2.png",
        "/assets/viz4/viz4.3.png",
        "/assets/viz4/viz4.4.png",
      ],
      href: "/historias/faixa-azul",
    },
    {
      id: "3",
      title: "Diagnóstico sobre ilhas de calor e qualidade do ar na Maré",
      description:
        "Estudo mapeia ilhas de calor e poluição na Maré, revelando impactos diretos na saúde dos moradores",
      image: "/assets/viz3/viz3.1.png",
      images: [
        "/assets/viz3/viz3.3.png",
        "/assets/viz3/viz3.1.png",
        "/assets/viz3/viz3.2.png",
        "/assets/viz3/viz3.4.png",
      ],
      href: "/historias/ilhas-de-calor",
    },
    {
      id: "2",
      title:
        "Retrato das Desigualdades em Saúde: Riscos de Mortalidade e Determinantes Socioeconômicos no Município de São Paulo",
      description:
        "Mapeamento das desigualdades em saúde em São Paulo: identificando áreas de risco para mortalidade materna, doenças cardiovasculares e diabetes",
      image: "/assets/viz2/viz2.1.png",
      images: [
        "/assets/viz2/viz2.1.png",
        "/assets/viz2/viz2.2.png",
        "/assets/viz2/viz2.3.png",
      ],
      href: "/historias/desigualdades-em-saude-sp",
    },
    {
      id: "1",
      title:
        "Verticalização gera adensamento populacional? Como o Plano Diretor pode estimular uma cidade mais compacta",
      description:
        "Como os instrumentos de planejamento urbano buscam equilibrar adensamento, mobilidade e qualidade de vida",
      image: "/assets/viz1/viz1.4.png",
      images: [
        "/assets/viz1/viz1.4.png",
        "/assets/viz1/viz1.3.png",
        "/assets/viz1/viz1.1.png",
        "/assets/viz1/viz1.2.png",
      ],
      href: "/historias/adensamento",
    },
  ];
}
