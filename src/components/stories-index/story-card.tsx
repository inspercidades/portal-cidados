"use client";

import Image from "next/image";
import {
  type PointerEvent,
  type RefObject,
  useEffect,
  useRef,
  useState,
  type WheelEvent,
} from "react";
import type { StoryListing } from "@/lib/data/stories";
import { STORIES_MOBILE_QUERY } from "./use-story-focus";

const FRAME_INTERVAL_MS = 500;

type StoryCardProps = {
  story: StoryListing;
  cardRef: RefObject<HTMLDivElement | null>;
  onWheel: (event: WheelEvent<HTMLDivElement>) => void;
};

function cardTransform(x: number, y: number) {
  return `translate(${x}px, calc(-50% + ${y}px))`;
}

function isLocalAsset(src: string) {
  return (
    src.startsWith("/assets/") && !src.includes("..") && !src.includes("\\")
  );
}

export function StoryCard({ story, cardRef, onWheel }: StoryCardProps) {
  const dragRef = useRef({
    active: false,
    startX: 0,
    startY: 0,
    baseX: 0,
    baseY: 0,
    x: 0,
    y: 0,
  });

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (window.matchMedia(STORIES_MOBILE_QUERY).matches) return;
    const drag = dragRef.current;
    drag.active = true;
    drag.startX = event.clientX;
    drag.startY = event.clientY;
    drag.baseX = drag.x;
    drag.baseY = drag.y;
    event.currentTarget.dataset.dragging = "true";
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag.active) return;
    drag.x = drag.baseX + (event.clientX - drag.startX);
    drag.y = drag.baseY + (event.clientY - drag.startY);
    event.currentTarget.style.transform = cardTransform(drag.x, drag.y);
  };

  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    dragRef.current.active = false;
    delete event.currentTarget.dataset.dragging;
  };

  return (
    <div
      ref={cardRef}
      data-lenis-prevent
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onWheel={onWheel}
      style={{ transform: cardTransform(dragRef.current.x, dragRef.current.y) }}
      className="absolute top-1/2 right-[6vw] z-40 w-[min(420px,32vw)] cursor-grab touch-none shadow-[0_30px_80px_rgba(0,0,0,0.22)] data-[dragging=true]:cursor-grabbing max-[860px]:top-auto max-[860px]:right-0 max-[860px]:bottom-0 max-[860px]:left-0 max-[860px]:w-full max-[860px]:transform-none! max-[860px]:bg-background max-[860px]:px-[5vw] max-[860px]:py-4 max-[860px]:shadow-[0_-14px_30px_rgba(0,0,0,0.16)]"
    >
      <CardMedia key={story.href} images={story.images} alt={story.title} />
    </div>
  );
}

function CardMedia({
  images,
  alt,
}: {
  images: readonly string[];
  alt: string;
}) {
  const frames = images.filter(isLocalAsset);
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (frames.length <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = setInterval(
      () => setFrame((current) => (current + 1) % frames.length),
      FRAME_INTERVAL_MS,
    );
    return () => clearInterval(timer);
  }, [frames.length]);

  if (!frames.length) return null;

  return (
    <div className="pointer-events-none relative aspect-[4/3] w-full overflow-hidden max-[860px]:aspect-auto max-[860px]:h-[140px]">
      {frames.map((src, index) => (
        <Image
          key={src}
          src={src}
          alt={index === 0 ? alt : ""}
          fill
          sizes="(max-width: 860px) 100vw, 420px"
          draggable={false}
          className={`object-cover ${index === frame ? "opacity-100" : "opacity-0"}`}
        />
      ))}
    </div>
  );
}
