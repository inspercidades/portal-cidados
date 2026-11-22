"use client";

import { Search, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { chrome } from "@/i18n/messages/chrome";
import { useLocale } from "@/i18n/use-locale";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
  value?: string;
  className?: string;
}

export function SearchBar({
  onSearch,
  placeholder,
  value = "",
  className,
}: SearchBarProps) {
  const lang = useLocale();
  const copy = chrome[lang].catalog;
  const resolvedPlaceholder = placeholder ?? copy.search;
  const [searchTerm, setSearchTerm] = useState(value);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const id = useId();

  useEffect(() => {
    setSearchTerm(value);
  }, [value]);

  const clear = () => {
    setSearchTerm("");
    onSearch("");
    inputRef.current?.focus();
  };

  const active = focused || Boolean(searchTerm);

  return (
    <div className={cn("min-w-0", className)}>
      <label htmlFor={id} className="sr-only">
        {resolvedPlaceholder}
      </label>
      <div className="flex h-9 items-center gap-2">
        <Search
          className={cn(
            "size-[18px] shrink-0 transition-colors",
            active ? "text-foreground" : "text-muted-foreground",
          )}
          aria-hidden
        />
        <input
          ref={inputRef}
          id={id}
          type="search"
          placeholder={resolvedPlaceholder}
          value={searchTerm}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            onSearch(e.target.value);
          }}
          className="min-w-0 flex-1 border-0 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground [&::-webkit-search-cancel-button]:hidden"
        />
        <span className="grid size-6 shrink-0 place-items-center">
          {searchTerm ? (
            <button
              type="button"
              onClick={clear}
              aria-label={copy.clearSearch}
              className="grid size-6 place-items-center text-muted-foreground transition-colors hover:bg-foreground/6 hover:text-foreground"
            >
              <X className="size-4" aria-hidden />
            </button>
          ) : null}
        </span>
      </div>
    </div>
  );
}
