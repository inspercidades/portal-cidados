"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  Bus,
  CarFront,
  Ellipsis,
  type LucideIcon,
  Motorbike,
  PersonStanding,
} from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";
import { brandColor } from "../constants";

export interface ChartCategory {
  label: string;
  icon: string;
  value: number;
}

export interface ChartData {
  id: string;
  title: string;
  subtitle: string;
  source: string;
  yMax: number;
  step: number;
  categories: ChartCategory[];
}

const ICONS: Record<string, LucideIcon> = {
  car: CarFront,
  bus: Bus,
  motorbike: Motorbike,
  pedestrian: PersonStanding,
  other: Ellipsis,
};

const CATEGORY_ICONS = [
  "car",
  "motorbike",
  "bus",
  "pedestrian",
  "other",
] as const;

const ANIM_DURATION = 0.7;
const ANIM_EASE = "power2.inOut";

// Alinhado ao breakpoint `md` do Tailwind (768px).
const DESKTOP_MQ = "(min-width: 768px)";

// Ticks do eixo Y sempre de 10 em 10%.
const TICK_STEP = 10;

export function formatPercent(value: number): string {
  return `${value.toLocaleString("pt-BR", { maximumFractionDigits: 1 })}%`;
}

export function getPictogramGeometry(
  plotHeight: number,
  yMax: number,
  step: number,
) {
  const numRows = Math.max(1, Math.round(yMax / step));
  const rawRowHeight = plotHeight > 0 ? plotHeight / numRows : 24;
  const rowHeight = Math.max(2, Math.floor(rawRowHeight / 2) * 2);
  const iconSize = Math.max(10, Math.min(40, Math.round(rowHeight * 0.85)));
  const pxPerPercent = rowHeight / step;
  return { numRows, rowHeight, iconSize, pxPerPercent };
}

/** Altura da coluna: ceil garante ícones inteiros e topo ≥ linha da %. */
export function columnHeightForValue(
  value: number,
  step: number,
  rowHeight: number,
): number {
  if (value <= 0) return 0;
  return Math.ceil(value / step) * rowHeight;
}

export function PictogramChart({ chart }: { chart: ChartData }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const plotRef = useRef<HTMLDivElement>(null);
  const valueRefs = useRef<Record<string, HTMLSpanElement | null>>({});
  const colRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const liveValuesRef = useRef<Record<string, number>>({
    car: 0,
    motorbike: 0,
    bus: 0,
    pedestrian: 0,
    other: 0,
  });
  const [plotHeight, setPlotHeight] = useState(0);
  // Mobile: 2 ícones/linha; desktop (md+): 3 ícones/linha — igual em todas as colunas.
  const [iconsPerRow, setIconsPerRow] = useState(2);

  useLayoutEffect(() => {
    const mq = window.matchMedia(DESKTOP_MQ);
    const sync = () => setIconsPerRow(mq.matches ? 3 : 2);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useLayoutEffect(() => {
    const el = plotRef.current;
    if (!el) return;
    const update = () => setPlotHeight(el.clientHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { numRows, rowHeight, iconSize, pxPerPercent } = getPictogramGeometry(
    plotHeight,
    chart.yMax,
    chart.step,
  );

  const ticks: number[] = [];
  for (let t = 0; t <= chart.yMax + 0.001; t += TICK_STEP) ticks.push(t);

  const stackHeight = numRows * rowHeight;

  // Morph de altura + contador ao trocar de gráfico (e na primeira medição do plot).
  useGSAP(
    () => {
      if (plotHeight <= 0) return;

      const header = rootRef.current?.querySelector("[data-pico-header]");
      const tl = gsap.timeline();

      if (header) {
        tl.fromTo(
          header,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          0,
        );
      }

      for (const cat of chart.categories) {
        const col = colRefs.current[cat.icon];
        const valueEl = valueRefs.current[cat.icon];
        if (!col || !valueEl) continue;

        const from = liveValuesRef.current[cat.icon] ?? 0;
        const to = cat.value;
        const proxy = { v: from };
        valueEl.textContent = formatPercent(from);

        tl.fromTo(
          col,
          { height: columnHeightForValue(from, chart.step, rowHeight) },
          {
            height: columnHeightForValue(to, chart.step, rowHeight),
            duration: ANIM_DURATION,
            ease: ANIM_EASE,
          },
          0,
        );

        tl.to(
          proxy,
          {
            v: to,
            duration: ANIM_DURATION,
            ease: ANIM_EASE,
            onUpdate: () => {
              liveValuesRef.current[cat.icon] = proxy.v;
              valueEl.textContent = formatPercent(proxy.v);
            },
          },
          0,
        );
      }

      tl.eventCallback("onComplete", () => {
        for (const c of chart.categories) {
          liveValuesRef.current[c.icon] = c.value;
        }
      });
    },
    {
      scope: rootRef,
      // Só remorph quando muda o gráfico ou o plot ganha altura pela 1ª vez.
      dependencies: [chart.id, plotHeight > 0],
    },
  );

  // Reaplica texto após re-renders (React limpa children vazios do <span>).
  useLayoutEffect(() => {
    for (const icon of CATEGORY_ICONS) {
      const valueEl = valueRefs.current[icon];
      if (!valueEl) continue;
      valueEl.textContent = formatPercent(liveValuesRef.current[icon] ?? 0);
    }
  });

  // Em resize, recalcula px sem recontar do zero (não interfere no morph ativo).
  useLayoutEffect(() => {
    if (plotHeight <= 0) return;
    for (const icon of CATEGORY_ICONS) {
      const col = colRefs.current[icon];
      if (!col || gsap.isTweening(col)) continue;
      const value = liveValuesRef.current[icon] ?? 0;
      gsap.set(col, {
        height: columnHeightForValue(value, chart.step, rowHeight),
      });
    }
  }, [plotHeight, rowHeight, chart.step]);

  return (
    <div
      ref={rootRef}
      className="flex h-full w-full flex-col font-inter"
      style={{ color: brandColor }}
    >
      {/* Cabeçalho com altura fixa: título/subtítulo não afetam a geometria do
          gráfico (o plot ocupa sempre a mesma área em todos os gráficos). */}
      <div className="h-42 shrink-0 overflow-hidden md:h-44" data-pico-header>
        <h2 className="text-base font-bold leading-snug md:text-lg">
          {chart.title}
        </h2>
        <p className="mt-2 text-xs leading-snug opacity-90 md:text-sm">
          {chart.subtitle}
        </p>
        <p className="mt-2 text-[10px] leading-snug opacity-70 md:text-xs">
          <strong>Fonte:</strong> {chart.source}
        </p>
      </div>

      {/* Área do gráfico: eixo Y + colunas com espaçamento igual entre todos */}
      <div
        ref={plotRef}
        className="flex min-h-0 flex-1 justify-between"
        data-pico-plot
        data-ymax={chart.yMax}
        data-step={chart.step}
      >
        {/* Eixo Y (0% na baseline; N% na altura exata da escala) */}
        <div className="relative w-8 shrink-0 md:w-9">
          {plotHeight > 0 &&
            ticks.map((t) => (
              <span
                key={t}
                className="absolute right-1 text-[10px] tabular-nums opacity-70 md:text-xs"
                style={{
                  bottom: t * pxPerPercent,
                  transform: "translateY(50%)",
                }}
              >
                {t}%
              </span>
            ))}
        </div>

        {chart.categories.map((cat) => {
          const Icon = ICONS[cat.icon] ?? CarFront;

          return (
            <div
              key={cat.icon}
              className="relative flex h-full flex-col items-center justify-end"
              style={{ minWidth: 0 }}
            >
              {/* Label colado imediatamente acima da coluna */}
              <div className="mb-1 flex flex-col items-center text-center leading-tight">
                <span
                  ref={(el) => {
                    valueRefs.current[cat.icon] = el;
                  }}
                  className="text-[13px] font-bold tabular-nums md:text-lg"
                  data-pico-value={cat.icon}
                />
                <span className="max-w-[9ch] text-[9px] opacity-80 md:text-[12px]">
                  {cat.label}
                </span>
              </div>

              {/* Coluna ancorada na base (0%): clip revela linhas de baixo p/ cima */}
              <div
                ref={(el) => {
                  colRefs.current[cat.icon] = el;
                }}
                className="flex h-0 flex-col justify-end overflow-hidden"
                data-pico-col={cat.icon}
              >
                <div
                  className="flex flex-col-reverse items-center"
                  style={{ height: stackHeight }}
                >
                  {Array.from({ length: numRows }).map((_, r) => (
                    <div
                      key={`${cat.icon}-row-${r}`}
                      className="flex items-center justify-center gap-0.5"
                      style={{ height: rowHeight }}
                    >
                      {Array.from({ length: iconsPerRow }).map((__, c) => (
                        <span
                          key={`${cat.icon}-${r}-${c}`}
                          className="pico-icon inline-flex"
                          data-row={r}
                        >
                          <Icon size={iconSize} strokeWidth={1.6} />
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Label do eixo X abaixo da pilha (posição absoluta: não desloca
                  os ícones nem a linha do 0%). */}
              <span className="absolute left-1/2 top-full mt-1 max-w-[10ch] -translate-x-1/2 text-center text-[11px] leading-tight opacity-80 md:text-[14px]">
                {cat.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
