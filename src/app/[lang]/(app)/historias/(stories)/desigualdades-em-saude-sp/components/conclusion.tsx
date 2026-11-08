"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { SaudeCopy } from "@/i18n/messages/stories/desigualdades-em-saude-sp";
import { useStoryCopy } from "@/i18n/story-copy";
import metro from "../assets/metro.png";
import textBackground from "../assets/text-background.png";

// Registrar o plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function Conclusion() {
  const copy = useStoryCopy<SaudeCopy>();
  // Refs para os cards que serão animados
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const bonusTrackSrc = "/historias/desigualdades-em-saude-sp/saude.wav";
  const captionsSrc =
    "/historias/desigualdades-em-saude-sp/bonus-placeholder.vtt";

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    const onEnded = () => setIsPlaying(false);
    const onPause = () => setIsPlaying(false);
    const onPlay = () => setIsPlaying(true);

    el.addEventListener("ended", onEnded);
    el.addEventListener("pause", onPause);
    el.addEventListener("play", onPlay);

    return () => {
      el.removeEventListener("ended", onEnded);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("play", onPlay);
    };
  }, []);

  useLayoutEffect(() => {
    const cards = [
      { ref: card1Ref, delay: 0 },
      { ref: card2Ref, delay: 0.15 },
      { ref: card3Ref, delay: 0.3 },
    ];

    // Configurar estado inicial dos cards
    cards.forEach(({ ref }) => {
      if (ref.current) {
        gsap.set(ref.current, {
          opacity: 0,
          y: 50,
        });
      }
    });

    // Criar animações com ScrollTrigger
    const animations = cards.map(({ ref, delay }) => {
      if (!ref.current) return null;

      return gsap.to(ref.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          end: "top 50%",
          toggleActions: "play none none reverse",
          immediateRender: false,
        },
      });
    });

    // Verificar se elementos já estão visíveis ao montar
    const checkInitialState = () => {
      cards.forEach(({ ref, delay }) => {
        if (!ref.current || !sectionRef.current) return;

        const rect = ref.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const triggerPoint = viewportHeight * 0.85;

        if (rect.top < triggerPoint && rect.bottom > 0) {
          gsap.to(ref.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay,
            ease: "power3.out",
          });
        }
      });
    };

    // Aguardar ScrollTrigger estar pronto
    const timeoutId = setTimeout(() => {
      ScrollTrigger.refresh();
      requestAnimationFrame(() => {
        checkInitialState();
      });
    }, 150);

    return () => {
      clearTimeout(timeoutId);
      animations.forEach((anim) => {
        anim?.scrollTrigger?.kill();
        anim?.kill();
      });
    };
  }, []);

  const toggleBonusAudio = () => {
    const el = audioRef.current;
    if (!el) return;

    if (el.paused) {
      void el.play().catch(() => {
        setIsPlaying(false);
      });
    } else {
      el.pause();
    }
  };

  return (
    <div
      ref={sectionRef}
      className="min-h-screen bg-auto bg-center bg-repeat flex flex-col items-center pt-30 overflow-x-hidden"
      style={{
        backgroundImage: `url(${textBackground.src})`,
      }}
    >
      <div className="max-w-xl rounded-2xl px-4 md:px-8 ">
        <div className="space-y-6 text-black leading-relaxed">
          <h2 className="text-2xl font-bold">{copy.conclusion.title}</h2>

          <p>
            {copy.conclusion.p1Before}{" "}
            <span className="font-semibold">{copy.conclusion.p1Emph}</span>{" "}
            {copy.conclusion.p1After}
          </p>

          <p>
            {copy.conclusion.p2Before}{" "}
            <span className="font-semibold">{copy.conclusion.p2Emph}</span>{" "}
            {copy.conclusion.p2After}
          </p>

          <p>
            {copy.conclusion.p3Before}{" "}
            <span className="font-semibold">{copy.conclusion.p3Emph}</span>{" "}
            {copy.conclusion.p3After}
          </p>

          <p>
            {copy.conclusion.p4Before}{" "}
            <span className="font-semibold">{copy.conclusion.p4Maternal}</span>{" "}
            {copy.conclusion.p4Mid1}{" "}
            <span className="font-semibold">{copy.conclusion.p4Cardio}</span>{" "}
            {copy.conclusion.p4Mid2}{" "}
            <span className="font-semibold">{copy.conclusion.p4Diabetes}</span>{" "}
            {copy.conclusion.p4After}
          </p>

          <ul className="space-y-2 ml-3">
            <li className="flex items-start">
              <span className="text-lg mr-2">•</span>
              <span>{copy.conclusion.bullet1}</span>
            </li>
            <li className="flex items-start">
              <span className="text-lg mr-2">•</span>
              <span>{copy.conclusion.bullet2}</span>
            </li>
            <li className="flex items-start">
              <span className="text-lg mr-2">•</span>
              <span>{copy.conclusion.bullet3}</span>
            </li>
            <li className="flex items-start">
              <span className="text-lg mr-2">•</span>
              <span>{copy.conclusion.bullet4}</span>
            </li>
          </ul>

          <p className="pb-10">
            {copy.conclusion.p5Before}{" "}
            <span className="font-semibold">{copy.conclusion.p5Emph}</span>
          </p>

          <h2 className="text-2xl font-bold">{copy.conclusion.proposals}</h2>

          <div className="space-y-4 pb-16">
            <div ref={card1Ref} className="bg-white p-8 backdrop-blur-sm">
              <h3 className="font-semibold mb-3">{copy.conclusion.ubsTitle}</h3>
              <p className="leading-relaxed">{copy.conclusion.ubsBody}</p>
            </div>

            <div ref={card2Ref} className="bg-white p-8 backdrop-blur-sm">
              <h3 className="font-semibold mb-3">
                {copy.conclusion.foodTitle}
              </h3>
              <p className="leading-relaxed">{copy.conclusion.foodBody}</p>
            </div>

            <div ref={card3Ref} className="bg-white p-8 backdrop-blur-sm">
              <h3 className="font-semibold mb-3">
                {copy.conclusion.observatoryTitle}
              </h3>
              <p className="leading-relaxed">
                {copy.conclusion.observatoryBody}
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold">{copy.conclusion.bonus}</h2>

          <p className="mb-16">
            {copy.conclusion.bonusBefore}{" "}
            <span className="font-bold">{copy.conclusion.bonusData}</span>{" "}
            {copy.conclusion.bonusMid}{" "}
            <span className="font-bold">{copy.conclusion.bonusVerse}</span>
          </p>

          <audio
            ref={audioRef}
            src={bonusTrackSrc}
            preload="metadata"
            className="sr-only"
          >
            <track
              kind="captions"
              srcLang="pt-BR"
              label={copy.conclusion.captions}
              src={captionsSrc}
            />
          </audio>

          <button
            type="button"
            className="flex items-center gap-2 bg-black text-white px-6 py-3  hover:bg-black/80 hover:cursor-pointer transition-colors duration-200"
            onClick={toggleBonusAudio}
            aria-pressed={isPlaying}
            aria-label={
              isPlaying ? copy.conclusion.pauseAudio : copy.conclusion.playAudio
            }
          >
            {isPlaying ? (
              <svg
                className="w-5 h-5 shrink-0"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <title>{copy.conclusion.pauseTitle}</title>
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 shrink-0"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <title>{copy.conclusion.playTitle}</title>
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
            {isPlaying ? copy.conclusion.pause : copy.conclusion.play}
          </button>
        </div>
      </div>

      {/* Imagem metro ocupando toda a largura da tela */}
      <div className="w-full  mt-0">
        <Image
          src={metro}
          alt={copy.conclusion.metroAlt}
          className="w-full h-auto object-cover"
          priority
        />
      </div>
    </div>
  );
}
