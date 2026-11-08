import { StoryJsonLd } from "@/components/story-json-ld";
import { hasLocale } from "@/i18n/config";
import { chrome } from "@/i18n/messages/chrome";
import { faixaAzulCopy } from "@/i18n/messages/stories/faixa-azul";
import { getStoryMeta } from "@/i18n/messages/story-meta";
import { metadataFor } from "@/i18n/metadata";
import { StoryCopyProvider } from "@/i18n/story-copy";
import portalLogo from "../../assets/portal_cidados_logo.png";
import { ContinueScrollingHint } from "../desigualdades-em-saude-sp/components/continue-scrolling-hint";
import { ScrollProgressBar } from "../ilhas-de-calor/components/scroll-progress-bar";
import { ScrollToTopIcon } from "../ilhas-de-calor/components/scroll-to-top-icon";
import AfterChartTwoText from "./components/after-chart-two-text";
import ChartTwo from "./components/chart-two";
import Context from "./components/context";
import FactorsSection from "./components/factors-section";
import FinalSection from "./components/final-section";
import Footer from "./components/footer";
import Intro from "./components/intro";
import MapSection from "./components/map-section";
import MediaSection from "./components/media-section";
import OsmText from "./components/osm-text";
import PictogramSection from "./components/pictogram-section";
import { PreloadWrapper } from "./components/preload-wrapper";
import {
  accidentVideo,
  brandColor,
  chuvaImage,
  coverVideo,
  cruzamentoImage,
  faixaBarataImage,
  faixaChartImage,
  fechadaFaixaVideo,
  fiscalImage,
  horarioImage,
  localMotoboysImage,
  trafegoImage,
} from "./constants";

type PageProps = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { lang } = await params;
  const locale = lang === "en" ? "en" : "pt";
  const meta = getStoryMeta(locale, "faixa-azul");
  return metadataFor(params, {
    ...meta,
    path: "/historias/faixa-azul",
    image: "/assets/viz4/viz4.1.png",
    type: "article",
  });
}

const assetsToPreload = [
  "/centro_estudos_cidades.png",
  portalLogo.src,
  faixaChartImage,
  chuvaImage,
  horarioImage,
  trafegoImage,
  cruzamentoImage,
  faixaBarataImage,
  fiscalImage,
  localMotoboysImage,
];

const videosToPreload = [coverVideo, accidentVideo, fechadaFaixaVideo];

export default async function FaixaAzulPage({ params }: PageProps) {
  const { lang } = await params;
  const locale = hasLocale(lang) ? lang : "pt";
  const meta = getStoryMeta(locale, "faixa-azul");
  const labels = chrome[locale];

  return (
    <>
      <StoryJsonLd
        lang={locale}
        homeLabel={labels.common.home}
        storiesLabel={labels.storiesIndex.breadcrumb}
        title={meta.title}
        description={meta.description}
        path="/historias/faixa-azul"
        image="/assets/viz4/viz4.1.png"
      />
      <StoryCopyProvider copy={faixaAzulCopy[locale]}>
        <PreloadWrapper
          imageSources={assetsToPreload}
          videoSources={videosToPreload}
        >
          <div className="bg-white!">
            <ScrollProgressBar barColor={brandColor} />
            <Intro />
            <Context />
            <PictogramSection />
            <MediaSection />
            <FactorsSection />
            <MapSection />
            <OsmText />
            <ChartTwo />
            <AfterChartTwoText />
            <FinalSection />
            <Footer />
            <ScrollToTopIcon />
            <ContinueScrollingHint />
          </div>
        </PreloadWrapper>
      </StoryCopyProvider>
    </>
  );
}
