"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const PropertyMap = dynamic(() => import("./components/property-map"), {
  ssr: false,
  loading: () => <div className="h-screen w-full bg-neutral-900" aria-hidden />,
});

export function GeoportalMap() {
  return (
    <Suspense fallback={null}>
      <PropertyMap />
    </Suspense>
  );
}
