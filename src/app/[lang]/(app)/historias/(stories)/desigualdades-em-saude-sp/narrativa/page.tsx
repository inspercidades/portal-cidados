import { StoryJsonLd } from "@/components/story-json-ld";
import { hasLocale } from "@/i18n/config";
import { chrome } from "@/i18n/messages/chrome";
import { saudeCopy } from "@/i18n/messages/stories/desigualdades-em-saude-sp";
import { getStoryMeta } from "@/i18n/messages/story-meta";
import { metadataFor } from "@/i18n/metadata";
import { StoryCopyProvider } from "@/i18n/story-copy";
import DesigualdadesEmSaudeSp from "../story-client";

type PageProps = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { lang } = await params;
  const locale = lang === "en" ? "en" : "pt";
  const meta = getStoryMeta(locale, "desigualdades-em-saude-sp");
  return metadataFor(params, {
    ...meta,
    path: "/historias/desigualdades-em-saude-sp/narrativa",
    image: "/assets/viz2/viz2.1.png",
    type: "article",
  });
}

export default async function Page({ params }: PageProps) {
  const { lang } = await params;
  const locale = hasLocale(lang) ? lang : "pt";
  const meta = getStoryMeta(locale, "desigualdades-em-saude-sp");
  const labels = chrome[locale];

  return (
    <>
      <StoryJsonLd
        lang={locale}
        homeLabel={labels.common.home}
        storiesLabel={labels.storiesIndex.breadcrumb}
        title={meta.title}
        description={meta.description}
        path="/historias/desigualdades-em-saude-sp/narrativa"
        image="/assets/viz2/viz2.1.png"
      />
      <StoryCopyProvider copy={saudeCopy[locale]}>
        <DesigualdadesEmSaudeSp />
      </StoryCopyProvider>
    </>
  );
}
