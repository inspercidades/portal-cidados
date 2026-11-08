import { defaultLocale, hasLocale, type Locale } from "@/i18n/config";
import { toInternalSegment, toPublicSegment } from "@/i18n/pathnames";

function splitHref(href: string) {
  const index = href.search(/[?#]/);
  if (index === -1) return { path: href || "/", suffix: "" };
  return { path: href.slice(0, index) || "/", suffix: href.slice(index) };
}

function normalize(path: string) {
  if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
  return path || "/";
}

function segmentsOf(path: string) {
  return normalize(path).split("/").filter(Boolean);
}

/**
 * Caminho público ou prefixado (`/pt`, `/en`) → caminho interno em português,
 * sem prefixo de locale. É o que as pastas e os href dos dados usam.
 */
export function toInternalPath(pathname: string): string {
  const segments = segmentsOf(splitHref(pathname).path);
  const [first, ...rest] = segments;
  if (first && hasLocale(first)) {
    const internal = rest.map((segment) => toInternalSegment(segment, first));
    return internal.length ? `/${internal.join("/")}` : "/";
  }
  return segments.length ? `/${segments.join("/")}` : "/";
}

export function localeFromPathname(pathname: string): Locale {
  const segment = segmentsOf(pathname)[0];
  return segment && hasLocale(segment) ? segment : defaultLocale;
}

/**
 * Href interno (`/historias/...`) → URL pública.
 * Português não leva prefixo. Inglês leva `/en` e os segmentos traduzidos.
 */
export function localeHref(lang: Locale, href: string): string {
  if (!href.startsWith("/") || href.startsWith("//")) return href;

  const { path, suffix } = splitHref(href);
  const internal = toInternalPath(path);
  const segments = segmentsOf(internal).map((segment) =>
    toPublicSegment(segment, lang),
  );
  const localized = segments.length ? `/${segments.join("/")}` : "/";
  const prefixed =
    lang === "en" ? (localized === "/" ? "/en" : `/en${localized}`) : localized;
  return `${prefixed}${suffix}`;
}

/** Mesma rota, outro idioma, preservando a query string. */
export function switchLocaleHref(
  pathname: string,
  search: string,
  next: Locale,
): string {
  const path = localeHref(next, toInternalPath(pathname));
  return search ? `${path}${search}` : path;
}
