import type { Locale } from "@/i18n/config";
import {
  catalogData,
  type DataCatalogItem,
  filterOptions,
} from "@/lib/data/catalog";

const phrases: Record<string, string> = {
  "Habitação e Mercado Imobiliário": "Housing and the real estate market",
  Mobilidade: "Mobility",
  "Trabalho e Renda": "Work and income",
  "Clima e Meio Ambiente": "Climate and the environment",
  Saúde: "Health",
  Educação: "Education",
  "Multidisciplinar e Transversal": "Cross-cutting",
  Brasil: "Brazil",
  "Disponível para download": "Available for download",
  "Sala segura do Insper": "Insper secure room",
  Residências: "Homes",
  Imóveis: "Properties",
  Licenciamento: "Permitting",
  "Novas edificações": "New buildings",
  "Incorporação imobiliária": "Real estate development",
  "Cadastro imobiliário": "Property registry",
  "Valor venal": "Assessed value",
  Imposto: "Tax",
  Censo: "Census",
  "Densidade populacional": "Population density",
  Demografia: "Demography",
  População: "Population",
  Habitação: "Housing",
  Moradia: "Housing",
  Verticalização: "Building height",
  "IPTU São Paulo": "São Paulo property tax",
  "Transporte público": "Public transit",
  "Demanda de passageiros": "Passenger demand",
  "Sistemas metroferroviários": "Metro and rail systems",
  Metrô: "Metro",
  "Integração de modais": "Mode integration",
  Motociclistas: "Motorcyclists",
  "Entregas por aplicativo": "App-based delivery",
  "Logística urbana": "Urban logistics",
  "Ganhos financeiros": "Earnings",
  "Transações imobiliárias": "Real estate transactions",
  "Qualidade do ar": "Air quality",
  "Desigualdade urbana": "Urban inequality",
  Urbanismo: "Urbanism",
  "Ilhas de calor": "Heat islands",
  Favelas: "Favelas",
  "Risco relativo": "Relative risk",
  Mortalidade: "Mortality",
  "Saúde pública": "Public health",
  "Mortalidade materna": "Maternal mortality",
  "Mobilidade urbana": "Urban mobility",
  "Gestão de transportes": "Transport management",
  SIMU: "SIMU",
  "Políticas de mobilidade": "Mobility policy",
  "Qualificação profissional": "Job training",
  "Ensino Médio": "High school",
  Velocidade: "Speed",
  Fluxo: "Flow",
  "Sinistros de trânsito": "Traffic crashes",
  "Segurança viária": "Road safety",
  "Faixa Azul": "Faixa Azul",
  "Índice socioeconômico": "Socioeconomic index",
  "Estrutura socioeconômica urbana": "Urban socioeconomic structure",
  "Vulnerabilidade social": "Social vulnerability",
  "Prefeitura de São Paulo (SISACOE)": "São Paulo City Hall (SISACOE)",
  "Prefeitura de São Paulo": "São Paulo City Hall",
  "IBGE; Prefeitura de São Paulo": "IBGE; São Paulo City Hall",
  "Prefeitura de São Paulo (SMS-SP/CEInfo)":
    "São Paulo City Hall (SMS-SP/CEInfo)",
  "Ministério das Cidades (SEMOB)": "Ministry of Cities (SEMOB)",
  "Infosiga (Detran-SP)": "Infosiga (Detran-SP)",
  "Infosiga (Detran-SP); OpenStreetMap": "Infosiga (Detran-SP); OpenStreetMap",
  "Alvarás de licenciamento de novas edificações [2004-2021]":
    "Building permits for new construction [2004-2021]",
  "Informações sobre novas edificações formais a partir de dados dos alvarás de licenciamento.\nConjunto de dados tratado e enriquecido pelo Centro de Estudos das Cidades.":
    "Information on new formal buildings from permitting records.\nDataset cleaned and enriched by the Center for Cities Studies.",
  "Agregação por lote/empreendimento dos registros de alvarás de licenciamento gerados pelo Sistema de Administração do Código de Obras e Edificações (SISACOE).":
    "Lot- and project-level aggregation of permits issued by São Paulo's building-code administration system (SISACOE).",
  "Densidade populacional e verticalização [2022, 2024]":
    "Population density and building height [2022, 2024]",
  'Dados de densidade populacional, densidade habitacional e verticalização em São Paulo, a partir do Censo (2022) e do IPTU (2024).\nConjunto de dados preparado para o estudo "Para o bem ou para o mal: análise da capacidade que o governo tem de controlar a densidade habitacional" (Theil, Gustavo).':
    'Population density, housing density, and building height in São Paulo, from the 2022 Census and the 2024 property tax.\nDataset prepared for the study "For better or worse: how far government can control housing density" (Theil, Gustavo).',
  "IPTU e verticalização, São Paulo [2024]":
    "Property tax and building height, São Paulo [2024]",
  "Dados do IPTU agregados por lote para o município de São Paulo, com métricas de potencial construtivo e índice de verticalização.\nConjunto de dados tratado e enriquecido pelo Centro de Estudos das Cidades.":
    "Property-tax records aggregated by lot for the city of São Paulo, with buildable-potential and height-index metrics.\nDataset cleaned and enriched by the Center for Cities Studies.",
  "População, domicílios e densidade populacional por setor censitário [2022]":
    "Population, households, and population density by census tract [2022]",
  'Dados provisórios do Censo (2022) em formato GeoPackage (gpkg), agregados por setor censitário para o município de São Paulo.\nConjunto de dados preparado para o estudo "Para o bem ou para o mal: análise da capacidade que o governo tem de controlar a densidade habitacional" (Theil, Gustavo).':
    'Provisional 2022 Census data in GeoPackage format, aggregated by census tract for the city of São Paulo.\nDataset prepared for the study "For better or worse: how far government can control housing density" (Theil, Gustavo).',
  "Grade de densidade populacional e habitacional, São Paulo [2022, 2024]":
    "Population and housing density grid, São Paulo [2022, 2024]",
  'Dados demográficos e habitacionais agregados em um raster de 800 × 800 m, resultado de interpolação (por área) de informações do Censo (2022) e do IPTU de São Paulo. Contém medidas de densidade populacional e de informalidade dos imóveis.\nConjunto de dados preparado para o estudo "Para o bem ou para o mal: análise da capacidade que o governo tem de controlar a densidade habitacional" (Theil, Gustavo).':
    'Demographic and housing data aggregated on an 800 × 800 m grid, from area-weighted interpolation of the 2022 Census and São Paulo property-tax records. Includes population density and housing informality.\nDataset prepared for the study "For better or worse: how far government can control housing density" (Theil, Gustavo).',
  "Densidade populacional e verticalização de imóveis em São Paulo [2022, 2024]":
    "Population density and building height in São Paulo [2022, 2024]",
  'Cruzamento dos lotes do IPTU de São Paulo com dados do Censo, via interpolação por área, agregado por setor censitário.\nConjunto de dados preparado para o estudo "Para o bem ou para o mal: análise da capacidade que o governo tem de controlar a densidade habitacional" (Theil, Gustavo).':
    'São Paulo property-tax lots joined to Census data by area-weighted interpolation, aggregated by census tract.\nDataset prepared for the study "For better or worse: how far government can control housing density" (Theil, Gustavo).',
  "Embarques nas estações de trem/metrô operadas pela Motiva [2012-2026]":
    "Boardings at train and metro stations operated by Motiva [2012-2026]",
  "Total de embarques por estação de trem/metrô dos sistemas operados pela Motiva. Dados incluem Metrô Bahia, ViaQuatro, ViaMobilidade (Linhas 5, 8 e 9) e VLT Carioca.":
    "Total boardings by train and metro station on systems operated by Motiva. Includes Metrô Bahia, ViaQuatro, ViaMobilidade (Lines 5, 8, and 9), and VLT Carioca.",
  "Embarques por hora nas estações [2012-2026]":
    "Hourly boardings at stations [2012-2026]",
  "Embarques por hora do dia e por estação de trem/metrô dos sistemas operados pela Motiva. Dados incluem Metrô Bahia, ViaQuatro e VLT Carioca.":
    "Boardings by hour of day and by train or metro station on systems operated by Motiva. Includes Metrô Bahia, ViaQuatro, and VLT Carioca.",
  "Embarques diários nas estações [2012-2026]":
    "Daily boardings at stations [2012-2026]",
  "Total de embarques diários por estação de trem/metrô dos sistemas operados pela Motiva. Dados incluem Metrô Bahia, ViaQuatro, ViaMobilidade (Linhas 5, 8 e 9) e VLT Carioca.":
    "Total daily boardings by train or metro station on systems operated by Motiva. Includes Metrô Bahia, ViaQuatro, ViaMobilidade (Lines 5, 8, and 9), and VLT Carioca.",
  "Médias mensais de embarques diários [2012-2026]":
    "Monthly averages of daily boardings [2012-2026]",
  "Média de embarques diários por mês e tipo do dia (dia útil, sábado e domingo) dos sistemas operados pela Motiva. Dados incluem Metrô Bahia, ViaQuatro, ViaMobilidade (Linhas 5, 8 e 9) e VLT Carioca.":
    "Average daily boardings by month and day type (weekday, Saturday, and Sunday) on systems operated by Motiva. Includes Metrô Bahia, ViaQuatro, ViaMobilidade (Lines 5, 8, and 9), and VLT Carioca.",
  "Embarques mensais por modo de integração [2019-2026]":
    "Monthly boardings by integration mode [2019-2026]",
  "Embarques mensais por modo de integração do Metrô Bahia.":
    "Monthly boardings by integration mode on Metrô Bahia.",
  "Linhas e estações metroferroviárias (Motiva) [2026]":
    "Metro and rail lines and stations (Motiva) [2026]",
  "Tabela de linhas e estações de trem/metrô dos sistemas operados pela Motiva. Dados incluem Metrô Bahia, ViaQuatro, ViaMobilidade (Linhas 5, 8 e 9) e VLT Carioca.":
    "Table of train and metro lines and stations on systems operated by Motiva. Includes Metrô Bahia, ViaQuatro, ViaMobilidade (Lines 5, 8, and 9), and VLT Carioca.",
  "Ganhos e horas trabalhadas dos entregadores parceiros do iFood [2022-2026]":
    "Earnings and hours of iFood partner couriers [2022-2026]",
  "Informações sobre horas trabalhadas e ganhos dos entregadores parceiros do iFood.\nConjunto de dados disponibilizado a partir da parceria do Centro de Dados e IA (CDIA) do Insper com o iFood.":
    "Hours worked and earnings of iFood partner couriers.\nDataset shared through the partnership between Insper's Center for Data and AI (CDIA) and iFood.",
  "Contratos e anúncios imobiliários Loft [2019-2026]":
    "Loft listings and contracts [2019-2026]",
  "Dados detalhados sobre anúncios e contratos imobiliários, incluindo características dos imóveis e dos condomínios, nas cidades com atuação da Loft.":
    "Detailed listings and contracts, including property and building characteristics, in the cities where Loft operates.",
  "Medições de ilhas de calor e qualidade do ar na Maré, Rio de Janeiro [2023]":
    "Heat-island and air-quality measurements in Maré, Rio de Janeiro [2023]",
  "Estatísticas descritivas de coletas de temperatura, umidade e qualidade do ar feitas nas 16 favelas da Maré, de março a setembro de 2023.\nConjunto de dados preparado para o estudo Respira Maré, da Redes da Maré.":
    "Descriptive statistics from temperature, humidity, and air-quality collection in the 16 favelas of Maré, from March to September 2023.\nDataset prepared for the Respira Maré study by Redes da Maré.",
  "Estatísticas sobre ilhas de calor e qualidade do ar na Maré. Informações incluem: temperatura, umidade, dióxido de carbono, formaldeído (HCHO) e material particulado. Temperatura e umidade foram coletadas em diferentes turnos e dias da semana; a qualidade do ar, na última semana de cada mês (de segunda a sexta). Coletas feitas de março a setembro de 2023.":
    "Statistics on heat islands and air quality in Maré, including temperature, humidity, carbon dioxide, formaldehyde (HCHO), and particulate matter. Temperature and humidity were collected across shifts and days of the week; air quality, in the last week of each month (Monday to Friday). Collection ran from March to September 2023.",
  "Indicadores de mortalidade por distrito [2010-2019]":
    "Mortality indicators by district [2010-2019]",
  'Indicadores de mortalidade (óbitos observados, esperados e risco relativo) por distrito administrativo de São Paulo, de 2010 a 2019. Considera quatro causas: diabetes, doenças cerebrovasculares, doenças isquêmicas do coração e mortalidade materna.\nConjunto de dados preparado para o relatório "Síntese de evidências sobre saúde no município de São Paulo" (2024).':
    'Mortality indicators (observed deaths, expected deaths, and relative risk) by administrative district in São Paulo, from 2010 to 2019. Covers four causes: diabetes, cerebrovascular disease, ischemic heart disease, and maternal mortality.\nDataset prepared for the report "Evidence synthesis on health in the city of São Paulo" (2024).',
  "Indicadores de mortalidade (óbitos observados, esperados e risco relativo) por distrito administrativo de São Paulo, de 2010 a 2019. Considera quatro causas: diabetes, doenças cerebrovasculares, doenças isquêmicas do coração e mortalidade materna.":
    "Mortality indicators (observed deaths, expected deaths, and relative risk) by administrative district in São Paulo, from 2010 to 2019. Covers four causes: diabetes, cerebrovascular disease, ischemic heart disease, and maternal mortality.",
  "Pesquisa Nacional de Mobilidade Urbana (PEMOB) [2019-2024]":
    "National Urban Mobility Survey (PEMOB) [2019-2024]",
  "Questionário de mobilidade urbana municipal e intermunicipal preenchido por gestores de transporte público em cidades brasileiras com mais de 100 mil habitantes. Inclui dados sobre infraestrutura, frota, demanda, tarifas e políticas de mobilidade.":
    "Municipal and intercity mobility questionnaire filled in by public-transit managers in Brazilian cities with more than 100,000 inhabitants. Includes infrastructure, fleet, demand, fares, and mobility policy.",
  "Base anual e harmonizada (formato de painel) da PEMOB de 2019 a 2024.":
    "Annual, harmonized panel of PEMOB from 2019 to 2024.",
  "Programas educacionais do iFood [2022-2026]":
    "iFood education programs [2022-2026]",
  "Informações sobre a participação dos entregadores parceiros do iFood nos programas Decola e Meu Diploma do Ensino Médio (MDEM).\nConjunto de dados disponibilizado a partir da parceria do Centro de Dados e IA (CDIA) do Insper com o iFood.":
    "Participation of iFood partner couriers in the Decola and Meu Diploma do Ensino Médio (MDEM) programs.\nDataset shared through the partnership between Insper's Center for Data and AI (CDIA) and iFood.",
  "Contratos e anúncios imobiliários QuintoAndar [2011-2025]":
    "QuintoAndar listings and contracts [2011-2025]",
  "Dados detalhados sobre anúncios e contratos imobiliários, incluindo características dos imóveis e dos condomínios, nas cidades com atuação do QuintoAndar.":
    "Detailed listings and contracts, including property and building characteristics, in the cities where QuintoAndar operates.",
  "Rotas dos entregadores parceiros do iFood [2022-2026]":
    "Routes of iFood partner couriers [2022-2026]",
  "Registros de velocidade e fluxo das rotas de entregas feitas pelos entregadores parceiros do iFood nas vias principais.\nConjunto de dados disponibilizado a partir da parceria do Centro de Dados e IA (CDIA) do Insper com o iFood.":
    "Speed and flow along delivery routes taken by iFood partner couriers on major streets.\nDataset shared through the partnership between Insper's Center for Data and AI (CDIA) and iFood.",
  "Sinistros de trânsito [2022-2025]": "Traffic crashes [2022-2025]",
  "Sinistros de trânsito no município de São Paulo, de 2022 a 2025. Dados agregados e compatibilizados do Infosiga. Sinistros individuais foram agregados em trechos de vias usando pareamento aproximado (fuzzy matching) e análise de distância do sinistro até o trecho mais próximo.":
    "Traffic crashes in the city of São Paulo, from 2022 to 2025. Aggregated and harmonized Infosiga records. Individual crashes were assigned to street segments with fuzzy matching and distance to the nearest segment.",
  "Sinistros de trânsito no município de São Paulo, de 2022 a 2025, extraídos do Infosiga.":
    "Traffic crashes in the city of São Paulo, from 2022 to 2025, extracted from Infosiga.",
  "Sinistros de trânsito agregados por via [2022-2025]":
    "Traffic crashes aggregated by street [2022-2025]",
  "Localização de trechos com sinistros de trânsito entre 2022 e 2025. Sinistros individuais foram agregados em trechos de vias.":
    "Location of segments with traffic crashes between 2022 and 2025. Individual crashes were aggregated onto street segments.",
  "Trechos com faixas dedicadas a motociclistas (Faixa Azul) [2022-2025]":
    "Segments with motorcycle lanes (Faixa Azul) [2022-2025]",
  "Localização dos trechos com faixas de trânsito dedicadas a motociclistas (Faixa Azul) implementadas em São Paulo no período de 2022 a 2025.":
    "Location of motorcycle-only lanes (Faixa Azul) implemented in São Paulo from 2022 to 2025.",
  "Índice GeoSES [2010]": "GeoSES index [2010]",
  "Índice socioeconômico espacial GeoSES calculado por área de ponderação no município de São Paulo. O índice pondera dimensões de educação, mobilidade, pobreza, privação material, riqueza, renda e segregação, usando dados da Amostra do Censo Demográfico de 2010.":
    "GeoSES spatial socioeconomic index calculated by weighting area in the city of São Paulo. It combines education, mobility, poverty, material deprivation, wealth, income, and segregation, using the 2010 Census sample.",
};

function phrase(locale: Locale, value: string): string {
  if (locale === "pt") return value;
  return phrases[value] ?? value;
}

function localizeItem(item: DataCatalogItem, locale: Locale): DataCatalogItem {
  if (locale === "pt") return item;
  return {
    ...item,
    title: phrase(locale, item.title),
    description: phrase(locale, item.description),
    theme: phrase(locale, item.theme),
    region: phrase(locale, item.region),
    accessMethod: phrase(locale, item.accessMethod),
    keywords: item.keywords.map((keyword) => phrase(locale, keyword)),
    tags: item.tags.map((tag) => phrase(locale, tag)),
    sources: item.sources.map((source) => phrase(locale, source)),
    dataset_info: item.dataset_info.map((dataset) => ({
      ...dataset,
      dataset_title: phrase(locale, dataset.dataset_title),
      dataset_description: phrase(locale, dataset.dataset_description),
      source: phrase(locale, dataset.source),
    })),
  };
}

export function localizeCatalog(locale: Locale): DataCatalogItem[] {
  return catalogData.map((item) => localizeItem(item, locale));
}

export function localizeFilterOptions(locale: Locale) {
  return {
    themes: filterOptions.themes.map((theme) => phrase(locale, theme)),
    regions: filterOptions.regions.map((region) => phrase(locale, region)),
    accessMethods: filterOptions.accessMethods.map((method) =>
      phrase(locale, method),
    ),
  };
}

export function isDownloadAccess(value: string) {
  return (
    value === "Disponível para download" || value === "Available for download"
  );
}

export function isSecureRoomAccess(value: string) {
  return value === "Sala segura do Insper" || value === "Insper secure room";
}
