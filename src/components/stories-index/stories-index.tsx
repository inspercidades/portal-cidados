"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { RisingText } from "@/components/rising-text";
import { chrome } from "@/i18n/messages/chrome";
import { listingCopy } from "@/i18n/messages/listings";
import { localeHref } from "@/i18n/routing";
import { useLocale } from "@/i18n/use-locale";
import {
  getStoryListings,
  type StoryListing,
  storySlug,
} from "@/lib/data/stories";
import {
  isPlainClick,
  navigateWithHero,
  readRememberedStory,
  STORY_CARD_ATTR,
} from "@/lib/story-transition";

const CARD_GAP_PX = 12;
/** A história ativa para na segunda posição, contando da esquerda. */
const FOCUS_SLOT = 1;
const LOOPS = 5;
const MIDDLE_LOOP = 2;
const SETTLE_MS = 180;
const SWIPE_MIN_PX = 40;

const wrapIndex = (index: number, count: number) =>
  ((index % count) + count) % count;

type IndexStory = StoryListing & {
  title: string;
  subtitle: string;
  slug: string;
};

export function StoriesIndex() {
  const lang = useLocale();
  const router = useRouter();
  const copy = chrome[lang].storiesIndex;

  const stories = useMemo<IndexStory[]>(
    () =>
      getStoryListings().map((story) => {
        const text = listingCopy(lang, story.id);
        return {
          ...story,
          title: text.title,
          subtitle: text.subtitle ?? "",
          slug: storySlug(story.href),
        };
      }),
    [lang],
  );
  const count = stories.length;

  const slides = useMemo(
    () =>
      Array.from({ length: LOOPS * count }, (_, position) => {
        const index = position % count;
        const anchor = MIDDLE_LOOP * count;
        return {
          story: stories[index],
          index,
          isCopy: position < anchor || position >= anchor + count,
        };
      }),
    [stories, count],
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const story = stories[activeIndex];
  const [layout, setLayout] = useState({ panelHeight: 0, scrollStep: 0 });

  const scrollerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const firstCardRef = useRef<HTMLAnchorElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const stepRef = useRef(0);
  const activeIndexRef = useRef(activeIndex);

  const syncToScroll = useCallback(() => {
    const scroller = scrollerRef.current;
    const track = trackRef.current;
    const step = stepRef.current;
    if (!scroller || !track || !step || !count) return;

    const loopProgress =
      (((scroller.scrollTop / step) % count) + count) % count;
    track.style.transform = `translate3d(${(FOCUS_SLOT - MIDDLE_LOOP * count - loopProgress) * step}px, 0, 0)`;

    const nearest = Math.round(loopProgress) % count;
    if (nearest !== activeIndexRef.current) {
      activeIndexRef.current = nearest;
      setActiveIndex(nearest);
    }
  }, [count]);

  const recenter = useCallback(() => {
    const scroller = scrollerRef.current;
    const step = stepRef.current;
    if (!scroller || !step || !count) return;
    const loop = count * step;
    const within = ((scroller.scrollTop % loop) + loop) % loop;
    const target = MIDDLE_LOOP * loop + within;
    if (Math.abs(target - scroller.scrollTop) > 0.5)
      scroller.scrollTop = target;
  }, [count]);

  const measure = useCallback(() => {
    const scroller = scrollerRef.current;
    const card = firstCardRef.current;
    if (!scroller || !card) return;
    const gap = trackRef.current
      ? Number.parseFloat(getComputedStyle(trackRef.current).columnGap)
      : Number.NaN;
    const step =
      card.getBoundingClientRect().width +
      (Number.isFinite(gap) ? gap : CARD_GAP_PX);
    stepRef.current = step;
    setLayout((current) =>
      current.panelHeight === scroller.clientHeight &&
      current.scrollStep === step
        ? current
        : { panelHeight: scroller.clientHeight, scrollStep: step },
    );
  }, []);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller || !layout.scrollStep) return;
    scroller.scrollTop =
      (MIDDLE_LOOP * count + activeIndexRef.current) * layout.scrollStep;
    syncToScroll();
  }, [layout, count, syncToScroll]);

  const restoredRef = useRef(false);
  useLayoutEffect(() => {
    if (restoredRef.current || !layout.scrollStep) return;
    restoredRef.current = true;
    const slug = readRememberedStory();
    const index = slug ? stories.findIndex((item) => item.slug === slug) : -1;
    if (index < 0) return;
    activeIndexRef.current = index;
    setActiveIndex(index);
    const scroller = scrollerRef.current;
    if (scroller) {
      scroller.scrollTop = (MIDDLE_LOOP * count + index) * layout.scrollStep;
    }
    syncToScroll();
  }, [layout, count, stories, syncToScroll]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    const card = firstCardRef.current;
    if (!scroller || !card) return;
    let frame = 0;
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    });
    observer.observe(scroller);
    observer.observe(card);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [measure]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        syncToScroll();
      });
    };
    let settleTimer: ReturnType<typeof setTimeout> | null = null;
    const onScrollSettled = () => {
      if (settleTimer) clearTimeout(settleTimer);
      settleTimer = setTimeout(recenter, SETTLE_MS);
    };
    scroller.addEventListener("scroll", onScroll, { passive: true });
    scroller.addEventListener("scroll", onScrollSettled, { passive: true });
    return () => {
      scroller.removeEventListener("scroll", onScroll);
      scroller.removeEventListener("scroll", onScrollSettled);
      if (settleTimer) clearTimeout(settleTimer);
      cancelAnimationFrame(frame);
    };
  }, [syncToScroll, recenter]);

  const goTo = useCallback(
    (index: number) => {
      const scroller = scrollerRef.current;
      const step = stepRef.current;
      if (!scroller || !step || !count) return;
      const base = Math.round(scroller.scrollTop / step);
      const current = ((base % count) + count) % count;
      let delta = (((index - current) % count) + count) % count;
      if (delta > count / 2) delta -= count;
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      scroller.scrollTo({
        top: (base + delta) * step,
        behavior: reduceMotion ? "auto" : "smooth",
      });
    },
    [count],
  );

  const openStory = (index: number, media: HTMLElement | null) => {
    const selected = stories[index];
    if (!selected) return;
    const href = localeHref(lang, selected.href);
    if (navigateWithHero(router.push, href, selected.slug, media)) return;
    router.push(href);
  };

  const handleCardClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    index: number,
    isCopy: boolean,
  ) => {
    if (isCopy || index !== activeIndexRef.current) {
      event.preventDefault();
      goTo(index);
      return;
    }
    if (!isPlainClick(event)) return;
    const media = event.currentTarget.firstElementChild as HTMLElement | null;
    const href = localeHref(lang, stories[index].href);
    if (navigateWithHero(router.push, href, stories[index].slug, media)) {
      event.preventDefault();
    }
  };

  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const handleTouchStart = (event: React.TouchEvent) => {
    const touch = event.touches[0];
    touchStartRef.current = touch
      ? { x: touch.clientX, y: touch.clientY }
      : null;
  };
  const handleTouchEnd = (event: React.TouchEvent) => {
    const start = touchStartRef.current;
    const touch = event.changedTouches[0];
    touchStartRef.current = null;
    if (!start || !touch) return;
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) < SWIPE_MIN_PX || Math.abs(dx) < Math.abs(dy)) return;
    goTo(wrapIndex(activeIndexRef.current + (dx < 0 ? 1 : -1), count));
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const forward = event.key === "ArrowRight" || event.key === "ArrowDown";
    const backward = event.key === "ArrowLeft" || event.key === "ArrowUp";
    if (!forward && !backward) return;
    event.preventDefault();
    const next = wrapIndex(activeIndexRef.current + (forward ? 1 : -1), count);
    cardRefs.current[next]?.focus({ preventScroll: true });
    goTo(next);
  };

  if (!count || !story) return null;

  const scrollLength = layout.scrollStep
    ? layout.panelHeight + LOOPS * count * layout.scrollStep
    : undefined;
  const placeLabel = [story.location, story.period].filter(Boolean).join(" · ");

  return (
    <div className="relative min-h-0 flex-1 bg-background">
      <div
        ref={scrollerRef}
        data-lenis-prevent
        className="absolute inset-0 overflow-y-auto snap-y snap-mandatory [overflow-anchor:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div
          className="relative"
          style={{
            height: scrollLength ?? `calc(100% + ${(count - 1) * 50}vh)`,
          }}
        >
          {layout.scrollStep > 0 &&
            Array.from({ length: LOOPS * count }, (_, position) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: um marcador por passo de rolagem, sem identidade própria
                key={position}
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 h-px snap-start"
                style={{ top: position * layout.scrollStep }}
              />
            ))}

          <div
            className="sticky top-0 flex flex-col justify-center overflow-hidden px-4 pb-64 md:px-8 lg:px-12 [--card-w:77vw] [--card-gap:8px] md:[--card-w:min(calc((100vw-4rem)/3.6),calc(100dvh-26rem))] md:[--card-gap:12px] lg:[--card-w:min(calc((100vw-6rem)/3.6),calc(100dvh-26rem))]"
            style={{ height: layout.panelHeight || "calc(100dvh - 6rem)" }}
          >
            <div className="relative -ml-[calc(var(--card-w)+var(--card-gap)-1.25rem)] md:-ml-[calc(var(--card-w)*0.5)]">
              <ul
                ref={trackRef}
                aria-label={copy.listLabel}
                onKeyDown={handleKeyDown}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                className="flex list-none gap-(--card-gap) will-change-transform"
              >
                {slides.map(({ story: item, index, isCopy }, position) => {
                  if (!item) return null;
                  const isActive = !isCopy && index === activeIndex;
                  return (
                    <li
                      key={`${position}-${item.href}`}
                      aria-hidden={isCopy || undefined}
                      className="shrink-0"
                    >
                      <Link
                        href={localeHref(lang, item.href)}
                        ref={
                          isCopy
                            ? undefined
                            : (element) => {
                                cardRefs.current[index] = element;
                                if (index === 0) firstCardRef.current = element;
                              }
                        }
                        tabIndex={isCopy ? -1 : undefined}
                        onClick={(event) =>
                          handleCardClick(event, index, isCopy)
                        }
                        onFocus={(event) => {
                          if (
                            !isCopy &&
                            event.currentTarget.matches(":focus-visible")
                          ) {
                            goTo(index);
                          }
                        }}
                        aria-label={isCopy ? undefined : item.title}
                        aria-current={isActive ? "true" : undefined}
                        className="block w-(--card-w) outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      >
                        <CardImage
                          src={item.images[0] ?? ""}
                          slug={isCopy ? undefined : item.slug}
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div className="absolute inset-x-0 top-full pt-5 pl-[calc(var(--card-w)+var(--card-gap))]">
                <div className="absolute top-5 left-[calc(var(--card-w)+var(--card-gap))] flex w-[calc(100vw-3.25rem)] items-center justify-end text-foreground md:left-[calc(3*(var(--card-w)+var(--card-gap)))] md:w-(--card-w)">
                  <button
                    type="button"
                    onClick={() => goTo(wrapIndex(activeIndex - 1, count))}
                    aria-label={copy.previousStory}
                    className="cursor-pointer p-1 transition-opacity hover:opacity-60"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => goTo(wrapIndex(activeIndex + 1, count))}
                    aria-label={copy.nextStory}
                    className="-mr-1 cursor-pointer p-1 transition-opacity hover:opacity-60"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>

                <Link
                  key={story.href}
                  href={localeHref(lang, story.href)}
                  onClick={(event) => {
                    if (!isPlainClick(event)) return;
                    event.preventDefault();
                    openStory(
                      activeIndex,
                      cardRefs.current[activeIndex]
                        ?.firstElementChild as HTMLElement | null,
                    );
                  }}
                  className="group block w-[calc(100vw-3.25rem-5rem)] md:w-(--card-w)"
                >
                  <p className="font-gt-ultra-fine text-xl leading-tight tracking-tight text-foreground lg:text-2xl">
                    <RisingText text={story.title} />
                    {story.subtitle ? (
                      <>
                        {" "}
                        <RisingText text={story.subtitle} delayMs={120} />
                      </>
                    ) : null}
                  </p>
                  {placeLabel ? (
                    <span className="mt-1 block font-inter text-xs font-normal text-foreground/45 md:text-sm">
                      <RisingText text={placeLabel} delayMs={240} />
                    </span>
                  ) : null}
                  <span className="mt-5 inline-flex items-center gap-0.5 font-inter text-xs font-semibold text-foreground md:text-sm">
                    <span className="underline-offset-4 group-hover:underline">
                      {copy.open}
                    </span>
                    <ArrowUpRight
                      className="size-3 md:size-3.5"
                      strokeWidth={2.25}
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CardImage({ src, slug }: { src: string; slug?: string }) {
  if (!src) return null;
  return (
    <div
      {...(slug ? { [STORY_CARD_ATTR]: slug } : {})}
      className="pointer-events-none relative aspect-square w-full overflow-hidden bg-muted md:aspect-[5/4]"
    >
      <Image
        src={src}
        alt=""
        fill
        sizes="(max-width: 768px) 77vw, 30vw"
        draggable={false}
        className="object-cover"
      />
    </div>
  );
}
