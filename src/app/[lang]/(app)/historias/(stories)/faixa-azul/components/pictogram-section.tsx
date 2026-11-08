"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef, useState } from "react";
import type { FaixaAzulCopy } from "@/i18n/messages/stories/faixa-azul";
import { useStoryCopy } from "@/i18n/story-copy";
import { brandColor } from "../constants";
import { charts } from "../data/transport-charts";
import { PictogramChart } from "./pictogram-chart";

gsap.registerPlugin(ScrollTrigger);

interface ScrollCardProps {
  children: React.ReactNode;
  cardRef: React.RefObject<HTMLDivElement | null>;
  minHeight?: string;
  className?: string;
}

function ScrollCard({
  children,
  cardRef,
  minHeight = "130vh",
  className = "",
}: ScrollCardProps) {
  return (
    <div
      ref={cardRef}
      className={`flex items-center justify-center px-6 md:px-8 ${className}`}
      style={{ minHeight, position: "relative", zIndex: 1 }}
    >
      <div
        className="w-full max-w-xl rounded-xl p-6 lg:p-9 text-sm leading-normal shadow-lg backdrop-blur-sm md:p-8 md:text-base"
        style={{ color: brandColor, backgroundColor: "#F0F0F0" }}
      >
        {children}
      </div>
    </div>
  );
}

export default function PictogramSection() {
  const copy = useStoryCopy<FaixaAzulCopy>();
  const [activeIndex, setActiveIndex] = useState(0);

  const card0Ref = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const cardGrowthRef = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const cardNoteRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const cards = [card0Ref, card1Ref, cardGrowthRef, card2Ref, cardNoteRef];
    let triggers: ScrollTrigger[] = [];

    const create = () => {
      if (!cards.every((ref) => ref.current)) return;
      for (const t of triggers) t.kill();
      triggers = [];

      // Card 0: gráfico 0 (2,8%) enquanto o card está ativo;
      // na saída (scroll para baixo) troca para o gráfico 1 (39,7%).
      triggers.push(
        ScrollTrigger.create({
          trigger: card0Ref.current,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveIndex(0),
          onEnterBack: () => setActiveIndex(0),
          onLeave: () => setActiveIndex(1),
        }),
      );

      // Card 1: mantém o gráfico 1 (39,7%).
      // A troca para o gráfico 2 (46,3%) só ocorre após o card seguinte sair.
      triggers.push(
        ScrollTrigger.create({
          trigger: card1Ref.current,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveIndex(1),
          onEnterBack: () => setActiveIndex(1),
          onLeave: () => setActiveIndex(1),
          onLeaveBack: () => setActiveIndex(1),
        }),
      );

      // Card intermediário (sem troca de gráfico): permanece no gráfico 1 (39,7%);
      // na saída (scroll para baixo) troca para o gráfico 2 (46,3%).
      triggers.push(
        ScrollTrigger.create({
          trigger: cardGrowthRef.current,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveIndex(1),
          onEnterBack: () => setActiveIndex(1),
          onLeave: () => setActiveIndex(2),
          onLeaveBack: () => setActiveIndex(1),
        }),
      );

      // Card 2: mantém o gráfico 2 (já ativado na saída do card intermediário).
      triggers.push(
        ScrollTrigger.create({
          trigger: card2Ref.current,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveIndex(2),
          onEnterBack: () => setActiveIndex(2),
          onLeaveBack: () => setActiveIndex(2),
        }),
      );

      // Nota metodológica: permanece no gráfico 2.
      triggers.push(
        ScrollTrigger.create({
          trigger: cardNoteRef.current,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveIndex(2),
          onEnterBack: () => setActiveIndex(2),
          onLeaveBack: () => setActiveIndex(2),
        }),
      );

      requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    requestAnimationFrame(create);

    const handleResize = () => create();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      for (const t of triggers) t.kill();
      triggers = [];
    };
  }, []);

  const baseChart = charts[activeIndex];
  const chartCopy = copy.pictogram.charts[activeIndex];
  const activeChart = {
    ...baseChart,
    title: chartCopy.title,
    subtitle: chartCopy.subtitle,
    source: chartCopy.source,
    categories: baseChart.categories.map((category) => ({
      ...category,
      label:
        copy.pictogram.categories[
          category.icon as keyof typeof copy.pictogram.categories
        ],
    })),
  };

  return (
    <section className="w-full bg-white">
      {/* Gráfico sticky, centralizado na tela */}
      <div
        className="flex h-screen w-full items-center justify-center"
        style={{ position: "sticky", top: 0, zIndex: 0 }}
      >
        <div
          className="mx-auto flex max-h-[86vh] pb-6 w-full max-w-2xl flex-col px-6 2xl:max-w-3xl"
          style={{ height: "86vh" }}
        >
          <PictogramChart chart={activeChart} />
        </div>
      </div>

      {/* Cards de texto que passam por cima do gráfico */}
      <div>
        <ScrollCard cardRef={card0Ref}>
          <p>
            {copy.pictogram.tripsLead}{" "}
            <strong>{copy.pictogram.tripsShare}</strong>{" "}
            {copy.pictogram.tripsMid}{" "}
            <strong>{copy.pictogram.tripsRank}</strong>
            {copy.pictogram.tripsReach}{" "}
            <strong>{copy.pictogram.tripsPercent}</strong>
            {copy.pictogram.tripsPeriod}{" "}
            <strong>{copy.pictogram.tripsCrashes}</strong>
            {copy.pictogram.tripsEnd}{" "}
            <strong>{copy.pictogram.tripsNearly}</strong>.
          </p>
        </ScrollCard>

        <ScrollCard cardRef={card1Ref} className="mt-[50vh]">
          <p>
            {copy.pictogram.deathsLead}{" "}
            <strong>{copy.pictogram.deathsRole}</strong>
            {copy.pictogram.deathsMid}{" "}
            <strong>{copy.pictogram.deathsShare}</strong>
            {copy.pictogram.deathsEnd}{" "}
            <strong>{copy.pictogram.deathsPercent}</strong>.
          </p>
        </ScrollCard>

        <ScrollCard cardRef={cardGrowthRef}>
          <p>
            {copy.pictogram.growthLead}{" "}
            <strong>{copy.pictogram.growthEmphasis}</strong>
            {copy.pictogram.growthMid}{" "}
            <strong>{copy.pictogram.growthEnd}</strong>.
          </p>
        </ScrollCard>

        <ScrollCard cardRef={card2Ref} className="mt-[50vh]">
          <p>
            {copy.pictogram.policyLead}{" "}
            <strong>{copy.pictogram.policyEmphasis}</strong>{" "}
            {copy.pictogram.policyMid}{" "}
            <strong>{copy.pictogram.policyQuestion}</strong>
          </p>
        </ScrollCard>

        <ScrollCard cardRef={cardNoteRef} minHeight="150vh">
          <p>
            <strong>{copy.pictogram.noteLabel}</strong> {copy.pictogram.note}
          </p>
        </ScrollCard>

        {/* Spacer para manter o sticky ativo até o último card sair da tela */}
        <div style={{ minHeight: "50vh" }} aria-hidden="true" />
      </div>
    </section>
  );
}
