import { Header } from "@/components/Header";
import { HOME_WORD_STEP_MS, HomeNav } from "@/components/home-nav";
import { countWords, RisingText } from "@/components/rising-text";
import { StoriesSection } from "@/components/StoriesSection";
import { chrome } from "@/i18n/messages/chrome";
import { metadataFor } from "@/i18n/metadata";

type PageProps = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { lang } = await params;
  const locale = lang === "en" ? "en" : "pt";
  const copy = chrome[locale].home;
  return metadataFor(params, {
    path: "/",
    title: copy.metaTitle,
    description: copy.metaDescription,
  });
}

export default async function Page({ params }: PageProps) {
  const { lang } = await params;
  const locale = lang === "en" ? "en" : "pt";
  const copy = chrome[locale].home;
  const restDelay = countWords(copy.lead) * HOME_WORD_STEP_MS;
  const linksDelay = restDelay + countWords(copy.rest) * HOME_WORD_STEP_MS + 80;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto px-4 md:px-8 lg:px-12">
        <div className="pt-24 md:pt-32 lg:pt-44 [--rise-duration:550ms]">
          <h1 className="sr-only">Portal Cidados</h1>
          <p className="max-w-[52rem] font-gt-ultra-fine text-lg md:text-xl lg:text-[1.5rem] leading-snug tracking-tight text-foreground">
            <RisingText text={copy.lead} stepMs={HOME_WORD_STEP_MS} />{" "}
            <span className="text-foreground/45">
              <RisingText
                text={copy.rest}
                delayMs={restDelay}
                stepMs={HOME_WORD_STEP_MS}
              />
            </span>
          </p>
        </div>
      </main>
      <StoriesSection
        leading={
          <HomeNav
            delayMs={linksDelay}
            links={[
              { label: copy.stories, href: "/historias" },
              { label: copy.maps, href: "/mapas" },
              { label: copy.catalog, href: "/catalogo-de-dados" },
            ]}
          />
        }
      />
    </div>
  );
}
