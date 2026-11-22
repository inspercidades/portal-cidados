"use client";

import type Compare from "mapbox-gl-compare";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { type DataLayer, GeoMapController } from "../engine/map-controller";
import { syncCameras } from "../engine/sync-cameras";
import type { CompareView } from "../lib/geoportal-state";
import type { MapCamera } from "../lib/url-state";

export type CompareOrientation = "vertical" | "horizontal";

interface UseGeoportalMapsOptions {
  initialCamera: MapCamera;
  style: string;
  terrain: boolean;
  primaryLayers: DataLayer[];
  secondaryLayers: DataLayer[];
  compare: boolean;
  compareView: CompareView;
  /** `vertical`: esquerda/direita. `horizontal`: cima/baixo (celular). */
  orientation: CompareOrientation;
  onMoveEnd: () => void;
  onLayerError: (layerId: string) => void;
  onMapError: () => void;
}

/**
 * Cria e mantém os mapas do geoportal.
 *
 * O mapa principal vive enquanto a página estiver aberta. A comparação só
 * acrescenta o segundo mapa (um map load a mais) e sair dela não recria nada,
 * então câmera, mapa base e relevo seguem como estavam. As operações de câmera
 * vão para o principal: a sincronização leva o movimento para o outro.
 */
export function useGeoportalMaps(options: UseGeoportalMapsOptions) {
  const {
    style,
    terrain,
    primaryLayers,
    secondaryLayers,
    compare,
    compareView,
    orientation,
  } = options;

  const stageRef = useRef<HTMLDivElement>(null);
  const primaryRef = useRef<HTMLDivElement>(null);
  const secondaryRef = useRef<HTMLDivElement>(null);
  const [primary, setPrimary] = useState<GeoMapController | null>(null);
  const [secondary, setSecondary] = useState<GeoMapController | null>(null);

  // Os mapas são criados uma vez; os callbacks precisam enxergar o render atual.
  const latest = useRef(options);
  useLayoutEffect(() => {
    latest.current = options;
  });

  useEffect(() => {
    const container = primaryRef.current;
    if (!container) return;
    const initial = latest.current;
    const controller = new GeoMapController({
      container,
      style: initial.style,
      camera: initial.initialCamera,
      terrain: initial.terrain,
      onLayerError: (id) => latest.current.onLayerError(id),
      onMapError: () => latest.current.onMapError(),
    });
    controller.setLayers(initial.primaryLayers);
    controller.map.on("moveend", () => latest.current.onMoveEnd());
    setPrimary(controller);
    return () => {
      controller.destroy();
      setPrimary(null);
    };
  }, []);

  useEffect(() => {
    const container = secondaryRef.current;
    if (!compare || !primary || !container) return;
    const current = latest.current;
    const controller = new GeoMapController({
      container,
      style: current.style,
      camera: primary.getCamera(),
      terrain: current.terrain,
      onLayerError: (id) => latest.current.onLayerError(id),
      onMapError: () => latest.current.onMapError(),
    });
    controller.setLayers(current.secondaryLayers);
    setSecondary(controller);
    return () => {
      controller.destroy();
      setSecondary(null);
    };
  }, [compare, primary]);

  useEffect(() => {
    primary?.setStyle(style);
    secondary?.setStyle(style);
  }, [primary, secondary, style]);

  useEffect(() => {
    primary?.setTerrain(terrain);
    secondary?.setTerrain(terrain);
  }, [primary, secondary, terrain]);

  useEffect(() => {
    primary?.setLayers(primaryLayers);
  }, [primary, primaryLayers]);

  useEffect(() => {
    secondary?.setLayers(secondaryLayers);
  }, [secondary, secondaryLayers]);

  // Liga os dois mapas: barra deslizante ou câmeras sincronizadas lado a lado.
  useEffect(() => {
    const stage = stageRef.current;
    if (!primary || !secondary || !stage) return;
    if (compareView === "split") return syncCameras(primary.map, secondary.map);

    let cancelled = false;
    let control: Compare | null = null;
    // O plugin mexe no DOM e na janela: só carrega no navegador, e sob demanda.
    import("mapbox-gl-compare").then(({ default: CompareControl }) => {
      if (cancelled) return;
      control = new CompareControl(primary.map, secondary.map, stage, {
        orientation,
      });
    });
    return () => {
      cancelled = true;
      // `remove` também limpa o recorte (`clip`) que a barra aplica nos mapas.
      control?.remove();
    };
  }, [primary, secondary, compareView, orientation]);

  return { stageRef, primaryRef, secondaryRef, primary, secondary };
}
