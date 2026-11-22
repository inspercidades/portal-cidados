import mapboxgl from "mapbox-gl";
import type { CityLayer } from "../lib/city-layers";
import { getHoverOutlineLayerId } from "../lib/hover-outline";
import { createStyledLayer } from "../lib/layer-styles";
import type { MapCamera } from "../lib/url-state";
import { attachHover, HoverPopup } from "./hover";

type LayerType = NonNullable<CityLayer["layerType"]>;
type SetStyleOptions = Parameters<mapboxgl.Map["setStyle"]>[1];

/** Uma camada de dados como o mapa precisa dela. */
export interface DataLayer {
  id: string;
  name: string;
  tilesetId: string;
  sourceLayer: string;
  layerType: LayerType;
  /** 0–100 */
  opacity: number;
}

export interface GeoMapOptions {
  container: HTMLElement;
  style: string;
  camera: MapCamera;
  terrain: boolean;
  onLayerError: (layerId: string) => void;
  onMapError: () => void;
}

interface AppliedLayer {
  detachHover: () => void;
  opacity: number | null;
}

const TERRAIN_SOURCE = "geoportal-terrain-dem";
/** Relevo moderado: bem visível no Rio, discreto no planalto paulistano. */
const TERRAIN_EXAGGERATION = 1.5;
const FALLBACK_COLOR = "#007cbf";

const OPACITY_PROPERTIES: Record<LayerType, readonly string[]> = {
  fill: ["fill-opacity"],
  line: ["line-opacity"],
  circle: ["circle-opacity"],
  symbol: ["text-opacity", "icon-opacity"],
};

/** Estilo das camadas sem entrada em `layer-styles.ts` (sourceLayer sem estilo). */
const FALLBACK_PAINT: Record<LayerType, Record<string, unknown>> = {
  fill: { "fill-color": FALLBACK_COLOR, "fill-outline-color": "#000000" },
  line: { "line-color": FALLBACK_COLOR, "line-width": 2 },
  circle: { "circle-color": FALLBACK_COLOR, "circle-radius": 5 },
  symbol: { "text-color": FALLBACK_COLOR },
};

function buildLayer(layer: DataLayer): mapboxgl.AnyLayer {
  const styled = createStyledLayer(
    layer.id,
    layer.sourceLayer,
    layer.tilesetId,
  );
  if (styled) {
    return {
      ...styled,
      layout: { ...styled.layout, visibility: "visible" },
    } as mapboxgl.AnyLayer;
  }
  return {
    id: layer.id,
    type: layer.layerType,
    source: layer.id,
    "source-layer": layer.sourceLayer,
    layout: { visibility: "visible" },
    paint: FALLBACK_PAINT[layer.layerType],
  } as mapboxgl.AnyLayer;
}

function errorStatus(error: unknown): number | undefined {
  if (typeof error !== "object" || error === null) return undefined;
  const status = (error as { status?: unknown }).status;
  return typeof status === "number" ? status : undefined;
}

/**
 * Uma instância do Mapbox e o que o geoportal desenha nela.
 *
 * O componente diz o que quer (mapa base, relevo, camadas na ordem) e o
 * controlador aplica a diferença. Trocar o mapa base apaga do Mapbox as fontes,
 * camadas e o relevo; no `style.load` seguinte tudo é recolocado a partir do
 * estado desejado. É o único caminho que adiciona ou remove camadas.
 */
export class GeoMapController {
  readonly map: mapboxgl.Map;
  private readonly options: GeoMapOptions;
  private readonly resizeObserver: ResizeObserver;
  private style: string;
  private styleReady = false;
  private terrain: boolean;
  private terrainApplied = false;
  private layers: DataLayer[] = [];
  private readonly applied = new Map<string, AppliedLayer>();
  private readonly hover: {
    popup: HoverPopup;
    topLayerAt: (point: mapboxgl.Point) => string | null;
  };
  private appliedOrder = "";
  private reportedError = false;

  constructor(options: GeoMapOptions) {
    this.options = options;
    this.style = options.style;
    this.terrain = options.terrain;
    this.map = new mapboxgl.Map({
      container: options.container,
      style: options.style,
      center: options.camera.center,
      zoom: options.camera.zoom,
      bearing: options.camera.bearing,
      pitch: options.camera.pitch,
    });
    this.hover = {
      popup: new HoverPopup(this.map),
      topLayerAt: (point) => {
        const ids = [...this.applied.keys()];
        if (ids.length === 0) return null;
        // `queryRenderedFeatures` devolve primeiro o que está desenhado por cima.
        const [top] = this.map.queryRenderedFeatures(point, { layers: ids });
        return top?.layer?.id ?? null;
      },
    };
    this.map.on("style.load", this.handleStyleLoad);
    this.map.on("error", this.handleError);

    // O GL JS só escuta o resize da janela. A sidebar, a apresentação e o modo
    // lado a lado mudam o tamanho do contêiner sem mexer na janela.
    this.resizeObserver = new ResizeObserver(() => this.map.resize());
    this.resizeObserver.observe(options.container);
  }

  getCamera(): MapCamera {
    const center = this.map.getCenter();
    return {
      center: [center.lng, center.lat],
      zoom: this.map.getZoom(),
      bearing: this.map.getBearing(),
      pitch: this.map.getPitch(),
    };
  }

  setStyle(style: string) {
    if (style === this.style) return;
    this.style = style;
    this.styleReady = false;
    // Sem diff: o estilo novo carrega do zero e dispara um único `style.load`.
    // O tipo exige as fontes locais, mas o GL JS completa com as do mapa.
    this.map.setStyle(style, { diff: false } as SetStyleOptions);
  }

  setTerrain(on: boolean) {
    if (on === this.terrain) return;
    this.terrain = on;
    if (this.styleReady) this.syncTerrain();
  }

  /** Camadas na ordem de desenho: a primeira fica embaixo. */
  setLayers(layers: DataLayer[]) {
    this.layers = layers;
    if (this.styleReady) this.syncLayers();
  }

  destroy() {
    this.resizeObserver.disconnect();
    for (const entry of this.applied.values()) entry.detachHover();
    this.applied.clear();
    this.map.remove();
  }

  private handleStyleLoad = () => {
    this.styleReady = true;
    // O estilo anterior levou camadas e relevo, mas não os listeners por camada.
    for (const entry of this.applied.values()) entry.detachHover();
    this.applied.clear();
    this.appliedOrder = "";
    this.terrainApplied = false;
    this.syncTerrain();
    this.syncLayers();
  };

  private handleError = (event: { error?: unknown }) => {
    console.error("[geoportal] Mapbox:", event.error);
    const status = errorStatus(event.error);
    // Token inválido ou sem permissão: o mapa não vai aparecer, então avisa uma vez.
    if ((status === 401 || status === 403) && !this.reportedError) {
      this.reportedError = true;
      this.options.onMapError();
    }
  };

  private syncTerrain() {
    if (this.terrain) {
      if (!this.map.getSource(TERRAIN_SOURCE)) {
        this.map.addSource(TERRAIN_SOURCE, {
          type: "raster-dem",
          url: "mapbox://mapbox.mapbox-terrain-dem-v1",
          tileSize: 512,
          maxzoom: 14,
        });
      }
      this.map.setTerrain({
        source: TERRAIN_SOURCE,
        exaggeration: TERRAIN_EXAGGERATION,
      });
      this.terrainApplied = true;
    } else if (this.terrainApplied) {
      this.map.setTerrain(null);
      if (this.map.getSource(TERRAIN_SOURCE))
        this.map.removeSource(TERRAIN_SOURCE);
      this.terrainApplied = false;
    }
  }

  private syncLayers() {
    const wanted = new Set(this.layers.map((layer) => layer.id));

    for (const [id, entry] of this.applied) {
      if (wanted.has(id)) continue;
      entry.detachHover();
      this.removeFromMap(id);
      this.applied.delete(id);
    }

    for (const layer of this.layers) {
      let entry = this.applied.get(layer.id);
      if (!entry) {
        try {
          if (!this.map.getSource(layer.id)) {
            this.map.addSource(layer.id, {
              type: "vector",
              url: `mapbox://${layer.tilesetId}`,
            });
          }
          this.map.addLayer(buildLayer(layer));
          entry = {
            detachHover: attachHover(this.map, layer, this.hover),
            opacity: null,
          };
          this.applied.set(layer.id, entry);
        } catch (error) {
          console.error(`[geoportal] camada ${layer.id}:`, error);
          this.removeFromMap(layer.id);
          this.options.onLayerError(layer.id);
          continue;
        }
      }
      if (entry.opacity !== layer.opacity) {
        this.applyOpacity(layer);
        entry.opacity = layer.opacity;
      }
    }

    this.syncOrder();
  }

  private syncOrder() {
    const order = this.layers
      .map((layer) => layer.id)
      .filter((id) => this.applied.has(id));
    const key = order.join("\n");
    if (key === this.appliedOrder) return;
    this.appliedOrder = key;

    // De baixo para cima, cada camada vai para o topo; o contorno vai logo acima dela.
    for (const id of order) {
      this.map.moveLayer(id);
      const outlineId = getHoverOutlineLayerId(id);
      if (this.map.getLayer(outlineId)) this.map.moveLayer(outlineId);
    }
  }

  private applyOpacity(layer: DataLayer) {
    const type = this.map.getLayer(layer.id)?.type as LayerType | undefined;
    if (!type || !(type in OPACITY_PROPERTIES)) return;
    for (const property of OPACITY_PROPERTIES[type]) {
      this.map.setPaintProperty(
        layer.id,
        property as "fill-opacity",
        layer.opacity / 100,
      );
    }
  }

  private removeFromMap(id: string) {
    if (this.map.getLayer(id)) this.map.removeLayer(id);
    if (this.map.getSource(id)) this.map.removeSource(id);
  }
}
