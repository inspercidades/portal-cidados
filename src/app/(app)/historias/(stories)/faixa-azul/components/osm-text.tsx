export default function OsmText() {
  return (
    <section className="w-full py-20 bg-white!">
      <div className="mx-auto max-w-xl px-6 md:px-8 pt-6 pb-10 font-inter">
        <div className="space-y-6 text-sm leading-normal text-[#23254E]">
          <p>
            Por isso, o estudo buscou responder a uma pergunta mais difícil: o
            que teria acontecido nos mesmos corredores se a Faixa Azul não
            tivesse sido implantada?
          </p>

          <p>
            Para construir essa resposta, os pesquisadores combinaram duas bases
            de dados. A primeira foi o <strong>Infosiga-SP</strong>, sistema
            estadual que reúne registros de sinistros de trânsito, com
            informações sobre data, horário, localização, gravidade e veículos
            envolvidos. A segunda foi o <strong>OpenStreetMap</strong>, usado
            para identificar características das vias, como número de faixas,
            limite de velocidade, presença de radares, interseções e entorno
            urbano.
          </p>

          <p>
            <strong>
              O primeiro desafio foi fazer essas bases
              &ldquo;conversarem&rdquo;.
            </strong>{" "}
            Um sinistro aparece como um ponto no mapa; uma avenida aparece como
            uma sequência de segmentos. Além disso, nomes de vias podem estar
            escritos de formas diferentes. A Avenida das Nações Unidas, por
            exemplo, também pode aparecer como Marginal Pinheiros ou SP-015.
            Para resolver isso, o estudo fez um processo de pareamento: limpou e
            padronizou nomes, comparou a semelhança dos textos e cruzou cada
            ocorrência com os trechos de via mais próximos.
          </p>

          <p>
            <strong>
              Depois, os pesquisadores identificaram exatamente quais trechos
              receberam Faixa Azul.
            </strong>{" "}
            Para isso, usaram divulgações oficiais da CET e fizeram checagens
            visuais em imagens do Google Street View, refinando os pontos de
            início e fim da sinalização. Esse detalhe é importante porque a
            Faixa Azul nem sempre ocupa uma avenida inteira: muitas vezes, ela
            aparece apenas em partes específicas de um corredor.
          </p>

          <p>
            A partir do matching geográfico dos dados de sinistros e mortes no
            trânsito, com informações sobre as vias que receberam intervenções,
            foi possível gerar o gráfico que pode ser visto abaixo. Esta
            visualização mostra, em uma linha do tempo, quando ocorreram
            sinistros fatais em cada via entre janeiro de 2021 e abril de 2025,
            e quando esta recebeu o primeiro trecho de Faixa Azul.{" "}
            <strong>
              Não é possível inferir, apenas a partir dessa visualização, uma
              mudança no comportamento das mortes no trânsito quando vias
              recebem faixas exclusivas para motociclistas.
            </strong>
          </p>
        </div>
      </div>
    </section>
  );
}
