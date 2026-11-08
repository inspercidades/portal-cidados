"use client";

import type { IlhasCopy } from "@/i18n/messages/stories/ilhas-de-calor";
import { useStoryCopy } from "@/i18n/story-copy";
import mareMapaImage from "../assets/mare-mapa.png";
import s1 from "../assets/s1.png";
import s2 from "../assets/s2.png";
import s3 from "../assets/s3.png";
import s4 from "../assets/s4.png";
import s5 from "../assets/s5.png";
import s6 from "../assets/s6.png";
import s7 from "../assets/s7.png";
import s8 from "../assets/s8.png";
import s9 from "../assets/s9.png";
import s10 from "../assets/s10.png";
import s11 from "../assets/s11.png";
import s12 from "../assets/s12.png";
import { SectionCover } from "./section-cover";
import { type SolucaoItem, SolucoesScroll } from "./solucoes-scroll";

// TODO: Substitua estas imagens e textos pelos dados reais das 12 soluções
const solucoesLayout: {
  image: typeof s1;
  textPosition: SolucaoItem["textPosition"];
  item: 0 | 1 | 2 | 3 | 4 | 5;
}[] = [
  { image: s1, textPosition: "top-left", item: 0 },
  { image: s2, textPosition: "top-left", item: 0 },
  { image: s3, textPosition: "top-right", item: 1 },
  { image: s4, textPosition: "top-right", item: 1 },
  { image: s5, textPosition: "top-left", item: 2 },
  { image: s6, textPosition: "top-left", item: 2 },
  { image: s7, textPosition: "top-right", item: 3 },
  { image: s8, textPosition: "top-right", item: 3 },
  { image: s9, textPosition: "bottom-right", item: 4 },
  { image: s10, textPosition: "bottom-right", item: 4 },
  { image: s11, textPosition: "top-right", item: 5 },
  { image: s12, textPosition: "top-right", item: 5 },
];

export function Solucoes() {
  const copy = useStoryCopy<IlhasCopy>();
  const solucoesItems: SolucaoItem[] = solucoesLayout.map((slot) => ({
    image: slot.image,
    text: copy.solutions.items[slot.item].title,
    description: copy.solutions.items[slot.item].description,
    textPosition: slot.textPosition,
  }));

  return (
    <div className="w-full bg-white">
      {/* Capa da seção com imagem em escala de cinza e título */}
      <div className="mb-30">
        <SectionCover
          title={<strong>{copy.solutions.title}</strong>}
          image={mareMapaImage}
          imageAlt={copy.solutions.mapAlt}
          sticky={false}
          grayscaleOpacity={1}
        />
      </div>

      {/* Componente de scrollytelling com 12 imagens */}
      <SolucoesScroll items={solucoesItems} />
    </div>
  );
}
