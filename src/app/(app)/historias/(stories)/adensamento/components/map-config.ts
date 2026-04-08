export interface MapViewState {
  center: [number, number]; // [lng, lat] for Mapbox
  zoom: number;
  pitch?: number;
  bearing?: number;
  duration?: number; // in seconds
}

export interface ChapterMapConfig {
  desktop: MapViewState;
  mobile: MapViewState;
}

export type LegendType =
  | "density-pop"
  | "density-const"
  | "eetu"
  | "informal"
  | null;

// ---------------------------------------------------------------------------
// Layer opacity management
// ---------------------------------------------------------------------------

export interface ManagedLayer {
  id: string;
  opacityProperty: "fill-opacity" | "line-opacity" | "heatmap-opacity";
  /** Opacity applied when the layer is "on". 0 is always used when "off". */
  activeOpacity: number;
}

/** All Mapbox layers controlled by the scrollytelling (set to opacity 0 in Studio). */
export const MANAGED_LAYERS: ManagedLayer[] = [
  { id: "dens-demografica-spo", opacityProperty: "fill-opacity", activeOpacity: 1 },
  { id: "highlight", opacityProperty: "fill-opacity", activeOpacity: 0.35 },
  { id: "favelas-spo", opacityProperty: "fill-opacity", activeOpacity: 1 },
  { id: "lotes-irregulares", opacityProperty: "fill-opacity", activeOpacity: 1 },
  { id: "pop-hab-nao-cadastrada", opacityProperty: "heatmap-opacity", activeOpacity: 1 },
  { id: "zoning-zeu-eetu", opacityProperty: "fill-opacity", activeOpacity: 1 },
  { id: "linha-trem", opacityProperty: "line-opacity", activeOpacity: 1 },
  { id: "linha-metro", opacityProperty: "line-opacity", activeOpacity: 1 },
  { id: "corredor-onibus", opacityProperty: "line-opacity", activeOpacity: 1 },
  { id: "dens-construtiva-spo", opacityProperty: "fill-opacity", activeOpacity: 1 },
];

/**
 * Paint + filter for `dens-construtiva-spo` (source-layer `dens_construtiva_spo`).
 * Applied on map load so the map matches the intended ramp without republishing Studio.
 */
export const DENS_CONSTRUTIVA_SPO_LAYER_PATCH = {
  fillColor: [
    "interpolate",
    ["linear"],
    ["get", "densidade_construtiva"],
    0.15,
    "#d1f1ea",
    0.28,
    "#abe6d6",
    0.36,
    "#86dcc1",
    0.44,
    "#81d9be",
    0.52,
    "#7ed6ba",
    0.67,
    "#7bd2b7",
    1.15,
    "#62bb9f",
    2.23,
    "#48a286",
    3.9,
    "#2d896d",
    18,
    "#1d7a5d",
  ],
  fillOutlineColor: "#000000",
  filter: ["has", "densidade_construtiva"],
} as const;

// ---------------------------------------------------------------------------
// Map positions
// ---------------------------------------------------------------------------

export const MAP_POSITIONS: Record<string, ChapterMapConfig> = {
  // capa: {
  //   desktop: { center: [-46.6333, -23.5505], zoom: 11, duration: 6 },
  //   mobile: { center: [-46.6333, -23.5505], zoom: 11, duration: 6 },
  // },
  mapa_zero: {
    desktop: { center: [-46.6383, -23.565], zoom: 10.2, duration: 6 },
    mobile: { center: [-46.6083, -23.595], zoom: 9.7, duration: 6 },
  },
  mapa_um: {
    desktop: { center: [-46.7383, -23.595], zoom: 10.2, duration: 4 },
    mobile: { center: [-46.6383, -23.565], zoom: 10.0, duration: 4 },
  },
  mapa_mais_um: {
    desktop: { center: [-46.6683, -23.551], zoom: 12.8, duration: 4 },
    mobile: { center: [-46.6483, -23.545], zoom: 12.0, duration: 4 },
  },
  mapa_dois: {
    desktop: { center: [-46.7311, -23.6156], zoom: 14.8, duration: 4 },
    mobile: { center: [-46.7259, -23.6159], zoom: 14.0, duration: 4 },
  },
  mapa_dois_helio: {
    desktop: { center: [-46.6028, -23.6109], zoom: 14.7, duration: 4 },
    mobile: { center: [-46.5926, -23.61], zoom: 14.2, duration: 4 },
  },
  mapa_tres: {
    desktop: { center: [-46.7993, -23.595], zoom: 10, duration: 4 },
    mobile: { center: [-46.6083, -23.645], zoom: 10, duration: 4 },
  },
  mapa_quatro: {
    desktop: { center: [-46.7133, -23.5705], zoom: 11.5, duration: 4 },
    mobile: { center: [-46.6383, -23.545], zoom: 9.8, duration: 4 },
  },
  cep_capitulo: {
    desktop: { center: [-46.7133, -23.5705], zoom: 11.5, duration: 2 },
    mobile: { center: [-46.6383, -23.545], zoom: 9.8, duration: 2 },
  },
  mapa_cinco: {
    desktop: { center: [-46.7133, -23.5705], zoom: 11.5, duration: 4 },
    mobile: { center: [-46.6383, -23.665], zoom: 10.0, duration: 4 },
  },
  mapa_seis: {
    desktop: { center: [-46.7333, -23.5805], zoom: 10.8, duration: 4 },
    mobile: { center: [-46.6183, -23.555], zoom: 10.0, duration: 4 },
  },
  mapa_sete: {
    desktop: { center: [-46.7383, -23.595], zoom: 10.2, duration: 4 },
    mobile: { center: [-46.6383, -23.665], zoom: 10.0, duration: 4 },
  },
};

// ---------------------------------------------------------------------------
// Scroll triggers — each entry drives a flyTo, legend change, and layer state
// ---------------------------------------------------------------------------

export const MAP_FLY_TRIGGERS: {
  id: string;
  mapKey?: string;
  legend: LegendType;
  /** IDs of MANAGED_LAYERS that should be visible at this section. All others are hidden. */
  layers: string[];
}[] = [
  // { id: "capa", legend: null, layers: [] },
  // { id: "mapa_capitulo", legend: null, layers: [] },
  // ── Chapter 1 – densidade populacional
  { id: "mapa_zero", mapKey: "mapa_zero", legend: "density-pop", layers: ["dens-demografica-spo"] },
  {
    id: "mapa_um",
    mapKey: "mapa_um",
    legend: "density-pop",
    layers: ["dens-demografica-spo"],
  },
  {
    id: "mapa_mais_um",
    mapKey: "mapa_mais_um",
    legend: null,
    layers: ["highlight"],
  },
  {
    id: "mapa_dois",
    mapKey: "mapa_dois",
    legend: null,
    layers: ["highlight"],
  },
  {
    id: "mapa_dois_helio",
    mapKey: "mapa_dois_helio",
    legend: null,
    layers: ["highlight"],
  },
  // ── Chapter 2 – informalidade ────────────────────────────────────────────
  {
    id: "mapa_tres",
    mapKey: "mapa_tres",
    legend: "informal",
    layers: ["favelas-spo", "lotes-irregulares", "pop-hab-nao-cadastrada"],
  },
  // ── Chapter 3 – EETU ────────────────────────────────────────────────────
  {
    id: "mapa_quatro",
    mapKey: "mapa_quatro",
    legend: "eetu",
    layers: ["zoning-zeu-eetu", "linha-trem", "linha-metro", "corredor-onibus"],
  },
  {
    id: "cep_capitulo",
    mapKey: "cep_capitulo",
    legend: "eetu",
    layers: ["zoning-zeu-eetu", "linha-trem", "linha-metro", "corredor-onibus"],
  },
  {
    id: "mapa_cinco",
    mapKey: "mapa_cinco",
    legend: "eetu",
    layers: ["zoning-zeu-eetu", "linha-trem", "linha-metro", "corredor-onibus"],
  },
  // ── Transition – image overlay chapters (no map layers) ─────────────────
  { id: "cep_capitulo3a", legend: null, layers: [] },
  { id: "cep_blank2", legend: null, layers: [] },
  // ── Chapter 4 – densidade construtiva ───────────────────────────────────
  {
    id: "mapa_seis",
    mapKey: "mapa_seis",
    legend: "density-const",
    layers: ["dens-construtiva-spo"],
  },
  {
    id: "cep_capitulo5",
    legend: null,
    layers: ["dens-construtiva-spo"],
  },
  {
    id: "cep_capitulo6b",
    legend: null,
    layers: ["dens-construtiva-spo"],
  },
  // ── Chapter 5 – research results ────────────────────────────────────────
  {
    id: "mapa_sete",
    mapKey: "mapa_sete",
    legend: null,
    layers: [],
  },
  { id: "cep_capitulo7", legend: null, layers: [] },
  { id: "capitulo_final", legend: null, layers: [] },
  { id: "creditos", legend: null, layers: [] },
];

export const IMAGE_FADE_INS: Record<string, string[]> = {
  cep_capitulo: ["overlay-1"],
  cep_capitulo2: ["overlay-2"],
  cep_capitulo3a: ["overlay-3a"],
  cep_capitulo3b: ["overlay-3b"],
  cep_capitulo4: ["overlay-4"],
  cep_capitulo4b: ["overlay-4b"],
  cep_capitulo5: ["overlay-5"],
  cep_capitulo6: ["overlay-6"],
  cep_capitulo7: ["overlay-7"],
  cep_capitulo8: ["overlay-8"],
  cep_capitulo9: ["overlay-9"],
  cep_capitulo10: ["overlay-10"],
  cep_capitulo11: ["overlay-11"],
};

export const IMAGE_FADE_OUTS: Record<string, string[]> = {
  cep_blank1: ["overlay-1", "overlay-2"],
  cep_blank2: ["overlay-3a", "overlay-3b", "overlay-4", "overlay-4b"],
  cep_blank3: ["overlay-5", "overlay-6"],
};
