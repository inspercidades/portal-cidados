"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { getStoriesForHome, type Story } from "@/lib/data/stories";

import "swiper/css";

export function StoriesSection() {
  const [currentImageIndexes, setCurrentImageIndexes] = useState<{
    [key: string]: number;
  }>({});
  const [hoveredStoryId, setHoveredStoryId] = useState<string | null>(null);
  const stories = useMemo(() => getStoriesForHome(), []);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const nextArrowRef = useRef<HTMLButtonElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const syncEdges = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const [slidesOffsetAfter, setSlidesOffsetAfter] = useState(0);

  useEffect(() => {
    const calculateOffset = () => {
      const icon = nextArrowRef.current?.querySelector("svg");
      const swiperEl = swiperRef.current?.el;
      if (!icon || !swiperEl) return;
      setSlidesOffsetAfter(
        Math.max(
          0,
          Math.round(
            swiperEl.getBoundingClientRect().right -
              icon.getBoundingClientRect().right,
          ),
        ),
      );
    };

    calculateOffset();
    window.addEventListener("resize", calculateOffset);
    return () => window.removeEventListener("resize", calculateOffset);
  }, [isReady]);

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

  const renderStoryCard = (story: Story) => {
    const media = (
      <div className="relative overflow-hidden aspect-square w-full">
        <Image
          src={getCurrentImage(story)}
          alt={story.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          draggable={false}
        />
      </div>
    );

    const info = (
      <div className="mt-4 text-left">
        <h3 className="text-md font-medium text-foreground mb-2 font-gt-ultra-fine leading-tight">
          {story.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed font-gt-ultra-fine">
          {story.description}
        </p>
      </div>
    );

    if (story.href) {
      return (
        <Link
          href={story.href}
          className="block cursor-grab active:cursor-grabbing"
        >
          {media}
          {info}
        </Link>
      );
    }

    return (
      <>
        <div role="img" aria-label={story.title}>
          {media}
        </div>
        {info}
      </>
    );
  };

  return (
    <section className="py-8 pt-18 pb-16 mx-auto bg-background overflow-x-hidden">
      <div className="flex items-center justify-between gap-4 pb-3 px-4 md:px-8 lg:px-12 text-sm text-foreground leading-relaxed font-gt-ultra-fine">
        <Link href="/historias" className="cursor-pointer">
          Veja nossas histórias
        </Link>
        <div className="flex shrink-0 gap-0">
          <button
            type="button"
            onClick={() => swiperRef.current?.slidePrev()}
            disabled={isBeginning}
            className="p-1 cursor-pointer disabled:cursor-default disabled:opacity-30"
            aria-label="Slide anterior"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button
            ref={nextArrowRef}
            type="button"
            onClick={() => swiperRef.current?.slideNext()}
            disabled={isEnd}
            className="p-1 cursor-pointer disabled:cursor-default disabled:opacity-30"
            aria-label="Próximo slide"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="pl-4 md:pl-8 lg:pl-12">
        <Swiper
          slidesPerView="auto"
          spaceBetween={16}
          slidesOffsetAfter={slidesOffsetAfter}
          grabCursor
          watchOverflow
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            syncEdges(swiper);
            setIsReady(true);
          }}
          onSlideChange={syncEdges}
          onReachBeginning={syncEdges}
          onReachEnd={syncEdges}
          onFromEdge={syncEdges}
          className={`overflow-visible! cursor-grab active:cursor-grabbing transition-opacity duration-150 ${
            isReady ? "opacity-100" : "opacity-0"
          }`}
        >
          {stories.map((story) => (
            <SwiperSlide
              key={story.id}
              className="w-[85%]! md:w-[calc((100%-3rem)/3.25)]! cursor-grab active:cursor-grabbing"
            >
              <article
                className="group h-full cursor-grab active:cursor-grabbing"
                onMouseEnter={() => handleStoryMouseEnter(story.id)}
                onMouseLeave={() => handleStoryMouseLeave(story.id)}
              >
                {renderStoryCard(story)}
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
