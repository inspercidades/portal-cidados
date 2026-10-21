import { accidentVideo, brandColor, g1ArticleUrl } from "../constants";
import ZoomableVideo from "./zoomable-video";

export default function Context() {
  return (
    <section className="w-full bg-white!">
      <div className="mx-auto max-w-xl px-6 md:px-8 pt-6 pb-40 font-inter">
        <div
          className="flex items-center gap-3 mb-20 text-sm"
          style={{ color: brandColor }}
        >
          <span
            className="w-0.5 h-6 shrink-0 bg-[#23254E]"
            aria-hidden="true"
          />
          <p>
            Data de publicação desta história <strong>Junho 2026</strong>
          </p>
        </div>

        <div className="space-y-8 text-[#23254E]">
          <div className="space-y-4">
            <p className="font-bold text-sm">27 de Março de 2024</p>

            <blockquote className="italic text-sm leading-normal">
              &ldquo;Corredor da Avenida 23 Maio - sentido aeroporto. Um
              motociclista colidiu com a traseira de um caminhão, na Av. Moreira
              Guimarães, na altura da Av. Jamaris, por volta das 2h da manhã,
              quando as pistas estão livres. A vítima foi socorrida com vida,
              mas morreu no hospital. A CET aguarda a conclusão do laudo
              pericial.&rdquo;
            </blockquote>

            <p className="text-sm">
              <strong>Fonte:</strong> G1 - 02/05/2024 -{" "}
              <a
                href={g1ArticleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Clique aqui
              </a>{" "}
              para ver a reportagem
            </p>
          </div>

          <ZoomableVideo
            src={accidentVideo}
            className="w-full rounded-xl aspect-square object-cover"
          />

          <div className="space-y-6 text-sm leading-normal">
            <p>
              Em São Paulo, esse tipo de episódio tem se tornado cada vez mais
              frequente:{" "}
              <strong>
                apenas entre 2023 e 2024, o número de mortes de motociclistas no
                trânsito aumentou cerca de 20%
              </strong>
              , passando de 403 para 483 óbitos — o equivalente a
              aproximadamente 1,3 morte por dia. Isso significa que, todos os
              dias, ao menos uma família perde alguém para a violência no
              trânsito.
            </p>

            <p>
              A cena descrita foi retirada de uma reportagem encontrada no
              noticiário do G1, mas poderia ter saído de muitos outros
              telejornais brasileiros. Ela sintetiza uma crise que se repete
              diariamente nas grandes cidades: a vulnerabilidade crescente dos
              motociclistas no trânsito.
            </p>

            <p>
              <strong>
                É a partir desse cenário que surge a Faixa Azul, uma sinalização
                viária criada para organizar a circulação de motocicletas entre
                as faixas de veículos em grandes avenidas.
              </strong>{" "}
              A proposta é tornar o deslocamento das motos mais previsível,
              reduzir conflitos com carros, ônibus e caminhões e, com isso,
              diminuir o número e a gravidade dos sinistros.
            </p>

            <p>
              O estudo{" "}
              <strong>
                Avaliação do impacto da Faixa Azul nos sinistros de trânsito em
                São Paulo
              </strong>
              , desenvolvido no âmbito do Observatório Nacional de Mobilidade
              Sustentável do Centro de Estudos das Cidades — Laboratório
              Arq.Futuro do Insper, analisa justamente se essa política pública
              de segurança viária produziu os efeitos esperados.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
