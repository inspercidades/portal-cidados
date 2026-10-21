"use client";

import { Share2 } from "lucide-react";
import Image from "next/image";
import { type ReactNode, useEffect, useState } from "react";
import { StoryLogos } from "../../../components/story-logos";
import backgroundImage from "../assets/background.png";
import coverImage from "../assets/cover-image.png";

interface PreloadWrapperProps {
  children: ReactNode;
  imageSources: string[];
}

export function PreloadWrapper({
  children,
  imageSources,
}: PreloadWrapperProps) {
  const [isLoading, setIsLoading] = useState(true);
  const totalImages = imageSources.length;

  const handleShare = async () => {
    const shareData = {
      title: "Diagnóstico sobre ilhas de calor e qualidade do ar na Maré",
      text: "Confira este diagnóstico sobre ilhas de calor e qualidade do ar na Maré, realizado pela Redes da Maré.",
      url: window.location.href,
    };

    try {
      // Verifica se o navegador suporta a Web Share API
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: copia o link para a área de transferência
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copiado para a área de transferência!");
      }
    } catch (err) {
      // Usuário cancelou o compartilhamento ou ocorreu erro
      if ((err as Error).name !== "AbortError") {
        console.error("Erro ao compartilhar:", err);
      }
    }
  };

  useEffect(() => {
    if (totalImages === 0) {
      setIsLoading(false);
      return;
    }

    let mounted = true;

    const preloadImage = (src: string): Promise<void> => {
      return new Promise((resolve) => {
        const img = new window.Image();
        img.onload = () => {
          resolve();
        };
        img.onerror = () => {
          resolve();
        };
        img.src = src;
      });
    };

    const loadAllImages = async () => {
      await Promise.all(imageSources.map(preloadImage));
      if (mounted) {
        // Small delay to ensure smooth transition
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }
    };

    loadAllImages();

    return () => {
      mounted = false;
    };
  }, [imageSources, totalImages]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white z-50 overflow-hidden">
        {/* Background Image com blur */}
        <div
          className="absolute inset-0 z-0 blur-sm"
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
            <StoryLogos hoverable={false} />
          </div>
        </div>

        {/* Cover Image centralizada com blur */}
        <div className="absolute inset-0 z-5 flex items-center justify-center px-6 md:px-12 lg:px-24">
          <div className="relative w-full min-w-120 mt-10 max-w-6xl 3xl:max-w-7xl aspect-video blur-sm">
            <Image
              src={coverImage}
              alt="Diagnóstico sobre ilhas de calor e qualidade do ar na Maré"
              fill
              priority
            />
          </div>
        </div>

        {/* Conteúdo centralizado sobre a cover image com blur */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 md:px-12 lg:px-24 max-w-4xl w-full mx-auto blur-sm">
          {/* Título e Autores */}
          <div className="flex flex-col items-center w-full">
            <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-[#3A3434] mb-4 leading-tight text-center max-w-2xl px-2">
              Diagnóstico sobre ilhas de calor e qualidade do ar na Maré
            </h1>

            <p className="text-[#3A3434] text-[14px] md:text-[16px] 3xl:text-[18px] mb-6 text-center px-2">
              Carolina Dias, Luna Arouca, Rian de Queiroz e Shyrlei Rosendo
            </p>

            {/* Botões de compartilhamento */}
            <div className="flex gap-2 justify-center">
              <button
                type="button"
                onClick={handleShare}
                className="flex items-center justify-center w-10 h-10 bg-transparent border-[#3A3434] hover:bg-[#f0f0f0]/20 text-[#333333] rounded-full transition-all duration-300 shadow-lg border"
                aria-label="Compartilhar"
              >
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Indicador de loading centralizado */}
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

  return <>{children}</>;
}
