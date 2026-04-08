"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Map as MapboxMap, Marker } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import piscinao2MobileSvg from "../assets/piscinao2-mobile.svg";
import novaHolandaMobileSvg from "../assets/nova-holanda-mobile.svg";
import parqueEcologicoMobileSvg from "../assets/parque-ecologico-mobile.svg";
import mapaDeUmidade from "../assets/mapa-de-umidade.png";
import mapaDeCO2 from "../assets/mapa-de-co2.png";
import mapaDeHCHO from "../assets/mapa-de-hcho.png";
import mapaDePM10 from "../assets/mapa-de-pm10.png";
import mapaDePM25 from "../assets/mapa-de-pm25.png";

gsap.registerPlugin(ScrollTrigger);

const MAPBOX_STYLE =
  "mapbox://styles/observatorio-nacional/cmmjrccaj001z01s1f0ls24g8";
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";

const ORIGINAL_DESKTOP = { lng: -43.244951, lat: -22.856215, zoom: 12.84 };
const ORIGINAL_MOBILE = { lng: -43.244951, lat: -22.856215, zoom: 11.44 };

type MapPosition = {
  lng: number;
  lat: number;
  zoom: number;
  bearing?: number;
  pitch?: number;
};

const TRIGGER_POSITIONS: { desktop: MapPosition; mobile: MapPosition }[] = [
  {
    desktop: { lng: -43.244107, lat: -22.843399, zoom: 13.8 },
    mobile: { lng: -43.250007, lat: -22.840399, zoom: 13.8 },
  },
  {
    desktop: { lng: -43.251429, lat: -22.856089, zoom: 13.23 },
    mobile: { lng: -43.243577, lat: -22.860809, zoom: 13.23 },
  },
  {
    desktop: {
      lng: -43.235156,
      lat: -22.86556,
      zoom: 14.58,
      bearing: 49.59,
      pitch: 46.49,
    },
    mobile: { lng: -43.236156, lat: -22.869024, zoom: 14.58 },
  },
];

const TRIGGER_LAYERS: string[][] = [
  ["piscinao-4mbq07", "piscinao-4mbq07 copy"],
  ["nova-holanda-0i0e88", "nova-holanda-0i0e88 copy"],
  ["parque-ecologico-7p2oy7", "parque-ecologico-7p2oy7 copy"],
];

const ALL_LAYER_IDS = TRIGGER_LAYERS.flat();

const CARD_HEIGHTS = ["100vh", "100vh", "110vh"];

const MOBILE_OVERLAYS = [
  {
    src: piscinao2MobileSvg.src,
    lng: -43.249499,
    lat: -22.8428554,
    width: 300,
    offsetX: 0,
    offsetY: 0,
  },
  {
    src: novaHolandaMobileSvg.src,
    lng: -43.243577,
    lat: -22.860809,
    width: 300,
    offsetX: 0,
    offsetY: 0,
  },
  {
    src: parqueEcologicoMobileSvg.src,
    lng: -43.236156,
    lat: -22.869024,
    width: 300,
    offsetX: 0,
    offsetY: 0,
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function animateLayerOpacity(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  map: any,
  layerIds: string[],
  targetOpacity: number,
  duration = 600,
) {
  const startTime = performance.now();
  const startValues = new Map<string, number>();

  for (const id of layerIds) {
    try {
      const val = map.getPaintProperty(id, "icon-opacity");
      startValues.set(id, typeof val === "number" ? val : 0);
    } catch {
      startValues.set(id, 0);
    }
  }

  const tick = (now: number) => {
    const elapsed = now - startTime;
    const rawT = Math.min(elapsed / duration, 1);
    const t = rawT < 0.5 ? 2 * rawT * rawT : 1 - (-2 * rawT + 2) ** 2 / 2;

    for (const id of layerIds) {
      const start = startValues.get(id) ?? 0;
      try {
        map.setPaintProperty(
          id,
          "icon-opacity",
          start + (targetOpacity - start) * t,
        );
      } catch {
        // Layer not found in the current style — skip silently
      }
    }

    if (rawT < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}

function MapSelector() {
  const [selectedMap, setSelectedMap] = useState<
    "PM10" | "PM25" | "CO2" | "HCHO" | "UMIDADE"
  >("PM10");

  const mapImages = {
    PM10: mapaDePM10,
    PM25: mapaDePM25,
    CO2: mapaDeCO2,
    HCHO: mapaDeHCHO,
    UMIDADE: mapaDeUmidade,
  };

  const currentMapSrc = mapImages[selectedMap];

  return (
    <div className="bg-white! mx-auto max-w-lg mb-30 flex items-center flex-col justify-center mt-30">
      <div className="flex bg-white! flex-col justify-start items-start px-4 w-full">
        {currentMapSrc && (
          <Zoom>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentMapSrc.src}
              alt="Mapa de Qualidade do Ar"
              className="rounded-xl"
            />
          </Zoom>
        )}
        <p className="text-md font-bold mt-2.5">Mapa de temperatura da Maré</p>
        <p className="text-md text-[#3A3434]">
          Produzido por <em>Respira Maré</em>
        </p>
        <div className="flex flex-row gap-2 mt-4 flex-wrap">
          {(
            [
              { key: "PM10", label: "PM 10" },
              { key: "PM25", label: "PM 2,5" },
              { key: "CO2", label: "CO 2" },
              { key: "HCHO", label: "HCHO" },
              { key: "UMIDADE", label: "UMIDADE" },
            ] as const
          ).map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setSelectedMap(key)}
              className={`px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm rounded-md bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors ${selectedMap === key ? "opacity-50" : ""}`}
            >
              {label}
            </button>
          ))}
        </div>
        <div>
          <p className="text-md text-[#3A3434] my-5">
            São partículas 5 a 7 vezes mais finas do que um fio de cabelo e
            podem ser inaladas e chegar até as vias aéreas mais profundas dos
            pulmões, mas a maioria delas tende a se depositar nas vias aéreas
            superiores, como traquéia e brônquios.
          </p>
          <p className="text-md text-[#3A3434]">
            Podem causar problemas respiratórios, cardiovasculares e agravar
            condições de saúde preexistentes. Na Maré, as regiões do Parque
            Ecológico se destacam na concentração de PM 10 , por motivos
            diferentes.
          </p>
        </div>
      </div>
    </div>
  );
}

export function ScrollMapQualidadeArMapbox() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const [activeMobileOverlay, setActiveMobileOverlay] = useState<number | null>(null);

  useLayoutEffect(() => {
    let triggers: ScrollTrigger[] = [];
    let timeoutId: NodeJS.Timeout;

    const isMobile = () =>
      typeof window !== "undefined" && window.innerWidth < 768;

    const getMap = () => {
      const map = mapRef.current?.getMap?.();
      if (map && map.isStyleLoaded()) return map;
      return null;
    };

    const flyTo = (pos: (typeof TRIGGER_POSITIONS)[0]) => {
      const map = getMap();
      if (!map) return;
      const coords = isMobile() ? pos.mobile : pos.desktop;
      map.flyTo({
        center: [coords.lng, coords.lat],
        zoom: coords.zoom,
        bearing: coords.bearing ?? 0,
        pitch: coords.pitch ?? 0,
        duration: 2000,
        essential: true,
      });
    };

    const flyToOriginal = () => {
      const map = getMap();
      if (!map) return;
      const coords = isMobile() ? ORIGINAL_MOBILE : ORIGINAL_DESKTOP;
      map.flyTo({
        center: [coords.lng, coords.lat],
        zoom: coords.zoom,
        bearing: 0,
        pitch: 0,
        duration: 2000,
        essential: true,
      });
    };

    const showLayers = (idx: number) => {
      if (isMobile() && idx < MOBILE_OVERLAYS.length) {
        setActiveMobileOverlay(idx);
        return;
      }
      const map = getMap();
      if (!map) return;
      animateLayerOpacity(map, TRIGGER_LAYERS[idx], 1);
    };

    const hideLayers = (idx: number) => {
      if (isMobile() && idx < MOBILE_OVERLAYS.length) {
        setActiveMobileOverlay(null);
        return;
      }
      const map = getMap();
      if (!map) return;
      animateLayerOpacity(map, TRIGGER_LAYERS[idx], 0);
    };

    const cardRefs = [card1Ref, card2Ref, card3Ref];

    const createTriggers = () => {
      if (!cardRefs.every((ref) => ref.current !== null)) return;

      for (const t of triggers) t.kill();
      triggers = [];

      triggers.push(
        ScrollTrigger.create({
          trigger: card1Ref.current,
          start: "top center",
          end: "bottom center",
          onEnter: () => {
            flyTo(TRIGGER_POSITIONS[0]);
            showLayers(0);
          },
          onLeaveBack: () => {
            flyToOriginal();
            hideLayers(0);
          },
        }),
      );

      triggers.push(
        ScrollTrigger.create({
          trigger: card2Ref.current,
          start: "top center",
          end: "bottom center",
          onEnter: () => {
            flyTo(TRIGGER_POSITIONS[1]);
            hideLayers(0);
            showLayers(1);
          },
          onLeaveBack: () => {
            flyTo(TRIGGER_POSITIONS[0]);
            hideLayers(1);
            showLayers(0);
          },
        }),
      );

      triggers.push(
        ScrollTrigger.create({
          trigger: card3Ref.current,
          start: "top center",
          end: "bottom center",
          onEnter: () => {
            flyTo(TRIGGER_POSITIONS[2]);
            hideLayers(1);
            showLayers(2);
          },
          onLeaveBack: () => {
            flyTo(TRIGGER_POSITIONS[1]);
            hideLayers(2);
            showLayers(1);
          },
        }),
      );

      requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    const tryCreateTriggers = () => {
      if (cardRefs.every((ref) => ref.current !== null)) {
        createTriggers();
        return true;
      }
      return false;
    };

    requestAnimationFrame(() => {
      if (!tryCreateTriggers()) {
        timeoutId = setTimeout(() => {
          if (!tryCreateTriggers()) {
            if (document.readyState === "complete") {
              tryCreateTriggers();
            } else {
              window.addEventListener("load", () => tryCreateTriggers(), {
                once: true,
              });
            }
          }
        }, 100);
      }
    });

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => createTriggers(), 150);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", () => {
      setTimeout(() => createTriggers(), 300);
    });

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
      for (const t of triggers) t.kill();
      triggers = [];
    };
  }, []);

  const handleMapLoad = () => {
    const map = mapRef.current?.getMap?.();
    if (!map) return;

    for (const id of ALL_LAYER_IDS) {
      try {
        map.setPaintProperty(id, "icon-opacity", 0);
      } catch {
        // Layer may not exist in the style yet
      }
    }

    if (typeof window !== "undefined" && window.innerWidth < 768) {
      map.jumpTo({
        center: [ORIGINAL_MOBILE.lng, ORIGINAL_MOBILE.lat],
        zoom: ORIGINAL_MOBILE.zoom,
      });
    }
  };

  return (
    <>
      <div className="w-full">
        {/* Sticky Mapbox map — pins while scroll cards pass beneath it */}
        <div
          className="w-full h-screen overflow-hidden [&_.mapboxgl-canvas]:!cursor-default"
          style={{
            position: "sticky",
            top: 0,
            zIndex: 0,
            WebkitTransform: "translateZ(0)",
            transform: "translateZ(0)",
          }}
        >
          <MapboxMap
            ref={mapRef}
            initialViewState={{
              longitude: ORIGINAL_DESKTOP.lng,
              latitude: ORIGINAL_DESKTOP.lat,
              zoom: ORIGINAL_DESKTOP.zoom,
              pitch: 0,
              bearing: 0,
            }}
            mapStyle={MAPBOX_STYLE}
            mapboxAccessToken={MAPBOX_TOKEN}
            style={{ width: "100%", height: "100%" }}
            onLoad={handleMapLoad}
            dragPan={false}
            dragRotate={false}
            scrollZoom={false}
            keyboard={false}
            doubleClickZoom={false}
            touchZoomRotate={false}
          >
            {MOBILE_OVERLAYS.map((overlay, idx) => (
              <Marker
                key={idx}
                longitude={overlay.lng}
                latitude={overlay.lat}
                anchor="center"
                style={{ pointerEvents: "none" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={overlay.src}
                  alt=""
                  style={{
                    display: "block",
                    width: overlay.width,
                    transform: `translate(${overlay.offsetX}px, ${overlay.offsetY}px)`,
                    opacity: activeMobileOverlay === idx ? 1 : 0,
                    transition: "opacity 600ms ease-in-out",
                  }}
                />
              </Marker>
            ))}
          </MapboxMap>
        </div>

        {/* Invisible scroll cards — each creates 200vh of scroll space to trigger map transitions */}
        <div ref={card1Ref} style={{ minHeight: CARD_HEIGHTS[0] }} />
        <div ref={card2Ref} style={{ minHeight: CARD_HEIGHTS[1] }} />
        <div ref={card3Ref} style={{ minHeight: CARD_HEIGHTS[2] }} />
      </div>

      {/* Interactive map selector displayed after the scrollytelling section */}
      <MapSelector />
    </>
  );
}
