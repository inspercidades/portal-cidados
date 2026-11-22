"use client";

import { Info } from "lucide-react";
import Link from "next/link";
import { useId } from "react";
import { SliderLight } from "@/components/ui/slider-light";
import { SwitchLight } from "@/components/ui/switch-light";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { chrome } from "@/i18n/messages/chrome";
import { useLocale, useLocaleHref } from "@/i18n/use-locale";
import { cn } from "@/lib/utils";
import type { GeoportalLayer } from "../../lib/types";
import { MAP_SURFACE } from "../map-control";

/** Separa a última palavra para o ícone de informação não quebrar sozinho. */
function splitLastWord(text: string): [string, string] {
  const cut = text.lastIndexOf(" ");
  return cut < 0 ? ["", text] : [text.slice(0, cut + 1), text.slice(cut + 1)];
}

const actionLink =
  "inline-flex h-7 items-center rounded-[8px] border border-border bg-background px-2.5 text-xs text-foreground outline-none transition-colors hover:border-foreground/40 hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring";

interface LayerRowProps {
  layer: GeoportalLayer;
  checked: boolean;
  disabled?: boolean;
  onCheckedChange: (checked: boolean) => void;
  opacity: number;
  onOpacityChange: (value: number) => void;
  /** Etiqueta ao lado do nome (lado do mapa, na comparação). */
  badge?: string;
}

export function LayerRow({
  layer,
  checked,
  disabled = false,
  onCheckedChange,
  opacity,
  onOpacityChange,
  badge,
}: LayerRowProps) {
  const copy = chrome[useLocale()].maps;
  const hrefFor = useLocaleHref();
  const id = useId();
  const switchId = `${id}-switch`;
  const summaryId = `${id}-summary`;
  const summary = layer.summary ?? layer.description;
  const [head, last] = splitLastWord(layer.name);

  return (
    <div
      className={cn(
        "flex flex-col px-4 py-3 transition-colors",
        // Selecionada continua branca: o card e os botões se destacam pela borda.
        !checked && !disabled && "hover:bg-accent/60",
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <label
          htmlFor={switchId}
          className={cn(
            "min-w-0 flex-1 cursor-pointer text-sm leading-relaxed",
            checked ? "font-medium" : "font-normal",
            disabled && "cursor-not-allowed text-muted-foreground",
          )}
        >
          <span className="break-words">{head}</span>
          <span className="whitespace-nowrap">
            {last}
            {summary ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info
                    className="ml-1 inline size-3.5 align-[-2px] text-muted-foreground"
                    aria-hidden
                  />
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  sideOffset={6}
                  className={cn(MAP_SURFACE, "max-w-60")}
                >
                  {summary}
                </TooltipContent>
              </Tooltip>
            ) : null}
          </span>
          {badge ? (
            <span className="ml-2 inline-flex rounded-[4px] bg-primary px-1.5 py-px align-middle text-[10px] font-medium uppercase tracking-wide text-primary-foreground">
              {badge}
            </span>
          ) : null}
        </label>
        {summary ? (
          <span id={summaryId} className="sr-only">
            {summary}
          </span>
        ) : null}
        <SwitchLight
          id={switchId}
          className="mt-0.5 ml-2 shrink-0 cursor-pointer"
          checked={checked}
          disabled={disabled}
          onCheckedChange={onCheckedChange}
          aria-describedby={summary ? summaryId : undefined}
        />
      </div>

      {checked ? (
        <>
          <div className="mt-2 rounded-[8px] border border-border bg-background px-3 pt-3 pb-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold">{copy.opacity}</span>
              <span className="tabular-nums text-muted-foreground">
                {opacity}%
              </span>
            </div>
            <SliderLight
              className="mt-2.5 mb-1"
              value={[opacity]}
              onValueChange={([value]) => onOpacityChange(value)}
              max={100}
              step={1}
              aria-label={`${copy.opacity}: ${layer.name}`}
            />
          </div>
          {layer.catalogItemId || layer.storyHref ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {layer.catalogItemId ? (
                <Link
                  href={hrefFor(
                    `/catalogo-de-dados?item=${layer.catalogItemId}`,
                  )}
                  className={actionLink}
                >
                  {copy.openCatalog}
                </Link>
              ) : null}
              {layer.storyHref ? (
                <Link href={hrefFor(layer.storyHref)} className={actionLink}>
                  {copy.openStory}
                </Link>
              ) : null}
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
