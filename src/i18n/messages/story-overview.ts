import type { Locale } from "@/i18n/config";
import type { StorySlug } from "@/i18n/messages/story-meta";

export type StoryCredit = { role: string; names: string };

export type StoryOverviewCopy = {
  summary: string;
  study?: { title: string; url?: string; lines: string[] };
  /** O primeiro item aparece ao lado do título; o restante, no fim da página. */
  studyTeam: StoryCredit[];
  datavizTeam: StoryCredit[];
  datasetIds: readonly string[];
};

const pt: Record<StorySlug, StoryOverviewCopy> = {
  habitacao: {
    summary:
      "A história compara dois caminhos para aproximar moradia e emprego em São Paulo: levar a rede de transporte até a periferia ou permitir que mais gente more nas regiões centrais, já bem servidas. Cruzando dados de embarques nas estações de trem e metrô, da Pesquisa Nacional de Mobilidade Urbana e dos alvarás de novas edificações, a análise discute os custos e os efeitos de cada escolha para a cidade.",
    study: {
      title:
        "Acessibilidade urbana em São Paulo: transporte e uso do solo em um modelo de equilíbrio espacial",
      lines: [
        "Dissertação de Mestrado",
        "Centro de Estudos das Cidades – Laboratório Arq.Futuro",
        "Iniciativa de Mobilidade e Habitação",
        "2026",
      ],
    },
    studyTeam: [
      { role: "Autor", names: "Vitor Theodoro Carboni" },
      { role: "Orientação", names: "Adriano Borges Costa" },
    ],
    datavizTeam: [
      { role: "Coordenador executivo", names: "Adriano Borges Costa" },
      { role: "Roteirista", names: "Caio Jacintho" },
      { role: "Tratamento de dados", names: "Vinicius Oike" },
      { role: "Designer", names: "Pedro Meneghel" },
      { role: "Desenvolvimento", names: "Lucas Tavares" },
    ],
    datasetIds: ["3", "10", "1"],
  },
  "ilhas-de-calor": {
    summary:
      "Entre março e setembro de 2023, medições de temperatura, umidade e qualidade do ar foram feitas nas 16 favelas da Maré, no Rio de Janeiro. A história mapeia onde o calor e a poluição se concentram e o que isso significa para a saúde de quem mora no território.",
    study: {
      title:
        "Diagnóstico sobre ilhas de calor e qualidade do ar nas 16 favelas da Maré",
      url: "https://www.redesdamare.org.br/media/downloads/arquivos/RespiraMareRelatorio.pdf",
      lines: ["Redes da Maré", "Relatório Técnico de Pesquisa", "2024"],
    },
    studyTeam: [
      {
        role: "Coordenação geral",
        names: "Carolina Dias, Luna Arouca, Rian de Queiroz, Shyrlei Rosendo",
      },
      { role: "Pesquisador e coordenador de campo", names: "Rian de Queiroz" },
      {
        role: "Pesquisadores consultores",
        names: "Otavio Ranzani, Carolina Hartmann Galeazzi, Fernando Bozza",
      },
      {
        role: "Sistematização do conteúdo e produção dos mapas",
        names: "Rian de Queiroz",
      },
      { role: "Analista de dados", names: "Soraida Aguilar" },
      {
        role: "Agentes ambientais",
        names:
          "Bianca de Lima Teixeira, Luis Carlos Soares da Costa, Marcela Santos de Melo, Maria Eduarda Souza Neves",
      },
      { role: "Assistente de campo", names: "Diana de Souza Beserra" },
      { role: "Identidade visual", names: "Robert dos Santos da Silva" },
    ],
    datavizTeam: [
      {
        role: "Coordenador executivo",
        names: "Maurício Bouskela, Adriano Borges Costa",
      },
      { role: "Roteirista", names: "Caio Jacintho" },
      { role: "Cientista de dados", names: "Vinicius Oike" },
      { role: "Designer", names: "Pedro Meneghel" },
      { role: "Desenvolvimento", names: "Lucas Tavares" },
    ],
    datasetIds: ["8"],
  },
  adensamento: {
    summary:
      "Mais prédios significam mais moradores? A história investiga se a verticalização tem levado ao adensamento populacional em São Paulo, a partir dos alvarás de novas edificações e de dados de densidade e verticalização, e discute como o Plano Diretor pode estimular uma cidade mais compacta.",
    study: {
      title:
        "Para o bem ou para o mal: Análise da capacidade que o governo tem de controlar a densidade habitacional",
      url: "https://repositorio.insper.edu.br/entities/publication/66419ce4-82d4-4625-9391-20adbddd1709",
      lines: [
        "Relatório de Iniciação Científica",
        "Insper Instituto de Ensino e Pesquisa",
        "Ciências Econômicas",
        "2024",
      ],
    },
    studyTeam: [
      { role: "Autor", names: "Gustavo Theil" },
      { role: "Orientador", names: "Adriano Borges Costa" },
    ],
    datavizTeam: [
      { role: "Coordenador executivo", names: "Maurício Bouskela" },
      { role: "Roteirista", names: "Caio Jacintho" },
      { role: "Cientista de dados", names: "Vinicius Oike" },
      { role: "Designer", names: "Pedro Meneghel" },
      { role: "Desenvolvimento", names: "Renan Rodrigues, Lucas Tavares" },
    ],
    datasetIds: ["1", "2"],
  },
  "desigualdades-em-saude-sp": {
    summary:
      "A história mapeia as desigualdades em saúde no município de São Paulo por distrito, a partir da mortalidade materna e da mortalidade prematura por doenças cardiovasculares e diabetes. Esses riscos são lidos lado a lado com o índice socioeconômico GeoSES, para mostrar como as condições de vida se relacionam com a saúde da população.",
    study: {
      title: "Síntese de evidências sobre saúde no município de São Paulo",
      url: "https://repositorio.insper.edu.br/entities/publication/ea858305-5977-4b80-891a-814308784504",
      lines: [
        "Relatório Técnico de Pesquisa",
        "Centro de Estudos das Cidades – Laboratório Arq.Futuro",
        "Iniciativa de Saúde Urbana",
        "2024",
      ],
    },
    studyTeam: [
      {
        role: "Autores",
        names:
          "Paulo H. Nascimento Saldiva, Lígia Vizeu Barrozo, Catia Martinez Minto, Sara Lopes de Moraes, Paulo Afonso de André",
      },
    ],
    datavizTeam: [
      {
        role: "Coordenador executivo",
        names: "Maurício Bouskela, Adriano Borges Costa",
      },
      { role: "Roteirista", names: "Caio Jacintho" },
      { role: "Cientista de dados", names: "Vinicius Oike" },
      { role: "Designer", names: "Pedro Meneghel" },
      { role: "Desenvolvimento", names: "Lucas Tavares" },
      {
        role: "Voz e composição da faixa bônus",
        names: "Rafael Gomes da Silva",
      },
    ],
    datasetIds: ["9", "16"],
  },
  "faixa-azul": {
    summary:
      "A Faixa Azul, faixa exclusiva para motociclistas, foi implantada em vias de São Paulo a partir de 2022. A história avalia o impacto dessas faixas sobre os sinistros de trânsito, a partir da localização dos trechos com Faixa Azul e dos sinistros registrados entre 2022 e 2025.",
    study: {
      title:
        "Avaliação do impacto da Faixa Azul nos sinistros de trânsito em São Paulo",
      url: "https://repositorio.insper.edu.br/entities/publication/36ec3e70-30bd-4c24-92bb-515e18f233be",
      lines: [
        "Relatório Técnico de Pesquisa",
        "Insper Instituto de Ensino e Pesquisa",
        "2025",
      ],
    },
    studyTeam: [
      {
        role: "Autores",
        names:
          "Adriano Borges Costa, Adriano Dutra, Gustavo Theil, Júlio Mugnol",
      },
      {
        role: "Equipe do Observatório Nacional de Mobilidade Sustentável",
        names: "Sérgio Avelleda, Helena Coelho",
      },
      { role: "Assistência de pesquisa", names: "Mariah Gomes" },
    ],
    datavizTeam: [
      { role: "Coordenador executivo", names: "Maurício Bouskela" },
      { role: "Roteirista", names: "Caio Jacintho" },
      { role: "Cientista de dados", names: "Vinicius Oike" },
      { role: "Designer", names: "Pedro Meneghel" },
      { role: "Desenvolvimento", names: "Lucas Tavares" },
    ],
    datasetIds: ["15", "14"],
  },
};

const en: Record<StorySlug, StoryOverviewCopy> = {
  habitacao: {
    summary:
      "The story compares two ways of bringing homes and jobs closer in São Paulo: extending the transit network to the outskirts or letting more people live in central areas that are already well served. Combining data on train and metro boardings, the National Urban Mobility Survey and building permits, it discusses the costs and effects of each choice for the city.",
    study: {
      title:
        "Acessibilidade urbana em São Paulo: transporte e uso do solo em um modelo de equilíbrio espacial",
      lines: [
        "Master's dissertation",
        "Centro de Estudos das Cidades – Laboratório Arq.Futuro",
        "Mobility and Housing Initiative",
        "2026",
      ],
    },
    studyTeam: [
      { role: "Author", names: "Vitor Theodoro Carboni" },
      { role: "Advisor", names: "Adriano Borges Costa" },
    ],
    datavizTeam: [
      { role: "Executive coordinator", names: "Adriano Borges Costa" },
      { role: "Scriptwriter", names: "Caio Jacintho" },
      { role: "Data processing", names: "Vinicius Oike" },
      { role: "Designer", names: "Pedro Meneghel" },
      { role: "Development", names: "Lucas Tavares" },
    ],
    datasetIds: ["3", "10", "1"],
  },
  "ilhas-de-calor": {
    summary:
      "Between March and September 2023, temperature, humidity and air quality were measured across the 16 favelas of Maré, in Rio de Janeiro. The story maps where heat and pollution concentrate and what that means for the health of the people who live there.",
    study: {
      title:
        "Diagnóstico sobre ilhas de calor e qualidade do ar nas 16 favelas da Maré",
      url: "https://www.redesdamare.org.br/media/downloads/arquivos/RespiraMareRelatorio.pdf",
      lines: ["Redes da Maré", "Technical research report", "2024"],
    },
    studyTeam: [
      {
        role: "General coordination",
        names: "Carolina Dias, Luna Arouca, Rian de Queiroz, Shyrlei Rosendo",
      },
      { role: "Researcher and field coordinator", names: "Rian de Queiroz" },
      {
        role: "Consulting researchers",
        names: "Otavio Ranzani, Carolina Hartmann Galeazzi, Fernando Bozza",
      },
      { role: "Content systematization and maps", names: "Rian de Queiroz" },
      { role: "Data analyst", names: "Soraida Aguilar" },
      {
        role: "Environmental agents",
        names:
          "Bianca de Lima Teixeira, Luis Carlos Soares da Costa, Marcela Santos de Melo, Maria Eduarda Souza Neves",
      },
      { role: "Field assistant", names: "Diana de Souza Beserra" },
      { role: "Visual identity", names: "Robert dos Santos da Silva" },
    ],
    datavizTeam: [
      {
        role: "Executive coordinator",
        names: "Maurício Bouskela, Adriano Borges Costa",
      },
      { role: "Scriptwriter", names: "Caio Jacintho" },
      { role: "Data scientist", names: "Vinicius Oike" },
      { role: "Designer", names: "Pedro Meneghel" },
      { role: "Development", names: "Lucas Tavares" },
    ],
    datasetIds: ["8"],
  },
  adensamento: {
    summary:
      "Do more buildings mean more residents? The story looks at whether verticalization has led to higher population density in São Paulo, using building permits and density and verticalization data, and discusses how the Master Plan can encourage a more compact city.",
    study: {
      title:
        "Para o bem ou para o mal: Análise da capacidade que o governo tem de controlar a densidade habitacional",
      url: "https://repositorio.insper.edu.br/entities/publication/66419ce4-82d4-4625-9391-20adbddd1709",
      lines: [
        "Undergraduate research report",
        "Insper Institute of Education and Research",
        "Economics",
        "2024",
      ],
    },
    studyTeam: [
      { role: "Author", names: "Gustavo Theil" },
      { role: "Advisor", names: "Adriano Borges Costa" },
    ],
    datavizTeam: [
      { role: "Executive coordinator", names: "Maurício Bouskela" },
      { role: "Scriptwriter", names: "Caio Jacintho" },
      { role: "Data scientist", names: "Vinicius Oike" },
      { role: "Designer", names: "Pedro Meneghel" },
      { role: "Development", names: "Renan Rodrigues, Lucas Tavares" },
    ],
    datasetIds: ["1", "2"],
  },
  "desigualdades-em-saude-sp": {
    summary:
      "The story maps health inequalities across the districts of São Paulo through maternal mortality and premature deaths from cardiovascular disease and diabetes. These risks are read alongside the GeoSES socioeconomic index to show how living conditions relate to the health of the population.",
    study: {
      title: "Síntese de evidências sobre saúde no município de São Paulo",
      url: "https://repositorio.insper.edu.br/entities/publication/ea858305-5977-4b80-891a-814308784504",
      lines: [
        "Technical research report",
        "Centro de Estudos das Cidades – Laboratório Arq.Futuro",
        "Urban Health Initiative",
        "2024",
      ],
    },
    studyTeam: [
      {
        role: "Authors",
        names:
          "Paulo H. Nascimento Saldiva, Lígia Vizeu Barrozo, Catia Martinez Minto, Sara Lopes de Moraes, Paulo Afonso de André",
      },
    ],
    datavizTeam: [
      {
        role: "Executive coordinator",
        names: "Maurício Bouskela, Adriano Borges Costa",
      },
      { role: "Scriptwriter", names: "Caio Jacintho" },
      { role: "Data scientist", names: "Vinicius Oike" },
      { role: "Designer", names: "Pedro Meneghel" },
      { role: "Development", names: "Lucas Tavares" },
      {
        role: "Bonus track voice and composition",
        names: "Rafael Gomes da Silva",
      },
    ],
    datasetIds: ["9", "16"],
  },
  "faixa-azul": {
    summary:
      "The Faixa Azul, a lane reserved for motorcyclists, has been rolled out on São Paulo streets since 2022. The story assesses its impact on road crashes, using the location of the Faixa Azul segments and the crashes recorded between 2022 and 2025.",
    study: {
      title:
        "Avaliação do impacto da Faixa Azul nos sinistros de trânsito em São Paulo",
      url: "https://repositorio.insper.edu.br/entities/publication/36ec3e70-30bd-4c24-92bb-515e18f233be",
      lines: [
        "Technical research report",
        "Insper Institute of Education and Research",
        "2025",
      ],
    },
    studyTeam: [
      {
        role: "Authors",
        names:
          "Adriano Borges Costa, Adriano Dutra, Gustavo Theil, Júlio Mugnol",
      },
      {
        role: "National Sustainable Mobility Observatory team",
        names: "Sérgio Avelleda, Helena Coelho",
      },
      { role: "Research assistance", names: "Mariah Gomes" },
    ],
    datavizTeam: [
      { role: "Executive coordinator", names: "Maurício Bouskela" },
      { role: "Scriptwriter", names: "Caio Jacintho" },
      { role: "Data scientist", names: "Vinicius Oike" },
      { role: "Designer", names: "Pedro Meneghel" },
      { role: "Development", names: "Lucas Tavares" },
    ],
    datasetIds: ["15", "14"],
  },
};

const copy = { pt, en };

export function getStoryOverview(locale: Locale, slug: StorySlug) {
  return copy[locale][slug];
}
