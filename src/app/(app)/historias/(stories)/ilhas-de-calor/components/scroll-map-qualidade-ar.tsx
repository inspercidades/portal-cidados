"use client";
/* eslint-disable @next/next/no-img-element */

import {
  useLayoutEffect,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import mapaDeUmidade from "../assets/mapa-de-umidade.png";
import mapaDeCO2 from "../assets/mapa-de-co2.png";
import mapaDeHCHO from "../assets/mapa-de-hcho.png";
import mapaDePM10 from "../assets/mapa-de-pm10.png";
import mapaDePM25 from "../assets/mapa-de-pm25.png";
import type { CSSProperties } from "react";

gsap.registerPlugin(ScrollTrigger);

// Tipo para propriedades CSS com suporte a prefixos webkit
type ExtendedCSSProperties = CSSProperties & {
  imageRendering?:
    | CSSProperties["imageRendering"]
    | "-webkit-optimize-contrast";
  WebkitBackfaceVisibility?: "visible" | "hidden";
  WebkitFontSmoothing?: "antialiased" | "auto" | "subpixel-antialiased";
  MozOsxFontSmoothing?: "grayscale" | "auto";
};

// Configuração global do GSAP para evitar problemas com histórico do navegador
if (typeof window !== "undefined") {
  ScrollTrigger.config({
    ignoreMobileResize: true,
  });
}

export type MapPoint = {
  x: number; // porcentagem 0–100
  y: number; // porcentagem 0–100
  name: string;
  zoom: number; // ex: 2, 3...
  xMobile?: number; // porcentagem 0–100 para mobile
  yMobile?: number; // porcentagem 0–100 para mobile
  zoomMobile?: number; // zoom para mobile
};

type ScrollMapQualidadeArProps = {
  imageSrc: string;
  imageSrcMobile?: string;
  points: MapPoint[];
};

export const ScrollMapQualidadeAr: React.FC<ScrollMapQualidadeArProps> = ({
  imageSrc,
  imageSrcMobile,
  points,
}) => {
  const [currentImageSrc, setCurrentImageSrc] = useState(imageSrc);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const mapWrapperRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Função para determinar a imagem correta baseada no tamanho da tela
  const getImageSrc = useCallback(() => {
    if (typeof window === "undefined") return imageSrc;
    const mobile = window.innerWidth < 768;
    return mobile && imageSrcMobile ? imageSrcMobile : imageSrc;
  }, [imageSrc, imageSrcMobile]);

  useEffect(() => {
    const checkMobile = () => {
      const newSrc = getImageSrc();
      if (newSrc !== currentImageSrc) {
        setCurrentImageSrc(newSrc);
      }
    };

    checkMobile();

    // Debounce do resize para evitar muitas chamadas
    const handleResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      resizeTimeoutRef.current = setTimeout(() => {
        checkMobile();
      }, 150);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, [currentImageSrc, getImageSrc]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const mapWrapper = mapWrapperRef.current;
    const img = imageRef.current;
    const sticky = stickyRef.current;

    if (!container || !mapWrapper || !img || !sticky || points.length === 0) {
      return;
    }

    // Função que cria o timeline com base nos tamanhos atuais
    const setupAnimation = () => {
      // Limpa apenas o ScrollTrigger específico deste componente
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
      gsap.killTweensOf(mapWrapper);

      const imgRect = img.getBoundingClientRect();
      const stickyRect = sticky.getBoundingClientRect();

      // Detecta se está no mobile
      const isMobile = window.innerWidth < 768; // breakpoint padrão do Tailwind (md)

      // Para cada ponto, calculamos o translateX/Y necessário para centralizá-lo.
      const transforms = points.map((p) => {
        // Usa valores mobile se disponíveis e estiver no mobile
        const zoom =
          isMobile && p.zoomMobile !== undefined ? p.zoomMobile : p.zoom || 2;
        const xPercent = isMobile && p.xMobile !== undefined ? p.xMobile : p.x;
        const yPercent = isMobile && p.yMobile !== undefined ? p.yMobile : p.y;

        // posição do ponto na imagem em pixels
        const px = (xPercent / 100) * imgRect.width;
        const py = (yPercent / 100) * imgRect.height;
        // centro da área visível
        const cx = stickyRect.width / 2;
        const cy = stickyRect.height / 2;
        // após o zoom, o ponto vai para px * zoom, etc.
        // Queremos que esse ponto fique no centro (cx, cy)
        const x = cx - px * zoom;
        // Offset vertical para descer a imagem (valor positivo desce)
        const verticalOffset = 150; // Ajuste este valor conforme necessário
        const y = cy - py * zoom + verticalOffset;
        return { x, y, scale: zoom };
      });

      const totalSteps = points.length + 1; // +1 para o zoom out final
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => "+=" + window.innerHeight * totalSteps,
          scrub: true,
          pin: sticky,
          anticipatePin: 1,
          id: "scroll-map-qualidade-ar", // ID único para este ScrollTrigger
          invalidateOnRefresh: true, // Recalcula valores quando necessário
          onRefresh: (self) => {
            // Garante que o ScrollTrigger seja atualizado corretamente
            scrollTriggerRef.current = self;
          },
        },
      });

      // Armazena referência ao ScrollTrigger criado
      scrollTriggerRef.current = tl.scrollTrigger as ScrollTrigger;

      // estado inicial: mapa "inteiro"
      tl.set(mapWrapper, {
        x: 0,
        y: 0,
        scale: 1,
      });

      // transição para cada ponto
      transforms.forEach((t) => {
        tl.to(
          mapWrapper,
          {
            x: t.x,
            y: t.y,
            scale: t.scale,
            ease: "power2.inOut",
            duration: 1,
          },
          ">+0.2", // pequeno intervalo entre passos
        );
      });

      // passo final: volta para o zoom original
      tl.to(
        mapWrapper,
        {
          x: 0,
          y: 0,
          scale: 1,
          ease: "power2.inOut",
          duration: 1,
        },
        ">+0.2",
      );
    };

    // Espera a imagem carregar para ter medidas corretas
    let timeoutId: NodeJS.Timeout | null = null;
    const initAnimation = () => {
      // Verifica se a imagem atual está carregada
      if (img.complete && img.naturalWidth > 0) {
        setupAnimation();
      } else {
        const onLoadHandler = () => {
          if (timeoutId) clearTimeout(timeoutId);
          setupAnimation();
        };
        img.onload = onLoadHandler;
        // Fallback: se onload não disparar, tenta após um delay
        timeoutId = setTimeout(() => {
          if (img.complete && img.naturalWidth > 0) {
            setupAnimation();
          }
        }, 1000);
      }
    };

    // Usa requestAnimationFrame para garantir que o DOM está pronto
    const rafId = requestAnimationFrame(() => {
      initAnimation();
    });

    // Recalcula em resize com debounce
    const handleResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      resizeTimeoutRef.current = setTimeout(() => {
        setupAnimation();
        ScrollTrigger.refresh();
      }, 150);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      // Limpa apenas o ScrollTrigger específico deste componente
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
      gsap.killTweensOf(mapWrapper);
    };
  }, [points]);

  // Atualiza a imagem quando currentImageSrc mudar
  useEffect(() => {
    const img = imageRef.current;
    if (img && img.src !== currentImageSrc) {
      img.src = currentImageSrc;
      // Força o recarregamento da imagem para disparar onload e recriar animação
      if (img.complete) {
        // Se a imagem já está carregada, força o recarregamento
        const tempSrc = img.src;
        img.src = "";
        img.src = tempSrc;
      }
    }
  }, [currentImageSrc]);

  // Componente interno para a seção de seleção de mapas
  const MapSelector = () => {
    const [selectedMap, setSelectedMap] = useState<
      "PM10" | "PM25" | "CO2" | "HCHO" | "UMIDADE"
    >("PM10");

    const mapImages = {
      PM10: mapaDePM10,
      PM25: mapaDePM25,
      CO2: mapaDeCO2,
      HCHO: mapaDeHCHO,
      UMIDADE: mapaDeUmidade,
    };

    const currentMapSrc = mapImages[selectedMap];

    return (
      <div className=" bg-white! mx-auto max-w-lg mb-20 flex items-center flex-col justify-center">
        <div className="flex bg-white! flex-col justify-start items-start px-4 w-full">
          {currentMapSrc && (
            <Zoom>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentMapSrc.src}
                alt="Mapa de Qualidade do Ar"
                className="rounded-xl"
              />
            </Zoom>
          )}
          <p className="text-md font-bold mt-2.5">
            Mapa de temperatura da Maré
          </p>
          <p className="text-md text-[#3A3434]">
            Produzido por <em>Respira Maré</em>
          </p>
          <div className="flex flex-row gap-2 mt-4 flex-wrap">
            <button
              type="button"
              onClick={() => setSelectedMap("PM10")}
              className={`px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm rounded-md bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors ${selectedMap === "PM10" ? "opacity-50" : ""}`}
            >
              PM 10
            </button>
            <button
              type="button"
              onClick={() => setSelectedMap("PM25")}
              className={`px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm rounded-md bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors ${selectedMap === "PM25" ? "opacity-50" : ""}`}
            >
              PM 2,5
            </button>
            <button
              type="button"
              onClick={() => setSelectedMap("CO2")}
              className={`px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm rounded-md bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors ${selectedMap === "CO2" ? "opacity-50" : ""}`}
            >
              CO 2
            </button>
            <button
              type="button"
              onClick={() => setSelectedMap("HCHO")}
              className={`px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm rounded-md bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors ${selectedMap === "HCHO" ? "opacity-50" : ""}`}
            >
              HCHO
            </button>
            <button
              type="button"
              onClick={() => setSelectedMap("UMIDADE")}
              className={`px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm rounded-md bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors ${selectedMap === "UMIDADE" ? "opacity-50" : ""}`}
            >
              UMIDADE
            </button>
          </div>
          <div>
            <p className="text-md text-[#3A3434] my-5">
              São partículas 5 a 7 vezes mais finas do que um fio de cabelo e
              podem ser inaladas e chegar até as vias aéreas mais profundas dos
              pulmões, mas a maioria delas tende a se depositar nas vias aéreas
              superiores, como traquéia e brônquios.
            </p>
            <p className="text-md text-[#3A3434]">
              Podem causar problemas respiratórios, cardiovasculares e agravar
              condições de saúde preexistentes. Na Maré, as regiões do Parque
              Ecológico se destacam na concentração de PM 10 , por motivos
              diferentes.
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <section
        style={{
          position: "relative",
          height: `${(points.length + 1) * 118.5}vh`, // altura total de scroll
        }}
        ref={containerRef}
      >
        <div
          ref={stickyRef}
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflow: "hidden",
            color: "white",
          }}
        >
          {/* Wrapper que recebe o transform (x, y, scale) */}
          <div
            ref={mapWrapperRef}
            style={
              {
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                willChange: "transform",
                transform: "translate3d(0, 0, 0)",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                WebkitFontSmoothing: "antialiased",
                MozOsxFontSmoothing: "grayscale",
              } as ExtendedCSSProperties
            }
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imageRef}
              src={currentImageSrc}
              alt="Mapa de Qualidade do Ar"
              style={
                {
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  imageRendering: "-webkit-optimize-contrast",
                  transform: "translate3d(0, 0, 0)",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  WebkitFontSmoothing: "antialiased",
                  MozOsxFontSmoothing: "grayscale",
                } as ExtendedCSSProperties
              }
            />
          </div>
        </div>
      </section>
      <MapSelector />
    </>
  );
};
