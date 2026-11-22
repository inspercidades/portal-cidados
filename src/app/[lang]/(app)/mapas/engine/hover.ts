import mapboxgl from "mapbox-gl";
import {
  buildHoverFilter,
  createHoverOutlineLayer,
  getHoverOutlineLayerId,
  NO_HOVER_FILTER,
} from "../lib/hover-outline";
import { formatNumber } from "../lib/layer-styles";

const HIDDEN_PROPERTIES = new Set(["id", "geometry", "type", "coordinates"]);
const MAX_PROPERTIES = 8;

interface HoverableLayer {
  id: string;
  name: string;
  sourceLayer: string;
}

type PropertyRow = [label: string, value: string];

function propertyRows(
  properties: Record<string, unknown> | null,
): PropertyRow[] {
  return Object.entries(properties ?? {})
    .filter(
      ([key, value]) =>
        !HIDDEN_PROPERTIES.has(key.toLowerCase()) &&
        value !== null &&
        value !== undefined &&
        value !== "",
    )
    .slice(0, MAX_PROPERTIES)
    .map(([key, value]) => [
      key.replace(/_/g, " "),
      typeof value === "number" ? formatNumber(value) : String(value),
    ]);
}

/** Conteúdo do popup em nós de texto: os valores vêm do tileset e não são HTML. */
function renderPopup(title: string, rows: PropertyRow[]): HTMLElement {
  const root = document.createElement("div");
  root.className = "min-w-50 p-2 text-foreground";

  const heading = document.createElement("p");
  heading.className = "mb-2 text-sm font-semibold";
  heading.textContent = title;
  root.append(heading);

  const list = document.createElement("dl");
  list.className = "space-y-1";
  for (const [label, value] of rows) {
    const row = document.createElement("div");
    row.className = "flex items-center justify-between gap-3 text-xs";
    const term = document.createElement("dt");
    term.className = "font-medium text-muted-foreground first-letter:uppercase";
    term.textContent = `${label}:`;
    const detail = document.createElement("dd");
    detail.className = "rounded-[4px] bg-muted px-2 py-1";
    detail.textContent = value;
    row.append(term, detail);
    list.append(row);
  }
  root.append(list);
  return root;
}

/**
 * Um popup por mapa. Com camadas sobrepostas, cada uma recebe o evento do
 * cursor; só a de cima mostra os atributos.
 */
export class HoverPopup {
  private popup: mapboxgl.Popup | null = null;
  private owner: string | null = null;
  private shownKey: string | null = null;

  constructor(private readonly map: mapboxgl.Map) {}

  show(
    owner: string,
    lngLat: mapboxgl.LngLatLike,
    title: string,
    rows: PropertyRow[],
  ) {
    this.popup ??= new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
      maxWidth: "400px",
    });
    const key = `${owner}\n${JSON.stringify(rows)}`;
    if (key !== this.shownKey) {
      this.shownKey = key;
      this.popup.setDOMContent(renderPopup(title, rows));
    }
    this.owner = owner;
    this.popup.setLngLat(lngLat);
    if (!this.popup.isOpen()) this.popup.addTo(this.map);
  }

  /** Fecha se o popup aberto for de `owner` (ou de qualquer um, sem argumento). */
  hide(owner?: string) {
    if (owner !== undefined && owner !== this.owner) return;
    this.popup?.remove();
    this.owner = null;
    this.shownKey = null;
  }
}

interface HoverContext {
  popup: HoverPopup;
  /** Id da camada de dados desenhada por cima no ponto, se houver. */
  topLayerAt: (point: mapboxgl.Point) => string | null;
}

/**
 * Atributos e contorno do polígono sob o cursor, para a camada de cima. Em
 * telas de toque, o toque faz o papel do hover. Devolve a função que desfaz tudo.
 */
export function attachHover(
  map: mapboxgl.Map,
  layer: HoverableLayer,
  context: HoverContext,
): () => void {
  const outlineId = getHoverOutlineLayerId(layer.id);

  // Polígonos ganham contorno numa camada de linha à parte, filtrada pelo
  // polígono sob o cursor.
  if (map.getLayer(layer.id)?.type === "fill" && !map.getLayer(outlineId)) {
    try {
      map.addLayer(
        createHoverOutlineLayer(
          layer.id,
          layer.sourceLayer,
        ) as mapboxgl.AnyLayer,
      );
    } catch (error) {
      // Só cosmético: não pode impedir a camada de carregar.
      console.error(`[geoportal] contorno de ${layer.id}:`, error);
    }
  }

  let outlinedKey: string | null = null;

  const setOutline = (feature: mapboxgl.MapboxGeoJSONFeature | null) => {
    if (!map.getLayer(outlineId)) return;
    const filter = feature ? buildHoverFilter(feature) : null;
    const key = filter ? JSON.stringify(filter) : null;
    // Trocar o filtro faz o Mapbox reprocessar os tiles: só quando muda o polígono.
    if (key === outlinedKey) return;
    const wasOutlined = outlinedKey !== null;
    outlinedKey = key;
    map.setFilter(
      outlineId,
      (filter ?? NO_HOVER_FILTER) as mapboxgl.FilterSpecification,
    );
    // Camadas acima desta cobririam o contorno.
    if (key !== null && !wasOutlined) map.moveLayer(outlineId);
  };

  const onEnter = () => {
    map.getCanvas().style.cursor = "pointer";
  };

  const onLeave = () => {
    map.getCanvas().style.cursor = "";
    setOutline(null);
    context.popup.hide(layer.id);
  };

  const onPoint = (event: mapboxgl.MapLayerMouseEvent) => {
    const feature = event.features?.[0];
    if (!feature || context.topLayerAt(event.point) !== layer.id) {
      // Outra camada está por cima neste ponto: ela responde.
      setOutline(null);
      context.popup.hide(layer.id);
      return;
    }
    setOutline(feature);

    const rows = propertyRows(feature.properties as Record<string, unknown>);
    if (rows.length === 0) context.popup.hide(layer.id);
    else context.popup.show(layer.id, event.lngLat, layer.name, rows);
  };

  map.on("mouseenter", layer.id, onEnter);
  map.on("mouseleave", layer.id, onLeave);
  map.on("mousemove", layer.id, onPoint);
  map.on("click", layer.id, onPoint);

  return () => {
    map.off("mouseenter", layer.id, onEnter);
    map.off("mouseleave", layer.id, onLeave);
    map.off("mousemove", layer.id, onPoint);
    map.off("click", layer.id, onPoint);
    context.popup.hide(layer.id);
    // O contorno lê a fonte da camada base, então sai antes dela.
    if (map.getLayer(outlineId)) map.removeLayer(outlineId);
  };
}
