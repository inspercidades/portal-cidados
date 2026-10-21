import type { Metadata } from "next";

/** Único host que deve ser indexado pelos motores de busca. */
export const PRODUCTION_HOSTNAME = "cidados.insper.edu.br";
export const PRODUCTION_SITE_URL = `https://${PRODUCTION_HOSTNAME}`;

/**
 * URL base do site. Em produção usamos o domínio institucional; em
 * preview/local, a variável NEXT_PUBLIC_SITE_URL aponta para o ambiente atual
 * (ex.: https://portal-cidados.vercel.app). Sem barra final.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? PRODUCTION_SITE_URL
).replace(/\/$/, "");

function hostnameOf(urlOrHost: string): string {
  const value = urlOrHost.trim();
  try {
    const withProtocol = value.includes("://") ? value : `https://${value}`;
    return new URL(withProtocol).hostname.toLowerCase();
  } catch {
    return value.split(":")[0].toLowerCase();
  }
}

/** True só quando a URL configurada é o domínio institucional de produção. */
export const allowIndexing = hostnameOf(SITE_URL) === PRODUCTION_HOSTNAME;

/**
 * True quando o Host do request é o domínio de produção. Usado no middleware
 * (X-Robots-Tag) para cobrir previews da Vercel mesmo se o SITE_URL estiver
 * errado no build.
 */
export function isProductionHostname(hostHeader: string): boolean {
  return hostnameOf(hostHeader) === PRODUCTION_HOSTNAME;
}

export function robotsDirective(
  noindex?: boolean,
): NonNullable<Metadata["robots"]> {
  if (noindex || !allowIndexing) {
    return { index: false, follow: false };
  }
  return {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  };
}

export const siteConfig = {
  name: "CIDADES@DADOS",
  shortName: "Portal Cidados",
  legalName: "Centro de Estudos das Cidades – Laboratório Arq.Futuro do Insper",
  publisher: "Insper",
  url: SITE_URL,
  locale: "pt_BR",
  description:
    "Plataforma do Centro de Estudos das Cidades do Insper que apresenta estudos e pesquisas sobre políticas urbanas por meio de narrativas baseadas em dados, um geoportal interativo e um catálogo de dados abertos.",
  defaultOgImage: "/centro_estudos_cidades.png",
  keywords: [
    "dados urbanos",
    "cidades",
    "políticas públicas",
    "Insper",
    "Arq.Futuro",
    "geoportal",
    "catálogo de dados",
    "data storytelling",
    "São Paulo",
    "planejamento urbano",
  ],
  twitterHandle: "@insper",
} as const;

/**
 * Verificações de propriedade em ferramentas de webmaster. Preenchidas por
 * variáveis de ambiente para permitir verificação por meta tag sem alterar o
 * código-fonte.
 */
export const verification: NonNullable<Metadata["verification"]> = {
  google:
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
    process.env.NEXT_PUBLIC_GSC_VERIFICATION ||
    undefined,
  other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
    ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
    : undefined,
};

export interface BuildMetadataOptions {
  title?: string;
  description?: string;
  /** Caminho relativo da rota (ex.: "/historias"). Usado no canonical e OG url. */
  path?: string;
  /** Caminho da imagem de OG (relativo ou absoluto). */
  image?: string;
  /** Tipo do Open Graph. Histórias usam "article". */
  type?: "website" | "article";
  /** Palavras-chave adicionais específicas da rota. */
  keywords?: string[];
  publishedTime?: string;
  authors?: string[];
  /** Impede indexação (ex.: rotas utilitárias). */
  noindex?: boolean;
}

function absoluteUrl(path = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

/**
 * Gera o objeto Metadata do Next.js para uma rota, preenchendo canonical,
 * Open Graph e Twitter de forma consistente com o siteConfig.
 */
export function buildMetadata(options: BuildMetadataOptions = {}): Metadata {
  const {
    title,
    description = siteConfig.description,
    path = "/",
    image = siteConfig.defaultOgImage,
    type = "website",
    keywords,
    publishedTime,
    authors,
    noindex,
  } = options;

  const canonical = absoluteUrl(path);
  const ogImage = image.startsWith("http") ? image : absoluteUrl(image);
  // title.template do layout só vale em segmentos filhos. A Home vive no
  // mesmo segmento do layout raiz, então o título precisa ser absoluto.
  const resolvedTitle =
    path === "/" && title
      ? { absolute: `${title} | ${siteConfig.name}` }
      : title;

  return {
    title: resolvedTitle,
    description,
    keywords: keywords
      ? [...siteConfig.keywords, ...keywords]
      : [...siteConfig.keywords],
    alternates: {
      canonical,
    },
    robots: robotsDirective(noindex),
    openGraph: {
      type,
      url: canonical,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      title: title ?? siteConfig.name,
      description,
      images: [{ url: ogImage }],
      ...(type === "article" && publishedTime ? { publishedTime } : {}),
      ...(type === "article" && authors ? { authors } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: title ?? siteConfig.name,
      description,
      images: [ogImage],
      site: siteConfig.twitterHandle,
    },
  };
}
