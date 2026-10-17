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
    id: "faixa-azul-trechos-spo",
    type: "line",
    source: "composite",
    "source-layer": "faixa-azul-trechos-spo",
    paint: {
      "line-width": 3,
      "line-opacity": 0.9,
      "line-color": "#6BAED6",
    },
    layout: {
      visibility: "none",
    },
    slot: "",
  },
  "sinistros-por-trecho-spo": {
    id: "sinistros-por-trecho-spo",
    type: "line",
    source: "composite",
    "source-layer": "sinistros-por-trecho-spo",
    paint: {
      "line-width": 3,
      "line-opacity": 0.9,
      "line-color": [
        "case",
        ["==", ["typeof", ["get", "Sinistros"]], "number"],
        [
          "step",
          ["get", "Sinistros"],
          "#FFFFB2",
          25,
          "#FED976",
          50,
          "#FEB24C",
          100,
          "#FD8D3C",
          175,
          "#F03B20",
        ],
        "#737373",
      ],
    },
    layout: {
      visibility: "none",
    },
    slot: "",
  },
  "sinistros-por-distrito-spo": {
    id: "sinistros-por-distrito-spo",
    type: "fill",
    source: "composite",
    "source-layer": "sinistros-por-distrito-spo",
    paint: {
      "fill-outline-color": "#000000",
      "fill-opacity": 0.7,
      "fill-color": [
        "case",
        [
          "==",
          ["typeof", ["get", "Número de Sinistros (2022-2025)"]],
          "number",
        ],
        [
          "step",
          ["get", "Número de Sinistros (2022-2025)"],
          "#FFFFB2",
          1000,
          "#FED976",
          1300,
          "#FEB24C",
          1500,
          "#FD8D3C",
          2000,
          "#F03B20",
        ],
        "#737373",
      ],
    },
    layout: {
      visibility: "none",
    },
    slot: "",
  },
  verticalizacao_setor: {
    id: "verticalizacao-setor",
    type: "fill",
    source: "composite",
    "source-layer": "verticalizacao_setor",
    paint: {
      "fill-outline-color": [
        "case",
        ["==", ["typeof", ["get", "Verticalização"]], "number"],
        [
          "step",
          ["get", "Verticalização"],
          "#F2F0F7",
          1.3,
          "#DADAEB",
          1.5,
          "#BCBDDC",
          3,
          "#9E9AC8",
          7.5,
          "#756BB1",
        ],
        "#737373",
      ],
      "fill-opacity": 0.7,
      "fill-color": [
        "case",
        ["==", ["typeof", ["get", "Verticalização"]], "number"],
        [
          "step",
          ["get", "Verticalização"],
          "#F2F0F7",
          1.3,
          "#DADAEB",
          1.5,
          "#BCBDDC",
          3,
          "#9E9AC8",
          7.5,
          "#756BB1",
        ],
        "#737373",
      ],
    },
    layout: {
      visibility: "none",
    },
    slot: "",
  },
  "verticalizacao-distrito-spo": {
    id: "verticalizacao-distrito-spo",
    type: "fill",
    source: "composite",
    "source-layer": "verticalizacao-distrito-spo",
    paint: {
      "fill-outline-color": "#000000",
      "fill-opacity": 0.7,
      "fill-color": [
        "case",
        ["==", ["typeof", ["get", "Verticalização"]], "number"],
        [
          "step",
          ["get", "Verticalização"],
          "#F2F0F7",
          2,
          "#DADAEB",
          3,
          "#BCBDDC",
          4,
          "#9E9AC8",
          7.5,
          "#756BB1",
        ],
        "#737373",
      ],
    },
    layout: {
      visibility: "none",
    },
    slot: "",
  },
  densidade_pop_setor_spo: {
    id: "densidade-pop-setor-spo",
    type: "fill",
    source: "composite",
    "source-layer": "densidade_pop_setor_spo",
    paint: {
      "fill-outline-color": [
        "case",
        ["==", ["typeof", ["get", "Densidade Populacional"]], "number"],
        [
          "step",
          ["get", "Densidade Populacional"],
          "#FFFFCC",
          75,
          "#C7E9B4",
          125,
          "#7FCDBB",
          175,
          "#41B6C4",
          250,
          "#1D91C0",
          500,
          "#225EA8",
        ],
        "#737373",
      ],
      "fill-opacity": 0.7,
      "fill-color": [
        "case",
        ["==", ["typeof", ["get", "Densidade Populacional"]], "number"],
        [
          "step",
          ["get", "Densidade Populacional"],
          "#FFFFCC",
          75,
          "#C7E9B4",
          125,
          "#7FCDBB",
          175,
          "#41B6C4",
          250,
          "#1D91C0",
          500,
          "#225EA8",
        ],
        "#737373",
      ],
    },
    layout: {
      visibility: "none",
    },
    slot: "",
  },
  "densidade-pop-distrito-spo": {
    id: "densidade-pop-distrito-spo",
    type: "fill",
    source: "composite",
    "source-layer": "densidade-pop-distrito-spo",
    paint: {
      "fill-outline-color": "#000000",
      "fill-opacity": 0.7,
      "fill-color": [
        "case",
        ["==", ["typeof", ["get", "Densidade Populacional"]], "number"],
        [
          "step",
          ["get", "Densidade Populacional"],
          "#FFFFCC",
          75,
          "#C7E9B4",
          100,
          "#7FCDBB",
          120,
          "#41B6C4",
          150,
          "#2C7FB8",
        ],
        "#737373",
      ],
    },
    layout: {
      visibility: "none",
    },
    slot: "",
  },
  densidade_hab_setor: {
    id: "densidade-hab-setor",
    type: "fill",
    source: "composite",
    "source-layer": "densidade_hab_setor",
    paint: {
      "fill-outline-color": [
        "case",
        ["==", ["typeof", ["get", "Densidade Habitacional"]], "number"],
        [
          "step",
          ["get", "Densidade Habitacional"],
          "#FFFFCC",
          40,
          "#C7E9B4",
          60,
          "#7FCDBB",
          75,
          "#41B6C4",
          125,
          "#1D91C0",
          200,
          "#225EA8",
        ],
        "#737373",
      ],
      "fill-opacity": 0.7,
      "fill-color": [
        "case",
        ["==", ["typeof", ["get", "Densidade Habitacional"]], "number"],
        [
          "step",
          ["get", "Densidade Habitacional"],
          "#FFFFCC",
          40,
          "#C7E9B4",
          60,
          "#7FCDBB",
          75,
          "#41B6C4",
          125,
          "#1D91C0",
          200,
          "#225EA8",
        ],
        "#737373",
      ],
    },
    layout: {
      visibility: "none",
    },
    slot: "",
  },
  "densidade-hab-distrito-spo": {
    id: "densidade-hab-distrito-spo",
    type: "fill",
    source: "composite",
    "source-layer": "densidade-hab-distrito-spo",
    paint: {
      "fill-outline-color": "#000000",
      "fill-opacity": 0.7,
      "fill-color": [
        "case",
        ["==", ["typeof", ["get", "Densidade Habitacional"]], "number"],
        [
          "step",
          ["get", "Densidade Habitacional"],
          "#FFFFCC",
          35,
          "#C7E9B4",
          45,
          "#7FCDBB",
          55,
          "#41B6C4",
          65,
          "#2C7FB8",
        ],
        "#737373",
      ],
    },
    layout: {
      visibility: "none",
    },
    slot: "",
  },
  "raster-dbiubd": {
    id: "raster-dbiubd",
    type: "fill",
    source: "composite",
    "source-layer": "raster-dbiubd",
    paint: {
      "fill-outline-color": "#000000",
      "fill-opacity": 0.7,
      "fill-color": [
        "case",
        ["==", ["typeof", ["get", "Verticalização"]], "number"],
        [
          "step",
          ["get", "Verticalização"],
          "#F2F0F7",
          1.4,
          "#DADAEB",
          1.6,
          "#BCBDDC",
          2,
          "#9E9AC8",
          3,
          "#756BB1",
        ],
        "#737373",
      ],
    },
    layout: {
      visibility: "none",
    },
    slot: "",
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
    id: "populacao-por-distrito-spo",
    type: "fill",
    source: "composite",
    "source-layer": "populacao-por-distrito-spo",
    paint: {
      "fill-outline-color": "#000000",
      "fill-opacity": 0.7,
      "fill-color": [
        "case",
        ["==", ["typeof", ["get", "Pop. 35 a 39 anos (femi.)"]], "number"],
        [
          "step",
          ["get", "Pop. 35 a 39 anos (femi.)"],
          "#EFF3FF",
          3000,
          "#C6DBEF",
          4500,
          "#9ECAE1",
          5500,
          "#6BAED6",
          7500,
          "#3182BD",
        ],
        "#737373",
      ],
    },
    layout: {
      visibility: "none",
    },
    slot: "",
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
      "fill-outline-color": "#000000",
    },
    layout: {
      visibility: "none",
    },
  },
  mortalidade_materna_fem: {
    id: "mortalidade_materna_fem",
    type: "fill",
    source: "composite",
    "source-layer": "mortalidade_materna_fem",
    paint: {
      "fill-outline-color": "#000000",
      "fill-opacity": 0.7,
      "fill-color": [
        "case",
        ["==", ["typeof", ["get", "Risco relativo"]], "number"],
        [
          "interpolate",
          ["linear"],
          ["get", "Risco relativo"],
          0.5,
          "#4393C3",
          0.7,
          "#92C5DE",
          0.8,
          "#D1E5F0",
          1,
          "#F7F7F7",
          1.2,
          "#FDDBC7",
          1.3,
          "#F4A582",
          1.5,
          "#D6604D",
        ],
        "#737373",
      ],
    },
    layout: {
      visibility: "none",
    },
    slot: "",
  },
  isquemicas_coracao_masc: {
    id: "isquemicas_coracao_masc",
    type: "fill",
    source: "composite",
    "source-layer": "isquemicas_coracao_masc",
    paint: {
      "fill-outline-color": "#000000",
      "fill-opacity": 0.7,
      "fill-color": [
        "case",
        ["==", ["typeof", ["get", "Risco relativo"]], "number"],
        [
          "interpolate",
          ["linear"],
          ["get", "Risco relativo"],
          0.3,
          "#4393C3",
          0.5,
          "#92C5DE",
          0.8,
          "#D1E5F0",
          1,
          "#F7F7F7",
          1.2,
          "#FDDBC7",
          1.5,
          "#F4A582",
          1.7,
          "#D6604D",
        ],
        "#737373",
      ],
    },
    layout: {
      visibility: "none",
    },
    slot: "",
  },
  isquemicas_coracao_fem: {
    id: "isquemicas_coracao_fem",
    type: "fill",
    source: "composite",
    "source-layer": "isquemicas_coracao_fem",
    paint: {
      "fill-outline-color": "#000000",
      "fill-opacity": 0.7,
      "fill-color": [
        "case",
        ["==", ["typeof", ["get", "Risco relativo"]], "number"],
        [
          "interpolate",
          ["linear"],
          ["get", "Risco relativo"],
          0.3,
          "#4393C3",
          0.5,
          "#92C5DE",
          0.8,
          "#D1E5F0",
          1,
          "#F7F7F7",
          1.2,
          "#FDDBC7",
          1.5,
          "#F4A582",
          1.7,
          "#D6604D",
        ],
        "#737373",
      ],
    },
    layout: {
      visibility: "none",
    },
    slot: "",
  },
  cerebrovasculares_masc: {
    id: "cerebrovasculares_masc",
    type: "fill",
    source: "composite",
    "source-layer": "cerebrovasculares_masc",
    paint: {
      "fill-outline-color": "#000000",
      "fill-opacity": 0.7,
      "fill-color": [
        "case",
        ["==", ["typeof", ["get", "Risco relativo"]], "number"],
        [
          "interpolate",
          ["linear"],
          ["get", "Risco relativo"],
          0.2,
          "#4393C3",
          0.5,
          "#92C5DE",
          0.7,
          "#D1E5F0",
          1,
          "#F7F7F7",
          1.3,
          "#FDDBC7",
          1.5,
          "#F4A582",
          1.8,
          "#D6604D",
        ],
        "#737373",
      ],
    },
    layout: {
      visibility: "none",
    },
    slot: "",
  },
  cerebrovasculares_fem: {
    id: "cerebrovasculares_fem",
    type: "fill",
    source: "composite",
    "source-layer": "cerebrovasculares_fem",
    paint: {
      "fill-outline-color": "#000000",
      "fill-opacity": 0.7,
      "fill-color": [
        "case",
        ["==", ["typeof", ["get", "Risco relativo"]], "number"],
        [
          "interpolate",
          ["linear"],
          ["get", "Risco relativo"],
          0.2,
          "#4393C3",
          0.5,
          "#92C5DE",
          0.7,
          "#D1E5F0",
          1,
          "#F7F7F7",
          1.3,
          "#FDDBC7",
          1.5,
          "#F4A582",
          1.8,
          "#D6604D",
        ],
        "#737373",
      ],
    },
    layout: {
      visibility: "none",
    },
    slot: "",
  },
  diabetes_masc: {
    id: "diabetes_masc",
    type: "fill",
    source: "composite",
    "source-layer": "diabetes_masc",
    paint: {
      "fill-outline-color": "#000000",
      "fill-opacity": 0.7,
      "fill-color": [
        "case",
        ["==", ["typeof", ["get", "Risco relativo"]], "number"],
        [
          "interpolate",
          ["linear"],
          ["get", "Risco relativo"],
          0,
          "#4393C3",
          0.3,
          "#92C5DE",
          0.7,
          "#D1E5F0",
          1,
          "#F7F7F7",
          1.3,
          "#FDDBC7",
          1.7,
          "#F4A582",
          2,
          "#D6604D",
        ],
        "#737373",
      ],
    },
    layout: {
      visibility: "none",
    },
    slot: "",
  },
  diabetes_fem: {
    id: "diabetes_fem",
    type: "fill",
    source: "composite",
    "source-layer": "diabetes_fem",
    paint: {
      "fill-outline-color": "#000000",
      "fill-opacity": 0.7,
      "fill-color": [
        "case",
        ["==", ["typeof", ["get", "Risco relativo"]], "number"],
        [
          "interpolate",
          ["linear"],
          ["get", "Risco relativo"],
          0,
          "#4393C3",
          0.3,
          "#92C5DE",
          0.7,
          "#D1E5F0",
          1,
          "#F7F7F7",
          1.3,
          "#FDDBC7",
          1.7,
          "#F4A582",
          2,
          "#D6604D",
        ],
        "#737373",
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
    source: "composite",
    "source-layer": "geoses-spo",
    paint: {
      "fill-outline-color": "#000000",
      "fill-opacity": 0.7,
      "fill-color": [
        "case",
        ["==", ["typeof", ["get", "GeoSES (-1 a 1)"]], "number"],
        [
          "step",
          ["get", "GeoSES (-1 a 1)"],
          "#EFF3FF",
          -0.5,
          "#C6DBEF",
          -0.4,
          "#9ECAE1",
          -0.1,
          "#6BAED6",
          0.2,
          "#3182BD",
        ],
        "#737373",
      ],
    },
    layout: {
      visibility: "none",
    },
    slot: "",
  },
  // ================== END SÃO PAULO ==================
  // ================== START RIO DE JANEIRO ==================
  "quali_pontos-b424eh": {
    id: "quali_pontos-b424eh",
    type: "circle",
    source: "composite",
    "source-layer": "quali_pontos-b424eh",
    paint: {
      "circle-radius": 5,
      "circle-opacity": 0.8,
      "circle-stroke-width": 1,
      "circle-stroke-color": "#ffffff",
      "circle-color": [
        "case",
        ["==", ["typeof", ["get", "PM 10 Média"]], "number"],
        [
          "step",
          ["get", "PM 10 Média"],
          "#F2F0F7",
          33,
          "#CBC9E2",
          36,
          "#9E9AC8",
        ],
        "#737373",
      ],
    },
    layout: {
      visibility: "none",
    },
    slot: "",
  },
  "quali_area-1ci0wo": {
    id: "quali_area-1ci0wo",
    type: "fill",
    source: "composite",
    "source-layer": "quali_area-1ci0wo",
    paint: {
      "fill-outline-color": "#000000",
      "fill-opacity": 0.7,
      "fill-color": [
        "case",
        ["==", ["typeof", ["get", "PM 10 Média"]], "number"],
        [
          "step",
          ["get", "PM 10 Média"],
          "#F2F0F7",
          33,
          "#CBC9E2",
          36,
          "#9E9AC8",
        ],
        "#737373",
      ],
    },
    layout: {
      visibility: "none",
    },
    slot: "",
  },
  "ic_pontos-90vwh4": {
    id: "ic_pontos-90vwh4",
    type: "circle",
    source: "composite",
    "source-layer": "ic_pontos-90vwh4",
    paint: {
      "circle-radius": 5,
      "circle-opacity": 0.8,
      "circle-stroke-width": 1,
      "circle-stroke-color": "#ffffff",
      "circle-color": [
        "case",
        ["==", ["typeof", ["get", "Temperatura Máx."]], "number"],
        [
          "step",
          ["get", "Temperatura Máx."],
          "#FFFFB2",
          35,
          "#FECC5C",
          36,
          "#FD8D3C",
          37,
          "#F03B20",
        ],
        "#737373",
      ],
    },
    layout: {
      visibility: "none",
    },
    slot: "",
  },
  "ic_areas-3ii8xj": {
    id: "ic_areas-3ii8xj",
    type: "fill",
    source: "composite",
    "source-layer": "ic_areas-3ii8xj",
    paint: {
      "fill-outline-color": "#000000",
      "fill-opacity": 0.7,
      "fill-color": [
        "case",
        ["==", ["typeof", ["get", "Temperatura Média"]], "number"],
        [
          "step",
          ["get", "Temperatura Média"],
          "#FFFFB2",
          27.5,
          "#FECC5C",
          27.8,
          "#FD8D3C",
        ],
        "#737373",
      ],
    },
    layout: {
      visibility: "none",
    },
    slot: "",
  },
  // ================== END RIO DE JANEIRO ==================
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
