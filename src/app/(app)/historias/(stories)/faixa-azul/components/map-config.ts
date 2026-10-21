export const MAPBOX_STYLE =
  "mapbox://styles/observatorio-nacional/cmr6qsef7000401s110l04iqn";

export const PRIMEIRA_IMPLANTACAO_SOURCE_ID = "faixa-azul-primeira-implantacao";
export const PRIMEIRA_IMPLANTACAO_LAYER_ID =
  "faixa-azul-primeira-implantacao-line";
export const TRECHOS_LAYER_ID = "faixa-azul-trechos-spo";

export const PRIMEIRA_IMPLANTACAO_GEOJSON = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: [
          [-46.6412004, -23.5728759],
          [-46.6410665, -23.5710109],
          [-46.6407988, -23.5672809],
          [-46.6406114, -23.5642869],
          [-46.6401563, -23.5624218],
          [-46.6378002, -23.5570227],
          [-46.6367752, -23.5536951],
          [-46.6367325, -23.5524815],
          [-46.6374586, -23.551307],
          [-46.6385262, -23.5495061],
          [-46.6387825, -23.5488797],
          [-46.6387398, -23.5480967],
          [-46.6381419, -23.5472354],
        ],
      },
    },
  ],
} as const;

const primeiraImplantacaoCoords =
  PRIMEIRA_IMPLANTACAO_GEOJSON.features[0].geometry.coordinates;

function getLinePointAtRatio(
  coords: readonly (readonly [number, number])[],
  ratio: number,
): { longitude: number; latitude: number } {
  let totalLength = 0;
  const segmentLengths: number[] = [];

  for (let i = 1; i < coords.length; i++) {
    const dx = coords[i][0] - coords[i - 1][0];
    const dy = coords[i][1] - coords[i - 1][1];
    const length = Math.hypot(dx, dy);
    segmentLengths.push(length);
    totalLength += length;
  }

  const target = totalLength * ratio;
  let accumulated = 0;

  for (let i = 0; i < segmentLengths.length; i++) {
    const segmentLength = segmentLengths[i];
    if (accumulated + segmentLength >= target) {
      const t = (target - accumulated) / segmentLength;
      return {
        longitude: coords[i][0] + t * (coords[i + 1][0] - coords[i][0]),
        latitude: coords[i][1] + t * (coords[i + 1][1] - coords[i][1]),
      };
    }
    accumulated += segmentLength;
  }

  const last = coords[coords.length - 1];
  return { longitude: last[0], latitude: last[1] };
}

/** Ponto médio da linha da primeira implantação (âncora da legenda) */
export const PRIMEIRA_IMPLANTACAO_LABEL_ANCHOR = getLinePointAtRatio(
  primeiraImplantacaoCoords,
  0.5,
);

export const PRIMEIRA_IMPLANTACAO_LABEL_TEXT = "Primeira faixa azul implantada";

export const TRECHOS_LINE_PAINT = {
  "line-color": "hsl(232, 63%, 27%)",
  "line-width": ["interpolate", ["exponential", 1.5], ["zoom"], 0, 0.5, 16, 20],
} as const;

export const TRECHOS_LINE_LAYOUT = {
  "line-cap": "round",
  "line-join": "round",
} as const;

export interface MapPhase {
  longitude: number;
  latitude: number;
  zoom: number;
  mobile?: Partial<Pick<MapPhase, "longitude" | "latitude" | "zoom">>;
}

export const MOBILE_BREAKPOINT = 768;

export const isMobileViewport = () =>
  typeof window !== "undefined" && window.innerWidth < MOBILE_BREAKPOINT;

export function getPhaseView(phase: MapPhase): {
  longitude: number;
  latitude: number;
  zoom: number;
} {
  const isMobile = isMobileViewport();
  const mobile = isMobile ? phase.mobile : undefined;
  return {
    longitude: mobile?.longitude ?? phase.longitude,
    latitude: mobile?.latitude ?? phase.latitude,
    zoom: mobile?.zoom ?? phase.zoom,
  };
}

/** Fase A — primeira implantação (linha GeoJSON manual) */
export const MAP_PHASE_A: MapPhase = {
  longitude: -46.63556,
  latitude: -23.56262,
  zoom: 13.56,
};

/** Fase B — visão city-wide com trechos Faixa Azul */
export const MAP_PHASE_B: MapPhase = {
  longitude: -46.5768,
  latitude: -23.6209,
  zoom: 10.6,
  mobile: {
    longitude: -46.6298,
    latitude: -23.59,
    zoom: 10.08,
  },
};

export const TRECHOS_LAYER_HIDDEN_OPACITY = 0;
export const TRECHOS_LAYER_VISIBLE_OPACITY = 1;

export const FLY_TO_DURATION_MS = 2000;
