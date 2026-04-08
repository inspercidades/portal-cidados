"use client";
/* eslint-disable @next/next/no-img-element */

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import chart1 from "../assets/chart1.png";
import chart2 from "../assets/chart2.png";
import chart3 from "../assets/chart3.png";
import couple from "../assets/couple.png";
import icon1 from "../assets/icon1.png";
import icon4 from "../assets/icon4.png";
import Image from "next/image";

// Registrar o plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function DoencasCerebrovasculares() {
  // Refs para as imagens que serão animadas
  const chart1Ref = useRef<HTMLDivElement>(null);
  const chart2Ref = useRef<HTMLDivElement>(null);
  const chart3LeftRef = useRef<HTMLDivElement>(null);
  const chart3RightRef = useRef<HTMLDivElement>(null);
  const couple1Ref = useRef<HTMLDivElement>(null);
  const couple2Ref = useRef<HTMLDivElement>(null);
  const couple3Ref = useRef<HTMLDivElement>(null);
  const icon1Ref = useRef<HTMLDivElement>(null);
  const icon4Ref = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const images = [
      { ref: chart1Ref, delay: 0 },
      { ref: chart2Ref, delay: 0.1 },
      { ref: chart3LeftRef, delay: 0.2 },
      { ref: chart3RightRef, delay: 0.3 },
      { ref: couple1Ref, delay: 0 },
      { ref: couple2Ref, delay: 0.1 },
      { ref: couple3Ref, delay: 0.2 },
      { ref: icon1Ref, delay: 0.1 },
      { ref: icon4Ref, delay: 0 },
    ];

    // Configurar estado inicial das imagens
    images.forEach(({ ref }) => {
      if (ref.current) {
        gsap.set(ref.current, {
          opacity: 0,
          y: 30,
        });
      }
    });

    // Criar animações com ScrollTrigger
    const animations = images.map(({ ref, delay }) => {
      if (!ref.current) return null;

      return gsap.to(ref.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          end: "top 50%",
          toggleActions: "play none none reverse",
          immediateRender: false,
        },
      });
    });

    // Verificar se elementos já estão visíveis ao montar
    const checkInitialState = () => {
      images.forEach(({ ref, delay }) => {
        if (!ref.current || !sectionRef.current) return;

        const rect = ref.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const triggerPoint = viewportHeight * 0.85;

        if (rect.top < triggerPoint && rect.bottom > 0) {
          gsap.to(ref.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay,
            ease: "power3.out",
          });
        }
      });
    };

    // Aguardar ScrollTrigger estar pronto
    const timeoutId = setTimeout(() => {
      ScrollTrigger.refresh();
      requestAnimationFrame(() => {
        checkInitialState();
      });
    }, 150);

    return () => {
      clearTimeout(timeoutId);
      animations.forEach((anim) => {
        anim?.scrollTrigger?.kill();
        anim?.kill();
      });
    };
  }, []);

  return (
    <div ref={sectionRef} className="min-h-screen bg-white p-6 lg:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Main Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Title and Text Content */}
          <div>
            {/* Main Title */}
            <div className="mb-12">
              <h1 className="text-3xl lg:text-4xl font-semibold text-[#000000] mb-8">
                Doenças
                <br />
                Cerebrovasculares
              </h1>
            </div>

            {/* Text Content */}
            <div className="space-y-12">
              {/* Tendências por gênero */}
              <section>
                <h2 className="text-xl font-semibold text-[#000000] mb-6">
                  Tendências por gênero
                </h2>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div
                      ref={couple1Ref}
                      className="flex-shrink-0 w-12 flex justify-center"
                    >
                      <Image
                        src={couple}
                        alt="Ícone mulher"
                        className="max-w-full h-auto"
                        width={30}
                        height={30}
                      />
                    </div>
                    <p className="text-[#000000] leading-[140%] lg:text-base text-lg flex-1">
                      Redução estatisticamente significativa no risco de
                      mortalidade prematura para ambos os sexos.
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div
                      ref={couple2Ref}
                      className="flex-shrink-0 w-12 flex justify-center"
                    >
                      <Image
                        src={couple}
                        alt="Ícone homem"
                        className="max-w-full h-auto"
                        width={30}
                        height={30}
                      />
                    </div>
                    <p className="text-[#000000] leading-[140%] lg:text-base text-lg flex-1">
                      Desigualdade entre os distritos, mais estável entre homens
                      e mais variável entre mulheres
                    </p>
                  </div>
                </div>
              </section>

              {/* Faixas etárias */}
              <section>
                <h2 className="text-xl font-semibold text-[#000000] mb-6">
                  Faixas etárias
                </h2>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div
                      ref={icon1Ref}
                      className="flex-shrink-0 w-12 flex justify-center"
                    >
                      <Image
                        src={icon1}
                        alt="Ícone jovens"
                        className="max-w-full h-auto"
                        width={20}
                        height={20}
                      />
                    </div>
                    <p className="text-[#000000] leading-[140%] lg:text-base text-lg flex-1">
                      Estabilidade entre 30 e 39 anos; tendência de redução para
                      mulheres acima de 40 anos.
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div
                      ref={couple3Ref}
                      className="flex-shrink-0 w-12 flex justify-center"
                    >
                      <Image
                        src={couple}
                        alt="Ícone idosos"
                        className="max-w-full h-auto"
                        width={30}
                        height={30}
                      />
                    </div>
                    <p className="text-[#000000] leading-[140%] lg:text-base text-lg flex-1">
                      Entre 60 e 69 anos, o risco aumentou para mulheres e
                      manteve-se estável para homens.
                    </p>
                  </div>
                </div>
              </section>

              {/* Influência socioeconômica */}
              <section>
                <h2 className="text-xl font-semibold text-[#000000] mb-6">
                  Destaques regionais:
                </h2>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div
                      ref={icon4Ref}
                      className="flex-shrink-0 w-12 flex justify-center"
                    >
                      <Image
                        src={icon4}
                        alt="Ícone distrito"
                        className="max-w-full h-auto"
                        width={20}
                        height={20}
                      />
                    </div>
                    <p className="text-[#000000] leading-[140%] lg:text-base text-lg flex-1">
                      Parelheiros apresentou maior risco relativo entre
                      mulheres, e Moema o menor entre homens.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* Right Column - Charts */}
          <div className="space-y-8">
            {/* Top Charts Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div ref={chart1Ref} className="rounded-lg p-4">
                <Zoom>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={chart1.src}
                    alt="Gráfico temporal - Mulheres"
                    className="w-full h-auto rounded-xl"
                  />
                </Zoom>
              </div>
              <div ref={chart2Ref} className="rounded-lg p-4">
                <Zoom>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={chart2.src}
                    alt="Gráfico temporal - Homens"
                    className="w-full h-auto rounded-xl"
                  />
                </Zoom>
              </div>
            </div>

            {/* Caption for top charts */}
            <p className="text-sm text-[#000000] text-center px-4">
              <strong>Figura 4:</strong> Tendência temporal do risco relativo de
              mortalidade prematura por Diabetes Mellitus, de 2010 a 2019,
              município de São Paulo: a) mulheres, b) homens. A área em cinza
              indica o intervalo de credibilidade
            </p>

            {/* Bottom Charts Row - Maps */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div ref={chart3LeftRef} className="p-4">
                <Zoom>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={chart3.src}
                    alt="Mapa - Mulheres"
                    className="w-full rounded-xl"
                  />
                </Zoom>
              </div>
              <div ref={chart3RightRef} className="p-4">
                <Zoom>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={chart3.src}
                    alt="Mapa - Homens"
                    className="w-full rounded-xl"
                  />
                </Zoom>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
