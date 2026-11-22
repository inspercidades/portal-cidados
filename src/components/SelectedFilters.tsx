"use client";

import { X } from "lucide-react";
import type { CatalogFilters } from "@/app/api/catalog/route";
import { isDownloadAccess, isSecureRoomAccess } from "@/i18n/catalog";
import { chrome } from "@/i18n/messages/chrome";
import { useLocale } from "@/i18n/use-locale";

interface SelectedFiltersProps {
  filters: CatalogFilters;
  onRemoveValue: (
    group: "theme" | "region" | "accessMethod",
    value: string,
  ) => void;
}

function labelFor(
  group: "theme" | "region" | "accessMethod",
  value: string,
  copy: { download: string; secureRoom: string },
) {
  if (group !== "accessMethod") return value;
  if (isDownloadAccess(value)) return copy.download;
  if (isSecureRoomAccess(value)) return copy.secureRoom;
  return value;
}

export function SelectedFilters({
  filters,
  onRemoveValue,
}: SelectedFiltersProps) {
  const copy = chrome[useLocale()].catalog;

  const chips: Array<{
    group: "theme" | "region" | "accessMethod";
    value: string;
  }> = [
    ...(filters.theme ?? []).map((value) => ({
      group: "theme" as const,
      value,
    })),
    ...(filters.region ?? []).map((value) => ({
      group: "region" as const,
      value,
    })),
    ...(filters.accessMethod ?? []).map((value) => ({
      group: "accessMethod" as const,
      value,
    })),
  ];

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
      {chips.map((chip) => {
        const label = labelFor(chip.group, chip.value, copy);
        return (
          <div
            key={`${chip.group}-${chip.value}`}
            className="inline-flex h-9 items-center gap-0.5 text-sm text-foreground"
          >
            <span>{label}</span>
            <button
              type="button"
              onClick={() => onRemoveValue(chip.group, chip.value)}
              aria-label={`${copy.removeFilter} ${label}`}
              className="cursor-pointer p-0.5 transition-colors hover:bg-foreground/20"
            >
              <X className="size-3.5" aria-hidden />
            </button>
          </div>
        );
      })}
    </div>
  );
}
