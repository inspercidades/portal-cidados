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
            Apesar dos avanços no tratamento e no acesso a medicamentos, a
            gestão da diabetes ainda enfrenta{" "}
            <span className="font-semibold">
              desafios consideráveis, profundamente influenciados pelas
              desigualdades sociais.
            </span>
          </p>

          <p>
            A qualidade da{" "}
            <span className="font-semibold">
              saúde da população é influenciada por determinantes sociais e
              econômicos
            </span>{" "}
            variados, como condições de habitação (e sua localização
            geográfica), educação, renda, pobreza, riqueza, mobilidade e
            saneamento básico. Assim, os desafios de saúde atingem a população
            de forma desigual e{" "}
            <span className="font-semibold">
              intervenções direcionadas a regiões de maior risco têm o potencial
              de reduzir o risco de morte
            </span>{" "}
            na maioria das faixas etárias.
          </p>

          <p>
            <span className="font-semibold">
              Mas o que são áreas de risco mais elevado?
            </span>{" "}
            Como podemos identificá-las? O estudo que mostramos a seguir
            responde a essas questões com uma análise detalhada de dados
            espaço-temporais dos últimos 10 anos (2013-2023) abrangendo os 96
            distritos do município de São Paulo.
          </p>

          <p>
            Para contribuir com a melhoria da saúde em São Paulo, este estudo
            busca{" "}
            <span className="font-semibold">
              identificar áreas de maior risco epidemiológico para as principais
              causas de mortalidade materna, doenças cardio e cerebrovasculares
              e Diabetes Mellitus
            </span>
            , além de investigar as regiões prioritárias para intervenções.
            Essas análises visam subsidiar políticas direcionadas para a saúde
            pública no Brasil, devido à sua alta prevalência, mortalidade e
            impactos na qualidade de vida e saúde.
          </p>
        </div>
      </div>
    </div>
  );
}
