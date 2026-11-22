"use client";

import { ChevronDown, LayoutList } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { type Chrome, chrome } from "@/i18n/messages/chrome";
import { useLocale } from "@/i18n/use-locale";
import { cn } from "@/lib/utils";
import { getLayerLegend, type LegendItem } from "../lib/layer-styles";
import type { GeoportalLayer } from "../lib/types";
import { ControlTooltip, MapIconButton } from "./map-control";

const FALLBACK_COLOR = "#007cbf";

type MapsCopy = Chrome["maps"];

export interface LegendEntry {
  layer: GeoportalLayer;
  /** Lado do mapa na comparação ("Esquerda", "Superior"…). */
  caption?: string;
}

function legendItems(layer: GeoportalLayer): LegendItem[] {
  const fromStyle =
    (layer.sourceLayer && getLayerLegend(layer.sourceLayer)) ||
    getLayerLegend(layer.id);
  if (fromStyle && fromStyle.length > 0) return fromStyle;
  return [
    { color: FALLBACK_COLOR, label: "Dados disponíveis", value: "Ativo" },
  ];
}

/** `layer-styles.ts` (gerado) escreve alguns rótulos em português. */
function translateValue(value: string, copy: MapsCopy) {
  const known: Record<string, string> = {
    "Dados disponíveis": copy.available,
    Ativo: copy.active,
    Outros: copy.other,
    "Sem dado": copy.noData,
    Valor: copy.value,
  };
  return known[value] ?? value;
}

const SWATCH: Record<string, string> = {
  line: "h-0.5 w-6 rounded-[2px]",
  circle: "size-4 rounded-full",
  fill: "size-4 rounded-[4px]",
  symbol: "size-4 rounded-[4px]",
};

function LegendCard({
  entry,
  copy,
  onClose,
}: {
  entry: LegendEntry;
  copy: MapsCopy;
  onClose: () => void;
}) {
  const { layer, caption } = entry;
  const swatch = SWATCH[layer.layerType ?? "fill"];

  return (
    <section
      aria-label={`${copy.legend}: ${layer.name}`}
      className="rounded-[8px] border border-border bg-background p-4 shadow-md"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          {caption ? (
            <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
              {caption}
            </p>
          ) : null}
          <h3 className="text-sm font-semibold leading-snug tracking-tight">
            {layer.name}
          </h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label={`${copy.closeLegend}: ${layer.name}`}
          className="-mt-0.5 -mr-1 flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-[6px] text-muted-foreground outline-none transition-colors hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ChevronDown className="size-4" aria-hidden />
        </button>
      </div>
      {layer.description ? (
        <p className="mt-1 mb-3 text-xs leading-snug text-muted-foreground">
          {layer.description}
        </p>
      ) : null}
      <ul className="space-y-1">
        {legendItems(layer).map((item) => (
          <li
            key={`${item.label}-${item.value}-${item.color}`}
            className="flex items-center gap-2"
          >
            <span
              aria-hidden
              className={cn("shrink-0", swatch)}
              style={{ backgroundColor: item.color }}
            />
            {item.value !== undefined && item.value !== "" ? (
              <span className="py-0.5 text-xs font-semibold">
                {translateValue(String(item.value), copy)}
              </span>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * Legenda fixa no mapa: um card por camada ligada. Cada card fecha sozinho;
 * fechando todos, sobra o botão que reabre. Uma camada nova reabre o card dela.
 */
export function LegendPanel({
  entries,
  align = "left",
  className,
}: {
  entries: LegendEntry[];
  align?: "left" | "right";
  className?: string;
}) {
  const copy = chrome[useLocale()].maps;
  const [hidden, setHidden] = useState<string[]>([]);
  const known = useRef<string[]>([]);

  useEffect(() => {
    const ids = entries.map((entry) => entry.layer.id);
    const added = ids.filter((id) => !known.current.includes(id));
    known.current = ids;
    if (added.length > 0) {
      setHidden((current) => current.filter((id) => !added.includes(id)));
    }
  }, [entries]);

  const visible = entries.filter((entry) => !hidden.includes(entry.layer.id));
  const tooltipSide = align === "right" ? "left" : "right";

  if (visible.length === 0) {
    const hasLayers = entries.length > 0;
    const label = hasLayers ? copy.legend : copy.selectLayer;
    return (
      <div className={cn("absolute z-10", className)}>
        <ControlTooltip label={label} side={tooltipSide}>
          <MapIconButton
            aria-label={label}
            // `aria-disabled` em vez de `disabled`: o tooltip continua acessível.
            aria-disabled={!hasLayers}
            onClick={hasLayers ? () => setHidden([]) : undefined}
            className={cn(
              !hasLayers && "cursor-not-allowed text-muted-foreground",
            )}
          >
            <LayoutList aria-hidden />
          </MapIconButton>
        </ControlTooltip>
      </div>
    );
  }

  return (
    <div
      data-lenis-prevent
      className={cn(
        "absolute z-10 flex max-h-[calc(100%-8.5rem)] w-80 max-w-[calc(100vw-5.5rem)] flex-col gap-3 overflow-y-auto",
        className,
      )}
    >
      {visible.map((entry) => (
        <LegendCard
          key={entry.layer.id}
          entry={entry}
          copy={copy}
          onClose={() => setHidden((current) => [...current, entry.layer.id])}
        />
      ))}
    </div>
  );
}
