"use client";

import textBackground from "../assets/text-background.png";

export default function DiseasesIntroduction() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 md:px-8 py-30"
      style={{
        backgroundImage: `url(${textBackground.src})`,
      }}
    >
      <div className="max-w-xl rounded-2xl">
        <div className="space-y-6 text-black leading-relaxed">
          <p>
            A história da personagem fictícia que apresentamos reflete a
            realidade de muitos brasileiros: acordar cedo, enfrentar ônibus
            lotados, perder horas no deslocamento até o trabalho, não praticar
            exercícios e ter pouco ou nenhum tempo para o lazer.
            <span className="font-semibold">
              Uma rotina exaustiva e repetitiva que impacta diretamente a saúde
              e a qualidade de vida das pessoas.
            </span>
          </p>

          <p>
            O cenário atual exige novas abordagens no campo da saúde. Não se
            trata apenas de melhorar a saúde das populações urbanas em si, mas
            de expandir sua definição para abranger um conjunto integrado de
            processos e iniciativas que promovam a funcionalidade e a
            sustentabilidade do complexo ecossistema urbano como um todo.
          </p>

          <p>
            Ao reconhecer o ser humano como parte integrante de um ecossistema
            complexo,
            <span className="font-semibold">
              {" "}
              torna-se evidente que o equilíbrio sustentável do ambiente urbano
              é essencial para promover a saúde de seus habitantes.
            </span>
            Nessa perspectiva, consolida-se a ideia de que{" "}
            <span className="font-semibold">
              a saúde humana está intrinsecamente ligada à qualidade do meio em
              que se vive
            </span>
            , considerando fatores como o acesso a áreas verdes, disponibilidade
            de infraestrutura básica e a localização estratégica em relação a
            serviços essenciais.
          </p>

          <p>
            A história da personagem apresentada até aqui exemplifica a relação
            entre o ambiente urbano e a saúde dos moradores da periferia de São
            Paulo, uma realidade que se repete em diversas metrópoles
            brasileiras.
          </p>

          <p>
            Como mencionado anteriormente, este estudo não se limitou à
            identificação das áreas de risco relacionadas ao Diabetes Mellitus.
            A seguir, serão apresentadas as informações mais relevantes sobre as
            demais doenças analisadas: mortalidade materna (incluindo
            mortalidade fetal), mortalidade prematura cardiovascular
            (subdividida em doenças cerebrovasculares e isquêmicas do coração) e
            mortalidade prematura por Diabetes Mellitus.
          </p>

          <p>
            No entanto, os desafios de saúde atingem a população de forma
            desigual. Pesquisa Portanto, a intervenção direcionada às populações
            em áreas de maior risco tem o potencial de reduzir o risco de morte
            na maioria das faixas etárias.
          </p>
        </div>
      </div>
    </div>
  );
}
