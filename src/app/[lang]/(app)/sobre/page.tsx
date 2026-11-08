import Image from "next/image";
import { CollaboratorsSection } from "@/components/CollaboratorsSection";
import { Header } from "@/components/Header";
import { PageJsonLd } from "@/components/page-json-ld";
import { hasLocale } from "@/i18n/config";
import { chrome } from "@/i18n/messages/chrome";
import { metadataFor } from "@/i18n/metadata";

type PageProps = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { lang } = await params;
  const locale = lang === "en" ? "en" : "pt";
  const copy = chrome[locale].about;
  return metadataFor(params, {
    path: "/sobre",
    title: copy.metaTitle,
    description: copy.metaDescription,
    keywords: ["sobre", "about", "Insper", "Arq.Futuro"],
  });
}

export default async function Sobre({ params }: PageProps) {
  const { lang } = await params;
  const locale = hasLocale(lang) ? lang : "pt";
  const copy = chrome[locale];

  return (
    <div className="min-h-screen bg-background pb-20">
      <PageJsonLd
        locale={locale}
        breadcrumbs={[
          { name: copy.common.home, path: "/" },
          { name: copy.about.breadcrumb, path: "/sobre" },
        ]}
      />
      <Header />
      <div className="mx-auto pt-30">
        {/* Title */}
        <div className="flex items-left px-4 md:px-8 lg:px-12 justify-between lg:flex-row flex-col gap-4 pb-10 lg:items-center">
          <h1 className="max-w-[800px] text-2xl md:text-4xl font-bold text-foreground mb-1 font-gt-ultra-fine leading-tight">
            {copy.about.headline}
          </h1>
          <div className="overflow-hidden max-w-75 md:max-w-100">
            <Image
              src="/logos_cidados.png"
              alt={copy.about.imageAlt}
              width={330}
              height={330}
              className="w-auto h-auto dark:invert object-cover"
            />
          </div>
        </div>
        {/* Collaborators Section */}
      </div>
      <CollaboratorsSection />
    </div>
  );
}
