"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { type ReactNode, useRef } from "react";
import {
  cityLayersConfig,
  getLayersForCatalogItem,
} from "@/app/[lang]/(app)/mapas/lib/city-layers";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { isDownloadAccess, isSecureRoomAccess } from "@/i18n/catalog";
import { chrome } from "@/i18n/messages/chrome";
import { localeHref } from "@/i18n/routing";
import { useLocale } from "@/i18n/use-locale";
import { getRelatedStoriesForCatalogItem } from "@/lib/catalog-related-stories";
import { formatCatalogPeriod, splitCatalogTitle } from "@/lib/catalog-title";
import type { DataCatalogItem } from "@/lib/data/catalog";

const Tag = ({ children }: { children: ReactNode }) => (
  <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium bg-foreground/6 text-foreground">
    {children}
  </span>
);

function accessLabel(
  value: string,
  copy: { download: string; secureRoom: string },
) {
  if (isDownloadAccess(value)) return copy.download;
  if (isSecureRoomAccess(value)) return copy.secureRoom;
  return value;
}

interface CatalogDetailSheetProps {
  item: DataCatalogItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CatalogDetailSheet({
  item,
  open,
  onOpenChange,
}: CatalogDetailSheetProps) {
  const lang = useLocale();
  const copy = chrome[lang].catalog;
  const cachedItem = useRef(item);
  if (item) cachedItem.current = item;
  const displayItem = item ?? cachedItem.current;

  if (!displayItem) return null;

  const { name, years: titleYears } = splitCatalogTitle(displayItem.title);
  const period =
    formatCatalogPeriod(displayItem.periodStart, displayItem.periodEnd) ??
    titleYears;
  const accessMethod =
    displayItem.accessMethod ||
    displayItem.tags.find(
      (tag) => isDownloadAccess(tag) || isSecureRoomAccess(tag),
    );
  const relatedStories = getRelatedStoriesForCatalogItem(displayItem.id, lang);
  const mapLayers = getLayersForCatalogItem(displayItem.id).flatMap(
    ({ city, layerIds }) =>
      (cityLayersConfig[city] ?? [])
        .filter((layer) => layerIds.includes(layer.id))
        .map((layer) => ({ city, layer })),
  );
  const hasDatasets = Boolean(displayItem.dataset_info?.length);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>{name}</SheetTitle>
          <SheetDescription>{displayItem.description}</SheetDescription>
        </SheetHeader>

        <SheetBody>
          <div className="catalog-sheet-sections divide-y divide-border [&>*]:py-5 [&>*:first-child]:pt-0 [&>*:last-child]:pb-0">
            {displayItem.keywords.length > 0 && (
              <section>
                <h4 className="mb-2 text-sm font-medium text-foreground">
                  {copy.keywords}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {displayItem.keywords.map((keyword) => (
                    <Tag key={keyword}>{keyword}</Tag>
                  ))}
                </div>
              </section>
            )}

            {period && (
              <section>
                <h4 className="mb-2 text-sm font-medium text-foreground">
                  {copy.period}
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Tag>{period}</Tag>
                </div>
              </section>
            )}

            {displayItem.theme && (
              <section>
                <h4 className="mb-2 text-sm font-medium text-foreground">
                  {copy.theme}
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Tag>{displayItem.theme}</Tag>
                </div>
              </section>
            )}

            {displayItem.region && (
              <section>
                <h4 className="mb-2 text-sm font-medium text-foreground">
                  {copy.region}
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Tag>{displayItem.region}</Tag>
                </div>
              </section>
            )}

            {accessMethod && (
              <section>
                <h4 className="mb-2 text-sm font-medium text-foreground">
                  {copy.access}
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Tag>{accessLabel(accessMethod, copy)}</Tag>
                </div>
              </section>
            )}

            {displayItem.createdAt && (
              <section>
                <h4 className="mb-2 text-sm font-medium text-foreground">
                  {copy.availableSince}
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Tag>
                    {new Date(displayItem.createdAt).toLocaleDateString(
                      lang === "en" ? "en" : "pt-BR",
                      {
                        timeZone: "UTC",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      },
                    )}
                  </Tag>
                </div>
              </section>
            )}

            {displayItem.github && (
              <section>
                <h4 className="mb-2 text-sm font-medium text-foreground">
                  {copy.repository}
                </h4>
                <a
                  href={displayItem.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 bg-foreground/6 px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:bg-foreground/12"
                >
                  {displayItem.github.replace("https://", "")}
                  <ArrowUpRight className="size-3.5" aria-hidden />
                </a>
              </section>
            )}

            {relatedStories.length > 0 && (
              <section>
                <h4 className="mb-2 text-sm font-medium text-foreground">
                  {copy.relatedStories}
                </h4>
                <ul className="space-y-2">
                  {relatedStories.map((story) => (
                    <li key={story.href}>
                      <Link
                        href={story.href}
                        className="inline-flex max-w-full items-center gap-1 bg-foreground/6 px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:bg-foreground/12"
                      >
                        <span className="truncate">{story.title}</span>
                        <ArrowUpRight
                          className="size-3.5 shrink-0"
                          aria-hidden
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {hasDatasets && (
              <section>
                <h4 className="mb-3 text-sm font-medium text-foreground">
                  {copy.datasetsAvailable}
                </h4>
                <div className="space-y-3">
                  {displayItem.dataset_info.map((dataset) => {
                    const split = splitCatalogTitle(dataset.dataset_title);
                    return (
                      <div
                        key={dataset.dataset_link}
                        className="bg-background-2 p-6"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <h5 className="text-sm font-semibold text-foreground">
                            {split.name}
                          </h5>
                          {split.years && (
                            <span className="shrink-0">
                              <Tag>{split.years}</Tag>
                            </span>
                          )}
                        </div>
                        <p className="mt-2 text-[13px] text-muted-foreground whitespace-pre-line">
                          {dataset.dataset_description}
                        </p>
                        <Button
                          type="button"
                          size="sm"
                          onClick={() =>
                            window.open(
                              dataset.dataset_link,
                              "_blank",
                              "noopener,noreferrer",
                            )
                          }
                          className="mt-4 h-auto cursor-pointer bg-foreground px-3 py-1.5 text-xs font-medium text-background transition-opacity hover:bg-foreground hover:opacity-80"
                        >
                          {copy.accessVerb}
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {mapLayers.length > 0 && (
              <section>
                <h4 className="mb-3 text-sm font-medium text-foreground">
                  {copy.mapLayers}
                </h4>
                <div className="space-y-3">
                  {mapLayers.map(({ city, layer }) => (
                    <div
                      key={`${city}-${layer.id}`}
                      className="bg-background-2 p-6"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <h5 className="text-sm font-semibold text-foreground">
                          {layer.name}
                        </h5>
                        <span className="shrink-0">
                          <Tag>{city}</Tag>
                        </span>
                      </div>
                      {layer.description && (
                        <p className="mt-2 text-[13px] text-muted-foreground">
                          {layer.description}
                        </p>
                      )}
                      <Link
                        href={localeHref(
                          lang,
                          `/mapas?${new URLSearchParams({
                            city,
                            layers: layer.id,
                          })}`,
                        )}
                        className="mt-4 inline-flex items-center bg-foreground px-3 py-1.5 text-xs font-medium text-background transition-opacity hover:opacity-80"
                      >
                        {copy.viewOnMap}
                      </Link>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </SheetBody>
      </SheetContent>
    </Sheet>
  );
}
