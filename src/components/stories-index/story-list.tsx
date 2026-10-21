"use client";

import type { KeyboardEvent, RefObject } from "react";
import type { StoryListing } from "@/lib/data/stories";

type StoryListProps = {
  stories: readonly StoryListing[];
  activeIndex: number;
  listRef: RefObject<HTMLUListElement | null>;
  rowRefs: RefObject<(HTMLLIElement | null)[]>;
  onRowClick: (index: number) => void;
  onRowFocus: (index: number) => void;
  onKeyDown: (event: KeyboardEvent<HTMLUListElement>) => void;
};

export function StoryList({
  stories,
  activeIndex,
  listRef,
  rowRefs,
  onRowClick,
  onRowFocus,
  onKeyDown,
}: StoryListProps) {
  return (
    <ul
      ref={listRef}
      aria-label="Histórias"
      onKeyDown={onKeyDown}
      className="px-[5vw] py-[20vh] min-[861px]:pr-[calc(min(420px,32vw)_+_6vw_+_2rem)] min-[861px]:pl-8 lg:pl-12"
    >
      {stories.map((item, index) => {
        const isActive = index === activeIndex;

        return (
          <li
            key={item.href}
            ref={(element) => {
              rowRefs.current[index] = element;
            }}
          >
            <button
              type="button"
              onClick={() => onRowClick(index)}
              onFocus={(event) => {
                if (event.currentTarget.matches(":focus-visible")) {
                  onRowFocus(index);
                }
              }}
              aria-current={isActive ? "true" : undefined}
              className="group/row flex w-full cursor-pointer items-center gap-4 py-5 text-left outline-none select-none [-webkit-tap-highlight-color:transparent]"
            >
              <span
                className={`min-w-0 font-inter text-[clamp(2.5rem,9vw,3.7rem)] leading-[1.08] font-medium tracking-[-0.03em] wrap-anywhere transition-colors duration-300 group-focus-visible/row:underline group-focus-visible/row:decoration-2 group-focus-visible/row:underline-offset-8 max-[860px]:text-[clamp(1.8rem,7.5vw,2.5rem)] ${
                  isActive
                    ? "text-foreground"
                    : "text-foreground/25 group-hover/row:text-foreground/40"
                }`}
              >
                {item.title}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
