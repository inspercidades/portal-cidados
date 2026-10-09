"use client";

import { useRouter } from "next/navigation";
import {
  type KeyboardEvent,
  useEffect,
  useMemo,
  useRef,
  type WheelEvent,
} from "react";
import { getStoryListings, isInternalStoryHref } from "@/lib/data/stories";
import { playClickSound, unlockClickSound } from "./click-sound";
import { StoryCard } from "./story-card";
import { StoryList } from "./story-list";
import { useStoryFocus } from "./use-story-focus";

const UNLOCK_EVENTS = [
  "pointerdown",
  "touchstart",
  "touchend",
  "keydown",
  "click",
  "wheel",
] as const;

export function StoriesIndex() {
  const router = useRouter();
  const stories = useMemo(() => getStoryListings(), []);
  const count = stories.length;
  const { activeIndex, scrollerRef, listRef, cardRef, rowRefs, centerRow } =
    useStoryFocus(count);
  const story = stories[activeIndex];

  useEffect(() => {
    for (const type of UNLOCK_EVENTS) {
      window.addEventListener(type, unlockClickSound, { passive: true });
    }
    return () => {
      for (const type of UNLOCK_EVENTS) {
        window.removeEventListener(type, unlockClickSound);
      }
    };
  }, []);

  const previousIndexRef = useRef(activeIndex);
  useEffect(() => {
    if (previousIndexRef.current === activeIndex) return;
    previousIndexRef.current = activeIndex;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    playClickSound();
  }, [activeIndex]);

  const openStory = (href: string) => {
    if (isInternalStoryHref(href)) router.push(href);
  };

  const handleRowClick = (index: number) => {
    const selected = stories[index];
    if (!selected) return;
    if (index === activeIndex) openStory(selected.href);
    else centerRow(index);
  };

  const handleListKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    const next = Math.min(
      count - 1,
      Math.max(0, activeIndex + (event.key === "ArrowDown" ? 1 : -1)),
    );
    rowRefs.current[next]
      ?.querySelector("button")
      ?.focus({ preventScroll: true });
    centerRow(next);
  };

  const handleCardWheel = (event: WheelEvent<HTMLButtonElement>) => {
    const lineHeight = event.deltaMode === 1 ? 16 : 1;
    scrollerRef.current?.scrollBy({ top: event.deltaY * lineHeight });
  };

  if (!count || !story) return null;

  return (
    <div className="relative min-h-0 flex-1 bg-background">
      <div
        ref={scrollerRef}
        data-lenis-prevent
        className="absolute inset-0 overflow-y-auto [overflow-anchor:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <StoryList
          stories={stories}
          activeIndex={activeIndex}
          listRef={listRef}
          rowRefs={rowRefs}
          onRowClick={handleRowClick}
          onRowFocus={centerRow}
          onKeyDown={handleListKeyDown}
        />
      </div>

      <StoryCard
        story={story}
        cardRef={cardRef}
        onOpen={() => openStory(story.href)}
        onWheel={handleCardWheel}
      />
    </div>
  );
}
