import { Header } from "@/components/Header";
import { PageJsonLd } from "@/components/page-json-ld";
import { StoriesIndex } from "@/components/stories-index/stories-index";
import { hasLocale } from "@/i18n/config";
import { chrome } from "@/i18n/messages/chrome";
import { metadataFor } from "@/i18n/metadata";

type PageProps = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { lang } = await params;
  const locale = lang === "en" ? "en" : "pt";
  const copy = chrome[locale].storiesIndex;
  return metadataFor(params, {
    path: "/historias",
    title: copy.metaTitle,
    description: copy.metaDescription,
    keywords: ["histórias", "stories", "scrollytelling"],
  });
}

export default async function Historias({ params }: PageProps) {
  const { lang } = await params;
  const locale = hasLocale(lang) ? lang : "pt";
  const copy = chrome[locale];

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-background text-foreground">
      <PageJsonLd
        locale={locale}
        breadcrumbs={[
          { name: copy.common.home, path: "/" },
          { name: copy.storiesIndex.breadcrumb, path: "/historias" },
        ]}
      />
      <Header />
      <StoriesIndex />
    </div>
  );
}
