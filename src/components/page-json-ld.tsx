import { headers } from "next/headers";
import { JsonLd } from "@/components/json-ld";
import { defaultLocale, type Locale } from "@/i18n/config";
import { type BreadcrumbItem, breadcrumbJsonLd } from "@/lib/structured-data";

/**
 * Injeta BreadcrumbList nas páginas internas (índice de histórias, geoportal,
 * catálogo, sobre). Server Component assíncrono para ler o nonce do CSP.
 */
export async function PageJsonLd({
  breadcrumbs,
  locale = defaultLocale,
}: {
  breadcrumbs: BreadcrumbItem[];
  locale?: Locale;
}) {
  const nonce = (await headers()).get("x-nonce") ?? "";

  return (
    <JsonLd nonce={nonce} data={breadcrumbJsonLd(breadcrumbs, locale)} />
  );
}
