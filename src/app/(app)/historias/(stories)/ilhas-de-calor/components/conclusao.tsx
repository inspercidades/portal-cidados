import backgroundTexture from "../assets/background.png";
import mareMapaImage from "../assets/mare-mapa.png";
import { SectionCover } from "./section-cover";

export function Conclusao() {
  return (
    <div className="w-full">
      {/* Capa da seção com imagem em escala de cinza e título */}
      <SectionCover
        title={<strong>Conclusão</strong>}
        image={mareMapaImage}
        imageAlt="Mapa da Maré"
        sticky={false}
        grayscaleOpacity={1}
      />

      {/* Conteúdo da seção (abaixo da capa) com background.png */}
      <section
        className="w-full bg-white"
        style={{
          backgroundImage: `url(${backgroundTexture.src})`,
          backgroundRepeat: "repeat",
          backgroundPosition: "top left",
          backgroundSize: `${Math.round(backgroundTexture.width / 2)}px ${Math.round(backgroundTexture.height / 2)}px`,
        }}
      >
        <div className="mx-auto max-w-xl px-6 md:px-8 py-20 md:py-40 font-inter">
          <h2
            className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6"
            style={{ color: "#E50505" }}
          >
            Conclusão
          </h2>
          <div className="space-y-6 text-base md:text-lg leading-relaxed text-zinc-700">
            <p>
              O diagnóstico realizado pelo projeto Respira Maré evidencia como a
              ausência de políticas públicas integradas e sensíveis às
              especificidades das favelas agrava os efeitos da crise climática
              nas periferias urbanas. O calor extremo, a má qualidade do ar e a
              precariedade da infraestrutura não são eventos naturais nem
              inevitáveis: são consequências diretas de escolhas políticas que
              historicamente negligenciam territórios como a Maré.
            </p>
            <p>
              Mais do que comprovar tecnicamente o que os moradores já sentiam
              na pele — o calor insuportável, a dificuldade para dormir, o
              aumento de doenças respiratórias —, este estudo teve um papel
              essencial em transformar percepções em evidências. Aquilo que era
              apenas uma ameaça difusa agora se traduz em dados mensuráveis,
              reconhecíveis e, sobretudo, passíveis de enfrentamento. A produção
              deste conhecimento a partir do território, com envolvimento direto
              dos moradores, é também uma forma de resistência e de construção
              de alternativas com base na justiça climática.
            </p>
            <p>
              Para reverter esse cenário, é urgente repensar o modelo de
              urbanização e os impactos das políticas habitacionais implantadas
              nas últimas décadas, que ao desconsiderarem elementos ambientais e
              climáticos, contribuíram para consolidar bolsões de calor, ar
              poluído e pouca ventilação em comunidades como a Maré. Isso exige
              ação coordenada em múltiplas frentes.
            </p>
            <p>
              Entre as soluções propostas, destaca-se a necessidade de um
              planejamento urbano integrado, com planos locais de mitigação das
              ilhas de calor e da poluição do ar que dialoguem com programas
              governamentais já existentes, mas que contemplem as realidades dos
              territórios populares. Além disso, é fundamental a criação de uma
              rede complementar de monitoramento climático e da qualidade do ar,
              com tecnologias acessíveis, produção de dados em tempo real e
              ampla divulgação pública dos resultados.
            </p>
            <p>
              Por fim, qualquer transformação duradoura só será possível com o
              protagonismo dos moradores. É preciso estimular a participação
              ativa da juventude local em projetos ambientais, promover
              campanhas educativas sobre temas sensíveis — como os riscos da
              queima de lixo — e garantir financiamento para iniciativas
              comunitárias que atuem na linha de frente do combate à injustiça
              ambiental.
            </p>
            <p>
              A crise climática não afeta a todos da mesma forma. Em territórios
              como a Maré, ela se soma a desigualdades históricas, tornando-se
              ainda mais severa. Mas é também desses territórios que emergem
              soluções enraizadas, potentes e possíveis. O Respira Maré é prova
              disso.{" "}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
