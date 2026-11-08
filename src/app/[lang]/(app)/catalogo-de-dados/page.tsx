import { headers } from "next/headers";
import { Suspense } from "react";
import { CatalogPage } from "@/components/CatalogPage";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/json-ld";
import { PageJsonLd } from "@/components/page-json-ld";
import { hasLocale } from "@/i18n/config";
import { localizeCatalog } from "@/i18n/catalog";
import { chrome } from "@/i18n/messages/chrome";
import { metadataFor } from "@/i18n/metadata";
import { catalogCollectionJsonLd } from "@/lib/structured-data";

type PageProps = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { lang } = await params;
  const locale = lang === "en" ? "en" : "pt";
  const copy = chrome[locale].catalog;
  return metadataFor(params, {
    path: "/catalogo-de-dados",
    title: copy.metaTitle,
    description: copy.metaDescription,
    keywords: ["catálogo de dados", "data catalog", "open data"],
  });
}

export default async function CatalogoDeDados({ params }: PageProps) {
  const { lang } = await params;
  const locale = hasLocale(lang) ? lang : "pt";
  const copy = chrome[locale];
  const nonce = (await headers()).get("x-nonce") ?? "";
  const items = localizeCatalog(locale);

  return (
    <div>
      <JsonLd
        nonce={nonce}
        data={catalogCollectionJsonLd(
          items.map((item) => ({
            title: item.title,
            description: item.description,
          })),
          locale,
          copy.catalog.metaTitle,
        )}
      />
      <PageJsonLd
        locale={locale}
        breadcrumbs={[
          { name: copy.common.home, path: "/" },
          { name: copy.catalog.breadcrumb, path: "/catalogo-de-dados" },
        ]}
      />
      <Header />
      <Suspense fallback={null}>
        <CatalogPage />
      </Suspense>
    </div>
  );
}
