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

export interface CityLayer {
  id: string;
  name: string;
  summary?: string; // short text for the layer panel tooltip
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
  "Rio de Janeiro": [
    {
      id: "ic_areas-3ii8xj",
      name: "Ilhas de calor",
      summary:
        "Temperatura média em áreas da Maré, de março a setembro de 2023.",
      description:
        "Temperatura média (°C), por área de coleta, de março a setembro de 2023. Fonte: Dias, C. et al. (2026).",
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
      name: "Ilhas de calor (pontos de medição)",
      summary:
        "Temperatura máxima em cada ponto de medição da Maré, de março a setembro de 2023.",
      description:
        "Temperatura máxima (°C), por ponto de medição, de março a setembro de 2023. Fonte: Dias, C. et al. (2026).",
      tilesetId: "observatorio-nacional.860kttlo",
      sourceLayer: "ic_pontos-90vwh4",
      layerType: "circle",
      hasCustomStyle: true,
      catalogItemId: "8",
      mapView: {
        center: [-43.259054, -22.86302],
        zoom: 12.36,
        bearing: -73.6,
        pitch: 40,
      },
    },
    {
      id: "quali_area-1ci0wo",
      name: "Qualidade do ar",
      summary:
        "Poluição por material particulado em áreas da Maré, de março a setembro de 2023.",
      description:
        "Material particulado PM10, média por área de coleta, medida na última semana de cada mês, de março a setembro de 2023. Fonte: Dias, C. et al. (2026).",
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
      name: "Qualidade do ar (pontos de medição)",
      summary:
        "Poluição por material particulado em cada ponto de medição da Maré, de março a setembro de 2023.",
      description:
        "Material particulado PM10, média por ponto de medição, medida na última semana de cada mês, de março a setembro de 2023. Fonte: Dias, C. et al. (2026).",
      tilesetId: "observatorio-nacional.18m3jaqa",
      sourceLayer: "quali_pontos-b424eh",
      layerType: "circle",
      hasCustomStyle: true,
      catalogItemId: "8",
      mapView: {
        center: [-43.259054, -22.86302],
        zoom: 12.36,
        bearing: -73.6,
        pitch: 40,
      },
    },
  ],
  "São Paulo": [
    {
      id: "faixa-azul-trechos-spo",
      name: "Faixa Azul",
      summary:
        "Vias com faixas dedicadas a motociclistas, implantadas de 2022 a 2025.",
      description:
        "Trechos com Faixa Azul, faixas dedicadas a motociclistas, implantados de 2022 a 2025. Fonte: Costa, A.; Theil, G.; Mugnol, J. (2025).",
      tilesetId: "observatorio-nacional.faixa-azul",
      sourceLayer: "faixa-azul-trechos-spo",
      layerType: "line",
      hasCustomStyle: true,
      catalogItemId: "15",
      mapView: {
        center: [-46.69956, -23.62904],
        zoom: 10.0221,
        centerMobile: [-46.59624, -23.59489],
        zoomMobile: 9.0572,
        bearing: 0,
        pitch: 0,
      },
    },
    {
      id: "sinistros-por-distrito-spo",
      name: "Sinistros por distrito",
      summary:
        "Sinistros de trânsito em cada distrito, de janeiro de 2022 a maio de 2025.",
      description:
        "Número de sinistros de trânsito registrados, por distrito, de janeiro de 2022 a maio de 2025. Fonte: Costa, A.; Theil, G.; Mugnol, J. (2025).",
      tilesetId: "observatorio-nacional.sinistros-distritos",
      sourceLayer: "sinistros-por-distrito-spo",
      layerType: "fill",
      hasCustomStyle: true,
      catalogItemId: "14",
      mapView: {
        center: [-46.73413, -23.67986],
        zoom: 9.6236,
        centerMobile: [-46.60054, -23.67075],
        zoomMobile: 9.093,
        bearing: 0,
        pitch: 0,
      },
    },
    {
      id: "sinistros-por-trecho-spo",
      name: "Sinistros por trecho de via",
      summary:
        "Sinistros de trânsito em cada trecho de via, de janeiro de 2022 a maio de 2025.",
      description:
        "Número de sinistros de trânsito registrados, por trecho de via, de janeiro de 2022 a maio de 2025. Fonte: Costa, A.; Theil, G.; Mugnol, J. (2025).",
      tilesetId: "observatorio-nacional.sinistros-trechos",
      sourceLayer: "sinistros-por-trecho-spo",
      layerType: "line",
      hasCustomStyle: true,
      catalogItemId: "14",
      mapView: {
        center: [-46.69956, -23.62904],
        zoom: 10.0221,
        centerMobile: [-46.59624, -23.59489],
        zoomMobile: 9.0572,
        bearing: 0,
        pitch: 0,
      },
    },
    {
      id: "densidade-hab-setor",
      name: "Densidade habitacional (setor censitário)",
      summary:
        "Domicílios por hectare em cada setor censitário, no Censo 2022.",
      description:
        "Domicílios por hectare, por setor censitário, no Censo 2022. Fonte: Theil, G. (2025).",
      tilesetId: "observatorio-nacional.densidade-hab-setor",
      sourceLayer: "densidade_hab_setor",
      layerType: "fill",
      hasCustomStyle: true,
      catalogItemId: "2",
      mapView: {
        center: [-46.73413, -23.67986],
        zoom: 9.6236,
        centerMobile: [-46.60054, -23.67075],
        zoomMobile: 9.093,
        bearing: 0,
        pitch: 0,
      },
    },
    {
      id: "densidade-hab-distrito-spo",
      name: "Densidade habitacional (distrito)",
      summary: "Domicílios por hectare em cada distrito, no Censo 2022.",
      description:
        "Domicílios por hectare, por distrito, no Censo 2022. Fonte: Theil, G. (2025).",
      tilesetId: "observatorio-nacional.densidade-hab-distrito",
      sourceLayer: "densidade-hab-distrito-spo",
      layerType: "fill",
      hasCustomStyle: true,
      catalogItemId: "2",
      mapView: {
        center: [-46.73413, -23.67986],
        zoom: 9.6236,
        centerMobile: [-46.60054, -23.67075],
        zoomMobile: 9.093,
        bearing: 0,
        pitch: 0,
      },
    },
    {
      id: "densidade-pop-setor-spo",
      name: "Densidade populacional (setor censitário)",
      summary:
        "Habitantes por hectare em cada setor censitário, no Censo 2022.",
      description:
        "Habitantes por hectare, por setor censitário, no Censo 2022. Fonte: Theil, G. (2025).",
      tilesetId: "observatorio-nacional.densidade-populacional-setor",
      sourceLayer: "densidade_pop_setor_spo",
      layerType: "fill",
      hasCustomStyle: true,
      catalogItemId: "2",
      mapView: {
        center: [-46.73413, -23.67986],
        zoom: 9.6236,
        centerMobile: [-46.60054, -23.67075],
        zoomMobile: 9.093,
        bearing: 0,
        pitch: 0,
      },
    },
    {
      id: "densidade-pop-distrito-spo",
      name: "Densidade populacional (distrito)",
      summary: "Habitantes por hectare em cada distrito, no Censo 2022.",
      description:
        "Habitantes por hectare, por distrito, no Censo 2022. Fonte: Theil, G. (2025).",
      tilesetId: "observatorio-nacional.densidade-pop-distrito",
      sourceLayer: "densidade-pop-distrito-spo",
      layerType: "fill",
      hasCustomStyle: true,
      catalogItemId: "2",
      mapView: {
        center: [-46.73413, -23.67986],
        zoom: 9.6236,
        centerMobile: [-46.60054, -23.67075],
        zoomMobile: 9.093,
        bearing: 0,
        pitch: 0,
      },
    },
    {
      id: "verticalizacao-setor",
      name: "Verticalização (setor censitário)",
      summary:
        "Número médio de pavimentos das construções em cada setor censitário, em 2024.",
      description:
        "Índice de verticalização, por setor censitário, em 2024: área construída dividida pela área ocupada pelas construções no terreno, segundo o IPTU. Equivale ao número médio de pavimentos. Fonte: Theil, G. (2025).",
      tilesetId: "observatorio-nacional.verticalizacao-setor",
      sourceLayer: "verticalizacao_setor",
      layerType: "fill",
      hasCustomStyle: true,
      catalogItemId: "2",
      mapView: {
        center: [-46.73413, -23.67986],
        zoom: 9.6236,
        centerMobile: [-46.60054, -23.67075],
        zoomMobile: 9.093,
        bearing: 0,
        pitch: 0,
      },
    },
    {
      id: "verticalizacao-distrito-spo",
      name: "Verticalização (distrito)",
      summary:
        "Número médio de pavimentos das construções em cada distrito, em 2024.",
      description:
        "Índice de verticalização, por distrito, em 2024: área construída dividida pela área ocupada pelas construções no terreno, segundo o IPTU. Equivale ao número médio de pavimentos. Fonte: Theil, G. (2025).",
      tilesetId: "observatorio-nacional.verticalizacao-distrito",
      sourceLayer: "verticalizacao-distrito-spo",
      layerType: "fill",
      hasCustomStyle: true,
      catalogItemId: "2",
      mapView: {
        center: [-46.73413, -23.67986],
        zoom: 9.6236,
        centerMobile: [-46.60054, -23.67075],
        zoomMobile: 9.093,
        bearing: 0,
        pitch: 0,
      },
    },
    {
      id: "raster-dbiubd",
      name: "Verticalização (grade)",
      summary:
        "Número médio de pavimentos das construções em cada quadrado de 800 m, em 2024.",
      description:
        "Índice de verticalização, em quadrados de 800 m, em 2024: área construída dividida pela área ocupada pelas construções no terreno, segundo o IPTU. Equivale ao número médio de pavimentos. Fonte: Theil, G. (2025).",
      tilesetId: "observatorio-nacional.78kitbd4",
      sourceLayer: "raster-dbiubd",
      layerType: "fill",
      hasCustomStyle: true,
      catalogItemId: "2",
      mapView: {
        center: [-46.69956, -23.62904],
        zoom: 10.0221,
        centerMobile: [-46.59624, -23.59489],
        zoomMobile: 9.0572,
        bearing: 0,
        pitch: 0,
      },
    },
    {
      id: "populacao-por-distrito-spo",
      name: "População feminina de 35 a 39 anos (distrito)",
      summary: "Mulheres de 35 a 39 anos em cada distrito, em 2020.",
      description:
        "Habitantes do sexo feminino de 35 a 39 anos, por distrito, em 2020. Fonte: SEADE (2020).",
      tilesetId: "observatorio-nacional.populacao-distrito",
      sourceLayer: "populacao-por-distrito-spo",
      layerType: "fill",
      hasCustomStyle: true,
      catalogItemId: "2",
      mapView: {
        center: [-46.73413, -23.67986],
        zoom: 9.6236,
        centerMobile: [-46.60054, -23.67075],
        zoomMobile: 9.093,
        bearing: 0,
        pitch: 0,
      },
    },
    {
      id: "geoses-spo",
      name: "GeoSES",
      summary:
        "Índice socioeconômico, com dados do Censo 2010: quanto maior, melhor o contexto da área.",
      description:
        "Índice socioeconômico GeoSES, por área de ponderação do Censo 2010. Combina educação, mobilidade, pobreza, privação material, riqueza, renda e segregação. Varia de -1 a 1: quanto maior, melhor o contexto em relação às demais áreas de ponderação do município. Fonte: Barrozo, L. V. et al. (2025).",
      tilesetId: "observatorio-nacional.geoses",
      sourceLayer: "geoses-spo",
      layerType: "fill",
      hasCustomStyle: true,
      catalogItemId: "16",
      mapView: {
        center: [-46.73413, -23.67986],
        zoom: 9.6236,
        centerMobile: [-46.60054, -23.67075],
        zoomMobile: 9.093,
        bearing: 0,
        pitch: 0,
      },
    },
    {
      id: "mortalidade_materna_fem",
      name: "Mortalidade materna (fem.)",
      summary: "Risco de morte materna em cada distrito, em 2019.",
      description:
        "Risco relativo de mortalidade materna, por distrito, em 2019. Acima de 1, o distrito tem mais óbitos que o esperado. Fonte: Saldiva, P. H. N. et al. (2026).",
      tilesetId: "observatorio-nacional.mapas_saude",
      sourceLayer: "mortalidade_materna_fem",
      layerType: "fill",
      hasCustomStyle: true,
      catalogItemId: "9",
      mapView: {
        center: [-46.73413, -23.67986],
        zoom: 9.6236,
        centerMobile: [-46.60054, -23.67075],
        zoomMobile: 9.093,
        bearing: 0,
        pitch: 0,
      },
    },
    {
      id: "isquemicas_coracao_masc",
      name: "Doenças isquêmicas do coração (masc.)",
      summary:
        "Risco de morte por doenças do coração entre homens em cada distrito, em 2019.",
      description:
        "Risco relativo de mortalidade por doenças isquêmicas do coração em homens, por distrito, em 2019. Acima de 1, o distrito tem mais óbitos que o esperado. Fonte: Saldiva, P. H. N. et al. (2026).",
      tilesetId: "observatorio-nacional.mapas_saude",
      sourceLayer: "isquemicas_coracao_masc",
      layerType: "fill",
      hasCustomStyle: true,
      catalogItemId: "9",
      mapView: {
        center: [-46.73413, -23.67986],
        zoom: 9.6236,
        centerMobile: [-46.60054, -23.67075],
        zoomMobile: 9.093,
        bearing: 0,
        pitch: 0,
      },
    },
    {
      id: "isquemicas_coracao_fem",
      name: "Doenças isquêmicas do coração (fem.)",
      summary:
        "Risco de morte por doenças do coração entre mulheres em cada distrito, em 2019.",
      description:
        "Risco relativo de mortalidade por doenças isquêmicas do coração em mulheres, por distrito, em 2019. Acima de 1, o distrito tem mais óbitos que o esperado. Fonte: Saldiva, P. H. N. et al. (2026).",
      tilesetId: "observatorio-nacional.mapas_saude",
      sourceLayer: "isquemicas_coracao_fem",
      layerType: "fill",
      hasCustomStyle: true,
      catalogItemId: "9",
      mapView: {
        center: [-46.73413, -23.67986],
        zoom: 9.6236,
        centerMobile: [-46.60054, -23.67075],
        zoomMobile: 9.093,
        bearing: 0,
        pitch: 0,
      },
    },
    {
      id: "cerebrovasculares_masc",
      name: "Doenças cerebrovasculares (masc.)",
      summary:
        "Risco de morte por AVC e outras doenças cerebrovasculares entre homens em cada distrito, em 2019.",
      description:
        "Risco relativo de mortalidade por doenças cerebrovasculares em homens, por distrito, em 2019. Acima de 1, o distrito tem mais óbitos que o esperado. Fonte: Saldiva, P. H. N. et al. (2026).",
      tilesetId: "observatorio-nacional.mapas_saude",
      sourceLayer: "cerebrovasculares_masc",
      layerType: "fill",
      hasCustomStyle: true,
      catalogItemId: "9",
      mapView: {
        center: [-46.73413, -23.67986],
        zoom: 9.6236,
        centerMobile: [-46.60054, -23.67075],
        zoomMobile: 9.093,
        bearing: 0,
        pitch: 0,
      },
    },
    {
      id: "cerebrovasculares_fem",
      name: "Doenças cerebrovasculares (fem.)",
      summary:
        "Risco de morte por AVC e outras doenças cerebrovasculares entre mulheres em cada distrito, em 2019.",
      description:
        "Risco relativo de mortalidade por doenças cerebrovasculares em mulheres, por distrito, em 2019. Acima de 1, o distrito tem mais óbitos que o esperado. Fonte: Saldiva, P. H. N. et al. (2026).",
      tilesetId: "observatorio-nacional.mapas_saude",
      sourceLayer: "cerebrovasculares_fem",
      layerType: "fill",
      hasCustomStyle: true,
      catalogItemId: "9",
      mapView: {
        center: [-46.73413, -23.67986],
        zoom: 9.6236,
        centerMobile: [-46.60054, -23.67075],
        zoomMobile: 9.093,
        bearing: 0,
        pitch: 0,
      },
    },
    {
      id: "diabetes_masc",
      name: "Diabetes mellitus (masc.)",
      summary:
        "Risco de morte por diabetes entre homens em cada distrito, em 2019.",
      description:
        "Risco relativo de mortalidade por diabetes mellitus em homens, por distrito, em 2019. Acima de 1, o distrito tem mais óbitos que o esperado. Fonte: Saldiva, P. H. N. et al. (2026).",
      tilesetId: "observatorio-nacional.mapas_saude",
      sourceLayer: "diabetes_masc",
      layerType: "fill",
      hasCustomStyle: true,
      catalogItemId: "9",
      mapView: {
        center: [-46.73413, -23.67986],
        zoom: 9.6236,
        centerMobile: [-46.60054, -23.67075],
        zoomMobile: 9.093,
        bearing: 0,
        pitch: 0,
      },
    },
    {
      id: "diabetes_fem",
      name: "Diabetes mellitus (fem.)",
      summary:
        "Risco de morte por diabetes entre mulheres em cada distrito, em 2019.",
      description:
        "Risco relativo de mortalidade por diabetes mellitus em mulheres, por distrito, em 2019. Acima de 1, o distrito tem mais óbitos que o esperado. Fonte: Saldiva, P. H. N. et al. (2026).",
      tilesetId: "observatorio-nacional.mapas_saude",
      sourceLayer: "diabetes_fem",
      layerType: "fill",
      hasCustomStyle: true,
      catalogItemId: "9",
      mapView: {
        center: [-46.73413, -23.67986],
        zoom: 9.6236,
        centerMobile: [-46.60054, -23.67075],
        zoomMobile: 9.093,
        bearing: 0,
        pitch: 0,
      },
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
