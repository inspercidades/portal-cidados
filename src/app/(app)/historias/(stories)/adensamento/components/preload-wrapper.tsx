"use client";

import { useState, useLayoutEffect, type ReactNode } from "react";
import Image from "next/image";
import { StoryLogos } from "../../../components/story-logos";
import capa from "../images/capa.png";
import capaMobile from "../images/capa_mobile.png";

const MAX_LOADING_MS = 15_000;

interface PreloadWrapperProps {
  children: ReactNode;
  imageSources: string[];
}

export function PreloadWrapper({
  children,
  imageSources,
}: PreloadWrapperProps) {
  const [isReady, setIsReady] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useLayoutEffect(() => {
    document.body.style.overflow = "hidden";
    let mounted = true;

    const preloadImage = (src: string): Promise<void> =>
      new Promise((resolve) => {
        const img = new window.Image();
        img.onload = () => resolve();
        img.onerror = () => resolve();
        img.src = src;
      });

    const waitForWindowLoad = (): Promise<void> =>
      new Promise((resolve) => {
        if (document.readyState === "complete") {
          resolve();
          return;
        }
        window.addEventListener("load", () => resolve(), { once: true });
      });

    const timeout = (ms: number): Promise<void> =>
      new Promise((resolve) => setTimeout(resolve, ms));

    const finishLoading = () => {
      if (!mounted) return;
      setFadeOut(true);
      setTimeout(() => {
        if (!mounted) return;
        document.body.style.overflow = "";
        setIsReady(true);
        import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
          ScrollTrigger.refresh();
        });
      }, 600);
    };

    Promise.race([
      Promise.all([
        ...imageSources.map(preloadImage),
        waitForWindowLoad(),
      ]),
      timeout(MAX_LOADING_MS),
    ]).then(finishLoading);

    return () => {
      mounted = false;
      document.body.style.overflow = "";
    };
  }, [imageSources]);

  return (
    <>
      <div className={isReady ? undefined : "h-screen overflow-hidden"}>
        {children}
      </div>

      {!isReady && (
        <div
          className={`fixed inset-0 z-999 transition-opacity duration-500 ${
            fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          {/* Cover image (blurred mimic of the actual cover) */}
          <Image
            src={capa}
            alt=""
            fill
            className="object-cover object-center hidden md:block"
            priority
          />
          <Image
            src={capaMobile}
            alt=""
            fill
            className="object-cover object-center block md:hidden"
            priority
          />
          <div className="absolute inset-0 backdrop-blur-sm" />

          {/* Logos at top */}
          <div className="absolute top-16 left-0 right-0 z-20 flex flex-col items-center px-6 md:px-12 lg:px-24">
            <div className="mb-6">
              <StoryLogos hoverable={false} />
            </div>
          </div>

          {/* Title + subtitle (blurred) */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 md:px-12 lg:px-24 max-w-4xl w-full mx-auto">
            <div className="blur-sm">
              <h1 className="font-sans font-bold text-[23px] lg:text-[33px] leading-[44px] lg:leading-[48px] text-[#3F3F3F] text-center">
                Verticalização gera adensamento populacional?
                <br />
                Como o Plano Diretor pode estimular uma cidade mais compacta
              </h1>
              <p className="font-sans text-base text-[#414042] mt-4 text-center">
                Trabalho de Gustavo Theil, orientado por Adriano Borges Costa.
              </p>
            </div>
          </div>

          {/* Bouncing dots loading indicator */}
          <div className="absolute inset-0 z-30 flex items-center justify-center">
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-[#2BA680] rounded-full animate-bounce [animation-delay:-0.3s]" />
              <div className="w-2 h-2 bg-[#2BA680] rounded-full animate-bounce [animation-delay:-0.15s]" />
              <div className="w-2 h-2 bg-[#2BA680] rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

