"use client";

import { Suspense, lazy, useMemo, useState, useEffect } from "react";
import { useImagePreloader } from "@/hooks/useImagePreloader";
import { useAllImagesLoaded } from "@/hooks/useAllImagesLoaded";
import HouseSection from "./components/house-section";
import Loading from "./components/loading";
import { ScrollToTopIcon } from "../ilhas-de-calor/components/scroll-to-top-icon";
import { ContinueScrollingHint } from "./components/continue-scrolling-hint";
import { ScrollProgressBar } from "../ilhas-de-calor/components/scroll-progress-bar";

// Importar todas as imagens para precarregamento
import coverImage from "./assets/cover.png";
import insperLogo from "../../assets/insper-logo.png";
import portalLogo from "../../assets/portal_cidados_logo.png";
import textBackground from "./assets/text-background.png";
import houseBackground from "./assets/houseBackground.png";
import houseOne from "./assets/houseOne.png";
import panoramicImage from "./assets/panoramicImage.png";
import supermercado from "./assets/supermercado.png";
import supermercadoTwo from "./assets/supermercadoTwo.png";
import chart1 from "./assets/chart1.png";
import chart2 from "./assets/chart2.png";
import chart3 from "./assets/chart3.png";
import couple from "./assets/couple.png";
import icon1 from "./assets/icon1.png";
import icon2 from "./assets/icon2.png";
import icon3 from "./assets/icon3.png";
import icon4 from "./assets/icon4.png";

// Lazy load all components
const Conclusion = lazy(() => import("./components/conclusion"));
const Cover = lazy(() => import("./components/cover"));
const DiabetesMellitus = lazy(() => import("./components/diabetes-mellitus"));
const DiseasesIntroduction = lazy(
  () => import("./components/diseases-introduction"),
);
const DoencasCerebrovasculares = lazy(
  () => import("./components/doencas-cerebro-vasculares"),
);
const DoencasIsquemicasDoCoracao = lazy(
  () => import("./components/doencas-isquemicas-do-coracao"),
);
const Footer = lazy(() => import("./components/footer"));
const MortalidadeMaterna = lazy(
  () => import("./components/mortalidade-materna"),
);
const ScrollyCards = lazy(() => import("./components/scrolly-cards"));
const SupermercadoSection = lazy(
  () => import("./components/supermercado-section"),
);
const Text = lazy(() => import("./components/text"));

export default function DesigualdadesEmSaudeSp() {
  const [componentsLoaded, setComponentsLoaded] = useState(false);

  // Lista de todas as imagens que precisam ser carregadas
  const allImages = useMemo(
    () => [
      // Cover component
      { src: coverImage },
      { src: insperLogo },
      { src: portalLogo },
      // Text component
      { src: textBackground },
      // HouseSection component
      { src: houseBackground },
      { src: houseOne },
      { src: panoramicImage },
      // SupermercadoSection component
      { src: supermercado },
      { src: supermercadoTwo },
      // DiabetesMellitus component
      { src: chart1 },
      { src: chart2 },
      { src: chart3 },
      { src: couple },
      { src: icon1 },
      { src: icon2 },
      { src: icon3 },
      { src: icon4 },
      // DoencasCerebrovasculares component (usa as mesmas imagens)
      // DoencasIsquemicasDoCoracao component (usa as mesmas imagens)
      // MortalidadeMaterna component (usa chart1, chart2, chart3, icon1)
      // DiseasesIntroduction component (usa textBackground)
      // Conclusion component (usa textBackground)
      // Footer component (usa insperLogo)
    ],
    [],
  );

  // Precarrega todas as imagens
  const preloadedImagesLoaded = useImagePreloader(allImages);

  // Aguarda os componentes serem renderizados
  useEffect(() => {
    if (preloadedImagesLoaded) {
      // Aguarda um pouco para os componentes lazy serem carregados
      const timer = setTimeout(() => {
        setComponentsLoaded(true);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [preloadedImagesLoaded]);

  // Verifica se todas as imagens no DOM estão carregadas (após componentes renderizados)
  const allDomImagesLoaded = useAllImagesLoaded(componentsLoaded);

  // Só mostra o conteúdo quando:
  // 1. Imagens precarregadas estiverem carregadas
  // 2. Componentes lazy estiverem carregados
  // 3. Todas as imagens no DOM estiverem carregadas
  const isReady =
    preloadedImagesLoaded && componentsLoaded && allDomImagesLoaded;

  if (!isReady) {
    return <Loading />;
  }

  return (
    <Suspense fallback={<Loading />}>
      <div className="bg-white">
        <ScrollProgressBar />
        <Cover />
        <Text />
        <ScrollyCards />
        <HouseSection />
        <SupermercadoSection />
        <DiseasesIntroduction />
        <DiabetesMellitus />
        <div className="px-8 max-w-4xl mx-auto py-10">
        <hr className="max-w-2xl mx-auto border-t border-dashed border-gray-300" />
        </div>
        <DoencasCerebrovasculares />
<div className="px-8 max-w-4xl mx-auto py-10">
        <hr className="max-w-2xl mx-auto border-t border-dashed border-gray-300" />
        </div>        <DoencasIsquemicasDoCoracao />
<div className="px-8 max-w-4xl mx-auto py-10">
        <hr className="max-w-2xl mx-auto border-t border-dashed border-gray-300" />
        </div>        <MortalidadeMaterna />
        <Conclusion />
        <Footer />
        <ScrollToTopIcon />
        <ContinueScrollingHint />
      </div>
    </Suspense>
  );
}
