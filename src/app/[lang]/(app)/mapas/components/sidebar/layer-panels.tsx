"use client";

import { useMemo, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { chrome } from "@/i18n/messages/chrome";
import { useLocale } from "@/i18n/use-locale";
import { DEFAULT_OPACITY } from "../../lib/geoportal-state";
import { groupLayersByTheme } from "../../lib/layer-groups";
import type { GeoportalLayer } from "../../lib/types";
import { ActiveLayers } from "./active-layers";
import { LayerRow } from "./layer-row";

interface OpacityProps {
  opacity: Record<string, number>;
  onOpacityChange: (id: string, value: number) => void;
}

function NoLayers() {
  const copy = chrome[useLocale()].maps;
  return (
    <p className="px-4 py-8 text-center text-sm text-muted-foreground">
      {copy.noLayers}
    </p>
  );
}

/** Modo normal: camadas ligadas no topo e, abaixo, todas agrupadas por tema. */
export function LayerPanel({
  layers,
  active,
  onToggle,
  onReorder,
  opacity,
  onOpacityChange,
}: OpacityProps & {
  layers: GeoportalLayer[];
  /** Ordem de desenho. */
  active: string[];
  onToggle: (id: string, on: boolean) => void;
  onReorder: (order: string[]) => void;
}) {
  const copy = chrome[useLocale()].maps;
  const groups = useMemo(
    () => groupLayersByTheme(layers, copy.otherLayers),
    [layers, copy.otherLayers],
  );
  const names = useMemo(
    () => Object.fromEntries(layers.map((layer) => [layer.id, layer.name])),
    [layers],
  );
  // Tudo fechado de início. O painel é remontado ao trocar de cidade.
  const [open, setOpen] = useState<string[]>([]);

  if (layers.length === 0) return <NoLayers />;

  return (
    <div>
      <h2 className="px-4 pt-4 pb-2 text-sm font-bold">{copy.layers}</h2>
      <ActiveLayers
        order={active}
        names={names}
        onReorder={onReorder}
        onRemove={(id) => onToggle(id, false)}
      />
      <Accordion
        type="multiple"
        value={open}
        onValueChange={setOpen}
        className="mt-3"
      >
        {groups.map((group) => (
          <AccordionItem
            key={group.key}
            value={group.key}
            className="border-b border-border last:border-b"
          >
            <AccordionTrigger className="cursor-pointer px-4 py-3 text-left text-sm font-semibold hover:no-underline">
              {group.label}
            </AccordionTrigger>
            <AccordionContent className="pb-0">
              <div className="divide-y divide-border border-t border-border pb-3">
                {group.layers.map((layer) => (
                  <LayerRow
                    key={layer.id}
                    layer={layer}
                    checked={active.includes(layer.id)}
                    onCheckedChange={(on) => onToggle(layer.id, on)}
                    opacity={opacity[layer.id] ?? DEFAULT_OPACITY}
                    onOpacityChange={(value) =>
                      onOpacityChange(layer.id, value)
                    }
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

/**
 * Comparação: lista única. A primeira camada ligada vai para a esquerda (ou
 * para cima, no celular) e a segunda para o outro lado.
 */
export function ComparePanel({
  layers,
  left,
  right,
  stacked,
  onToggle,
  opacity,
  onOpacityChange,
}: OpacityProps & {
  layers: GeoportalLayer[];
  left: string | null;
  right: string | null;
  /** Celular: os mapas ficam um em cima do outro. */
  stacked: boolean;
  onToggle: (id: string, on: boolean) => void;
}) {
  const copy = chrome[useLocale()].maps;
  if (layers.length === 0) return <NoLayers />;

  const full = left !== null && right !== null;
  const title = full
    ? copy.compareFull
    : left === null
      ? stacked
        ? copy.pickTop
        : copy.pickLeft
      : stacked
        ? copy.pickBottom
        : copy.pickRight;
  const sideOf = (id: string) => {
    if (id === left) return stacked ? copy.top : copy.left;
    if (id === right) return stacked ? copy.bottom : copy.right;
    return undefined;
  };

  return (
    <div className="pb-6">
      <h2 aria-live="polite" className="px-4 pt-4 pb-3 text-sm font-bold">
        {title}
      </h2>
      <div className="divide-y divide-border border-y border-border">
        {layers.map((layer) => {
          const side = sideOf(layer.id);
          return (
            <LayerRow
              key={layer.id}
              layer={layer}
              checked={side !== undefined}
              disabled={full && side === undefined}
              badge={side}
              onCheckedChange={(on) => onToggle(layer.id, on)}
              opacity={opacity[layer.id] ?? DEFAULT_OPACITY}
              onOpacityChange={(value) => onOpacityChange(layer.id, value)}
            />
          );
        })}
      </div>
    </div>
  );
}
