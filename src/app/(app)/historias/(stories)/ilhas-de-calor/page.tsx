import { Conclusao } from "./components/conclusao";
import Footer from "./components/footer";
import { IlhasDeCalor } from "./components/ilhas-de-calor";
import Intro from "./components/intro";
import { IntroMare } from "./components/intro-mare";
import { QualidadeDoAr } from "./components/qualidade-do-ar";
import { ScrollMapMapbox } from "./components/scroll-map-mapbox";
import { ScrollMapQualidadeArMapbox } from "./components/scroll-map-qualidade-ar-mapbox";
import { Solucoes } from "./components/solucoes";
import { PreloadWrapper } from "./components/preload-wrapper";
import { ScrollToTopIcon } from "./components/scroll-to-top-icon";
import { ContinueScrollingHint } from "../desigualdades-em-saude-sp/components/continue-scrolling-hint";
import { ScrollProgressBar } from "./components/scroll-progress-bar";

// Import all images for preloading
import backgroundImage from "./assets/background.png";
import coverImage from "./assets/cover-image.png";
import imageCard3 from "./assets/image-card-3.png";
import imageCard4 from "./assets/image-card-4.png";
import imageCard5 from "./assets/image-card-5.png";
import imageCard6 from "./assets/image-card-6.png";
import imageCard7 from "./assets/image-card-7.png";
import mapaTemperatura from "./assets/mapa-temperatura.png";
import mapaDeUmidade from "./assets/mapa-de-umidade.png";
import mapaDeCO2 from "./assets/mapa-de-co2.png";
import mapaDeHCHO from "./assets/mapa-de-hcho.png";
import mapaDePM10 from "./assets/mapa-de-pm10.png";
import mapaDePM25 from "./assets/mapa-de-pm25.png";
import s1 from "./assets/s1.png";
import s2 from "./assets/s2.png";
import s3 from "./assets/s3.png";
import s4 from "./assets/s4.png";
import s5 from "./assets/s5.png";
import s6 from "./assets/s6.png";
import s7 from "./assets/s7.png";
import s8 from "./assets/s8.png";
import s9 from "./assets/s9.png";
import s10 from "./assets/s10.png";
import s11 from "./assets/s11.png";
import s12 from "./assets/s12.png";

export default function Desigualdades() {
  // All images to preload
  const imagesToPreload = [
    backgroundImage.src,
    coverImage.src,
    imageCard3.src,
    imageCard4.src,
    imageCard5.src,
    imageCard6.src,
    imageCard7.src,
    mapaTemperatura.src,
    mapaDeUmidade.src,
    mapaDeCO2.src,
    mapaDeHCHO.src,
    mapaDePM10.src,
    mapaDePM25.src,
    s1.src,
    s2.src,
    s3.src,
    s4.src,
    s5.src,
    s6.src,
    s7.src,
    s8.src,
    s9.src,
    s10.src,
    s11.src,
    s12.src,
  ];

  return (
    <PreloadWrapper imageSources={imagesToPreload}>
      <div className="bg-white!">
        <ScrollProgressBar />
        <Intro />
        <IntroMare />
        <IlhasDeCalor />
        <ScrollMapMapbox />
        <QualidadeDoAr />
        <ScrollMapQualidadeArMapbox />
        <Solucoes />
        <Conclusao />
        <Footer />
        <ScrollToTopIcon />
        <ContinueScrollingHint />
      </div>
    </PreloadWrapper>
  );
}
