"use client";

/* eslint-disable @next/next/no-img-element */

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import type { CSSProperties } from "react";
import mapaTemperatura from "../assets/mapa-temperatura-crop.png";

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

type ScrollMapProps = {
  imageSrc: string;
  imageSrcMobile?: string;
  points: MapPoint[];
};

export const ScrollMap: React.FC<ScrollMapProps> = ({
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
          end: () => `+=${window.innerHeight * totalSteps}`,
          scrub: true,
          pin: sticky,
          anticipatePin: 1,
          id: "scroll-map", // ID único para este ScrollTrigger
          invalidateOnRefresh: true, // Recalcula valores quando necessário
          onRefresh: (self) => {
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

  return (
    <>
      <section
        style={{
          position: "relative",
          height: `${(points.length + 1) * 116.5}vh`, // altura total de scroll
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
              alt="Mapa"
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
      <div className="bg-white! h-screen flex items-center justify-center">
        <div className="flex flex-col justify-start items-start px-4">
          <Zoom>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={mapaTemperatura.src}
              alt="Mapa"
              className="max-h-140 object-fit"
            />
          </Zoom>
          <p className="text-md block text-[#3A3434] font-bold mt-2.5">
            Mapa de temperatura da Maré
          </p>
          <p className="text-md text-[#3A3434]">Produzido por Respira Maré</p>
        </div>
      </div>
    </>
  );
};
