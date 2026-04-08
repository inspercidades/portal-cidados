import backgroundTexture from '../assets/background.png';

export function IlhasDeCalor() {
  return (
    <div className="w-full">
      {/* Conteúdo da seção (abaixo da capa) com background.png */}
      <section
        className="w-full bg-white!"
        style={{
          backgroundImage: `url(${backgroundTexture.src})`,
          backgroundRepeat: 'repeat',
          backgroundPosition: 'top left',
          backgroundSize: `${Math.round(backgroundTexture.width / 2)}px ${Math.round(backgroundTexture.height / 2)}px`,
        }}
      >
        <div className="mx-auto  max-w-xl px-6 md:px-8 py-20 md:py-40 font-inter">
          <h2
            className="text-2xl md:text-3xl lg:text-4xl mb-6"
            style={{ color: '#E50505' }}
          >
            Ilhas de <strong>calor</strong>
          </h2>
          <div className="space-y-6 text-base md:text-lg leading-relaxed text-[#3A3434]">
            <p>
            Ilhas de calor são bolsões de altas temperaturas que se formam em áreas urbanas densamente construídas, onde o asfalto, o concreto e a falta de arborização criam um ambiente mais quente do que as regiões vizinhas.

            </p>
            <p>
            Na Maré, as ilhas de calor se manifestam de forma evidente em áreas como Nova Maré, Baixa do Sapateiro, Conjunto Bento Ribeiro Dantas e Morro do Timbau — locais que concentram construções densas, ruas estreitas e pouca vegetação. O mapeamento realizado pelo projeto Respira Maré mostra que essas regiões, apesar de comporem um território relativamente pequeno, podem apresentar diferenças de temperatura de até 2°C em relação a outras áreas da Maré, como a Nova Holanda, que tem ruas mais amplas e arborizadas.
            </p>
            <p>


            Importante destacar que, <strong>dos 15 territórios que formam a Maré, 9 foram construídos pelo Estado</strong>. Isso reforça que a presença de ilhas de calor não pode ser atribuída exclusivamente à autoconstrução — mas sim à ausência de políticas públicas que integrem planejamento urbano com justiça socioambiental.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
