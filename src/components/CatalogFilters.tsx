"use client";

import { Info } from "lucide-react";
import type { ReactNode } from "react";
import type {
  CatalogFacets,
  CatalogFilters as FiltersType,
} from "@/app/api/catalog/route";
import { CatalogCheckbox } from "@/components/CatalogCheckbox";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { isDownloadAccess, isSecureRoomAccess } from "@/i18n/catalog";
import { chrome } from "@/i18n/messages/chrome";
import { useLocale } from "@/i18n/use-locale";
import { cn } from "@/lib/utils";

interface CatalogFiltersProps {
  filters: FiltersType;
  filterOptions: {
    themes: string[];
    regions: string[];
    accessMethods: string[];
  };
  facets: CatalogFacets;
  onToggle: (group: "theme" | "region" | "accessMethod", value: string) => void;
}

function optionLabel(
  value: string,
  copy: { download: string; secureRoom: string },
) {
  if (isDownloadAccess(value)) return copy.download;
  if (isSecureRoomAccess(value)) return copy.secureRoom;
  return value;
}

export function CatalogFilters({
  filters,
  filterOptions,
  facets,
  onToggle,
}: CatalogFiltersProps) {
  const copy = chrome[useLocale()].catalog;

  return (
    <div className="flex flex-col gap-6 px-4 pb-5 [&>div+div]:border-t [&>div+div]:border-foreground/10 [&>div+div]:pt-6 lg:sticky lg:top-6 lg:bg-foreground/3 lg:p-5">
      <FilterGroup
        title={copy.theme}
        idPrefix="theme"
        values={filterOptions.themes}
        selected={filters.theme}
        counts={facets.themes}
        onToggle={(value) => onToggle("theme", value)}
        labelFor={(value) => optionLabel(value, copy)}
      />
      <FilterGroup
        title={copy.region}
        idPrefix="region"
        values={filterOptions.regions}
        selected={filters.region}
        counts={facets.regions}
        onToggle={(value) => onToggle("region", value)}
        labelFor={(value) => optionLabel(value, copy)}
      />
      <FilterGroup
        idPrefix="access"
        values={filterOptions.accessMethods}
        selected={filters.accessMethod}
        counts={facets.accessMethods}
        onToggle={(value) => onToggle("accessMethod", value)}
        labelFor={(value) => optionLabel(value, copy)}
        titleSlot={
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-medium tracking-normal text-foreground">
              {copy.access}
            </h3>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  aria-label={copy.accessHint}
                  className="cursor-help"
                >
                  <Info className="size-4 text-foreground" />
                </button>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs" side="right">
                {copy.accessHint}
              </TooltipContent>
            </Tooltip>
          </div>
        }
      />
    </div>
  );
}

function FilterGroup({
  title,
  titleSlot,
  idPrefix,
  values,
  selected,
  counts,
  onToggle,
  labelFor,
}: {
  title?: string;
  titleSlot?: ReactNode;
  idPrefix: string;
  values: string[];
  selected?: string[];
  counts?: Record<string, number>;
  onToggle: (value: string) => void;
  labelFor: (value: string) => string;
}) {
  return (
    <div>
      {titleSlot ?? (
        <h3 className="text-sm font-medium tracking-normal text-foreground">
          {title}
        </h3>
      )}
      <div className="mt-3 space-y-2">
        {values.map((value) => {
          const count = counts?.[value] ?? 0;
          const checked = selected?.includes(value) ?? false;
          const isEmpty = count === 0 && !checked;
          return (
            <div
              key={value}
              className="flex flex-row-reverse items-center justify-between gap-2"
            >
              <CatalogCheckbox
                id={`${idPrefix}-${value}`}
                checked={checked}
                disabled={isEmpty}
                onCheckedChange={() => onToggle(value)}
              />
              <label
                htmlFor={`${idPrefix}-${value}`}
                className={cn(
                  "flex cursor-pointer items-center gap-2 text-sm font-normal text-foreground",
                  isEmpty && "cursor-not-allowed text-muted-foreground/50",
                )}
              >
                {labelFor(value)}
                <span className="text-xs font-normal text-muted-foreground tabular-nums">
                  {count}
                </span>
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
