"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

const CHECK_PATH = "M4.25 9.25 L7.25 12.25 L13.75 5.75";

type CatalogCheckboxProps = ComponentPropsWithoutRef<
  typeof CheckboxPrimitive.Root
>;

/** Checkbox do catálogo: fill + traço no estilo do clone (sem motion). */
export function CatalogCheckbox({ className, ...props }: CatalogCheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      data-slot="catalog-checkbox"
      className={cn(
        "catalog-check group relative grid size-5 shrink-0 place-items-center border-0 bg-transparent p-0 text-background outline-none",
        "cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <span
        className="catalog-check-visual relative block size-4 border border-border bg-background"
        aria-hidden
      >
        <span className="catalog-check-fill absolute inset-[-1px] bg-foreground" />
        {/* biome-ignore lint/a11y/noSvgWithoutTitle: traço decorativo; o estado vem do checkbox Radix */}
        <svg
          className="catalog-check-mark absolute inset-[-1px] size-4 overflow-visible"
          viewBox="0 0 18 18"
          fill="none"
          focusable="false"
          aria-hidden
        >
          <path
            d={CHECK_PATH}
            stroke="currentColor"
            strokeWidth={1.75}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </CheckboxPrimitive.Root>
  );
}
