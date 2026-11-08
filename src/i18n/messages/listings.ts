import type { Locale } from "@/i18n/config";

export type ListingCopy = {
  title: string;
  description: string;
  /** Complemento mostrado sob o título no índice de histórias. */
  subtitle?: string;
};

/**
 * Textos curtos da home e do índice. O id é o mesmo de `stories.ts`.
 * A narrativa longa de cada história fica em `messages/stories`.
 */
const listings: Record<Locale, Record<string, ListingCopy>> = {
  pt: {
    "5": {
      title:
        "Levar transporte até a periferia, ou deixar mais gente morar no centro?",
      subtitle: "O que é melhor pra cidade?",
      description: "Em desenvolvimento",
    },
    "4": {
      title: "A Faixa Azul tornou o trânsito mais seguro?",
      subtitle:
        "Avaliação do impacto das faixas dedicadas a motociclistas nos sinistros em São Paulo",
      description:
        "Avaliação do impacto das faixas exclusivas para motociclistas nos sinistros de trânsito em São Paulo",
    },
    "3": {
      title: "Ilhas de calor e qualidade do ar na Maré",
      subtitle:
        "Estudo mapeia calor e poluição na Maré e seus impactos na saúde dos moradores",
      description:
        "Estudo mapeia ilhas de calor e poluição na Maré, revelando impactos diretos na saúde dos moradores",
    },
    "2": {
      title: "Retrato das desigualdades em saúde",
      subtitle:
        "Riscos de mortalidade e determinantes socioeconômicos no município de São Paulo",
      description:
        "Mapeamento das desigualdades em saúde em São Paulo: identificando áreas de risco para mortalidade materna, doenças cardiovasculares e diabetes",
    },
    "1": {
      title: "Verticalização gera adensamento populacional?",
      subtitle: "Como o Plano Diretor pode estimular uma cidade mais compacta",
      description:
        "Como os instrumentos de planejamento urbano buscam equilibrar adensamento, mobilidade e qualidade de vida",
    },
  },
  en: {
    "5": {
      title:
        "Bring transit out to the periphery, or let more people live in the center?",
      subtitle: "What is better for the city?",
      description: "In development",
    },
    "4": {
      title: "Did the Faixa Azul make traffic safer?",
      subtitle:
        "Assessing the impact of motorcycle lanes on crashes in São Paulo",
      description:
        "An assessment of how motorcycle-only lanes affected traffic crashes in São Paulo",
    },
    "3": {
      title: "Heat islands and air quality in Maré",
      subtitle:
        "A study maps heat and pollution in Maré and their impact on residents' health",
      description:
        "A study maps heat islands and pollution in Maré and their direct effects on residents' health",
    },
    "2": {
      title: "A portrait of health inequalities",
      subtitle:
        "Mortality risks and socioeconomic determinants in the city of São Paulo",
      description:
        "Mapping health inequalities in São Paulo: areas of higher risk for maternal mortality, cardiovascular disease, and diabetes",
    },
    "1": {
      title: "Does building upward make the population denser?",
      subtitle: "How the master plan can encourage a more compact city",
      description:
        "How urban planning tools try to balance density, mobility, and quality of life",
    },
  },
};

const homeListings: Record<Locale, Record<string, ListingCopy>> = {
  pt: {
    "5": {
      title:
        "Levar transporte até a periferia, ou deixar mais gente morar no centro? O que é melhor pra cidade?",
      description:
        "Levar transporte até a periferia, ou deixar mais gente morar no centro? O que é melhor pra cidade?",
    },
    "4": {
      title:
        "A Faixa Azul tornou o trânsito mais seguro? Avaliação do impacto das faixas dedicadas a motociclistas nos sinistros em São Paulo",
      description:
        "Avaliação do impacto das faixas exclusivas para motociclistas nos sinistros de trânsito em São Paulo",
    },
    "3": {
      title: "Diagnóstico sobre ilhas de calor e qualidade do ar na Maré",
      description:
        "Estudo mapeia ilhas de calor e poluição na Maré, revelando impactos diretos na saúde dos moradores",
    },
    "2": {
      title:
        "Retrato das Desigualdades em Saúde: Riscos de Mortalidade e Determinantes Socioeconômicos no Município de São Paulo",
      description:
        "Mapeamento das desigualdades em saúde em São Paulo: identificando áreas de risco para mortalidade materna, doenças cardiovasculares e diabetes",
    },
    "1": {
      title:
        "Verticalização gera adensamento populacional? Como o Plano Diretor pode estimular uma cidade mais compacta",
      description:
        "Como os instrumentos de planejamento urbano buscam equilibrar adensamento, mobilidade e qualidade de vida",
    },
  },
  en: {
    "5": {
      title:
        "Bring transit out to the periphery, or let more people live in the center? What is better for the city?",
      description:
        "Bring transit out to the periphery, or let more people live in the center? What is better for the city?",
    },
    "4": {
      title:
        "Did the Faixa Azul make traffic safer? Assessing the impact of motorcycle lanes on crashes in São Paulo",
      description:
        "An assessment of how motorcycle-only lanes affected traffic crashes in São Paulo",
    },
    "3": {
      title: "A diagnosis of heat islands and air quality in Maré",
      description:
        "A study maps heat islands and pollution in Maré and their direct effects on residents' health",
    },
    "2": {
      title:
        "A portrait of health inequalities: mortality risks and socioeconomic determinants in the city of São Paulo",
      description:
        "Mapping health inequalities in São Paulo: areas of higher risk for maternal mortality, cardiovascular disease, and diabetes",
    },
    "1": {
      title:
        "Does building upward make the population denser? How the master plan can encourage a more compact city",
      description:
        "How urban planning tools try to balance density, mobility, and quality of life",
    },
  },
};

export function listingCopy(locale: Locale, id: string): ListingCopy {
  return (
    listings[locale][id] ?? listings.pt[id] ?? { title: "", description: "" }
  );
}

export function homeListingCopy(locale: Locale, id: string): ListingCopy {
  return (
    homeListings[locale][id] ??
    homeListings.pt[id] ?? { title: "", description: "" }
  );
}
