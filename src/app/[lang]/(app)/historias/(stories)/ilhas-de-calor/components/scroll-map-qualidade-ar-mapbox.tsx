"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Fragment, useLayoutEffect, useRef, useState } from "react";
import { Map as MapboxMap, Marker } from "react-map-gl/mapbox";
import type { IlhasCopy } from "@/i18n/messages/stories/ilhas-de-calor";
import { useStoryCopy } from "@/i18n/story-copy";
import { useLocale } from "@/i18n/use-locale";
import "mapbox-gl/dist/mapbox-gl.css";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import mapaDeCO2 from "../assets/mapa-de-co2.png";
import mapaDeHCHO from "../assets/mapa-de-hcho.png";
import mapaDePM10 from "../assets/mapa-de-pm10.png";
import mapaDePM25 from "../assets/mapa-de-pm25.png";
import mapaDeUmidade from "../assets/mapa-de-umidade.png";
import novaHolandaSvg from "../assets/nova-holanda.svg";
import novaHolandaMobileSvg from "../assets/nova-holanda-mobile.svg";
import parqueEcologicoSvg from "../assets/parque-ecologico.svg";
import parqueEcologicoMobileSvg from "../assets/parque-ecologico-mobile.svg";
import piscinao2Svg from "../assets/piscinao2.svg";
import piscinao2MobileSvg from "../assets/piscinao2-mobile.svg";

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

const CARD_HEIGHTS = ["100vh", "100vh", "110vh"];

type AirMapKey = "PM10" | "PM25" | "CO2" | "HCHO" | "UMIDADE";

type AirLegend = {
  unit: { pt: string; en: string };
  digits: number;
  edges: number[];
  colors: string[];
};

const AIR_LEGENDS: Record<AirMapKey, AirLegend> = {
  PM10: {
    unit: {
      pt: "Material particulado <10 µm/m³",
      en: "Particulate matter <10 µm/m³",
    },
    digits: 1,
    edges: [32.4, 32.8, 33.2, 33.6, 34, 34.4, 34.8, 35.2],
    colors: [
      "#FFF5EB",
      "#FFF1E3",
      "#FDE7D2",
      "#FDDCBB",
      "#FDCA9A",
      "#F7954D",
      "#F89F5A",
      "#BB4126",
      "#7E2A18",
    ],
  },
  PM25: {
    unit: {
      pt: "Material particulado <2,5 µm/m³",
      en: "Particulate matter <2.5 µm/m³",
    },
    digits: 1,
    edges: [22.3, 22.7, 23.1, 23.5, 23.9, 24.3, 24.7, 25.1],
    colors: [
      "#FFF5EB",
      "#FFF3E8",
      "#FFECDA",
      "#FCDEBE",
      "#FCC593",
      "#F9A35F",
      "#F47F30",
      "#C85727",
      "#7E2A18",
    ],
  },
  CO2: {
    unit: {
      pt: "Concentração de CO₂ (ppm)",
      en: "CO₂ concentration (ppm)",
    },
    digits: 0,
    edges: [440, 450, 460, 470, 480, 490, 500],
    colors: [
      "#D7D7D6",
      "#BBBBBB",
      "#9F9F9F",
      "#848485",
      "#6A6A6A",
      "#4E4E4E",
      "#333232",
      "#151516",
    ],
  },
  HCHO: {
    unit: {
      pt: "Concentração de HCHO (mg/m³)",
      en: "HCHO concentration (mg/m³)",
    },
    digits: 4,
    edges: [0.008, 0.01, 0.012, 0.014, 0.015],
    colors: ["#DFF0E3", "#6BC5A8", "#3398A9", "#385D9C", "#372A53", "#0C0708"],
  },
  UMIDADE: {
    unit: { pt: "Umidade (%)", en: "Humidity (%)" },
    digits: 1,
    edges: [72, 72.5, 73, 73.5, 74, 74.5, 75, 75.5, 76],
    colors: [
      "#F7FBFE",
      "#EBF2FA",
      "#D4E5F4",
      "#B9D7EA",
      "#97C6DF",
      "#70AED3",
      "#4C96C7",
      "#2E7AB7",
      "#185C9D",
      "#203468",
    ],
  },
};

function formatLegendValue(value: number, digits: number, locale: "pt" | "en") {
  return value.toLocaleString(locale === "pt" ? "pt-BR" : "en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

function legendLabels(legend: AirLegend, locale: "pt" | "en") {
  const format = (value: number) =>
    formatLegendValue(value, legend.digits, locale);
  return legend.colors.map((_, index) => {
    if (index === 0) return `≤${format(legend.edges[0])}`;
    if (index === legend.colors.length - 1) {
      return `>${format(legend.edges[legend.edges.length - 1])}`;
    }
    return `${format(legend.edges[index - 1])}–${format(legend.edges[index])}`;
  });
}

function legendUnit(mapKey: AirMapKey, locale: "pt" | "en") {
  return AIR_LEGENDS[mapKey].unit[locale];
}

function AirMapLegend({ mapKey }: { mapKey: AirMapKey }) {
  const locale = useLocale() === "en" ? "en" : "pt";
  const legend = AIR_LEGENDS[mapKey];
  const labels = legendLabels(legend, locale);

  return (
    <div className="mt-2 w-full">
      <p className="mb-1 text-xs text-[#3A3434]">{legendUnit(mapKey, locale)}</p>
      <div className="flex w-full">
        {legend.colors.map((color, index) => (
          <div key={labels[index]} className="min-w-0 flex-1">
            <div
              className="h-3 border border-black/15"
              style={{ backgroundColor: color }}
            />
            <span className="mt-0.5 block text-center text-[10px] leading-tight text-[#3A3434]">
              {labels[index]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const OVERLAYS = [
  {
    desktop: {
      src: piscinao2Svg.src,
      width: 560,
      offsetX: 0,
      offsetY: 0,
      lng: -43.243499,
      lat: -22.8418554,
    },
    mobile: {
      src: piscinao2MobileSvg.src,
      width: 300,
      offsetX: 0,
      offsetY: 0,
      lng: -43.249499,
      lat: -22.8428554,
    },
  },
  {
    desktop: {
      src: novaHolandaSvg.src,
      width: 450,
      offsetX: 0,
      offsetY: 0,
      lng: -43.253577,
      lat: -22.858809,
    },
    mobile: {
      src: novaHolandaMobileSvg.src,
      width: 300,
      offsetX: 0,
      offsetY: 0,
      lng: -43.243577,
      lat: -22.860809,
    },
  },
  {
    desktop: {
      src: parqueEcologicoSvg.src,
      width: 500,
      offsetX: 0,
      offsetY: 0,
      lng: -43.2406556,
      lat: -22.864524,
    },
    mobile: {
      src: parqueEcologicoMobileSvg.src,
      width: 300,
      offsetX: 0,
      offsetY: 0,
      lng: -43.236156,
      lat: -22.869024,
    },
  },
];

function MapSelector() {
  const mapCopy = useStoryCopy<IlhasCopy>().airMap;
  const [selectedMap, setSelectedMap] = useState<AirMapKey>("PM10");

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
            <img src={currentMapSrc.src} alt={mapCopy.imageAlt} />
          </Zoom>
        )}
        <AirMapLegend mapKey={selectedMap} />
        <p className="text-md font-bold mt-2.5">
          {selectedMap === "UMIDADE" ? mapCopy.humidityCaption : mapCopy.caption}
        </p>
        <p className="text-md text-[#3A3434]">
          {mapCopy.creditBefore} <em>{mapCopy.creditName}</em>
        </p>
        <div className="flex flex-row gap-2 mt-4 flex-wrap">
          {(
            [
              { key: "PM10", label: mapCopy.pollutants.pm10 },
              { key: "PM25", label: mapCopy.pollutants.pm25 },
              { key: "CO2", label: mapCopy.pollutants.co2 },
              { key: "HCHO", label: mapCopy.pollutants.hcho },
              { key: "UMIDADE", label: mapCopy.pollutants.humidity },
            ] as const
          ).map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setSelectedMap(key)}
              className={`px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors ${selectedMap === key ? "opacity-50" : ""}`}
            >
              {label}
            </button>
          ))}
        </div>
        <div>
          <p className="text-md text-[#3A3434] my-5">{mapCopy.particles}</p>
          <p className="text-md text-[#3A3434]">{mapCopy.health}</p>
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
  const [activeOverlay, setActiveOverlay] = useState<number | null>(null);

  useLayoutEffect(() => {
    let triggers: ScrollTrigger[] = [];
    let timeoutId: NodeJS.Timeout;

    const isMobile = () =>
      typeof window !== "undefined" && window.innerWidth < 768;

    const getMap = () => {
      const map = mapRef.current?.getMap?.();
      if (map?.isStyleLoaded()) return map;
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
      setActiveOverlay(idx);
    };

    const hideLayers = (_idx: number) => {
      setActiveOverlay(null);
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
            {OVERLAYS.map((overlay, idx) => (
              <Fragment key={overlay.desktop.src}>
                <Marker
                  longitude={overlay.desktop.lng}
                  latitude={overlay.desktop.lat}
                  anchor="center"
                  style={{ pointerEvents: "none" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={overlay.desktop.src}
                    alt=""
                    className="hidden md:block"
                    style={{
                      width: overlay.desktop.width,
                      transform: `translate(${overlay.desktop.offsetX}px, ${overlay.desktop.offsetY}px)`,
                      opacity: activeOverlay === idx ? 1 : 0,
                      transition: "opacity 600ms ease-in-out",
                    }}
                  />
                </Marker>
                <Marker
                  longitude={overlay.mobile.lng}
                  latitude={overlay.mobile.lat}
                  anchor="center"
                  style={{ pointerEvents: "none" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={overlay.mobile.src}
                    alt=""
                    className="md:hidden"
                    style={{
                      width: overlay.mobile.width,
                      transform: `translate(${overlay.mobile.offsetX}px, ${overlay.mobile.offsetY}px)`,
                      opacity: activeOverlay === idx ? 1 : 0,
                      transition: "opacity 600ms ease-in-out",
                    }}
                  />
                </Marker>
              </Fragment>
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
