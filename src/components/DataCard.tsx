"use client";

import { isDownloadAccess, isSecureRoomAccess } from "@/i18n/catalog";
import { chrome } from "@/i18n/messages/chrome";
import { useLocale } from "@/i18n/use-locale";
import { formatCatalogPeriod, splitCatalogTitle } from "@/lib/catalog-title";
import type { DataCatalogItem } from "@/lib/data/catalog";

const YEARS_CLASS =
  "font-sans text-xs font-medium uppercase tracking-[0.08em] text-foreground/50 tabular-nums";

interface DataCardProps {
  item: DataCatalogItem;
  onSelect: (id: string) => void;
}

export function DataCard({ item, onSelect }: DataCardProps) {
  const copy = chrome[useLocale()].catalog;
  const { name, years: titleYears } = splitCatalogTitle(item.title);
  const years =
    formatCatalogPeriod(item.periodStart, item.periodEnd) ?? titleYears;

  const accessMethod =
    item.accessMethod ||
    item.tags.find((tag) => isDownloadAccess(tag) || isSecureRoomAccess(tag));

  const tags = [
    item.theme,
    item.region,
    accessMethod
      ? isDownloadAccess(accessMethod)
        ? copy.download
        : isSecureRoomAccess(accessMethod)
          ? copy.secureRoom
          : accessMethod
      : null,
  ].filter(Boolean) as string[];

  return (
    <button
      type="button"
      data-catalog-card={item.id}
      className="catalog-card flex h-full w-full flex-col bg-foreground/3 text-left transition-colors cursor-pointer hover:bg-foreground/6"
      onClick={() => onSelect(item.id)}
    >
      <div className="flex-1 px-7 pt-7 pb-4">
        <h3 className="mb-2 font-gt-ultra-fine text-lg font-bold tracking-tight text-foreground md:text-xl">
          {name}
        </h3>
        {years && <p className={YEARS_CLASS}>{years}</p>}
      </div>
      <div className="flex flex-wrap gap-2 px-7 pb-7">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center px-2.5 py-1 text-xs font-medium bg-foreground/6 text-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
    </button>
  );
}
