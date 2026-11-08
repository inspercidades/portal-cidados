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
  densidade_hab_setor: {
    id: "densidade-hab-setor",
    type: "fill",
    source: "composite",
    "source-layer": "densidade_hab_setor",
    paint: {
      "fill-outline-color": [
        "step",
        ["get", "Densidade Habitacional"],
        "#225EA8",
        40,
        "#1D91C0",
        60,
        "#41B6C4",
        75,
        "#7FCDBB",
        125,
        "#C7E9B4",
        200,
        "#FFFFCC",
      ],
      "fill-opacity": 0.7,
      "fill-color": [
        "step",
        ["get", "Densidade Habitacional"],
        "#225EA8",
        40,
        "#1D91C0",
        60,
        "#41B6C4",
        75,
        "#7FCDBB",
        125,
        "#C7E9B4",
        200,
        "#FFFFCC",
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
        "step",
        ["get", "Densidade Habitacional"],
        "#2C7FB8",
        35,
        "#41B6C4",
        45,
        "#7FCDBB",
        55,
        "#C7E9B4",
        65,
        "#FFFFCC",
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
        "step",
        ["get", "Densidade Populacional"],
        "#225EA8",
        75,
        "#1D91C0",
        125,
        "#41B6C4",
        175,
        "#7FCDBB",
        250,
        "#C7E9B4",
        500,
        "#FFFFCC",
      ],
      "fill-opacity": 0.7,
      "fill-color": [
        "step",
        ["get", "Densidade Populacional"],
        "#225EA8",
        75,
        "#1D91C0",
        125,
        "#41B6C4",
        175,
        "#7FCDBB",
        250,
        "#C7E9B4",
        500,
        "#FFFFCC",
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
        "step",
        ["get", "Densidade Populacional"],
        "#2C7FB8",
        75,
        "#41B6C4",
        90,
        "#7FCDBB",
        120,
        "#C7E9B4",
        140,
        "#FFFFCC",
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
        "step",
        ["get", "Verticalização"],
        "#2C7FB8",
        1.3,
        "#41B6C4",
        1.5,
        "#7FCDBB",
        3,
        "#C7E9B4",
        7.5,
        "#FFFFCC",
      ],
      "fill-opacity": 0.7,
      "fill-color": [
        "step",
        ["get", "Verticalização"],
        "#2C7FB8",
        1.3,
        "#41B6C4",
        1.5,
        "#7FCDBB",
        3,
        "#C7E9B4",
        7.5,
        "#FFFFCC",
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
          "#2C7FB8",
          2,
          "#41B6C4",
          2.8,
          "#7FCDBB",
          4,
          "#C7E9B4",
          6,
          "#FFFFCC",
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
        "step",
        ["get", "Verticalização"],
        "#2C7FB8",
        1.4,
        "#41B6C4",
        1.6,
        "#7FCDBB",
        2,
        "#C7E9B4",
        3,
        "#FFFFCC",
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
        "interpolate",
        ["linear"],
        ["get", "GeoSES (-1 a 1)"],
        -1,
        "#D6604D",
        -0.7,
        "#F4A582",
        -0.3,
        "#FDDBC7",
        0,
        "#F7F7F7",
        0.3,
        "#D1E5F0",
        0.7,
        "#92C5DE",
        1,
        "#4393C3",
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
        "step",
        ["get", "Sinistros"],
        "#FFFFB2",
        5,
        "#FED976",
        15,
        "#FEB24C",
        30,
        "#FD8D3C",
        60,
        "#F03B20",
      ],
    },
    layout: {
      visibility: "none",
    },
    slot: "",
  },
  "faixa-azul-trechos-spo": {
    id: "faixa-azul-trechos-spo",
    type: "line",
    source: "composite",
    "source-layer": "faixa-azul-trechos-spo",
    paint: {
      "line-width": 3,
      "line-opacity": 0.9,
      "line-color": "#1D91C0",
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
    },
    layout: {
      visibility: "none",
    },
    slot: "",
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
    },
    layout: {
      visibility: "none",
    },
    slot: "",
  },
  // ================== END SÃO PAULO ==================
  // ================== START RIO DE JANEIRO ==================
  "ic_areas-3ii8xj": {
    id: "ic_areas-3ii8xj",
    type: "fill",
    source: "composite",
    "source-layer": "ic_areas-3ii8xj",
    paint: {
      "fill-outline-color": "#000000",
      "fill-opacity": 0.7,
      "fill-color": [
        "step",
        ["get", "Temperatura Média"],
        "#FFFFB2",
        27.5,
        "#FECC5C",
        27.8,
        "#FD8D3C",
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
        "step",
        ["get", "PM 10 Média"],
        "#FFFFB2",
        33,
        "#FECC5C",
        36,
        "#FD8D3C",
      ],
    },
    layout: {
      visibility: "none",
    },
    slot: "",
  },
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
        "step",
        ["get", "PM 10 Média"],
        "#FFFFB2",
        33,
        "#FECC5C",
        36,
        "#FD8D3C",
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

// Format a number the way the site writes it: decimal comma, thousands dot,
// at most one decimal place.
const numberFormat = new Intl.NumberFormat("pt-BR", {
  maximumFractionDigits: 1,
});

export function formatNumber(value: number): string {
  return numberFormat.format(value);
}

const formatStop = (value: unknown): string =>
  typeof value === "number" ? formatNumber(value) : String(value);

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
      value: `< ${formatStop(stops[0])}`,
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
        value:
          nextValue !== undefined
            ? `${formatStop(value)} a ${formatStop(nextValue)}`
            : `${formatStop(value)}+`,
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
        value: formatStop(value),
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

    // Nested color scale (e.g. typeof check wrapping an interpolate). The
    // case fallback then colors the features without a value.
    if (Array.isArray(output)) {
      const nested = extractLegendFromExpression(output);
      if (nested?.length) {
        legendItems.push(...nested);
        const fallback = expression[expression.length - 1];
        if (typeof fallback === "string" && fallback.startsWith("#")) {
          legendItems.push({
            color: fallback,
            label: "Sem dado",
            value: "Sem dado",
          });
        }
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
