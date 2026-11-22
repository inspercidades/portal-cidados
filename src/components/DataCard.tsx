"use client";

import { isDownloadAccess, isSecureRoomAccess } from "@/i18n/catalog";
import { chrome } from "@/i18n/messages/chrome";
import { useLocale } from "@/i18n/use-locale";
import { formatCatalogPeriod, splitCatalogTitle } from "@/lib/catalog-title";
import type { DataCatalogItem } from "@/lib/data/catalog";

const SELO_CLASS =
  "inline-flex shrink-0 items-center whitespace-nowrap bg-foreground/6 px-2 py-1 text-[11px] font-medium leading-4 text-foreground";

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
      className="catalog-card flex h-full w-full min-w-0 flex-col bg-foreground/3 text-left transition-colors cursor-pointer hover:bg-foreground/6"
      onClick={() => onSelect(item.id)}
    >
      <div className="flex items-start justify-between gap-3 px-7 pt-7 pb-4">
        <h3 className="min-w-0 font-gt-ultra-fine text-lg font-bold tracking-tight text-foreground md:text-xl">
          {name}
        </h3>
        {years && <span className={`${SELO_CLASS} tabular-nums`}>{years}</span>}
      </div>
      <div className="mt-auto flex flex-wrap items-center gap-1.5 px-7 pb-7">
        {tags.map((tag) => (
          <span key={tag} className={SELO_CLASS}>
            {tag}
          </span>
        ))}
      </div>
    </button>
  );
}
