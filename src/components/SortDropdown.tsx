"use client";

import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { chrome } from "@/i18n/messages/chrome";
import { useLocale } from "@/i18n/use-locale";

interface SortDropdownProps {
  onSortChange: (sortBy: "newest" | "oldest") => void;
  currentSort: "newest" | "oldest";
}

export function SortDropdown({ onSortChange, currentSort }: SortDropdownProps) {
  const copy = chrome[useLocale()].catalog;
  const sortOptions = [
    { value: "newest" as const, label: copy.newest },
    { value: "oldest" as const, label: copy.oldest },
  ];

  const currentOption = sortOptions.find(
    (option) => option.value === currentSort,
  );

  const handleToggle = () => {
    const newSort = currentSort === "newest" ? "oldest" : "newest";
    onSortChange(newSort);
  };

  return (
    <Button
      variant="default"
      onClick={handleToggle}
      className="flex items-center gap-2 h-12 bg-background-2 text-foreground hover:bg-background-2 hover:cursor-pointer"
    >
      {currentOption?.label || copy.newest}
      <ArrowUpDown className="h-4 w-4" />
    </Button>
  );
}
