"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef, useState } from "react";
import { brandColor } from "../constants";
import { TimelineChart } from "./timeline-chart";

gsap.registerPlugin(ScrollTrigger);

const CHART_META = {
  title:
    "Antes e depois da Faixa Azul: nenhum padrão claro de mudança nas mortes por via",
  subtitle:
    "Linha do Tempo dos Óbitos por Via, antes e depois da Faixa Azul, janeiro de 2021 – março de 2025.",
  source:
    'Infosiga-SP; estudo "Avaliação do impacto da Faixa Azul nos sinistros de trânsito em São Paulo" — Centro de Estudos das Cidades / Insper, 2025.',
};

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
      // pointer-events: none — a área transparente ao redor do card não deve
      // bloquear o hover no gráfico sticky que fica por baixo.
      className="pointer-events-none flex items-center justify-center px-6 md:px-8"
      style={{ minHeight, position: "relative", zIndex: 1 }}
    >
      <div
        className="pointer-events-auto w-full max-w-xl rounded-xl p-6 text-sm leading-normal shadow-lg backdrop-blur-sm md:p-8 md:text-base lg:p-9"
        style={{ color: brandColor, backgroundColor: "#F0F0F0" }}
      >
        {children}
      </div>
    </div>
  );
}

export default function ChartTwo() {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let trigger: ScrollTrigger | null = null;

    const create = () => {
      if (!cardRef.current) return;
      trigger?.kill();

      trigger = ScrollTrigger.create({
        trigger: cardRef.current,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveIndex(1),
        onEnterBack: () => setActiveIndex(1),
        onLeaveBack: () => setActiveIndex(0),
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    requestAnimationFrame(create);

    const handleResize = () => create();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      trigger?.kill();
    };
  }, []);

  return (
    <section className="w-full bg-white">
      <div
        className="flex h-screen w-full items-center justify-center"
        style={{ position: "sticky", top: 0, zIndex: 0 }}
      >
        <div className="flex h-[86vh] max-h-[86vh] w-full flex-col px-6 pb-6 md:h-[92vh] md:max-h-[92vh]">
          <div
            className="mx-auto w-full max-w-xl shrink-0 pb-4 font-inter md:h-36 md:max-w-2xl md:overflow-hidden md:pb-2 2xl:max-w-3xl"
            style={{ color: brandColor }}
          >
            <h2 className="text-base font-bold leading-snug md:text-lg">
              {CHART_META.title}
            </h2>
            <p className="mt-2 text-xs leading-snug opacity-90 md:text-sm">
              {CHART_META.subtitle}
            </p>
            <p className="mt-2 text-[10px] leading-snug opacity-70 md:text-xs">
              <strong>Fonte:</strong> {CHART_META.source}
            </p>
          </div>

          <div className="relative min-h-0 flex-1 overflow-visible">
            <TimelineChart active={activeIndex === 1} />
          </div>
        </div>
      </div>

      <div>
        <ScrollCard cardRef={cardRef} minHeight="150vh">
          <div className="space-y-4">
            <p>
              Em seguida, o estudo comparou trechos que receberam Faixa Azul com
              trechos parecidos que ainda não tinham recebido — ou que nunca
              receberiam — a intervenção. Essa comparação é essencial. A
              pergunta não é apenas se os sinistros caíram em uma via com Faixa
              Azul. A pergunta é se eles caíram mais, menos ou de forma
              diferente do que em vias semelhantes sem Faixa Azul.
            </p>
            <p>
              Para escolher bons pontos de comparação, os pesquisadores usaram
              características das vias: tipo de via, número de faixas, limite de
              velocidade, presença de radar, quantidade de interseções, pontos
              de interesse no entorno, extensão do trecho e histórico de
              sinistros antes da política. A ideia é evitar uma comparação
              injusta — por exemplo, comparar uma avenida expressa de alto fluxo
              com uma rua local de bairro.
            </p>
          </div>
        </ScrollCard>

        <div
          className="pointer-events-none"
          style={{ minHeight: "50vh" }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
