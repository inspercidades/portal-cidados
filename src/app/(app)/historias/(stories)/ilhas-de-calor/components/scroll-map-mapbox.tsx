"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Map as MapboxMap, Marker } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import mapaTemperatura from "../assets/mapa-temperatura.png";
import piscinaoMobileSvg from "../assets/piscinao-mobile.svg";
import ruaAriLeaoMobileSvg from "../assets/rua-ari-leao-mobile.svg";
import novaMareMobileSvg from "../assets/nova-mare-mobile.svg";

gsap.registerPlugin(ScrollTrigger);

const MAPBOX_STYLE =
  "mapbox://styles/observatorio-nacional/cmmjnelwx001h01s11ztoe2n6";
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";

const ORIGINAL_DESKTOP = { lng: -43.244951, lat: -22.856215, zoom: 12.84 };
const ORIGINAL_MOBILE = { lng: -43.244951, lat: -22.856215, zoom: 11.44 };

type MapPosition = { lng: number; lat: number; zoom: number };

const TRIGGER_POSITIONS: { desktop: MapPosition; mobile: MapPosition }[] = [
  {
    desktop: { lng: -43.249911, lat: -22.840191, zoom: 14.93 },
    mobile: { lng: -43.249911, lat: -22.840191, zoom: 13.9 },
  },
  {
    desktop: { lng: -43.248355, lat: -22.85196, zoom: 14.17 },
    mobile: { lng: -43.245305, lat: -22.850732, zoom: 14.17 },
  },
  {
    desktop: { lng: -43.244029, lat: -22.861132, zoom: 14.6 },
    mobile: { lng: -43.241559, lat: -22.861132, zoom: 13.9 },
  },
  {
    desktop: { lng: -43.241946, lat: -22.867411, zoom: 14.6 },
    mobile: { lng: -43.241946, lat: -22.867411, zoom: 13.9 },
  },
  {
    desktop: { lng: -43.248505, lat: -22.876256, zoom: 13.8 },
    mobile: { lng: -43.247605, lat: -22.876256, zoom: 13.8 },
  },
];

// Layer IDs shown at each trigger step (index 0 = trigger 1, etc.)
const TRIGGER_LAYERS: string[][] = [
  ["piscinao-4mbq07", "piscinao-b12yr9"],
  ["rua-ari-leao-0eidsa", "rua-ari-leao-0eidsa copy"],
  ["nova-mare-7a103m", "nova-mare-7a103m copy"],
  ["conjunto-bento-ribeiro-19jhxj"],
  ["conclusao-icone-e-texto-dbjh3k"],
];

const ALL_LAYER_IDS = TRIGGER_LAYERS.flat();

const CARD_HEIGHTS = ["100vh", "100vh", "100vh", "100vh", "100vh"];

const MOBILE_OVERLAYS = [
  {
    src: piscinaoMobileSvg.src,
    lng: -43.250499,
    lat: -22.8393554,
    width: 300,
    offsetX: 15,
    offsetY: 40,
  },
  {
    src: ruaAriLeaoMobileSvg.src,
    lng: -43.2442508,
    lat: -22.8504434,
    width: 340,
    offsetX: -23,
    offsetY: 0,
  },
  {
    src: novaMareMobileSvg.src,
    lng: -43.2411912,
    lat: -22.8625694,
    width: 320,
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
    // Ease in-out quad
    const t = rawT < 0.5 ? 2 * rawT * rawT : 1 - (-2 * rawT + 2) ** 2 / 2;

    for (const id of layerIds) {
      const start = startValues.get(id) ?? 0;
      try {
        map.setPaintProperty(id, "icon-opacity", start + (targetOpacity - start) * t);
      } catch {
        // Layer not found in the current style — skip silently
      }
    }

    if (rawT < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}

export function ScrollMapMapbox() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card4Ref = useRef<HTMLDivElement>(null);
  const card5Ref = useRef<HTMLDivElement>(null);
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

    const cardRefs = [card1Ref, card2Ref, card3Ref, card4Ref, card5Ref];

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

      triggers.push(
        ScrollTrigger.create({
          trigger: card4Ref.current,
          start: "top center",
          end: "bottom center",
          onEnter: () => {
            flyTo(TRIGGER_POSITIONS[3]);
            hideLayers(2);
            showLayers(3);
          },
          onLeaveBack: () => {
            flyTo(TRIGGER_POSITIONS[2]);
            hideLayers(3);
            showLayers(2);
          },
        }),
      );

      triggers.push(
        ScrollTrigger.create({
          trigger: card5Ref.current,
          start: "top center",
          end: "bottom center",
          onEnter: () => {
            flyTo(TRIGGER_POSITIONS[4]);
            hideLayers(3);
            showLayers(4);
          },
          onLeaveBack: () => {
            flyTo(TRIGGER_POSITIONS[3]);
            hideLayers(4);
            showLayers(3);
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

    // Ensure all layers start hidden regardless of style defaults
    for (const id of ALL_LAYER_IDS) {
      try {
        map.setPaintProperty(id, "icon-opacity", 0);
      } catch {
        // Layer may not exist in the style yet
      }
    }

    // Snap to mobile initial position without animation
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
        <div ref={card4Ref} style={{ minHeight: CARD_HEIGHTS[3] }} />
        <div ref={card5Ref} style={{ minHeight: CARD_HEIGHTS[4] }} />
      </div>

      {/* Static temperature map displayed after the scrollytelling section */}
      <div className="bg-white! py-110 h-screen flex items-center justify-center">
        <div className="flex flex-col justify-start items-start px-4">
          <Zoom>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={mapaTemperatura.src}
              alt="Mapa"
              className="max-h-140 object-fit"
            />
          </Zoom>
          <p className="text-md block text-[#3A3434] font-bold mt-2.5">
            Mapa de temperatura da Maré
          </p>
          <p className="text-md text-[#3A3434]">Produzido por Respira Maré</p>
        </div>
      </div>
    </>
  );
}
