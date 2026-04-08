"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

interface SortDropdownProps {
  onSortChange: (sortBy: "newest" | "oldest") => void;
  currentSort: "newest" | "oldest";
}

export function SortDropdown({ onSortChange, currentSort }: SortDropdownProps) {
  const sortOptions = [
    { value: "newest" as const, label: "Mais recentes" },
    { value: "oldest" as const, label: "Menos recentes" },
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
      {currentOption?.label || "Mais recentes"}
      <ArrowUpDown className="h-4 w-4" />
    </Button>
  );
}
