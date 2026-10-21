"use client";

import { X, ZoomIn } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type ZoomableVideoProps = {
  src: string;
  className?: string;
};

export default function ZoomableVideo({ src, className }: ZoomableVideoProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    if (!isZoomed) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsZoomed(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isZoomed]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsZoomed(true)}
        className="relative group block w-full cursor-zoom-in"
        aria-label="Ampliar vídeo"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className={className}
          src={src}
        />
        <span
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-xl bg-black/50 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden="true"
        >
          <ZoomIn className="w-8 h-8" />
          <span className="text-sm font-medium">Clique para ampliar</span>
        </span>
      </button>

      {isZoomed &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 cursor-zoom-out"
            onClick={() => setIsZoomed(false)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setIsZoomed(false);
            }}
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              onClick={() => setIsZoomed(false)}
              className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors cursor-pointer"
              aria-label="Fechar"
            >
              <X className="w-8 h-8" />
            </button>
            <video
              autoPlay
              loop
              muted
              playsInline
              className="max-h-[90vh] max-w-full rounded-xl object-contain cursor-default"
              src={src}
              onClick={(e) => e.stopPropagation()}
            />
          </div>,
          document.body,
        )}
    </>
  );
}
