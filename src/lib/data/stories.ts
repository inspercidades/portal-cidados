export interface Story {
  id: string;
  title: string;
  description: string;
  image: string;
  images: string[]; // Array de imagens para animação no hover
  href?: string;
}

export function getStoriesForHome(): Story[] {
  return [
    {
      id: "3",
      title:
        "Diagnóstico sobre ilhas de calor e qualidade do ar em um dos maiores conjunto de favelas do Brasil",
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
      id: "1",
      title:
        "Para o bem ou para o mal: análise da capacidade que o governo tem de controlar a densidade habitacional",
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
  ];
}
