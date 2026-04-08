"use client";

import { getStoriesForHome, type Story } from "@/lib/data/stories";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

export function StoriesSection() {
  const [currentImageIndexes, setCurrentImageIndexes] = useState<{
    [key: string]: number;
  }>({});
  const [hoveredStoryId, setHoveredStoryId] = useState<string | null>(null);
  const stories = useMemo(() => getStoriesForHome(), []);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Effect para gerenciar a animação de imagens no hover
  useEffect(() => {
    // Limpa qualquer intervalo existente antes de criar um novo
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (!hoveredStoryId) {
      return;
    }

    const story = stories.find((s) => s.id === hoveredStoryId);
    if (!story || !story.images || story.images.length <= 1) {
      return;
    }

    // Inicializa o índice para a história atual se não existir
    setCurrentImageIndexes((prev) => ({
      ...prev,
      [hoveredStoryId]: prev[hoveredStoryId] ?? 0,
    }));

    // Cria o intervalo para trocar as imagens
    intervalRef.current = setInterval(() => {
      setCurrentImageIndexes((prev) => {
        const currentIndex = prev[hoveredStoryId] ?? 0;
        const nextIndex = (currentIndex + 1) % story.images.length;
        return { ...prev, [hoveredStoryId]: nextIndex };
      });
    }, 500); // Troca a imagem a cada 500ms

    // Cleanup: limpa o intervalo quando o componente desmonta ou o hover muda
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [hoveredStoryId, stories]);

  const handleStoryMouseEnter = (storyId: string) => {
    // Limpa qualquer intervalo anterior antes de iniciar um novo
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setHoveredStoryId(storyId);
  };

  const handleStoryMouseLeave = (storyId: string) => {
    // Limpa o intervalo imediatamente
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setHoveredStoryId(null);
    // Reseta o índice da imagem para 0 quando o mouse sair
    setCurrentImageIndexes((prev) => ({
      ...prev,
      [storyId]: 0,
    }));
  };

  const getCurrentImage = (story: Story) => {
    // Se a história está em hover, usa o índice atual do array images
    if (
      hoveredStoryId === story.id &&
      story.images &&
      story.images.length > 0
    ) {
      const index = currentImageIndexes[story.id] ?? 0;
      return story.images[index] || story.image;
    }
    // Caso contrário, retorna a imagem principal
    return story.image;
  };

  return (
    <section className="py-8 pt-18 pb-16 mx-auto bg-background">
      <span className="text-sm block pb-3 px-4 md:px-8 lg:px-12 text-foreground leading-relaxed font-gt-ultra-fine">
        Veja nossas histórias
      </span>
      <div className="mx-auto px-4 md:px-8 lg:px-12">
        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-4">
          {stories.map((story) => (
            <div key={story.id} className="group">
              {story.href ? (
                <Link
                  href={story.href}
                  className="block"
                  onMouseEnter={() => handleStoryMouseEnter(story.id)}
                  onMouseLeave={() => handleStoryMouseLeave(story.id)}
                >
                  {/* Story Card */}
                  <div className="relative overflow-hidden aspect-square w-full">
                    <Image
                      src={getCurrentImage(story)}
                      alt={story.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      draggable={false}
                    />
                  </div>
                </Link>
              ) : (
                /* Story Card without link */
                <div
                  className="relative overflow-hidden aspect-square w-full"
                  onMouseEnter={() => handleStoryMouseEnter(story.id)}
                  onMouseLeave={() => handleStoryMouseLeave(story.id)}
                  role="img"
                  aria-label={story.title}
                >
                  <Image
                    src={getCurrentImage(story)}
                    alt={story.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    draggable={false}
                  />
                </div>
              )}

              {/* Story Info */}
              <div className="mt-4 text-left">
                <h3 className="text-md font-medium text-foreground mb-2 font-gt-ultra-fine leading-tight">
                  {story.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-gt-ultra-fine">
                  {story.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
