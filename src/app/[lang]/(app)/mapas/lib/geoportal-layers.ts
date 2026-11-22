import "server-only";

import { localizeCatalog } from "@/i18n/catalog";
import type { Locale } from "@/i18n/config";
import { localizeCityLayers } from "@/i18n/layers";
import type { StorySlug } from "@/i18n/messages/story-meta";
import { getStoryOverview } from "@/i18n/messages/story-overview";
import { catalogData } from "@/lib/data/catalog";
import { getStoryListings, storySlug } from "@/lib/data/stories";
import type { GeoportalLayersConfig } from "./types";

/**
 * Camadas do geoportal com o tema do catálogo e a história relacionada.
 *
 * Roda no servidor: o cliente recebe só o resultado, sem o catálogo e os textos
 * das histórias. O tema sai do `catalogItemId`, então `city-layers.ts` (gerado
 * pelo pipeline R) não precisa mudar. Se um dia ele trouxer `theme`, esse valor
 * vale.
 */
export function getGeoportalLayers(locale: Locale): GeoportalLayersConfig {
  const themeById = new Map(catalogData.map((item) => [item.id, item.theme]));
  const themeLabelById = new Map(
    localizeCatalog(locale).map((item) => [item.id, item.theme]),
  );

  // A primeira história publicada que usa o dado, na ordem do índice.
  const storyByDataset = new Map<string, string>();
  for (const story of getStoryListings()) {
    const overview = getStoryOverview(
      locale,
      storySlug(story.href) as StorySlug,
    );
    for (const datasetId of overview?.datasetIds ?? []) {
      if (!storyByDataset.has(datasetId))
        storyByDataset.set(datasetId, story.href);
    }
  }

  return Object.fromEntries(
    Object.entries(localizeCityLayers(locale)).map(([city, layers]) => [
      city,
      layers.map((layer) => {
        const catalogId = layer.catalogItemId;
        const generated = layer as { theme?: string };
        const theme =
          generated.theme ?? (catalogId ? themeById.get(catalogId) : undefined);
        return {
          ...layer,
          theme,
          themeLabel:
            (catalogId ? themeLabelById.get(catalogId) : undefined) ?? theme,
          storyHref: catalogId ? storyByDataset.get(catalogId) : undefined,
        };
      }),
    ]),
  );
}
