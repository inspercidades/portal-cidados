"use client";

import insperLogo from "../../../assets/insper-logo.png";
import Image from "next/image";

export default function Footer() {
  return (
    <footer
      className="bg-[#0E171D] text-white py-24 px-6 lg:px-12"
      style={{ fontFamily: '"Libre Baskerville", serif' }}
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Section with Insper Title and Publication */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Publication Section */}
          <section className="lg:order-1 order-2 lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6 underline decoration-2 underline-offset-4">
              Publicação
            </h2>
            <div className="space-y-2 text-md lg:text-lg">
              <p className="text-[#FFFFFF] opacity-40 leading-relaxed">
                "Síntese de evidências sobre saúde no município de São Paulo"
              </p>
              <p className="text-[#FFFFFF] opacity-40">
                Paulo H. Nascimento Saldiva, Lígia Vizeu Barrozo, Catia Martinez
                Minto, Sara Lopes de Moraes e Paulo Afonso de André
              </p>
              <div className="mt-10 space-y-1 text-[#FFFFFF] opacity-40">
                <p>Relatório</p>
                <p>Instituto de Ensino e Pesquisa</p>
                <p>Ciências Econômicas</p>
                <p>2024</p>
              </div>
            </div>
          </section>

          {/* Logos - Top Right */}
          <div className="lg:order-2 order-1 lg:text-right flex lg:justify-end justify-start lg:col-span-1 items-center gap-4 lg:gap-6">
            <a
              href="https://www.insper.edu.br/pt/pesquisa/centro-de-estudos-das-cidades"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Image
                src={insperLogo}
                alt="Insper Logo"
                className="h-10 lg:h-12 brightness-0 invert"
                width={120}
                height={48}
                priority
              />
            </a>
            <a href="/" className="inline-block">
              <div className="relative w-[110px] h-[50px] lg:w-[130px] lg:h-[58px]">
                <Image
                  src="/portal_cidados_icon.png"
                  alt="Portal Cidados"
                  fill
                  sizes="(max-width: 1024px) 100px, 120px"
                  className="object-contain object-left brightness-0 invert"
                  quality={100}
                />
              </div>
            </a>
          </div>
        </div>

        {/* Team and Insper Section - Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Team Section */}
          <section>
            <h2 className="text-2xl font-bold mb-6 underline decoration-2 underline-offset-4">
              Equipe
            </h2>
            <div className="space-y-3 text-md lg:text-lg">
              <div>
                <span className="font-semibold">Autores:</span>
                <span className="text-[#FFFFFF] opacity-40 ml-2">
                  Paulo H. Nascimento Saldiva, Lígia Vizeu Barrozo, Catia
                  Martinez Minto, Sara Lopes de Moraes e Paulo Afonso de André
                </span>
              </div>
              <div>
                <span className="font-semibold">Colaboradores:</span>
                <span className="text-[#FFFFFF] opacity-40 ml-2">
                  Tomas Alvim, Paulina A. Achurra Burgos, Ana Carolina Velasco,
                  Gabriela Vasconcelos e Marcia M. da Silva
                </span>
              </div>
              <div>
                <span className="font-semibold">Colaborador:</span>
                <span className="text-[#FFFFFF] opacity-40 ml-2">
                  Adriano Borges Costa
                </span>
              </div>
              <div>
                <span className="font-semibold">Coordenador Executivo:</span>
                <span className="text-[#FFFFFF] opacity-40 ml-2">
                  Maurício Bouskela
                </span>
              </div>
              <div>
                <span className="font-semibold">Roteirista:</span>
                <span className="text-[#FFFFFF] opacity-40 ml-2">
                  Caio Jacintho
                </span>
              </div>
              <div>
                <span className="font-semibold">Designer:</span>
                <span className="text-[#FFFFFF] opacity-40 ml-2">
                  Pedro Meneghel
                </span>
              </div>
              <div>
                <span className="font-semibold">Desenvolvimento:</span>
                <span className="text-[#FFFFFF] opacity-40 ml-2">
                  Lucas Tavares
                </span>
              </div>
              <div>
                <span className="font-semibold">Voz/Composição:</span>
                <span className="text-[#FFFFFF] opacity-40 ml-2">
                  Rafael Gomes da Silva
                </span>
              </div>
            </div>
          </section>

          {/* Insper Info */}
          <section className="lg:text-right">
            <div className="space-y-2 text-md lg:text-lg">
              <h3 className="text-2xl font-bold mb-6 underline decoration-2 underline-offset-4">
                Insper
              </h3>
              <p className="text-[#FFFFFF] opacity-40">
                Portal de Dados Urbanos
              </p>
              <p className="text-[#FFFFFF] opacity-40">
                Centro de Ciência de Dados
              </p>
              <p className="text-[#FFFFFF] opacity-40">
                Laboratório ARQ. Futuro de cidades
              </p>
            </div>
          </section>
        </div>

        {/* Methodology Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6 underline decoration-2 underline-offset-4">
            Metodologia
          </h2>
          <p className="text-md lg:text-lg text-[#FFFFFF] opacity-40 leading-relaxed">
            Para os resultados apresentados nesta pesquisa, foram utilizados
            métodos quantitativos baseados em modelagem espacial e temporal. A
            análise incluiu a padronização indireta de taxas de mortalidade para
            identificar padrões populacionais e o uso de abordagem empírica
            espacial bayesiana para estimar riscos relativos ajustados.
          </p>
        </section>
      </div>
    </footer>
  );
}
