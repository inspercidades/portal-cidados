"use client";

import { Check, ChevronDown } from "lucide-react";
import type { CatalogSortBy } from "@/app/api/catalog/route";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { chrome } from "@/i18n/messages/chrome";
import { useLocale } from "@/i18n/use-locale";
import { cn } from "@/lib/utils";

interface SortDropdownProps {
  onSortChange: (sortBy: CatalogSortBy) => void;
  currentSort: CatalogSortBy;
}

export function SortDropdown({ onSortChange, currentSort }: SortDropdownProps) {
  const copy = chrome[useLocale()].catalog;
  const options: Array<{ value: CatalogSortBy; label: string }> = [
    { value: "newest", label: copy.newest },
    { value: "oldest", label: copy.oldest },
    { value: "az", label: copy.sortAz },
    { value: "za", label: copy.sortZa },
  ];
  const currentLabel =
    options.find((option) => option.value === currentSort)?.label ??
    copy.newest;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "inline-flex h-9 cursor-pointer items-center gap-2 border-0 bg-transparent px-3 text-sm font-normal text-muted-foreground outline-none",
          "transition-[background-color,color] hover:bg-foreground/6 hover:text-foreground",
          "data-[state=open]:bg-foreground/6 data-[state=open]:text-foreground",
          "[&[data-state=open]_svg]:rotate-180",
        )}
      >
        <span>{currentLabel}</span>
        <ChevronDown
          className="size-[15px] shrink-0 transition-transform duration-300"
          strokeWidth={1.8}
          aria-hidden
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={6}
        className="min-w-[12rem] rounded-none border p-1 shadow-md"
      >
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onSelect={() => onSortChange(option.value)}
            className="cursor-pointer gap-2.5 rounded-none"
          >
            <span className="inline-flex w-[17px] shrink-0 justify-center text-muted-foreground">
              {option.value === currentSort ? (
                <Check className="size-4" aria-hidden />
              ) : null}
            </span>
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
