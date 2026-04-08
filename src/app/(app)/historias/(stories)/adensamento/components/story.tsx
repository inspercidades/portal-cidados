"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Map as MapboxMapInstance } from "mapbox-gl";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { Map as MapboxMap, type MapRef, Marker } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { Search, Share2 } from "lucide-react";
import Image from "next/image";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

import { StoryLogos } from "../../../components/story-logos";
import { ScrollProgressBar } from "../../ilhas-de-calor/components/scroll-progress-bar";
// Cover images
import capa from "../images/capa.png";
import capaMobile from "../images/capa_mobile.png";
import card3dbg from "../images/card3dbg.png";
import card3dbgMobile from "../images/card3dbg_mobile.png";
// Desktop overlay images
import card7 from "../images/card7.png";
// Mobile overlay images
import card7Mobile from "../images/card7_mobile.png";
import card7b from "../images/card7b.png";
import card7bMobile from "../images/card7b_mobile.png";
import card10 from "../images/card10.gif";
import card10Mobile from "../images/card10_mobile.gif";
import card11a from "../images/card11a.gif";
import card11aMobile from "../images/card11a_mobile.gif";
import card11B from "../images/card11B.gif";
import card11bMobile from "../images/card11b_mobile.gif";
import card12 from "../images/card12.png";
import card12Mobile from "../images/card12_mobile.png";
import card13 from "../images/card13.gif";
import card13Mobile from "../images/card13_mobile.gif";
import card18 from "../images/card18.png";
import card18Mobile from "../images/card18_mobile.png";
import card19 from "../images/card19.png";
import card20 from "../images/card20.png";
import card20Mobile from "../images/card20_mobile.png";
import card21 from "../images/card21.png";
import card21Mobile from "../images/card21_mobile.png";
// Inline figure
import figura13 from "../images/Figura 13.png";
// Map pin
import localizarSvg from "../images/localizar.svg";
import { InteractiveBuilding } from "./interactive-building";
import {
  DENS_CONSTRUTIVA_SPO_LAYER_PATCH,
  IMAGE_FADE_INS,
  IMAGE_FADE_OUTS,
  type LegendType,
  MANAGED_LAYERS,
  MAP_FLY_TRIGGERS,
  MAP_POSITIONS,
} from "./map-config";
import { MapLegend } from "./map-legend";

gsap.registerPlugin(ScrollTrigger);

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";
// Set NEXT_PUBLIC_MAPBOX_STYLE_ADENSAMENTO in .env to your custom Mapbox Studio style URL
// (the style must contain all layers in MANAGED_LAYERS, each with opacity 0 as default)
const MAPBOX_STYLE =
  "mapbox://styles/observatorio-nacional/cmmqkrnvl00be01qtcfoibtnb";

const INITIAL_VIEW = { longitude: -46.6383, latitude: -23.565, zoom: 10.2 };

const DENS_CONSTRUTIVA_SPO_LAYER_ID = "dens-construtiva-spo" as const;

function applyDensConstrutivaSpoLayerStyle(map: MapboxMapInstance) {
  if (!map.getLayer(DENS_CONSTRUTIVA_SPO_LAYER_ID)) return;
  const p = DENS_CONSTRUTIVA_SPO_LAYER_PATCH;
  map.setPaintProperty(DENS_CONSTRUTIVA_SPO_LAYER_ID, "fill-color", [
    ...p.fillColor,
  ]);
  map.setPaintProperty(
    DENS_CONSTRUTIVA_SPO_LAYER_ID,
    "fill-outline-color",
    p.fillOutlineColor,
  );
  // Opacity is driven only by applyMapLayers (scrollytelling); do not force visible on load.
  map.setFilter(DENS_CONSTRUTIVA_SPO_LAYER_ID, [...p.filter]);
}

// ---------------------------------------------------------------------------
// Image overlay definitions (desktop / mobile pairs)
// ---------------------------------------------------------------------------
const IMAGE_OVERLAYS = [
  { id: "overlay-1", desktop: card7, mobile: card7Mobile },
  { id: "overlay-2", desktop: card7b, mobile: card7bMobile },
  { id: "overlay-3a", desktop: card11a, mobile: card11aMobile },
  { id: "overlay-3b", desktop: card11B, mobile: card11bMobile },
  { id: "overlay-4", desktop: card12, mobile: card12Mobile },
  { id: "overlay-4b", desktop: card3dbg, mobile: card3dbgMobile },
  { id: "overlay-5", desktop: card10, mobile: card10Mobile },
  { id: "overlay-6", desktop: card13, mobile: card13Mobile },
  { id: "overlay-7", desktop: card18, mobile: card18Mobile },
  { id: "overlay-8", desktop: card19, mobile: card19 },
  { id: "overlay-9", desktop: card20, mobile: card20Mobile },
  { id: "overlay-10", desktop: card21, mobile: card21Mobile },
  { id: "overlay-11", desktop: card21, mobile: card21Mobile },
] as const;

// ---------------------------------------------------------------------------
// Shared UI helpers
// ---------------------------------------------------------------------------
function MapCard({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <section
      id={id}
      className="pointer-events-none flex w-full min-h-screen items-center justify-center lg:justify-start p-[10%] mb-[50vh] lg:mb-20"
    >
      <div className="pointer-events-auto backdrop-blur-[20px] bg-white/46 max-w-xs lg:max-w-lg p-8 lg:p-12">
        {children}
      </div>
    </section>
  );
}

function H({ children }: { children: React.ReactNode }) {
  return (
    <strong className="font-bold px-1 inline box-decoration-clone">
      {children}
    </strong>
  );
}

function SectionTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={`underline font-semibold text-2xl mb-6 max-w-[400px] ${className ?? "text-[#3ACC9F] selection:bg-[#3ACC9F] selection:text-white"}`}
    >
      {children}
    </h3>
  );
}

function CardText({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-sans text-base text-left leading-[150%] text-black selection:bg-[#3ACC9F] selection:text-white">
      {children}
    </div>
  );
}

function WhiteText({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-sans text-base font-light text-left leading-[150%] text-white selection:bg-white selection:text-[#2BA680]">
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export default function AdensamentoStory() {
  const mapRef = useRef<MapRef | null>(null);
  const [activeLegend, setActiveLegend] = useState<LegendType>(null);
  const [showPaulistaPin, setShowPaulistaPin] = useState(false);
  const [ca, setCa] = useState(1);
  const [to, setTo] = useState(100);
  const handleShare = useCallback(async () => {
    const shareData = {
      title: "Verticalização gera adensamento populacional?",
      text: "Como o Plano Diretor pode estimular uma cidade mais compacta — Trabalho de Gustavo Theil, orientado por Adriano Borges Costa.",
      url: typeof window !== "undefined" ? window.location.href : "",
    };
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share(shareData);
      } else if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(shareData.url);
        alert("Link copiado para a área de transferência!");
      }
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        console.error("Erro ao compartilhar:", err);
      }
    }
  }, []);

  const isMobile = useCallback(
    () => typeof window !== "undefined" && window.innerWidth < 768,
    [],
  );

  const flyTo = useCallback(
    (key: string) => {
      const map = mapRef.current?.getMap?.();
      if (!map || !map.isStyleLoaded()) return;
      const cfg = MAP_POSITIONS[key];
      if (!cfg) return;
      const pos = isMobile() ? cfg.mobile : cfg.desktop;
      map.flyTo({
        center: pos.center,
        zoom: pos.zoom,
        pitch: pos.pitch ?? 0,
        bearing: pos.bearing ?? 0,
        duration: (pos.duration ?? 4) * 1000,
        essential: true,
      });
    },
    [isMobile],
  );

  /**
   * Set Mapbox layer opacities based on the active layer IDs.
   * All layers in MANAGED_LAYERS not present in `activeLayerIds` are hidden (opacity 0).
   * If the style isn't loaded yet the change is deferred to the next style.load event.
   */
  const applyMapLayers = useCallback((activeLayerIds: string[]) => {
    const map = mapRef.current?.getMap?.();
    if (!map) return;

    const apply = () => {
      for (const layer of MANAGED_LAYERS) {
        if (!map.getLayer(layer.id)) continue;
        const opacity = activeLayerIds.includes(layer.id)
          ? layer.activeOpacity
          : 0;
        // Apply a short paint transition so opacity changes feel smooth
        map.setPaintProperty(
          layer.id,
          `${layer.opacityProperty}-transition` as Parameters<
            typeof map.setPaintProperty
          >[1],
          { duration: 600, delay: 0 },
        );
        map.setPaintProperty(layer.id, layer.opacityProperty, opacity);
      }
    };

    if (map.isStyleLoaded()) {
      apply();
    } else {
      map.once("style.load", apply);
    }
  }, []);

  // -----------------------------------------------------------------------
  // GSAP ScrollTrigger setup
  // -----------------------------------------------------------------------
  useLayoutEffect(() => {
    const triggers: ScrollTrigger[] = [];

    // Map flyTo + legend + layer visibility triggers
    MAP_FLY_TRIGGERS.forEach(({ id, mapKey, legend, layers }) => {
      triggers.push(
        ScrollTrigger.create({
          trigger: `#${id}`,
          start: "top center",
          end: "bottom center",
          onEnter: () => {
            if (mapKey) flyTo(mapKey);
            setActiveLegend(legend);
            applyMapLayers(layers);
          },
          onEnterBack: () => {
            if (mapKey) flyTo(mapKey);
            setActiveLegend(legend);
            applyMapLayers(layers);
          },
        }),
      );
    });

    // Av. Paulista pin — visible only during mapa_mais_um
    triggers.push(
      ScrollTrigger.create({
        trigger: "#mapa_mais_um",
        start: "top center",
        end: "bottom center",
        onEnter: () => setShowPaulistaPin(true),
        onEnterBack: () => setShowPaulistaPin(true),
        onLeave: () => setShowPaulistaPin(false),
        onLeaveBack: () => setShowPaulistaPin(false),
      }),
    );

    // Image fade-in triggers (scrubbed)
    Object.entries(IMAGE_FADE_INS).forEach(([chapterId, overlayIds]) => {
      const targets = overlayIds.map((id) => `#${id}`).join(", ");
      const tl = gsap.timeline();
      tl.set(targets, { opacity: 0 }).to(targets, { opacity: 1 });

      triggers.push(
        ScrollTrigger.create({
          animation: tl,
          trigger: `#${chapterId}`,
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
        }),
      );
    });

    // 3D container fade-in with cep_capitulo4b
    const tl3dIn = gsap.timeline();
    tl3dIn
      .set("#container3d", { opacity: 0 })
      .to("#container3d", { opacity: 1 });
    triggers.push(
      ScrollTrigger.create({
        animation: tl3dIn,
        trigger: "#cep_capitulo4b",
        start: "top bottom",
        end: "bottom bottom",
        scrub: true,
      }),
    );

    // Image fade-out triggers (scrubbed)
    Object.entries(IMAGE_FADE_OUTS).forEach(([blankId, overlayIds]) => {
      const targets = overlayIds.map((id) => `#${id}`).join(", ");
      const tl = gsap.timeline();
      tl.to(targets, { opacity: 0, stagger: 0.2 });

      triggers.push(
        ScrollTrigger.create({
          animation: tl,
          trigger: `#${blankId}`,
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
        }),
      );
    });

    // 3D container fade-out at mapa_seis
    const tl3dOut = gsap.timeline();
    tl3dOut.to("#container3d", { opacity: 0 });
    triggers.push(
      ScrollTrigger.create({
        animation: tl3dOut,
        trigger: "#mapa_seis",
        start: "top bottom",
        end: "bottom bottom",
        scrub: true,
      }),
    );

    return () => {
      for (const t of triggers) {
        t.kill();
      }
    };
  }, [flyTo, applyMapLayers]);

  // -----------------------------------------------------------------------
  // Render
  // -----------------------------------------------------------------------
  return (
    <>
      {/* ============================================================== */}
      {/* Scroll progress bar (green)                                     */}
      {/* ============================================================== */}
      <ScrollProgressBar barColor="#2BA680" />

      {/* ============================================================== */}
      {/* COVER — outside map wrapper                                     */}
      {/* ============================================================== */}
      <section
        id="capa"
        className="relative isolate min-h-screen h-screen w-full flex flex-col items-center justify-center px-6 md:px-12 lg:px-24 overflow-hidden"
      >
        <Image
          src={capa}
          alt=""
          fill
          className="object-cover object-center hidden md:block -z-10"
          priority
        />
        <Image
          src={capaMobile}
          alt=""
          fill
          className="object-cover object-center block md:hidden -z-10"
          priority
        />

        {/* Logos at top */}
        <div className="absolute top-16 left-0 right-0 z-20 flex flex-col items-center px-6 md:px-12 lg:px-24">
          <div className="mb-6">
            <StoryLogos />
          </div>
        </div>

        {/* Title, subtitle, author and share — centered */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-4xl md:pt-[20vh] sm:px-4">
          <h1 className="font-sans font-bold text-[23px] lg:text-[33px] leading-[44px] lg:leading-[48px] text-[#3F3F3F] selection:bg-[#3F3F3F] selection:text-white">
            Verticalização gera adensamento populacional?
            <br />
            Como o Plano Diretor pode estimular uma cidade mais compacta
          </h1>
          <p className="font-sans text-base text-[#414042] mt-4 selection:bg-[#2BA680] selection:text-white">
            Trabalho de Gustavo Theil, orientado por Adriano Borges Costa.
          </p>
          <div className="flex gap-2 justify-center mt-6">
            <button
              type="button"
              onClick={handleShare}
              className="flex items-center justify-center w-10 h-10 bg-transparent border border-[#3A3434] hover:bg-[#f0f0f0]/20 text-[#333333] rounded-full transition-all duration-300 shadow-lg cursor-pointer"
              aria-label="Compartilhar"
            >
              <Share2 size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* INTRODUÇÃO — outside map wrapper                                */}
      {/* ============================================================== */}
      <section
        id="mapa_capitulo"
        className="relative z-10 flex w-full min-h-screen items-center justify-center lg:justify-center p-[10%] bg-[#2BA680] text-white"
      >
        <div className="flex flex-col items-start max-w-xs lg:max-w-[40%]">
          <h2 className="text-white underline font-semibold text-2xl mb-6 max-w-[400px] selection:bg-white selection:text-[#2BA680]">
            Introdução
          </h2>
          <WhiteText>
            2024.
            <br />
            São Paulo, SP.
            <br />
            11.451.999 de habitantes.
            <br />
            4.996.529 de domicílios existentes.
            <br />
            <br />
            São Paulo é a cidade mais populosa do Hemisfério Sul, cuja região
            metropolitana ultrapassa 20 milhões de habitantes.
            <br />
            <br />
            Atualmente, os mecanismos que regulam o crescimento da capital
            paulista são definidos pelo Plano Diretor Estratégico (PDE),
            estabelecido em 2014 e revisado em 2023. Entre os 17 objetivos que
            ele estabelece, ao menos nove estão relacionados a estratégias de
            adensamento urbano. Um princípio central do PDE é direcionar o
            adensamento para áreas com melhor infraestrutura urbana,
            especialmente no entorno do transporte público de média e alta
            capacidade, tais como corredores de ônibus e estações de metrô e
            trem.
            <br />
            <br />A seguir exploramos quais dos parâmetros construtivos
            regulados e incentivados pelo PDE são de fato capazes de estimular
            o adensamento urbano, quando desejado.
          </WhiteText>
        </div>
      </section>

      {/* ============================================================== */}
      {/* MAP SECTION WRAPPER — sticky region                             */}
      {/* ============================================================== */}
      <div className="relative">
        {/* Sticky background container (map + overlays + building + legend) */}
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflow: "hidden",
            zIndex: 0,
          }}
        >
          {/* ---------------------------------------------------------- */}
          {/* Mapbox Map                                                   */}
          {/* ---------------------------------------------------------- */}
          <MapboxMap
            ref={mapRef}
            initialViewState={{
              longitude: INITIAL_VIEW.longitude,
              latitude: INITIAL_VIEW.latitude,
              zoom: INITIAL_VIEW.zoom,
              pitch: 0,
              bearing: 0,
            }}
            mapStyle={MAPBOX_STYLE}
            mapboxAccessToken={MAPBOX_TOKEN}
            style={{ width: "100%", height: "100%" }}
            dragPan={false}
            dragRotate={false}
            scrollZoom={false}
            keyboard={false}
            doubleClickZoom={false}
            touchZoomRotate={false}
            onLoad={(e) => {
              const map = e.target;
              const run = () => {
                applyDensConstrutivaSpoLayerStyle(map);
                applyMapLayers([]);
              };
              if (map.isStyleLoaded()) run();
              else map.once("style.load", run);
            }}
          >
            <Marker longitude={-46.6544} latitude={-23.5613} anchor="bottom">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  opacity: showPaulistaPin ? 1 : 0,
                  transition: "opacity 0.6s ease",
                  pointerEvents: "none",
                }}
              >
                <div
                  style={{
                    background: "white",
                    color: "black",
                    padding: "10px 18px",
                    borderRadius: "16px",
                    fontSize: "16px",
                    fontWeight: "normal",
                    whiteSpace: "nowrap",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
                    marginBottom: "6px",
                    fontFamily: "sans-serif",
                  }}
                >
                  Av. Paulista
                </div>
                <Image
                  src={localizarSvg}
                  alt="Av. Paulista"
                  width={50}
                  height={50}
                  className="h-[50px] w-[50px]"
                />
              </div>
            </Marker>
          </MapboxMap>

          {/* ---------------------------------------------------------- */}
          {/* Image overlays                                               */}
          {/* ---------------------------------------------------------- */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            {IMAGE_OVERLAYS.map((ov) => (
              <div
                key={ov.id}
                id={ov.id}
                className="absolute inset-0"
                style={{ opacity: 0 }}
              >
                <picture>
                  <source media="(max-width: 767px)" srcSet={ov.mobile.src} />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={ov.desktop.src}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </picture>
              </div>
            ))}
          </div>

          {/* ---------------------------------------------------------- */}
          {/* Three.js interactive building (CA / TO)                      */}
          {/* ---------------------------------------------------------- */}
          <InteractiveBuilding ca={ca} to={to} />

          {/* ---------------------------------------------------------- */}
          {/* Map legend                                                   */}
          {/* ---------------------------------------------------------- */}
          <MapLegend type={activeLegend} />
        </div>
        {/* End sticky background */}

        {/* ============================================================ */}
        {/* Scrolling content — overlaps the sticky background            */}
        {/* ============================================================ */}
        <main
          className="pointer-events-none relative z-100 isolate"
          style={{ marginTop: "-100vh" }}
        >
        {/* ------------------------------------------------------------ */}
        {/* MAP CHAPTERS                                                  */}
        {/* ------------------------------------------------------------ */}

        {/* MapaZero — empty spacer so the map becomes visible */}
        <div id="mapa_zero" className="pointer-events-none h-screen" />

        {/* MapaUm — "A Pesquisa" */}
        <MapCard id="mapa_um">
          <SectionTitle>A Pesquisa</SectionTitle>
          <CardText>
            O adensamento proposto pelo PDE busca otimizar o uso da
            infraestrutura urbana já existente em São Paulo. Ao incentivar que
            mais moradias e empregos estejam localizados próximos às
            infraestruturas de transporte público, estimula-se modos de
            deslocamento mais sustentáveis e maior acesso às oportunidades que
            as cidades oferecem.
            <br />
            <br />O mapa ao lado, produzido com dados do Censo 2022, mostra a
            <H>densidade populacional</H>de várias regiões da capital paulista.
            A unidade escolhida é a de habitantes por hectare. A área de um
            hectare equivale a área de um quadrado de 100m de lado, ou seja,
            muito próxima do tamanho médio de um quarteirão da cidade. Dessa
            maneira, propomos uma leitura de dados mais próxima da sua
            experiência urbana. E então, quantas pessoas moram na sua quadra?
          </CardText>
        </MapCard>

        {/* MapaMaisum — economias de aglomeração */}
        <MapCard id="mapa_mais_um">
          <CardText>
            Áreas densamente povoadas concentram oportunidades de emprego,
            comércio e serviços, o que gera
            <H>economias de aglomeração,</H>aumentando sua eficiência e sua
            produtividade. Em geral, regiões centrais concentram infraestrutura,
            oportunidades e pessoas.
          </CardText>
        </MapCard>

        {/* MapaDois — Paraisópolis */}
        <MapCard id="mapa_dois">
          <CardText>
            As áreas de maior<H>densidade populacional</H>de São Paulo não se
            limitam à sua zona central, mas
            <H>se espalham por diversas regiões da capital,</H>por diferentes
            motivos. É interessante notar a densidade populacional nas favelas
            de
            <H>Paraisópolis</H>(conforme se vê no mapa) e Heliópolis, que acabam
            por ser as áreas mais densas da cidade.
          </CardText>
        </MapCard>

        {/* MapaDois_helio — Heliópolis */}
        <MapCard id="mapa_dois_helio">
          <CardText>
            Nos casos de Paraisópolis e<H>Heliópolis</H>(como ilustrado no
            mapa), as altas densidades urbanas não se devem a incentivos do
            planejamento urbano e sim, ao crescimento desordenado de áreas
            informais impulsionado por décadas de urbanização acelerada e pela
            ausência de políticas habitacionais inclusivas. Esse processo gera
            desafios significativos para a mobilidade e a qualidade de vida de
            seus habitantes.
          </CardText>
        </MapCard>

        {/* MapaTres — informalidade */}
        <MapCard id="mapa_tres">
          <CardText>
            Cerca de metade dos domicílios paulistanos identificados no Censo
            2022 não estão no Cadastro Imobiliário Fiscal da prefeitura,
            revelando a grande informalidade habitacional existente em São
            Paulo, onde os parâmetros de regulação urbana discutidos aqui
            possuem pouca ou nenhuma incidência. As regiões que apresentam maior
            informalidade são favelas, lotes irregulares e ocupações em regiões
            de risco.
            <br />
            <br />O mapa ao lado mostra a distribuição da população da capital
            paulista em pontos. Cada ponto representa mil habitantes vivendo
            próximos à região indicada. Em pontos vermelhos, temos a população
            que vive em habitações fora do cadastro legal de imóveis da cidade e
            em pontos cinzas, a população que mora em imóveis legalizados pela
            prefeitura.
            <br />
            <br />E então, consegue encontrar algum padrão nessa distribuição?
          </CardText>
        </MapCard>

        {/* MapaQuatro — EETU */}
        <MapCard id="mapa_quatro">
          <CardText>
            Considerando as áreas mais consolidadas de São Paulo, como é
            possível estimular o aumento da densidade em regiões com melhor
            infraestrutura urbana? O PDE define os Eixos de Estruturação da
            Transformação Urbana (EETU), que são quadras próximas ao transporte
            público de média e alta capacidade (corredores de ônibus e estações
            de metrô e trem), onde se busca incentivar maior densidade
            populacional.
          </CardText>
        </MapCard>

        {/* CepCapitulo — EETU 150m (triggers overlay-1) */}
        <MapCard id="cep_capitulo">
          <CardText>
            Até 2023, a definição dos Eixos considerou as quadras localizadas em
            uma faixa de 150 metros de cada lado dos corredores de ônibus e em
            um raio de 400 metros ao redor das estações de metrô e trem.
          </CardText>
        </MapCard>

        {/* CepCapitulo2 — EETU 400m (triggers overlay-2) */}
        <MapCard id="cep_capitulo2">
          <CardText>
            Com a revisão do PDE, os Eixos passaram a abranger quadras situadas
            em uma faixa de 400 metros de cada lado dos corredores de ônibus e
            em um raio de 700 metros ao redor das estações de metrô e trem.
          </CardText>
        </MapCard>

        {/* Blank transition — fades out overlays 1, 2 */}
        <div id="cep_blank1" className="pointer-events-none h-[33vh]" />

        {/* MapaCinco — adensamento nos eixos */}
        <MapCard id="mapa_cinco">
          <CardText>
            Nos eixos, o objetivo seria permitir e estimular um maior
            <H>adensamento populacional,</H>ou seja, aumentar a quantidade de
            pessoas vivendo numa mesma área. Lembra-se lá do começo quando
            falamos de habitantes por hectare, ou quarteirão?! É isto mesmo, o
            objetivo é aumentar a quantidade de moradores que vivem numa mesma
            quadra. Vejamos agora quais são os três instrumentos regulatórios
            definidos pelo PDE para incentivar e viabilizar o adensamento
            populacional.
          </CardText>
        </MapCard>

        {/* ------------------------------------------------------------ */}
        {/* IMAGE-OVERLAY CHAPTERS — CA explanation                       */}
        {/* ------------------------------------------------------------ */}

        {/* CepCapitulo3a — CA = 4, full lot (triggers overlay-3a) */}
        <MapCard id="cep_capitulo3a">
          <CardText>
            O primeiro deles é o<H>coeficiente de aproveitamento (CA),</H>que
            determina quantas vezes a área do lote pode ser construída em novos
            empreendimentos imobiliários. Se o CA for igual a 4, por exemplo,
            isso significa que, se a nova construção ocupar o lote inteiro,
            podem ser construídos 4 andares.
          </CardText>
        </MapCard>

        {/* CepCapitulo3b — CA = 4, half lot (triggers overlay-3b) */}
        <MapCard id="cep_capitulo3b">
          <CardText>
            No entanto, se a nova construção ocupar apenas metade do lote, é
            possível que o edifício alcance até 8 andares.
          </CardText>
        </MapCard>

        {/* CepCapitulo4 — CA = 0.1 (triggers overlay-4) */}
        <MapCard id="cep_capitulo4">
          <CardText>
            Um<H>coeficiente de aproveitamento (CA)</H>de 0,1, como acontece em
            regiões de preservação ambiental, implica que se pode construir até
            10% da área do terreno. Portanto, para construir dois andares, a
            área ocupada não pode exceder 5% da área total do terreno.
          </CardText>
        </MapCard>

        {/* CepCapitulo4b — interactive sliders (triggers overlay-4b + 3D) */}
        <section
          id="cep_capitulo4b"
          className="pointer-events-none flex w-full min-h-screen items-center justify-center lg:justify-start p-[10%] mb-[50vh] lg:mb-20"
        >
          <div className="pointer-events-auto backdrop-blur-[20px] bg-white/46 max-w-xs lg:max-w-lg p-8 lg:p-12">
            <CardText>
              Sua vez! Use os painéis abaixo para alterar a TO e o CA do
              edifício ao lado.
            </CardText>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <label
                  htmlFor="slider-ca"
                  className="font-semibold w-16 shrink-0"
                >
                  CA:
                </label>
                <input
                  id="slider-ca"
                  type="range"
                  min="0"
                  max="4"
                  step="0.1"
                  value={ca}
                  onChange={(e) => setCa(parseFloat(e.target.value))}
                  className="slider-adensamento h-2 min-w-0 flex-1 rounded-lg appearance-none cursor-pointer bg-transparent"
                  style={
                    {
                      "--slider-progress": `${(ca / 4) * 100}%`,
                    } as React.CSSProperties
                  }
                />
                <span className="font-mono w-10 shrink-0 text-right">
                  {ca}×
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <label
                  htmlFor="slider-to"
                  className="font-semibold w-16 shrink-0"
                >
                  TO (%):
                </label>
                <input
                  id="slider-to"
                  type="range"
                  min="0"
                  max="100"
                  step="0.1"
                  value={to}
                  onChange={(e) => setTo(parseFloat(e.target.value))}
                  className="slider-adensamento h-2 min-w-0 flex-1 rounded-lg appearance-none cursor-pointer bg-transparent"
                  style={
                    { "--slider-progress": `${to}%` } as React.CSSProperties
                  }
                />
                <span className="font-mono w-10 shrink-0 text-right">
                  {to}%
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Blank transition — fades out overlays 3a, 3b, 4, 4b */}
        <div id="cep_blank2" className="pointer-events-none h-[33vh]" />

        {/* ------------------------------------------------------------ */}
        {/* MAP CHAPTERS — density construtiva                            */}
        {/* ------------------------------------------------------------ */}

        {/* MapaSeis — density construtiva */}
        <MapCard id="mapa_seis">
          <CardText>
            Assim, o CA define a densidade construtiva das novas edificações em
            um terreno, em uma quadra ou em uma região.
            <br />
            <br />
            No mapa ao lado, você pode verificar a atual densidade construtiva
            da capital paulista, ou seja, qual o coeficiente de aproveitamento
            real aplicado.
          </CardText>
        </MapCard>

        {/* CepCapitulo5 — cota parte máxima (triggers overlay-5) */}
        <MapCard id="cep_capitulo5">
          <CardText>
            O segundo instrumento é a definição de
            <H>cota parte máxima</H>. Ela é a cota de terreno por unidade
            habitacional e determina o número mínimo de unidades de moradia que
            devem ser feitas em novas edificações, dado o tamanho do terreno a
            ser incorporado. Em uma região de
            <H>cota parte máxima</H>igual a 20m², um terreno de 1.000m² deve
            conter ao menos 50 unidades habitacionais nas novas edificações.
            <br />
            <br />A<H>cota parte máxima</H>define a<H>densidade habitacional</H>
            das novas edificações em um terreno, em uma quadra ou em uma região.
          </CardText>
        </MapCard>

        {/* CepCapitulo6 — gabarito (triggers overlay-6) */}
        <MapCard id="cep_capitulo6">
          <CardText>
            O terceiro instrumento é o<H>gabarito,</H>que é a altura máxima dos
            edifícios.
            <br />
            <br />
            <H>gabarito</H>define a<H>verticalização</H>das novas edificações em
            um terreno, em uma quadra ou em uma região.
          </CardText>
        </MapCard>

        {/* CepCapitulo6b — summary */}
        <MapCard id="cep_capitulo6b">
          <CardText>
            Em áreas que se quer criar<H>densidade populacional,</H>o PDE pode
            definir tais instrumentos para gerar maior
            <H>densidade construtiva,</H>
            <H>densidade habitacional</H>e<H>verticalização</H>. Já em miolos de
            bairros, ou regiões de preservação histórica ou ambiental, o oposto
            pode ser feito, desestimulando ou não permitindo maiores densidades
            populacionais.
            <br />
            <br />
            Afinal, quais parâmetros construtivos são mais relevantes para
            definir a<H>densidade populacional</H>de uma região?
            <H>verticalização</H>está necessariamente associada a uma maior
            densidade?
          </CardText>
        </MapCard>

        {/* Blank transition — fades out overlays 5, 6 */}
        <div id="cep_blank3" className="pointer-events-none h-[33vh]" />

        {/* ------------------------------------------------------------ */}
        {/* RESEARCH RESULTS                                              */}
        {/* ------------------------------------------------------------ */}

        {/* MapaSete — research intro */}
        <MapCard id="mapa_sete">
          <CardText>
            Gustavo Theil, aluno de economia do Insper, e Adriano Borges Costa,
            professor e pesquisador do Centro de Estudos das Cidades do Insper,
            investigaram quais desses fatores melhor determinam a
            <H>densidade populacional</H>e, portanto, deveriam ser privilegiados
            no PDE em regiões para as quais se busca adensamento populacional.
          </CardText>
        </MapCard>

        {/* CepCapitulo7 — conclusion (triggers overlay-7) */}
        <MapCard id="cep_capitulo7">
          <CardText>
            A pesquisa concluiu que, nas regiões em que o PDE exerce influência,
            ou seja, naquelas sem grande informalidade em termos de moradia, a
            <H>densidade habitacional,</H>estimulada pela
            <H>cota parte máxima,</H>
            foi a característica construtiva mais relevante para definir a
            <H>densidade populacional</H>.
          </CardText>
        </MapCard>

        {/* CepCapitulo7b — figure (Figura 13) */}
        <section
          id="cep_capitulo7b"
          className="pointer-events-none flex w-full min-h-screen items-center justify-center lg:justify-start p-[10%] mb-[50vh] lg:mb-20"
        >
          <div className="pointer-events-auto backdrop-blur-[20px] bg-white/46 max-w-xs lg:max-w-lg p-8 lg:p-12 relative overflow-visible">
            <Zoom>
              <div className="relative w-full overflow-visible">
                <Image
                  src={figura13}
                  alt="Gráfico de relevância dos fatores construtivos"
                  width={figura13.width}
                  height={figura13.height}
                  className="w-[250px] lg:w-[600px] h-auto mx-auto selection:bg-[#ef4444] selection:text-white block cursor-zoom-in"
                />
                <button
                  type="button"
                  className="absolute -top-6 -right-6 lg:-top-10 lg:-right-10 p-2 rounded-full border-0 bg-white/90 shadow-md cursor-zoom-in flex items-center justify-center text-gray-700 hover:bg-white hover:shadow-lg transition-colors"
                  aria-label="Ampliar imagem"
                >
                  <Search className="w-5 h-5 lg:w-6 lg:h-6" />
                </button>
              </div>
            </Zoom>
          </div>
        </section>

        {/* CepCapitulo8 — cota parte nos eixos (triggers overlay-8) */}
        <MapCard id="cep_capitulo8">
          <CardText>
            Esse resultado é muito importante, visto que a regulação sobre a
            <H>cota parte máxima</H>vigora apenas nas regiões dos
            <H>eixos,</H>em que ela é de 20m².
          </CardText>
        </MapCard>

        {/* CepCapitulo9 — CA relevance (triggers overlay-9) */}
        <MapCard id="cep_capitulo9">
          <CardText>
            A<H>densidade construtiva,</H>estimulada pelo
            <H>coeficiente de aproveitamento,</H>também apresentou grande
            relevância para explicar<H>densidade populacional</H>.
          </CardText>
        </MapCard>

        {/* CepCapitulo10 — verticalização (triggers overlay-10) */}
        <MapCard id="cep_capitulo10">
          <CardText>
            Já a<H>verticalização,</H>quando não acompanhada de maior
            <H>densidade habitacional e construtiva,</H>não determina a
            <H>densidade populacional</H>de uma região. Ou seja, prédios altos,
            mas que ocupam apenas uma área pequena do terreno e possuem
            apartamentos grandes, não promovem o adensamento populacional
            desejado pelo PDE para regiões com melhor infraestrutura.
          </CardText>
        </MapCard>

        {/* CepCapitulo11 — ideal model (triggers overlay-11) */}
            <div className="pointer-events-none" style={{ height: "200vh" }}>
        <MapCard id="cep_capitulo11">
          <CardText>
            Entretanto, sem<H>verticalização</H>também não é possível gerar
            <H>densidade habitacional e construtiva</H>.
            <br />
            <br />A questão central, então, é: qual o modelo ideal de
            <H>verticalização</H>para promover<H>densidade populacional</H>?
            <br />
            <br />A evidência trazida pela pesquisa aponta que o PDE deve
            estimular, nos Eixos, a construção de edifícios com poucos recuos,
            que ocupam a maior parte do terreno e que possuem apartamentos
            pequenos, de forma a gerar
            <H>verticalização com adensamento habitacional e construtivo</H>.
          
          </CardText>
        </MapCard>
            </div>

        {/* ------------------------------------------------------------ */}
        {/* End of map scrollytelling content                             */}
        {/* ------------------------------------------------------------ */}
      </main>
      </div>
      {/* End map section wrapper — sections below have no map behind them */}

        {/* ------------------------------------------------------------ */}
        {/* CONCLUSÃO                                                     */}
        {/* ------------------------------------------------------------ */}
        <section
          id="capitulo_final"
          className="flex w-full min-h-screen items-center justify-center lg:justify-center p-[10%] bg-[#2BA680] text-white"
        >
          <div className="flex flex-col items-start max-w-xs lg:max-w-[40%]">
            <h2 className="text-white underline font-semibold text-2xl mb-6 max-w-[400px] selection:bg-white selection:text-[#2BA680]">
              Conclusão
            </h2>
            <WhiteText>
              Dessa forma, para o bem ou para o mal, caso a prefeitura consiga
              regulamentar os padrões construtivos, ela será capaz de definir a
              densidade em cada parte da capital paulista. Esse poder não vem
              desacompanhado de perigos: dependerá de uma administração
              responsável. Se, por ventura, a demanda nas regiões centrais
              estiver sendo reprimida pela regulação, é possível que ela venha
              causando um espraiamento urbano, algo que o próprio PDE almeja
              combater.
              <br />
              <br />
              Por fim, cerca de metade das moradias de São Paulo se encontram em
              situação de informalidade e, portanto, a regulação não surte
              efeito direto nelas. Para fins de planejamento urbano, este é um
              problema grave e suas raízes devem ser investigadas. Uma hipótese
              que está em linha com os pontos trazidos anteriormente, se refere
              à possibilidade da demanda reprimida e de preços elevados gerarem
              incentivos para a formação de um mercado de moradia informal.
              <br />
              <br />A história aqui apresentada é resultado do trabalho de
              Iniciação Científica de Gustavo Theil, intitulado &quot;Para o bem
              ou para o mal: análise da capacidade que o governo tem de
              controlar a densidade habitacional&quot;. Para acessar a pesquisa
              completa acesse o link.
            </WhiteText>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/* CRÉDITOS                                                      */}
        {/* ------------------------------------------------------------ */}
        <section
          id="creditos"
          className="flex w-full min-h-[120vh] items-center justify-start p-[10%] bg-[#1E1E1E] text-white"
        >
          <div className="flex flex-col items-start max-w-xs lg:max-w-full">
            <h2 className="text-white underline font-semibold text-2xl mb-1 selection:bg-white selection:text-[#2BA680]">
              Equipe
            </h2>
            <WhiteText>
              <b>Autor:</b> Gustavo Theil
              <br />
              <b>Orientador:</b> Adriano Borges Costa
              <br />
              <br />
              <b>Coordenador Executivo:</b> Maurício Bouskela
              <br />
              <b>Roteirista:</b> Caio Jacintho
              <br />
              <b>Designer:</b> Pedro Meneghel
              <br />
              <b>Desenvolvimento:</b> Renan Rodrigues, Lucas Tavares
            </WhiteText>

            <h2 className="text-white underline font-semibold text-2xl mb-1 mt-15 selection:bg-white selection:text-[#2BA680]">
              Metodologia
            </h2>
            <WhiteText>
              Para chegar no resultado apresentado por esta pesquisa, foram
              aplicados dois modelos: random forest e regressão linear. O random
              forest foi utilizado para capturar relações mais complexas e não
              lineares entre as variáveis, identificando a importância de
              fatores como cota parte máxima e coeficiente de aproveitamento na
              densidade populacional. Já a regressão linear mediu de forma mais
              simples o impacto direto das variáveis construtivas, evidenciando
              a correlação entre CA e adensamento.
            </WhiteText>

            <h2 className="text-white underline font-semibold text-2xl mb-1 mt-15 selection:bg-white selection:text-[#2BA680]">
              Publicação
            </h2>
            <WhiteText>
              <a
                className="font-bold underline"
                href="https://www.insper.edu.br/pt/pesquisa/centro-de-estudos-das-cidades"
                target="_blank"
                rel="noreferrer"
              >
                <br />
                &quot;Para o bem ou para o mal: Análise da capacidade que o
                governo tem de controlar a densidade habitacional&quot;
                <br />
              </a>
              Gustavo Theil
              <br />
              <br />
              Iniciação Científica
              <br />
              Insper Instituto de Ensino e Pesquisa
              <br />
              Ciências Econômicas
              <br />
              2024
            </WhiteText>
          </div>
        </section>
    </>
  );
}
