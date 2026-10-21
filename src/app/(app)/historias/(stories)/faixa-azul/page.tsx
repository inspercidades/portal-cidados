import type { Metadata } from "next";
import { StoryJsonLd } from "@/components/story-json-ld";
import { buildMetadata } from "@/lib/seo";
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

export const metadata: Metadata = buildMetadata({
  title: "A Faixa Azul tornou o trânsito mais seguro?",
  description:
    "Avaliação do impacto das faixas dedicadas à motociclistas nos sinistros em São Paulo",
  path: "/historias/faixa-azul",
  image: "/assets/viz4/viz4.1.png",
  type: "article",
  keywords: ["faixa azul", "motociclistas", "sinistros", "trânsito"],
});

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

export default function FaixaAzulPage() {
  return (
    <>
      <StoryJsonLd
        title="A Faixa Azul tornou o trânsito mais seguro?"
        description="Avaliação do impacto das faixas dedicadas à motociclistas nos sinistros em São Paulo"
        path="/historias/faixa-azul"
        image="/assets/viz4/viz4.1.png"
      />
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
    </>
  );
}
