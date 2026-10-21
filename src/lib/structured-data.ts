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
export function websiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: SITE_URL,
    inLanguage: "pt-BR",
    description: siteConfig.description,
    publisher: { "@id": `${SITE_URL}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/catalogo-de-dados?q={search_term_string}`,
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
  } = options;
  const url = absoluteUrl(path);
  const imageUrl = image.startsWith("http") ? image : absoluteUrl(image);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: [imageUrl],
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    inLanguage: "pt-BR",
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
export function breadcrumbJsonLd(items: BreadcrumbItem[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export interface CollectionItem {
  title: string;
  description: string;
}

/** Página de coleção do catálogo de dados, com os datasets listados. */
export function catalogCollectionJsonLd(items: CollectionItem[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${absoluteUrl("/catalogo-de-dados")}#collection`,
    name: "Catálogo de Dados",
    url: absoluteUrl("/catalogo-de-dados"),
    inLanguage: "pt-BR",
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
