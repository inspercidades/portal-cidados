import { notFound } from "next/navigation";
import { PageJsonLd } from "@/components/page-json-ld";
import { StoryOverview } from "@/components/story-overview/story-overview";
import { hasLocale } from "@/i18n/config";
import { chrome } from "@/i18n/messages/chrome";
import { getStoryMeta, type StorySlug } from "@/i18n/messages/story-meta";
import { metadataFor } from "@/i18n/metadata";
import { getStoryListings } from "@/lib/data/stories";

type PageProps = { params: Promise<{ lang: string }> };

export function createStoryOverview(slug: StorySlug) {
  const href = `/historias/${slug}` as const;

  async function generateMetadata({ params }: PageProps) {
    const listing = getStoryListings().find((story) => story.href === href);
    if (!listing) notFound();
    const { lang } = await params;
    const locale = lang === "en" ? "en" : "pt";
    const meta = getStoryMeta(locale, slug);
    return metadataFor(params, {
      ...meta,
      path: href,
      image: listing.images[0],
    });
  }

  async function Page({ params }: PageProps) {
    const listing = getStoryListings().find((story) => story.href === href);
    if (!listing) notFound();
    const { lang } = await params;
    const locale = hasLocale(lang) ? lang : "pt";
    const labels = chrome[locale];
    const meta = getStoryMeta(locale, slug);

    return (
      <>
        <PageJsonLd
          locale={locale}
          breadcrumbs={[
            { name: labels.common.home, path: "/" },
            { name: labels.storiesIndex.breadcrumb, path: "/historias" },
            { name: meta.title, path: href },
          ]}
        />
        <StoryOverview locale={locale} listing={listing} />
      </>
    );
  }

  return { generateMetadata, Page };
}
