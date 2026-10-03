import type { Metadata } from "next";
import { PageJsonLd } from "@/components/page-json-ld";
import { buildMetadata } from "@/lib/seo";
import { GeoportalMap } from "./geoportal-map";

export const metadata: Metadata = buildMetadata({
  path: "/mapas",
  title: "Geoportal — mapa interativo de dados urbanos",
  description:
    "Explore camadas geoespaciais por cidade, compare visualizações e navegue por dados urbanos no mapa interativo do Portal Cidados.",
  keywords: ["geoportal", "mapa interativo", "dados geoespaciais", "camadas"],
});

export default function GeoportalPage() {
  return (
    <div>
      <PageJsonLd
        breadcrumbs={[
          { name: "Início", path: "/" },
          { name: "Geoportal", path: "/mapas" },
        ]}
      />
      <GeoportalMap />
    </div>
  );
}
