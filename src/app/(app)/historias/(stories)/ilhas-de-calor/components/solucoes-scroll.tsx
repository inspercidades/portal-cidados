"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

// Configuração global do GSAP para evitar problemas com histórico do navegador
if (typeof window !== "undefined") {
  ScrollTrigger.config({
    ignoreMobileResize: true,
  });
}

export type SolucaoItem = {
  image: StaticImageData | string;
  description: string;
  text: string;
  textPosition: "top-left" | "top-right" | "bottom-left" | "bottom-right";
};

type SolucoesScrollProps = {
  items: SolucaoItem[];
};

export const SolucoesScroll: React.FC<SolucoesScrollProps> = ({ items }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const sticky = stickyRef.current;

    if (!container || !sticky || items.length === 0) {
      return;
    }

    const setupAnimation = () => {
      // Limpa apenas o ScrollTrigger específico deste componente
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }

      // Inicializa todas as imagens e textos como invisíveis
      imageRefs.current.forEach((imgRef, index) => {
        if (imgRef) {
          gsap.set(imgRef, { opacity: index === 0 ? 1 : 0 });
        }
      });

      textRefs.current.forEach((textRef, index) => {
        if (textRef) {
          gsap.set(textRef, { opacity: index === 0 ? 1 : 0 });
        }
      });

      const totalSteps = items.length;
      const stepHeight = window.innerHeight;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${stepHeight * totalSteps}`,
          scrub: true,
          pin: sticky,
          anticipatePin: 1,
          id: "solucoes-scroll",
          invalidateOnRefresh: true, // Recalcula valores quando necessário
          onRefresh: (self) => {
            scrollTriggerRef.current = self;
          },
        },
      });

      // Armazena referência ao ScrollTrigger criado
      scrollTriggerRef.current = tl.scrollTrigger as ScrollTrigger;

      // Para cada item, cria uma transição
      items.forEach((_, index) => {
        const currentImageRef = imageRefs.current[index];
        const currentTextRef = textRefs.current[index];

        if (!currentImageRef || !currentTextRef) return;

        if (index === 0) {
          // Primeira imagem já está visível, apenas garante que está no estado correto
          return;
        }

        const prevImageRef = imageRefs.current[index - 1];
        const prevTextRef = textRefs.current[index - 1];

        if (!prevImageRef || !prevTextRef) return;

        // Cada transição ocupa 1 unidade na timeline
        // A posição é baseada no índice (cada imagem aparece em seu próprio "step")
        const startPosition = index - 0.5; // Começa no meio do step anterior para transição suave

        // Fade out da imagem anterior
        tl.to(
          [prevImageRef, prevTextRef],
          {
            opacity: 0,
            duration: 1,
            ease: "power2.inOut",
          },
          startPosition,
        );

        // Fade in da imagem atual (simultâneo)
        tl.to(
          [currentImageRef, currentTextRef],
          {
            opacity: 1,
            duration: 1,
            ease: "power2.inOut",
          },
          startPosition,
        );
      });
    };

    // Espera os refs estarem prontos e as imagens carregarem
    const initAnimation = () => {
      // Verifica se todas as imagens estão carregadas
      const allImagesLoaded = imageRefs.current.every((imgRef) => {
        if (!imgRef) return false;
        const img = imgRef.querySelector("img");
        return img?.complete;
      });

      if (allImagesLoaded || imageRefs.current.length === 0) {
        setupAnimation();
      } else {
        // Espera as imagens carregarem
        const images = imageRefs.current
          .map((ref) => ref?.querySelector("img"))
          .filter((img): img is HTMLImageElement => img !== null);

        let loadedCount = 0;
        const totalImages = images.length;

        if (totalImages === 0) {
          setupAnimation();
          return;
        }

        images.forEach((img) => {
          if (img.complete) {
            loadedCount++;
            if (loadedCount === totalImages) {
              setupAnimation();
            }
          } else {
            img.onload = () => {
              loadedCount++;
              if (loadedCount === totalImages) {
                setupAnimation();
              }
            };
          }
        });
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
      // Limpa apenas o ScrollTrigger específico deste componente
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
      // Limpa todas as animações GSAP relacionadas
      imageRefs.current.forEach((ref) => {
        if (ref) gsap.killTweensOf(ref);
      });
      textRefs.current.forEach((ref) => {
        if (ref) gsap.killTweensOf(ref);
      });
    };
  }, [items]);

  const getTextPositionClasses = (position: SolucaoItem["textPosition"]) => {
    // No mobile, sempre força top-left com margens adequadas
    // No desktop (md: e acima), usa a posição especificada
    // Usamos valores arbitrários para resetar propriedades no desktop
    const mobileBase = "top-10 left-4";

    switch (position) {
      case "top-left":
        return `${mobileBase} md:top-8 md:left-8 lg:top-12 lg:left-12`;
      case "top-right":
        return `${mobileBase} md:left-[unset] md:top-8 md:right-8 lg:top-12 lg:right-12`;
      case "bottom-left":
        return `${mobileBase} md:top-[unset] md:bottom-8 md:left-8 lg:bottom-12 lg:left-12`;
      case "bottom-right":
        return `${mobileBase} md:top-[unset] md:left-[unset] md:bottom-6 md:right-0 lg:bottom-6 lg:right-0`;
      default:
        return `${mobileBase} md:top-8 md:left-8 lg:top-12 lg:left-12`;
    }
  };

  return (
    <section
      ref={containerRef}
      className="w-full"
      style={{
        position: "relative",
        height: `${items.length * 110}vh`,
      }}
    >
      <div
        ref={stickyRef}
        className="relative w-full h-screen"
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
          overflow: "hidden",
          backgroundColor: "#ffffff",
          maxWidth: "100vw",
          maxHeight: "100vh",
        }}
      >
        {/* Container para todas as imagens */}
        {items.map((item, index) => {
          const imageSrc =
            typeof item.image === "string" ? item.image : item.image.src;
          const uniqueKey = `image-${imageSrc}-${item.text}`;
          return (
            <div
              key={uniqueKey}
              ref={(el) => {
                imageRefs.current[index] = el;
              }}
              className="absolute inset-0 w-full h-full"
              style={{
                opacity: index === 0 ? 1 : 0,
                maxWidth: "100%",
                maxHeight: "100%",
                overflow: "hidden",
              }}
            >
              <Image
                src={item.image}
                alt={`Solução ${index + 1}`}
                fill
                className="object-contain"
                priority={index === 0}
                sizes="100vw"
                style={{
                  objectFit: "contain",
                  maxWidth: "100%",
                  maxHeight: "100%",
                }}
              />
            </div>
          );
        })}

        {/* Container para todos os textos */}
        {items.map((item, index) => {
          const imageSrc =
            typeof item.image === "string" ? item.image : item.image.src;
          const uniqueKey = `text-${imageSrc}-${item.text}`;
          return (
            <div
              key={uniqueKey}
              ref={(el) => {
                textRefs.current[index] = el;
              }}
              className={`absolute ${getTextPositionClasses(item.textPosition)} z-10 px-2 md:px-0`}
              style={{
                opacity: index === 0 ? 1 : 0,
                maxWidth: "calc(100% - 2rem)",
              }}
            >
              <p className="text-sm md:text-base font-bold text-gray-900 max-w-md">
                {item.text}
              </p>
              <p className="text-sm md:text-base text-gray-900 max-w-md mt-2">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
