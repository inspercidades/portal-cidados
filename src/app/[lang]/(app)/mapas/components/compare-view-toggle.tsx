"use client";

import { ToggleGroup } from "radix-ui";
import { chrome } from "@/i18n/messages/chrome";
import { useLocale } from "@/i18n/use-locale";
import type { CompareView } from "../lib/geoportal-state";

/** Espaço entre a borda do grupo e as opções, em px. */
const INSET = 3;

/**
 * Deslizar ou lado a lado, no topo do mapa durante a comparação.
 *
 * As opções têm a mesma largura (grid de colunas iguais). Assim o destaque
 * desliza só com `transform`, uma coluna por opção, sem medir o DOM.
 */
export function CompareViewToggle({
  value,
  onChange,
}: {
  value: CompareView;
  onChange: (value: CompareView) => void;
}) {
  const copy = chrome[useLocale()].maps;
  const options: { value: CompareView; label: string }[] = [
    { value: "swipe", label: copy.compareSwipe },
    { value: "split", label: copy.compareSplit },
  ];
  const index = Math.max(
    0,
    options.findIndex((option) => option.value === value),
  );

  return (
    <ToggleGroup.Root
      type="single"
      value={value}
      // Clicar no item ativo não deixa o grupo sem valor.
      onValueChange={(next) => next && onChange(next as CompareView)}
      aria-label={copy.compareView}
      className="relative isolate inline-grid rounded-[8px] border border-border bg-background shadow-md"
      style={{
        gridTemplateColumns: `repeat(${options.length}, 1fr)`,
        padding: INSET,
      }}
    >
      <span
        aria-hidden
        className="absolute -z-10 rounded-[6px] bg-primary shadow-sm transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none"
        style={{
          top: INSET,
          bottom: INSET,
          left: INSET,
          width: `calc((100% - ${INSET * 2}px) / ${options.length})`,
          // `translateX` em % usa a largura do próprio destaque: uma coluna.
          transform: `translateX(${index * 100}%)`,
        }}
      />
      {options.map((option) => (
        <ToggleGroup.Item
          key={option.value}
          value={option.value}
          className="min-h-8 cursor-pointer whitespace-nowrap rounded-[6px] px-3 text-sm font-medium text-muted-foreground outline-none transition-colors duration-300 data-[state=off]:hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring data-[state=on]:text-primary-foreground motion-reduce:transition-none"
        >
          {option.label}
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  );
}
