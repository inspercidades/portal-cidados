"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "mapbox-gl/dist/mapbox-gl.css";
import { useRef, useState } from "react";
import MapboxMap from "react-map-gl/mapbox";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function ScrollyCards() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Map state - initialize with correct values based on device type
  const [viewState, setViewState] = useState(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    if (isMobile) {
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

  // Define your travel locations
  const locations = [
    {
      longitude: -46.657198,
      latitude: -23.680764,
      zoom: 9.5,
      pitch: 0,
      bearing: 0,
      top: 0,
      text: (
        <>
          A desigualdade socioeconômica no município de São Paulo pode ser
          visualizada de forma clara por meio do Índice GeoSES, que resume as
          condições socioeconômicas da cidade. O mapa a seguir, com dados de
          2010, revela como fatores como renda, educação e infraestrutura urbana
          estão distribuídos de maneira desigual entre diferentes regiões da
          cidade. As áreas em azul indicam regiões com melhores condições
          socioeconômicas, enquanto as áreas em vermelho representam regiões com
          maior vulnerabilidade.
        </>
      ),
    },
    {
      longitude: -46.6333,
      latitude: -23.5505,
      zoom: 10,
      pitch: 0,
      bearing: 0,
      top: 150,
      text: (
        <>
          Notamos que{" "}
          <strong>
            a desigualdade aumenta progressivamente à medida que nos afastamos
            do centro da cidade
          </strong>
          . Tenha este mapa em mente, pois ele será fundamental para compreender
          a relação com os demais mapas apresentados a seguir.
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
          A seguir, contaremos a história de Maria, que mora no Jardim Helena,
          um bairro periférico da Zona Leste de São Paulo.{" "}
          <strong>
            Este é um caso hipotético, mas pode ser muito comum na realidade
            brasileira.
          </strong>
        </>
      ),
    },
    {
      longitude: -46.4133,
      latitude: -23.5085,
      zoom: 11.5,
      pitch: 0,
      bearing: 0,
      top: 450,
      text: (
        <>
          O dia começa cedo: às 4h da manhã, Maria já está de pé para preparar o
          café das crianças e tomar um banho rápido antes de sair.{" "}
          <strong>
            Como o tempo é curto, a primeira refeição do dia não é feita como
            deveria.
          </strong>{" "}
          Os alimentos ultraprocessados, como achocolatados e biscoitos
          recheados dão lugar às frutas, aos ovos e ao suco caseiro.
          <br />
          <strong className="mt-4 block">
            {" "}
            Maria tem <strong>Diabetes Mellitus</strong> e precisa medir sua
            glicose diariamente, mas sua rotina é tão corrida que nem sempre ela
            consegue fazer isso como deveria.
          </strong>
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
            if (mapRef.current) {
              const map = mapRef.current.getMap();
              map.flyTo({
                center: [location.longitude, location.latitude],
                zoom: location.zoom,
                pitch: location.pitch,
                bearing: location.bearing,
                duration: 2000,
                essential: true,
              });
            }
          },
          onEnterBack: () => {
            if (mapRef.current) {
              const map = mapRef.current.getMap();
              map.flyTo({
                center: [location.longitude, location.latitude],
                zoom: location.zoom,
                pitch: location.pitch,
                bearing: location.bearing,
                duration: 2000,
                essential: true,
              });
            }
          },
        });
      }
    });

    // Create a separate ScrollTrigger for the last card fade effect
    const lastCardElement = containerRef.current?.querySelector(
      `[data-card-index="${locations.length - 1}"]`,
    );

    if (lastCardElement) {
      ScrollTrigger.create({
        trigger: lastCardElement,
        start: "center center",

        onEnter: () => {
          if (mapRef.current) {
            const map = mapRef.current.getMap();
            if (map.isStyleLoaded()) {
              console.log("Fading out layer");
              map.setPaintProperty("geoses-spo", "fill-opacity", 0);
            } else {
              map.on("styledata", () => {
                map.setPaintProperty("geoses-spo", "fill-opacity", 0);
              });
            }
          }
        },

        onEnterBack: () => {
          if (mapRef.current) {
            const map = mapRef.current.getMap();
            if (map.isStyleLoaded()) {
              map.setPaintProperty("geoses-spo", "fill-opacity", 0);
            } else {
              map.on("styledata", () => {
                map.setPaintProperty("geoses-spo", "fill-opacity", 0);
              });
            }
          }
        },
        onLeaveBack: () => {
          if (mapRef.current) {
            const map = mapRef.current.getMap();
            if (map.isStyleLoaded()) {
              map.setPaintProperty("geoses-spo", "fill-opacity", 1);
            } else {
              map.on("styledata", () => {
                map.setPaintProperty("geoses-spo", "fill-opacity", 1);
              });
            }
          }
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        trigger.kill();
      });
    };
  }, []);

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
        height: "660vh",
        width: "100%",
        alignItems: "center",
      }}
    >
      <div style={{ position: "sticky", top: 0 }} className="h-screen w-full">
        <MapboxMap
          ref={mapRef}
          initialViewState={viewState}
          onMove={(evt) => setViewState(evt.viewState)}
          mapStyle="mapbox://styles/observatorio-nacional/cmj069yd2009i01qi0jh88i3h"
          mapboxAccessToken={mapboxToken}
          style={{ width: "100%", height: "100%" }}
          interactiveLayerIds={[]}
          dragPan={false}
          dragRotate={false}
          scrollZoom={false}
          keyboard={false}
          doubleClickZoom={false}
        ></MapboxMap>
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
    rounded-xl shadow-lg
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
