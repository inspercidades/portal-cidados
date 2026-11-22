import type { Locale } from "@/i18n/config";
import { getStoryMeta, type StorySlug } from "@/i18n/messages/story-meta";
import { getStoryOverview } from "@/i18n/messages/story-overview";
import { localeHref } from "@/i18n/routing";
import { getStoryListings, storySlug } from "@/lib/data/stories";

export type RelatedCatalogStory = {
  href: string;
  title: string;
};

function isStorySlug(value: string): value is StorySlug {
  return (
    value === "habitacao" ||
    value === "faixa-azul" ||
    value === "ilhas-de-calor" ||
    value === "desigualdades-em-saude-sp" ||
    value === "adensamento"
  );
}

/** Histórias publicadas que usam este conjunto (via datasetIds do overview). */
export function getRelatedStoriesForCatalogItem(
  datasetId: string,
  locale: Locale,
): RelatedCatalogStory[] {
  return getStoryListings().flatMap((listing) => {
    const slug = storySlug(listing.href);
    if (!isStorySlug(slug)) return [];
    const overview = getStoryOverview(locale, slug);
    if (!overview.datasetIds.includes(datasetId)) return [];
    return [
      {
        href: localeHref(locale, listing.href),
        title: getStoryMeta(locale, slug).title,
      },
    ];
  });
}
