"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import imageCard3 from "../assets/image-card-3.png";
import imageCard4 from "../assets/image-card-4.png";
import imageCard5 from "../assets/image-card-5.png";
import imageCard6 from "../assets/image-card-6.png";
import imageCard7 from "../assets/image-card-7.png";
import ufrjSvg from "../assets/ufrj.svg";
import mareSvg from "../assets/mare.svg";
import lvSvg from "../assets/lv.svg";
import galeaoSvg from "../assets/galeao.svg";
import fiocruzSvg from "../assets/fiocruz.svg";
import avbrasilSvg from "../assets/av-brasil.svg";
import lvMobileSvg from "../assets/lv-mobile.svg";
import avBrasilMobileSvg from "../assets/av-brasil-mobile.svg";
import Image from "next/image";
import { Map as MapboxMap, Marker } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

gsap.registerPlugin(ScrollTrigger);

// ⚠️  Replace with your Mapbox Studio style URL for the Maré map
const MAPBOX_STYLE = "mapbox://styles/observatorio-nacional/cmmhtm8qk007201rybwdsa26f";
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";

// Map positions
const ORIGINAL_DESKTOP = { lng: -43.240951, lat: -22.856215, zoom: 12.84 };
const ORIGINAL_MOBILE = { lng: -43.243551, lat: -22.854215, zoom: 12.80 };
const MORRO_TIMBAU_DESKTOP = { lng: -43.241521, lat: -22.862468, zoom: 15.25 };
const MORRO_TIMBAU_MOBILE = { lng: -43.241000, lat: -22.862645, zoom: 15.20 };
const VILA_PINHEIROS_DESKTOP = { lng: -43.238435, lat: -22.869024, zoom: 14.52 };
const VILA_PINHEIROS_MOBILE = { lng: -43.238435, lat: -22.868024, zoom: 14.40 };

type LayerConfig = { id: string; prop: string; value: number };

const MAP1_LAYERS: LayerConfig[] = [
  { id: "map1-4mx9os", prop: "fill-opacity", value: 0.63 },
  { id: "map1-line", prop: "line-opacity", value: 1 },
  { id: "bahia-de-guanabara-8ry3o4", prop: "text-opacity", value: 1 },
];

interface IconConfig {
  id: string;
  src: string;
  longitude: number;
  latitude: number;
  width: number;
  height: number;
  /** x-coordinate of the anchor dot within the SVG */
  dotX: number;
  /** y-coordinate of the anchor dot within the SVG */
  dotY: number;
}

const MAP1_ICONS_DESKTOP: IconConfig[] = [
  {
    id: "ufrj",
    src: ufrjSvg.src,
    longitude: -43.2354694,
    latitude: -22.8483019,
    width: 80,
    height: 38,
    dotX: 5,
    dotY: 19,
  },
  {
    id: "mare",
    src: mareSvg.src,
    longitude: -43.2650903,
    latitude: -22.8535453,
    width: 240,
    height: 0,
    dotX: 0,
    dotY: 0,
  },
  {
    id: "lv",
    src: lvSvg.src,
    longitude: -43.2326642,
    latitude: -22.8697329,
    width: 288,
    height: 38,
    dotX: 9,
    dotY: 19,
  },
  {
    id: "galeao",
    src: galeaoSvg.src,
    longitude: -43.2396864,
    latitude: -22.8279646,
    width: 200,
    height: 0,
    dotX: 50,
    dotY: 0,
  },
  {
    id: "fiocruz",
    src: fiocruzSvg.src,
    longitude: -43.2464299,
    latitude: -22.8762657,
    width: 161,
    height: 100,
    dotX: 81,
    dotY: 9,
  },
  {
    id: "avbrasil",
    src: avbrasilSvg.src,
    longitude: -43.257527,
    latitude: -22.8370439,
    width: 230,
    height: 38,
    dotX: 96,
    dotY: 19,
  },
];

// TODO: ajuste as imagens e valores abaixo para mobile
const MAP1_ICONS_MOBILE: IconConfig[] = [
  {
    id: "ufrj",
    src: ufrjSvg.src,
    longitude: -43.2354694,
    latitude: -22.8473019,
    width: 80,
    height: 0,
    dotX: 25,
    dotY: 19,
  },
  {
    id: "mare",
    src: mareSvg.src,
    longitude: -43.2630903,
    latitude: -22.8535453,
    width: 190,
    height: 0,
    dotX: -30,
    dotY: 0,
  },
  {
    id: "lv",
    src: lvMobileSvg.src,
    longitude: -43.2326642,
    latitude: -22.8697329,
    width: 138,
    height: 38,
    dotX: 44,
    dotY: -30,
  },
  {
    id: "galeao",
    src: galeaoSvg.src,
    longitude: -43.2396864,
    latitude: -22.8259646,
    width: 240,
    height: 0,
    dotX: 100,
    dotY: -20,
  },
  {
    id: "fiocruz",
    src: fiocruzSvg.src,
    longitude: -43.2444299,
    latitude: -22.8762657,
    width: 121,
    height: 100,
    dotX: 60,
    dotY: 9,
  },
  {
    id: "avbrasil",
    src: avBrasilMobileSvg.src,
    longitude: -43.257527,
    latitude: -22.8370439,
    width: 150,
    height: 38,
    dotX: 10,
    dotY: 50,
  },
];

const MORRO_TIMBAU_LAYERS: LayerConfig[] = [
  { id: "morro-timbau-01bfni", prop: "icon-opacity", value: 1 },
];

const VILA_PINHEIROS_LAYERS: LayerConfig[] = [
  { id: "vila-dos-pinheiros1-31s02c", prop: "fill-opacity", value: 0.63 },
  { id: "vila-dos-pinheiros2-0hozsm", prop: "fill-opacity", value: 0.63 },
  { id: "vila-dos-pinheiros1-31s02c (1)", prop: "line-opacity", value: 1 },
  { id: "vila-dos-pinheiros2-0hozsm (1)", prop: "line-opacity", value: 1 },
  { id: "vila-dos-pinheiros-dot-7hfgpc", prop: "icon-opacity", value: 1 },
];

interface ScrollCardProps {
  children?: React.ReactNode;
  cardRef: React.RefObject<HTMLDivElement | null>;
  minHeight?: string;
}

function ScrollCard({ children, cardRef, minHeight = "200vh" }: ScrollCardProps) {
  return (
    <div
      ref={cardRef}
      className={
        children ? "flex items-center justify-center p-6 md:p-8 lg:p-10" : ""
      }
      style={{ minHeight }}
    >
      {children ? (
        <div className="bg-white/70 backdrop-blur-sm text-black p-6 md:p-8 lg:p-10 max-w-2xl shadow-lg rounded-lg w-full">
          {children}
        </div>
      ) : null}
    </div>
  );
}

export function IntroMare() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null);
  const [grayscaleOpacity, setGrayscaleOpacity] = useState(1);
  const [titleOpacity, setTitleOpacity] = useState(1);
  const [showIlhasTitle, setShowIlhasTitle] = useState(false);
  const [showMap1Icons, setShowMap1Icons] = useState(false);

  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const check = () => setIsMobileView(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const map1Icons = isMobileView ? MAP1_ICONS_MOBILE : MAP1_ICONS_DESKTOP;

  const card0Ref = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card4Ref = useRef<HTMLDivElement>(null);
  const card5Ref = useRef<HTMLDivElement>(null);
  const card6Ref = useRef<HTMLDivElement>(null);
  const card8Ref = useRef<HTMLDivElement>(null);
  const card9Ref = useRef<HTMLDivElement>(null);
  const card10Ref = useRef<HTMLDivElement>(null);
  const card11Ref = useRef<HTMLDivElement>(null);
  const card12Ref = useRef<HTMLDivElement>(null);
  const card13Ref = useRef<HTMLDivElement>(null);

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

    const flyTo = (
      desktop: typeof ORIGINAL_DESKTOP,
      mobile: typeof ORIGINAL_MOBILE,
    ) => {
      const map = getMap();
      if (!map) return;
      const coords = isMobile() ? mobile : desktop;
      map.flyTo({
        center: [coords.lng, coords.lat],
        zoom: coords.zoom,
        duration: 2000,
        essential: true,
      });
    };

    const setLayerVisibility = (layers: LayerConfig[], visible: boolean) => {
      const map = getMap();
      if (!map) return;
      for (const layer of layers) {
        try {
          map.setPaintProperty(layer.id, layer.prop, visible ? layer.value : 0);
        } catch {
          // Layer may not exist in the current style
        }
      }
    };

    const createTriggers = () => {
      const refs = [
        card0Ref,
        card1Ref,
        card2Ref,
        card3Ref,
        card4Ref,
        card5Ref,
        card6Ref,
        card8Ref,
        card9Ref,
        card10Ref,
        card11Ref,
        card12Ref,
        card13Ref,
      ];

      if (!refs.every((ref) => ref.current !== null)) return;

      for (const trigger of triggers) trigger.kill();
      triggers = [];

      // Card 0: Remove grayscale and title
      triggers.push(
        ScrollTrigger.create({
          trigger: card0Ref.current,
          start: "top center",
          end: "bottom center",
          onEnter: () => {
            setGrayscaleOpacity(0);
            setTitleOpacity(0);
          },
          onLeaveBack: () => {
            setGrayscaleOpacity(1);
            setTitleOpacity(1);
            setShowIlhasTitle(false);
          },
        }),
      );

      // Card 1: Show map1 layers (neighborhood boundaries + POI labels)
      triggers.push(
        ScrollTrigger.create({
          trigger: card1Ref.current,
          start: "top center",
          end: "bottom center",
          onEnter: () => {
            setLayerVisibility(MAP1_LAYERS, true);
            setShowMap1Icons(true);
          },
          onLeaveBack: () => {
            setLayerVisibility(MAP1_LAYERS, false);
            setShowMap1Icons(false);
          },
        }),
      );

      // Card 3: Hide map1 layers (same map position, just hide layers)
      triggers.push(
        ScrollTrigger.create({
          trigger: card3Ref.current,
          start: "top center",
          end: "bottom center",
          onEnter: () => {
            setLayerVisibility(MAP1_LAYERS, false);
            setShowMap1Icons(false);
          },
          onLeaveBack: () => {
            setLayerVisibility(MAP1_LAYERS, true);
            setShowMap1Icons(true);
          },
        }),
      );

      // Card 8: Fly to Morro do Timbau + show its layer
      triggers.push(
        ScrollTrigger.create({
          trigger: card8Ref.current,
          start: "top center",
          end: "bottom center",
          onEnter: () => {
            flyTo(MORRO_TIMBAU_DESKTOP, MORRO_TIMBAU_MOBILE);
            setLayerVisibility(MORRO_TIMBAU_LAYERS, true);
          },
          onLeaveBack: () => {
            flyTo(ORIGINAL_DESKTOP, ORIGINAL_MOBILE);
            setLayerVisibility(MORRO_TIMBAU_LAYERS, false);
          },
        }),
      );

      // Card 4: Fly back to original, hide morro-timbau
      triggers.push(
        ScrollTrigger.create({
          trigger: card4Ref.current,
          start: "top center",
          end: "bottom center",
          onEnter: () => {
            flyTo(ORIGINAL_DESKTOP, ORIGINAL_MOBILE);
            setLayerVisibility(MORRO_TIMBAU_LAYERS, false);
          },
          onLeaveBack: () => {
            flyTo(MORRO_TIMBAU_DESKTOP, MORRO_TIMBAU_MOBILE);
            setLayerVisibility(MORRO_TIMBAU_LAYERS, true);
          },
        }),
      );

      // Card 6: Fly to Vila dos Pinheiros + show its layers
      triggers.push(
        ScrollTrigger.create({
          trigger: card6Ref.current,
          start: "top center",
          end: "bottom center",
          onEnter: () => {
            flyTo(VILA_PINHEIROS_DESKTOP, VILA_PINHEIROS_MOBILE);
            setLayerVisibility(VILA_PINHEIROS_LAYERS, true);
          },
          onLeaveBack: () => {
            flyTo(ORIGINAL_DESKTOP, ORIGINAL_MOBILE);
            setLayerVisibility(VILA_PINHEIROS_LAYERS, false);
          },
        }),
      );

      // Card 9: Hide vila-dos-pinheiros layers and fly back
      triggers.push(
        ScrollTrigger.create({
          trigger: card9Ref.current,
          start: "top center",
          end: "bottom center",
          onEnter: () => {
            setLayerVisibility(VILA_PINHEIROS_LAYERS, false);
            flyTo(ORIGINAL_DESKTOP, ORIGINAL_MOBILE);
          },
          onLeaveBack: () => {
            setLayerVisibility(VILA_PINHEIROS_LAYERS, true);
            flyTo(VILA_PINHEIROS_DESKTOP, VILA_PINHEIROS_MOBILE);
          },
        }),
      );

      // Card 13: Transition to "Ilhas de calor" grayscale cover
      // onLeaveBack: não trocar showIlhasTitle aqui — senão ao subir o título pisca
      // para "A história da Maré" antes do fade-out. Só trocamos no onLeaveBack do card 0.
      triggers.push(
        ScrollTrigger.create({
          trigger: card13Ref.current,
          start: "top center",
          end: "bottom center",
          onEnter: () => {
            setGrayscaleOpacity(1);
            setTitleOpacity(1);
            setShowIlhasTitle(true);
          },
          onLeaveBack: () => {
            setGrayscaleOpacity(0);
            setTitleOpacity(0);
          },
        }),
      );

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    };

    const tryCreateTriggers = () => {
      const refs = [
        card0Ref,
        card1Ref,
        card2Ref,
        card3Ref,
        card4Ref,
        card5Ref,
        card6Ref,
        card8Ref,
        card9Ref,
        card10Ref,
        card11Ref,
        card12Ref,
        card13Ref,
      ];

      if (refs.every((ref) => ref.current !== null)) {
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
      timeoutId = setTimeout(() => {
        createTriggers();
      }, 150);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener(
      "orientationchange",
      () => {
        setTimeout(() => {
          createTriggers();
        }, 300);
      },
    );

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
      for (const trigger of triggers) trigger.kill();
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
    <div className="w-full">
      {/* Sticky Mapbox Map */}
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
        {/* Grayscale filter wrapper */}
        <div
          className="absolute inset-0"
          style={{
            filter: `grayscale(${grayscaleOpacity * 100}%)`,
            transition: "filter 1000ms ease-in-out",
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
            {map1Icons.map((icon) => (
              <Marker
                key={icon.id}
                longitude={icon.longitude}
                latitude={icon.latitude}
                anchor="top-left"
                style={{ pointerEvents: "none" }}
              >
                <img
                  src={icon.src}
                  width={icon.width}
                  height={icon.height}
                  alt=""
                  style={{
                    display: "block",
                    marginLeft: -icon.dotX,
                    marginTop: -icon.dotY,
                    opacity: showMap1Icons ? 1 : 0,
                    transition: "opacity 300ms ease-in-out",
                  }}
                />
              </Marker>
            ))}
          </MapboxMap>
        </div>

        {/* Title overlay */}
        <div
          className="absolute inset-0 z-10 flex items-center pl-6 md:pl-20 lg:pl-24"
          style={{
            opacity: titleOpacity,
            transition: "opacity 500ms ease-in-out",
            pointerEvents: "none",
          }}
        >
          <h1
            className="text-3xl md:text-4xl lg:text-5xl"
            style={{ color: "#E50505" }}
          >
            {showIlhasTitle ? (
              <>
                Ilhas de <strong>calor</strong>
              </>
            ) : (
              <>
                A história da <strong>Maré</strong>
              </>
            )}
          </h1>
        </div>
      </div>

      {/* Card 0: First text card */}
      <ScrollCard cardRef={card0Ref} minHeight="120vh">
        <div>
          <p className="text-base md:text-lg leading-relaxed">
            A Maré é{" "}
            <strong>um dos maiores conjunto de favelas do Brasil</strong>, e sua
            formação reflete um longo processo de ocupação urbana ligado à
            migração, remoções e políticas habitacionais do Estado.
          </p>
        </div>
      </ScrollCard>

      {/* Card 1: Invisible — triggers map1 layers */}
      <ScrollCard cardRef={card1Ref} minHeight="10vh"/>

      {/* Card 2: Text with map1 layers visible */}
      <ScrollCard cardRef={card2Ref}>
        <div>
          <p className="text-base md:text-lg leading-relaxed">
            A região onde hoje está a Maré era, até o início do século XX, uma
            área alagadiça e pantanosa, parte da Baía de Guanabara. Sua ocupação
            começou por volta da década de 1940, quando pescadores e
            trabalhadores de baixa renda passaram a construir{" "}
            <strong>moradias sobre palafitas</strong>.
          </p>
          <Image
            src={imageCard3}
            alt="Mapa da Maré"
            className="w-full h-full object-cover pt-10"
          />
        </div>
      </ScrollCard>

      {/* Card 3: Hides map1 layers */}
      <ScrollCard cardRef={card3Ref}>
        <div>
          <h2 className="text-base md:text-lg font-bold mb-2">
            Os Primeiros Anos (1940-1960)
          </h2>
          <p className="text-base md:text-lg leading-relaxed">
            A primeira favela da região foi a <strong>Morro do Timbau</strong>,
            que surgiu nos anos 1940. Nos anos seguintes, outras ocupações
            espontâneas surgiram, muitas delas sobre terrenos alagadiços,
            impulsionadas pelo crescimento da cidade e a necessidade de moradia
            acessível para trabalhadores urbanos
          </p>
          <Image
            src={imageCard4}
            alt="Mapa da Maré"
            className=" w-full h-full object-cover pt-10"
          />
        </div>
      </ScrollCard>

      {/* Card 8: Invisible — flies to Morro do Timbau */}
      <ScrollCard cardRef={card8Ref} minHeight="100vh"/>

      {/* Card 4: Flies back to original */}
      <ScrollCard cardRef={card4Ref}>
        <div>
          <h2 className="text-base md:text-lg font-bold mb-2">
            Remoções e Construção de Conjuntos Habitacionais (1960-1980)
          </h2>
          <p className="text-base md:text-lg leading-relaxed">
            A partir dos anos 1960, a expansão da Maré foi acelerada pelo
            processo de remoção de favelas de outras partes do Rio de Janeiro,
            principalmente da Zona Sul. O governo reassentou muitas dessas
            famílias em conjuntos habitacionais construídos na Maré.
          </p>
          <Image
            src={imageCard5}
            alt="Mapa da Maré"
            className="w-full h-full object-cover pt-10"
          />
        </div>
      </ScrollCard>

      {/* Card 5: Same position */}
      <ScrollCard cardRef={card5Ref}>
        <div>
          <p className="text-base md:text-lg leading-relaxed">
            Ao longo das décadas de 1960 e 1980, foram erguidos nove conjuntos
            habitacionais pelo Estado, como a <strong>Vila do João</strong> e a{" "}
            <strong>Vila dos Pinheiros</strong>. Esses projetos tinham a
            intenção de organizar a ocupação da região, mas a falta de
            infraestrutura urbana adequada manteve problemas como saneamento
            deficiente, ausência de áreas verdes e pouca ventilação.
          </p>
          <Image
            src={imageCard6}
            alt="Mapa da Maré"
            className="w-full h-full object-cover pt-10"
          />
        </div>
      </ScrollCard>

      {/* Card 6: Invisible — flies to Vila dos Pinheiros */}
      <ScrollCard cardRef={card6Ref} minHeight="80vh"/>

      {/* Card 9: Invisible — hides Vila dos Pinheiros layers, flies back */}
      <ScrollCard cardRef={card9Ref} minHeight="100vh"/>

      {/* Card 10: Consolidação e Expansão */}
      <ScrollCard cardRef={card10Ref}>
        <div>
          <h2 className="text-base md:text-lg font-bold mb-2">
            Consolidação e Expansão (1980-2000)
          </h2>
          <p className="text-base md:text-lg leading-relaxed">
            Mesmo com a presença dos conjuntos habitacionais, a autoconstrução
            continuou a expandir a Maré, resultando no crescimento de novas
            favelas no entorno. Nos anos 1990, o conjunto já estava consolidado,{" "}
            <strong> abrigando mais de 100 mil</strong> pessoas. Em 1994, a
            Avenida Brasil, que passa ao lado da Maré, foi elevada, separando
            ainda mais a comunidade do restante da cidade.
          </p>
          <Image
            src={imageCard7}
            alt="Mapa da Maré"
            className="w-full h-full object-cover pt-10"
          />
        </div>
      </ScrollCard>

      {/* Card 11: Atualmente, a Maré */}
      <ScrollCard cardRef={card11Ref} minHeight="100vh">
        <div>
          <p className="text-base md:text-lg leading-relaxed">
            Atualmente,{" "}
            <strong>
              {" "}
              a Maré é formada por 15 favelas e abriga cerca de 140 mil
              moradores
            </strong>
            . Apesar de seu tamanho e importância, o território ainda enfrenta
            desafios urbanos significativos, como ilhas de calor, poluição do ar
            e falta de infraestrutura adequada.
          </p>
        </div>
      </ScrollCard>

      {/* Card 12: O fato de quase metade das favelas */}
      <ScrollCard cardRef={card12Ref} minHeight="100vh">
        <div>
          <p className="text-base md:text-lg leading-relaxed">
            O fato de quase metade das favelas da Maré ter sido construída pelo
            poder público desmonta o argumento de que os problemas ambientais
            são exclusivamente consequência da <strong>autoconstrução </strong>
            desordenada.
          </p>
        </div>
      </ScrollCard>

      {/* Card 13: Invisible — transitions to grayscale "Ilhas de calor" cover */}
      <ScrollCard cardRef={card13Ref} minHeight="100vh" />
    </div>
  );
}
