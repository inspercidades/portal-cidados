"use client";

import { useEffect, useRef, useState } from "react";

// Animação CSS para piscar lentamente
const blinkAnimation = `
  @keyframes slowBlink {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.3;
    }
  }
  .slow-blink-animation {
    animation: slowBlink 2s ease-in-out infinite;
  }
`;

export function ContinueScrollingHint() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Se foi fechado, não faz nada
    if (isDismissed) {
      return;
    }

    const resetTimer = () => {
      // Limpa o timeout anterior se existir
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      // Esconde o texto imediatamente quando há scroll
      setIsVisible(false);

      // Verifica se está na capa (primeira tela)
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const isInCover = scrollY < viewportHeight;

      // Verifica se está no footer
      const footerElement = document.querySelector("footer");
      let isInFooter = false;
      if (footerElement) {
        const footerRect = footerElement.getBoundingClientRect();
        // Verifica se o footer está visível na viewport
        isInFooter = footerRect.top < viewportHeight && footerRect.bottom > 0;
      }

      // Verifica se está no final da página (fallback)
      const isAtBottom =
        window.innerHeight + scrollY >=
        document.documentElement.scrollHeight - 100;

      // Só mostra o hint se não estiver na capa nem no footer
      if (!isInCover && !isInFooter && !isAtBottom) {
        // Inicia um novo timer de 3 segundos
        timeoutRef.current = setTimeout(() => {
          setIsVisible(true);
        }, 3000);
      }
    };

    // Usa requestAnimationFrame para melhor performance
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          resetTimer();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    // Inicia o timer inicial após 3 segundos se não houver scroll
    const initialScrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const isInCover = initialScrollY < viewportHeight;

    // Verifica se está no footer
    const footerElement = document.querySelector("footer");
    let isInFooter = false;
    if (footerElement) {
      const footerRect = footerElement.getBoundingClientRect();
      isInFooter = footerRect.top < viewportHeight && footerRect.bottom > 0;
    }

    // Verifica se está no final da página (fallback)
    const isAtBottom =
      window.innerHeight + initialScrollY >=
      document.documentElement.scrollHeight - 100;

    if (!isInCover && !isInFooter && !isAtBottom) {
      timeoutRef.current = setTimeout(() => {
        setIsVisible(true);
      }, 3000);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isDismissed]);

  useEffect(() => {
    // Adiciona a animação CSS ao documento
    const styleId = "continue-scrolling-hint-style";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = blinkAnimation;
      document.head.appendChild(style);
    }

    return () => {
      // Remove o style quando o componente é desmontado
      const style = document.getElementById(styleId);
      if (style) {
        style.remove();
      }
    };
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  // Se foi fechado, não renderiza nada
  if (isDismissed) {
    return null;
  }

  return (
    <div
      className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-[9999] transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex items-center gap-2">
        <p className="text-black text-base font-normal slow-blink-animation">
          Continue descendo
        </p>
        <button
          type="button"
          onClick={handleDismiss}
          className={`flex h-5 w-5 shrink-0 items-center justify-center text-black text-lg font-normal leading-none hover:opacity-70 transition-opacity focus:outline-none ${
            isVisible ? "pointer-events-auto" : "pointer-events-none"
          }`}
          aria-label="Fechar"
        >
          ×
        </button>
      </div>
    </div>
  );
}
