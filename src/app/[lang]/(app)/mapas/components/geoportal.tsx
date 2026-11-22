"use client";

import "mapbox-gl/dist/mapbox-gl.css";
import {
  ArrowLeft,
  Box,
  Compass,
  Layers,
  Maximize2,
  Menu,
  Minus,
  Navigation,
  Plus,
  Share2,
  X,
} from "lucide-react";
import mapboxgl from "mapbox-gl";
import { useRouter } from "next/navigation";
import {
  type CSSProperties,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";
import { useShare } from "@/hooks/useShare";
import { chrome } from "@/i18n/messages/chrome";
import { useLocale, useLocaleHref } from "@/i18n/use-locale";
import { cn } from "@/lib/utils";
import type { DataLayer } from "../engine/map-controller";
import { useGeoportalMaps } from "../hooks/use-geoportal-maps";
import { useMediaQuery } from "../hooks/use-media-query";
import {
  BASE_MAP_IDS,
  BASE_MAP_STYLES,
  type BaseMapId,
  DEFAULT_BASE_MAP,
  isBaseMapId,
} from "../lib/base-maps";
import { cityView, findCity } from "../lib/cities";
import { resolveLayerMapView } from "../lib/city-layers";
import type { AddressResult } from "../lib/geocoding";
import {
  DEFAULT_OPACITY,
  type GeoportalState,
  geoportalReducer,
  opacityOf,
  visibleLayers,
} from "../lib/geoportal-state";
import type { GeoportalLayer, GeoportalLayersConfig } from "../lib/types";
import {
  type MapCamera,
  parseGeoportalUrl,
  serializeGeoportalUrl,
} from "../lib/url-state";
import { useCityLayers } from "./city-layers-context";
import { CityMenu, CityPickerDialog } from "./city-picker";
import { CompareViewToggle } from "./compare-view-toggle";
import { ControlTooltip, MAP_SURFACE, MapIconButton } from "./map-control";
import { type LegendEntry, LegendPanel } from "./map-legend";
import { MapScale } from "./map-scale";
import { BaseMapMenu, SiteMenuControl } from "./menus";
import { AddressSearch } from "./sidebar/address-search";
import { ComparePanel, LayerPanel } from "./sidebar/layer-panels";

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";
mapboxgl.accessToken = TOKEN;

const URL_DEFAULTS = { baseMap: DEFAULT_BASE_MAP, opacity: DEFAULT_OPACITY };
const URL_WRITE_DELAY = 300;
const FLY_DURATION = 2000;
const PITCH_3D = 55;
/**
 * As divs dos mapas são do Mapbox: estilo fixo, nunca mexido pelo React.
 * Elas recebem os eventos; os painéis em volta, não (ver `paneA`/`paneB`).
 */
const MAP_FILL: CSSProperties = {
  position: "absolute",
  inset: 0,
  pointerEvents: "auto",
};

/** Cards de legenda das camadas `ids`, na ordem dada. */
function legendEntries(
  layersById: ReadonlyMap<string, GeoportalLayer>,
  ids: readonly (string | null)[],
  caption?: string,
): LegendEntry[] {
  return ids.flatMap((id) => {
    const layer = id ? layersById.get(id) : undefined;
    return layer?.layerType ? [{ layer, caption }] : [];
  });
}

function readInitialUrl(config: GeoportalLayersConfig) {
  const cityLayers = Object.fromEntries(
    Object.entries(config).map(([city, layers]) => [
      city,
      layers.map((layer) => layer.id),
    ]),
  );
  const { state, camera } = parseGeoportalUrl(
    new URLSearchParams(window.location.search),
    { cityLayers, baseMaps: BASE_MAP_IDS, defaultBaseMap: DEFAULT_BASE_MAP },
  );
  const view = cityView(state.city);
  const initialCamera: MapCamera = {
    center: camera?.center ?? view.center,
    zoom: camera?.zoom ?? view.zoom,
    bearing: camera?.bearing ?? 0,
    pitch: camera?.pitch ?? 0,
  };
  return { state, initialCamera };
}

export default function Geoportal() {
  const lang = useLocale();
  const copy = chrome[lang].maps;
  const hrefFor = useLocaleHref();
  const router = useRouter();
  const config = useCityLayers();
  const isMobile = useMediaQuery("(max-width: 767px)");

  const [initial] = useState(() => readInitialUrl(config));
  const [state, dispatch] = useReducer(geoportalReducer, initial.state);
  const [presenting, setPresenting] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mapFailed, setMapFailed] = useState(!TOKEN);

  const city = findCity(state.city);
  const cityLayers = config[state.city ?? ""] ?? [];
  const layersById = useMemo(
    () => new Map(cityLayers.map((layer) => [layer.id, layer])),
    [cityLayers],
  );

  const { primaryLayers, secondaryLayers } = useMemo(() => {
    const toDataLayers = (ids: string[]): DataLayer[] =>
      ids.flatMap((id) => {
        const layer = layersById.get(id);
        if (!layer?.tilesetId || !layer.sourceLayer) return [];
        return [
          {
            id,
            name: layer.name,
            tilesetId: layer.tilesetId,
            sourceLayer: layer.sourceLayer,
            layerType: layer.layerType ?? "fill",
            opacity: opacityOf(state, id),
          },
        ];
      });
    const visible = visibleLayers(state);
    return {
      primaryLayers: toDataLayers(visible.primary),
      secondaryLayers: toDataLayers(visible.secondary),
    };
  }, [state, layersById]);

  // --- URL ------------------------------------------------------------------

  const stateRef = useRef(state);
  useLayoutEffect(() => {
    stateRef.current = state;
  });
  const cameraRef = useRef<() => MapCamera | null>(() => null);
  const urlTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const buildSearch = useCallback((current: GeoportalState) => {
    // Sem cidade, o mapa mostra o Brasil atrás do seletor: nada a guardar.
    const camera = current.city ? cameraRef.current() : null;
    return serializeGeoportalUrl(current, camera, URL_DEFAULTS).toString();
  }, []);

  const scheduleUrlWrite = useCallback(
    (current: GeoportalState) => {
      clearTimeout(urlTimer.current);
      // Com debounce: o navegador limita replaceState e o slider de opacidade dispara muito.
      urlTimer.current = setTimeout(() => {
        const search = buildSearch(current);
        const url = `${window.location.pathname}${search ? `?${search}` : ""}`;
        if (url !== `${window.location.pathname}${window.location.search}`) {
          // Integrado ao App Router: atualiza `useSearchParams` sem buscar a página de novo.
          window.history.replaceState(null, "", url);
        }
      }, URL_WRITE_DELAY);
    },
    [buildSearch],
  );

  useEffect(() => scheduleUrlWrite(state), [state, scheduleUrlWrite]);
  useEffect(() => () => clearTimeout(urlTimer.current), []);

  // --- Mapas ----------------------------------------------------------------

  const style =
    BASE_MAP_STYLES[
      isBaseMapId(state.baseMap) ? state.baseMap : DEFAULT_BASE_MAP
    ];
  const stacked = isMobile;
  const { stageRef, primaryRef, secondaryRef, primary, secondary } =
    useGeoportalMaps({
      initialCamera: initial.initialCamera,
      style,
      terrain: state.terrain,
      primaryLayers,
      secondaryLayers,
      compare: state.compare.enabled,
      compareView: state.compare.view,
      orientation: stacked ? "horizontal" : "vertical",
      onMoveEnd: () => scheduleUrlWrite(stateRef.current),
      onLayerError: (id) => {
        toast.error(copy.layerError, { description: layersById.get(id)?.name });
        dispatch({ type: "toggleLayer", id, on: false });
        dispatch({ type: "toggleCompareLayer", id, on: false });
      },
      onMapError: () => setMapFailed(true),
    });

  useLayoutEffect(() => {
    cameraRef.current = () => primary?.getCamera() ?? initial.initialCamera;
  });

  const map = primary?.map ?? null;

  const flyToCity = useCallback(
    (name: string | null) => {
      map?.flyTo({
        ...cityView(name),
        bearing: 0,
        pitch: 0,
        duration: FLY_DURATION,
        essential: true,
      });
    },
    [map],
  );

  const flyToLayer = (id: string) => {
    const mapView = layersById.get(id)?.mapView;
    if (!map || !mapView) return;
    map.flyTo({
      ...resolveLayerMapView(mapView, isMobile),
      duration: FLY_DURATION,
      essential: true,
    });
  };

  // --- Busca de endereço ----------------------------------------------------

  const markers = useRef<mapboxgl.Marker[]>([]);
  const clearMarkers = useCallback(() => {
    for (const marker of markers.current) marker.remove();
    markers.current = [];
  }, []);

  const showAddress = (result: AddressResult) => {
    clearMarkers();
    for (const controller of [primary, secondary]) {
      if (!controller) continue;
      markers.current.push(
        new mapboxgl.Marker({ color: "#171717" })
          .setLngLat(result.center)
          .addTo(controller.map),
      );
    }
    if (result.bbox) {
      map?.fitBounds(result.bbox, { padding: 64, maxZoom: 16, duration: 1200 });
    } else {
      map?.flyTo({
        center: result.center,
        zoom: 16,
        duration: 1200,
        essential: true,
      });
    }
    setDrawerOpen(false);
  };

  // Sair da comparação leva o segundo mapa e, com ele, o marcador de lá.
  useEffect(() => {
    if (!secondary) clearMarkers();
  }, [secondary, clearMarkers]);

  // --- Ações ----------------------------------------------------------------

  const selectCity = (name: string) => {
    if (name === state.city) return;
    clearMarkers();
    dispatch({ type: "selectCity", city: name });
    flyToCity(name);
  };

  const toggleLayer = (id: string, on: boolean) => {
    dispatch({ type: "toggleLayer", id, on });
    if (on) flyToLayer(id);
    else if (state.layers.length === 1 && state.layers[0] === id)
      flyToCity(state.city);
  };

  const toggleCompareLayer = (id: string, on: boolean) => {
    const { left, right } = state.compare;
    dispatch({ type: "toggleCompareLayer", id, on });
    // Só a primeira escolha enquadra; depois a câmera fica onde a pessoa deixou.
    if (on && left === null && right === null) flyToLayer(id);
  };

  const setOpacity = (id: string, value: number) =>
    dispatch({ type: "setOpacity", id, value });

  const toggle3D = () => {
    const on = !state.terrain;
    dispatch({ type: "setTerrain", on });
    map?.easeTo({
      pitch: on ? Math.max(map.getPitch(), PITCH_3D) : 0,
      duration: 600,
    });
  };

  const resetView = () => {
    dispatch({ type: "setTerrain", on: false });
    flyToCity(state.city);
  };

  const share = useShare({ copied: copy.linkCopied, failed: copy.shareError });
  const shareView = () => {
    const search = buildSearch(stateRef.current);
    const url = `${window.location.origin}${window.location.pathname}${search ? `?${search}` : ""}`;
    void share({ title: document.title, text: copy.shareText, url });
  };

  const goBack = () => {
    const fromSite = document.referrer.startsWith(window.location.origin);
    if (fromSite && window.history.length > 1) router.back();
    else router.push(hrefFor("/"));
  };

  useEffect(() => {
    if (!presenting) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPresenting(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [presenting]);

  useEffect(() => {
    if (!isMobile) setDrawerOpen(false);
  }, [isMobile]);

  // --- Legenda --------------------------------------------------------------

  const { compare } = state;
  const normalLegend = useMemo(
    () => legendEntries(layersById, [...state.layers].reverse()),
    [layersById, state.layers],
  );
  const leftLegend = useMemo(
    () =>
      legendEntries(layersById, [compare.left], stacked ? copy.top : copy.left),
    [layersById, compare.left, stacked, copy],
  );
  const rightLegend = useMemo(
    () =>
      legendEntries(
        layersById,
        [compare.right],
        stacked ? copy.bottom : copy.right,
      ),
    [layersById, compare.right, stacked, copy],
  );
  const stackedLegend = useMemo(
    () => [...leftLegend, ...rightLegend],
    [leftLegend, rightLegend],
  );

  // --- Layout ---------------------------------------------------------------

  const split = compare.enabled && compare.view === "split";
  // No modo deslizante os dois painéis cobrem o mapa inteiro e a barra só
  // recorta o conteúdo do Mapbox. Sem `pointer-events-none`, o painel de cima
  // capturaria o arrasto também no lado em que o mapa dele está recortado.
  const paneA = cn(
    "pointer-events-none absolute",
    split
      ? stacked
        ? "inset-x-0 top-0 h-1/2"
        : "inset-y-0 left-0 w-1/2"
      : "inset-0",
  );
  const paneB = cn(
    "pointer-events-none absolute",
    split
      ? stacked
        ? "inset-x-0 bottom-0 h-1/2 border-t-2 border-background"
        : "inset-y-0 right-0 w-1/2 border-l-2 border-background"
      : "inset-0",
  );
  const sidebarHidden = isMobile && !drawerOpen;

  return (
    <div
      data-lenis-prevent
      className={cn(
        MAP_SURFACE,
        "relative flex h-screen min-h-lvh w-full overflow-hidden bg-background text-foreground",
      )}
    >
      <aside
        id="geoportal-sidebar"
        aria-label={copy.layers}
        hidden={presenting}
        inert={sidebarHidden}
        className={cn(
          "z-30 flex w-90 shrink-0 flex-col border-r border-border bg-background",
          "max-md:absolute max-md:inset-y-0 max-md:left-0 max-md:w-[min(85vw,340px)] max-md:pt-16 max-md:shadow-xl max-md:transition-transform max-md:duration-300 motion-reduce:transition-none",
          drawerOpen ? "max-md:translate-x-0" : "max-md:-translate-x-full",
        )}
      >
        <div className="relative z-10 flex shrink-0 items-center gap-2 border-b border-border px-4 py-3">
          <button
            type="button"
            onClick={goBack}
            aria-label={copy.back}
            className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-[8px] border border-border outline-none transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ArrowLeft className="size-4" aria-hidden />
          </button>
          <AddressSearch
            key={state.city ?? ""}
            city={city}
            onSelect={showAddress}
          />
        </div>
        <div data-lenis-prevent className="min-h-0 flex-1 overflow-y-auto">
          {/* Sem cidade, o seletor cobre a tela: não há camadas para listar. */}
          {!state.city ? null : compare.enabled ? (
            <ComparePanel
              key={state.city ?? ""}
              layers={cityLayers}
              left={compare.left}
              right={compare.right}
              stacked={stacked}
              onToggle={toggleCompareLayer}
              opacity={state.opacity}
              onOpacityChange={setOpacity}
            />
          ) : (
            <LayerPanel
              key={state.city ?? ""}
              layers={cityLayers}
              active={state.layers}
              onToggle={toggleLayer}
              onReorder={(layers) =>
                dispatch({ type: "setLayerOrder", layers })
              }
              opacity={state.opacity}
              onOpacityChange={setOpacity}
            />
          )}
        </div>
      </aside>

      <section
        aria-label={copy.mapLabel}
        className="relative h-full min-w-0 flex-1"
      >
        <div ref={stageRef} className="absolute inset-0 overflow-hidden">
          <div className={paneA}>
            <div ref={primaryRef} style={MAP_FILL} />
          </div>
          {compare.enabled ? (
            <div className={paneB}>
              <div ref={secondaryRef} style={MAP_FILL} />
            </div>
          ) : null}
        </div>

        {mapFailed ? (
          <p
            role="alert"
            className="absolute inset-x-4 top-20 z-20 mx-auto max-w-md rounded-[8px] border border-border bg-background p-4 text-sm shadow-md"
          >
            {copy.mapError}
          </p>
        ) : null}

        {!presenting ? (
          <>
            <MapIconButton
              onClick={() => setDrawerOpen((open) => !open)}
              aria-label={drawerOpen ? copy.closeMenu : copy.openMenu}
              aria-expanded={drawerOpen}
              aria-controls="geoportal-sidebar"
              className="absolute top-4 left-4 z-40 size-11 md:hidden"
            >
              {drawerOpen ? <X aria-hidden /> : <Menu aria-hidden />}
            </MapIconButton>

            {state.city ? (
              <div className="absolute top-4 left-18 z-20 md:left-4">
                <CityMenu city={state.city} onChange={selectCity} />
              </div>
            ) : null}

            {compare.enabled ? (
              <div className="absolute top-18 left-1/2 z-20 -translate-x-1/2 md:top-4">
                <CompareViewToggle
                  value={compare.view}
                  onChange={(view) =>
                    dispatch({ type: "setCompareView", view })
                  }
                />
              </div>
            ) : null}

            {!compare.enabled ? (
              <LegendPanel entries={normalLegend} className="bottom-4 left-4" />
            ) : stacked ? (
              <LegendPanel
                entries={stackedLegend}
                className="bottom-4 left-4"
              />
            ) : (
              <>
                <LegendPanel entries={leftLegend} className="bottom-4 left-4" />
                <LegendPanel
                  entries={rightLegend}
                  align="right"
                  className="right-16 bottom-10 items-end"
                />
              </>
            )}

            <div className="absolute top-4 right-4 z-[9] flex flex-col gap-2">
              <SiteMenuControl />
              <ControlTooltip
                label={compare.enabled ? copy.exitCompare : copy.compare}
              >
                <MapIconButton
                  active={compare.enabled}
                  aria-pressed={compare.enabled}
                  aria-label={copy.compare}
                  onClick={() =>
                    dispatch({ type: "setCompare", enabled: !compare.enabled })
                  }
                >
                  <Layers aria-hidden />
                </MapIconButton>
              </ControlTooltip>
              <ControlTooltip label={copy.share}>
                <MapIconButton aria-label={copy.share} onClick={shareView}>
                  <Share2 aria-hidden />
                </MapIconButton>
              </ControlTooltip>
              <ControlTooltip label={copy.presentation}>
                <MapIconButton
                  aria-label={copy.presentation}
                  onClick={() => setPresenting(true)}
                >
                  <Maximize2 aria-hidden />
                </MapIconButton>
              </ControlTooltip>
            </div>

            <div className="absolute right-4 bottom-4 z-[5] flex flex-col gap-2">
              <ControlTooltip label={copy.zoomIn}>
                <MapIconButton
                  aria-label={copy.zoomIn}
                  onClick={() => map?.zoomIn()}
                >
                  <Plus aria-hidden />
                </MapIconButton>
              </ControlTooltip>
              <ControlTooltip label={copy.zoomOut}>
                <MapIconButton
                  aria-label={copy.zoomOut}
                  onClick={() => map?.zoomOut()}
                >
                  <Minus aria-hidden />
                </MapIconButton>
              </ControlTooltip>
              <BaseMapMenu
                value={state.baseMap}
                onChange={(baseMap: BaseMapId) =>
                  dispatch({ type: "setBaseMap", baseMap })
                }
              />
              <ControlTooltip label={copy.view3d}>
                <MapIconButton
                  active={state.terrain}
                  aria-pressed={state.terrain}
                  aria-label={copy.view3d}
                  onClick={toggle3D}
                >
                  <Box aria-hidden />
                </MapIconButton>
              </ControlTooltip>
              <ControlTooltip label={copy.north}>
                <MapIconButton
                  aria-label={copy.north}
                  onClick={() => map?.easeTo({ bearing: 0, duration: 500 })}
                >
                  <Navigation aria-hidden />
                </MapIconButton>
              </ControlTooltip>
              <ControlTooltip label={copy.reset}>
                <MapIconButton aria-label={copy.reset} onClick={resetView}>
                  <Compass aria-hidden />
                </MapIconButton>
              </ControlTooltip>
            </div>

            {drawerOpen && isMobile ? (
              <button
                type="button"
                aria-label={copy.closeMenu}
                onClick={() => setDrawerOpen(false)}
                className="absolute inset-0 z-[25] cursor-pointer bg-black/50"
              />
            ) : null}
          </>
        ) : (
          <button
            type="button"
            onClick={() => setPresenting(false)}
            className="absolute top-4 right-4 z-20 flex h-9 cursor-pointer items-center rounded-[4px] border border-border bg-background px-3 text-sm shadow-md outline-none transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring"
          >
            {copy.exitPresentation}
          </button>
        )}

        <MapScale
          map={map}
          className={cn(
            "absolute bottom-4 z-[4]",
            presenting ? "right-4" : "right-16",
          )}
        />
      </section>

      <CityPickerDialog open={!state.city && !presenting} onPick={selectCity} />
    </div>
  );
}
