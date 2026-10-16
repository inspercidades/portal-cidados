export interface DatasetInfo {
  dataset_title: string;
  dataset_description: string;
  dataset_link: string;
  source: string;
  period_start: number | null;
  period_end: number | null;
  formats: string[];
  is_spatial: boolean | null;
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
  sources: string[];
  periodStart: number | null;
  periodEnd: number | null;
  formats: string[];
  isSpatial: boolean | null;
  dataset_info: DatasetInfo[];
}

export const catalogData: DataCatalogItem[] = [
  {
    id: "1",
    title: "Alvarás de licenciamento de novas edificações [2004-2024]",
    description:
      "Informações sobre novas edificações formais a partir de dados dos alvarás de licenciamento.\nConjunto de dados tratado e enriquecido pelo Centro de Estudos das Cidades.",
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
    createdAt: "2023-11-06",
    tags: [
      "Habitação e Mercado Imobiliário",
      "São Paulo",
      "Disponível para download",
    ],
    sources: ["Prefeitura de São Paulo (SISACOE)"],
    periodStart: 2004,
    periodEnd: 2024,
    formats: ["Parquet", "XLSX", "GeoJSON", "GeoPackage"],
    isSpatial: true,
    dataset_info: [
      {
        dataset_title:
          "Alvarás de licenciamento de novas edificações [2004-2021]",
        dataset_description:
          "Agregação por lote/empreendimento dos registros de alvarás de licenciamento gerados pelo Sistema de Administração do Código de Obras e Edificações (SISACOE).",
        dataset_link:
          "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.48808/FK2/7A3HSJ",
        source: "Prefeitura de São Paulo (SISACOE)",
        period_start: 2004,
        period_end: 2021,
        formats: ["Parquet", "XLSX", "GeoJSON", "GeoPackage"],
        is_spatial: true,
      },
      {
        dataset_title:
          "Alvarás de licenciamento de novas edificações [2010-2024]",
        dataset_description:
          "Informações sobre novas edificações formais a partir de dados dos alvarás de licenciamento.\nConjunto de dados tratado e enriquecido pelo Centro de Estudos das Cidades.",
        dataset_link:
          "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/FPCIDI",
        source: "Prefeitura de São Paulo (SISACOE)",
        period_start: 2010,
        period_end: 2024,
        formats: ["Parquet", "XLSX", "GeoJSON", "GeoPackage"],
        is_spatial: true,
      },
    ],
  },
  {
    id: "2",
    title: "Densidade populacional e verticalização [2022, 2024]",
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
    createdAt: "2025-07-23",
    tags: [
      "Habitação e Mercado Imobiliário",
      "São Paulo",
      "Disponível para download",
    ],
    sources: ["Prefeitura de São Paulo", "IBGE"],
    periodStart: 2022,
    periodEnd: 2024,
    formats: ["Parquet", "XLSX", "GeoJSON", "GeoPackage"],
    isSpatial: true,
    dataset_info: [
      {
        dataset_title: "IPTU e verticalização, São Paulo [2024]",
        dataset_description:
          "Dados do IPTU agregados por lote para o município de São Paulo, com métricas de potencial construtivo e índice de verticalização.\nConjunto de dados tratado e enriquecido pelo Centro de Estudos das Cidades.",
        dataset_link:
          "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/TOXCRF",
        source: "Prefeitura de São Paulo",
        period_start: 2024,
        period_end: 2024,
        formats: ["Parquet", "XLSX", "GeoJSON", "GeoPackage"],
        is_spatial: true,
      },
      {
        dataset_title:
          "População, domicílios e densidade populacional por setor censitário [2022]",
        dataset_description:
          'Dados provisórios do Censo (2022) em formato GeoPackage (gpkg), agregados por setor censitário para o município de São Paulo.\nConjunto de dados preparado para o estudo "Para o bem ou para o mal: análise da capacidade que o governo tem de controlar a densidade habitacional" (Theil, Gustavo).',
        dataset_link:
          "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/GTO7DD",
        source: "IBGE",
        period_start: 2022,
        period_end: 2022,
        formats: ["Parquet", "XLSX", "GeoJSON", "GeoPackage"],
        is_spatial: true,
      },
      {
        dataset_title:
          "Grade de densidade populacional e habitacional, São Paulo [2022, 2024]",
        dataset_description:
          'Dados demográficos e habitacionais agregados em um raster de 800 × 800 m, resultado de interpolação (por área) de informações do Censo (2022) e do IPTU de São Paulo. Contém medidas de densidade populacional e de informalidade dos imóveis.\nConjunto de dados preparado para o estudo "Para o bem ou para o mal: análise da capacidade que o governo tem de controlar a densidade habitacional" (Theil, Gustavo).',
        dataset_link:
          "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/4QNTOT",
        source: "IBGE",
        period_start: 2022,
        period_end: 2024,
        formats: ["Parquet", "XLSX", "GeoJSON", "GeoPackage"],
        is_spatial: true,
      },
      {
        dataset_title:
          "Densidade populacional e verticalização de imóveis em São Paulo [2022, 2024]",
        dataset_description:
          'Cruzamento dos lotes do IPTU de São Paulo com dados do Censo, via interpolação por área, agregado por setor censitário.\nConjunto de dados preparado para o estudo "Para o bem ou para o mal: análise da capacidade que o governo tem de controlar a densidade habitacional" (Theil, Gustavo).',
        dataset_link:
          "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/90SSHM",
        source: "IBGE",
        period_start: 2022,
        period_end: 2024,
        formats: ["Parquet", "XLSX", "GeoJSON", "GeoPackage"],
        is_spatial: true,
      },
    ],
  },
  {
    id: "3",
    title:
      "Embarques nas estações de trem/metrô operadas pela Motiva [2012-2026]",
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
    createdAt: "2025-11-09",
    tags: ["Mobilidade", "Brasil", "Disponível para download"],
    sources: ["Motiva"],
    periodStart: 2012,
    periodEnd: 2026,
    formats: ["CSV", "Parquet", "XLSX", "RDS"],
    isSpatial: false,
    dataset_info: [
      {
        dataset_title: "Embarques por hora nas estações [2012-2026]",
        dataset_description:
          "Embarques por hora do dia e por estação de trem/metrô dos sistemas operados pela Motiva. Dados incluem Metrô Bahia, ViaQuatro e VLT Carioca.",
        dataset_link:
          "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/9MZGJL",
        source: "Motiva",
        period_start: 2012,
        period_end: 2026,
        formats: ["CSV", "Parquet", "XLSX", "RDS"],
        is_spatial: false,
      },
      {
        dataset_title: "Embarques diários nas estações [2012-2026]",
        dataset_description:
          "Total de embarques diários por estação de trem/metrô dos sistemas operados pela Motiva. Dados incluem Metrô Bahia, ViaQuatro, ViaMobilidade (Linhas 5, 8 e 9) e VLT Carioca.",
        dataset_link:
          "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/UTGQ0I",
        source: "Motiva",
        period_start: 2012,
        period_end: 2026,
        formats: ["CSV", "Parquet", "XLSX", "RDS"],
        is_spatial: false,
      },
      {
        dataset_title: "Médias mensais de embarques diários [2012-2026]",
        dataset_description:
          "Média de embarques diários por mês e tipo do dia (dia útil, sábado e domingo) dos sistemas operados pela Motiva. Dados incluem Metrô Bahia, ViaQuatro, ViaMobilidade (Linhas 5, 8 e 9) e VLT Carioca.",
        dataset_link:
          "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/BPYHFB",
        source: "Motiva",
        period_start: 2012,
        period_end: 2026,
        formats: ["CSV", "XLSX", "RDS"],
        is_spatial: false,
      },
      {
        dataset_title: "Embarques mensais por modo de integração [2019-2026]",
        dataset_description:
          "Embarques mensais por modo de integração do Metrô Bahia.",
        dataset_link:
          "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/UOKFMF",
        source: "Motiva",
        period_start: 2019,
        period_end: 2026,
        formats: ["CSV", "Parquet", "XLSX", "RDS"],
        is_spatial: false,
      },
      {
        dataset_title: "Linhas e estações metroferroviárias (Motiva) [2026]",
        dataset_description:
          "Tabela de linhas e estações de trem/metrô dos sistemas operados pela Motiva. Dados incluem Metrô Bahia, ViaQuatro, ViaMobilidade (Linhas 5, 8 e 9) e VLT Carioca.",
        dataset_link:
          "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/YWXLQS",
        source: "Motiva",
        period_start: 2026,
        period_end: 2026,
        formats: ["CSV", "XLSX", "RDS"],
        is_spatial: false,
      },
    ],
  },
  {
    id: "4",
    title:
      "Ganhos e horas trabalhadas dos entregadores parceiros do iFood [2022-2026]",
    description:
      "Informações sobre horas trabalhadas e ganhos dos entregadores parceiros do iFood.\nConjunto de dados disponibilizado a partir da parceria do Centro de Dados e IA (CDIA) do Insper com o iFood.",
    theme: "Trabalho e Renda",
    region: "São Paulo",
    accessMethod: "Sala segura do Insper",
    keywords: [
      "Motociclistas",
      "Entregas por aplicativo",
      "Logística urbana",
      "Ganhos financeiros",
    ],
    createdAt: "2025-10-29",
    tags: ["Trabalho e Renda", "São Paulo", "Sala segura do Insper"],
    sources: ["iFood"],
    periodStart: 2022,
    periodEnd: 2026,
    formats: [],
    isSpatial: null,
    dataset_info: [
      {
        dataset_title:
          "Ganhos e horas trabalhadas dos entregadores parceiros do iFood [2022-2026]",
        dataset_description:
          "Informações sobre horas trabalhadas e ganhos dos entregadores parceiros do iFood.\nConjunto de dados disponibilizado a partir da parceria do Centro de Dados e IA (CDIA) do Insper com o iFood.",
        dataset_link:
          "https://www.insper.edu.br/pt/pesquisa/centro-de-dados-e-ia",
        source: "iFood",
        period_start: 2022,
        period_end: 2026,
        formats: [],
        is_spatial: null,
      },
    ],
  },
  {
    id: "6",
    title: "Imposto sobre Transmissão de Bens Imóveis (ITBI) [2006-2025]",
    description:
      "Registros de arrecadação e valores de transferências de imóveis no município de São Paulo.\nConjunto de dados tratado e enriquecido pelo Centro de Estudos das Cidades.",
    theme: "Habitação e Mercado Imobiliário",
    region: "São Paulo",
    accessMethod: "Disponível para download",
    keywords: [
      "Residências",
      "Imóveis",
      "Preço de imóveis",
      "Transações imobiliárias",
      "Imposto",
    ],
    createdAt: "2025-12-06",
    tags: [
      "Habitação e Mercado Imobiliário",
      "São Paulo",
      "Disponível para download",
    ],
    sources: ["Prefeitura de São Paulo (Secretaria da Fazenda)"],
    periodStart: 2006,
    periodEnd: 2025,
    formats: ["CSV", "Parquet", "XLSX", "RDS"],
    isSpatial: false,
    dataset_info: [
      {
        dataset_title:
          "Imposto sobre Transmissão de Bens Imóveis (ITBI) [2006-2025]",
        dataset_description:
          "Registros de arrecadação e valores de transferências de imóveis no município de São Paulo.\nConjunto de dados tratado e enriquecido pelo Centro de Estudos das Cidades.",
        dataset_link:
          "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/AOLEOI",
        source: "Prefeitura de São Paulo (Secretaria da Fazenda)",
        period_start: 2006,
        period_end: 2025,
        formats: ["CSV", "Parquet", "XLSX", "RDS"],
        is_spatial: false,
      },
    ],
  },
  {
    id: "7",
    title: "Contratos e anúncios imobiliários Loft [2019-2026]",
    description:
      "Dados detalhados sobre anúncios e contratos imobiliários, incluindo características dos imóveis e dos condomínios, nas cidades com atuação da Loft.",
    theme: "Habitação e Mercado Imobiliário",
    region: "Brasil",
    accessMethod: "Sala segura do Insper",
    keywords: ["Imóveis", "Transações imobiliárias", "Residências", "Moradia"],
    createdAt: "2026-08-08",
    tags: [
      "Habitação e Mercado Imobiliário",
      "Brasil",
      "Sala segura do Insper",
    ],
    sources: ["Loft"],
    periodStart: 2019,
    periodEnd: 2026,
    formats: [],
    isSpatial: null,
    dataset_info: [
      {
        dataset_title: "Contratos e anúncios imobiliários Loft [2019-2026]",
        dataset_description:
          "Dados detalhados sobre anúncios e contratos imobiliários, incluindo características dos imóveis e dos condomínios, nas cidades com atuação da Loft.",
        dataset_link:
          "https://www.insper.edu.br/pt/pesquisa/centro-de-dados-e-ia",
        source: "Loft",
        period_start: 2019,
        period_end: 2026,
        formats: [],
        is_spatial: null,
      },
    ],
  },
  {
    id: "8",
    title:
      "Medições de ilhas de calor e qualidade do ar na Maré, Rio de Janeiro [2023]",
    description:
      "Estatísticas descritivas de coletas de temperatura, umidade e qualidade do ar feitas nas 16 favelas da Maré, de março a setembro de 2023.\nConjunto de dados preparado para o estudo Respira Maré, da Redes da Maré.",
    theme: "Clima e Meio Ambiente",
    region: "Rio de Janeiro",
    accessMethod: "Disponível para download",
    keywords: [
      "Qualidade do ar",
      "Desigualdade urbana",
      "Urbanismo",
      "Ilhas de calor",
      "Favelas",
    ],
    createdAt: "2026-07-30",
    tags: [
      "Clima e Meio Ambiente",
      "Rio de Janeiro",
      "Disponível para download",
    ],
    sources: ["Redes da Maré"],
    periodStart: 2023,
    periodEnd: 2023,
    formats: ["CSV", "Parquet", "XLSX", "GeoJSON", "GeoPackage"],
    isSpatial: true,
    dataset_info: [
      {
        dataset_title:
          "Medições de ilhas de calor e qualidade do ar na Maré, Rio de Janeiro [2023]",
        dataset_description:
          "Estatísticas sobre ilhas de calor e qualidade do ar na Maré. Informações incluem: temperatura, umidade, dióxido de carbono, formaldeído (HCHO) e material particulado. Temperatura e umidade foram coletadas em diferentes turnos e dias da semana; a qualidade do ar, na última semana de cada mês (de segunda a sexta). Coletas feitas de março a setembro de 2023.",
        dataset_link:
          "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/TONMVQ",
        source: "Redes da Maré",
        period_start: 2023,
        period_end: 2023,
        formats: ["CSV", "Parquet", "XLSX", "GeoJSON", "GeoPackage"],
        is_spatial: true,
      },
    ],
  },
  {
    id: "9",
    title: "Indicadores de mortalidade por distrito [2010-2019]",
    description:
      'Indicadores de mortalidade (óbitos observados, esperados e risco relativo) por distrito administrativo de São Paulo, de 2010 a 2019. Considera quatro causas: diabetes, doenças cerebrovasculares, doenças isquêmicas do coração e mortalidade materna.\nConjunto de dados preparado para o relatório "Síntese de evidências sobre saúde no município de São Paulo" (2024).',
    theme: "Saúde",
    region: "São Paulo",
    accessMethod: "Disponível para download",
    keywords: [
      "Risco relativo",
      "Mortalidade",
      "Desigualdade urbana",
      "Saúde pública",
      "Mortalidade materna",
    ],
    createdAt: "2026-07-30",
    tags: ["Saúde", "São Paulo", "Disponível para download"],
    sources: ["Prefeitura de São Paulo (SMS-SP/CEInfo)"],
    periodStart: 2010,
    periodEnd: 2019,
    formats: ["Parquet", "XLSX", "GeoJSON", "GeoPackage"],
    isSpatial: true,
    dataset_info: [
      {
        dataset_title: "Indicadores de mortalidade por distrito [2010-2019]",
        dataset_description:
          "Indicadores de mortalidade (óbitos observados, esperados e risco relativo) por distrito administrativo de São Paulo, de 2010 a 2019. Considera quatro causas: diabetes, doenças cerebrovasculares, doenças isquêmicas do coração e mortalidade materna.",
        dataset_link:
          "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/CDXI9B",
        source: "Prefeitura de São Paulo (SMS-SP/CEInfo)",
        period_start: 2010,
        period_end: 2019,
        formats: ["Parquet", "XLSX", "GeoJSON", "GeoPackage"],
        is_spatial: true,
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
    createdAt: "2026-07-30",
    tags: ["Mobilidade", "Brasil", "Disponível para download"],
    sources: ["Ministério das Cidades (SEMOB)"],
    periodStart: 2019,
    periodEnd: 2024,
    formats: ["CSV", "Parquet", "XLSX"],
    isSpatial: false,
    dataset_info: [
      {
        dataset_title:
          "Pesquisa Nacional de Mobilidade Urbana (PEMOB) [2019-2024]",
        dataset_description:
          "Base anual e harmonizada (formato de painel) da PEMOB de 2019 a 2024.",
        dataset_link:
          "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/5XUNNW",
        source: "Ministério das Cidades (SEMOB)",
        period_start: 2019,
        period_end: 2024,
        formats: ["CSV", "Parquet", "XLSX"],
        is_spatial: false,
      },
    ],
  },
  {
    id: "11",
    title: "Programas educacionais do iFood [2022-2026]",
    description:
      "Informações sobre a participação dos entregadores parceiros do iFood nos programas Decola e Meu Diploma do Ensino Médio (MDEM).\nConjunto de dados disponibilizado a partir da parceria do Centro de Dados e IA (CDIA) do Insper com o iFood.",
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
    createdAt: "2025-10-29",
    tags: ["Educação", "São Paulo", "Sala segura do Insper"],
    sources: ["iFood"],
    periodStart: 2022,
    periodEnd: 2026,
    formats: [],
    isSpatial: null,
    dataset_info: [
      {
        dataset_title: "Programas educacionais do iFood [2022-2026]",
        dataset_description:
          "Informações sobre a participação dos entregadores parceiros do iFood nos programas Decola e Meu Diploma do Ensino Médio (MDEM).\nConjunto de dados disponibilizado a partir da parceria do Centro de Dados e IA (CDIA) do Insper com o iFood.",
        dataset_link:
          "https://www.insper.edu.br/pt/pesquisa/centro-de-dados-e-ia",
        source: "iFood",
        period_start: 2022,
        period_end: 2026,
        formats: [],
        is_spatial: null,
      },
    ],
  },
  {
    id: "12",
    title: "Contratos e anúncios imobiliários QuintoAndar [2011-2025]",
    description:
      "Dados detalhados sobre anúncios e contratos imobiliários, incluindo características dos imóveis e dos condomínios, nas cidades com atuação do QuintoAndar.",
    theme: "Habitação e Mercado Imobiliário",
    region: "Brasil",
    accessMethod: "Sala segura do Insper",
    keywords: ["Imóveis", "Transações imobiliárias", "Residências", "Moradia"],
    createdAt: "2026-08-08",
    tags: [
      "Habitação e Mercado Imobiliário",
      "Brasil",
      "Sala segura do Insper",
    ],
    sources: ["QuintoAndar"],
    periodStart: 2011,
    periodEnd: 2025,
    formats: [],
    isSpatial: null,
    dataset_info: [
      {
        dataset_title:
          "Contratos e anúncios imobiliários QuintoAndar [2011-2025]",
        dataset_description:
          "Dados detalhados sobre anúncios e contratos imobiliários, incluindo características dos imóveis e dos condomínios, nas cidades com atuação do QuintoAndar.",
        dataset_link:
          "https://www.insper.edu.br/pt/pesquisa/centro-de-dados-e-ia",
        source: "QuintoAndar",
        period_start: 2011,
        period_end: 2025,
        formats: [],
        is_spatial: null,
      },
    ],
  },
  {
    id: "13",
    title: "Rotas dos entregadores parceiros do iFood [2022-2026]",
    description:
      "Registros de velocidade e fluxo das rotas de entregas feitas pelos entregadores parceiros do iFood nas vias principais.\nConjunto de dados disponibilizado a partir da parceria do Centro de Dados e IA (CDIA) do Insper com o iFood.",
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
    createdAt: "2025-10-29",
    tags: ["Mobilidade", "São Paulo", "Sala segura do Insper"],
    sources: ["iFood"],
    periodStart: 2022,
    periodEnd: 2026,
    formats: [],
    isSpatial: null,
    dataset_info: [
      {
        dataset_title: "Rotas dos entregadores parceiros do iFood [2022-2026]",
        dataset_description:
          "Registros de velocidade e fluxo das rotas de entregas feitas pelos entregadores parceiros do iFood nas vias principais.\nConjunto de dados disponibilizado a partir da parceria do Centro de Dados e IA (CDIA) do Insper com o iFood.",
        dataset_link:
          "https://www.insper.edu.br/pt/pesquisa/centro-de-dados-e-ia",
        source: "iFood",
        period_start: 2022,
        period_end: 2026,
        formats: [],
        is_spatial: null,
      },
    ],
  },
  {
    id: "14",
    title: "Sinistros de trânsito [2022-2025]",
    description:
      "Sinistros de trânsito no município de São Paulo, de 2022 a 2025. Dados agregados e compatibilizados do Infosiga. Sinistros individuais foram agregados em trechos de vias usando pareamento aproximado (fuzzy matching) e análise de distância do sinistro até o trecho mais próximo.",
    theme: "Mobilidade",
    region: "São Paulo",
    accessMethod: "Disponível para download",
    keywords: [
      "Sinistros de trânsito",
      "Segurança viária",
      "Mobilidade urbana",
      "Faixa Azul",
    ],
    createdAt: "2025-12-06",
    tags: ["Mobilidade", "São Paulo", "Disponível para download"],
    sources: ["Infosiga (Detran-SP)", "OpenStreetMap"],
    periodStart: 2022,
    periodEnd: 2025,
    formats: ["CSV", "Parquet", "XLSX", "GeoJSON", "GeoPackage"],
    isSpatial: true,
    dataset_info: [
      {
        dataset_title: "Sinistros de trânsito [2022-2025]",
        dataset_description:
          "Sinistros de trânsito no município de São Paulo, de 2022 a 2025, extraídos do Infosiga.",
        dataset_link:
          "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/IRGJPX",
        source: "Infosiga (Detran-SP)",
        period_start: 2022,
        period_end: 2025,
        formats: ["CSV", "Parquet", "XLSX"],
        is_spatial: false,
      },
      {
        dataset_title: "Sinistros de trânsito agregados por via [2022-2025]",
        dataset_description:
          "Localização de trechos com sinistros de trânsito entre 2022 e 2025. Sinistros individuais foram agregados em trechos de vias.",
        dataset_link:
          "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/XA5PFG",
        source: "Infosiga (Detran-SP); OpenStreetMap",
        period_start: 2022,
        period_end: 2025,
        formats: ["CSV", "Parquet", "XLSX", "GeoJSON", "GeoPackage"],
        is_spatial: true,
      },
    ],
  },
  {
    id: "15",
    title:
      "Trechos com faixas dedicadas a motociclistas (Faixa Azul) [2022-2025]",
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
    createdAt: "2025-12-06",
    tags: ["Mobilidade", "São Paulo", "Disponível para download"],
    sources: ["CET-SP"],
    periodStart: 2022,
    periodEnd: 2025,
    formats: ["CSV", "Parquet", "XLSX", "GeoJSON", "GeoPackage"],
    isSpatial: true,
    dataset_info: [
      {
        dataset_title:
          "Trechos com faixas dedicadas a motociclistas (Faixa Azul) [2022-2025]",
        dataset_description:
          "Localização dos trechos com faixas de trânsito dedicadas a motociclistas (Faixa Azul) implementadas em São Paulo no período de 2022 a 2025.",
        dataset_link:
          "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/A4AC1I",
        source: "CET-SP",
        period_start: 2022,
        period_end: 2025,
        formats: ["CSV", "Parquet", "XLSX", "GeoJSON", "GeoPackage"],
        is_spatial: true,
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
    createdAt: "2025-07-23",
    tags: [
      "Multidisciplinar e Transversal",
      "São Paulo",
      "Disponível para download",
    ],
    sources: ["Barrozo et al. (USP)"],
    periodStart: 2010,
    periodEnd: 2010,
    formats: ["CSV", "Parquet", "XLSX", "GeoJSON", "GeoPackage"],
    isSpatial: true,
    dataset_info: [
      {
        dataset_title: "Índice GeoSES [2010]",
        dataset_description:
          "Índice socioeconômico espacial GeoSES calculado por área de ponderação no município de São Paulo. O índice pondera dimensões de educação, mobilidade, pobreza, privação material, riqueza, renda e segregação, usando dados da Amostra do Censo Demográfico de 2010.",
        dataset_link:
          "https://dataverse.datascience.insper.edu.br/dataset.xhtml?persistentId=doi:10.60873/FK2/7IXFPX",
        source: "Barrozo et al. (USP)",
        period_start: 2010,
        period_end: 2010,
        formats: ["CSV", "Parquet", "XLSX", "GeoJSON", "GeoPackage"],
        is_spatial: true,
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
