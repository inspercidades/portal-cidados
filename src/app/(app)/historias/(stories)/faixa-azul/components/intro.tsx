"use client";

import { Share2 } from "lucide-react";
import { StoryLogos } from "../../../components/story-logos";
import {
  brandColor,
  coverVideo,
  introAuthors,
  introTitle,
  logoTintClass,
} from "../constants";

export default function Intro() {
  const handleShare = async () => {
    const shareData = {
      title: "A Faixa Azul tornou o trânsito mais seguro?",
      text: "Avaliação do impacto das faixas dedicadas à motociclistas nos sinistros em São Paulo",
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copiado para a área de transferência!");
      }
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        console.error("Erro ao compartilhar:", err);
      }
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src={coverVideo}
      />

      {/* Overlay branco 70% para legibilidade do texto */}
      <div className="absolute inset-0 bg-[#FFFFFF]/70" />

      {/* Logos no topo */}
      <div className="absolute top-16 left-0 right-0 z-20 flex flex-col items-center px-6 md:px-12 lg:px-24">
        <div className="mb-6">
          <StoryLogos imageClassName={logoTintClass} />
        </div>
      </div>

      {/* Conteúdo centralizado sobre a capa */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 md:px-8 lg:px-12 text-center max-w-4xl 2xl:max-w-6xl ">
        <h1
          className="text-center font-inter text-2xl md:text-4xl 2xl:text-5xl pt-20 font-bold leading-tight mb-4"
          style={{ color: brandColor }}
        >
          {introTitle}
        </h1>

        <p
          className="text-center font-inter text-xl font-normal leading-tight mb-6"
          style={{ color: brandColor }}
        >
          {introAuthors}
        </p>

        <button
          type="button"
          onClick={handleShare}
          className="flex items-center hover:cursor-pointer justify-center w-10 h-10 bg-transparent rounded-full transition-all duration-300"
          style={{
            color: brandColor,
            borderColor: brandColor,
            borderWidth: "1px",
          }}
          aria-label="Compartilhar"
        >
          <Share2 size={18} />
        </button>
      </div>
    </section>
  );
}
