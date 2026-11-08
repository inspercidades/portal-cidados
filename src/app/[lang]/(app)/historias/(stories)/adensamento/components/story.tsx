"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Map as MapboxMapInstance } from "mapbox-gl";
import {
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Map as MapboxMap, type MapRef, Marker } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { Share2 } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

import type { AdensamentoCopy } from "@/i18n/messages/stories/adensamento";
import { useStoryCopy } from "@/i18n/story-copy";
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
import figura13 from "../images/figura13.svg";
// Map pin
import localizarSvg from "../images/localizar.svg";
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
import { MapReadyContext } from "./preload-wrapper";

const InteractiveBuilding = dynamic(
  () =>
    import("./interactive-building").then((mod) => ({
      default: mod.InteractiveBuilding,
    })),
  { ssr: false },
);

gsap.registerPlugin(ScrollTrigger);

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";
// Set NEXT_PUBLIC_MAPBOX_STYLE_ADENSAMENTO in .env to your custom Mapbox Studio style URL
// (the style must contain all layers in MANAGED_LAYERS, each with opacity 0 as default)
const MAPBOX_STYLE =
  "mapbox://styles/observatorio-nacional/cmmqkrnvl00be01qtcfoibtnb";

function getOpeningView() {
  const pos =
    typeof window !== "undefined" && window.innerWidth < 768
      ? MAP_POSITIONS.mapa_zero.mobile
      : MAP_POSITIONS.mapa_zero.desktop;
  return {
    longitude: pos.center[0],
    latitude: pos.center[1],
    zoom: pos.zoom,
  };
}

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
  const copy = useStoryCopy<AdensamentoCopy>();
  const mapRef = useRef<MapRef | null>(null);
  const pendingFlyToRef = useRef<(() => void) | null>(null);
  const pendingLayersRef = useRef<(() => void) | null>(null);
  const [activeLegend, setActiveLegend] = useState<LegendType>(null);
  const [showPaulistaPin, setShowPaulistaPin] = useState(false);
  const [showParaisoPin, setShowParaisoPin] = useState(false);
  const [showHelioPin, setShowHelioPin] = useState(false);
  const [ca, setCa] = useState(1);
  const [to, setTo] = useState(100);
  const [initialView] = useState(getOpeningView);
  const signalMapReady = useContext(MapReadyContext);
  const handleShare = useCallback(async () => {
    const shareData = {
      title: copy.cover.shareTitle,
      text: copy.cover.shareText,
      url: typeof window !== "undefined" ? window.location.href : "",
    };
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share(shareData);
      } else if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(shareData.url);
        alert(copy.cover.linkCopied);
      }
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        console.error("Error sharing:", err);
      }
    }
  }, [copy]);

  const isMobile = useCallback(
    () => typeof window !== "undefined" && window.innerWidth < 768,
    [],
  );

  const flyTo = useCallback(
    (key: string) => {
      const map = mapRef.current?.getMap?.();
      if (!map) return;
      const cfg = MAP_POSITIONS[key];
      if (!cfg) return;

      const perform = () => {
        pendingFlyToRef.current = null;
        const pos = isMobile() ? cfg.mobile : cfg.desktop;
        map.flyTo({
          center: pos.center,
          zoom: pos.zoom,
          pitch: pos.pitch ?? 0,
          bearing: pos.bearing ?? 0,
          duration: (pos.duration ?? 4) * 1000,
          essential: true,
        });
      };

      if (map.isStyleLoaded()) {
        perform();
      } else {
        // isStyleLoaded() can return false while tiles are loading mid-flyTo.
        // Cancel any previously queued flyTo and defer to the next idle event,
        // which fires once all camera animations and tile fetches have settled.
        if (pendingFlyToRef.current) {
          map.off("idle", pendingFlyToRef.current);
        }
        pendingFlyToRef.current = perform;
        map.once("idle", perform);
      }
    },
    [isMobile],
  );

  /**
   * Set Mapbox layer opacities based on the active layer IDs.
   * All layers in MANAGED_LAYERS not present in `activeLayerIds` are hidden (opacity 0).
   * If tiles are still loading (isStyleLoaded() false mid-flyTo), the change is
   * deferred to the next `idle` event — which fires after all camera animations
   * and tile fetches settle. Stale deferred calls are cancelled so only the
   * latest requested state is applied.
   */
  const applyMapLayers = useCallback((activeLayerIds: string[]) => {
    const map = mapRef.current?.getMap?.();
    if (!map) return;

    const apply = () => {
      pendingLayersRef.current = null;
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
      // Cancel any previously queued layer application so rapid scroll triggers
      // don't stack up stale handlers that fire in the wrong order.
      if (pendingLayersRef.current) {
        map.off("idle", pendingLayersRef.current);
      }
      pendingLayersRef.current = apply;
      map.once("idle", apply);
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

    // Paraisópolis pin — visible only during mapa_dois
    triggers.push(
      ScrollTrigger.create({
        trigger: "#mapa_dois",
        start: "top center",
        end: "bottom center",
        onEnter: () => setShowParaisoPin(true),
        onEnterBack: () => setShowParaisoPin(true),
        onLeave: () => setShowParaisoPin(false),
        onLeaveBack: () => setShowParaisoPin(false),
      }),
    );

    // Heliópolis pin — visible only during mapa_dois_helio
    triggers.push(
      ScrollTrigger.create({
        trigger: "#mapa_dois_helio",
        start: "top center",
        end: "bottom center",
        onEnter: () => setShowHelioPin(true),
        onEnterBack: () => setShowHelioPin(true),
        onLeave: () => setShowHelioPin(false),
        onLeaveBack: () => setShowHelioPin(false),
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
            {copy.cover.titleLine1}
            <br />
            {copy.cover.titleLine2}
          </h1>
          <p className="font-sans text-base text-[#414042] mt-4 selection:bg-[#2BA680] selection:text-white">
            {copy.cover.byline}
          </p>
          <div className="flex gap-2 justify-center mt-6">
            <button
              type="button"
              onClick={handleShare}
              className="flex items-center justify-center w-10 h-10 bg-transparent border border-[#3A3434] hover:bg-[#f0f0f0]/20 text-[#333333] rounded-full transition-all duration-300 shadow-lg cursor-pointer"
              aria-label={copy.cover.shareAria}
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
          {/* <h2 className="text-white underline font-semibold text-2xl mb-6 max-w-[400px] selection:bg-white selection:text-[#2BA680]">
            Introdução
          </h2> */}
          <WhiteText>
            {copy.intro.year}
            <br />
            {copy.intro.city}
            <br />
            {copy.intro.population}
            <br />
            {copy.intro.households}
            <br />
            <br />
            {copy.intro.south}
            <br />
            <br />
            {copy.intro.plan}
            <br />
            <br />
            {copy.intro.nextLead}{" "}
            <strong className="font-bold">{copy.intro.nextEmphasis}</strong>
            {copy.intro.nextTail}
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
              longitude: initialView.longitude,
              latitude: initialView.latitude,
              zoom: initialView.zoom,
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
                if (window.innerWidth < 768) {
                  const pos = MAP_POSITIONS.mapa_zero.mobile;
                  map.jumpTo({
                    center: pos.center,
                    zoom: pos.zoom,
                    pitch: 0,
                    bearing: 0,
                  });
                }
                applyDensConstrutivaSpoLayerStyle(map);
                // Set every managed layer to a near-zero opacity so Mapbox
                // fetches their tiles for the current viewport while the
                // loading screen is still visible.
                for (const layer of MANAGED_LAYERS) {
                  if (!map.getLayer(layer.id)) continue;
                  map.setPaintProperty(layer.id, layer.opacityProperty, 0.001);
                }
                // `idle` fires once all pending tile requests are settled.
                // Reset layers to hidden and release the loading screen.
                map.once("idle", () => {
                  applyMapLayers([]);
                  signalMapReady();
                });
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
                  {copy.pins.paulista}
                </div>
                <Image
                  src={localizarSvg}
                  alt={copy.pins.paulista}
                  width={50}
                  height={50}
                  className="h-[50px] w-[50px]"
                />
              </div>
            </Marker>

            <Marker longitude={-46.726} latitude={-23.6169} anchor="bottom">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  opacity: showParaisoPin ? 1 : 0,
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
                  {copy.pins.paraisopolis}
                </div>
                <Image
                  src={localizarSvg}
                  alt={copy.pins.paraisopolis}
                  width={50}
                  height={50}
                  className="h-[50px] w-[50px]"
                />
              </div>
            </Marker>

            <Marker longitude={-46.5919} latitude={-23.6094} anchor="bottom">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  opacity: showHelioPin ? 1 : 0,
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
                  {copy.pins.heliopolis}
                </div>
                <Image
                  src={localizarSvg}
                  alt={copy.pins.heliopolis}
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
          <div className="absolute inset-0 z-30 pointer-events-none">
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

          {/* MapaUm — "O adensamento proposto pelo ..." */}
          <MapCard id="mapa_um">
            <CardText>
              {copy.densityMap.lead} <strong>{copy.densityMap.emphasis}</strong>
              {copy.densityMap.tail}
              <br />
              <br />
              {copy.densityMap.mapLead} <H>{copy.densityMap.density}</H>{" "}
              {copy.densityMap.mapTail}
            </CardText>
          </MapCard>

          {/* MapaMaisum — economias de aglomeração */}
          <MapCard id="mapa_mais_um">
            <CardText>
              {copy.agglomeration.lead} <H>{copy.agglomeration.emphasis}</H>{" "}
              {copy.agglomeration.mid}{" "}
              <strong className="font-bold">{copy.agglomeration.avenue}</strong>
              .
            </CardText>
          </MapCard>

          {/* MapaDois — Paraisópolis */}
          <MapCard id="mapa_dois">
            <CardText>
              {copy.paraisopolis.lead} <H>{copy.paraisopolis.place}</H>{" "}
              {copy.paraisopolis.mid} <H>{copy.paraisopolis.emphasis}</H>
            </CardText>
          </MapCard>

          {/* MapaDois_helio — Heliópolis */}
          <MapCard id="mapa_dois_helio">
            <CardText>
              {copy.heliopolis.lead} <H>{copy.heliopolis.place}</H>{" "}
              {copy.heliopolis.tail}
            </CardText>
          </MapCard>

          {/* MapaTres — informalidade */}
          <MapCard id="mapa_tres">
            <CardText>
              {copy.informal.p1}
              <br />
              <br />
              {copy.informal.mapLead}{" "}
              <strong
                className="font-bold inline box-decoration-clone"
                style={{ color: "#E53935" }}
              >
                {copy.informal.red}
              </strong>
              {copy.informal.mid}{" "}
              <strong className="font-bold">{copy.informal.people}</strong>
              {copy.informal.afterPeople}{" "}
              <strong className="font-bold">{copy.informal.peripheries}</strong>{" "}
              {copy.informal.and}{" "}
              <strong className="font-bold">{copy.informal.favelas}</strong>
              {copy.informal.highlighted}{" "}
              <strong
                className="font-bold inline box-decoration-clone"
                style={{ color: "#9148b0" }}
              >
                {copy.informal.purple}
              </strong>
              .
              <br />
              <br />
              {copy.informal.closing}
            </CardText>
          </MapCard>

          {/* MapaQuatro — EETU */}
          <MapCard id="mapa_quatro">
            <CardText>
              {copy.axesIntro.lead}{" "}
              <strong className="font-bold">{copy.axesIntro.emphasis}</strong>{" "}
              {copy.axesIntro.tail}
            </CardText>
          </MapCard>

          {/* CepCapitulo — EETU 150m (triggers overlay-1) */}
          <MapCard id="cep_capitulo">
            <CardText>{copy.axes150}</CardText>
          </MapCard>

          {/* CepCapitulo2 — EETU 400m (triggers overlay-2) */}
          <MapCard id="cep_capitulo2">
            <CardText>{copy.axes400}</CardText>
          </MapCard>

          {/* Blank transition — fades out overlays 1, 2 */}
          <div id="cep_blank1" className="pointer-events-none h-[33vh]" />

          {/* MapaCinco — adensamento nos eixos */}
          <MapCard id="mapa_cinco">
            <CardText>
              {copy.axesGoal.lead}{" "}
              <strong className="font-bold">{copy.axesGoal.emphasis}</strong>
              {copy.axesGoal.tail}
            </CardText>
          </MapCard>

          {/* ------------------------------------------------------------ */}
          {/* IMAGE-OVERLAY CHAPTERS — CA explanation                       */}
          {/* ------------------------------------------------------------ */}

          {/* CepCapitulo3a — CA = 4, full lot (triggers overlay-3a) */}
          <MapCard id="cep_capitulo3a">
            <CardText>
              {copy.floorArea.lead}{" "}
              <strong className="font-bold">{copy.floorArea.emphasis}</strong>
              {copy.floorArea.tail}
            </CardText>
          </MapCard>

          {/* CepCapitulo3b — CA = 4, half lot (triggers overlay-3b) */}
          <MapCard id="cep_capitulo3b">
            <CardText>{copy.halfLot}</CardText>
          </MapCard>

          {/* CepCapitulo4 — CA = 0.1 (triggers overlay-4) */}
          <MapCard id="cep_capitulo4">
            <CardText>
              {copy.lowFloorArea.lead} <H>{copy.lowFloorArea.emphasis}</H>{" "}
              {copy.lowFloorArea.tail}
            </CardText>
          </MapCard>

          {/* CepCapitulo4b — interactive sliders (triggers overlay-4b + 3D) */}
          <section
            id="cep_capitulo4b"
            className="pointer-events-none flex w-full min-h-screen items-center justify-center lg:justify-start p-[10%] mb-[50vh] lg:mb-20"
          >
            <div className="pointer-events-auto backdrop-blur-[20px] bg-white/46 max-w-xs lg:max-w-lg p-8 lg:p-12">
              <CardText>
                {copy.sliders.lead}{" "}
                <strong className="font-bold">{copy.sliders.coverage}</strong>{" "}
                {copy.sliders.mid}{" "}
                <strong className="font-bold">{copy.sliders.floorArea}</strong>{" "}
                {copy.sliders.tail}
              </CardText>

              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <label
                    htmlFor="slider-ca"
                    className="font-semibold w-16 shrink-0"
                  >
                    {copy.sliders.ca}
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
                    {copy.sliders.to}
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
              {copy.builtDensity.lead}{" "}
              <strong className="font-bold">
                {copy.builtDensity.emphasis}
              </strong>{" "}
              {copy.builtDensity.mid}
              <br />
              <br />
              {copy.builtDensity.map}
            </CardText>
          </MapCard>

          {/* CepCapitulo5 — cota parte máxima (triggers overlay-5) */}
          <MapCard id="cep_capitulo5">
            <CardText>
              {copy.lotQuota.lead}{" "}
              <strong className="font-bold">{copy.lotQuota.quota}</strong>
              {copy.lotQuota.mid}{" "}
              <strong className="font-bold">{copy.lotQuota.quota25}</strong>
              {copy.lotQuota.lotLead}{" "}
              <strong className="font-bold">{copy.lotQuota.lot}</strong>{" "}
              {copy.lotQuota.mustLead}{" "}
              <strong className="font-bold">{copy.lotQuota.must}</strong>{" "}
              {copy.lotQuota.afterMust}
              <br />
              <br />
              {copy.lotQuota.againLead}{" "}
              <strong className="font-bold">{copy.lotQuota.quota}</strong>{" "}
              {copy.lotQuota.defines}{" "}
              <strong className="font-bold">{copy.lotQuota.housing}</strong>{" "}
              {copy.lotQuota.end}
            </CardText>
          </MapCard>

          {/* CepCapitulo6 — gabarito (triggers overlay-6) */}
          <MapCard id="cep_capitulo6">
            <CardText>
              {copy.heightLimit.lead}{" "}
              <strong className="font-bold">{copy.heightLimit.emphasis}</strong>
              {copy.heightLimit.mid}
              <br />
              <br />
              {copy.heightLimit.defines}{" "}
              <strong className="font-bold">{copy.heightLimit.vertical}</strong>{" "}
              {copy.heightLimit.end}
            </CardText>
          </MapCard>

          {/* CepCapitulo6b — summary */}
          <MapCard id="cep_capitulo6b">
            <CardText>
              {copy.parameters.lead}{" "}
              <strong className="font-bold">
                {copy.parameters.population}
              </strong>
              {copy.parameters.mid}{" "}
              <strong className="font-bold">{copy.parameters.built}</strong>,{" "}
              <strong className="font-bold">{copy.parameters.housing}</strong>{" "}
              {copy.parameters.and}{" "}
              <strong className="font-bold">{copy.parameters.vertical}</strong>
              {copy.parameters.tail}
              <br />
              <br />
              {copy.parameters.questionLead}{" "}
              <strong className="font-bold">
                {copy.parameters.population}
              </strong>{" "}
              {copy.parameters.questionMid}{" "}
              <strong className="font-bold">{copy.parameters.vertical}</strong>{" "}
              {copy.parameters.questionTail}
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
              {copy.research.lead} <H>{copy.research.emphasis}</H>{" "}
              {copy.research.tail}
            </CardText>
          </MapCard>

          {/* CepCapitulo7 — conclusion (triggers overlay-7) */}
          <MapCard id="cep_capitulo7">
            <CardText>
              {copy.finding.lead}{" "}
              <strong className="font-bold">{copy.finding.housing}</strong>
              {copy.finding.mid}{" "}
              <strong className="font-bold">{copy.finding.quota}</strong>
              {copy.finding.tail}{" "}
              <strong className="font-bold">{copy.finding.population}</strong>.
            </CardText>
          </MapCard>

          {/* CepCapitulo7b — figure (Figura 13) */}
          <section
            id="cep_capitulo7b"
            className="pointer-events-none flex w-full min-h-screen items-center justify-center p-[5%] mb-[50vh] lg:mb-20"
          >
            <div className="pointer-events-auto bg-white p-10">
              <Zoom>
                <Image
                  src={figura13}
                  alt={copy.figure.alt}
                  width={899}
                  height={610}
                  className="w-[50vw] h-auto block cursor-zoom-in selection:bg-[#ef4444] selection:text-white"
                  unoptimized
                  draggable={false}
                />
              </Zoom>
            </div>
          </section>

          {/* CepCapitulo8 — cota parte nos eixos (triggers overlay-8) */}
          <MapCard id="cep_capitulo8">
            <CardText>
              {copy.quotaAxes.lead}{" "}
              <strong className="font-bold">{copy.quotaAxes.quota}</strong>{" "}
              {copy.quotaAxes.mid}{" "}
              <strong className="font-bold">{copy.quotaAxes.axes}</strong>
              {copy.quotaAxes.tail}
            </CardText>
          </MapCard>

          {/* CepCapitulo9 — CA relevance (triggers overlay-9) */}
          <MapCard id="cep_capitulo9">
            <CardText>
              {copy.builtRelevance.article}
              <H>{copy.builtRelevance.built}</H> {copy.builtRelevance.mid}{" "}
              <H>{copy.builtRelevance.floorArea}</H> {copy.builtRelevance.tail}{" "}
              <H>{copy.builtRelevance.population}</H>.
            </CardText>
          </MapCard>

          {/* CepCapitulo10 — verticalização (triggers overlay-10) */}
          <MapCard id="cep_capitulo10">
            <CardText>
              {copy.verticalFinding.lead} <H>{copy.verticalFinding.vertical}</H>{" "}
              {copy.verticalFinding.mid} <H>{copy.verticalFinding.densities}</H>{" "}
              {copy.verticalFinding.tail}{" "}
              <H>{copy.verticalFinding.population}</H>{" "}
              {copy.verticalFinding.end}
            </CardText>
          </MapCard>

          {/* CepCapitulo11 — ideal model (triggers overlay-11) */}
          <div className="pointer-events-none" style={{ height: "200vh" }}>
            <MapCard id="cep_capitulo11">
              <CardText>
                {copy.ideal.lead} <H>{copy.ideal.vertical}</H> {copy.ideal.mid}{" "}
                <H>{copy.ideal.densities}</H>.
                <br />
                <br />
                {copy.ideal.questionLead} <H>{copy.ideal.vertical}</H>{" "}
                {copy.ideal.questionMid} <H>{copy.ideal.population}</H>?
                <br />
                <br />
                {copy.ideal.evidence} <H>{copy.ideal.model}</H>.
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
            {copy.conclusion.title}
          </h2>
          <WhiteText>
            {copy.conclusion.p1}
            <br />
            <br />
            {copy.conclusion.p2Lead}{" "}
            <strong className="font-bold">{copy.conclusion.p2Emphasis}</strong>
            {copy.conclusion.p2Tail}
            <br />
            <br />
            {copy.conclusion.p3Lead}{" "}
            <strong className="font-bold">{copy.conclusion.p3Emphasis}</strong>
            {copy.conclusion.p3Mid}{" "}
            <strong className="font-bold">{copy.conclusion.p3Emphasis2}</strong>
            <br />
            <br />
            {copy.conclusion.p4}
          </WhiteText>
        </div>
      </section>
    </>
  );
}
