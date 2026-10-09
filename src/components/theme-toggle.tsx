"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const label = "Alternar entre tema claro e escuro";

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
      aria-label={label}
      title={label}
      className={cn(
        "relative inline-flex cursor-pointer text-gray-400 transition-colors duration-300 hover:text-foreground",
        className,
      )}
    >
      <Sun
        className="size-4 rotate-90 scale-0 transition-transform ease-in-out duration-500 dark:rotate-0 dark:scale-100"
        strokeWidth={1.5}
        aria-hidden="true"
      />
      <Moon
        className="absolute size-4 rotate-0 scale-100 transition-transform duration-500 ease-in-out dark:-rotate-90 dark:scale-0"
        strokeWidth={1.5}
        aria-hidden="true"
      />
    </button>
  );
}
