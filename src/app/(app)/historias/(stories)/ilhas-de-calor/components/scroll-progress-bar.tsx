"use client";

import { useEffect, useState, useRef } from "react";

const DEFAULT_BAR_COLOR = "#C00026";

interface ScrollProgressBarProps {
  barColor?: string;
}

export function ScrollProgressBar({ barColor = DEFAULT_BAR_COLOR }: ScrollProgressBarProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = documentHeight > 0 ? scrollTop / documentHeight : 0;
      setScrollProgress(Math.min(Math.max(progress, 0), 1));
    };

    const resetHideTimer = () => {
      // Mostra a barra quando há scroll
      setIsVisible(true);

      // Limpa o timeout anterior se existir
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = null;
      }

      // Inicia um novo timer de 2 segundos para esconder
      hideTimeoutRef.current = setTimeout(() => {
        setIsVisible(false);
      }, 2000);
    };

    // Initial calculation
    updateScrollProgress();
    resetHideTimer();

    // Use requestAnimationFrame for smoother performance
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateScrollProgress();
          resetHideTimer();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateScrollProgress);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateScrollProgress);
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "3px",
        backgroundColor: "transparent",
        zIndex: 9999,
        transform: isVisible ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 0.3s ease-out",
      }}
      className="md:h-[4px]"
    >
      <div
        style={{
          height: "100%",
          width: `${scrollProgress * 100}%`,
          backgroundColor: barColor,
          transition: "width 0.1s ease-out",
        }}
      />
    </div>
  );
}
