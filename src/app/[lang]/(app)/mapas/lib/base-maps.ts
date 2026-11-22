// Mapas base do geoportal. Todos são estilos Mapbox: o custo é o map load,
// igual para qualquer estilo, e os tiles já vêm incluídos nele.
//
// Sem imports: os testes carregam o arquivo por transpile.

export const BASE_MAP_IDS = ["light", "dark", "satellite"] as const;

export type BaseMapId = (typeof BASE_MAP_IDS)[number];

export const DEFAULT_BASE_MAP: BaseMapId = "light";

export const BASE_MAP_STYLES: Record<BaseMapId, string> = {
  // Estilo do Observatório no Studio (baseado no Mapbox Standard).
  light: "mapbox://styles/observatorio-nacional/cmhrp434x002301s23n36fphx",
  dark: "mapbox://styles/mapbox/dark-v11",
  satellite: "mapbox://styles/mapbox/satellite-streets-v12",
};

export function isBaseMapId(value: unknown): value is BaseMapId {
  return (
    typeof value === "string" &&
    (BASE_MAP_IDS as readonly string[]).includes(value)
  );
}
