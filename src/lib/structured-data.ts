import { defaultLocale, htmlLang, type Locale } from "@/i18n/config";
import { localeHref } from "@/i18n/routing";
import { SITE_URL, siteConfig } from "@/lib/seo";

type JsonLd = Record<string, unknown>;

function absoluteUrl(path = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

/** Organização publicadora do portal (Insper / Centro de Estudos das Cidades). */
export function organizationJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: siteConfig.legalName,
    alternateName: siteConfig.publisher,
    url: SITE_URL,
    logo: absoluteUrl(siteConfig.defaultOgImage),
  };
}

/** Site como um todo, com ação de busca no catálogo de dados. */
export function websiteJsonLd(
  locale: Locale = defaultLocale,
  description: string = siteConfig.description,
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: absoluteUrl(localeHref(locale, "/")),
    inLanguage: htmlLang[locale],
    description,
    publisher: { "@id": `${SITE_URL}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${absoluteUrl(localeHref(locale, "/catalogo-de-dados"))}?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export interface ArticleJsonLdOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
  datePublished?: string;
  authors?: string[];
  lang?: Locale;
}

/** Artigo/reportagem de uma história (scrollytelling). */
export function articleJsonLd(options: ArticleJsonLdOptions): JsonLd {
  const {
    title,
    description,
    path,
    image = siteConfig.defaultOgImage,
    datePublished,
    authors,
    lang = defaultLocale,
  } = options;
  const url = absoluteUrl(localeHref(lang, path));
  const imageUrl = image.startsWith("http") ? image : absoluteUrl(image);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: [imageUrl],
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    inLanguage: htmlLang[lang],
    ...(datePublished ? { datePublished } : {}),
    author: authors?.length
      ? authors.map((name) => ({ "@type": "Person", name }))
      : { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

/** Trilha de navegação (breadcrumbs) de uma página interna. */
export function breadcrumbJsonLd(
  items: BreadcrumbItem[],
  locale: Locale = defaultLocale,
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(localeHref(locale, item.path)),
    })),
  };
}

export interface CollectionItem {
  title: string;
  description: string;
}

/** Página de coleção do catálogo de dados, com os datasets listados. */
export function catalogCollectionJsonLd(
  items: CollectionItem[],
  locale: Locale = defaultLocale,
  name = "Catálogo de Dados",
): JsonLd {
  const url = absoluteUrl(localeHref(locale, "/catalogo-de-dados"));
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}#collection`,
    name,
    url,
    inLanguage: htmlLang[locale],
    isPartOf: { "@id": `${SITE_URL}/#website` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Dataset",
          name: item.title,
          description: item.description,
        },
      })),
    },
  };
}
