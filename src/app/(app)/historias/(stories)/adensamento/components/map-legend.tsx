"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { LegendType } from "./map-config";

interface LegendItem {
  label: string;
  color: string;
}

const DENSITY_POP: LegendItem[] = [
  { label: "0.0 – 42.4", color: "#D1F1EA" },
  { label: "42.4 – 87.0", color: "#ABE6D6" },
  { label: "87.0 – 119.1", color: "#86DCC1" },
  { label: "119.1 – 147.8", color: "#81D9BE" },
  { label: "147.8 – 179.8", color: "#7ED6BA" },
  { label: "179.8 – 222.6", color: "#7BD2B7" },
  { label: "222.6 – 287.3", color: "#62BB9F" },
  { label: "287.3 – 395.7", color: "#48A286" },
  { label: "395.7 – 612.7", color: "#2D896D" },
  { label: "≥ 612.7", color: "#1D7A5D" },
];

const DENSITY_CONST: LegendItem[] = [
  { label: "0.00 – 0.15", color: "#D1F1EA" },
  { label: "0.15 – 0.28", color: "#ABE6D6" },
  { label: "0.28 – 0.36", color: "#86DCC1" },
  { label: "0.36 – 0.44", color: "#81D9BE" },
  { label: "0.44 – 0.52", color: "#7ED6BA" },
  { label: "0.52 – 0.67", color: "#7BD2B7" },
  { label: "0.67 – 1.15", color: "#62BB9F" },
  { label: "1.15 – 2.23", color: "#48A286" },
  { label: "2.23 – 3.90", color: "#2D896D" },
  { label: "> 3.90", color: "#1D7A5D" },
];

interface LegendGroup {
  title: string;
  subtitle?: string;
  items: { label: string; color: string }[];
}

const LEGENDS: Record<Exclude<LegendType, null>, LegendGroup> = {
  "density-pop": {
    title: "Densidade Populacional",
    subtitle: "Habitantes/Hectare",
    items: DENSITY_POP,
  },
  "density-const": {
    title: "Densidade Construtiva",
    subtitle: "M² construído/M² terreno",
    items: DENSITY_CONST,
  },
  eetu: {
    title: "Zonas de Estruturação Urbana",
    items: [
      { label: "EETU", color: "#61D6B2" },
      { label: "Metrô / Trem", color: "#E53935" },
      { label: "Corredor de Ônibus", color: "#FFB300" },
    ],
  },
  informal: {
    title: "População em áreas sem registro do IPTU",
    items: [
      { label: "Favelas e Loteamentos irregulares", color: "#61D6B2" },
      { label: "Pessoas fora do cadastro IPTU", color: "#E53935" },
      // { label: "Pessoas dentro do cadastro IPTU", color: "#9E9E9E" },
    ],
  },
};

interface MapLegendProps {
  type: LegendType;
}

export function MapLegend({ type }: MapLegendProps) {
  const [collapsed, setCollapsed] = useState(false);

  if (!type) return null;

  const config = LEGENDS[type];
  if (!config) return null;

  return (
    <div className="absolute top-4 right-4 z-20 rounded-lg bg-white/90 shadow-lg backdrop-blur-sm max-w-[220px] text-sm">
      <button
        type="button"
        onClick={() => setCollapsed((c) => !c)}
        className="flex w-full items-start justify-between gap-2 p-4 cursor-pointer"
      >
        <div className="text-left">
          <h3 className="font-semibold text-base leading-tight">
            {config.title}
          </h3>
          {config.subtitle && (
            <p className="text-sm italic text-gray-500 leading-tight mt-0.5">
              {config.subtitle}
            </p>
          )}
        </div>
        <ChevronDown
          className={`mt-0.5 w-4 h-4 shrink-0 text-gray-500 transition-transform duration-300 ${collapsed ? "-rotate-90" : ""}`}
        />
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${collapsed ? "grid-rows-[0fr]" : "grid-rows-[1fr]"}`}
      >
        <div className="overflow-hidden">
          <ul className="space-y-1 px-4 pb-4">
            {config.items.map((item) => (
              <li key={item.label} className="flex items-center gap-2">
                <span
                  className="w-5 h-5 rounded-sm shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm leading-tight">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
