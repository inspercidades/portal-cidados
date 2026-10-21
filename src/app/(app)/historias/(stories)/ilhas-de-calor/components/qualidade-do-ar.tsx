import backgroundTexture from "../assets/background.png";
import mareMapaImage from "../assets/mare-mapa.png";
import { SectionCover } from "./section-cover";

export function QualidadeDoAr() {
  return (
    <div className="w-full bg-white">
      {/* Capa da seção com imagem em escala de cinza e título */}
      <SectionCover
        title={
          <>
            Qualidade do <strong>ar</strong>
          </>
        }
        image={mareMapaImage}
        imageAlt="Mapa da Maré"
        sticky={false}
        grayscaleOpacity={1}
      />

      {/* Conteúdo da seção (abaixo da capa) com background.png */}
      <section
        className="w-full"
        style={{
          backgroundImage: `url(${backgroundTexture.src})`,
          backgroundRepeat: "repeat",
          backgroundPosition: "top left",
          backgroundSize: `${Math.round(backgroundTexture.width / 2)}px ${Math.round(backgroundTexture.height / 2)}px`,
        }}
      >
        <div className="mx-auto max-w-xl px-6 md:px-8 py-20 md:py-40 font-inter">
          <h2
            className="text-2xl md:text-3xl lg:text-4xl mb-6"
            style={{ color: "#E50505" }}
          >
            Qualidade do <strong>ar</strong>
          </h2>
          <div className="space-y-6 text-base md:text-lg leading-relaxed text-[#3A3434]">
            <p>
              A qualidade do ar diz respeito à presença — ou excesso — de
              poluentes na atmosfera e ao impacto que essa composição tem sobre
              a saúde humana. Na Maré, o projeto Respira Maré mediu a
              concentração de substâncias como material particulado (PM₁₀ e
              PM₂,₅), dióxido de carbono (CO₂), dióxido de nitrogênio (NO₂),
              formaldeído (HCHO) e outros compostos que, mesmo invisíveis,
              afetam diretamente o bem-estar da população.{" "}
              <strong>
                Esses poluentes estão ligados a problemas respiratórios,
                cardiovasculares, neurológicos e até ao desenvolvimento
                cognitivo de crianças.
              </strong>{" "}
              Mesmo quando abaixo dos limites considerados perigosos por
              agências internacionais, a exposição prolongada e contínua pode
              agravar doenças e gerar custos adicionais com cuidados de saúde.
            </p>
            <p>
              Os dados mostram que{" "}
              <strong>
                a qualidade do ar na Maré é comprometida por fatores tanto
                externos quanto internos ao território
              </strong>
              . De um lado, a presença das Linhas Vermelha e Amarela, com seu
              fluxo intenso de veículos, contribui para a concentração de gases
              tóxicos. De outro, práticas como a queima de lixo, a falta de
              coleta regular e o uso intensivo de automóveis em vias estreitas
              pioram ainda mais o cenário. A área do Parque Ecológico, por
              exemplo, que deveria ser uma zona de respiro, aparece entre as
              mais poluídas da Maré, evidenciando o abandono e o conflito de
              usos no entorno.
            </p>
            <p>
              O estudo também revela como a poluição do ar se distribui de forma
              desigual dentro da Maré. Locais como Nova Holanda e Bento Ribeiro
              Dantas apresentam índices especialmente altos de material
              particulado e NO₂ — este último encontrado em concentrações
              alarmantes ao lado de escolas e centros de saúde. Assim como no
              caso das ilhas de calor, a má qualidade do ar se soma a outros
              fatores de vulnerabilidade urbana, revelando uma geografia do
              risco que não é natural, mas resultado direto de escolhas
              políticas e omissões históricas.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
