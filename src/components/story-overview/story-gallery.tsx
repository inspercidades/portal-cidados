"use client";

import { ArrowLeft, ArrowRight, X } from "lucide-react";
import Image from "next/image";
import {
  type CSSProperties,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { flushSync } from "react-dom";
import { chrome } from "@/i18n/messages/chrome";
import { useLocale } from "@/i18n/use-locale";
import { STORY_HERO_ATTR, STORY_REST_ATTR } from "@/lib/story-transition";

const LIGHTBOX_NAME = "story-lightbox";

function withTransition(update: () => void, named: () => HTMLElement | null) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const start = (
    document as Document & {
      startViewTransition?: (callback: () => void) => {
        ready: Promise<void>;
        finished: Promise<void>;
      };
    }
  ).startViewTransition;
  if (reduce || typeof start !== "function") {
    update();
    return;
  }

  const before = named();
  if (before) before.style.viewTransitionName = LIGHTBOX_NAME;
  const transition = start.call(document, () => {
    if (before) before.style.viewTransitionName = "";
    flushSync(update);
    const after = named();
    if (after) after.style.viewTransitionName = LIGHTBOX_NAME;
  });
  transition.ready.catch(() => {});
  const reset = () => {
    const after = named();
    if (after) after.style.viewTransitionName = "";
  };
  transition.finished.then(reset, reset);
}

function galleryTile(index: number) {
  return document.querySelector<HTMLElement>(`[data-gallery-index="${index}"]`);
}

function lightboxImage() {
  return document.querySelector<HTMLElement>("[data-lightbox-image]");
}

export function StoryGallery({
  images,
  alt,
  slug,
}: {
  images: readonly string[];
  alt: string;
  slug: string;
}) {
  const copy = chrome[useLocale()].storyOverview;
  const common = chrome[useLocale()].common;
  const [open, setOpen] = useState<number | null>(null);

  const openRef = useRef(open);
  openRef.current = open;

  const show = (index: number) =>
    withTransition(
      () => setOpen(index),
      () => galleryTile(index),
    );
  const close = useCallback(() => {
    const index = openRef.current;
    if (index === null) return;
    withTransition(
      () => setOpen(null),
      () => lightboxImage() ?? galleryTile(index),
    );
  }, []);
  const step = useCallback(
    (delta: number) =>
      setOpen((current) =>
        current === null
          ? null
          : (current + delta + images.length) % images.length,
      ),
    [images.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    const overflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = overflow;
    };
  }, [open, close, step]);

  if (!images.length) return null;

  return (
    <>
      <div
        className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 [scrollbar-width:none] md:-mx-8 md:scroll-px-8 md:px-8 lg:-mx-12 lg:scroll-px-12 lg:px-12 [&::-webkit-scrollbar]:hidden"
      >
        {images.map((src, index) => (
          <button
            key={src}
            type="button"
            onClick={() => show(index)}
            aria-label={copy.enlarge}
            data-gallery-index={index}
            {...(index === 0
              ? { [STORY_HERO_ATTR]: slug }
              : { [STORY_REST_ATTR]: "" })}
            style={{ "--rest-index": Math.max(0, index - 1) } as CSSProperties}
            className="relative block aspect-square w-[82vw] shrink-0 cursor-zoom-in snap-start overflow-hidden bg-muted min-[861px]:aspect-[4/3] min-[861px]:w-[calc((100vw-9.25rem)/4)]"
          >
            <Image
              src={src}
              alt={index === 0 ? alt : ""}
              fill
              sizes="(max-width: 860px) 82vw, 25vw"
              priority={index === 0}
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {open !== null ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          data-lenis-prevent
          onClick={close}
          onKeyDown={(event) => {
            if (event.key === "Escape") close();
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background p-4 md:p-12"
        >
          <div data-lightbox-image className="relative h-full w-full">
            <Image
              src={images[open] ?? ""}
              alt={open === 0 ? alt : ""}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              close();
            }}
            aria-label={common.close}
            className="absolute top-4 right-4 cursor-pointer p-2 text-foreground transition-opacity hover:opacity-60"
          >
            <X className="h-6 w-6" />
          </button>
          {images.length > 1 ? (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  step(-1);
                }}
                aria-label={copy.previousImage}
                className="absolute top-1/2 left-2 -translate-y-1/2 cursor-pointer p-2 text-foreground transition-opacity hover:opacity-60 md:left-4"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  step(1);
                }}
                aria-label={copy.nextImage}
                className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer p-2 text-foreground transition-opacity hover:opacity-60 md:right-4"
              >
                <ArrowRight className="h-6 w-6" />
              </button>
            </>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
