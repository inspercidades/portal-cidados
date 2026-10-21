"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hook que aguarda o carregamento de todas as imagens no DOM
 * Inclui imagens do Next.js Image e imagens de background
 * @param enabled - Se deve começar a verificar (após componentes serem renderizados)
 * @returns boolean indicando se todas as imagens foram carregadas
 */
export function useAllImagesLoaded(enabled: boolean = true): boolean {
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);
  const checkedRef = useRef(false);

  useEffect(() => {
    if (!enabled || checkedRef.current) {
      return;
    }

    // Função para verificar se todas as imagens estão carregadas
    const checkAllImagesLoaded = () => {
      // Busca todas as imagens no DOM (incluindo as do Next.js Image)
      const images = Array.from(
        document.querySelectorAll("img"),
      ) as HTMLImageElement[];
      const backgroundImages: HTMLImageElement[] = [];

      // Busca elementos com background-image no style inline
      const elementsWithBackground = document.querySelectorAll(
        "[style*='background-image']",
      );

      // Cria imagens para verificar background-images
      elementsWithBackground.forEach((element) => {
        const htmlElement = element as HTMLElement;
        const bgImage = htmlElement.style.backgroundImage;
        if (bgImage && bgImage !== "none") {
          const urlMatch = bgImage.match(/url\(["']?([^"')]+)["']?\)/);
          if (urlMatch?.[1]) {
            const img = new Image();
            img.src = urlMatch[1];
            backgroundImages.push(img);
          }
        }
      });

      // Verifica se todas as imagens estão carregadas
      const allImages: HTMLImageElement[] = [...images, ...backgroundImages];

      if (allImages.length === 0) {
        // Se não há imagens, considera como carregado
        setAllImagesLoaded(true);
        checkedRef.current = true;
        return;
      }

      let loadedCount = 0;
      const totalImages = allImages.length;

      const checkComplete = () => {
        loadedCount++;
        if (loadedCount === totalImages && !checkedRef.current) {
          setAllImagesLoaded(true);
          checkedRef.current = true;
        }
      };

      // Verifica cada imagem
      allImages.forEach((img) => {
        if (img.complete && img.naturalHeight !== 0) {
          // Imagem já está carregada
          checkComplete();
        } else {
          // Aguarda o carregamento
          img.onload = checkComplete;
          img.onerror = checkComplete; // Trata erro como carregado para não travar
        }
      });
    };

    // Aguarda um pouco para os componentes serem renderizados e as imagens aparecerem no DOM
    const timeoutId = setTimeout(() => {
      checkAllImagesLoaded();
    }, 300);

    // Também verifica periodicamente para pegar imagens que aparecem depois
    const intervalId = setInterval(() => {
      if (!checkedRef.current) {
        checkAllImagesLoaded();
      }
    }, 200);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [enabled]);

  return allImagesLoaded;
}
