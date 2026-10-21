"use client";

import { Share2 } from "lucide-react";
import { StoryLogos } from "../../../components/story-logos";
import coverImage from "../assets/cover.png";

export default function Loading() {
  const handleShare = async () => {
    const shareData = {
      title: "Retrato das Desigualdades em Saúde no Município de São Paulo",
      text: "Confira o estudo sobre riscos de mortalidade e determinantes socioeconômicos no Município de São Paulo.",
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
    <div
      className="h-screen bg-cover flex flex-col items-center justify-center relative"
      style={{
        backgroundImage: `url(${coverImage.src})`,
        overflow: "hidden !important",
      }}
    >
      {/* Main content centered - behind blur */}
      <div className="flex-1 flex flex-col justify-center items-center px-4 md:px-8 text-center max-w-[900px] relative z-0">
        <h2 className="text-white text-lg md:text-2xl lg:text-2xl font-bold max-w-4xl mb-6">
          Retrato das Desigualdades em Saúde: Riscos de Mortalidade e
          Determinantes Socioeconômicos no Município de São Paulo
        </h2>

        <p className="text-white text-md md:text-lg font-normal max-w-[620px] leading-relaxed">
          Estudo desenvolvido por Paulo H. Nascimento Saldiva, Ligia Vizeu
          Barrozo, Catia Martinez Minto, Sara Lopes de Moraes e Paulo Afonso de
          André.
        </p>

        <div className="flex gap-2 justify-center mt-6">
          <button
            type="button"
            onClick={handleShare}
            className="flex items-center hover:cursor-pointer justify-center w-10 h-10 bg-transparent border-[#3A3434] hover:bg-[#000000]/10 text-[#333333] rounded-full transition-all duration-300 shadow-lg border"
            aria-label="Compartilhar"
          >
            <Share2 size={18} className="text-white" />
          </button>
        </div>
      </div>

      {/* Blur effect on background - over the text */}
      <div className="absolute inset-0 backdrop-blur-sm bg-black/20 z-10"></div>

      {/* Logos at the top */}
      <div className="absolute top-16 left-0 right-0 z-30 flex flex-col items-center px-6 md:px-12 lg:px-24">
        <div className="mb-6">
          <StoryLogos inverted hoverable={false} />
        </div>
      </div>

      {/* Loading indicator - animated dots centered in the middle of screen */}
      <div className="absolute inset-0 z-30 flex items-center justify-center">
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-[#C00026] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-[#C00026] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-[#C00026] rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
}
