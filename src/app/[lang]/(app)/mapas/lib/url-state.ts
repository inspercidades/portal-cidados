// Estado do geoportal na URL. Toda a visualização cabe na query string, então o
// link copiado ou compartilhado reabre o mesmo mapa.
//
//   ?city=São Paulo&layers=a,b&opacity=a:50
//   ?city=São Paulo&compare=1&layer1=a&layer2=b&view=split
//   &theme=dark|satellite&terrain=1&zoom=…&bearing=…&pitch=…&lat=…&lng=…
//
// Links antigos continuam válidos: `theme=light`, `compare=1` com `layer1/2` e
// os parâmetros de câmera têm o mesmo formato de antes.
//
// Sem imports em runtime: os testes carregam o arquivo por transpile.

import type { CompareView, GeoportalState } from "./geoportal-state";

export interface MapCamera {
  center: [number, number];
  zoom: number;
  bearing: number;
  pitch: number;
}

export interface ParseOptions {
  /** Cidade válida → ids das camadas dela. */
  cityLayers: Record<string, readonly string[]>;
  baseMaps: readonly string[];
  defaultBaseMap: string;
}

export interface ParsedGeoportalUrl {
  state: GeoportalState;
  /** Câmera da URL, se completa o bastante para posicionar o mapa. */
  camera: Partial<MapCamera> | null;
}

export const MAX_PITCH = 85;

function finite(value: string | null): number | null {
  if (value === null || value.trim() === "") return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

/** Leva o ângulo para (-180, 180]. */
function normalizeBearing(value: number) {
  const wrapped = ((((value + 180) % 360) + 360) % 360) - 180;
  return wrapped === -180 ? 180 : wrapped;
}

function parseIdList(value: string | null): string[] {
  if (!value) return [];
  return [
    ...new Set(
      value
        .split(",")
        .map((id) => id.trim())
        .filter(Boolean),
    ),
  ];
}

/** `a:80,b:50` → `{ a: 80, b: 50 }`, só com valores entre 0 e 100. */
function parseOpacity(value: string | null): Record<string, number> {
  const result: Record<string, number> = {};
  if (!value) return result;
  for (const pair of value.split(",")) {
    const separator = pair.lastIndexOf(":");
    if (separator <= 0) continue;
    const id = pair.slice(0, separator).trim();
    const opacity = finite(pair.slice(separator + 1));
    if (id && opacity !== null) result[id] = clamp(Math.round(opacity), 0, 100);
  }
  return result;
}

function parseCamera(params: URLSearchParams): Partial<MapCamera> | null {
  const lat = finite(params.get("lat"));
  const lng = finite(params.get("lng"));
  const zoom = finite(params.get("zoom"));
  const bearing = finite(params.get("bearing"));
  const pitch = finite(params.get("pitch"));

  const camera: Partial<MapCamera> = {};
  if (lat !== null && lng !== null) {
    camera.center = [clamp(lng, -180, 180), clamp(lat, -85.0511, 85.0511)];
  }
  if (zoom !== null) camera.zoom = clamp(zoom, 0, 22);
  if (bearing !== null) camera.bearing = normalizeBearing(bearing);
  if (pitch !== null) camera.pitch = clamp(pitch, 0, MAX_PITCH);

  return Object.keys(camera).length > 0 ? camera : null;
}

export function parseGeoportalUrl(
  params: URLSearchParams,
  options: ParseOptions,
): ParsedGeoportalUrl {
  const rawCity = params.get("city");
  const city = rawCity && rawCity in options.cityLayers ? rawCity : null;
  const known = new Set(city ? options.cityLayers[city] : []);
  const onlyKnown = (id: string | null) => (id && known.has(id) ? id : null);

  const compare = params.get("compare") === "1";
  const left = onlyKnown(params.get("layer1"));
  const rightCandidate = onlyKnown(params.get("layer2"));
  const right = rightCandidate !== left ? rightCandidate : null;
  const layers = compare
    ? []
    : parseIdList(params.get("layers")).filter((id) => known.has(id));

  const active = new Set(compare ? [left, right] : layers);
  const opacity = Object.fromEntries(
    Object.entries(parseOpacity(params.get("opacity"))).filter(([id]) =>
      active.has(id),
    ),
  );

  const theme = params.get("theme");
  const baseMap =
    theme && options.baseMaps.includes(theme) ? theme : options.defaultBaseMap;
  const view: CompareView = params.get("view") === "split" ? "split" : "swipe";

  return {
    state: {
      city,
      layers,
      opacity,
      baseMap,
      terrain: params.get("terrain") === "1",
      compare: {
        enabled: compare,
        view,
        left: compare ? left : null,
        right: compare ? right : null,
      },
    },
    camera: parseCamera(params),
  };
}

export function serializeGeoportalUrl(
  state: GeoportalState,
  camera: MapCamera | null,
  defaults: { baseMap: string; opacity: number },
): URLSearchParams {
  const params = new URLSearchParams();
  if (state.city) params.set("city", state.city);

  let active: string[];
  if (state.compare.enabled) {
    params.set("compare", "1");
    if (state.compare.left) params.set("layer1", state.compare.left);
    if (state.compare.right) params.set("layer2", state.compare.right);
    if (state.compare.view === "split") params.set("view", "split");
    active = [state.compare.left, state.compare.right].filter(
      (id): id is string => id !== null,
    );
  } else {
    if (state.layers.length) params.set("layers", state.layers.join(","));
    active = state.layers;
  }

  const opacity = active
    .filter(
      (id) => id in state.opacity && state.opacity[id] !== defaults.opacity,
    )
    .map((id) => `${id}:${state.opacity[id]}`);
  if (opacity.length) params.set("opacity", opacity.join(","));

  if (state.baseMap !== defaults.baseMap) params.set("theme", state.baseMap);
  if (state.terrain) params.set("terrain", "1");

  if (camera) {
    params.set("zoom", camera.zoom.toFixed(4));
    params.set("bearing", camera.bearing.toFixed(2));
    params.set("pitch", camera.pitch.toFixed(2));
    params.set("lat", camera.center[1].toFixed(5));
    params.set("lng", camera.center[0].toFixed(5));
  }

  return params;
}
