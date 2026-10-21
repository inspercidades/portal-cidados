"use client";

import { useEffect, useState } from "react";

/**
 * Hook para precarregar múltiplas imagens e rastrear quando todas foram carregadas
 * @param imageSources - Array de objetos com src (string ou StaticImageData)
 * @returns boolean indicando se todas as imagens foram carregadas
 */
export function useImagePreloader(
  imageSources: Array<{ src: string | { src: string } }>,
): boolean {
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);
  const [_loadedCount, setLoadedCount] = useState(0);

  useEffect(() => {
    if (imageSources.length === 0) {
      setAllImagesLoaded(true);
      return;
    }

    let isMounted = true;
    const images: HTMLImageElement[] = [];
    let completedCount = 0;

    const handleImageLoad = () => {
      completedCount++;
      if (isMounted) {
        setLoadedCount(completedCount);
        if (completedCount === imageSources.length) {
          setAllImagesLoaded(true);
        }
      }
    };

    const handleImageError = () => {
      // Trata erro como carregado para não travar o loading
      completedCount++;
      if (isMounted) {
        setLoadedCount(completedCount);
        if (completedCount === imageSources.length) {
          setAllImagesLoaded(true);
        }
      }
    };

    // Precarrega todas as imagens
    imageSources.forEach((imageSource) => {
      const img = new Image();
      const src =
        typeof imageSource.src === "string"
          ? imageSource.src
          : imageSource.src.src;

      img.onload = handleImageLoad;
      img.onerror = handleImageError;
      img.src = src;

      // Verifica se a imagem já está carregada (em cache do navegador)
      // Se já estiver carregada, o evento onload não dispara, então verificamos manualmente
      if (img.complete && img.naturalHeight !== 0) {
        // Imagem já está em cache, dispara o evento imediatamente
        setTimeout(() => handleImageLoad(), 0);
      }

      images.push(img);
    });

    // Cleanup
    return () => {
      isMounted = false;
      images.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [imageSources]);

  return allImagesLoaded;
}
