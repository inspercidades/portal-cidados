import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { localeHref } from "@/i18n/routing";
import { getStoriesForHome } from "@/lib/data/stories";
import { allowIndexing, SITE_URL } from "@/lib/seo";

function localizedEntries(
  path: string,
  now: Date,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
  priority: number,
): MetadataRoute.Sitemap {
  return locales.map((lang) => ({
    url: `${SITE_URL}${localeHref(lang, path)}`,
    lastModified: now,
    changeFrequency,
    priority,
    alternates: {
      languages: {
        "pt-BR": `${SITE_URL}${localeHref("pt", path)}`,
        en: `${SITE_URL}${localeHref("en", path)}`,
        "x-default": `${SITE_URL}${localeHref("pt", path)}`,
      },
    },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  if (!allowIndexing) {
    return [];
  }

  const now = new Date();
  const staticPaths: Array<
    [
      string,
      MetadataRoute.Sitemap[number]["changeFrequency"],
      number,
    ]
  > = [
    ["/", "weekly", 1],
    ["/historias", "weekly", 0.9],
    ["/mapas", "monthly", 0.8],
    ["/catalogo-de-dados", "weekly", 0.8],
    ["/sobre", "yearly", 0.5],
    ["/privacidade", "yearly", 0.3],
  ];

  const staticRoutes = staticPaths.flatMap(([path, frequency, priority]) =>
    localizedEntries(path, now, frequency, priority),
  );

  const storyRoutes = getStoriesForHome()
    .filter((story): story is typeof story & { href: string } =>
      Boolean(story.href),
    )
    .flatMap((story) =>
      localizedEntries(story.href, now, "monthly", 0.7),
    );

  return [...staticRoutes, ...storyRoutes];
}
