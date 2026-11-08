"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef, useState } from "react";
import type { FaixaAzulCopy } from "@/i18n/messages/stories/faixa-azul";
import { useStoryCopy } from "@/i18n/story-copy";
import {
  brandColor,
  faixaBarataImage,
  fiscalImage,
  localMotoboysImage,
} from "../constants";

gsap.registerPlugin(ScrollTrigger);

const MEDIA_MARGIN = 24;
const MEDIA_BORDER_RADIUS = 12;
const EXPAND_SCROLL_DISTANCE = 300;

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
}

function ScrollCard({
  children,
  cardRef,
  minHeight = "130vh",
  contentDelayVh = 0,
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
      <CardBox>{children}</CardBox>
    </div>
  );
}

const FINAL_LAYERS = [
  fiscalImage,
  faixaBarataImage,
  localMotoboysImage,
] as const;

function applyMediaFrame(mediaInner: HTMLDivElement, expandedRatio: number) {
  const ratio = gsap.utils.clamp(0, 1, expandedRatio);

  gsap.set(mediaInner, {
    top: gsap.utils.interpolate(MEDIA_MARGIN, 0, ratio),
    left: gsap.utils.interpolate(MEDIA_MARGIN, 0, ratio),
    right: gsap.utils.interpolate(MEDIA_MARGIN, 0, ratio),
    bottom: gsap.utils.interpolate(MEDIA_MARGIN, 0, ratio),
    borderRadius: gsap.utils.interpolate(MEDIA_BORDER_RADIUS, 0, ratio),
  });
}

export default function FinalSection() {
  const copy = useStoryCopy<FaixaAzulCopy>();
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const scopeRef = useRef<HTMLDivElement>(null);
  const mediaInnerRef = useRef<HTMLDivElement>(null);

  const card0Ref = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);

  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const cards = [card0Ref, card1Ref, card2Ref];
    const mediaInner = mediaInnerRef.current;
    const scope = scopeRef.current;
    const lastCard = card2Ref.current;

    if (!mediaInner || !scope || !lastCard) return;

    let expandST: ScrollTrigger | undefined;
    let collapseST: ScrollTrigger | undefined;
    let triggers: ScrollTrigger[] = [];

    const updateMediaFrame = () => {
      const expandProgress = expandST?.progress ?? 0;

      if (collapseST && collapseST.scroll() >= collapseST.start) {
        applyMediaFrame(mediaInner, 1 - collapseST.progress);
        return;
      }

      applyMediaFrame(mediaInner, expandProgress);
    };

    const create = () => {
      for (const t of triggers) t.kill();
      triggers = [];

      applyMediaFrame(mediaInner, 0);

      expandST = ScrollTrigger.create({
        trigger: scope,
        start: "top top",
        end: `+=${EXPAND_SCROLL_DISTANCE}`,
        scrub: 0.5,
        onUpdate: updateMediaFrame,
      });
      triggers.push(expandST);

      if (!cards.every((ref) => ref.current)) return;

      collapseST = ScrollTrigger.create({
        trigger: lastCard,
        start: "bottom center",
        end: `+=${EXPAND_SCROLL_DISTANCE}`,
        scrub: 0.5,
        onUpdate: updateMediaFrame,
      });
      triggers.push(collapseST);

      cards.forEach((ref, i) => {
        triggers.push(
          ScrollTrigger.create({
            trigger: ref.current,
            start: "top center",
            end: "bottom center",
            onEnter: () => setActiveIndex(i),
            onEnterBack: () => setActiveIndex(i),
            onLeaveBack: () => setActiveIndex(Math.max(0, i - 1)),
          }),
        );
      });

      updateMediaFrame();
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

  const cardRefs = [card0Ref, card1Ref, card2Ref];

  return (
    <section ref={sectionRef} className="w-full py-20 pb-60 bg-white">
      <div
        ref={scopeRef}
        className="relative h-screen w-full"
        style={{ position: "sticky", top: 0, zIndex: 0 }}
      >
        <div
          ref={mediaInnerRef}
          className="absolute overflow-hidden"
          style={{
            top: MEDIA_MARGIN,
            left: MEDIA_MARGIN,
            right: MEDIA_MARGIN,
            bottom: MEDIA_MARGIN,
            borderRadius: MEDIA_BORDER_RADIUS,
          }}
        >
          {FINAL_LAYERS.map((src, i) => (
            <div
              key={src}
              ref={(el) => {
                layerRefs.current[i] = el;
              }}
              className="absolute inset-0"
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              <img
                src={src}
                alt={copy.final.alts[i]}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        {copy.final.cards.map((card, i) => (
          <ScrollCard
            key={card.title}
            cardRef={cardRefs[i]}
            contentDelayVh={i > 0 ? 20 : 0}
            minHeight={i === copy.final.cards.length - 1 ? "200vh" : "130vh"}
          >
            <div className="space-y-4">
              <p className="font-bold">{card.title}</p>
              <p>{card.body}</p>
            </div>
          </ScrollCard>
        ))}

        <div style={{ minHeight: "100vh" }} aria-hidden="true" />
      </div>
    </section>
  );
}
