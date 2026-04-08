"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState, useEffect } from "react";
import supermercado from "../assets/supermercado.png";
import supermercadoTwo from "../assets/supermercadoTwo.png";
import condominioOne from "../assets/condominio1.png";
import condominioOneMobile from "../assets/condominio1Mobile.png";
import condominioTwo from "../assets/condominio2.png";
import condominioTwoMobile from "../assets/condominio2Mobile.png";
import taxaPadronizadaOne from "../assets/taxaPadronizadaOne.png";
import taxaPadronizadaTwo from "../assets/taxaPadronizadaTwo.png";
import pontoDeOnibus from "../assets/pontoDeOnibus.png";

import hospitalReception from "../assets/hospitalReception.png";
import Image from "next/image";

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
  const [showDrawerTwo, setShowDrawerTwo] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
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
    }

    if (thirdCardElement) {
      ScrollTrigger.create({
        trigger: thirdCardElement,
        start: "bottom center",
        onEnter: () => {
          // Switch to condominioOne when entering third card
          setCurrentImage(2);
        },
        onLeaveBack: () => {
          // Switch back to second image when leaving third card
          setCurrentImage(1);
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

    // Drawer One - show when 3rd card exits screen, hide when 4th card touches top
    if (thirdCardElement && fourthCardElement) {
      ScrollTrigger.create({
        trigger: thirdCardElement,
        start: "bottom top",
        endTrigger: fourthCardElement,
        end: "top top",
        onEnter: () => {
          setShowDrawerOne(true);
          setShowDrawerTwo(false);
        },
        onLeave: () => {
          setShowDrawerOne(false);
          setShowDrawerTwo(true);
        },
        onEnterBack: () => {
          setShowDrawerOne(true);
          setShowDrawerTwo(false);
        },
        onLeaveBack: () => {
          setShowDrawerOne(false);
        },
      });
    }

    // Drawer Two - show when 4th card touches top, hide when 5th card touches top
    if (fourthCardElement && fifthCardElement) {
      ScrollTrigger.create({
        trigger: fourthCardElement,
        start: "top top",
        endTrigger: fifthCardElement,
        end: "top top",
        onEnter: () => {
          setShowDrawerTwo(true);
          setShowDrawerOne(false);
        },
        onLeave: () => {
          setShowDrawerTwo(false);
        },
        onEnterBack: () => {
          setShowDrawerTwo(true);
          setShowDrawerOne(false);
        },
        onLeaveBack: () => {
          setShowDrawerTwo(false);
          setShowDrawerOne(true);
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
        // Animate background-position horizontally until the end of the image
        // Animation starts after the last card passes (when card bottom reaches top of viewport)
        gsap.to(pontoDeOnibusSliderRef.current, {
          scrollTrigger: {
            trigger: lastCardElement,
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
  }, [showPontoDeOnibusScroll]);

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
          Lá, Maria trabalha como caixa de supermercado. Todo dia, pontualmente
          às 8h da manhã, ela recebe dona Alice, cliente de carteirinha da loja.
        </>
      ),
    },
    {
      top: 150,
      text: (
        <>
          Recentemente dona Alice sofreu um AVC (acidente vascular cerebral ou
          derrame), mas felizmente, recebeu atendimento rápido em um hospital de
          excelência, localizado a poucos minutos de sua casa. Graças a isso,
          ela se recuperou sem maiores complicações.
        </>
      ),
    },
    {
      top: 300,
      text: (
        <>
          Se dona Alice morasse no Jardim Helena, a história poderia ser
          diferente.{" "}
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
          Os resultados do estudo sobre mortalidade prematura por doenças
          cerebrovasculares em mulheres ao longo de todo o período analisado
          apontam um risco relativo significativamente elevado nos distritos do
          extremo leste e sul da cidade, assim como em Brasilândia e
          Cachoeirinha.
        </>
      ),
    },
    {
      top: 600,
      text: (
        <>
          Enquanto Maria passa o dia trabalhando no mercado, dona Alice
          aproveita sua manhã para caminhar em um parque próximo de sua casa.
          Uma pesquisa realizada nas cidades australianas de Sydney, Wollongong
          e Newcastle demonstrou que{" "}
          <strong>
            indivíduos com maior exposição a áreas verdes apresentaram menores
            prevalências de diabetes e hipertensão arterial.
          </strong>
        </>
      ),
    },
    {
      top: 750,
      text: (
        <>
          No Jardim Helena, Maria não tem esse privilégio — o bairro carece de
          espaços verdes adequados, o que também impacta sua saúde. O dia de
          trabalho de Maria termina e ela volta para sua casa, mais uma jornada
          de duas horas no transporte público.
        </>
      ),
    },
    {
      top: 900,
      text: (
        <>
          Depois de um dia intenso ela precisa buscar seus medicamentos na
          Farmácia Popular, um recurso essencial, mas que muitas vezes, devido à
          falta de tempo, ela não consegue. Ao chegar na Farmácia mais próxima a
          sua casa ela já se encontra fechada.
        </>
      ),
    },
    {
      top: 1050,
      text: (
        <>
          Aos sábados o dia é de descanso. Mas não para Maria. Ela tem que ir na
          Unidade Básica de Saúde (UBS) mais próxima para realizar exames com um
          endocrinologista. Depois de uma longa fila de espera ela consegue ser
          atendida e volta para sua casa.
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
          <div
            ref={pontoDeOnibusSliderRef}
            className="absolute inset-0 bg-cover bg-center overflow-hidden transition-opacity"
            style={{
              backgroundImage: `url(${pontoDeOnibus.src})`,
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
    rounded-xl shadow-lg
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

      {/* Drawer One */}
      <div
        className={`fixed right-0 top-0 h-screen bg-white border-l border-[#000000]/20 shadow-2xl transition-transform duration-700 ease-in-out z-50 w-[90vw] md:w-[400px] lg:w-[480px] ${
          showDrawerOne ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col p-6 md:p-8 lg:p-10">
          <h3 className="text-lg mb-3 text-[#000000] font-medium flex-shrink-0">
            Mortalidade por doenças cerebrovasculares entre as mulheres, de 2010
            a 2019: probabilidades de excedência de que o risco em 2019 fosse
            superior a 1
          </h3>
          <div className="flex-1 min-h-0 flex items-center justify-center pb-2">
            <div className="w-full h-full flex items-center justify-center">
              <Image
                src={taxaPadronizadaOne}
                alt="Taxa padronizada 1"
                className="w-full h-full object-contain"
                style={{ maxHeight: "100%" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Drawer Two */}
      <div
        className={`fixed right-0 top-0 h-screen bg-white border-l border-[#000000]/20 shadow-2xl transition-transform duration-700 ease-in-out z-50 w-[72vw] md:w-[400px] lg:w-[480px] ${
          showDrawerTwo ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col p-6 md:p-8 lg:p-10">
          <h3 className="text-lg mb-3 text-[#000000] font-medium flex-shrink-0">
            Mortalidade por doenças cerebrovasculares entre as mulheres, de 2010
            a 2019: probabilidades de excedência de que o risco em 2019 fosse
            superior a 1
          </h3>
          <div className="flex-1 min-h-0 flex items-center justify-center pb-2">
            <div className="w-full h-full flex items-center justify-center">
              <Image
                src={taxaPadronizadaTwo}
                alt="Taxa padronizada 2"
                className="w-full h-full object-contain"
                style={{ maxHeight: "100%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
