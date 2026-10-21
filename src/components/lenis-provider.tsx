"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";
import { ReactLenis, useLenis } from "lenis/react";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const LENIS_OPTIONS = {
  autoRaf: false,
  lerp: 0.1,
  autoToggle: true,
  anchors: true,
  stopInertiaOnNavigate: true,
  respectReducedMotion: true,
  syncTouch: false,
};

function isBodyScrollLocked() {
  const overflow = document.body.style.overflow;
  return overflow === "hidden" || overflow === "clip";
}

function LenisGsapBridge() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(update);
    };
  }, [lenis]);

  // autoToggle watches html overflow; existing locks set it on body (menu, preload, zoom).
  useEffect(() => {
    if (!lenis) return;

    const sync = () => {
      if (isBodyScrollLocked()) lenis.stop();
      else lenis.start();
    };

    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["style"],
    });

    return () => observer.disconnect();
  }, [lenis]);

  return null;
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={LENIS_OPTIONS}>
      <LenisGsapBridge />
      {children}
    </ReactLenis>
  );
}
