"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import houseBackground from "../assets/houseBackground.png";
import houseBackgroundMobile from "../assets/houseBackgroundMobile.png";
import houseOne from "../assets/houseOne.png";
import { default as panoramicImage } from "../assets/panoramicImage.png";
import { default as panoramicImageMobile } from "../assets/panoramicImageMobile.png";

gsap.registerPlugin(ScrollTrigger);

// Desktop: pixel position of houseOne's top-left corner within houseBackground.png
const HOUSE_ONE_OFFSET = { x: 410, y: 150 };
const BG_NATURAL_W = 4600;
const BG_NATURAL_H = 900;

// Mobile: houseBackgroundMobile.png (2399x643)
const BG_NATURAL_W_MOBILE = 2450;
const BG_NATURAL_H_MOBILE = 590;
const HOUSE_ONE_OFFSET_MOBILE = {
  x: -138,
  y: 3,
};

const HOUSE_ONE_NATURAL_W = 551;
const HOUSE_ONE_DISPLAY_W = 600; // width/height prop on <Image>

function computeMorphDeltasDesktop() {
  const viewW = window.innerWidth;
  const viewH = window.innerHeight;
  const bgScale = Math.max(viewW / BG_NATURAL_W, viewH / BG_NATURAL_H);
  const displayedBgH = BG_NATURAL_H * bgScale;
  const clipX = 0;
  const clipY = Math.max(0, (displayedBgH - viewH) / 2);
  const targetCenterX =
    HOUSE_ONE_OFFSET.x * bgScale - clipX + (HOUSE_ONE_NATURAL_W * bgScale) / 2;
  const targetCenterY =
    HOUSE_ONE_OFFSET.y * bgScale - clipY + (HOUSE_ONE_NATURAL_W * bgScale) / 2;
  return {
    deltaX: targetCenterX - viewW / 2,
    deltaY: targetCenterY - viewH / 2,
    targetScale: (HOUSE_ONE_NATURAL_W * bgScale) / HOUSE_ONE_DISPLAY_W,
  };
}

function computeMorphDeltasMobile() {
  const viewW = window.innerWidth;
  const viewH = window.innerHeight;
  const bgScale = Math.max(
    viewW / BG_NATURAL_W_MOBILE,
    viewH / BG_NATURAL_H_MOBILE,
  );
  const displayedBgH = BG_NATURAL_H_MOBILE * bgScale;
  const clipX = 0;
  const clipY = Math.max(0, (displayedBgH - viewH) / 2);
  const targetCenterX =
    HOUSE_ONE_OFFSET_MOBILE.x * bgScale -
    clipX +
    (HOUSE_ONE_NATURAL_W * bgScale) / 2;
  const targetCenterY =
    HOUSE_ONE_OFFSET_MOBILE.y * bgScale -
    clipY +
    (HOUSE_ONE_NATURAL_W * bgScale) / 2;
  // No mobile, houseOne não deve crescer - manter scale 1
  return {
    deltaX: targetCenterX - viewW / 2,
    deltaY: targetCenterY - viewH / 2,
    targetScale: 1.12,
  };
}

function computeMorphDeltas() {
  return window.innerWidth < 768
    ? computeMorphDeltasMobile()
    : computeMorphDeltasDesktop();
}

export default function HouseSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const panoramicSliderRef = useRef<HTMLDivElement>(null);
  const houseOneRef = useRef<HTMLImageElement>(null);
  const houseBackgroundRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Morph animation + panoramic visibility triggers
  useGSAP(() => {
    const firstCard = containerRef.current?.querySelector(
      `[data-card-index="0"]`,
    );
    const secondCard = containerRef.current?.querySelector(
      `[data-card-index="2"]`,
    );

    if (!firstCard || !houseOneRef.current || !houseBackgroundRef.current)
      return;

    // --- Morph: houseOne moves from center into its position in houseBackground ---
    const morphTl = gsap.timeline({
      scrollTrigger: {
        trigger: firstCard,
        start: "bottom top",
        toggleActions: "play none none reverse",
        invalidateOnRefresh: true,
      },
    });

    morphTl
      // Background fades in and houseOne starts moving simultaneously
      .to(
        houseBackgroundRef.current,
        { opacity: 1, duration: 0.4, ease: "power1.out", overwrite: "auto" },
        0,
      )
      .to(
        houseOneRef.current,
        {
          x: () => computeMorphDeltas().deltaX,
          y: () => computeMorphDeltas().deltaY,
          scale: () => computeMorphDeltas().targetScale,
          duration: 0.8,
          ease: "power2.inOut",
          overwrite: "auto",
        },
        0,
      )
      // houseOne fades out as it merges into the background
      .to(
        houseOneRef.current,
        { opacity: 0, duration: 0.25, ease: "power1.in", overwrite: "auto" },
        0.6,
      );

    // --- Panoramic section: swap houseBackground → panoramic ---
    if (secondCard) {
      ScrollTrigger.create({
        trigger: secondCard,
        start: "top bottom",
        onEnter: () => {
          // Força o morphTl ao estado final antes de qualquer animação direta.
          // Isso garante que o tween interno do houseBackground seja "completado"
          // (não morto por overwrite), preservando a capacidade de reversão do timeline.
          morphTl.progress(1, true);
          gsap.to(houseBackgroundRef.current, {
            opacity: 0,
            duration: 0.5,
            overwrite: "auto",
          });
          gsap.to(panoramicSliderRef.current, {
            opacity: 1,
            duration: 0.5,
            overwrite: "auto",
          });
        },
        onLeaveBack: () => {
          gsap.to(houseBackgroundRef.current, {
            opacity: 1,
            duration: 0.5,
            overwrite: "auto",
          });
          gsap.to(panoramicSliderRef.current, {
            opacity: 0,
            duration: 0.5,
            overwrite: "auto",
          });
        },
      });
    }

    return () => {
      for (const t of ScrollTrigger.getAll()) t.kill();
    };
  }, []);

  // Panoramic horizontal scroll animation
  useGSAP(() => {
    const thirdCard = containerRef.current?.querySelector(
      `[data-card-index="3"]`,
    );
    if (!thirdCard || !panoramicSliderRef.current) return;

    gsap.to(panoramicSliderRef.current, {
      scrollTrigger: {
        trigger: thirdCard,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        invalidateOnRefresh: true,
      },
      backgroundPosition: "100% center",
      ease: "none",
    });

    return () => {
      for (const t of ScrollTrigger.getAll()) t.kill();
    };
  }, []);

  // Define the text cards content and positions
  const cards = [
    {
      top: 0,
      text: (
        <>
          O dia começa cedo: às 4h da manhã, Maria já está de pé para preparar o
          café das crianças e tomar um banho rápido antes de sair.{" "}
          <strong>
            Como o tempo é curto, a primeira refeição do dia não é feita como
            deveria.
          </strong>{" "}
          Os alimentos ultraprocessados, como achocolatados e biscoitos
          recheados dão lugar às frutas, aos ovos e ao suco caseiro.
          <br />
          <br />
          <strong className="block">
            {" "}
            Maria tem <strong>Diabetes Mellitus</strong> e precisa medir sua
            glicose diariamente, mas sua rotina é tão corrida que nem sempre ela
            consegue fazer isso como deveria.
          </strong>
        </>
      ),
    },
    {
      top: 200,
      text: (
        <>
          Às 5h30, Maria já está no ponto de ônibus. Duas conduções e quase duas
          horas depois, ela chega ao trabalho no centro da cidade.{" "}
          <strong>
            O trajeto diário de Maria ilustra a realidade de milhões de
            brasileiros que vivem nas periferias das grandes cidades.
          </strong>
        </>
      ),
    },
    {
      top: 230,
      text: <></>,
    },
    {
      top: 300,
      text: (
        <>
          Às 5hs, <strong>Maria pega o ônibus em direção ao trabalho</strong>.
          São <strong>duas horas de viagem</strong> até o Jardim Paulista, um
          bairro de classe média alta próximo à Avenida Paulista.
        </>
      ),
    },
  ];

  return (
    <div ref={containerRef} className="h-[550vh]">
      <div
        style={{ position: "sticky", top: 0 }}
        className="h-screen w-full overflow-hidden"
      >
        <div className="min-h-screen w-full bg-white flex items-center justify-center relative overflow-hidden">
          {/* Background — GSAP controls opacity (starts hidden) */}
          <div
            ref={houseBackgroundRef}
            className="absolute inset-0 bg-cover bg-center overflow-hidden"
            style={{
              backgroundImage: `url(${isMobile ? houseBackgroundMobile.src : houseBackground.src})`,
              backgroundPosition: "0% center",
              opacity: 0,
            }}
          />

          {/* Panoramic horizontal scroll container — GSAP controls opacity */}
          <div
            ref={panoramicSliderRef}
            className="absolute inset-0 bg-cover overflow-hidden"
            style={{
              backgroundImage: `url(${isMobile ? panoramicImageMobile.src : panoramicImage.src})`,
              backgroundPosition: "0% center",
              opacity: 0,
            }}
          />

          {/* houseOne — GSAP morphs this into houseBackground */}
          <Image
            ref={houseOneRef}
            src={houseOne}
            alt="House illustration"
            className="max-w-full max-h-full object-contain relative z-10"
            width={600}
            height={600}
            priority
          />
        </div>
      </div>

      <div className="relative flex flex-col items-center">
        {cards.map((card, index) => (
          <div
            key={`card-${card.top}-${index}`}
            data-card-index={index}
            className="absolute bg-[#FFFFFF]/90 h-auto w-[80vw] md:w-[460px] border border-[#000000]/20 px-[30px]
    py-[25px]
    lg:px-[32px]
    lg:py-[25px]
    shadow-lg
    "
            style={{
              top: `${card.top}vh`,
              opacity: index === 1 || index === 2 ? 0 : 1,
            }}
          >
            <div className="text-[#000000]">{card.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
