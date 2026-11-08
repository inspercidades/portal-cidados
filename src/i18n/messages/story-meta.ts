import type { Locale } from "@/i18n/config";

export type StoryMeta = {
  title: string;
  description: string;
  keywords: string[];
};

const storyMeta = {
  pt: {
    "faixa-azul": {
      title: "A Faixa Azul tornou o trânsito mais seguro?",
      description:
        "Avaliação do impacto das faixas dedicadas a motociclistas nos sinistros em São Paulo",
      keywords: ["faixa azul", "motociclistas", "sinistros", "trânsito"],
    },
    "ilhas-de-calor": {
      title: "Ilhas de calor e qualidade do ar na Maré",
      description:
        "Estudo mapeia ilhas de calor e poluição na Maré, revelando impactos diretos na saúde dos moradores",
      keywords: ["ilhas de calor", "qualidade do ar", "Maré", "saúde", "poluição"],
    },
    "desigualdades-em-saude-sp": {
      title: "Desigualdades em saúde no município de São Paulo",
      description:
        "Mapeamento das desigualdades em saúde em São Paulo: identificando áreas de risco para mortalidade materna, doenças cardiovasculares e diabetes",
      keywords: [
        "desigualdades em saúde",
        "mortalidade",
        "São Paulo",
        "determinantes socioeconômicos",
      ],
    },
    adensamento: {
      title: "Verticalização gera adensamento populacional?",
      description:
        "Como o Plano Diretor pode estimular uma cidade mais compacta em São Paulo",
      keywords: ["verticalização", "adensamento", "plano diretor", "habitação"],
    },
    habitacao: {
      title:
        "Levar transporte até a periferia, ou deixar mais gente morar no centro?",
      description: "Em desenvolvimento",
      keywords: ["habitação", "transporte", "periferia", "São Paulo"],
    },
  },
  en: {
    "faixa-azul": {
      title: "Did the Faixa Azul make traffic safer?",
      description:
        "An assessment of how motorcycle lanes affected crashes in São Paulo",
      keywords: ["faixa azul", "motorcyclists", "crashes", "traffic"],
    },
    "ilhas-de-calor": {
      title: "Heat islands and air quality in Maré",
      description:
        "A study maps heat islands and pollution in Maré and their direct effects on residents' health",
      keywords: ["heat islands", "air quality", "Maré", "health", "pollution"],
    },
    "desigualdades-em-saude-sp": {
      title: "Health inequalities in the city of São Paulo",
      description:
        "Mapping health inequalities in São Paulo: areas of higher risk for maternal mortality, cardiovascular disease, and diabetes",
      keywords: [
        "health inequalities",
        "mortality",
        "São Paulo",
        "socioeconomic determinants",
      ],
    },
    adensamento: {
      title: "Does building upward make the population denser?",
      description:
        "How the master plan can encourage a more compact city in São Paulo",
      keywords: ["verticalization", "density", "master plan", "housing"],
    },
    habitacao: {
      title:
        "Bring transit out to the periphery, or let more people live in the center?",
      description: "In development",
      keywords: ["housing", "transit", "periphery", "São Paulo"],
    },
  },
} satisfies Record<Locale, Record<string, StoryMeta>>;

export type StorySlug = keyof (typeof storyMeta)["pt"];

export function getStoryMeta(locale: Locale, slug: StorySlug): StoryMeta {
  return storyMeta[locale][slug];
}
