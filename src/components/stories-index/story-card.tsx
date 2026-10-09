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
/** Abaixo disso o gesto é clique; acima, o card só é arrastado. */
const CLICK_THRESHOLD_PX = 6;

type StoryCardProps = {
  story: StoryListing;
  cardRef: RefObject<HTMLButtonElement | null>;
  onOpen: () => void;
  onWheel: (event: WheelEvent<HTMLButtonElement>) => void;
};

function cardTransform(x: number, y: number) {
  return `translate(${x}px, calc(-50% + ${y}px))`;
}

function isLocalAsset(src: string) {
  return (
    src.startsWith("/assets/") && !src.includes("..") && !src.includes("\\")
  );
}

export function StoryCard({ story, cardRef, onOpen, onWheel }: StoryCardProps) {
  const dragRef = useRef({
    active: false,
    moved: false,
    startX: 0,
    startY: 0,
    baseX: 0,
    baseY: 0,
    x: 0,
    y: 0,
  });

  const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.button !== 0) return;
    const drag = dragRef.current;
    drag.moved = false;
    drag.startX = event.clientX;
    drag.startY = event.clientY;
    if (window.matchMedia(STORIES_MOBILE_QUERY).matches) return;
    drag.active = true;
    drag.baseX = drag.x;
    drag.baseY = drag.y;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    const drag = dragRef.current;
    if (!drag.active) return;
    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    if (dx * dx + dy * dy <= CLICK_THRESHOLD_PX ** 2) return;
    drag.moved = true;
    drag.x = drag.baseX + dx;
    drag.y = drag.baseY + dy;
    event.currentTarget.dataset.dragging = "true";
    event.currentTarget.style.transform = cardTransform(drag.x, drag.y);
  };

  const endDrag = (event: PointerEvent<HTMLButtonElement>) => {
    dragRef.current.active = false;
    delete event.currentTarget.dataset.dragging;
  };

  const handleClick = () => {
    if (dragRef.current.moved) {
      dragRef.current.moved = false;
      return;
    }
    onOpen();
  };

  return (
    <button
      type="button"
      ref={cardRef}
      data-lenis-prevent
      aria-label={`Abrir ${story.title}`}
      onClick={handleClick}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onWheel={onWheel}
      style={{ transform: cardTransform(dragRef.current.x, dragRef.current.y) }}
      className="absolute top-1/2 right-[6vw] z-40 block w-[min(420px,32vw)] cursor-grab touch-none border-0 bg-transparent p-0 shadow-[0_30px_80px_rgba(0,0,0,0.22)] data-[dragging=true]:cursor-grabbing max-[860px]:top-auto max-[860px]:right-0 max-[860px]:bottom-0 max-[860px]:left-0 max-[860px]:w-full max-[860px]:transform-none! max-[860px]:cursor-pointer max-[860px]:bg-background max-[860px]:px-[5vw] max-[860px]:py-4 max-[860px]:shadow-[0_-14px_30px_rgba(0,0,0,0.16)]"
    >
      <CardMedia key={story.href} images={story.images} alt={story.title} />
    </button>
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
