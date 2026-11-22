"use client";

import { ChevronDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { chrome } from "@/i18n/messages/chrome";
import { useLocale } from "@/i18n/use-locale";
import { cn } from "@/lib/utils";
import { CITIES } from "../lib/cities";
import { MAP_SURFACE } from "./map-control";

const keepOpen = (event: Event) => event.preventDefault();

/**
 * Primeira tela do mapa: as camadas são por cidade, então a escolha vem antes
 * de tudo. Não fecha por Esc nem por clique fora; links com `?city=` pulam o
 * passo.
 */
export function CityPickerDialog({
  open,
  onPick,
}: {
  open: boolean;
  onPick: (city: string) => void;
}) {
  const copy = chrome[useLocale()].maps;

  return (
    <Dialog open={open}>
      <DialogContent
        showCloseButton={false}
        onEscapeKeyDown={keepOpen}
        onPointerDownOutside={keepOpen}
        onInteractOutside={keepOpen}
        className={cn(MAP_SURFACE, "gap-0 p-6 shadow-xl sm:max-w-lg md:p-8")}
      >
        <DialogTitle className="font-gt-ultra text-2xl font-normal">
          {copy.chooseCity}
        </DialogTitle>
        <DialogDescription className="mt-2 text-sm text-muted-foreground">
          {copy.chooseCityDescription}
        </DialogDescription>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {CITIES.map((city) => (
            <button
              key={city.name}
              type="button"
              onClick={() => onPick(city.name)}
              className="flex h-28 cursor-pointer items-center justify-center border border-border bg-background p-4 text-base font-semibold outline-none transition-colors hover:border-foreground hover:bg-accent focus-visible:border-foreground focus-visible:ring-2 focus-visible:ring-ring"
            >
              {city.name}
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

/** Cidade atual, sobre o mapa; abre a lista para trocar. */
export function CityMenu({
  city,
  onChange,
}: {
  city: string;
  onChange: (city: string) => void;
}) {
  const copy = chrome[useLocale()].maps;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={`${copy.city}: ${city}`}
        className="flex h-10 cursor-pointer items-center gap-2 rounded-[8px] border border-border bg-background px-3 text-sm font-medium shadow-md outline-none transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring data-[state=open]:bg-accent"
      >
        {city}
        <ChevronDown className="size-4 text-muted-foreground" aria-hidden />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        sideOffset={6}
        className={cn(MAP_SURFACE, "min-w-48 rounded-[8px]")}
      >
        <DropdownMenuRadioGroup value={city} onValueChange={onChange}>
          {CITIES.map((option) => (
            <DropdownMenuRadioItem
              key={option.name}
              value={option.name}
              className="h-9 rounded-[6px]"
            >
              {option.name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
