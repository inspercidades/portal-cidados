"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef, useState } from "react";
import type { FaixaAzulCopy } from "@/i18n/messages/stories/faixa-azul";
import { useStoryCopy } from "@/i18n/story-copy";
import { brandColor, faixaChartImage, fechadaFaixaVideo } from "../constants";

gsap.registerPlugin(ScrollTrigger);

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
  contentDelayVh?: number;
  wrapContent?: boolean;
}

function ScrollCard({
  children,
  cardRef,
  minHeight = "130vh",
  contentDelayVh = 0,
  wrapContent = true,
}: ScrollCardProps) {
  return (
    <div
      ref={cardRef}
      className={`flex justify-center px-6 md:px-8 ${contentDelayVh > 0 ? "items-end" : "items-center"}`}
      style={{
        minHeight,
        position: "relative",
        zIndex: 1,
        ...(contentDelayVh > 0 ? { paddingBottom: `${contentDelayVh}vh` } : {}),
      }}
    >
      {wrapContent ? <CardBox>{children}</CardBox> : children}
    </div>
  );
}

const MEDIA_LAYERS = [
  { type: "image" as const, src: faixaChartImage },
  { type: "video" as const, src: fechadaFaixaVideo },
];

/** Card index → media layer index. Card1 and card2 share fechada-faixa. */
const CARD_MEDIA_INDEX = [0, 1, 1] as const;

export default function MediaSection() {
  const copy = useStoryCopy<FaixaAzulCopy>();
  const [activeIndex, setActiveIndex] = useState(0);
  const scopeRef = useRef<HTMLDivElement>(null);

  const card0Ref = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);

  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useLayoutEffect(() => {
    const cards = [card0Ref, card1Ref, card2Ref];
    let triggers: ScrollTrigger[] = [];

    const create = () => {
      if (!cards.every((ref) => ref.current)) return;
      for (const t of triggers) t.kill();
      triggers = [];

      cards.forEach((ref, i) => {
        triggers.push(
          ScrollTrigger.create({
            trigger: ref.current,
            start: "top center",
            end: "bottom center",
            onEnter: () => setActiveIndex(CARD_MEDIA_INDEX[i]),
            onEnterBack: () => setActiveIndex(CARD_MEDIA_INDEX[i]),
            onLeaveBack: () =>
              setActiveIndex(CARD_MEDIA_INDEX[Math.max(0, i - 1)]),
          }),
        );
      });

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
            { scale: MEDIA_LAYERS[i].type === "video" ? 1.06 : 1.03 },
            {
              scale: 1,
              duration: 1.1,
              ease: "power2.out",
              overwrite: "auto",
            },
          );
        }
      });

      videoRefs.current.forEach((video, videoIdx) => {
        if (!video) return;
        const layerIndex = videoIdx + 1;
        if (layerIndex === activeIndex) {
          video.play().catch(() => {});
        } else {
          video.pause();
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
        {MEDIA_LAYERS.map((media, i) => (
          <div
            key={media.src}
            ref={(el) => {
              layerRefs.current[i] = el;
            }}
            className="absolute inset-0 flex items-center justify-center"
            style={{ opacity: i === 0 ? 1 : 0 }}
          >
            {media.type === "image" ? (
              <img
                src={media.src}
                alt={copy.media.chartAlt}
                className="h-auto w-full max-w-6xl px-6 object-contain"
              />
            ) : (
              <video
                ref={(el) => {
                  const videoIdx = i - 1;
                  videoRefs.current[videoIdx] = el;
                }}
                src={media.src}
                loop
                muted
                playsInline
                className="h-full w-full object-cover"
              />
            )}
          </div>
        ))}
      </div>

      <div>
        <ScrollCard cardRef={card0Ref}>
          <p>
            <strong>{copy.media.laneEmphasis}</strong>
            {copy.media.laneRest}
          </p>
        </ScrollCard>

        <ScrollCard cardRef={card1Ref} contentDelayVh={20}>
          <p>
            {copy.media.advantageLead}{" "}
            <strong>{copy.media.advantageEmphasis}</strong>
            {copy.media.advantageRest}
          </p>
          <p className="mt-4">
            {copy.media.cheapLead} <strong>{copy.media.cheapEmphasis}</strong>
            {copy.media.cheapRest}
          </p>
        </ScrollCard>

        <ScrollCard cardRef={card2Ref} minHeight="260vh" wrapContent={false}>
          <div className="flex w-full max-w-xl flex-col gap-[60px]">
            <CardBox>
              <div className="space-y-4">
                <p>
                  {copy.media.speedLead}{" "}
                  <strong>{copy.media.speedEmphasis}</strong>
                  {copy.media.speedRest}
                </p>
                <p>
                  {copy.media.outsideLead}{" "}
                  <strong>{copy.media.outsideEmphasis}</strong>
                  {copy.media.outsideRest}
                </p>
              </div>
            </CardBox>
          </div>
        </ScrollCard>

        <div style={{ minHeight: "100vh" }} aria-hidden="true" />
      </div>
    </section>
  );
}
