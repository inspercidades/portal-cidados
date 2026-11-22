// Busca de endereço (Mapbox Geocoding v6), restrita ao município escolhido.
//
// O `bbox` da Mapbox é um retângulo e traz ruas de cidades vizinhas
// (Osasco e Guarulhos em São Paulo, Nova Iguaçu no Rio). Por isso cada resultado
// também precisa estar no município, conferido pelo Wikidata do `context.place`.
//
// Custo: geocoding temporário, gratuito até 100 mil requisições/mês. Os termos
// proíbem guardar o resultado, então não há cache; o consumo é contido com
// debounce, mínimo de caracteres e cancelamento da requisição anterior.
//
// Sem imports: os testes carregam o arquivo por transpile.

export const GEOCODING_ENDPOINT =
  "https://api.mapbox.com/search/geocode/v6/forward";

export const MIN_QUERY_LENGTH = 3;

/** A API aceita até 10. Pedimos o máximo porque o filtro por município descarta parte. */
const REQUEST_LIMIT = 10;
export const MAX_RESULTS = 5;

/** Endereço, rua, bairro, distrito e CEP. Cidade, estado e país ficam de fora. */
const FEATURE_TYPES = "address,street,neighborhood,locality,postcode";

export interface GeocodeArea {
  bbox: [number, number, number, number];
  center: [number, number];
  wikidataId: string;
}

export interface AddressResult {
  id: string;
  name: string;
  /** Bairro, cidade e CEP, como a Mapbox formata. */
  context: string;
  center: [number, number];
  /** Só em bairros, distritos e CEPs: dá para enquadrar a área inteira. */
  bbox?: [number, number, number, number];
}

export function normalizeQuery(query: string): string {
  return query.trim().replace(/\s+/g, " ");
}

export function buildGeocodeUrl(options: {
  query: string;
  token: string;
  area: GeocodeArea;
  language: string;
}): string | null {
  const query = normalizeQuery(options.query);
  if (query.length < MIN_QUERY_LENGTH || !options.token) return null;

  const params = new URLSearchParams({
    q: query,
    access_token: options.token,
    country: "br",
    bbox: options.area.bbox.join(","),
    proximity: options.area.center.join(","),
    types: FEATURE_TYPES,
    language: options.language,
    limit: String(REQUEST_LIMIT),
    autocomplete: "true",
  });
  return `${GEOCODING_ENDPOINT}?${params.toString()}`;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isLngLat(value: unknown): value is [number, number] {
  return (
    Array.isArray(value) &&
    value.length >= 2 &&
    Number.isFinite(value[0]) &&
    Number.isFinite(value[1])
  );
}

function isBBox(value: unknown): value is [number, number, number, number] {
  return (
    Array.isArray(value) &&
    value.length === 4 &&
    value.every((part) => Number.isFinite(part))
  );
}

/** Resultados dentro do município `wikidataId`, sem repetir o mesmo texto. */
export function parseGeocodeResponse(
  payload: unknown,
  wikidataId: string,
): AddressResult[] {
  if (!isRecord(payload) || !Array.isArray(payload.features)) return [];

  const results: AddressResult[] = [];
  const seen = new Set<string>();

  for (const feature of payload.features) {
    if (!isRecord(feature) || !isRecord(feature.properties)) continue;
    const properties = feature.properties;
    const context = isRecord(properties.context) ? properties.context : null;
    const place = context && isRecord(context.place) ? context.place : null;
    if (!place || place.wikidata_id !== wikidataId) continue;

    const geometry = isRecord(feature.geometry) ? feature.geometry : null;
    const center = geometry?.coordinates;
    const name = typeof properties.name === "string" ? properties.name : "";
    if (!isLngLat(center) || !name) continue;

    const formatted =
      typeof properties.place_formatted === "string"
        ? properties.place_formatted
        : "";
    const key = `${name}|${formatted}`;
    if (seen.has(key)) continue;
    seen.add(key);

    results.push({
      id:
        typeof properties.mapbox_id === "string"
          ? properties.mapbox_id
          : String(feature.id ?? key),
      name,
      context: formatted,
      center: [center[0], center[1]],
      bbox: isBBox(properties.bbox) ? properties.bbox : undefined,
    });
    if (results.length === MAX_RESULTS) break;
  }

  return results;
}
