"use client";

import dynamic from "next/dynamic";
import { CityLayersProvider } from "./components/city-layers-context";
import type { GeoportalLayersConfig } from "./lib/types";

// O Mapbox só existe no navegador; o estado inicial vem da URL na montagem.
const Geoportal = dynamic(() => import("./components/geoportal"), {
  ssr: false,
  loading: () => (
    <div
      className="force-light-theme h-screen w-full bg-background"
      aria-hidden
    />
  ),
});

export function GeoportalMap({ layers }: { layers: GeoportalLayersConfig }) {
  return (
    <CityLayersProvider layers={layers}>
      <Geoportal />
    </CityLayersProvider>
  );
}
