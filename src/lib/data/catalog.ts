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
    createdAt: "2025-12-08",
    tags: [
      "Habitação e Mercado Imobiliário",
      "São Paulo",
      "Disponível para download",
    ],
    dataset_info: [
      {
        dataset_title:
          "Alvarás de licenciamento de novas edificações [2004-2024]",
        dataset_description:
          "Informações sobre novas edificações formais a partir de dados dos alvarás de licenciamento.\nConjunto de dados tratados e enriquecidos pelo Centro de Estudos das Cidades.",
        dataset_link:
          "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/FPCIDI",
      },
    ],
  },
  {
    id: "2",
    title:
      "Cadastro de imóveis para cobrança do Imposto Predial e Territorial Urbano (IPTU) [2024]",
    description:
      "Informações gerais sobre os imóveis formais de uso residencial, comercial e outros.\nConjunto de dados tratados e enriquecidos pelo Centro de Estudos das Cidades.",
    theme: "Habitação e Mercado Imobiliário",
    region: "São Paulo",
    accessMethod: "Disponível para download",
    keywords: [
      "Residências",
      "Imóveis",
      "Cadastro imobiliário",
      "Valor venal",
      "Imposto",
    ],
    createdAt: "2025-12-08",
    tags: [
      "Habitação e Mercado Imobiliário",
      "São Paulo",
      "Disponível para download",
    ],
    dataset_info: [
      {
        dataset_title:
          "Cadastro de imóveis para cobrança do Imposto Predial e Territorial Urbano (IPTU) [2024]",
        dataset_description:
          "Informações gerais sobre os imóveis formais de uso residencial, comercial e outros.\nConjunto de dados tratados e enriquecidos pelo Centro de Estudos das Cidades.",
        dataset_link:
          "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/TOXCRF",
      },
    ],
  },
  {
    id: "3",
    title: "Densidade Populacional e Verticalização [2022,2024]",
    description:
      'Dados provisórios do Censo (2022) em formato shapefile (gpkg), agregados por setor censitário para o município de São Paulo.\nConjunto de dados preparado para o estudo "Para o bem ou para o mal: análise da capacidade que o governo tem de controlar a densidade habitacional" (Theil, Gustavo).',
    theme: "Habitação e Mercado Imobiliário",
    region: "São Paulo",
    accessMethod: "Disponível para download",
    keywords: [
      "CENSO",
      "IBGE",
      "Densidade Populacional",
      "São Paulo",
      "População",
      "Habitação",
      "Moradia",
      "Verticalização",
      "IPTU São Paulo",
      "Potencial construtivo",
    ],
    createdAt: "2025-12-08",
    tags: [
      "Habitação e Mercado Imobiliário",
      "São Paulo",
      "Disponível para download",
    ],
    dataset_info: [
      {
        dataset_title: "População e Domicílios por Setor Censitário [2022]",
        dataset_description:
          'Dados provisórios do Censo (2022) em formato shapefile (gpkg), agregados por setor censitário para o município de São Paulo.\nConjunto de dados preparado para o estudo "Para o bem ou para o mal: análise da capacidade que o governo tem de controlar a densidade habitacional" (Theil, Gustavo).',
        dataset_link:
          "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/GTO7DD",
      },
      {
        dataset_title: "Densidade Populacional e Verticalização [2022,2024]",
        dataset_description:
          'Dados do Imposto Predial e Territorial Urbano (IPTU), agregados por lote para o município de São Paulo com métricas adicionais de potencial construtivo e índice de verticalização.\nConjunto de dados preparado para o estudo "Para o bem ou para o mal: análise da capacidade que o governo tem de controlar a densidade habitacional" (Theil, Gustavo).',
        dataset_link:
          "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/HEK6TH",
      },
      {
        dataset_title: "IPTU e Verticalização em São Paulo [2024]",
        dataset_description:
          'Dados demográficos e habitacionais agregados em um raster de 800x800m, resultado de interpolação (por área) de informações do Censo (2022) e do IPTU de São Paulo. Contém medidas de densidade populacional e de informalidade dos imóveis.\nConjunto de dados preparado para o estudo "Para o bem ou para o mal: análise da capacidade que o governo tem de controlar a densidade habitacional" (Theil, Gustavo).',
        dataset_link:
          "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/4QNTOT",
      },
      {
        dataset_title:
          "Densidade Populacional e Verticalização de Imóveis em São Paulo [2022,2024]",
        dataset_description:
          'Cruzamento entre os lotes do IPTU de São Paulo com dados do CENSO, via interpolação de área, agregada por setor censitário. Conjunto de dados preparado para o estudo "Para o bem ou para o mal: análise da capacidade que o governo tem de controlar a densidade habitacional" (Theil, Gustavo).',
        dataset_link:
          "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/90SSHM",
      },
    ],
  },
  {
    id: "4",
    title:
      "Embarques nas Estação de Trem/Metrô operados pela Motiva [2012-2025]",
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
    createdAt: "2025-12-08",
    tags: ["Mobilidade", "Brasil", "Disponível para download"],
    dataset_info: [
      {
        dataset_title:
          "Embarques a cada hora (horários) nas estações [2012-2025]",
        dataset_description:
          "Embarques diários por hora do dia e estação de trem/metrô dos sistemas operados pela Motiva. Dados incluem Metrô Bahia, ViaQuatro e VLT Carioca.",
        dataset_link:
          "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/9MZGJL",
      },
      {
        dataset_title: "Embarques diários nas estações [2012-2025]",
        dataset_description:
          "Total de embarques diários por estação de trem/metrô dos sistemas operados pela Motiva. Dados incluem Metrô Bahia, ViaQuatro, ViaMobilidade (Linhas 5, 8 e 9) e VLT Carioca.",
        dataset_link:
          "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/UTGQ0I",
      },
      {
        dataset_title: "Médias mensais de embarques diários [2012-2025]",
        dataset_description:
          "Média de embarques diários por mês e tipo do dia (dia útil, sábado e domingo) dos sistemas operados pela Motiva. Dados incluem Metrô Bahia, ViaQuatro, ViaMobilidade (Linhas 5, 8 e 9) e VLT Carioca.",
        dataset_link:
          "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/BPYHFB",
      },
      {
        dataset_title: "Embarques mensais por modo de integração [2022-2025]",
        dataset_description:
          "Embarques mensais por modo de integração do Metrô Bahia.",
        dataset_link:
          "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/UOKFMF",
      },
    ],
  },
  {
    id: "5",
    title:
      "Ganhos e horas trabalhadas dos entregadores parceiros do iFood [2022-2024]",
    description:
      "Informações sobre hora trabalhada e ganhos dos entregadores parceiros do iFood.\nConjunto de dados disponibilizados a partir da parceria do CDIA com o iFood.",
    theme: "Trabalho e renda",
    region: "São Paulo",
    accessMethod: "Sala segura do Insper",
    keywords: [
      "Motociclistas",
      "Entregas por aplicativo",
      "Logistica urbana",
      "Ganhos financeiros",
    ],
    createdAt: "2025-12-08",
    tags: ["Trabalho e renda", "São Paulo", "Sala segura do Insper"],
    dataset_info: [
      {
        dataset_title:
          "Ganhos e horas trabalhadas dos entregadores parceiros do iFood [2022-2024]",
        dataset_description:
          "Informações sobre hora trabalhada e ganhos dos entregadores parceiros do iFood.\nConjunto de dados disponibilizados a partir da parceria do CDIA com o iFood.",
        dataset_link:
          "https://portal.datascience.insper.edu.br/pt/salas-seguras",
      },
    ],
  },
  {
    id: "6",
    title: "Gastos com UBS por distrito [2019]",
    description:
      'Gastos com Unidades Básicas de Saúde por Distrito Administrativo na cidade de São Paulo em 2019. Valores absolutos e per capita.\nConjunto de dados preparado para o relatório "Síntese de evidências sobre saúde no município de São Paulo" [2024].',
    theme: "Saúde",
    region: "São Paulo",
    accessMethod: "Disponível para download",
    keywords: [
      "Saúde Pública",
      "Investimento em Saúde Pública",
      "Unidade Básica de Saúde",
      "São Paulo",
    ],
    createdAt: "2025-12-08",
    tags: ["Saúde", "São Paulo", "Disponível para download"],
    dataset_info: [
      {
        dataset_title: "Gastos com UBS por distrito [2019]",
        dataset_description:
          "Gastos com Unidades Básicas de Saúde por Distrito Administrativo na cidade de São Paulo em 2019. Valores absolutos e per capita.",
        dataset_link:
          "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/YZBSBF",
      },
    ],
  },
  {
    id: "7",
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
    createdAt: "2025-12-08",
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
    id: "8",
    title: "Linhas e Estações Metroferroviárias (Motiva) [2025]",
    description:
      "Tabela de linhas e estações de trem/metrô dos sistemas operados pela Motiva. Dados incluem Metrô Bahia, ViaQuatro, ViaMobilidade (Linhas 5, 8 e 9) e VLT Carioca.",
    theme: "Mobilidade",
    region: "Brasil",
    accessMethod: "Disponível para download",
    keywords: [
      "Transporte público",
      "Sistemas metroferroviários",
      "Metrô",
      "VLT",
    ],
    createdAt: "2025-12-08",
    tags: ["Mobilidade", "Brasil", "Disponível para download"],
    dataset_info: [
      {
        dataset_title: "Linhas e Estações Metroferroviárias (Motiva) [2025]",
        dataset_description:
          "Tabela de linhas e estações de trem/metrô dos sistemas operados pela Motiva. Dados incluem Metrô Bahia, ViaQuatro, ViaMobilidade (Linhas 5, 8 e 9) e VLT Carioca.",
        dataset_link:
          "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/YWXLQS",
      },
    ],
  },
  {
    id: "9",
    title: "Medições de temperatura e umidade do ar, Favela da Maré-RJ [2023]",
    description:
      "Estatísticas descritivas de coletas de temperatura feitas nas 16 favelas da Maré. Dados incluem temperatura e umidade do ar. Dados foram coletados em 25 pontos distintos em diferentes turnos do dia e em diferentes dias da semana no período de março a setembro de 2023.\nConjunto de dados preparado para o estudo Respira Maré, da Redes da Maré.",
    theme: "Clima e Meio Ambiente",
    region: "Rio de Janeiro",
    accessMethod: "Disponível para download",
    keywords: [
      "Ilhas de Calor",
      "Habitação",
      "Urbanismo",
      "Desigualdade urbana",
    ],
    createdAt: "2025-12-08",
    tags: [
      "Clima e Meio Ambiente",
      "Rio de Janeiro",
      "Disponível para download",
    ],
    dataset_info: [
      {
        dataset_title:
          "Medições de temperatura e umidade do ar, Favela da Maré-RJ [2023]",
        dataset_description:
          "Estatísticas descritivas de coletas de temperatura. Dados incluem temperatura e umidade do ar. Dados foram coletados em 25 pontos distintos em diferentes turnos do dia e em diferentes dias da semana no período de março a setembro de 2023.",
        dataset_link:
          "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/NQA7LY",
      },
    ],
  },
  {
    id: "10",
    title: "Medições e qualidade do ar, Favela da Maré-RJ [2023]",
    description:
      "Estatísticas descritivas de coletas de qualidade do ar feitas nas 16 favelas da Maré em 2023. Informações incluem: dióxido de carbono, formaldeído (HCHO) e material particulado. Dados foram coletados no período de março a setembro de 2023, na última semana de cada mês, incluindo somente os dias da semana (segunda à sexta). Dados foram coletados em 5 pontos distintos.\nConjunto de dados preparado para o estudo Respira Maré, da Redes da Maré.",
    theme: "Clima e Meio Ambiente",
    region: "Rio de Janeiro",
    accessMethod: "Disponível para download",
    keywords: [
      "Qualidade do Ar",
      "Habitação",
      "Urbanismo",
      "Desigualdade urbana",
      "Poluição urbana",
    ],
    createdAt: "2025-12-08",
    tags: [
      "Clima e Meio Ambiente",
      "Rio de Janeiro",
      "Disponível para download",
    ],
    dataset_info: [
      {
        dataset_title: "Medições e qualidade do ar, Favela da Maré-RJ [2023]",
        dataset_description:
          "Estatísticas descritivas de coletas de qualidade do ar. Informações incluem: dióxido de carbono, formaldeído (HCHO) e material particulado. Dados foram coletados no período de março a setembro de 2023, na última semana de cada mês (segunda à sexta). Dados foram coletados em 5 pontos distintos.",
        dataset_link:
          "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/OICDGN",
      },
    ],
  },
  {
    id: "11",
    title: "Mortalidade prematura por distrito [2019]",
    description:
      'Medidas de mortalidade prematuras por distrito administrativo de São Paulo. Levantamento considera: mortalidade materna, mortalidade prematura por doenças cardiovasculares e mortalidade prematura por Diabetes Mellitus.\nConjunto de dados preparado para o relatório "Síntese de evidências sobre saúde no município de São Paulo" [2024].',
    theme: "Saúde",
    region: "São Paulo",
    accessMethod: "Disponível para download",
    keywords: ["Mortalidade prematura", "Mortalidade", "Desigualdade urbana"],
    createdAt: "2025-12-08",
    tags: ["Saúde", "São Paulo", "Disponível para download"],
    dataset_info: [
      {
        dataset_title: "Mortalidade prematura por distrito [2019]",
        dataset_description:
          "Medidas de mortalidade prematuras por distrito administrativo de São Paulo. Levantamento considera: mortalidade materna, mortalidade prematura por doenças cardiovasculares e mortalidade prematura por Diabetes Mellitus.",
        dataset_link:
          "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/JJ8JIN",
      },
    ],
  },
  {
    id: "12",
    title: "Pesquisa Nacional de Mobilidade Urbana (PEMOB) [2019-2024]",
    description:
      "Questionário de mobilidade urbana municipal e intermunicipal preenchido por gestores de transporte público em cidades brasileiras. Inclui dados sobre infraestrutura, frota, demanda, tarifas e políticas de mobilidade.",
    theme: "Mobilidade",
    region: "Brasil",
    accessMethod: "Disponível para download",
    keywords: [
      "Mobilidade Urbana",
      "Gestão de Transportes",
      "Transporte público",
      "SIMU",
      "Políticas de Mobilidade",
    ],
    createdAt: "2025-12-08",
    tags: ["Mobilidade", "Brasil", "Disponível para download"],
    dataset_info: [
      {
        dataset_title:
          "[Anual] Pesquisa Nacional de Mobilidade Urbana (PEMOB) [2019-2024]",
        dataset_description:
          "Base municipal anual da PEMOB entre os anos de 2019 a 2024.",
        dataset_link:
          "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/CNEBWU",
      },
      {
        dataset_title:
          "[Harmonizada] Pesquisa Nacional de Mobilidade Urbana (PEMOB) [2019-2024]",
        dataset_description:
          "A base harmonizada padroniza informações coletadas entre 2019 e 2024, permitindo análises longitudinais.",
        dataset_link:
          "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/LE4FRB",
      },
    ],
  },
  {
    id: "13",
    title: "Programas educacionais do iFood [2022-2024]",
    description:
      "Informações sobre participação entregadores parceiros do iFood nos programas Decola e Meu Diploma do Ensino Médio (MDEM).\nConjunto de dados disponibilizados a partir da parceria do CDIA com o iFood.",
    theme: "Educação",
    region: "São Paulo",
    accessMethod: "Sala segura do Insper",
    keywords: [
      "Motociclistas",
      "Entregas por aplicativo",
      "Logistica urbana",
      "Qualificação profissional",
      "Ensino Médio",
    ],
    createdAt: "2025-12-08",
    tags: ["Educação", "São Paulo", "Sala segura do Insper"],
    dataset_info: [
      {
        dataset_title: "Programas educacionais do iFood [2022-2024]",
        dataset_description:
          "Informações sobre participação entregadores parceiros do iFood nos programas Decola e Meu Diploma do Ensino Médio (MDEM).\nConjunto de dados disponibilizados a partir da parceria do CDIA com o iFood.",
        dataset_link:
          "https://portal.datascience.insper.edu.br/pt/salas-seguras",
      },
    ],
  },
  {
    id: "14",
    title: "Rotas dos entregadores parceiros do iFood [2022-2024]",
    description:
      "Registros de velocidade e fluxo das rotas de entregas feita pelos entregadores parceiros do iFood nas vias principais.\nConjunto de dados disponibilizados a partir da parceria do CDIA com o iFood.",
    theme: "Mobilidade",
    region: "São Paulo",
    accessMethod: "Sala segura do Insper",
    keywords: [
      "Motociclistas",
      "Entregas por aplicativo",
      "Logistica urbana",
      "Velocidade",
      "Fluxo",
    ],
    createdAt: "2025-12-08",
    tags: ["Mobilidade", "São Paulo", "Sala segura do Insper"],
    dataset_info: [
      {
        dataset_title: "Rotas dos entregadores parceiros do iFood [2022-2024]",
        dataset_description:
          "Registros de velocidade e fluxo das rotas de entregas feita pelos entregadores parceiros do iFood nas vias principais.\nConjunto de dados disponibilizados a partir da parceria do CDIA com o iFood.",
        dataset_link:
          "https://portal.datascience.insper.edu.br/pt/salas-seguras",
      },
    ],
  },
  {
    id: "15",
    title: "Sinistros de Trânsito [2022-2025]",
    description:
      "Sinistros de trânsito em São Paulo (SP) no período de 2022 a 2025. Dados agregados e compatibilizados do InfoSiga. Sinistros individuais foram agregados em trechos de vias usando fuzzy matching e análise de distância do sinistro até o trecho mais próximo.",
    theme: "Mobilidade",
    region: "São Paulo",
    accessMethod: "Disponível para download",
    keywords: ["Sinistros de Trânsito", "Mobilidade Urbana", "Faixa Azul"],
    createdAt: "2025-12-08",
    tags: ["Mobilidade", "São Paulo", "Disponível para download"],
    dataset_info: [
      {
        dataset_title: "Sinistros de Trânsito",
        dataset_description: "Sinistros de trânsito no período de 2022 a 2025.",
        dataset_link:
          "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/IRGJPX",
      },
      {
        dataset_title: "Sinistros de Trânsito Agregados por Via",
        dataset_description:
          "Localização de trechos com sinistros de trânsito entre 2022 e 2025. Sinistros individuais foram agregados em trechos de vias.",
        dataset_link:
          "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/XA5PFG",
      },
    ],
  },
  {
    id: "16",
    title:
      "Trechos com Faixas Dedicadas a Mociclistas (Faixa Azul) [2022-2025]",
    description:
      "Localização dos trechos com faixas de trânsito dedicadas a motociclistas (Faixa Azul) implementadas em São Paulo no período de 2022 a 2025.",
    theme: "Mobilidade",
    region: "São Paulo",
    accessMethod: "Disponível para download",
    keywords: [
      "Mobilidade Urbana",
      "Motocicleta",
      "Faixa Azul",
      "Políticas de Mobilidade",
    ],
    createdAt: "2025-12-08",
    tags: ["Mobilidade", "São Paulo", "Disponível para download"],
    dataset_info: [
      {
        dataset_title:
          "Trechos com Faixas Dedicadas a Mociclistas (Faixa Azul)",
        dataset_description:
          "Localização dos trechos com faixas de trânsito dedicadas a motociclistas (Faixa Azul) implementadas em São Paulo no período de 2022 a 2025.",
        dataset_link:
          "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/A4AC1I",
      },
    ],
  },
  {
    id: "17",
    title: "Índice GeoSES [2010]",
    description:
      "Índice socioeconômico espacial GeoSES calculado por área de ponderação no município de São Paulo. Índice pondera dimensões de educação, renda, saúde, habitação e mobilidade, usando dados da Amostra do Censo Demográfico de 2010.",
    theme: "Multidisciplinar e transversal",
    region: "São Paulo",
    accessMethod: "Disponível para download",
    keywords: [
      "Índice socioeconômico",
      "Desigualdade urbana",
      "Estrutura socioeconômica urbana",
      "Vulnerabilidade social",
    ],
    createdAt: "2025-12-08",
    tags: [
      "Multidisciplinar e transversal",
      "São Paulo",
      "Disponível para download",
    ],
    dataset_info: [
      {
        dataset_title: "Índice GeoSES [2010]",
        dataset_description:
          "Índice socioeconômico espacial GeoSES calculado por área de ponderação no município de São Paulo. Índice pondera dimensões de educação, renda, saúde, habitação e mobilidade, usando dados da Amostra do Censo Demográfico de 2010.",
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
