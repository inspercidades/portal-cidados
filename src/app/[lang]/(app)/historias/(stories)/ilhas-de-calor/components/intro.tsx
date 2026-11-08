"use client";

import { Share2 } from "lucide-react";
import Image from "next/image";
import type { IlhasCopy } from "@/i18n/messages/stories/ilhas-de-calor";
import { useStoryCopy } from "@/i18n/story-copy";
import { StoryLogos } from "../../../components/story-logos";
import backgroundImage from "../assets/background.png";
import coverImage from "../assets/cover-image.png";

export default function Intro() {
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
    <>
      {/* Capa - Centralizada na tela */}
      <section className="relative bg-white! h-screen w-full overflow-hidden flex items-center justify-center">
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
        <div className="absolute top-16 left-0 right-0 z-20 flex flex-col items-center px-6 md:px-12 lg:px-24">
          <div className="mb-6">
            <StoryLogos />
          </div>
        </div>

        {/* Cover Image centralizada */}
        <div className="absolute inset-0 z-5 flex items-center justify-center px-6 md:px-12 lg:px-24">
          <div className="relative w-full min-w-120 mt-10 max-w-6xl 3xl:max-w-7xl aspect-video">
            <Image
              src={coverImage}
              alt={copy.cover.title}
              fill
              // className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Conteúdo centralizado sobre a cover image */}
        <div className="relative z-10 flex flex-col items-center justify-center px-6 md:px-12 lg:px-24 max-w-4xl w-full">
          {/* Título e Autores */}
          <div className="flex flex-col items-center w-full">
            <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-[#3A3434] mb-4 leading-tight text-center max-w-2xl px-2">
              {copy.cover.title}
            </h1>

            <p className="text-[#3A3434] text-[14px] md:text-[16px] 3xl:text-[18px] mb-6 text-center px-2">
              {copy.cover.authors}
            </p>

            {/* Botões de compartilhamento */}
            <div className="flex gap-2 justify-center">
              <button
                type="button"
                onClick={handleShare}
                className="flex items-center hover:cursor-pointer justify-center w-10 h-10 bg-transparent border-[#3A3434] hover:bg-[#000000]/5 text-[#333333] rounded-full transition-all duration-300 shadow-lg border"
                aria-label={copy.share.ariaLabel}
              >
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Conteúdo abaixo da capa */}
      <section className="relative bg-white! w-full overflow-hidden">
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

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center px-6 py-40 md:px-12 lg:px-24 lg:py-40">
          <div className="w-full absolute top-0 max-w-5xl border-t border-[#cccccc]"></div>
          {/* Texto Introdutório */}
          <div className="max-w-xl flex flex-col gap-10  font-inter">
            <p className="text-[#3A3434] text-base md:text-lg leading-relaxed text-justify">
              {copy.intro.p1.before}
              <strong>{copy.intro.p1.strong}</strong>
              {copy.intro.p1.after}
            </p>
            <p className="text-[#3A3434] text-base md:text-lg leading-relaxed text-justify">
              {copy.intro.p2.before}
              <strong>{copy.intro.p2.strong}</strong>
              {copy.intro.p2.after}
            </p>
            <p className="text-[#3A3434] text-base md:text-lg leading-relaxed text-justify">
              {copy.intro.p3.before}
              <strong>{copy.intro.p3.strong}</strong>
              {copy.intro.p3.after}
            </p>
            <p className="text-[#3A3434] text-base md:text-lg leading-relaxed text-justify">
              {copy.intro.p4}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
