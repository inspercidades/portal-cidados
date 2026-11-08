"use client";

import { createContext, useContext } from "react";
import type { CityLayersConfig } from "../lib/city-layers";

const CityLayersContext = createContext<CityLayersConfig | null>(null);

export function CityLayersProvider({
  layers,
  children,
}: {
  layers: CityLayersConfig;
  children: React.ReactNode;
}) {
  return (
    <CityLayersContext.Provider value={layers}>
      {children}
    </CityLayersContext.Provider>
  );
}

export function useCityLayers(): CityLayersConfig {
  const layers = useContext(CityLayersContext);
  if (!layers) {
    throw new Error("useCityLayers precisa estar dentro de CityLayersProvider.");
  }
  return layers;
}
