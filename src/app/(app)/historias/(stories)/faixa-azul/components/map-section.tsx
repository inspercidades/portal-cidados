"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxMap, { Marker } from "react-map-gl/mapbox";
import { brandColor } from "../constants";
import {
  FLY_TO_DURATION_MS,
  getPhaseView,
  MAP_PHASE_A,
  MAP_PHASE_B,
  MAPBOX_STYLE,
  type MapPhase,
  PRIMEIRA_IMPLANTACAO_GEOJSON,
  PRIMEIRA_IMPLANTACAO_LABEL_ANCHOR,
  PRIMEIRA_IMPLANTACAO_LABEL_TEXT,
  PRIMEIRA_IMPLANTACAO_LAYER_ID,
  PRIMEIRA_IMPLANTACAO_SOURCE_ID,
  TRECHOS_LAYER_HIDDEN_OPACITY,
  TRECHOS_LAYER_ID,
  TRECHOS_LAYER_VISIBLE_OPACITY,
  TRECHOS_LINE_LAYOUT,
  TRECHOS_LINE_PAINT,
} from "./map-config";
import { useMapReady } from "./preload-wrapper";

gsap.registerPlugin(ScrollTrigger);

function CardBox({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="w-full max-w-xl rounded-xl p-6 text-sm leading-normal shadow-lg backdrop-blur-sm md:p-8 md:text-base lg:p-9"
      style={{ color: brandColor, backgroundColor: "#F0F0F0" }}
    >
      {children}
    </div>
  );
}

interface ScrollCardProps {
  children: React.ReactNode;
  cardRef: React.RefObject<HTMLDivElement | null>;
  minHeight?: string;
}

function ScrollCard({
  children,
  cardRef,
  minHeight = "130vh",
}: ScrollCardProps) {
  return (
    <div
      ref={cardRef}
      className="flex items-center justify-center px-6 md:px-8"
      style={{ minHeight, position: "relative", zIndex: 1 }}
    >
      <CardBox>{children}</CardBox>
    </div>
  );
}

function PrimeiraImplantacaoLabel({ visible }: { visible: boolean }) {
  return (
    <div
      className="font-inter pointer-events-none flex w-fit max-w-[180px] items-center gap-[10px] rounded-xl bg-[#F0F0F0] p-3 md:max-w-[min(360px,calc(100vw-2rem))] md:p-6"
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 600ms ease-in-out",
      }}
    >
      <div
        className="h-2.5 w-7 shrink-0 rounded-md bg-[#1A2672] md:h-[13px] md:w-[45px]"
        aria-hidden="true"
      />
      <p
        className="text-xs leading-snug whitespace-normal md:text-sm md:whitespace-nowrap"
        style={{ color: brandColor }}
      >
        {PRIMEIRA_IMPLANTACAO_LABEL_TEXT}
      </p>
    </div>
  );
}

type MapPhaseId = "A" | "B";

type MapboxMapInstance = {
  isStyleLoaded: () => boolean;
  flyTo: (options: {
    center: [number, number];
    zoom: number;
    duration: number;
    essential: boolean;
  }) => void;
  addSource: (id: string, source: object) => void;
  addLayer: (layer: object) => void;
  getLayer: (id: string) => unknown;
  setPaintProperty: (layer: string, name: string, value: unknown) => void;
  setLayoutProperty: (layer: string, name: string, value: unknown) => void;
  once: (event: string, callback: () => void) => void;
};

type MapRef = { getMap: () => MapboxMapInstance };

function getMap(mapRef: React.RefObject<MapRef | null>) {
  return mapRef.current?.getMap() ?? null;
}

function flyToPhase(map: MapboxMapInstance, phase: MapPhase) {
  const target = getPhaseView(phase);
  map.flyTo({
    center: [target.longitude, target.latitude],
    zoom: target.zoom,
    duration: FLY_TO_DURATION_MS,
    essential: true,
  });
}

function togglePrimeiraImplantacao(map: MapboxMapInstance, visible: boolean) {
  if (!map.getLayer(PRIMEIRA_IMPLANTACAO_LAYER_ID)) return;
  map.setLayoutProperty(
    PRIMEIRA_IMPLANTACAO_LAYER_ID,
    "visibility",
    visible ? "visible" : "none",
  );
}

function toggleTrechosLayer(map: MapboxMapInstance, visible: boolean) {
  if (!map.getLayer(TRECHOS_LAYER_ID)) return;
  map.setPaintProperty(
    TRECHOS_LAYER_ID,
    "line-opacity",
    visible ? TRECHOS_LAYER_VISIBLE_OPACITY : TRECHOS_LAYER_HIDDEN_OPACITY,
  );
}

function applyPhase(
  mapRef: React.RefObject<MapRef | null>,
  phaseId: MapPhaseId,
  currentPhaseRef: React.RefObject<MapPhaseId | null>,
) {
  if (currentPhaseRef.current === phaseId) return;

  const map = getMap(mapRef);
  if (!map) return;

  currentPhaseRef.current = phaseId;

  if (phaseId === "A") {
    flyToPhase(map, MAP_PHASE_A);
    togglePrimeiraImplantacao(map, true);
    toggleTrechosLayer(map, false);
    return;
  }

  flyToPhase(map, MAP_PHASE_B);
  togglePrimeiraImplantacao(map, false);
  toggleTrechosLayer(map, true);
}

export default function MapSection() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null);
  const card0Ref = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const currentPhaseRef = useRef<MapPhaseId | null>("A");
  const pendingPhaseRef = useRef<MapPhaseId>("A");
  const [mapPhase, setMapPhase] = useState<MapPhaseId>("A");
  const signalMapReady = useMapReady();

  const setPhase = useCallback((phaseId: MapPhaseId) => {
    pendingPhaseRef.current = phaseId;
    applyPhase(mapRef, phaseId, currentPhaseRef);
    setMapPhase(phaseId);
  }, []);

  const handleMapLoad = () => {
    const map = getMap(mapRef);
    if (!map) return;

    map.addSource(PRIMEIRA_IMPLANTACAO_SOURCE_ID, {
      type: "geojson",
      data: PRIMEIRA_IMPLANTACAO_GEOJSON as unknown as GeoJSON.FeatureCollection,
    });

    map.addLayer({
      id: PRIMEIRA_IMPLANTACAO_LAYER_ID,
      type: "line",
      source: PRIMEIRA_IMPLANTACAO_SOURCE_ID,
      paint: {
        "line-color": "#1A2672",
        "line-width": 13,
      },
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
    });

    if (map.getLayer(TRECHOS_LAYER_ID)) {
      map.setPaintProperty(
        TRECHOS_LAYER_ID,
        "line-opacity",
        TRECHOS_LAYER_HIDDEN_OPACITY,
      );
    } else {
      map.addSource("faixa-azul-trechos", {
        type: "vector",
        url: "mapbox://observatorio-nacional.faixa-azul",
      });

      map.addLayer({
        id: TRECHOS_LAYER_ID,
        type: "line",
        source: "faixa-azul-trechos",
        "source-layer": TRECHOS_LAYER_ID,
        paint: {
          ...TRECHOS_LINE_PAINT,
          "line-opacity": TRECHOS_LAYER_HIDDEN_OPACITY,
        },
        layout: TRECHOS_LINE_LAYOUT,
      });
    }

    currentPhaseRef.current = null;
    setPhase(pendingPhaseRef.current);

    // Style, GeoJSON and tiles for the current view are done once the map
    // goes idle — release the cover preloading then.
    map.once("idle", signalMapReady);

    requestAnimationFrame(() => ScrollTrigger.refresh());
  };

  useLayoutEffect(() => {
    let triggers: ScrollTrigger[] = [];

    const create = () => {
      if (!card0Ref.current || !card1Ref.current || !card2Ref.current) return;
      for (const t of triggers) t.kill();
      triggers = [];

      triggers.push(
        ScrollTrigger.create({
          trigger: card0Ref.current,
          start: "top center",
          end: "bottom center",
          onEnter: () => setPhase("A"),
          onEnterBack: () => setPhase("A"),
          onLeave: () => setPhase("B"),
        }),
      );

      triggers.push(
        ScrollTrigger.create({
          trigger: card1Ref.current,
          start: "center center",
          end: "bottom center",
          onEnter: () => setPhase("B"),
          onEnterBack: () => setPhase("B"),
        }),
      );

      triggers.push(
        ScrollTrigger.create({
          trigger: card2Ref.current,
          start: "center center",
          end: "bottom center",
          onEnter: () => setPhase("B"),
          onEnterBack: () => setPhase("B"),
        }),
      );

      requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    requestAnimationFrame(create);

    const handleResize = () => create();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      for (const t of triggers) t.kill();
      triggers = [];
    };
  }, [setPhase]);

  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  if (!mapboxToken) {
    console.warn("NEXT_PUBLIC_MAPBOX_TOKEN is not set");
  }

  // Failsafe: never hold the cover loading if the map can't load at all.
  useEffect(() => {
    if (!mapboxToken) signalMapReady();
  }, [mapboxToken, signalMapReady]);

  return (
    <section className="w-full bg-white">
      <div
        className="relative h-screen w-full overflow-hidden"
        style={{ position: "sticky", top: 0, zIndex: 0 }}
      >
        <MapboxMap
          ref={mapRef}
          initialViewState={{
            longitude: MAP_PHASE_A.longitude,
            latitude: MAP_PHASE_A.latitude,
            zoom: MAP_PHASE_A.zoom,
            pitch: 0,
            bearing: 0,
          }}
          mapStyle={MAPBOX_STYLE}
          mapboxAccessToken={mapboxToken}
          onLoad={handleMapLoad}
          onError={signalMapReady}
          style={{ width: "100%", height: "100%" }}
          interactiveLayerIds={[]}
          dragPan={false}
          dragRotate={false}
          scrollZoom={false}
          keyboard={false}
          doubleClickZoom={false}
        >
          <Marker
            longitude={PRIMEIRA_IMPLANTACAO_LABEL_ANCHOR.longitude}
            latitude={PRIMEIRA_IMPLANTACAO_LABEL_ANCHOR.latitude}
            anchor="left"
            offset={[20, 18]}
          >
            <PrimeiraImplantacaoLabel visible={mapPhase === "A"} />
          </Marker>
        </MapboxMap>
      </div>

      <div>
        <ScrollCard cardRef={card0Ref}>
          <p>
            Esse tipo de sinalização para faixa dedicada a motociclistas ainda
            não está previsto na regulamentação nacional de trânsito, então a{" "}
            <strong>
              Prefeitura de São Paulo recebeu autorização para implementar a
              Faixa Azul em caráter experimental
            </strong>
            .
          </p>
          <p className="mt-4">
            <strong>
              A primeira implantação ocorreu em 25 de janeiro de 2022, na
              Avenida 23 de Maio
            </strong>
            .
          </p>
        </ScrollCard>

        <ScrollCard cardRef={card1Ref}>
          <p>
            Depois disso, a política foi sendo expandida para outros grandes
            corredores da cidade. O estudo registra que, ao fim de 2024, a Faixa
            Azul já acumulava mais de 200 quilômetros de extensão e estava
            presente em 46 vias diferentes. Em janeiro de 2025, a Prefeitura
            informou que a rede havia chegado a 212,2 quilômetros.
          </p>
        </ScrollCard>

        <ScrollCard cardRef={card2Ref} minHeight="150vh">
          <div className="space-y-4">
            <p>
              Pelo mapa do estudo, os trechos se concentram sobretudo em vias
              largas, rápidas e com papel metropolitano: corredores como 23 de
              Maio, Bandeirantes, Nações Unidas, Faria Lima, Estado,
              Jacu-Pêssego, Aricanduva, Salim Farah Maluf e Teotônio Vilela
              ajudam a desenhar essa geografia.
            </p>
            <p>
              Em outras palavras:{" "}
              <strong>
                a Faixa Azul foi implantada onde o trânsito é mais veloz, mais
                intenso e mais complexo
              </strong>
              . É menos uma malha contínua e mais um conjunto de trechos
              implantados em eixos de tráfego pesado.
            </p>
          </div>
        </ScrollCard>

        <div style={{ minHeight: "100vh" }} aria-hidden="true" />
      </div>
    </section>
  );
}
