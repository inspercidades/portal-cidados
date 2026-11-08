import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { getLayersForCatalogItem } from "@/app/[lang]/(app)/mapas/lib/city-layers";
import { Header } from "@/components/Header";
import { RisingText, titleStepMs } from "@/components/rising-text";
import {
  GalleryNav,
  StoryGallery,
} from "@/components/story-overview/story-gallery";
import { localizeCatalog } from "@/i18n/catalog";
import type { Locale } from "@/i18n/config";
import { localizeCityLayers } from "@/i18n/layers";
import { chrome } from "@/i18n/messages/chrome";
import { listingCopy } from "@/i18n/messages/listings";
import type { StorySlug } from "@/i18n/messages/story-meta";
import {
  getStoryOverview,
  type StoryCredit,
} from "@/i18n/messages/story-overview";
import { localeHref } from "@/i18n/routing";
import {
  narrativePath,
  type StoryListing,
  storySlug,
} from "@/lib/data/stories";

const TEXT_DELAY_MS = 420;
const TEXT_STEP_MS = 90;
const ROLE_NOWRAP_MAX = 26;

export function StoryOverview({
  locale,
  listing,
}: {
  locale: Locale;
  listing: StoryListing;
}) {
  const slug = storySlug(listing.href) as StorySlug;
  const labels = chrome[locale];
  const copy = labels.storyOverview;
  const detail = getStoryOverview(locale, slug);
  const title = listingCopy(locale, listing.id).title;
  const [lead, ...restOfTeam] = detail.studyTeam;

  const datasets = detail.datasetIds.flatMap((id) => {
    const item = localizeCatalog(locale).find((entry) => entry.id === id);
    return item ? [item.title] : [];
  });
  const mapLayers = storyMapLayers(detail.datasetIds, locale);

  const meta = [
    lead ? { label: lead.role, value: lead.names, perLine: true } : null,
    listing.location
      ? { label: copy.location, value: listing.location, perLine: false }
      : null,
    listing.period
      ? { label: copy.year, value: listing.period, perLine: false }
      : null,
  ].filter((item): item is { label: string; value: string; perLine: boolean } =>
    Boolean(item?.value),
  );

  let block = 0;
  const nextDelay = (): CSSProperties => ({
    animationDelay: `${TEXT_DELAY_MS + block++ * TEXT_STEP_MS}ms`,
  });

  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      <Header />
      <div className="px-4 pt-10 pb-24 md:px-8 md:pt-16 lg:px-12">
        <div className="grid items-start min-[861px]:grid-cols-[minmax(0,1fr)_auto] min-[861px]:gap-x-12">
          <div className="min-[861px]:col-start-1 min-[861px]:row-start-1">
            <h1 className="font-gt-ultra-fine text-[2.5rem] font-medium leading-[1.05] tracking-tight md:text-[3.25rem] min-[861px]:w-[60vw] xl:w-[40vw]">
              <RisingText text={title} by="char" stepMs={titleStepMs(title)} />
            </h1>
            <p
              className="fade-up mt-2 text-base leading-relaxed text-foreground/45 min-[861px]:w-[40vw]"
              style={nextDelay()}
            >
              {detail.summary}
            </p>
          </div>

          <div
            className="fade-up mt-3 flex items-center justify-between gap-4 min-[861px]:col-span-2 min-[861px]:row-start-2"
            style={nextDelay()}
          >
            <Link
              href={localeHref(locale, narrativePath(listing.href))}
              className="group inline-flex w-fit items-center gap-0.5 font-inter text-sm font-semibold text-foreground"
            >
              <span className="underline-offset-4 group-hover:underline">
                {labels.storiesIndex.open}
              </span>
              <ArrowUpRight
                className="size-3.5"
                strokeWidth={2.25}
                aria-hidden="true"
              />
            </Link>
            <GalleryNav />
          </div>

          <div className="mt-8 min-[861px]:col-span-2 min-[861px]:row-start-3">
            <StoryGallery images={listing.images} alt={title} slug={slug} />
          </div>

          {meta.length ? (
            <dl
              className="fade-up mt-8 flex h-fit flex-col gap-y-1.5 text-[13px] leading-[1.6] min-[861px]:col-start-2 min-[861px]:row-start-1 min-[861px]:mt-0 min-[861px]:items-end min-[861px]:pt-3"
              style={nextDelay()}
            >
              {meta.map(({ label, value, perLine }) => (
                <div key={label} className="flex gap-2">
                  <dt className="shrink-0 text-foreground/45">{label}</dt>
                  <dd className="flex flex-col min-[861px]:items-end">
                    {(perLine ? value.split(/,\s*/) : [value]).map((part) => (
                      <span key={part}>{part}</span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>

        <div className="mt-8 grid gap-8 min-[861px]:grid-cols-4 min-[861px]:gap-x-3">
          {detail.study ? (
            <Section label={copy.study} style={nextDelay()}>
              <div className="max-w-[22rem] text-sm leading-snug">
                <ul className="space-y-1.5">
                  <li>{detail.study.title}</li>
                  {detail.study.lines.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
                {detail.study.url ? (
                  <div className="mt-3">
                    <ItemLink href={detail.study.url}>
                      {copy.openStudy}
                    </ItemLink>
                  </div>
                ) : null}
              </div>
            </Section>
          ) : null}

          {mapLayers.length ? (
            <Section label={copy.maps} style={nextDelay()}>
              <ul className="space-y-1.5 text-sm leading-snug">
                {mapLayers.map((layer) => (
                  <li key={layer.id}>
                    <ItemLink href={localeHref(locale, layer.href)}>
                      {layer.name}
                    </ItemLink>
                  </li>
                ))}
              </ul>
            </Section>
          ) : null}

          {datasets.length ? (
            <Section label={copy.data} style={nextDelay()}>
              <ul className="space-y-1.5 text-sm leading-snug">
                {datasets.map((name) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            </Section>
          ) : null}

          {detail.datavizTeam.length || restOfTeam.length ? (
            <Section label={copy.dataviz} style={nextDelay()}>
              <CreditList credits={detail.datavizTeam} />
              {restOfTeam.length ? (
                <div className="mt-6">
                  <h3 className="text-[13px] text-foreground/45">
                    {copy.studyTeam}
                  </h3>
                  <div className="mt-1.5">
                    <CreditList credits={restOfTeam} />
                  </div>
                </div>
              ) : null}
            </Section>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function storyMapLayers(datasetIds: readonly string[], locale: Locale) {
  const named = localizeCityLayers(locale);
  const seen = new Set<string>();
  const layers: { id: string; name: string; href: string }[] = [];

  for (const datasetId of datasetIds) {
    for (const { city, layerIds } of getLayersForCatalogItem(datasetId)) {
      const names = new Map(
        (named[city] ?? []).map((layer) => [layer.id, layer.name]),
      );
      for (const id of layerIds) {
        if (seen.has(id)) continue;
        seen.add(id);
        layers.push({
          id,
          name: names.get(id) ?? id,
          href: `/mapas?city=${encodeURIComponent(city)}&layers=${encodeURIComponent(id)}`,
        });
      }
    }
  }

  return layers;
}

function CreditList({ credits }: { credits: StoryCredit[] }) {
  if (!credits.length) return null;
  return (
    <dl className="flex flex-col gap-y-1.5 text-left text-sm leading-snug text-foreground">
      {credits.map(({ role, names }) => (
        <div key={role}>
          <dt
            className={`inline text-foreground/45 ${
              role.length <= ROLE_NOWRAP_MAX ? "whitespace-nowrap" : ""
            }`}
          >
            {role}
            <span aria-hidden="true"> · </span>
          </dt>
          <dd className="inline">{names}</dd>
        </div>
      ))}
    </dl>
  );
}

function Section({
  label,
  style,
  children,
}: {
  label: string;
  style: CSSProperties;
  children: ReactNode;
}) {
  return (
    <section className="fade-up" style={style}>
      <h2 className="text-[13px] text-foreground/45">{label}</h2>
      <div className="mt-1.5">{children}</div>
    </section>
  );
}

function ItemLink({ href, children }: { href: string; children: string }) {
  const cut = children.lastIndexOf(" ");
  const arrow = (
    <ArrowUpRight
      className="ml-0.5 inline-block size-3 align-[-1px]"
      strokeWidth={2.25}
      aria-hidden="true"
    />
  );
  const className = "group text-foreground";
  const content = (
    <span className="underline-offset-4 group-hover:underline">
      {cut > 0 ? (
        <>
          {children.slice(0, cut + 1)}
          <span className="whitespace-nowrap">
            {children.slice(cut + 1)}
            {arrow}
          </span>
        </>
      ) : (
        <>
          {children}
          {arrow}
        </>
      )}
    </span>
  );

  if (href.startsWith("http")) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}
