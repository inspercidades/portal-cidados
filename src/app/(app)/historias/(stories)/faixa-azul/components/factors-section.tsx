"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import {
  brandColor,
  chuvaImage,
  cruzamentoImage,
  horarioImage,
  trafegoImage,
} from "../constants";

const AUTO_ROTATE_MS = 5000;

const FACTORS = [
  { label: "Chuva", src: chuvaImage, alt: "Cenário de chuva na via" },
  { label: "Horário", src: horarioImage, alt: "Cenário por horário do dia" },
  {
    label: "Volume de tráfego",
    src: trafegoImage,
    alt: "Cenário de volume de tráfego",
  },
  {
    label: "Nº de Cruzamentos",
    src: cruzamentoImage,
    alt: "Cenário com número de cruzamentos",
  },
] as const;

function CardBox({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="w-full max-w-xl rounded-xl p-6 text-sm leading-normal shadow-lg backdrop-blur-sm md:p-8 md:text-base lg:p-9"
      style={{ color: brandColor, backgroundColor: "#F0F0F0" }}
    >
      {children}
    </div>
  );
}

interface ScrollCardProps {
  children: React.ReactNode;
  cardRef: React.RefObject<HTMLDivElement | null>;
  minHeight?: string;
}

function ScrollCard({
  children,
  cardRef,
  minHeight = "130vh",
}: ScrollCardProps) {
  return (
    <div
      ref={cardRef}
      className="pointer-events-none relative z-[1] flex items-center justify-center px-6 md:px-8"
      style={{ minHeight }}
    >
      <div className="pointer-events-auto w-full max-w-xl">
        <CardBox>{children}</CardBox>
      </div>
    </div>
  );
}

function FactorButton({
  label,
  isSelected,
  onClick,
}: {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-11 w-full cursor-pointer items-center justify-center self-stretch rounded-lg px-2 text-center text-xs font-bold leading-snug backdrop-blur-[8px] transition-[border-color] duration-200 sm:h-14 sm:rounded-[11px] sm:px-3 sm:text-sm md:h-[104px] md:px-6 md:text-base"
      style={{
        background: "rgba(255, 255, 255, 0.50)",
        border: isSelected ? "2px solid #FFF" : "2px solid transparent",
      }}
    >
      {label}
    </button>
  );
}

export default function FactorsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scopeRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % FACTORS.length);
    }, AUTO_ROTATE_MS);

    return () => window.clearInterval(id);
  }, []);

  useGSAP(
    () => {
      const layers = layerRefs.current;

      layers.forEach((layer, i) => {
        if (!layer) return;
        const isActive = i === activeIndex;

        gsap.to(layer, {
          opacity: isActive ? 1 : 0,
          duration: 0.9,
          ease: "power2.inOut",
          overwrite: "auto",
        });

        if (isActive) {
          gsap.fromTo(
            layer,
            { scale: 1.03 },
            {
              scale: 1,
              duration: 1.1,
              ease: "power2.out",
              overwrite: "auto",
            },
          );
        }
      });
    },
    { scope: scopeRef, dependencies: [activeIndex] },
  );

  return (
    <section className="w-full bg-white">
      <div
        ref={scopeRef}
        className="relative h-screen w-full overflow-hidden"
        style={{ position: "sticky", top: 0, zIndex: 0 }}
      >
        <div className="absolute inset-6 overflow-hidden rounded-xl">
          {FACTORS.map((factor, i) => (
            <div
              key={factor.src}
              ref={(el) => {
                layerRefs.current[i] = el;
              }}
              className="absolute inset-0"
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              <img
                src={factor.src}
                alt={factor.alt}
                className="h-full w-full object-cover"
              />
            </div>
          ))}

          <nav
            className="absolute inset-x-3 bottom-3 z-10 grid grid-cols-2 gap-2 sm:inset-x-4 sm:bottom-4 sm:gap-2.5 md:inset-x-auto md:top-6 md:right-6 md:bottom-auto md:flex md:w-[min(100%,220px)] md:flex-col md:gap-3"
            aria-label="Fatores que influenciam sinistros"
          >
            {FACTORS.map((factor, i) => (
              <FactorButton
                key={factor.src}
                label={factor.label}
                isSelected={i === activeIndex}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </nav>
        </div>
      </div>

      <div>
        <ScrollCard cardRef={cardRef}>
          <p>
            Em uma cidade como São Paulo, os sinistros variam por muitos
            motivos: chuva, horário, volume de tráfego, fiscalização,
            velocidade, mudanças no comportamento dos motoristas, crescimento
            das entregas por aplicativo e até oscilações aleatórias de eventos
            raros, como mortes no trânsito.
          </p>
        </ScrollCard>

        {/* Espaço extra após o card para manter a imagem sticky um pouco mais */}
        <div
          className="pointer-events-none"
          style={{ minHeight: "100vh" }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
