"use client";

import type { IlhasCopy } from "@/i18n/messages/stories/ilhas-de-calor";
import { useStoryCopy } from "@/i18n/story-copy";
import backgroundTexture from "../assets/background.png";

export function IlhasDeCalor() {
  const copy = useStoryCopy<IlhasCopy>();

  return (
    <div className="w-full">
      {/* Conteúdo da seção (abaixo da capa) com background.png */}
      <section
        className="w-full bg-white!"
        style={{
          backgroundImage: `url(${backgroundTexture.src})`,
          backgroundRepeat: "repeat",
          backgroundPosition: "top left",
          backgroundSize: `${Math.round(backgroundTexture.width / 2)}px ${Math.round(backgroundTexture.height / 2)}px`,
        }}
      >
        <div className="mx-auto  max-w-xl px-6 md:px-8 py-20 md:py-40 font-inter">
          <h2
            className="text-2xl md:text-3xl lg:text-4xl mb-6"
            style={{ color: "#E50505" }}
          >
            {copy.heatIslands.title.before}
            <strong>{copy.heatIslands.title.strong}</strong>
            {copy.heatIslands.title.after}
          </h2>
          <div className="space-y-6 text-base md:text-lg leading-relaxed text-[#3A3434]">
            <p>{copy.heatIslands.p1}</p>
            <p>{copy.heatIslands.p2}</p>
            <p>
              {copy.heatIslands.p3.before}
              <strong>{copy.heatIslands.p3.strong}</strong>
              {copy.heatIslands.p3.after}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
