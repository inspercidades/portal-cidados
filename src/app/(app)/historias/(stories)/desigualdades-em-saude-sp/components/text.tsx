"use client";

import textBackground from "../assets/text-background.png";

export default function Text() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 md:px-8 py-30"
      style={{
        backgroundImage: `url(${textBackground.src})`,
      }}
    >
      <div className="max-w-xl rounded-2xl">
        <h1 className="text-2xl font-semibold text-black mb-6 text-left">
          Diabetes Mellitus (DM)
        </h1>

        <div className="space-y-6 text-black leading-relaxed">
          <p>
            É uma doença causada pela produção insuficiente ou má absorção de
            insulina, hormônio que regula a glicose no sangue e garante energia
            para o organismo. O diabetes pode causar o aumento da glicemia e as
            altas taxas podem levar a complicações no coração, nas artérias, nos
            olhos, nos rins e nos nervos.{" "}
            <span className="font-semibold">
              Em casos mais graves, o diabetes pode levar à morte.
            </span>
          </p>

          <p className="text-sm italic pb-4 text-black">
            Ministério da Saúde – Gov.BR
          </p>
          <div className="w-full max-w-[80%] mx-auto">
            <hr className="border-black pb-4 items-center" />
          </div>

          <p>
            A diabetes mellitus é uma condição que afeta{" "}
            <span className="font-semibold">
              537 milhões de pessoas em todo o mundo
            </span>
            , representando cerca de{" "}
            <span className="font-semibold">6,8% da população global</span>. No
            Brasil, o impacto é igualmente significativo, com aproximadamente{" "}
            <span className="font-semibold">
              16,8 milhões de pessoas – 7,9% da população
            </span>{" "}
            – convivendo com a doença, segundo a Federação Internacional de
            Diabetes.
          </p>

          <p>
            <span className="font-semibold">
              Apesar dos avanços no tratamento
            </span>{" "}
            e no acesso a medicamentos, a gestão da diabetes ainda enfrenta{" "}
            <span className="font-semibold">desafios consideráveis</span>,
            profundamente influenciados pelas desigualdades sociais.
          </p>

          <p>
            <span className="font-semibold">
              A qualidade da saúde da população é um reflexo direto das
              desigualdades sociais.{" "}
            </span>
            Essa realidade é influenciada por determinantes sociais variados,
            como condições de habitação (e sua localização geográfica),
            educação, renda, pobreza, riqueza, mobilidade e saneamento básico.
          </p>

          <p>
            Apesar do panorama desafiador, o setor de saúde brasileiro tem
            alcançado avanços significativos através do Sistema Único de Saúde
            (SUS), que tem desempenhado um papel decisivo na melhoria de
            indicadores, como a redução expressiva da mortalidade infantil e o
            aumento da expectativa de vida nas últimas décadas. Esses resultados
            evidenciam a importância do SUS como o principal meio de acesso
            cuidados integrais de saúde para grande parte da população.
          </p>

          <p>
            No entanto, os desafios de saúde atingem a população de forma
            desigual. Pesquisa Portanto, a intervenção direcionada às populações
            em áreas de maior risco tem o potencial de reduzir o risco de morte
            na maioria das faixas etárias.
          </p>

          <p>
            Mas o que são áreas de risco mais elevado? Como podemos
            identificá-las? O estudo que mostramos a seguir responde a essas
            questões com uma análise detalhada de dados espaço-temporais dos
            últimos 10 anos (2013-2023) abrangendo os 96 Distritos
            Administrativos do Município de São Paulo (MSP).
          </p>

          <p>
            Para contribuir com a melhoria da saúde no município de São Paulo,{" "}
            <span className="font-semibold">
              este estudo busca identificar áreas de maior risco epidemiológico
              para as principais causas de mortalidade materna, doenças cardio e
              cerebrovasculares e Diabetes Mellitus
            </span>
            , além de investigar as regiões prioritárias para intervenções.{" "}
            <span className="font-semibold">
              Essas análises visam subsidiar políticas direcionadas para a saúde
              pública no Brasil, devida à sua alta prevalência, mortalidade e
              impactos na qualidade de vida e saúde.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
