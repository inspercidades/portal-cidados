"use client";

import type * as React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

/**
 * Os painéis do mapa são sempre claros, inclusive com o site no tema escuro.
 * Conteúdo em portal (tooltip, dropdown, modal) sai da árvore do geoportal e
 * precisa repetir a classe.
 */
export const MAP_SURFACE = "force-light-theme";

interface MapIconButtonProps extends React.ComponentProps<"button"> {
  active?: boolean;
}

/** Botão quadrado de 36px dos controles sobre o mapa. */
export function MapIconButton({
  active = false,
  className,
  type = "button",
  ...props
}: MapIconButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-[4px] border shadow-md outline-none transition-[background-color,box-shadow] focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-60 [&_svg]:size-4",
        active
          ? "border-primary bg-primary text-primary-foreground hover:bg-primary/90"
          : "border-border bg-background text-foreground hover:bg-accent hover:shadow-lg data-[state=open]:bg-accent",
        className,
      )}
      {...props}
    />
  );
}

interface ControlTooltipProps {
  label: string;
  side?: "left" | "right" | "top" | "bottom";
  children: React.ReactNode;
}

/** Tooltip dos controles do mapa; o filho precisa aceitar ref (botão). */
export function ControlTooltip({
  label,
  side = "left",
  children,
}: ControlTooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side={side} sideOffset={6} className={MAP_SURFACE}>
        {label}
      </TooltipContent>
    </Tooltip>
  );
}
