import Link from "next/link";
import { notFound } from "next/navigation";
import { StoryJsonLd } from "@/components/story-json-ld";
import { hasLocale } from "@/i18n/config";
import { chrome } from "@/i18n/messages/chrome";
import { getStoryMeta } from "@/i18n/messages/story-meta";
import { metadataFor } from "@/i18n/metadata";
import { localeHref } from "@/i18n/routing";
import { isHabitacaoStoryEnabled } from "@/lib/features";

const path = "/historias/habitacao";
const image = "/assets/viz5/habitacao.png";

type PageProps = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { lang } = await params;
  const locale = lang === "en" ? "en" : "pt";
  const meta = getStoryMeta(locale, "habitacao");
  return metadataFor(params, {
    ...meta,
    path,
    image,
    type: "article",
  });
}

export default async function HabitacaoPage({ params }: PageProps) {
  if (!isHabitacaoStoryEnabled()) notFound();

  const { lang } = await params;
  const locale = hasLocale(lang) ? lang : "pt";
  const meta = getStoryMeta(locale, "habitacao");
  const labels = chrome[locale];

  return (
    <>
      <StoryJsonLd
        lang={locale}
        homeLabel={labels.common.home}
        storiesLabel={labels.storiesIndex.breadcrumb}
        title={meta.title}
        description={meta.description}
        path={path}
        image={image}
      />
      <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 py-24">
        <h1 className="font-inter text-3xl leading-tight font-medium md:text-5xl">
          {meta.title}
        </h1>
        <p className="mt-4 font-inter text-lg text-foreground/70">
          {meta.description}
        </p>
        <Link
          href={localeHref(locale, "/historias")}
          className="mt-10 font-inter text-sm underline underline-offset-4"
        >
          {labels.common.allStories}
        </Link>
      </main>
    </>
  );
}
