export interface LayerMapView {
  center: [number, number]; // [lng, lat]
  zoom: number;
  zoomMobile?: number; // optional override for mobile; defaults to zoom - 0.8
  bearing: number;
  pitch: number;
}

export interface CityLayer {
  id: string;
  name: string;
  description?: string;
  tilesetId?: string;
  sourceLayer?: string;
  layerType?: "fill" | "line" | "circle" | "symbol";
  hasCustomStyle?: boolean; // Indicates if this layer has a custom style defined in layer-styles.ts
  mapView?: LayerMapView; // optional flyTo config when layer is selected
}

export interface CityLayersConfig {
  [cityName: string]: CityLayer[];
}

export const cityLayersConfig: CityLayersConfig = {
  Brasil: [
    {
      id: "tarifa_zero",
      name: "Tarifa Zero",
      description:
        "Municípios com tarifa zero integral, parcial por dias específicos (domingos/feriados) ou parcial por área geográfica (linhas específicas). Dados atualizados até outubro de 2025. Total de 134 municípios com tarifa zero integral e 8 com tarifa zero parcial.",
      tilesetId: "observatorio-nacional.0bzbtkfg",
      sourceLayer: "insper_tarifa_zero_municipios-dwws9i",
      layerType: "circle",
      hasCustomStyle: true,
    },
  ],
  "Rio de Janeiro": [
    {
      id: "ic_areas-3ii8xj",
      name: "Ilhas de Calor",
      description:
        "Medidas de temperatura registradas em diferentes dias da semana no período de março a setembro de 2023.",
      tilesetId: "observatorio-nacional.cxco0uhi",
      sourceLayer: "ic_areas-3ii8xj",
      layerType: "fill",
      hasCustomStyle: true,
      mapView: {
        center: [-43.269054, -22.84302],
        zoom: 12.29,
        bearing: 17.6,
        pitch: 34.5,
      },
    },
    {
      id: "ic_pontos-90vwh4",
      name: "Ilhas de Calor (pontos de captura)",
      description:
        "Localização dos pontos de captura de temperatura em diferentes dias da semana no período de março a setembro de 2023.",
      tilesetId: "observatorio-nacional.860kttlo",
      sourceLayer: "ic_pontos-90vwh4",
      layerType: "circle",
      hasCustomStyle: true,
      mapView: {
        center: [-43.259054, -22.86302],
        zoom: 12.36,
        bearing: -73.6,
        pitch: 40.0,
      },
    },
    {
      id: "quali_area-1ci0wo",
      name: "Qualidade do Ar",
      description:
        "Medidas de qualidade do ar registradas na última semana de cada mês no período de março a setembro de 2023.",
      tilesetId: "observatorio-nacional.1dkglesm",
      sourceLayer: "quali_area-1ci0wo",
      layerType: "fill",
      hasCustomStyle: true,
      mapView: {
        center: [-43.269054, -22.84302],
        zoom: 12.29,
        bearing: 17.6,
        pitch: 34.5,
      },
    },
    {
      id: "quali_pontos-b424eh",
      name: "Qualidade do Ar (pontos de captura)",
      description:
        "Localização dos pontos de captura de qualidade do ar na última semana de cada mês no período de março a setembro de 2023.",
      tilesetId: "observatorio-nacional.18m3jaqa",
      sourceLayer: "quali_pontos-b424eh",
      layerType: "circle",
      hasCustomStyle: true,
      mapView: {
        center: [-43.259054, -22.86302],
        zoom: 12.36,
        bearing: -73.6,
        pitch: 40.0,
      },
    },
  ],
  "São Paulo": [
    {
      id: "faixa-azul-trechos-spo",
      name: "Faixa Azul",
      description:
        "Localização das Faixas Azuis (faixas exclusivas para motociclistas) implementadas em São Paulo de 2022 a 2025. Fonte: Theil (2025).",
      tilesetId: "observatorio-nacional.faixa-azul",
      sourceLayer: "faixa-azul-trechos-spo",
      layerType: "line",
      hasCustomStyle: true,
    },
    {
      id: "sinistros-por-distrito-spo",
      name: "Sinistros por Distrito",
      description:
        "Sinistros de trânsito registrados de 2022 a 2025, agregados por distrito. Fonte: InfoSiga/DETRAN-SP.",
      tilesetId: "observatorio-nacional.sinistros-distritos",
      sourceLayer: "sinistros-por-distrito-spo",
      layerType: "fill",
      hasCustomStyle: true,
    },
    {
      id: "sinistros-por-trecho-spo",
      name: "Sinistros em Trechos de Vias",
      description:
        "Sinistros de trânsito registrados de 2022 a 2025, agregados por trechos de vias. Fonte: Theil (2025).",
      tilesetId: "observatorio-nacional.sinistros-trechos",
      sourceLayer: "sinistros-por-trecho-spo",
      layerType: "line",
      hasCustomStyle: true,
    },
    {
      id: "densidade-hab-setor",
      name: "Densidade Hab. (setor censitário)",
      description:
        "Densidade populacional (habitantes por hectare), agregada por setor censitário. Fonte: Censo 2022.",
      tilesetId: "observatorio-nacional.densidade-hab-setor",
      sourceLayer: "densidade_hab_setor",
      layerType: "fill",
      hasCustomStyle: true,
    },
    {
      id: "densidade-hab-distrito-spo",
      name: "Densidade Hab. (distrito)",
      description:
        "Densidade populacional (habitantes por hectare), agregada por distrito. Fonte: Censo 2022.",
      tilesetId: "observatorio-nacional.densidade-hab-distrito",
      sourceLayer: "densidade-hab-distrito-spo",
      layerType: "fill",
      hasCustomStyle: true,
    },
    {
      id: "densidade-pop-setor-spo",
      name: "Densidade Pop.(setor censitário)",
      description:
        "Densidade habitacional (domicílios por hectare), agregada por setor censitário. Fonte: Censo 2022.",
      tilesetId: "observatorio-nacional.densidade-populacional-setor",
      sourceLayer: "densidade_pop_setor_spo",
      layerType: "fill",
      hasCustomStyle: true,
    },
    {
      id: "densidade-pop-distrito-spo",
      name: "Densidade Pop. (distrito)",
      description:
        "Densidade habitacional (domicílios por hectare), agregada por distrito. Fonte: Censo 2022.",
      tilesetId: "observatorio-nacional.densidade-pop-distrito",
      sourceLayer: "densidade-pop-distrito-spo",
      layerType: "fill",
      hasCustomStyle: true,
    },
    {
      id: "verticalizacao-setor",
      name: "Verticalização (setor censitário)",
      description:
        "Índice de Verticalização por setor censitário. Estimado a partir da razão entre a área construída e a área ocupada em construções verticais. Fonte: Theil (2024), IPTU (2024).",
      tilesetId: "observatorio-nacional.verticalizacao-setor",
      sourceLayer: "verticalizacao_setor",
      layerType: "fill",
      hasCustomStyle: true,
    },
    {
      id: "verticalizacao-distrito-spo",
      name: "Verticalização (distrito)",
      description:
        "Índice de Verticalização por distrito. Estimado a partir da razão entre a área construída e a área ocupada em construções verticais. Fonte: Theil (2024), IPTU (2024).",
      tilesetId: "observatorio-nacional.verticalizacao-distrito",
      sourceLayer: "verticalizacao-distrito-spo",
      layerType: "fill",
      hasCustomStyle: true,
    },
    {
      id: "raster-dbiubd",
      name: "Verticalização (grid)",
      description:
        "Índice de Verticalização agregado em grid regular. Estimado a partir da razão entre a área construída e a área ocupada em construções verticais. Fonte: Theil (2024).",
      tilesetId: "observatorio-nacional.78kitbd4",
      sourceLayer: "raster-dbiubd",
      layerType: "fill",
      hasCustomStyle: true,
    },
    {
      id: "populacao-por-distrito-spo",
      name: "População Feminina (distrito)",
      description: "População por distrito. Fonte: SEADE (2020).",
      tilesetId: "observatorio-nacional.populacao-distrito",
      sourceLayer: "populacao-por-distrito-spo",
      layerType: "fill",
      hasCustomStyle: true,
    },
    {
      id: "geoses-spo",
      name: "GeoSES",
      description:
        "Índice socioeconômico GeoSES. Pondera dados censitários de renda, educação, qualidade de vida e similares. Fonte: Barrozo, L. V. et al. (2020).",
      tilesetId: "observatorio-nacional.geoses",
      sourceLayer: "geoses-spo",
      layerType: "fill",
      hasCustomStyle: true,
    },
    {
      id: "gastos_ubs_distritos-c6rpx4",
      name: "Gastos UBS (distrito)",
      description:
        "Gastos com Unidades Básicas de Saúde (UBS) por distrito. Fonte: Tribunal de Contas SP (2020).",
      tilesetId: "observatorio-nacional.dg1lr46q",
      sourceLayer: "gastos_ubs_distritos-c6rpx4",
      layerType: "fill",
      hasCustomStyle: true,
    },
    {
      id: "obitos-47q8aj",
      name: "Óbitos por Doenças Cerebrovasculares (femi.)",
      description:
        "Óbitos por doenças cerebrovasculares (femininos). Fonte: DATASUS (2020).",
      tilesetId: "observatorio-nacional.8ka3k10y",
      sourceLayer: "obitos-47q8aj",
      layerType: "fill",
      hasCustomStyle: true,
    },
  ],
};
