import type { Metadata } from "next";
import { headers } from "next/headers";
import { Suspense } from "react";
import { CatalogPage } from "@/components/CatalogPage";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/json-ld";
import { PageJsonLd } from "@/components/page-json-ld";
import { catalogData } from "@/lib/data/catalog";
import { buildMetadata } from "@/lib/seo";
import { catalogCollectionJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata({
  path: "/catalogo-de-dados",
  title: "Catálogo de Dados",
  description:
    "Índice pesquisável dos datasets urbanos publicados pelo Portal Cidados, com filtros por tema e região e links diretos para download.",
  keywords: ["catálogo de dados", "datasets", "dados abertos", "download"],
});

export default async function CatalogoDeDados() {
  const nonce = (await headers()).get("x-nonce") ?? "";

  return (
    <div>
      <JsonLd
        nonce={nonce}
        data={catalogCollectionJsonLd(
          catalogData.map((item) => ({
            title: item.title,
            description: item.description,
          })),
        )}
      />
      <PageJsonLd
        breadcrumbs={[
          { name: "Início", path: "/" },
          { name: "Catálogo de Dados", path: "/catalogo-de-dados" },
        ]}
      />
      <Header />
      <Suspense fallback={null}>
        <CatalogPage />
      </Suspense>
    </div>
  );
}
