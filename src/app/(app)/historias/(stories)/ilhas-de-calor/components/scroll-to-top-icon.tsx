"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

export function ScrollToTopIcon() {
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Find intro section (first section with h-screen - the cover)
      const introSection = document.querySelector("section.h-screen");
      const footerSection = document.querySelector("footer");

      if (!introSection || !footerSection) {
        // If sections not found, show after scrolling a bit
        setIsVisible(window.scrollY > 100);
        return;
      }

      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      // Get bounding rectangles (relative to viewport)
      const introRect = introSection.getBoundingClientRect();
      const footerRect = footerSection.getBoundingClientRect();

      // Check if we're past the intro section (cover) - intro bottom is above viewport top
      const pastIntro = introRect.bottom < 0;

      // Check if footer is not yet visible in viewport (footer top is below viewport bottom)
      const beforeFooter = footerRect.top > viewportHeight;

      // Check if we've scrolled enough from top
      const notAtTop = scrollY > 100;

      // Show icon only when past intro, before footer, and scrolled down
      setIsVisible(pastIntro && beforeFooter && notAtTop);
    };

    // Initial check
    handleScroll();

    // Use requestAnimationFrame for smoother performance
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    // Remove focus from button to prevent it from staying focused on mobile
    if (buttonRef.current) {
      buttonRef.current.blur();
    }

    // Force immediate scroll to absolute top on all possible containers
    window.scrollTo(0, 0);
    if (document.documentElement) {
      document.documentElement.scrollTop = 0;
    }
    if (document.body) {
      document.body.scrollTop = 0;
    }

    // Also try smooth scroll for better UX
    // But the immediate scroll above ensures we get to top even if smooth is interrupted
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    // Force visibility check immediately and after scroll
    // This ensures the icon disappears when we reach the top
    const checkVisibility = () => {
      const introSection = document.querySelector("section.h-screen");
      const footerSection = document.querySelector("footer");

      if (!introSection || !footerSection) {
        setIsVisible(window.scrollY > 100);
        return;
      }

      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const introRect = introSection.getBoundingClientRect();
      const footerRect = footerSection.getBoundingClientRect();

      const pastIntro = introRect.bottom < 0;
      const beforeFooter = footerRect.top > viewportHeight;
      const notAtTop = scrollY > 100;

      setIsVisible(pastIntro && beforeFooter && notAtTop);
    };

    // Check immediately
    checkVisibility();

    // Double-check after smooth scroll should have started
    // This handles cases where smooth scroll might not complete
    const checkAndForce = () => {
      const scrollY =
        window.scrollY ||
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      if (scrollY > 0) {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }
      // Check visibility after forcing scroll
      checkVisibility();
    };

    // Check after a few frames to ensure we're at top
    requestAnimationFrame(() => {
      checkAndForce();
      requestAnimationFrame(() => {
        checkAndForce();
        // Final visibility check
        setTimeout(checkVisibility, 100);
      });
    });
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-[9999] cursor-pointer transition-all duration-300 ease-in-out hover:opacity-75 focus:outline-none ${
        isVisible
          ? "opacity-60 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      aria-label="Voltar ao topo"
    >
      <Image
        src="/portal_cidados_icon.png"
        alt="Portal Cidadãos"
        width={80}
        height={80}
        className="object-contain"
      />
    </button>
  );
}
