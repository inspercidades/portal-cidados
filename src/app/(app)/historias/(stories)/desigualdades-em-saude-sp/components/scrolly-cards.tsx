"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";
import "mapbox-gl/dist/mapbox-gl.css";
import { useRef, useState } from "react";
import MapboxMap from "react-map-gl/mapbox";

const GEOSES_LEGEND = [
  { label: "-1", color: "#b2182b" },
  { label: "-0.75", color: "#d6604d" },
  { label: "-0.5", color: "#f4a582" },
  { label: "-0.25", color: "#fddbc7" },
  { label: "0", color: "#f7f7f7" },
  { label: "0.25", color: "#d1e5f0" },
  { label: "0.5", color: "#92c5de" },
  { label: "0.75", color: "#4393c3" },
  { label: "1", color: "#2166ac" },
];

const AV_PAULISTA_GEOJSON = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: [
          [-46.6628278, -23.5559773],
          [-46.6449727, -23.5707779],
        ],
      },
    },
    {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: [
          [-46.6470405, -23.5691045],
          [-46.646032, -23.5698428],
          [-46.6450229, -23.5705971],
          [-46.6442632, -23.5712031],
        ],
      },
    },
  ],
};

const AV_PAULISTA_ENVELOPE_GEOJSON = {
  type: "Feature",
  properties: {},
  geometry: {
    type: "LineString",
    coordinates: [
      [-46.6655826, -23.5532485],
      [-46.6663238, -23.5543162],
      [-46.6668003, -23.5555295],
      [-46.6665356, -23.5574222],
      [-46.6655297, -23.5590237],
      [-46.6639943, -23.5604311],
      [-46.6604679, -23.5630646],
      [-46.6579008, -23.5651353],
      [-46.6539987, -23.5681471],
      [-46.6510208, -23.5707825],
      [-46.6481644, -23.572757],
      [-46.6435054, -23.573679],
      [-46.6414711, -23.5724766],
      [-46.6417791, -23.5703119],
      [-46.642806, -23.5684295],
      [-46.6448597, -23.5667353],
      [-46.6480429, -23.5640999],
      [-46.6512262, -23.5611821],
      [-46.6544117, -23.5585384],
      [-46.6583629, -23.5549784],
      [-46.6617707, -23.5523264],
      [-46.6633431, -23.5522399],
      [-46.6655771, -23.553243],
    ],
  },
};

const JARDIM_HELENA_GEOJSON = {
  type: "Feature",
  geometry: {
    type: "Polygon",
    coordinates: [
      [
        [-46.4014107, -23.4808892],
        [-46.4026644, -23.474154],
        [-46.4087537, -23.4675828],
        [-46.4193205, -23.4687328],
        [-46.42935, -23.4692257],
        [-46.4368721, -23.4728398],
        [-46.4415286, -23.4769467],
        [-46.4443942, -23.4835174],
        [-46.4409913, -23.489595],
        [-46.438484, -23.4933729],
        [-46.4343647, -23.4953439],
        [-46.418425, -23.4974791],
        [-46.3994406, -23.4981361],
        [-46.3903066, -23.4946869],
        [-46.3820681, -23.4887738],
        [-46.3725759, -23.4815462],
        [-46.3790234, -23.4700471],
        [-46.3843964, -23.4672543],
        [-46.3888738, -23.4713613],
        [-46.3920976, -23.4748111],
        [-46.4014107, -23.4808892],
      ],
    ],
  },
  properties: {},
};

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const MOBILE_BREAKPOINT = 768;

type StoryMapLocation = {
  longitude: number;
  latitude: number;
  zoom: number;
  pitch: number;
  bearing: number;
  top: number;
  text: React.ReactNode;
  mobile?: Partial<Pick<StoryMapLocation, "longitude" | "latitude" | "zoom">>;
};

const isMobileViewport = () =>
  typeof window !== "undefined" && window.innerWidth < MOBILE_BREAKPOINT;

const getFlyToView = (location: StoryMapLocation) => {
  const mobile = isMobileViewport() ? location.mobile : undefined;
  return {
    longitude: mobile?.longitude ?? location.longitude,
    latitude: mobile?.latitude ?? location.latitude,
    zoom: mobile?.zoom ?? location.zoom,
    pitch: location.pitch,
    bearing: location.bearing,
  };
};

export default function ScrollyCards() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Map state - initialize with correct values based on device type
  const [viewState, setViewState] = useState(() => {
    if (isMobileViewport()) {
      return {
        longitude: -46.610198,
        latitude: -23.680764,
        zoom: 9.0,
        pitch: 0,
        bearing: 0,
      };
    }
    return {
      longitude: -46.657198,
      latitude: -23.680764,
      zoom: 9.3,
      pitch: 0,
      bearing: 0,
    };
  });

  const [legendVisible, setLegendVisible] = useState(true);
  const [legendCollapsed, setLegendCollapsed] = useState(false);

  const flyToLocation = (location: StoryMapLocation) => {
    if (!mapRef.current) return;
    const view = getFlyToView(location);
    const map = mapRef.current.getMap();
    map.flyTo({
      center: [view.longitude, view.latitude],
      zoom: view.zoom,
      pitch: view.pitch,
      bearing: view.bearing,
      duration: 2000,
      essential: true,
    });
  };

  // Define your travel locations
  const locations: StoryMapLocation[] = [
    {
      longitude: -46.657198,
      latitude: -23.680764,
      zoom: 9.5,
      pitch: 0,
      bearing: 0,
      top: 0,
      text: (
        <>
          <b>A desigualdade existente do município de São Paulo</b> pode ser
          visualizada de forma clara por meio do Índice GeoSES, que resume as{" "}
          <b>
            condições socioeconômicas vividas nas diferentes regiões da cidade
          </b>
          . Este mapa, com dados de 2010, revela como fatores como renda,
          educação e infraestrutura urbana estão distribuídos de maneira
          desigual na cidade. As áreas em azul indicam regiões com melhores
          condições socioeconômicas, enquanto as áreas em vermelho representam
          regiões com maior vulnerabilidade.
        </>
      ),
    },
    {
      longitude: -46.6583,
      latitude: -23.5655,
      zoom: 12,
      mobile: {
        longitude: -46.6705,
        zoom: 11.7,
      },
      pitch: 0,
      bearing: 0,
      top: 150,
      text: (
        <>
          Notamos a <b>desigualdade entre os bairros</b> à medida que nos
          afastamos progressivamente das <b>regiões centrais da cidade</b>, como
          a <b>Avenida Paulista</b>, e nos aproximamos da <b>periferia</b>, como
          o bairro do <b>Jardim Helena</b>, na Zona Leste de São Paulo.
        </>
      ),
    },
    {
      longitude: -46.4133,
      latitude: -23.5085,
      zoom: 11,
      pitch: 0,
      bearing: 0,
      top: 300,
      text: (
        <>
          A seguir, contaremos a <strong>história de Maria</strong>, que{" "}
          <strong>mora no Jardim Helena</strong>. Este é um caso hipotético, mas
          muito comum na realidade Paulistana.
        </>
      ),
    },
  ];

  // Animate map transitions on scroll
  useGSAP(() => {
    locations.forEach((location, index) => {
      const cardElement = containerRef.current?.querySelector(
        `[data-card-index="${index}"]`,
      );

      if (cardElement) {
        ScrollTrigger.create({
          trigger: cardElement,
          start: "center center",

          onEnter: () => {
            flyToLocation(location);
            toggleHighlightLayer(index === 1);
            if (index < locations.length - 1) {
              toggleJardimHelenaLayer(index === 2);
            }
          },
          onEnterBack: () => {
            flyToLocation(location);
            toggleHighlightLayer(index === 1);
            if (index < locations.length - 1) {
              toggleJardimHelenaLayer(index === 2);
            }
          },
          onLeave:
            index === 0
              ? () => {
                  flyToLocation(locations[1]);
                  toggleHighlightLayer(true);
                }
              : index === 1
                ? () => {
                    flyToLocation(locations[locations.length - 1]);
                    toggleHighlightLayer(false);
                    toggleJardimHelenaLayer(true);
                  }
                : undefined,
        });
      }
    });

    // Separate trigger for geoses-spo visibility on last card
    const lastCardElement = containerRef.current?.querySelector(
      `[data-card-index="${locations.length - 1}"]`,
    );

    const setGeosesOpacity = (opacity: number) => {
      if (!mapRef.current) return;
      const map = mapRef.current.getMap();
      if (map.isStyleLoaded()) {
        map.setPaintProperty("geoses-spo", "fill-opacity", opacity);
      }
    };

    if (lastCardElement) {
      ScrollTrigger.create({
        trigger: lastCardElement,
        start: "top top",
        onEnter: () => {
          setGeosesOpacity(0);
          toggleJardimHelenaLayer(false);
          setLegendVisible(false);
        },
        onEnterBack: () => {
          setGeosesOpacity(0);
          toggleJardimHelenaLayer(false);
          setLegendVisible(false);
        },
        onLeaveBack: () => {
          setGeosesOpacity(1);
          toggleJardimHelenaLayer(true);
          setLegendVisible(true);
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        trigger.kill();
      });
    };
  }, []);

  const handleMapLoad = () => {
    if (!mapRef.current) return;
    const map = mapRef.current.getMap();

    map.addSource("av-paulista", {
      type: "geojson",
      data: AV_PAULISTA_GEOJSON as unknown as GeoJSON.FeatureCollection,
    });

    // Asfalto — camadas empilhadas (borda → faixa branca → asfalto → tracejado)
    map.addLayer({
      id: "av-paulista-curb",
      type: "line",
      source: "av-paulista",
      paint: {
        "line-color": "#4A4A4A",
        "line-width": 19,
        "line-opacity": 1,
      },
      layout: { visibility: "none" },
    });

    map.addLayer({
      id: "av-paulista-shoulder",
      type: "line",
      source: "av-paulista",
      paint: {
        "line-color": "#ffffff",
        "line-width": 15,
        "line-opacity": 1,
      },
      layout: { visibility: "none" },
    });

    map.addLayer({
      id: "av-paulista-asphalt",
      type: "line",
      source: "av-paulista",
      paint: {
        "line-color": "#4A4A4A",
        "line-width": 12,
        "line-opacity": 1,
      },
      layout: { visibility: "none" },
    });

    map.addLayer({
      id: "av-paulista-centerline",
      type: "line",
      source: "av-paulista",
      paint: {
        "line-color": "#ffffff",
        "line-width": 2.1,
        "line-dasharray": [5, 3.5],
        "line-opacity": 1,
      },
      layout: { visibility: "none" },
    });

    const avPaulistaLabelStart: [number, number] = [-46.6675, -23.5545146];
    const avPaulistaLabelEnd: [number, number] = [-46.682, -23.5545146];

    map.addSource("av-paulista-envelope", {
      type: "geojson",
      data: AV_PAULISTA_ENVELOPE_GEOJSON as GeoJSON.Feature,
    });

    map.addLayer({
      id: "av-paulista-envelope-layer",
      type: "line",
      source: "av-paulista-envelope",
      paint: {
        "line-color": "black",
        "line-width": 2,
        "line-dasharray": [4, 4],
        "line-opacity": 0.85,
      },
      layout: { visibility: "none" },
    });

    map.addSource("av-paulista-leader", {
      type: "geojson",
      data: {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [avPaulistaLabelStart, avPaulistaLabelEnd],
        },
        properties: {},
      } as GeoJSON.Feature,
    });

    map.addLayer({
      id: "av-paulista-leader-layer",
      type: "line",
      source: "av-paulista-leader",
      paint: {
        "line-color": "#000000",
        "line-width": 1.5,
        "line-dasharray": [2, 2],
      },
      layout: { visibility: "none" },
    });

    map.addSource("av-paulista-label", {
      type: "geojson",
      data: {
        type: "Feature",
        geometry: { type: "Point", coordinates: avPaulistaLabelEnd },
        properties: {},
      } as GeoJSON.Feature,
    });

    map.addLayer({
      id: "av-paulista-label-layer",
      type: "symbol",
      source: "av-paulista-label",
      layout: {
        "text-field": [
          "format",
          "Av. Paulista",
          {
            "font-scale": 1.0,
            "text-font": [
              "literal",
              ["Open Sans Bold", "Arial Unicode MS Bold"],
            ],
            "text-color": "#000000",
          },
          "\n",
          {},
          "Entorno",
          {
            "font-scale": 0.9,
            "text-color": "rgba(0, 0, 0, 0.5)",
          },
        ],
        "text-size": 20,
        "text-anchor": "right",
        "text-justify": "right",
        "text-offset": [-0.4, 0.6],
        "text-allow-overlap": true,
        visibility: "none",
      },
      paint: {
        "text-color": "#000000",
      },
    });

    map.addSource("jardim-helena-area", {
      type: "geojson",
      data: JARDIM_HELENA_GEOJSON as GeoJSON.Feature,
    });

    map.addLayer({
      id: "jardim-helena-fill",
      type: "fill",
      source: "jardim-helena-area",
      paint: { "fill-color": "#ffffff", "fill-opacity": 0.33 },
      layout: { visibility: "none" },
    });

    map.addLayer({
      id: "jardim-helena-line",
      type: "line",
      source: "jardim-helena-area",
      paint: {
        "line-color": "#000000",
        "line-width": 1.5,
        "line-dasharray": [2, 2],
      },
      layout: { visibility: "none" },
    });

    const jhStart: [number, number] = [-46.4087537, -23.4675828];
    const jhEnd: [number, number] = [-46.4088408, -23.443];

    map.addSource("jardim-helena-vline", {
      type: "geojson",
      data: {
        type: "Feature",
        geometry: { type: "LineString", coordinates: [jhStart, jhEnd] },
        properties: {},
      } as GeoJSON.Feature,
    });

    map.addLayer({
      id: "jardim-helena-vline-layer",
      type: "line",
      source: "jardim-helena-vline",
      paint: {
        "line-color": "#000000",
        "line-width": 1.5,
        "line-dasharray": [2, 2],
      },
      layout: { visibility: "none" },
    });

    map.addSource("jardim-helena-label", {
      type: "geojson",
      data: {
        type: "Feature",
        geometry: { type: "Point", coordinates: jhEnd },
        properties: {},
      } as GeoJSON.Feature,
    });

    map.addLayer({
      id: "jardim-helena-label-layer",
      type: "symbol",
      source: "jardim-helena-label",
      layout: {
        "text-field": [
          "format",
          "Jardim Helena",
          {
            "font-scale": 1.0,
            "text-font": [
              "literal",
              ["Open Sans Bold", "Arial Unicode MS Bold"],
            ],
            "text-color": "#000000",
          },
          "\n",
          {},
          "Bairro",
          { "font-scale": 0.9, "text-color": "rgba(0, 0, 0, 0.5)" },
        ],
        "text-size": 20,
        "text-anchor": "left",
        "text-justify": "left",
        "text-offset": [0.4, 0.6],
        "text-allow-overlap": true,
        visibility: "none",
      },
      paint: { "text-color": "#000000" },
    });
  };

  const toggleHighlightLayer = (visible: boolean) => {
    if (!mapRef.current) return;
    const map = mapRef.current.getMap();
    const v = visible ? "visible" : "none";
    for (const id of [
      "av-paulista-envelope-layer",
      "av-paulista-curb",
      "av-paulista-shoulder",
      "av-paulista-asphalt",
      "av-paulista-centerline",
      "av-paulista-leader-layer",
      "av-paulista-label-layer",
    ]) {
      if (map.getLayer(id)) {
        map.setLayoutProperty(id, "visibility", v);
      }
    }
  };

  const toggleJardimHelenaLayer = (visible: boolean) => {
    if (!mapRef.current) return;
    const map = mapRef.current.getMap();
    const v = visible ? "visible" : "none";
    for (const id of [
      "jardim-helena-fill",
      "jardim-helena-line",
      "jardim-helena-vline-layer",
      "jardim-helena-label-layer",
    ]) {
      if (map.getLayer(id)) {
        map.setLayoutProperty(id, "visibility", v);
      }
    }
  };

  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  if (!mapboxToken) {
    console.warn("NEXT_PUBLIC_MAPBOX_TOKEN is not set");
  }

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        flexDirection: "column",
        height: "500vh",
        width: "100%",
        alignItems: "center",
      }}
    >
      <div
        style={{ position: "sticky", top: 0 }}
        className="h-screen w-full relative"
      >
        <MapboxMap
          ref={mapRef}
          initialViewState={viewState}
          onMove={(evt) => setViewState(evt.viewState)}
          mapStyle="mapbox://styles/observatorio-nacional/cmj069yd2009i01qi0jh88i3h"
          mapboxAccessToken={mapboxToken}
          onLoad={handleMapLoad}
          style={{ width: "100%", height: "100%" }}
          interactiveLayerIds={[]}
          dragPan={false}
          dragRotate={false}
          scrollZoom={false}
          keyboard={false}
          doubleClickZoom={false}
        ></MapboxMap>

        <div
          className={`absolute top-4 right-4 z-20 rounded-lg bg-white/90 shadow-lg backdrop-blur-sm max-w-[220px] text-sm transition-opacity duration-300 ${legendVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          <button
            type="button"
            onClick={() => setLegendCollapsed((c) => !c)}
            className="flex w-full items-start justify-between gap-2 p-4 cursor-pointer"
          >
            <div className="text-left">
              <h3 className="font-semibold text-base leading-tight">
                Índice GeoSES
              </h3>
              <p className="text-sm italic text-gray-500 leading-tight mt-0.5">
                Pondera dados censitários de renda, educação, qualidade de vida
                e similares.
              </p>
            </div>
            <ChevronDown
              className={`mt-0.5 w-4 h-4 shrink-0 text-gray-500 transition-transform duration-300 ${legendCollapsed ? "-rotate-90" : ""}`}
            />
          </button>

          <div
            className={`grid transition-all duration-300 ease-in-out ${legendCollapsed ? "grid-rows-[0fr]" : "grid-rows-[1fr]"}`}
          >
            <div className="overflow-hidden">
              <ul className="space-y-1 px-4 pb-3">
                {GEOSES_LEGEND.map((item) => (
                  <li key={item.label} className="flex items-center gap-2">
                    <span
                      className="w-5 h-5 rounded-sm shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm leading-tight">{item.label}</span>
                  </li>
                ))}
              </ul>
              <p className="px-4 pb-4 text-xs italic text-gray-500 leading-tight">
                Fonte: Barrozo, L. V. et al. (2020).
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex flex-col items-center">
        {locations.map((location, index) => (
          <div
            key={`location-${index}-${location.longitude}-${location.latitude}`}
            data-card-index={index}
            className="absolute bg-[#FFFFFF]/90 h-auto w-[80vw] md:w-[460px] border border-[#000000]/20 px-[30px]
    py-[25px]
    lg:px-[32px]
    lg:py-[25px]
    shadow-lg
    "
            style={{ top: `${location.top}vh` }}
          >
            <div className="text-[#000000]">{location.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
