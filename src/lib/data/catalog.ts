export interface DatasetInfo {
  dataset_title: string;
  dataset_description: string;
  dataset_link: string;
}

export interface DataCatalogItem {
  id: string;
  title: string;
  description: string;
  theme: string;
  region: string;
  accessMethod: string;
  keywords: string[];
  createdAt: string;
  tags: string[];
  dataset_info: DatasetInfo[];
}

export const catalogData: DataCatalogItem[] = [
  {
    id: "1",
    title: "Alvarás de licenciamento de novas edificações [2004-2024]",
    description:
      "Informações sobre novas edificações formais a partir de dados dos alvarás de licenciamento.\nConjunto de dados tratados e enriquecidos pelo Centro de Estudos das Cidades.",
    theme: "Habitação e Mercado Imobiliário",
    region: "São Paulo",
    accessMethod: "Disponível para download",
    keywords: [
      "Residências",
      "Imóveis",
      "Licenciamento",
      "Novas edificações",
      "Incorporação imobiliária",
    ],
    createdAt: "2026-09-25",
    tags: [
      "Habitação e Mercado Imobiliário",
      "São Paulo",
      "Disponível para download",
    ],
    dataset_info: [
      {
        dataset_title:
          "Alvarás de licenciamento de novas edificações [2004-2021]",
        dataset_description:
          "Agregação por lote/empreendimento dos dados de registros de alvarás de licenciamento gerados pelo Sistema de Administração do Código de Obras e Edificações (SISACOE).",
        dataset_link:
          "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.48808/FK2/7A3HSJ",
      },
      {
        dataset_title:
          "Alvarás de licenciamento de novas edificações [2010-2024]",
        dataset_description:
          "Informações sobre novas edificações formais a partir de dados dos alvarás de licenciamento.\nConjunto de dados tratados e enriquecidos pelo Centro de Estudos das Cidades.",
        dataset_link:
          "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/FPCIDI",
      },
    ],
  },
  {
    id: "2",
    title: "Densidade Populacional e Verticalização [2022,2024]",
    description:
      'Dados de densidade populacional, densidade habitacional e verticalização em São Paulo, a partir do Censo (2022) e do IPTU (2024).\nConjunto de dados preparado para o estudo "Para o bem ou para o mal: análise da capacidade que o governo tem de controlar a densidade habitacional" (Theil, Gustavo).',
    theme: "Habitação e Mercado Imobiliário",
    region: "São Paulo",
    accessMethod: "Disponível para download",
    keywords: [
      "Residências",
      "Imóveis",
      "Cadastro imobiliário",
      "Valor venal",
      "Imposto",
      "Censo",
      "IBGE",
      "Densidade populacional",
      "Demografia",
      "População",
      "Habitação",
      "Moradia",
      "Verticalização",
      "IPTU São Paulo",
    ],
    createdAt: "2026-09-25",
    tags: [
      "Habitação e Mercado Imobiliário",
      "São Paulo",
      "Disponível para download",
    ],
    dataset_info: [
      {
        dataset_title: "IPTU e Verticalização, São Paulo [2024]",
        dataset_description:
          "Dados do IPTU agregados por lote para o município de São Paulo, com métricas de potencial construtivo e índice de verticalização.\nConjunto de dados tratados e enriquecidos pelo Centro de Estudos das Cidades.",
        dataset_link:
          "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/TOXCRF",
      },
      {
        dataset_title:
          "População, Domicílios e Densidade Populacional por Setor Censitário [2022]",
        dataset_description:
          'Dados provisórios do Censo (2022) em formato GeoPackage (gpkg), agregados por setor censitário para o município de São Paulo.\nConjunto de dados preparado para o estudo "Para o bem ou para o mal: análise da capacidade que o governo tem de controlar a densidade habitacional" (Theil, Gustavo).',
        dataset_link:
          "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/GTO7DD",
      },
      {
        dataset_title:
          "Grade de densidade populacional e habitacional, São Paulo [2022, 2024]",
        dataset_description:
          'Dados demográficos e habitacionais agregados em um raster de 800x800m, resultado de interpolação (por área) de informações do Censo (2022) e do IPTU de São Paulo. Contém medidas de densidade populacional e de informalidade dos imóveis.\nConjunto de dados preparado para o estudo "Para o bem ou para o mal: análise da capacidade que o governo tem de controlar a densidade habitacional" (Theil, Gustavo).',
        dataset_link:
          "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/4QNTOT",
      },
      {
        dataset_title:
          "Densidade Populacional e Verticalização de Imóveis em São Paulo [2022,2024]",
        dataset_description:
          'Cruzamento entre os lotes do IPTU de São Paulo com dados do Censo, via interpolação de área, agregado por setor censitário. Conjunto de dados preparado para o estudo "Para o bem ou para o mal: análise da capacidade que o governo tem de controlar a densidade habitacional" (Theil, Gustavo).',
        dataset_link:
          "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/90SSHM",
      },
    ],
  },
  {
    id: "3",
    title:
      "Embarques nas Estações de Trem/Metrô operados pela Motiva [2012-2026]",
    description:
      "Total de embarques por estação de trem/metrô dos sistemas operados pela Motiva. Dados incluem Metrô Bahia, ViaQuatro, ViaMobilidade (Linhas 5, 8 e 9) e VLT Carioca.",
    theme: "Mobilidade",
    region: "Brasil",
    accessMethod: "Disponível para download",
    keywords: [
      "Transporte público",
      "Demanda de passageiros",
      "Sistemas metroferroviários",
      "Metrô",
      "VLT",
      "Integração de modais",
    ],
    createdAt: "2026-09-25",
    tags: ["Mobilidade", "Brasil", "Disponível para download"],
    dataset_info: [
      {
        dataset_title: "Embarques por hora nas estações [2012-2026]",
        dataset_description:
          "Embarques diários por hora do dia e estação de trem/metrô dos sistemas operados pela Motiva. Dados incluem Metrô Bahia, ViaQuatro e VLT Carioca.",
        dataset_link:
          "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/9MZGJL",
      },
      {
        dataset_title: "Embarques diários nas estações [2012-2026]",
        dataset_description:
          "Total de embarques diários por estação de trem/metrô dos sistemas operados pela Motiva. Dados incluem Metrô Bahia, ViaQuatro, ViaMobilidade (Linhas 5, 8 e 9) e VLT Carioca.",
        dataset_link:
          "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/UTGQ0I",
      },
      {
        dataset_title: "Médias mensais de embarques diários [2012-2026]",
        dataset_description:
          "Média de embarques diários por mês e tipo do dia (dia útil, sábado e domingo) dos sistemas operados pela Motiva. Dados incluem Metrô Bahia, ViaQuatro, ViaMobilidade (Linhas 5, 8 e 9) e VLT Carioca.",
        dataset_link:
          "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/BPYHFB",
      },
      {
        dataset_title: "Embarques mensais por modo de integração [2019-2026]",
        dataset_description:
          "Embarques mensais por modo de integração do Metrô Bahia.",
        dataset_link:
          "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/UOKFMF",
      },
      {
        dataset_title: "Linhas e Estações Metroferroviárias (Motiva) [2026]",
        dataset_description:
          "Tabela de linhas e estações de trem/metrô dos sistemas operados pela Motiva. Dados incluem Metrô Bahia, ViaQuatro, ViaMobilidade (Linhas 5, 8 e 9) e VLT Carioca.",
        dataset_link:
          "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/YWXLQS",
      },
    ],
  },
  {
    id: "4",
    title:
      "Ganhos e horas trabalhadas dos entregadores parceiros do iFood [2022-2026]",
    description:
      "Informações sobre horas trabalhadas e ganhos dos entregadores parceiros do iFood.\nConjunto de dados disponibilizados a partir da parceria do CDIA com o iFood.",
    theme: "Trabalho e Renda",
    region: "São Paulo",
    accessMethod: "Sala segura do Insper",
    keywords: [
      "Motociclistas",
      "Entregas por aplicativo",
      "Logística urbana",
      "Ganhos financeiros",
    ],
    createdAt: "2026-09-25",
    tags: ["Trabalho e Renda", "São Paulo", "Sala segura do Insper"],
    dataset_info: [
      {
        dataset_title:
          "Ganhos e horas trabalhadas dos entregadores parceiros do iFood [2022-2026]",
        dataset_description:
          "Informações sobre horas trabalhadas e ganhos dos entregadores parceiros do iFood.\nConjunto de dados disponibilizados a partir da parceria do CDIA com o iFood.",
        dataset_link:
          "https://www.insper.edu.br/pt/pesquisa/centro-de-dados-e-ia",
      },
    ],
  },
  {
    id: "6",
    title: "Imposto sobre Transmissão de Bens Imóveis (ITBI) [2006-2025]",
    description:
      "Registros de arrecadação e valores de transferências de imóveis no município de São Paulo.\nConjunto de dados tratados e enriquecidos pelo Centro de Estudos das Cidades.",
    theme: "Habitação e Mercado Imobiliário",
    region: "São Paulo",
    accessMethod: "Disponível para download",
    keywords: [
      "Residências",
      "Imóveis",
      "Preço do solo",
      "Transações imobiliárias",
      "Imposto",
    ],
    createdAt: "2026-09-25",
    tags: [
      "Habitação e Mercado Imobiliário",
      "São Paulo",
      "Disponível para download",
    ],
    dataset_info: [
      {
        dataset_title:
          "Imposto sobre Transmissão de Bens Imóveis (ITBI) [2006-2025]",
        dataset_description:
          "Registros de arrecadação e valores de transferências de imóveis no município de São Paulo.\nConjunto de dados tratados e enriquecidos pelo Centro de Estudos das Cidades.",
        dataset_link:
          "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/AOLEOI",
      },
    ],
  },
  {
    id: "7",
    title: "Loft [2019-2026]",
    description:
      "Dados detalhados sobre anúncios e contratos imobiliários, incluindo características dos imóveis e dos condomínios, nas cidades com atuação da Loft.",
    theme: "Habitação e Mercado Imobiliário",
    region: "Brasil",
    accessMethod: "Sala segura do Insper",
    keywords: ["Imóveis", "Transações imobiliárias", "Residências", "Moradia"],
    createdAt: "2026-09-25",
    tags: [
      "Habitação e Mercado Imobiliário",
      "Brasil",
      "Sala segura do Insper",
    ],
    dataset_info: [
      {
        dataset_title: "Contratos e Anúncios Imobiliários, Loft [2019-2026]",
        dataset_description:
          "Dados detalhados sobre anúncios e contratos imobiliários, incluindo características dos imóveis e dos condomínios, nas cidades com atuação da Loft.",
        dataset_link:
          "https://www.insper.edu.br/pt/pesquisa/centro-de-dados-e-ia",
      },
    ],
  },
  {
    id: "8",
    title:
      "Medições de ilhas de calor e qualidade do ar, Favela da Maré-RJ [2023]",
    description:
      "Estatísticas descritivas de coletas de temperatura, umidade e qualidade do ar feitas nas 16 favelas da Maré em 2023. Dados foram coletados de março a setembro de 2023.\nConjunto de dados preparado para o estudo Respira Maré, da Redes da Maré.",
    theme: "Clima e Meio Ambiente",
    region: "Rio de Janeiro",
    accessMethod: "Disponível para download",
    keywords: [
      "Qualidade do ar",
      "Desigualdade urbana",
      "Urbanismo",
      "Ilhas de calor",
      "Habitação",
    ],
    createdAt: "2026-09-25",
    tags: [
      "Clima e Meio Ambiente",
      "Rio de Janeiro",
      "Disponível para download",
    ],
    dataset_info: [
      {
        dataset_title:
          "Medições de ilhas de calor e qualidade do ar, Favela da Maré-RJ [2023]",
        dataset_description:
          "Estatísticas sobre ilhas de calor e qualidade do ar na Favela da Maré. Informações incluem: temperatura, umidade, dióxido de carbono, formaldeído (HCHO) e material particulado. Temperatura e umidade foram coletadas em diferentes turnos e dias da semana; a qualidade do ar, na última semana de cada mês (de segunda a sexta). Coletas feitas de março a setembro de 2023.",
        dataset_link:
          "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/TONMVQ",
      },
    ],
  },
  {
    id: "9",
    title: "Indicadores de mortalidade por distrito [2010-2019]",
    description:
      'Indicadores de mortalidade (óbitos observados, esperados e risco relativo) por distrito administrativo de São Paulo, de 2010 a 2019. Considera quatro causas: diabetes, doenças cerebrovasculares, doenças isquêmicas do coração e mortalidade materna.\nConjunto de dados preparado para o relatório "Síntese de evidências sobre saúde no município de São Paulo" [2024].',
    theme: "Saúde",
    region: "São Paulo",
    accessMethod: "Disponível para download",
    keywords: [
      "Mortalidade prematura",
      "Mortalidade",
      "Desigualdade urbana",
      "Saúde pública",
      "Mortalidade materna",
    ],
    createdAt: "2026-09-25",
    tags: ["Saúde", "São Paulo", "Disponível para download"],
    dataset_info: [
      {
        dataset_title: "Indicadores de mortalidade por distrito [2010-2019]",
        dataset_description:
          "Indicadores de mortalidade (óbitos observados, esperados e risco relativo) por distrito administrativo de São Paulo, de 2010 a 2019. Considera quatro causas: diabetes, doenças cerebrovasculares, doenças isquêmicas do coração e mortalidade materna.",
        dataset_link:
          "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/CDXI9B",
      },
    ],
  },
  {
    id: "10",
    title: "Pesquisa Nacional de Mobilidade Urbana (PEMOB) [2019-2024]",
    description:
      "Questionário de mobilidade urbana municipal e intermunicipal preenchido por gestores de transporte público em cidades brasileiras com mais de 100 mil habitantes. Inclui dados sobre infraestrutura, frota, demanda, tarifas e políticas de mobilidade.",
    theme: "Mobilidade",
    region: "Brasil",
    accessMethod: "Disponível para download",
    keywords: [
      "Mobilidade urbana",
      "Gestão de transportes",
      "Transporte público",
      "SIMU",
      "Políticas de mobilidade",
    ],
    createdAt: "2026-09-25",
    tags: ["Mobilidade", "Brasil", "Disponível para download"],
    dataset_info: [
      {
        dataset_title:
          "Pesquisa Nacional de Mobilidade Urbana (PEMOB) [2019-2024]",
        dataset_description:
          "Base anual e harmonizada (formato de painel) da PEMOB entre os anos de 2019 a 2024.",
        dataset_link:
          "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/5XUNNW",
      },
    ],
  },
  {
    id: "11",
    title: "Programas educacionais do iFood [2022-2026]",
    description:
      "Informações sobre participação dos entregadores parceiros do iFood nos programas Decola e Meu Diploma do Ensino Médio (MDEM).\nConjunto de dados disponibilizados a partir da parceria do CDIA com o iFood.",
    theme: "Educação",
    region: "São Paulo",
    accessMethod: "Sala segura do Insper",
    keywords: [
      "Motociclistas",
      "Entregas por aplicativo",
      "Logística urbana",
      "Qualificação profissional",
      "Ensino Médio",
    ],
    createdAt: "2026-09-25",
    tags: ["Educação", "São Paulo", "Sala segura do Insper"],
    dataset_info: [
      {
        dataset_title: "Programas educacionais do iFood [2022-2026]",
        dataset_description:
          "Informações sobre participação dos entregadores parceiros do iFood nos programas Decola e Meu Diploma do Ensino Médio (MDEM).\nConjunto de dados disponibilizados a partir da parceria do CDIA com o iFood.",
        dataset_link:
          "https://www.insper.edu.br/pt/pesquisa/centro-de-dados-e-ia",
      },
    ],
  },
  {
    id: "12",
    title: "QuintoAndar [2011-2025]",
    description:
      "Dados detalhados sobre anúncios e contratos imobiliários, incluindo características dos imóveis e dos condomínios, nas cidades com atuação do QuintoAndar.",
    theme: "Habitação e Mercado Imobiliário",
    region: "Brasil",
    accessMethod: "Sala segura do Insper",
    keywords: ["Imóveis", "Transações imobiliárias", "Residências", "Moradia"],
    createdAt: "2026-09-25",
    tags: [
      "Habitação e Mercado Imobiliário",
      "Brasil",
      "Sala segura do Insper",
    ],
    dataset_info: [
      {
        dataset_title:
          "Contratos e Anúncios Imobiliários, QuintoAndar [2011-2025]",
        dataset_description:
          "Dados detalhados sobre anúncios e contratos imobiliários, incluindo características dos imóveis e dos condomínios, nas cidades com atuação do QuintoAndar.",
        dataset_link:
          "https://www.insper.edu.br/pt/pesquisa/centro-de-dados-e-ia",
      },
    ],
  },
  {
    id: "13",
    title: "Rotas dos entregadores parceiros do iFood [2022-2026]",
    description:
      "Registros de velocidade e fluxo das rotas de entregas feitas pelos entregadores parceiros do iFood nas vias principais.\nConjunto de dados disponibilizados a partir da parceria do CDIA com o iFood.",
    theme: "Mobilidade",
    region: "São Paulo",
    accessMethod: "Sala segura do Insper",
    keywords: [
      "Motociclistas",
      "Entregas por aplicativo",
      "Logística urbana",
      "Velocidade",
      "Fluxo",
    ],
    createdAt: "2026-09-25",
    tags: ["Mobilidade", "São Paulo", "Sala segura do Insper"],
    dataset_info: [
      {
        dataset_title: "Rotas dos entregadores parceiros do iFood [2022-2026]",
        dataset_description:
          "Registros de velocidade e fluxo das rotas de entregas feitas pelos entregadores parceiros do iFood nas vias principais.\nConjunto de dados disponibilizados a partir da parceria do CDIA com o iFood.",
        dataset_link:
          "https://www.insper.edu.br/pt/pesquisa/centro-de-dados-e-ia",
      },
    ],
  },
  {
    id: "14",
    title: "Sinistros de Trânsito [2022-2025]",
    description:
      "Sinistros de trânsito em São Paulo (SP) no período de 2022 a 2025. Dados agregados e compatibilizados do InfoSiga. Sinistros individuais foram agregados em trechos de vias usando fuzzy matching e análise de distância do sinistro até o trecho mais próximo.",
    theme: "Mobilidade",
    region: "São Paulo",
    accessMethod: "Disponível para download",
    keywords: [
      "Sinistros de trânsito",
      "Segurança viária",
      "Mobilidade urbana",
      "Faixa Azul",
    ],
    createdAt: "2026-09-25",
    tags: ["Mobilidade", "São Paulo", "Disponível para download"],
    dataset_info: [
      {
        dataset_title: "Sinistros de Trânsito [2022-2025]",
        dataset_description:
          "Sinistros de trânsito em São Paulo (SP) no período de 2022 a 2025, extraídos do InfoSiga.",
        dataset_link:
          "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/IRGJPX",
      },
      {
        dataset_title: "Sinistros de Trânsito Agregados por Via [2022-2025]",
        dataset_description:
          "Localização de trechos com sinistros de trânsito entre 2022 e 2025. Sinistros individuais foram agregados em trechos de vias.",
        dataset_link:
          "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/XA5PFG",
      },
    ],
  },
  {
    id: "15",
    title:
      "Trechos com Faixas Dedicadas a Motociclistas (Faixa Azul) [2022-2025]",
    description:
      "Localização dos trechos com faixas de trânsito dedicadas a motociclistas (Faixa Azul) implementadas em São Paulo no período de 2022 a 2025.",
    theme: "Mobilidade",
    region: "São Paulo",
    accessMethod: "Disponível para download",
    keywords: [
      "Mobilidade urbana",
      "Motociclistas",
      "Faixa Azul",
      "Políticas de mobilidade",
    ],
    createdAt: "2026-09-25",
    tags: ["Mobilidade", "São Paulo", "Disponível para download"],
    dataset_info: [
      {
        dataset_title:
          "Trechos com Faixas Dedicadas a Motociclistas (Faixa Azul) [2022-2025]",
        dataset_description:
          "Localização dos trechos com faixas de trânsito dedicadas a motociclistas (Faixa Azul) implementadas em São Paulo no período de 2022 a 2025.",
        dataset_link:
          "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/A4AC1I",
      },
    ],
  },
  {
    id: "16",
    title: "Índice GeoSES [2010]",
    description:
      "Índice socioeconômico espacial GeoSES calculado por área de ponderação no município de São Paulo. O índice pondera dimensões de educação, mobilidade, pobreza, privação material, riqueza, renda e segregação, usando dados da Amostra do Censo Demográfico de 2010.",
    theme: "Multidisciplinar e Transversal",
    region: "São Paulo",
    accessMethod: "Disponível para download",
    keywords: [
      "Índice socioeconômico",
      "Desigualdade urbana",
      "Estrutura socioeconômica urbana",
      "Vulnerabilidade social",
    ],
    createdAt: "2026-09-25",
    tags: [
      "Multidisciplinar e Transversal",
      "São Paulo",
      "Disponível para download",
    ],
    dataset_info: [
      {
        dataset_title: "Índice GeoSES [2010]",
        dataset_description:
          "Índice socioeconômico espacial GeoSES calculado por área de ponderação no município de São Paulo. O índice pondera dimensões de educação, mobilidade, pobreza, privação material, riqueza, renda e segregação, usando dados da Amostra do Censo Demográfico de 2010.",
        dataset_link:
          "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/7IXFPX",
      },
    ],
  },
];

export const filterOptions = {
  themes: [
    "Clima e Meio Ambiente",
    "Educação",
    "Habitação e Mercado Imobiliário",
    "Mobilidade",
    "Saúde",
    "Trabalho e Renda",
    "Multidisciplinar e Transversal",
  ],
  regions: ["Rio de Janeiro", "São Paulo", "Brasil"],
  accessMethods: ["Disponível para download", "Sala segura do Insper"],
};
