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
              <p className="text-whiteleading-relaxed">
                Diagnóstico sobre ilhas de calor e qualidade do ar nas 16 favelas da Maré
              </p>
              <p className="text-[#FFFFFF] opacity-40">
                Redes da Maré
              </p>
              <div className="mt-10 space-y-1 text-[#FFFFFF]">
                <p className="text-white opacity-40">Relatório</p>
                <p className="text-white opacity-40">Instituto de Ensino e Pesquisa</p>
                <p className="text-white opacity-40">2024</p>
                <p>
                  <span className="text-white opacity-40">Parceria com o{" "}</span>
                  <a
                    href="https://climaesociedade.org/sobre/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white! opacity-100! hover:underline"
                  >
                    Instituto Clima e Sociedade
                  </a>
                </p>
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
              <img
                src={insperLogo.src}
                alt="Insper Logo"
                className="h-10 lg:h-12 brightness-0 invert"
              />
            </a>
            <a
              href="/"
              className="inline-block"
            >
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
                <span className="font-semibold">Coordenação geral:</span>
                <span className="text-[#FFFFFF] opacity-40 ml-2">
                  Carolina Dias, Luna Arouca, Rian de Queiroz e Shyrlei Rosendo
                </span>
              </div>
              <div>
                <span className="font-semibold">Pesquisador e coordenador de campo:</span>
                <span className="text-[#FFFFFF] opacity-40 ml-2">Rian de Queiroz</span>
              </div>
              <div>
                <span className="font-semibold">Pesquisadores consultores:</span>
                <span className="text-[#FFFFFF] opacity-40 ml-2">
                  Otavio Ranzani, Carolina Hartmann Galeazzi e Fernando Bozza
                </span>
              </div>
              <div>
                <span className="font-semibold">Sistematização do conteúdo e produção dos mapas:</span>
                <span className="text-[#FFFFFF] opacity-40 ml-2">Rian de Queiroz</span>
              </div>
              <div>
                <span className="font-semibold">Analista de dados:</span>
                <span className="text-[#FFFFFF] opacity-40 ml-2">Soraida Aguilar</span>
              </div>
              <div>
                <span className="font-semibold">Agentes ambientais:</span>
                <span className="text-[#FFFFFF] opacity-40 ml-2">
                  Bianca de Lima Teixeira, Luis Carlos Soares da Costa, Marcela
                  Santos de Melo, Maria Eduarda Souza Neves
                </span>
              </div>
              <div>
                <span className="font-semibold">Assistente de campo:</span>
                <span className="text-[#FFFFFF] opacity-40 ml-2">Diana de Souza Beserra</span>
              </div>
              <div>
                <span className="font-semibold">Identidade visual:</span>
                <span className="text-[#FFFFFF] opacity-40 ml-2">Robert dos Santos da Silva</span>
              </div>
              <div>
                <span className="font-semibold">Design:</span>
                <span className="text-[#FFFFFF] opacity-40 ml-2">Pictomonster</span>
              </div>
              <div>
                <span className="font-semibold">Roteirista:</span>
                <span className="text-[#FFFFFF] opacity-40 ml-2">Caio Jacintho</span>
              </div>
              <div>
                <span className="font-semibold">Designer:</span>
                <span className="text-[#FFFFFF] opacity-40 ml-2">Pedro Meneghel</span>
              </div>
              <div>
                <span className="font-semibold">Desenvolvimento:</span>
                <span className="text-[#FFFFFF] opacity-40 ml-2">Lucas Tavares</span>
              </div>
            </div>
          </section>

          {/* Insper Info */}
          <section className="lg:text-right">
            <div className="space-y-2 text-md lg:text-lg">
              <h3 className="text-2xl font-bold mb-6 underline decoration-2 underline-offset-4">
                Insper
              </h3>
              <p className="text-white">
                Portal de Dados Urbanos
              </p>
              <p className="text-white">
                Centro de Ciência de Dados
              </p>
              <p className="text-white">
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
          <div className="flex flex-col gap-4">
          <p className="text-md lg:text-lg text-white leading-relaxed">
           A metodologia do projeto Respira Maré foi pensada para captar de forma precisa e territorializada os dados sobre qualidade do ar e ilhas de calor nas 16 favelas do Conjunto da Maré. Para isso, foi adotada uma abordagem que alia rigor técnico à participação comunitária, utilizando a produção local de dados como ferramenta de incidência em políticas públicas. O estudo se baseou na criação de uma rede complementar à rede oficial de monitoramento atmosférico, com o objetivo de evidenciar dinâmicas específicas do território que muitas vezes passam despercebidas pelos sistemas convencionais.
          </p>
          <p className="text-md lg:text-lg text-white leading-relaxed">
            A coleta de dados foi realizada entre março e setembro, com o uso de equipamentos portáteis validados internacionalmente (Temtop M2000 e Elitech) capazes de medir temperatura, umidade, material particulado (PM10 e PM2,5), CO₂ e formaldeído (HCHO). As medições foram feitas por agentes ambientais — jovens moradores capacitados para a tarefa — o que fortaleceu o vínculo com a comunidade e garantiu maior precisão nas coletas. O dióxido de nitrogênio (NO₂) foi medido com amostradores passivos, por 14 dias, em oito pontos representativos do território e um ponto de controle na UFRJ.
          </p>
          <p className="text-md lg:text-lg text-white leading-relaxed">

Para respeitar a diversidade urbana da Maré, o território foi dividido em cinco grandes áreas. No caso das ilhas de calor, foram monitorados 25 pontos (cinco por área), três dias por mês, em três horários (9h, 15h e 21h). Já para a qualidade do ar, foram definidos cinco pontos fixos (um por área), com medições semanais realizadas em dois turnos por dia. As coletas aconteceram de forma simultânea entre os agentes, permitindo comparação entre os dados. A metodologia se mostrou robusta e adaptável diante dos desafios locais, como chuvas, mudanças repentinas nos espaços e operações policiais, que chegaram a impedir a coleta em alguns dias.          </p>
       </div>
        </section>
      </div>
    </footer>
  );
}
