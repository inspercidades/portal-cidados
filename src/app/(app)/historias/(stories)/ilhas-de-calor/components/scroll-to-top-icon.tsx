"use client";

import { useLenis } from "lenis/react";
import { useEffect, useState } from "react";
import { ScrollToTopButton } from "./scroll-to-top-button";

export function ScrollToTopIcon() {
  const lenis = useLenis();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const introSection = document.querySelector("section.h-screen");

      if (!introSection) {
        setIsVisible(window.scrollY > 100);
        return;
      }

      const introRect = introSection.getBoundingClientRect();

      const pastIntro = introRect.bottom < 0;
      const notAtTop = window.scrollY > 100;

      setIsVisible(pastIntro && notAtTop);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0);
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-[9999] transition-opacity duration-300 ease-in-out ${
        isVisible
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <ScrollToTopButton onClick={scrollToTop} />
    </div>
  );
}
