"use client";

import { Map as MapIcon, Menu } from "lucide-react";
import Link from "next/link";
import { LanguageSwitch } from "@/components/language-switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { chrome } from "@/i18n/messages/chrome";
import { useLocale, useLocaleHref } from "@/i18n/use-locale";
import { NAV_ITEMS } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { BASE_MAP_IDS, type BaseMapId } from "../lib/base-maps";
import { ControlTooltip, MAP_SURFACE, MapIconButton } from "./map-control";

/**
 * Menu do site, ancorado no botão. O geoportal não tem header: a navegação e o
 * idioma ficam aqui. Projetos externos (Observatório) ficam fora, como no design.
 */
export function SiteMenuControl() {
  const lang = useLocale();
  const hrefFor = useLocaleHref();
  const nav = chrome[lang].nav;
  const label = chrome[lang].maps.siteMenu;

  return (
    <DropdownMenu>
      <ControlTooltip label={label}>
        <DropdownMenuTrigger asChild>
          <MapIconButton aria-label={label}>
            <Menu aria-hidden />
          </MapIconButton>
        </DropdownMenuTrigger>
      </ControlTooltip>
      <DropdownMenuContent
        side="bottom"
        align="end"
        sideOffset={8}
        className={cn(MAP_SURFACE, "min-w-52 rounded-[4px]")}
      >
        {NAV_ITEMS.filter((item) => item.href).map((item) => (
          <DropdownMenuItem
            key={item.id}
            asChild
            className={cn(
              "h-9 rounded-[4px]",
              item.id === "maps" && "font-semibold",
            )}
          >
            <Link
              href={hrefFor(item.href as string)}
              aria-current={item.id === "maps" ? "page" : undefined}
            >
              {nav[item.id]}
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        {/* Idioma é controle, não destino: fica fora dos itens do menu. */}
        <div className="flex items-center justify-between gap-3 px-2 py-1.5">
          <span className="text-xs text-muted-foreground">{nav.language}</span>
          <LanguageSwitch />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function BaseMapMenu({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: BaseMapId) => void;
}) {
  const copy = chrome[useLocale()].maps;

  return (
    <DropdownMenu>
      <ControlTooltip label={copy.baseMap}>
        <DropdownMenuTrigger asChild>
          <MapIconButton aria-label={copy.baseMap}>
            <MapIcon aria-hidden />
          </MapIconButton>
        </DropdownMenuTrigger>
      </ControlTooltip>
      <DropdownMenuContent
        side="left"
        align="start"
        sideOffset={8}
        className={cn(MAP_SURFACE, "min-w-36 rounded-[4px]")}
      >
        <DropdownMenuLabel>{copy.baseMap}</DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={(next) => onChange(next as BaseMapId)}
        >
          {BASE_MAP_IDS.map((id) => (
            <DropdownMenuRadioItem
              key={id}
              value={id}
              className="h-9 rounded-[4px]"
            >
              {copy[id]}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
