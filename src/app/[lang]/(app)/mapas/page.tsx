import { PageJsonLd } from "@/components/page-json-ld";
import { hasLocale } from "@/i18n/config";
import { chrome } from "@/i18n/messages/chrome";
import { metadataFor } from "@/i18n/metadata";
import { localizeCityLayers } from "@/i18n/layers";
import { GeoportalMap } from "./geoportal-map";

type PageProps = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { lang } = await params;
  const locale = lang === "en" ? "en" : "pt";
  const copy = chrome[locale].maps;
  return metadataFor(params, {
    path: "/mapas",
    title: copy.metaTitle,
    description: copy.metaDescription,
    keywords: ["geoportal", "mapa interativo", "interactive map"],
  });
}

export default async function GeoportalPage({ params }: PageProps) {
  const { lang } = await params;
  const locale = hasLocale(lang) ? lang : "pt";
  const copy = chrome[locale];

  return (
    <div>
      <PageJsonLd
        locale={locale}
        breadcrumbs={[
          { name: copy.common.home, path: "/" },
          { name: copy.maps.breadcrumb, path: "/mapas" },
        ]}
      />
      <GeoportalMap layers={localizeCityLayers(locale)} />
    </div>
  );
}
