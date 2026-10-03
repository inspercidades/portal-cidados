export interface LayerMapView {
  center: [number, number]; // [lng, lat]
  zoom: number;
  zoomMobile?: number; // optional override for mobile; defaults to zoom - 0.8
  centerMobile?: [number, number]; // optional center override for mobile
  bearing: number;
  pitch: number;
}

export function resolveLayerMapView(
  mapView: LayerMapView,
  isMobile: boolean,
): {
  center: [number, number];
  zoom: number;
  bearing: number;
  pitch: number;
} {
  return {
    center:
      isMobile && mapView.centerMobile ? mapView.centerMobile : mapView.center,
    zoom: isMobile ? (mapView.zoomMobile ?? mapView.zoom - 0.8) : mapView.zoom,
    bearing: mapView.bearing,
    pitch: mapView.pitch,
  };
}

const saoPauloMapView: LayerMapView = {
  center: [-46.73413, -23.67986],
  zoom: 9.6236,
  centerMobile: [-46.60054, -23.67075],
  zoomMobile: 9.093,
  bearing: 0,
  pitch: 0,
};

/** Layers concentrados na região norte de SP — enquadramento mais próximo */
const saoPauloNorthMapView: LayerMapView = {
  center: [-46.69956, -23.62904],
  zoom: 10.0221,
  centerMobile: [-46.59624, -23.59489],
  zoomMobile: 9.0572,
  bearing: 0,
  pitch: 0,
};

export interface CityLayer {
  id: string;
  name: string;
  description?: string;
  tilesetId?: string;
  sourceLayer?: string;
  layerType?: "fill" | "line" | "circle" | "symbol";
  hasCustomStyle?: boolean; // Indicates if this layer has a custom style defined in layer-styles.ts
  mapView?: LayerMapView; // optional flyTo config when layer is selected
  catalogItemId?: string; // ID of the corresponding catalog data item, if any
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
      catalogItemId: "8",
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
      catalogItemId: "8",
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
      catalogItemId: "8",
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
      catalogItemId: "8",
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
      catalogItemId: "15",
      mapView: saoPauloNorthMapView,
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
      catalogItemId: "14",
      mapView: saoPauloMapView,
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
      catalogItemId: "14",
      mapView: saoPauloNorthMapView,
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
      catalogItemId: "2",
      mapView: saoPauloMapView,
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
      catalogItemId: "2",
      mapView: saoPauloMapView,
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
      catalogItemId: "2",
      mapView: saoPauloMapView,
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
      catalogItemId: "2",
      mapView: saoPauloMapView,
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
      catalogItemId: "2",
      mapView: saoPauloMapView,
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
      catalogItemId: "2",
      mapView: saoPauloMapView,
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
      catalogItemId: "2",
      mapView: saoPauloNorthMapView,
    },
    {
      id: "populacao-por-distrito-spo",
      name: "População Feminina (distrito)",
      description: "População por distrito. Fonte: SEADE (2020).",
      tilesetId: "observatorio-nacional.populacao-distrito",
      sourceLayer: "populacao-por-distrito-spo",
      layerType: "fill",
      hasCustomStyle: true,
      catalogItemId: "2",
      mapView: saoPauloMapView,
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
      catalogItemId: "16",
      mapView: saoPauloMapView,
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
      mapView: saoPauloMapView,
    },
    {
      id: "mortalidade_materna_fem",
      name: "Mortalidade Materna (femi.)",
      description:
        "Risco relativo de mortalidade materna, por distrito, 2019. Acima de 1, o distrito tem mais óbitos que o esperado. Fonte: Saldiva et al. (2024).",
      tilesetId: "observatorio-nacional.historia_2_risco",
      sourceLayer: "mortalidade_materna_fem",
      layerType: "fill",
      hasCustomStyle: true,
      catalogItemId: "9",
      mapView: saoPauloMapView,
    },
    {
      id: "isquemicas_coracao_masc",
      name: "Doenças Isquêmicas do Coração (masc.)",
      description:
        "Risco relativo de mortalidade por doenças isquêmicas do coração em homens, por distrito, 2019. Acima de 1, o distrito tem mais óbitos que o esperado. Fonte: Saldiva et al. (2024).",
      tilesetId: "observatorio-nacional.historia_2_risco",
      sourceLayer: "isquemicas_coracao_masc",
      layerType: "fill",
      hasCustomStyle: true,
      catalogItemId: "9",
      mapView: saoPauloMapView,
    },
    {
      id: "isquemicas_coracao_fem",
      name: "Doenças Isquêmicas do Coração (femi.)",
      description:
        "Risco relativo de mortalidade por doenças isquêmicas do coração em mulheres, por distrito, 2019. Acima de 1, o distrito tem mais óbitos que o esperado. Fonte: Saldiva et al. (2024).",
      tilesetId: "observatorio-nacional.historia_2_risco",
      sourceLayer: "isquemicas_coracao_fem",
      layerType: "fill",
      hasCustomStyle: true,
      catalogItemId: "9",
      mapView: saoPauloMapView,
    },
    {
      id: "cerebrovasculares_masc",
      name: "Doenças Cerebrovasculares (masc.)",
      description:
        "Risco relativo de mortalidade por doenças cerebrovasculares em homens, por distrito, 2019. Acima de 1, o distrito tem mais óbitos que o esperado. Fonte: Saldiva et al. (2024).",
      tilesetId: "observatorio-nacional.historia_2_risco",
      sourceLayer: "cerebrovasculares_masc",
      layerType: "fill",
      hasCustomStyle: true,
      catalogItemId: "9",
      mapView: saoPauloMapView,
    },
    {
      id: "cerebrovasculares_fem",
      name: "Doenças Cerebrovasculares (femi.)",
      description:
        "Risco relativo de mortalidade por doenças cerebrovasculares em mulheres, por distrito, 2019. Acima de 1, o distrito tem mais óbitos que o esperado. Fonte: Saldiva et al. (2024).",
      tilesetId: "observatorio-nacional.historia_2_risco",
      sourceLayer: "cerebrovasculares_fem",
      layerType: "fill",
      hasCustomStyle: true,
      catalogItemId: "9",
      mapView: saoPauloMapView,
    },
    {
      id: "diabetes_masc",
      name: "Diabetes Mellitus (masc.)",
      description:
        "Risco relativo de mortalidade por diabetes mellitus em homens, por distrito, 2019. Acima de 1, o distrito tem mais óbitos que o esperado. Fonte: Saldiva et al. (2024).",
      tilesetId: "observatorio-nacional.historia_2_risco",
      sourceLayer: "diabetes_masc",
      layerType: "fill",
      hasCustomStyle: true,
      catalogItemId: "9",
      mapView: saoPauloMapView,
    },
    {
      id: "diabetes_fem",
      name: "Diabetes Mellitus (femi.)",
      description:
        "Risco relativo de mortalidade por diabetes mellitus em mulheres, por distrito, 2019. Acima de 1, o distrito tem mais óbitos que o esperado. Fonte: Saldiva et al. (2024).",
      tilesetId: "observatorio-nacional.historia_2_risco",
      sourceLayer: "diabetes_fem",
      layerType: "fill",
      hasCustomStyle: true,
      catalogItemId: "9",
      mapView: saoPauloMapView,
    },
  ],
};

export function getLayersForCatalogItem(
  catalogId: string,
): { city: string; layerIds: string[] }[] {
  const result: { city: string; layerIds: string[] }[] = [];
  for (const [city, layers] of Object.entries(cityLayersConfig)) {
    const ids = layers
      .filter((l) => l.catalogItemId === catalogId)
      .map((l) => l.id);
    if (ids.length) result.push({ city, layerIds: ids });
  }
  return result;
}
