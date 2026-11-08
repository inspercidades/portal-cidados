"use client";

import { Share2 } from "lucide-react";
import Image from "next/image";
import type { IlhasCopy } from "@/i18n/messages/stories/ilhas-de-calor";
import { useStoryCopy } from "@/i18n/story-copy";
import { StoryLogos } from "../../../components/story-logos";
import backgroundImage from "../assets/background.png";
import coverImage from "../assets/cover-image.png";

export default function IntroCover() {
  const copy = useStoryCopy<IlhasCopy>();

  const handleShare = async () => {
    const shareData = {
      title: copy.cover.title,
      text: copy.share.text,
      url: window.location.href,
    };

    try {
      // Verifica se o navegador suporta a Web Share API
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: copia o link para a área de transferência
        await navigator.clipboard.writeText(window.location.href);
        alert(copy.share.copied);
      }
    } catch (err) {
      // Usuário cancelou o compartilhamento ou ocorreu erro
      if ((err as Error).name !== "AbortError") {
        console.error(copy.share.error, err);
      }
    }
  };

  return (
    <section className="relative bg-white! min-h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${backgroundImage.src})`,
          backgroundRepeat: "repeat",
          backgroundPosition: "top left",
          backgroundSize: `${Math.round(backgroundImage.width / 2)}px ${Math.round(backgroundImage.height / 2)}px`,
        }}
      />

      {/* Logos no topo */}
      <div className="absolute top-16 left-0 right-0 z-50 flex flex-col items-center px-6 md:px-12 lg:px-24">
        <div className="mb-6">
          <StoryLogos hoverable={false} />
        </div>
      </div>

      {/* Content - Centralizado verticalmente e horizontalmente */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-8 md:px-12 lg:px-24 w-full">
        {/* Hero Section com Cover Image */}
        <div className="flex flex-col items-center max-w-4xl w-full">
          {/* Cover Image com conteúdo sobreposto */}
          <div className="relative w-full aspect-video">
            <Image
              src={coverImage}
              alt={copy.cover.title}
              fill
              className="object-cover"
              priority
            />

            {/* Conteúdo centralizado sobre a imagem */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-0 sm:px-6 md:px-8 lg:px-12">
              <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-[#3A3434] mb-2 sm:mb-3 leading-tight text-center max-w-2xl px-2">
                {copy.cover.title}
              </h1>

              <p className="text-[#3A3434] text-[14px] md:text-[16px] mb-3 sm:mb-4 text-center px-2">
                {copy.cover.authors}
              </p>

              {/* Botões de compartilhamento */}
              <div className="flex gap-2 justify-center">
                <button
                  type="button"
                  onClick={handleShare}
                  className="flex items-center justify-center w-10 h-10 bg-transparent border-[#3A3434] hover:bg-[#f0f0f0]/20 text-[#333333] rounded-full transition-all duration-300 shadow-lg border"
                  aria-label={copy.share.ariaLabel}
                >
                  <Share2 size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
