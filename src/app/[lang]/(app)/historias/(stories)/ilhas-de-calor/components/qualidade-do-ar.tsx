"use client";

import type { IlhasCopy } from "@/i18n/messages/stories/ilhas-de-calor";
import { useStoryCopy } from "@/i18n/story-copy";
import backgroundTexture from "../assets/background.png";
import mareMapaImage from "../assets/mare-mapa.png";
import { SectionCover } from "./section-cover";

export function QualidadeDoAr() {
  const copy = useStoryCopy<IlhasCopy>();
  const title = copy.airQuality.title;

  return (
    <div className="w-full bg-white">
      {/* Capa da seção com imagem em escala de cinza e título */}
      <SectionCover
        title={
          <>
            {title.before}
            <strong>{title.strong}</strong>
            {title.after}
          </>
        }
        image={mareMapaImage}
        imageAlt={copy.airQuality.mapAlt}
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
            {title.before}
            <strong>{title.strong}</strong>
            {title.after}
          </h2>
          <div className="space-y-6 text-base md:text-lg leading-relaxed text-[#3A3434]">
            <p>
              {copy.airQuality.p1.before}
              <strong>{copy.airQuality.p1.strong}</strong>
              {copy.airQuality.p1.after}
            </p>
            <p>
              {copy.airQuality.p2.before}
              <strong>{copy.airQuality.p2.strong}</strong>
              {copy.airQuality.p2.after}
            </p>
            <p>{copy.airQuality.p3}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
