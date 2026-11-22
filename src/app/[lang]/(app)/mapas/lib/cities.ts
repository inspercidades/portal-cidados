// Cidades do geoportal: enquadramento inicial e limites usados na busca de
// endereço. É o único lugar com esses dados; `city-layers.ts` (gerado pelo
// pipeline R) continua dono das camadas de cada cidade.
//
// Sem imports: os testes carregam o arquivo por transpile, como `hover-outline.ts`.

/** [lng, lat] */
export type LngLat = [number, number];

/** [minLng, minLat, maxLng, maxLat] */
export type BBox = [number, number, number, number];

export interface CityView {
  center: LngLat;
  zoom: number;
}

export interface GeoportalCity extends CityView {
  /** Chave de `cityLayersConfig` e valor de `?city=`. Igual em pt e en. */
  name: string;
  /** Retângulo do município (Mapbox Geocoding). Inclui pedaços de vizinhos. */
  bbox: BBox;
  /**
   * Wikidata do município. O bbox é um retângulo, então a busca também
   * confere o município de cada resultado para descartar os vizinhos.
   */
  wikidataId: string;
}

export const CITIES: readonly GeoportalCity[] = [
  {
    name: "São Paulo",
    center: [-46.6388, -23.5505],
    zoom: 10.5,
    bbox: [-46.826199, -24.008431, -46.365084, -23.356294],
    wikidataId: "Q174",
  },
  {
    name: "Rio de Janeiro",
    center: [-43.43852, -22.91464],
    zoom: 10.5,
    bbox: [-43.804009, -23.107673, -43.073035, -22.721325],
    wikidataId: "Q8678",
  },
];

/** Enquadramento atrás do seletor de cidade, antes da escolha. */
export const BRAZIL_VIEW: CityView = {
  center: [-53.97005, -13.69895],
  zoom: 3.5,
};

export function findCity(
  name: string | null | undefined,
): GeoportalCity | null {
  if (!name) return null;
  return CITIES.find((city) => city.name === name) ?? null;
}

export function cityView(name: string | null | undefined): CityView {
  const city = findCity(name);
  return city ? { center: city.center, zoom: city.zoom } : BRAZIL_VIEW;
}
