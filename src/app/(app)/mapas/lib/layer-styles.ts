export interface LayerStyle {
  id: string;
  type: "fill" | "line" | "circle" | "symbol";
  source: string;
  "source-layer": string;
  paint: Record<string, unknown>;
  layout?: Record<string, unknown>;
  slot?: string;
}

export const layerStyles: Record<string, LayerStyle> = {
  // ================== START SÃO PAULO ==================
  "faixa-azul-trechos-spo": {
    type: "line",
    source: "composite",
    id: "faixa-azul-trechos-spo",
    paint: {
      "line-width": 3,
      "line-color": "hsl(196, 100%, 47%)",
    },
    slot: "",
    "source-layer": "faixa-azul-trechos-spo",
    layout: {
      visibility: "none",
    },
  },
  "sinistros-por-trecho-spo": {
    layout: {
      visibility: "none",
    },
    type: "line",
    source: "composite",
    id: "sinistros-por-trecho-spo",
    paint: {
      "line-width": 3,
      "line-color": [
        "interpolate",
        ["linear"],
        ["get", "Sinistros"],
        0,
        "#fee5d9",
        10,
        "#fcbba1",
        30,
        "#fc9272",
        50,
        "#fb6a4a",
        100,
        "#ef3b2c",
        150,
        "#cb181d",
        351,
        "#99000d",
      ],
    },
    slot: "",
    "source-layer": "sinistros-por-trecho-spo",
  },
  "sinistros-por-distrito-spo": {
    id: "sinistros-por-distrito-spo",
    type: "fill",
    paint: {
      "fill-color": [
        "interpolate",
        ["linear"],
        ["get", "Número de Sinistros (2022-2025)"],
        500,
        "#fee5d9",
        1000,
        "#fcbba1",
        1500,
        "#fc9272",
        2100,
        "#fb6a4a",
        2500,
        "#ef3b2c",
        3000,
        "#cb181d",
        3914,
        "#99000d",
      ],
      "fill-outline-color": "#000000",
    },
    source: "composite",
    "source-layer": "sinistros-por-distrito-spo",
    slot: "",
    layout: {
      visibility: "none",
    },
  },
  verticalizacao_setor: {
    layout: {
      visibility: "none",
    },
    type: "fill",
    source: "composite",
    id: "verticalizacao-setor",
    paint: {
      "fill-color": [
        "interpolate",
        ["linear"],
        ["get", "Verticalização"],
        4,
        "#ffffb2",
        10,
        "#fecc5c",
        20,
        "#fd8d3c",
        40,
        "#f03b20",
        77,
        "#bd0026",
      ],
      "fill-outline-color": "#000000",
    },
    slot: "",
    "source-layer": "verticalizacao_setor",
  },
  "verticalizacao-distrito-spo": {
    layout: {
      visibility: "none",
    },
    type: "fill",
    source: "composite",
    id: "verticalizacao-distrito-spo",
    paint: {
      "fill-color": [
        "interpolate",
        ["linear"],
        ["get", "Verticalização"],
        2,
        "#ffffb2",
        4,
        "#fecc5c",
        6,
        "#fd8d3c",
        8,
        "#f03b20",
        11.5,
        "#bd0026",
      ],
      "fill-outline-color": "#000000",
    },
    slot: "",
    "source-layer": "verticalizacao-distrito-spo",
  },
  densidade_pop_setor_spo: {
    layout: {
      visibility: "none",
    },
    type: "fill",
    source: "composite",
    id: "densidade-pop-setor-spo",
    paint: {
      "fill-color": [
        "interpolate",
        ["linear"],
        ["get", "Densidade Populacional"],
        0,
        "#e5f5f9",
        500,
        "#99d8c9",
        1000,
        "#66c2a4",
        2500,
        "#238b45",
        8000,
        "#006d2c",
        116230,
        "#00441b",
      ],
      "fill-outline-color": "#000000",
    },
    slot: "",
    "source-layer": "densidade_pop_setor_spo",
  },
  "densidade-pop-distrito-spo": {
    layout: {
      visibility: "none",
    },
    type: "fill",
    source: "composite",
    id: "densidade-pop-distrito-spo",
    paint: {
      "fill-outline-color": [
        "interpolate",
        ["linear"],
        ["get", "Densidade Populacional"],
        50,
        "#000000",
        100,
        "#000000",
        130,
        "#000000",
        160,
        "#000000",
        261,
        "#000000",
      ],
      "fill-color": [
        "interpolate",
        ["linear"],
        ["get", "Densidade Populacional"],
        50,
        "#edf8fb",
        100,
        "#b2e2e2",
        130,
        "#66c2a4",
        160,
        "#2ca25f",
        260,
        "#006d2c",
      ],
    },
    slot: "",
    "source-layer": "densidade-pop-distrito-spo",
  },
  densidade_hab_setor: {
    layout: {
      visibility: "none",
    },
    type: "fill",
    source: "composite",
    id: "densidade-hab-setor",
    paint: {
      "fill-color": [
        "interpolate",
        ["linear"],
        ["get", "Densidade Habitacional"],
        0,
        "#f1eef6",
        150,
        "#d4b9da",
        300,
        "#c994c7",
        700,
        "#df65b0",
        1500,
        "#dd1c77",
        5250,
        "#980043",
      ],
      "fill-outline-color": "#000000",
    },
    slot: "",
    "source-layer": "densidade_hab_setor",
  },
  "densidade-hab-distrito-spo": {
    layout: {
      visibility: "none",
    },
    type: "fill",
    source: "composite",
    id: "densidade-hab-distrito-spo",
    paint: {
      "fill-color": [
        "interpolate",
        ["linear"],
        ["get", "Densidade Habitacional"],
        20,
        "#f1eef6",
        40,
        "#d7b5d8",
        60,
        "#df65b0",
        100,
        "#dd1c77",
        173,
        "#980043",
      ],
      "fill-outline-color": "#000000",
    },
    slot: "",
    "source-layer": "densidade-hab-distrito-spo",
  },
  "raster-dbiubd": {
    type: "fill",
    source: "composite",
    id: "raster-dbiubd",
    slot: "",
    "source-layer": "raster-dbiubd",
    paint: {
      "fill-outline-color": "#000000",
      "fill-color": [
        "interpolate",
        ["linear"],
        ["get", "Verticalização"],
        2,
        "#fee391",
        5,
        "#fec44f",
        10,
        "#fe9929",
        15,
        "#ec7014",
        20,
        "#cc4c02",
        28,
        "#993404",
      ],
    },
    layout: {
      visibility: "none",
    },
  },
  "iptu-21rwvx": {
    type: "fill",
    source: "composite",
    id: "iptu-21rwvx",
    slot: "",
    "source-layer": "iptu-21rwvx",
    paint: {},
    layout: {
      visibility: "none",
    },
  },
  "censo-ap4r5h": {
    type: "fill",
    source: "composite",
    id: "censo-ap4r5h",
    paint: {
      "fill-outline-color": "#000000",
    },
    slot: "",
    "source-layer": "censo-ap4r5h",
    layout: {
      visibility: "none",
    },
  },
  "censo_iptu-0z08hq": {
    type: "fill",
    source: "composite",
    id: "censo-iptu-0z08hq",
    slot: "",
    "source-layer": "censo_iptu-0z08hq",
    paint: {},
    layout: {
      visibility: "none",
    },
  },
  "populacao-por-distrito-spo": {
    type: "fill",
    source: "composite",
    id: "populacao-por-distrito-spo",
    paint: {
      "fill-color": [
        "interpolate",
        ["linear"],
        ["get", "Pop. 35 a 39 anos (femi.)"],
        3000,
        "#f7fcb9",
        4500,
        "#addd8e",
        5500,
        "#41ab5d",
        7000,
        "#006837",
        17043,
        "#004529",
      ],
      "fill-outline-color": "#000000",
    },
    slot: "",
    "source-layer": "populacao-por-distrito-spo",
    layout: {
      visibility: "none",
    },
  },
  "gastos_ubs_distritos-c6rpx4": {
    type: "fill",
    source: "composite",
    id: "gastos-ubs-distritos-c6rpx4",
    slot: "",
    "source-layer": "gastos_ubs_distritos-c6rpx4",
    paint: {
      "fill-color": [
        "interpolate",
        ["linear"],
        ["get", "Gastos UBS per capita (R$)"],
        0,
        "#ece2f0",
        100,
        "#a6bddb",
        200,
        "#3690c0",
        400,
        "#016c59",
        814,
        "#014636",
      ],
    },
    layout: {
      visibility: "none",
    },
  },
  "mortalidade_materna_fem": {
    id: "mortalidade_materna_fem",
    type: "fill",
    source: "composite",
    "source-layer": "mortalidade_materna_fem",
    paint: {
      "fill-outline-color": "#ffffff",
      "fill-color": [
        "case",
        ["==", ["typeof", ["get", "risk.2019"]], "number"],
        [
          "interpolate",
          ["linear"],
          ["get", "risk.2019"],
          0.48333364600306,
          "#2166AC",
          0.65555576400204,
          "#67A9CF",
          0.82777788200102,
          "#D1E5F0",
          1,
          "#F7F7F7",
          1.17222211799898,
          "#FDDBC7",
          1.34444423599796,
          "#EF8A62",
          1.51666635399694,
          "#B2182B",
        ],
        "#f0f0f0",
      ],
    },
    layout: {
      visibility: "none",
    },
    slot: "",
  },
  "isquemicas_coracao_masc": {
    id: "isquemicas_coracao_masc",
    type: "fill",
    source: "composite",
    "source-layer": "isquemicas_coracao_masc",
    paint: {
      "fill-outline-color": "#ffffff",
      "fill-opacity": 0.7,
      "fill-color": [
        "case",
        ["==", ["typeof", ["get", "risk.2019"]], "number"],
        [
          "interpolate",
          ["linear"],
          ["get", "risk.2019"],
          0.36425332983383,
          "#2166AC",
          0.576168886555887,
          "#67A9CF",
          0.788084443277943,
          "#D1E5F0",
          1,
          "#F7F7F7",
          1.21191555672206,
          "#FDDBC7",
          1.42383111344411,
          "#EF8A62",
          1.63574667016617,
          "#B2182B",
        ],
        "#f0f0f0",
      ],
    },
    layout: {
      visibility: "none",
    },
    slot: "",
  },
  "isquemicas_coracao_fem": {
    id: "isquemicas_coracao_fem",
    type: "fill",
    source: "composite",
    "source-layer": "isquemicas_coracao_fem",
    paint: {
      "fill-outline-color": "#ffffff",
      "fill-opacity": 0.7,
      "fill-color": [
        "case",
        ["==", ["typeof", ["get", "risk.2019"]], "number"],
        [
          "interpolate",
          ["linear"],
          ["get", "risk.2019"],
          0.27904239612428,
          "#2166AC",
          0.519361597416187,
          "#67A9CF",
          0.759680798708093,
          "#D1E5F0",
          1,
          "#F7F7F7",
          1.24031920129191,
          "#FDDBC7",
          1.48063840258381,
          "#EF8A62",
          1.72095760387572,
          "#B2182B",
        ],
        "#f0f0f0",
      ],
    },
    layout: {
      visibility: "none",
    },
    slot: "",
  },
  "cerebrovasculares_masc": {
    id: "cerebrovasculares_masc",
    type: "fill",
    source: "composite",
    "source-layer": "cerebrovasculares_masc",
    paint: {
      "fill-outline-color": "#ffffff",
      "fill-opacity": 0.7,
      "fill-color": [
        "case",
        ["==", ["typeof", ["get", "risk.2019"]], "number"],
        [
          "interpolate",
          ["linear"],
          ["get", "risk.2019"],
          0.180830450908669,
          "#2166AC",
          0.453886967272446,
          "#67A9CF",
          0.726943483636223,
          "#D1E5F0",
          1,
          "#F7F7F7",
          1.27305651636378,
          "#FDDBC7",
          1.54611303272755,
          "#EF8A62",
          1.81916954909133,
          "#B2182B",
        ],
        "#f0f0f0",
      ],
    },
    layout: {
      visibility: "none",
    },
    slot: "",
  },
  "cerebrovasculares_fem": {
    id: "cerebrovasculares_fem",
    type: "fill",
    source: "composite",
    "source-layer": "cerebrovasculares_fem",
    paint: {
      "fill-outline-color": "#ffffff",
      "fill-color": [
        "case",
        ["==", ["typeof", ["get", "risk.2019"]], "number"],
        [
          "interpolate",
          ["linear"],
          ["get", "risk.2019"],
          0.23427349286993,
          "#2166AC",
          0.489515661913287,
          "#67A9CF",
          0.744757830956643,
          "#D1E5F0",
          1,
          "#F7F7F7",
          1.25524216904336,
          "#FDDBC7",
          1.51048433808671,
          "#EF8A62",
          1.76572650713007,
          "#B2182B",
        ],
        "#f0f0f0",
      ],
    },
    layout: {
      visibility: "none",
    },
    slot: "",
  },
  "diabetes_masc": {
    id: "diabetes_masc",
    type: "fill",
    source: "composite",
    "source-layer": "diabetes_masc",
    paint: {
      "fill-outline-color": "#ffffff",
      "fill-opacity": 0.7,
      "fill-color": [
        "case",
        ["==", ["typeof", ["get", "risk.2019"]], "number"],
        [
          "interpolate",
          ["linear"],
          ["get", "risk.2019"],
          0.22833326293635,
          "#2166AC",
          0.485555508624233,
          "#67A9CF",
          0.742777754312117,
          "#D1E5F0",
          1,
          "#F7F7F7",
          1.25722224568788,
          "#FDDBC7",
          1.51444449137577,
          "#EF8A62",
          1.77166673706365,
          "#B2182B",
        ],
        "#f0f0f0",
      ],
    },
    layout: {
      visibility: "none",
    },
    slot: "",
  },
  "diabetes_fem": {
    id: "diabetes_fem",
    type: "fill",
    source: "composite",
    "source-layer": "diabetes_fem",
    paint: {
      "fill-outline-color": "#ffffff",
      "fill-opacity": 0.7,
      "fill-color": [
        "case",
        ["==", ["typeof", ["get", "risk.2019"]], "number"],
        [
          "interpolate",
          ["linear"],
          ["get", "risk.2019"],
          -0.0227377785101299,
          "#2166AC",
          0.31817481432658,
          "#67A9CF",
          0.65908740716329,
          "#D1E5F0",
          1,
          "#F7F7F7",
          1.34091259283671,
          "#FDDBC7",
          1.68182518567342,
          "#EF8A62",
          2.02273777851013,
          "#B2182B",
        ],
        "#f0f0f0",
      ],
    },
    layout: {
      visibility: "none",
    },
    slot: "",
  },
  "geoses-spo": {
    id: "geoses-spo",
    type: "fill",
    paint: {
      "fill-color": [
        "interpolate",
        ["linear"],
        ["get", "GeoSES (-1 a 1)"],
        -1,
        "#b2182b",
        -0.75,
        "#d6604d",
        -0.5,
        "#f4a582",
        -0.25,
        "#fddbc7",
        0,
        "#f7f7f7",
        0.25,
        "#d1e5f0",
        0.5,
        "#92c5de",
        0.75,
        "#4393c3",
        1,
        "#2166ac",
      ],
      "fill-outline-color": "#000000",
    },
    source: "composite",
    "source-layer": "geoses-spo",
    slot: "",
  },
  // ================== END SÃO PAULO ==================
  // ================== START RIO DE JANEIRO ==================
  "quali_pontos-b424eh": {
    type: "circle",
    source: "composite",
    id: "quali-pontos-b424eh",
    paint: {
      "circle-color": [
        "interpolate",
        ["linear"],
        ["get", "PM 10 Máx."],
        237,
        "#cccccc",
        554,
        "#969696",
        871,
        "#636363",
      ],
    },
    slot: "",
    "source-layer": "quali_pontos-b424eh",
    layout: {
      visibility: "none",
    },
  },
  "quali_area-1ci0wo": {
    layout: {
      visibility: "none",
    },
    type: "fill",
    source: "composite",
    id: "quali-area-1ci0wo",
    paint: {
      "fill-color": [
        "interpolate",
        ["linear"],
        ["get", "PM 10 Máx."],
        237,
        "#cccccc",
        554,
        "#969696",
        871,
        "#636363",
      ],
    },
    slot: "",
    "source-layer": "quali_area-1ci0wo",
  },
  "ic_pontos-90vwh4": {
    type: "circle",
    source: "composite",
    id: "ic-pontos-90vwh4",
    paint: {
      "circle-color": [
        "interpolate",
        ["linear"],
        ["get", "Temperatura Máx."],
        33.1,
        "#fed976",
        35,
        "#fd8d3c",
        37,
        "#e31a1c",
        39.4,
        "#800026",
      ],
    },
    slot: "",
    "source-layer": "ic_pontos-90vwh4",
    layout: {
      visibility: "none",
    },
  },
  "ic_areas-3ii8xj": {
    layout: {
      visibility: "none",
    },
    type: "fill",
    source: "composite",
    id: "ic-areas-3ii8xj",
    paint: {
      "fill-color": [
        "interpolate",
        ["linear"],
        ["get", "Temperatura Média"],
        27.1,
        "#ffeda0",
        27.5,
        "#fd8d3c",
        27.9,
        "#bd0026",
      ],
      "fill-opacity": 0.7,
    },
    slot: "",
    "source-layer": "ic_areas-3ii8xj",
  },
  // ================== END RIO DE JANEIRO ==================
  // ================== START BRASIL ==================
  "insper_tarifa_zero_municipios-dwws9i": {
    id: "insper-tarifa-zero-municipios-dwws9i",
    type: "circle",
    paint: {
      "circle-radius": 8,
      "circle-color": [
        "match",
        ["get", "Tipo de Tarifa Zero"],
        ["Integral"],
        "#2166ac",
        ["Parcial"],
        "#80cdc1",
        ["Revogado"],
        "#b2182b",
        "#000000",
      ],
    },
    source: "composite",
    "source-layer": "insper_tarifa_zero_municipios-dwws9i",
  },
  // ================== END BRASIL ==================
};

// Helper function to get layer style by source layer name
export function getLayerStyle(sourceLayer: string): LayerStyle | null {
  return layerStyles[sourceLayer] || null;
}

// Helper function to create a layer configuration with custom style
export function createStyledLayer(
  layerId: string,
  sourceLayer: string,
  _tilesetId: string,
): LayerStyle | null {
  const style = getLayerStyle(sourceLayer);
  if (!style) return null;

  return {
    ...style,
    id: layerId,
    source: layerId, // Use the layerId as source since we're adding it as a vector source
    "source-layer": sourceLayer,
  };
}

// Legend item interface
export interface LegendItem {
  color: string;
  label: string;
  value?: string | number;
}

// Extract legend information from layer paint styles
export function extractLegendFromPaint(
  layerStyle: LayerStyle,
): LegendItem[] | null {
  if (!layerStyle.paint) return null;

  const paint = layerStyle.paint;

  // Handle fill layers
  if (layerStyle.type === "fill" && paint["fill-color"]) {
    return extractLegendFromExpression(paint["fill-color"]);
  }

  // Handle line layers
  if (layerStyle.type === "line" && paint["line-color"]) {
    return extractLegendFromExpression(paint["line-color"]);
  }

  // Handle circle layers
  if (layerStyle.type === "circle" && paint["circle-color"]) {
    return extractLegendFromExpression(paint["circle-color"]);
  }

  return null;
}

// Extract legend from Mapbox expression
function extractLegendFromExpression(expression: unknown): LegendItem[] | null {
  if (!Array.isArray(expression)) {
    // Simple color value
    if (typeof expression === "string") {
      return [{ color: expression, label: "Dados disponíveis" }];
    }
    return null;
  }

  const [expressionType] = expression;

  if (expressionType === "step") {
    return extractFromStepExpression(expression);
  }

  if (expressionType === "interpolate") {
    return extractFromInterpolateExpression(expression);
  }

  if (expressionType === "case") {
    return extractFromCaseExpression(expression);
  }

  if (expressionType === "match") {
    return extractFromMatchExpression(expression);
  }

  return null;
}

// Extract legend from match expression
function extractFromMatchExpression(expression: unknown[]): LegendItem[] {
  const legendItems: LegendItem[] = [];
  // Match expression format: ["match", ["get", "property"], value1, output1, value2, output2, ..., fallback]

  if (expression.length < 4) return legendItems;

  // Process pairs of (value, output) starting from index 2
  // The last item is the fallback/default value
  for (let i = 2; i < expression.length - 1; i += 2) {
    const matchValue = expression[i];
    const output = expression[i + 1];

    // Handle arrays of values (multiple values mapping to same output)
    if (Array.isArray(matchValue)) {
      matchValue.forEach((val) => {
        if (typeof output === "string") {
          legendItems.push({
            color: output,
            label: String(val),
            value: String(val),
          });
        }
      });
    } else {
      // Single value
      if (typeof output === "string") {
        legendItems.push({
          color: output,
          label: String(matchValue),
          value: String(matchValue),
        });
      }
    }
  }

  // Add fallback/default color if it exists and no items were added
  const fallbackColor = expression[expression.length - 1];
  if (legendItems.length === 0 && typeof fallbackColor === "string") {
    legendItems.push({
      color: fallbackColor,
      label: "Outros",
      value: "Default",
    });
  }

  return legendItems;
}

// Extract legend from step expression
function extractFromStepExpression(expression: unknown[]): LegendItem[] {
  const legendItems: LegendItem[] = [];
  const [, input, fallback, ...stops] = expression;

  // Add first item with fallback color
  if (typeof fallback === "string") {
    legendItems.push({
      color: fallback,
      label: getReadableLabel(input, null),
      value: `< ${stops[0]}`,
    });
  }

  // Process stops (value, color pairs)
  for (let i = 0; i < stops.length; i += 2) {
    const value = stops[i];
    const color = stops[i + 1];
    const nextValue = stops[i + 2];

    if (typeof color === "string") {
      legendItems.push({
        color,
        label: getReadableLabel(input, value),
        value: nextValue ? `${value} - ${nextValue}` : `${value}+`,
      });
    }
  }

  return legendItems;
}

// Extract legend from interpolate expression
function extractFromInterpolateExpression(expression: unknown[]): LegendItem[] {
  const legendItems: LegendItem[] = [];
  const [, , input, ...stops] = expression;

  // Process stops (value, color pairs)
  for (let i = 0; i < stops.length; i += 2) {
    const value = stops[i];
    const color = stops[i + 1];

    if (typeof color === "string") {
      legendItems.push({
        color,
        label: getReadableLabel(input, value),
        value:
          typeof value === "string" || typeof value === "number"
            ? value
            : String(value),
      });
    }
  }

  return legendItems;
}

// Extract legend from case expression (categorical match branches or nested interpolate/step)
function extractFromCaseExpression(expression: unknown[]): LegendItem[] {
  const legendItems: LegendItem[] = [];

  // Case: ["case", cond1, output1, cond2, output2, ..., fallback]
  const caseConditions = expression.slice(1, -1);

  for (let i = 0; i < caseConditions.length; i += 2) {
    const condition = caseConditions[i];
    const output = caseConditions[i + 1];

    // Nested color scale (e.g. typeof check wrapping an interpolate)
    if (Array.isArray(output)) {
      const nested = extractLegendFromExpression(output);
      if (nested?.length) {
        legendItems.push(...nested);
        continue;
      }
    }

    // Categorical: condition is match, output is a solid color
    if (
      Array.isArray(condition) &&
      condition[0] === "match" &&
      typeof output === "string"
    ) {
      const matchValues = condition[3];
      if (Array.isArray(matchValues) && matchValues.length > 0) {
        legendItems.push({
          color: output,
          label: String(matchValues[0]),
          value: matchValues.map(String).join(", "),
        });
      }
    } else if (typeof output === "string" && output.startsWith("#")) {
      legendItems.push({
        color: output,
        label: "Valor",
        value: output,
      });
    }
  }

  // Fallback only when no meaningful stops were found (avoids drowning scales in "Outros")
  const fallback = expression[expression.length - 1];
  if (
    legendItems.length === 0 &&
    typeof fallback === "string" &&
    fallback.startsWith("#")
  ) {
    legendItems.push({
      color: fallback,
      label: "Outros",
      value: "Outros",
    });
  }

  return legendItems;
}

// Generate readable labels based on property names
function getReadableLabel(input: unknown, value: unknown): string {
  if (!Array.isArray(input) || input[0] !== "get") {
    return value ? `${value}` : "Valor";
  }

  const property = input[1];

  // Map property names to readable labels
  const propertyLabels: Record<string, string> = {
    densidade_residencial: "Densidade Residencial",
    GeoSES: "Índice GeoSES",
    "Renda Domiciliar Média (R$)": "Renda Domiciliar",
    "População (2022)": "População",
    "Número de Passageiros": "Passageiros",
    "Média de Embarques (dia útil)": "Embarques",
    "Total Vítimas (2023)": "Vítimas",
    "Total Feridos": "Feridos",
    tipo: "Tipo",
  };

  const baseLabel = propertyLabels[property] || property;

  if (value === null || value === undefined) {
    return baseLabel;
  }

  // Format value ranges
  if (typeof value === "number") {
    if (property.includes("Renda")) {
      return `${baseLabel}`;
    }
    if (property.includes("População")) {
      return `${baseLabel}`;
    }
    return `${baseLabel}`;
  }

  return baseLabel;
}

// Get legend for a specific layer
export function getLayerLegend(layerId: string): LegendItem[] | null {
  const layerStyle = getLayerStyle(layerId);
  if (!layerStyle) return null;

  return extractLegendFromPaint(layerStyle);
}
