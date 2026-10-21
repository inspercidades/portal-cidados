import type { Metadata } from "next";
import { StoryJsonLd } from "@/components/story-json-ld";
import { buildMetadata } from "@/lib/seo";
import { ContinueScrollingHint } from "../desigualdades-em-saude-sp/components/continue-scrolling-hint";
import { ScrollToTopIcon } from "../ilhas-de-calor/components/scroll-to-top-icon";
import Footer from "./components/footer";
import { PreloadWrapper } from "./components/preload-wrapper";
import AdensamentoStory from "./components/story";

import capa from "./images/capa.png";
import capaMobile from "./images/capa_mobile.png";
import card3dbg from "./images/card3dbg.png";
import card3dbgMobile from "./images/card3dbg_mobile.png";
import card7 from "./images/card7.png";
import card7Mobile from "./images/card7_mobile.png";
import card7b from "./images/card7b.png";
import card7bMobile from "./images/card7b_mobile.png";
import card10 from "./images/card10.gif";
import card10Mobile from "./images/card10_mobile.gif";
import card11a from "./images/card11a.gif";
import card11aMobile from "./images/card11a_mobile.gif";
import card11B from "./images/card11B.gif";
import card11bMobile from "./images/card11b_mobile.gif";
import card12 from "./images/card12.png";
import card12Mobile from "./images/card12_mobile.png";
import card13 from "./images/card13.gif";
import card13Mobile from "./images/card13_mobile.gif";
import card18 from "./images/card18.png";
import card18Mobile from "./images/card18_mobile.png";
import card19 from "./images/card19.png";
import card20 from "./images/card20.png";
import card20Mobile from "./images/card20_mobile.png";
import card21 from "./images/card21.png";
import card21Mobile from "./images/card21_mobile.png";
import figura13 from "./images/Figura 13.png";

export const metadata: Metadata = buildMetadata({
  title: "Verticalização gera adensamento populacional?",
  description:
    "Como o Plano Diretor pode estimular uma cidade mais compacta em São Paulo",
  path: "/historias/adensamento",
  image: "/assets/viz1/viz1.4.png",
  type: "article",
  keywords: ["verticalização", "adensamento", "plano diretor", "habitação"],
});

const imagesToPreload = [
  capa.src,
  capaMobile.src,
  figura13.src,
  card7.src,
  card7b.src,
  card10.src,
  card11a.src,
  card11B.src,
  card12.src,
  card13.src,
  card18.src,
  card19.src,
  card20.src,
  card21.src,
  card3dbg.src,
  card7Mobile.src,
  card7bMobile.src,
  card10Mobile.src,
  card11aMobile.src,
  card11bMobile.src,
  card12Mobile.src,
  card13Mobile.src,
  card18Mobile.src,
  card20Mobile.src,
  card21Mobile.src,
  card3dbgMobile.src,
];

export default function AdensamentoPage() {
  return (
    <>
      <StoryJsonLd
        title="Verticalização gera adensamento populacional?"
        description="Como o Plano Diretor pode estimular uma cidade mais compacta em São Paulo"
        path="/historias/adensamento"
        image="/assets/viz1/viz1.4.png"
      />
      <PreloadWrapper imageSources={imagesToPreload}>
        <AdensamentoStory />
        <Footer />
        <ScrollToTopIcon />
        <ContinueScrollingHint />
      </PreloadWrapper>
    </>
  );
}
