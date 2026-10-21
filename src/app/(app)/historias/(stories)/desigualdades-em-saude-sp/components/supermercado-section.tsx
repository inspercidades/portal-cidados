"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import condominioOne from "../assets/condominio1.png";
import condominioOneMobile from "../assets/condominio1Mobile.png";
import condominioTwo from "../assets/condominio2.png";
import condominioTwoMobile from "../assets/condominio2Mobile.png";
import hospitalReception from "../assets/hospitalReception.png";
import pontoDeOnibus from "../assets/pontoDeOnibus.png";
import supermercado from "../assets/supermercado.png";
import supermercadoTwo from "../assets/supermercadoTwo.png";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxMap from "react-map-gl/mapbox";

const CEREBROVASCULAR_PEP_LEGEND = [
  { label: "≤ 10", color: "#2166AC" },
  { label: "Não significativo", color: "#E6E7E8" },
  { label: "≥ 80", color: "#B2182B" },
];

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function SupermercadoSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const condominioTwoSliderRef = useRef<HTMLDivElement>(null);
  const pontoDeOnibusSliderRef = useRef<HTMLDivElement>(null);
  const [currentImage, setCurrentImage] = useState(0); // 0 for first image, 1 for second image, 2 for condominioOne, 3 for condominioTwo, 4 for pontoDeOnibus, 5 for hospitalReception
  const [showCondominioTwoScroll, setShowCondominioTwoScroll] = useState(false);
  const [showPontoDeOnibusScroll, setShowPontoDeOnibusScroll] = useState(false);
  const [showDrawerOne, setShowDrawerOne] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [legendCollapsed, setLegendCollapsed] = useState(true);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1200);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // ScrollTrigger for background fade effect
  useGSAP(() => {
    const firstCardElement = containerRef.current?.querySelector(
      `[data-card-index="0"]`,
    );
    const secondCardElement = containerRef.current?.querySelector(
      `[data-card-index="1"]`,
    );
    const thirdCardElement = containerRef.current?.querySelector(
      `[data-card-index="2"]`,
    );
    const fourthCardElement = containerRef.current?.querySelector(
      `[data-card-index="3"]`,
    );
    const fifthCardElement = containerRef.current?.querySelector(
      `[data-card-index="4"]`,
    );
    const sixthCardElement = containerRef.current?.querySelector(
      `[data-card-index="6"]`,
    );
    const seventhCardElement = containerRef.current?.querySelector(
      `[data-card-index="7"]`,
    );

    if (firstCardElement) {
      ScrollTrigger.create({
        trigger: firstCardElement,
        start: "bottom center",
        onEnter: () => {
          // Keep first image when entering first card
          setCurrentImage(0);
        },
        onLeaveBack: () => {
          // Keep first image when going back to first card
          setCurrentImage(0);
        },
      });
    }

    if (secondCardElement) {
      ScrollTrigger.create({
        trigger: secondCardElement,
        start: "top center",
        onEnter: () => {
          // Switch to second image when entering second card
          setCurrentImage(1);
        },
        onLeaveBack: () => {
          // Switch back to first image when leaving second card
          setCurrentImage(0);
        },
      });

      // condominioOne appears when "Recentemente, Alice sofreu..." exits the screen
      ScrollTrigger.create({
        trigger: secondCardElement,
        start: "bottom top",
        onEnter: () => {
          setCurrentImage(2);
        },
        onLeaveBack: () => {
          setCurrentImage(1);
        },
      });
    }

    if (thirdCardElement) {
      ScrollTrigger.create({
        trigger: thirdCardElement,
        start: "bottom center",
        onEnter: () => {
          // condominioOne already shown by secondCard exit — keep as fallback for jump-scrolls
          setCurrentImage(2);
        },
        onLeaveBack: () => {
          // Still between thirdCard and secondCard exit — stay on condominioOne
          setCurrentImage(2);
        },
      });
    }

    if (fourthCardElement) {
      ScrollTrigger.create({
        trigger: fourthCardElement,
        start: "bottom center",
        onEnter: () => {
          // Switch to condominioTwo when entering fourth card
          setCurrentImage(3);
        },
        onLeaveBack: () => {
          // Switch back to condominioOne when leaving fourth card
          setCurrentImage(2);
        },
      });
    }

    if (fifthCardElement) {
      ScrollTrigger.create({
        trigger: fifthCardElement,
        start: "bottom top",
        onEnter: () => {
          // Switch to pontoDeOnibus when fifth card exits screen
          setCurrentImage(4);
        },
        onLeaveBack: () => {
          // Switch back to condominioTwo when leaving fifth card
          setCurrentImage(3);
        },
      });
    }

    if (sixthCardElement) {
      ScrollTrigger.create({
        trigger: sixthCardElement,
        start: "top center",
        onEnter: () => {
          // Keep pontoDeOnibus when entering sixth card (farmácia)
          setCurrentImage(4);
        },
        onLeaveBack: () => {
          // Switch back to pontoDeOnibus when leaving sixth card
          setCurrentImage(4);
        },
      });
    }

    if (seventhCardElement) {
      ScrollTrigger.create({
        trigger: seventhCardElement,
        start: "top center",
        onEnter: () => {
          // Switch to hospitalReception when entering seventh card (hospital)
          setCurrentImage(5);
        },
        onLeaveBack: () => {
          // Switch back to pontoDeOnibus when leaving seventh card
          setCurrentImage(4);
        },
      });
    }

    // Drawer - open when 3rd card exits, close when the "conforme mostra este mapa" card exits
    if (thirdCardElement && fourthCardElement) {
      ScrollTrigger.create({
        trigger: thirdCardElement,
        start: "bottom top",
        endTrigger: fourthCardElement,
        end: "bottom top",
        onEnter: () => {
          setShowDrawerOne(true);
        },
        onLeave: () => {
          setShowDrawerOne(false);
        },
        onEnterBack: () => {
          setShowDrawerOne(true);
        },
        onLeaveBack: () => {
          setShowDrawerOne(false);
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        trigger.kill();
      });
    };
  }, []);

  // Separate useGSAP for condominioTwo scroll animation
  useGSAP(() => {
    if (showCondominioTwoScroll && condominioTwoSliderRef.current) {
      const fourthCardElement = containerRef.current?.querySelector(
        `[data-card-index="3"]`,
      );

      if (fourthCardElement) {
        // Animate background-position horizontally until the end of the image
        // Animation starts after the card passes (when card bottom reaches top of viewport)
        gsap.to(condominioTwoSliderRef.current, {
          scrollTrigger: {
            trigger: fourthCardElement,
            start: "bottom top",
            end: "+=100vh", // Continue animation for 100vh after card passes
            scrub: 1,
            invalidateOnRefresh: true,
          },
          backgroundPosition: "100% center",
          ease: "none",
        });
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        trigger.kill();
      });
    };
  }, [showCondominioTwoScroll]);

  // Trigger the scroll animation when condominioTwo is shown
  useGSAP(() => {
    if (currentImage === 3) {
      setShowCondominioTwoScroll(true);
    } else {
      setShowCondominioTwoScroll(false);
    }
  }, [currentImage]);

  // Separate useGSAP for pontoDeOnibus scroll animation
  useGSAP(() => {
    if (showPontoDeOnibusScroll && pontoDeOnibusSliderRef.current) {
      const lastCardElement = containerRef.current?.querySelector(
        `[data-card-index="5"]`,
      );

      if (lastCardElement) {
        if (isMobile) {
          // Mobile: pan horizontal simples (comportamento original)
          gsap.to(pontoDeOnibusSliderRef.current, {
            scrollTrigger: {
              trigger: lastCardElement,
              start: "bottom top",
              end: "+=100vh",
              scrub: 1,
              invalidateOnRefresh: true,
            },
            backgroundPosition: "100% center",
            ease: "none",
          });
        } else {
          // Desktop: animação em duas fases
          // Garante o estado inicial correto ao (re)entrar na seção
          gsap.set(pontoDeOnibusSliderRef.current, {
            backgroundSize: "200%",
            backgroundPosition: "0% center",
          });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: lastCardElement,
              start: "bottom top",
              end: "+=100vh",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });

          tl
            // Fase 1 (0%–50% do scroll): zoom de 200% → 160%, mantendo foco na cena 1
            .to(pontoDeOnibusSliderRef.current, {
              backgroundSize: "160%",
              ease: "none",
              duration: 0.5,
            })
            // Fase 2 (50%–100% do scroll): pan para a cena 2 com zoom fixo em 160%
            .to(pontoDeOnibusSliderRef.current, {
              backgroundPosition: "100% center",
              ease: "none",
              duration: 0.5,
            });
        }
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        trigger.kill();
      });
    };
  }, [showPontoDeOnibusScroll, isMobile]);

  // Trigger the scroll animation when pontoDeOnibus is shown
  useGSAP(() => {
    if (currentImage === 4) {
      setShowPontoDeOnibusScroll(true);
    } else {
      setShowPontoDeOnibusScroll(false);
    }
  }, [currentImage]);

  // Define the text cards content and positions
  const cards = [
    {
      top: 0,
      text: (
        <>
          Lá, <strong>Maria trabalha como caixa de supermercado</strong>. Todo
          dia, pontualmente às 8h da manhã, ela atende a Alice, que vai comprar
          pão e frutas para seu café da manhã.{" "}
          <strong>
            Alice mora no mesmo prédio onde fica a loja em que Maria trabalha
          </strong>
          .
        </>
      ),
    },
    {
      top: 150,
      text: (
        <>
          Recentemente, <strong>Alice sofreu um AVC</strong> (acidente vascular
          cerebral ou derrame), mas felizmente{" "}
          <strong>recebeu atendimento rápido</strong> em um hospital de
          excelência, localizado a poucos minutos de sua casa. Graças a isso,
          ela <strong>se recuperou sem maiores complicações</strong>.
        </>
      ),
    },
    {
      top: 300,
      text: (
        <>
          Se Alice morasse no Jardim Helena, a história poderia ser diferente.{" "}
          <strong>
            Este estudo mostra que, em bairros periféricos como o de Maria, a
            chance de um AVC ser fatal é significativamente maior devido à
            dificuldade de acesso a cuidados médicos de qualidade.{" "}
          </strong>
        </>
      ),
    },
    {
      top: 450,
      text: (
        <>
          Para a{" "}
          <strong>
            mortalidade prematura por doenças cerebrovasculares em mulheres
          </strong>
          , o estudo aponta um{" "}
          <strong>
            risco relativo significativamente elevado nos distritos do extremo
            leste e sul
          </strong>{" "}
          da cidade, assim como em Brasilândia e Cachoeirinha, conforme mostra
          este mapa.
        </>
      ),
    },
    {
      top: 600,
      text: (
        <>
          Enquanto Maria passa o dia trabalhando no mercado,{" "}
          <strong>
            Alice consegue ainda, antes de ir trabalhar, fazer uma caminhada em
            um parque
          </strong>{" "}
          próximo de sua casa.
          <br />
          <br />
          Uma pesquisa realizada nas cidades australianas de Sydney, Wollongong
          e Newcastle demonstrou que{" "}
          <strong>
            indivíduos com maior exposição a áreas verdes apresentaram menores
            prevalências de diabetes e hipertensão arterial
          </strong>
          .
          <br />
          <br />
          No Jardim Helena,{" "}
          <strong>
            Maria não tem esse privilégio, pois o bairro carece de espaços
            verdes
          </strong>{" "}
          adequados, o que também impacta sua saúde.
        </>
      ),
    },
    {
      top: 750,
      text: (
        <>
          O dia de trabalho de Maria termina e ela volta para sua casa com{" "}
          <strong>mais uma jornada de duas horas no transporte público</strong>.
        </>
      ),
    },
    {
      top: 900,
      text: (
        <>
          Depois de um dia intenso, Maria algumas vezes ainda precisa{" "}
          <strong>buscar os medicamentos para a diabetes</strong> na Farmácia
          Popular. Mas muitas vezes, devido ao trânsito e à longa distância,
          quando ela consegue chegar,{" "}
          <strong>
            a farmácia mais próxima de sua casa já se encontra fechada
          </strong>
          .
        </>
      ),
    },
    {
      top: 1050,
      text: (
        <>
          <strong>Aos sábados o dia é de descanso. Mas não para Maria</strong>.
          Ela tem que ir na Unidade Básica de Saúde (UBS) mais próxima para
          realizar <strong>exames com um endocrinologista</strong>. Depois de
          uma <strong>longa fila de espera</strong> ela consegue ser atendida e
          volta para sua casa.
        </>
      ),
    },
  ];

  return (
    <div ref={containerRef} className="h-[1280vh]">
      <div
        style={{ position: "sticky", top: 0 }}
        className="h-screen w-full overflow-hidden"
      >
        <div className="min-h-screen w-full bg-white flex items-center justify-center relative overflow-hidden">
          {/* First image - supermercado */}
          <Image
            src={supermercado}
            alt="Supermercado illustration"
            className={`max-w-auto xl:max-w-[600px] object-contain absolute z-10 transition-opacity duration-1000 ease-in-out ${
              currentImage === 0 ? "opacity-100" : "opacity-0"
            }`}
            width={600}
            height={400}
            priority
          />

          {/* Second image - supermercadoTwo */}
          <Image
            src={supermercadoTwo}
            alt="Supermercado Two illustration"
            className={`max-w-auto xl:max-w-[600px] object-contain absolute z-10 transition-opacity duration-1000 ease-in-out ${
              currentImage === 1 ? "opacity-100" : "opacity-0"
            }`}
            width={600}
            height={400}
            priority
          />

          {/* Third image - condominioOne */}
          <div
            className="absolute inset-0 bg-cover bg-center overflow-hidden transition-opacity duration-1000 ease-in-out"
            style={{
              backgroundImage: `url(${isMobile ? condominioOneMobile.src : condominioOne.src})`,
              backgroundPosition: "0% center",
              opacity: currentImage === 2 ? 1 : 0,
            }}
          />

          {/* Fourth image - condominioTwo with horizontal scroll animation */}
          <div
            ref={condominioTwoSliderRef}
            className="absolute inset-0 bg-cover bg-center overflow-hidden transition-opacity"
            style={{
              backgroundImage: `url(${isMobile ? condominioTwoMobile.src : condominioTwo.src})`,
              backgroundPosition: "0% center",
              opacity: currentImage === 3 ? 1 : 0,
            }}
          />

          {/* Fifth image - pontoDeOnibus with horizontal scroll animation */}
          {/* Desktop: backgroundSize "200% auto" garante que apenas uma cena */}
          {/* (metade da imagem) aparece por vez. O pan 0%→100% transita da   */}
          {/* cena 1 (ponto de ônibus, esquerda) para a cena 2 (farmácia,    */}
          {/* direita) sem exibir as duas cenas simultaneamente.              */}
          <div
            ref={pontoDeOnibusSliderRef}
            className="absolute inset-0 bg-center overflow-hidden transition-opacity"
            style={{
              backgroundImage: `url(${pontoDeOnibus.src})`,
              backgroundSize: isMobile ? "cover" : "200%",
              backgroundPosition: "0% center",
              opacity: currentImage === 4 ? 1 : 0,
            }}
          />

          {/* Sixth image - hospitalReception */}
          <Image
            src={hospitalReception}
            alt="Hospital Reception illustration"
            className={`max-w-auto xl:max-w-[600px] object-contain absolute z-10 transition-opacity duration-1000 ease-in-out ${
              currentImage === 5 ? "opacity-100" : "opacity-0"
            }`}
            width={600}
            height={400}
            priority
          />
        </div>
      </div>

      <div className="relative flex flex-col items-center">
        {cards.map((card, index) => (
          <div
            key={`card-${index}-${card.top}`}
            data-card-index={index}
            className={`absolute bg-[#FFFFFF]/90 h-auto w-[80vw] md:w-[460px] border border-[#000000]/20 px-[30px]
    py-[25px]
    lg:px-[32px]
    lg:py-[25px]
    shadow-lg
    ${index === 3 || index === 4 ? "z-60" : ""}
    `}
            style={{
              top: `${card.top}vh`,
            }}
          >
            <div className="text-[#000000]">{card.text}</div>
          </div>
        ))}
      </div>

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-screen bg-white border-l border-[#000000]/20 shadow-2xl transition-transform duration-700 ease-in-out z-50 w-full md:w-[630px] ${
          showDrawerOne ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col p-6 md:p-8 lg:p-10">
          <h3 className="text-lg mb-3 text-[#000000] font-medium flex-shrink-0">
            Mortalidade por doenças cerebrovasculares entre as mulheres, de 2010
            a 2019: probabilidades de excedência de que o risco em 2019 fosse
            superior a 1
          </h3>
          <div className="flex-1 min-h-0 overflow-hidden pb-2">
            <MapboxMap
              key={`drawer-one-${isMobile}`}
              initialViewState={{
                longitude: -46.657198,
                latitude: -23.680764,
                zoom: isMobile ? 8.4 : 9.3,
              }}
              mapStyle="mapbox://styles/observatorio-nacional/cmsirtq6800zj01s6ddyhd52v"
              mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
              style={{ width: "100%", height: "100%" }}
              dragPan={false}
              dragRotate={false}
              scrollZoom={false}
              keyboard={false}
              doubleClickZoom={false}
            />
          </div>
        </div>
        <div className="absolute bottom-6 md:bottom-20 left-5 md:left-auto md:right-5 z-20 rounded-lg bg-white/90 shadow-lg backdrop-blur-sm w-[220px] text-sm">
          <button
            type="button"
            onClick={() => setLegendCollapsed((c) => !c)}
            className="flex w-full items-start justify-between gap-2 p-4 cursor-pointer"
          >
            <div className="text-left">
              <h3 className="font-semibold text-base leading-tight">
                Probabilidade de excedência (2019)
              </h3>
              <p
                className={`text-sm italic text-gray-500 leading-tight mt-0.5 ${isMobile && legendCollapsed ? "hidden" : ""}`}
              >
                Probabilidade de o risco em 2019 ser superior a 1.
              </p>
            </div>
            <ChevronDown
              className={`mt-0.5 w-4 h-4 shrink-0 text-gray-500 transition-transform duration-300 ${legendCollapsed ? "-rotate-90" : ""}`}
            />
          </button>
          <div
            className={`grid transition-all duration-300 ease-in-out ${legendCollapsed ? "grid-rows-[0fr]" : "grid-rows-[1fr]"}`}
          >
            <div className="overflow-hidden">
              <ul className="space-y-1 px-4 pb-3">
                {CEREBROVASCULAR_PEP_LEGEND.map((item) => (
                  <li key={item.label} className="flex items-center gap-2">
                    <span
                      className="w-5 h-5 rounded-sm shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm leading-tight">{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
