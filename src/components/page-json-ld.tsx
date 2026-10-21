import { headers } from "next/headers";
import { JsonLd } from "@/components/json-ld";
import { type BreadcrumbItem, breadcrumbJsonLd } from "@/lib/structured-data";

/**
 * Injeta BreadcrumbList nas páginas internas (índice de histórias, geoportal,
 * catálogo, sobre). Server Component assíncrono para ler o nonce do CSP.
 */
export async function PageJsonLd({
  breadcrumbs,
}: {
  breadcrumbs: BreadcrumbItem[];
}) {
  const nonce = (await headers()).get("x-nonce") ?? "";

  return <JsonLd nonce={nonce} data={breadcrumbJsonLd(breadcrumbs)} />;
}
