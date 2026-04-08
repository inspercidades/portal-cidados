"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState, useEffect } from "react";
import houseBackground from "../assets/houseBackground.png";
import houseBackgroundMobile from "../assets/houseBackgroundMobile.png";
import { default as panoramicImage } from "../assets/panoramicImage.png";
import { default as panoramicImageMobile } from "../assets/panoramicImageMobile.png";
import houseOne from "../assets/houseOne.png";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

// Desktop: pixel position of houseOne's top-left corner within houseBackground.png
const HOUSE_ONE_OFFSET = { x: 531, y: 164 };
const BG_NATURAL_W = 4711;
const BG_NATURAL_H = 1067;

// Mobile: houseBackgroundMobile.png has different dimensions (2631x711)
// Mobile pode ter crop diferente - ajuste fino manual: casa deve ficar na área visível (esquerda)
const BG_NATURAL_W_MOBILE = 2631;
const BG_NATURAL_H_MOBILE = 711;
const HOUSE_ONE_OFFSET_MOBILE = {
  x: -151,   // Casa na esquerda do mobile (0% center) - ajuste se precisar
  y: 3,
};

const HOUSE_ONE_NATURAL_W = 633;
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
  const bgScale = Math.max(viewW / BG_NATURAL_W_MOBILE, viewH / BG_NATURAL_H_MOBILE);
  const displayedBgH = BG_NATURAL_H_MOBILE * bgScale;
  const clipX = 0;
  const clipY = Math.max(0, (displayedBgH - viewH) / 2);
  const targetCenterX =
    HOUSE_ONE_OFFSET_MOBILE.x * bgScale - clipX + (HOUSE_ONE_NATURAL_W * bgScale) / 2;
  const targetCenterY =
    HOUSE_ONE_OFFSET_MOBILE.y * bgScale - clipY + (HOUSE_ONE_NATURAL_W * bgScale) / 2;
  // No mobile, houseOne não deve crescer - manter scale 1
  return {
    deltaX: targetCenterX - viewW / 2,
    deltaY: targetCenterY - viewH / 2,
    targetScale: 1.12,
  };
}

function computeMorphDeltas() {
  return window.innerWidth < 768 ? computeMorphDeltasMobile() : computeMorphDeltasDesktop();
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
    const firstCard = containerRef.current?.querySelector(`[data-card-index="0"]`);
    const secondCard = containerRef.current?.querySelector(`[data-card-index="1"]`);

    if (!firstCard || !houseOneRef.current || !houseBackgroundRef.current) return;

    // --- Morph: houseOne moves from center into its position in houseBackground ---
    const morphTl = gsap.timeline({
      scrollTrigger: {
        trigger: firstCard,
        start: "bottom center",
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
        start: "bottom center",
        onEnter: () => {
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
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // Panoramic horizontal scroll animation
  useGSAP(() => {
    const thirdCard = containerRef.current?.querySelector(`[data-card-index="2"]`);
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
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // Define the text cards content and positions (removed the third card)
  const cards = [
    {
      top: 0,
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
      top: 150,
      text: (
        <>
          Durante o trajeto, Maria aproveita para tomar o café da manhã que não
          conseguiu fazer em casa.{" "}
          <strong>
            Um biscoito recheado e um suco de caixinha substituem uma refeição
            mais nutritiva
          </strong>
          , mas é o que o tempo e o orçamento permitem.
        </>
      ),
    },
    // {
    //   top: 300,
    //   text: (
    //     <>
    //       Ao final do dia, Maria retorna para casa às 19h.{" "}
    //       <strong>
    //         Entre trabalho, transporte e cuidados domésticos, sobra pouco tempo
    //         para cuidar da própria saúde
    //       </strong>
    //       , perpetuando um ciclo que afeta diretamente o controle de sua
    //       diabetes.
    //     </>
    //   ),
    // },
    {
      top: 300,
      text: (
        <>
          Às 5hs, ela pega o ônibus. São duas horas de viagem até o Jardim
          Paulista, um bairro de classe média alta na área central da cidade.
        </>
      ),
    },
  ];

  return (
    <div ref={containerRef} className="h-[600vh]">
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
            key={index}
            data-card-index={index}
            className="absolute bg-[#FFFFFF]/90 h-auto w-[80vw] md:w-[460px] border border-[#000000]/20 px-[30px]
    py-[25px]
    lg:px-[32px]
    lg:py-[25px]
    rounded-xl shadow-lg
    "
            style={{
              top: `${card.top}vh`,
              opacity: index === 0 || index === 1 ? 0 : 1,
            }}
          >
            <div className="text-[#000000]">{card.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
