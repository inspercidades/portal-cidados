"use client";

import { createContext, useContext } from "react";
import type { GeoportalLayersConfig } from "../lib/types";

const CityLayersContext = createContext<GeoportalLayersConfig | null>(null);

export function CityLayersProvider({
  layers,
  children,
}: {
  layers: GeoportalLayersConfig;
  children: React.ReactNode;
}) {
  return (
    <CityLayersContext.Provider value={layers}>
      {children}
    </CityLayersContext.Provider>
  );
}

/** Camadas por cidade, no idioma da página, com tema e história. */
export function useCityLayers(): GeoportalLayersConfig {
  const layers = useContext(CityLayersContext);
  if (!layers) {
    throw new Error(
      "useCityLayers precisa estar dentro de CityLayersProvider.",
    );
  }
  return layers;
}
