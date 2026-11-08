"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import type { CityLayersConfig } from "./lib/city-layers";
import { CityLayersProvider } from "./components/city-layers-context";

const PropertyMap = dynamic(() => import("./components/property-map"), {
  ssr: false,
  loading: () => <div className="h-screen w-full bg-neutral-900" aria-hidden />,
});

export function GeoportalMap({ layers }: { layers: CityLayersConfig }) {
  return (
    <CityLayersProvider layers={layers}>
      <Suspense fallback={null}>
        <PropertyMap />
      </Suspense>
    </CityLayersProvider>
  );
}
