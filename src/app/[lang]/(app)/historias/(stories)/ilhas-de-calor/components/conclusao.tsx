"use client";

import type { IlhasCopy } from "@/i18n/messages/stories/ilhas-de-calor";
import { useStoryCopy } from "@/i18n/story-copy";
import backgroundTexture from "../assets/background.png";
import mareMapaImage from "../assets/mare-mapa.png";
import { SectionCover } from "./section-cover";

export function Conclusao() {
  const copy = useStoryCopy<IlhasCopy>();

  return (
    <div className="w-full">
      {/* Capa da seção com imagem em escala de cinza e título */}
      <SectionCover
        title={<strong>{copy.conclusion.title}</strong>}
        image={mareMapaImage}
        imageAlt={copy.conclusion.mapAlt}
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
            {copy.conclusion.heading}
          </h2>
          <div className="space-y-6 text-base md:text-lg leading-relaxed text-zinc-700">
            {copy.conclusion.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
