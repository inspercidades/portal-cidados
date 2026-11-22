"use client";

import type mapboxgl from "mapbox-gl";
import { useEffect, useState } from "react";
import { htmlLang } from "@/i18n/config";
import { chrome } from "@/i18n/messages/chrome";
import { useLocale } from "@/i18n/use-locale";
import { cn } from "@/lib/utils";
import { computeScaleBar, type ScaleBar } from "../lib/scale";

const MAX_WIDTH = 100;

function measure(map: mapboxgl.Map): ScaleBar | null {
  const y = map.getContainer().clientHeight / 2;
  const left = map.unproject([0, y]);
  const right = map.unproject([MAX_WIDTH, y]);
  return computeScaleBar(left.distanceTo(right), MAX_WIDTH);
}

/** Escala métrica, medida no centro do mapa. */
export function MapScale({
  map,
  className,
}: {
  map: mapboxgl.Map | null;
  className?: string;
}) {
  const lang = useLocale();
  const [bar, setBar] = useState<ScaleBar | null>(null);

  useEffect(() => {
    if (!map) return;
    const update = () => setBar(measure(map));
    update();
    map.on("move", update);
    map.on("resize", update);
    return () => {
      map.off("move", update);
      map.off("resize", update);
    };
  }, [map]);

  if (!bar) return null;
  const value = new Intl.NumberFormat(htmlLang[lang]).format(bar.value);

  return (
    <div
      role="img"
      aria-label={`${chrome[lang].maps.scale}: ${value} ${bar.unit}`}
      className={cn(
        "pointer-events-none rounded-b-[4px] border border-t-0 border-foreground bg-background/80 px-1.5 text-[10px] leading-[14px]",
        className,
      )}
      style={{ width: bar.width }}
    >
      {value} {bar.unit}
    </div>
  );
}
