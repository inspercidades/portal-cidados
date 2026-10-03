import type { MetadataRoute } from "next";
import { getStoriesForHome } from "@/lib/data/stories";
import { allowIndexing, SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  // Preview/local não deve oferecer URLs aos crawlers.
  if (!allowIndexing) {
    return [];
  }

  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/historias`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/mapas`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/catalogo-de-dados`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/sobre`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/privacidade`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const storyRoutes: MetadataRoute.Sitemap = getStoriesForHome()
    .filter((story): story is typeof story & { href: string } =>
      Boolean(story.href),
    )
    .map((story) => ({
      url: `${SITE_URL}${story.href}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  return [...staticRoutes, ...storyRoutes];
}
