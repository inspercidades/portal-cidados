"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

/** Abaixo desta largura o card fica preso na base e cobre parte da lista. */
export const STORIES_MOBILE_QUERY = "(max-width: 860px)";

function topWithin(element: HTMLElement, scroller: HTMLElement) {
  return (
    element.getBoundingClientRect().top -
    scroller.getBoundingClientRect().top +
    scroller.scrollTop
  );
}

/**
 * Mantém ativa a história cuja linha está mais perto do meio da área visível.
 * O respiro da lista é medido para a primeira e a última também chegarem lá.
 */
export function useStoryFocus(count: number) {
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const cardRef = useRef<HTMLButtonElement>(null);
  const rowRefs = useRef<(HTMLLIElement | null)[]>([]);
  const activeIndexRef = useRef(activeIndex);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const focusLine = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return 0;
    const card = cardRef.current;
    const covered =
      card && window.matchMedia(STORIES_MOBILE_QUERY).matches
        ? card.offsetHeight
        : 0;
    return (scroller.clientHeight - covered) / 2;
  }, []);

  const centerRow = useCallback(
    (index: number) => {
      const scroller = scrollerRef.current;
      const row = rowRefs.current[index];
      if (!scroller || !row) return;
      scroller.scrollTop =
        topWithin(row, scroller) + row.offsetHeight / 2 - focusLine();
    },
    [focusLine],
  );

  const activateCenter = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const line = scroller.getBoundingClientRect().top + focusLine();
    let best = -1;
    let bestDistance = Infinity;
    rowRefs.current.forEach((row, index) => {
      if (!row) return;
      const rect = row.getBoundingClientRect();
      const distance = Math.abs(rect.top + rect.height / 2 - line);
      if (distance < bestDistance) {
        bestDistance = distance;
        best = index;
      }
    });
    if (best >= 0) setActiveIndex(best);
  }, [focusLine]);

  const measure = useCallback(() => {
    const scroller = scrollerRef.current;
    const list = listRef.current;
    const first = rowRefs.current[0];
    const last = rowRefs.current[count - 1];
    if (!scroller || !list || !first || !last) return;

    const line = focusLine();
    const paddingTop = `${Math.max(0, line - first.offsetHeight / 2)}px`;
    const paddingBottom = `${Math.max(0, scroller.clientHeight - line - last.offsetHeight / 2)}px`;
    if (list.style.paddingTop !== paddingTop)
      list.style.paddingTop = paddingTop;
    if (list.style.paddingBottom !== paddingBottom) {
      list.style.paddingBottom = paddingBottom;
    }
    centerRow(activeIndexRef.current);
  }, [count, focusLine, centerRow]);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        activateCenter();
      });
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      scroller.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [activateCenter]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    const list = listRef.current;
    if (!scroller || !list) return;

    let timer: ReturnType<typeof setTimeout>;
    const observer = new ResizeObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(measure, 100);
    });
    observer.observe(scroller);
    observer.observe(list);
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [measure]);

  return {
    activeIndex,
    scrollerRef,
    listRef,
    cardRef,
    rowRefs,
    centerRow,
  };
}
