"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import { brandColor } from "../constants";
import {
  type AccidentEvent,
  type AvenidaData,
  acidentesData,
} from "../data/acidentes-faixa-azul-data";

/** Domínio temporal: 2021-01-01 – 2025-06-30 (fim exclusivo em 2025-07-01). */
const DOMAIN_START = "2021-01-01";
const DOMAIN_END = "2025-07-01";
/** Referência: 2021 entra no domínio das barras, mas não no eixo. */
const YEAR_TICKS = [2022, 2023, 2024, 2025] as const;

const COLOR_BEFORE = "#D3D3D3";
const COLOR_AFTER = "#666666";
const COLOR_MOTORCYCLE = "#BF2242";
const COLOR_OTHER = "#C9AF80";
const COLOR_GRID = "#E5E5E5";
const COLOR_GUIDE = "#DC2626";

/**
 * Estado alinhado (--t = 1): implementacao (V0) no centro; janela de comparacao
 * de 1 ano antes (-1) e 1 ano depois (+1) ocupando o miolo do plot.
 */
const WINDOW_DAYS = 365;
const V0_PCT = 50;
const HALF_WINDOW_PCT = 25;
const MINUS1_PCT = V0_PCT - HALF_WINDOW_PCT; // 25%
const PLUS1_PCT = V0_PCT + HALF_WINDOW_PCT; // 75%

/** Cor de fundo da secao (usada pelas mascaras que recortam a janela). */
const COLOR_BG = "#FFFFFF";

const MS_PER_DAY = 86_400_000;

function parseISO(iso: string): number {
  const [y, m, d] = iso.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
}

const DOMAIN_START_MS = parseISO(DOMAIN_START);
const DOMAIN_END_MS = parseISO(DOMAIN_END);
const DOMAIN_SPAN_MS = DOMAIN_END_MS - DOMAIN_START_MS;

/** Posição % no eixo temporal linear (dia a dia). */
function dayToPercent(iso: string): number {
  const ms = parseISO(iso);
  const clamped = Math.min(Math.max(ms, DOMAIN_START_MS), DOMAIN_END_MS);
  return ((clamped - DOMAIN_START_MS) / DOMAIN_SPAN_MS) * 100;
}

function daysBetween(fromIso: string, toIso: string): number {
  return (parseISO(toIso) - parseISO(fromIso)) / MS_PER_DAY;
}

function yearToPercent(year: number): number {
  return dayToPercent(`${year}-01-01`);
}

/**
 * Expressao CSS que interpola de `from`% para `to`% conforme a var `--t` (0->1).
 * Retorna o conteudo interno de um calc() (sem o wrapper), p.ex.:
 *   `(0 + 50 * var(--t)) * 1%`.
 */
function lerpExpr(from: number, to: number): string {
  const delta = to - from;
  const op = delta >= 0 ? "+" : "-";
  return `(${from} ${op} ${Math.abs(delta)} * var(--t)) * 1%`;
}

function buildSemesterMarks(): string[] {
  const marks: string[] = [];
  let cursor = Date.UTC(2021, 0, 1); // 2021-01-01
  while (cursor <= DOMAIN_END_MS) {
    const iso = new Date(cursor).toISOString().slice(0, 10);
    if (iso !== DOMAIN_START && iso !== DOMAIN_END) {
      marks.push(iso);
    }
    const dt = new Date(cursor);
    cursor = Date.UTC(dt.getUTCFullYear(), dt.getUTCMonth() + 6, 1);
  }
  return marks;
}

const SEMESTER_MARKS = buildSemesterMarks();

const MONTH_LABELS = [
  "jan",
  "fev",
  "mar",
  "abr",
  "mai",
  "jun",
  "jul",
  "ago",
  "set",
  "out",
  "nov",
  "dez",
] as const;

function formatDateLabel(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${Number(d)} ${MONTH_LABELS[Number(m) - 1]}/${y}`;
}

function eventLabel(type: AccidentEvent["type"]): string {
  return type === "motorcycle" ? "Motocicleta" : "Outro modo";
}

function formatMonthYear(iso: string): string {
  const [y, m] = iso.split("-");
  return `${MONTH_LABELS[Number(m) - 1]}/${y}`;
}

interface PeriodStats {
  total: number;
  moto: number;
}

interface RowStats {
  before: PeriodStats;
  after: PeriodStats;
  /** Dias de período "depois" disponíveis até o fim do domínio. */
  afterAvailDays: number;
}

/**
 * Contagem de óbitos antes/depois da implementação.
 * - `full`: período completo do domínio (2021 – jun/2025).
 * - `window`: apenas a janela de comparação de ±1 ano em torno da implementação.
 */
function getRowStats(row: AvenidaData, mode: "full" | "window"): RowStats {
  const implDate = row.implementation.after.start;
  const before: PeriodStats = { total: 0, moto: 0 };
  const after: PeriodStats = { total: 0, moto: 0 };

  for (const event of row.events) {
    const relDays = daysBetween(implDate, event.date);
    if (mode === "window" && Math.abs(relDays) > WINDOW_DAYS) continue;
    // Eventos no dia da implementação contam como "depois" (mesmo corte das barras).
    const bucket = relDays < 0 ? before : after;
    bucket.total += 1;
    if (event.type === "motorcycle") bucket.moto += 1;
  }

  return {
    before,
    after,
    afterAvailDays: daysBetween(implDate, DOMAIN_END),
  };
}

const MARKER_SIZE = 8;
/** Deslocamento horizontal (px) entre pontos no mesmo dia (colisão real). */
const OVERLAP_OFFSET_PX = 4;

/** Offsets em px para espalhar eventos com a mesma data (YYYY-MM-DD) na linha. */
function getOverlapOffsets(events: AccidentEvent[]): number[] {
  const totals = new Map<string, number>();
  for (const event of events) {
    totals.set(event.date, (totals.get(event.date) ?? 0) + 1);
  }

  const seen = new Map<string, number>();
  return events.map((event) => {
    const total = totals.get(event.date) ?? 1;
    const i = seen.get(event.date) ?? 0;
    seen.set(event.date, i + 1);
    if (total === 1) return 0;
    return (i - (total - 1) / 2) * OVERLAP_OFFSET_PX;
  });
}

function EventMarker({
  event,
  avenue,
  offsetX = 0,
  implDate,
}: {
  event: AccidentEvent;
  avenue: string;
  offsetX?: number;
  implDate: string;
}) {
  const isMotorcycle = event.type === "motorcycle";

  // Origem: posição no tempo absoluto (estado inicial do gráfico).
  const originLeft = dayToPercent(event.date);
  // Alvo: posição relativa à implementação dentro da janela [-1 ano, +1 ano].
  const relDays = daysBetween(implDate, event.date);
  const inWindow = relDays >= -WINDOW_DAYS && relDays <= WINDOW_DAYS;
  const targetLeft = V0_PCT + (relDays / WINDOW_DAYS) * HALF_WINDOW_PCT;

  return (
    <span
      role="img"
      className="pointer-events-none absolute top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 leading-none"
      style={{
        left: `calc(${lerpExpr(originLeft, targetLeft)} + ${offsetX}px)`,
        width: MARKER_SIZE,
        height: MARKER_SIZE,
        overflow: "visible",
        // Marcadores fora da janela de comparacao somem conforme alinha.
        ...(inWindow ? {} : { opacity: "calc(1 - var(--t))" }),
      }}
      aria-label={`${avenue}: ${eventLabel(event.type)}, ${formatDateLabel(event.date)}`}
    >
      {isMotorcycle ? <MotorcycleIcon /> : <OtherIcon />}
    </span>
  );
}

function AvenueBar({
  row,
  hovered,
  onHover,
  onLeave,
}: {
  row: AvenidaData;
  hovered: boolean;
  onHover: (row: AvenidaData, e: React.MouseEvent) => void;
  onLeave: () => void;
}) {
  const implDate = row.implementation.after.start;
  const splitOrigin = dayToPercent(implDate);

  // Alvo: 1 ano antes (claro) e 1 ano depois (escuro) em torno de V0 (centro).
  // Barras sem 365 dias completos de "depois" nao alcancam a linha +1.
  const beforeAvail = Math.min(
    daysBetween(DOMAIN_START, implDate),
    WINDOW_DAYS,
  );
  const afterAvail = Math.min(daysBetween(implDate, DOMAIN_END), WINDOW_DAYS);
  const lightLeftTarget =
    V0_PCT - (beforeAvail / WINDOW_DAYS) * HALF_WINDOW_PCT;
  const darkRightTarget = V0_PCT + (afterAvail / WINDOW_DAYS) * HALF_WINDOW_PCT;

  const lightLeft = `calc(${lerpExpr(0, lightLeftTarget)})`;
  const lightWidth = `calc(${lerpExpr(splitOrigin, V0_PCT - lightLeftTarget)})`;
  const darkLeft = `calc(${lerpExpr(splitOrigin, V0_PCT)})`;
  const darkWidth = `calc(${lerpExpr(100 - splitOrigin, darkRightTarget - V0_PCT)})`;

  const overlapOffsets = getOverlapOffsets(row.events);

  return (
    <div
      role="img"
      aria-label={`${row.bairro}: linha do tempo de óbitos, Faixa Azul desde ${formatMonthYear(implDate)}`}
      className="relative min-h-0 flex-1 overflow-visible rounded-[2px]"
      style={
        hovered ? { backgroundColor: "rgba(35, 37, 78, 0.08)" } : undefined
      }
      onMouseEnter={(e) => onHover(row, e)}
      onMouseMove={(e) => onHover(row, e)}
      onMouseLeave={onLeave}
    >
      {/* Barra: altura reduzida; marcadores ficam na linha inteira para não clipar */}
      <div className="pointer-events-none absolute inset-y-[14%] left-0 right-0 md:inset-y-[8%]">
        <div
          className="absolute inset-y-0 rounded-[1px]"
          style={{
            left: lightLeft,
            width: lightWidth,
            backgroundColor: COLOR_BEFORE,
          }}
        />
        <div
          className="absolute inset-y-0 rounded-[1px]"
          style={{
            left: darkLeft,
            width: darkWidth,
            backgroundColor: COLOR_AFTER,
          }}
        />
      </div>
      {row.events.map((event, index) => (
        <EventMarker
          key={`${row.bairro}-${event.date}-${event.type}-${index}`}
          event={event}
          avenue={row.bairro}
          offsetX={overlapOffsets[index]}
          implDate={implDate}
        />
      ))}
    </div>
  );
}

function MotorcycleIcon({ size = MARKER_SIZE }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${MARKER_SIZE} ${MARKER_SIZE}`}
      className="shrink-0 overflow-visible"
      aria-hidden="true"
    >
      <circle
        cx={MARKER_SIZE / 2}
        cy={MARKER_SIZE / 2}
        r={MARKER_SIZE / 2 - 0.75}
        fill={COLOR_MOTORCYCLE}
        stroke="#FFFFFF"
        strokeWidth={1.5}
      />
    </svg>
  );
}

function OtherIcon({ size = MARKER_SIZE }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${MARKER_SIZE} ${MARKER_SIZE}`}
      className="shrink-0 overflow-visible"
      aria-hidden="true"
    >
      <rect
        x={0.75}
        y={0.75}
        width={MARKER_SIZE - 1.5}
        height={MARKER_SIZE - 1.5}
        fill={COLOR_OTHER}
        stroke="#FFFFFF"
        strokeWidth={1.5}
      />
    </svg>
  );
}

function ChartLegend({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex flex-col gap-5 text-xs leading-snug ${className}`}
      style={{ color: brandColor }}
    >
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <span
            className="size-3 shrink-0"
            style={{ backgroundColor: COLOR_BEFORE }}
            aria-hidden="true"
          />
          <span>Antes da implementação</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="size-3 shrink-0"
            style={{ backgroundColor: COLOR_AFTER }}
            aria-hidden="true"
          />
          <span>Depois da implementação</span>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <p className="font-semibold">Modo de transporte da vítima</p>
        <div className="flex items-center gap-2">
          <OtherIcon />
          <span>Outros</span>
        </div>
        <div className="flex items-center gap-2">
          <MotorcycleIcon />
          <span>Motocicleta</span>
        </div>
      </div>
    </div>
  );
}

/** Legenda mobile: uma faixa única sob o eixo, sem roubar altura do gráfico. */
function MobileChartLegend() {
  return (
    <ul
      className="mt-1.5 flex shrink-0 list-none flex-wrap items-center justify-center gap-x-3 gap-y-1 p-0 text-[8px] leading-none md:hidden"
      style={{ color: brandColor }}
      aria-label="Legenda do gráfico"
    >
      <li className="inline-flex items-center gap-1">
        <span
          className="h-1.5 w-2.5 shrink-0"
          style={{ backgroundColor: COLOR_BEFORE }}
          aria-hidden="true"
        />
        Antes
      </li>
      <li className="inline-flex items-center gap-1">
        <span
          className="h-1.5 w-2.5 shrink-0"
          style={{ backgroundColor: COLOR_AFTER }}
          aria-hidden="true"
        />
        Depois
      </li>
      <li className="text-neutral-300" aria-hidden="true">
        |
      </li>
      <li className="inline-flex items-center gap-1">
        <OtherIcon />
        Outros
      </li>
      <li className="inline-flex items-center gap-1">
        <MotorcycleIcon />
        Motocicleta
      </li>
    </ul>
  );
}

const TOOLTIP_WIDTH = 240;
const TOOLTIP_OFFSET = 14;

function obitosLabel(n: number): string {
  return n === 1 ? "1 óbito" : `${n} óbitos`;
}

function TooltipStatRow({
  label,
  swatchColor,
  stats,
}: {
  label: string;
  swatchColor: string;
  stats: PeriodStats;
}) {
  return (
    <div className="flex items-baseline gap-1.5">
      <span
        className="size-2 shrink-0 self-center rounded-[1px]"
        style={{ backgroundColor: swatchColor }}
        aria-hidden="true"
      />
      <span className="w-11 shrink-0 opacity-80">{label}</span>
      <span className="font-semibold tabular-nums">
        {obitosLabel(stats.total)}
      </span>
      {stats.moto > 0 && (
        <span className="opacity-70">({stats.moto} de moto)</span>
      )}
    </div>
  );
}

function ChartTooltip({
  row,
  x,
  y,
  active,
}: {
  row: AvenidaData;
  x: number;
  y: number;
  active: boolean;
}) {
  const stats = getRowStats(row, active ? "window" : "full");
  const implDate = row.implementation.after.start;
  const noEvents = stats.before.total === 0 && stats.after.total === 0;

  const afterIncomplete = active && stats.afterAvailDays < WINDOW_DAYS;
  const afterMonths = Math.max(1, Math.floor(stats.afterAvailDays / 30.44));

  // Vira para o outro lado do cursor perto das bordas do viewport.
  const flipX = x + TOOLTIP_OFFSET + TOOLTIP_WIDTH > window.innerWidth - 8;
  const flipY = y + TOOLTIP_OFFSET + 170 > window.innerHeight - 8;

  return (
    <div
      className="pointer-events-none fixed z-50 hidden rounded-md border border-neutral-200 bg-white p-3 font-inter text-[11px] leading-snug shadow-lg md:block"
      style={{
        left: flipX ? x - TOOLTIP_OFFSET : x + TOOLTIP_OFFSET,
        top: flipY ? y - TOOLTIP_OFFSET : y + TOOLTIP_OFFSET,
        transform: `translate(${flipX ? "-100%" : "0"}, ${flipY ? "-100%" : "0"})`,
        width: TOOLTIP_WIDTH,
        color: brandColor,
      }}
      aria-hidden="true"
    >
      <p className="font-bold">{row.bairro}</p>
      <p className="mt-0.5 opacity-80">
        Faixa Azul desde {formatMonthYear(implDate)}
      </p>
      <p className="mt-0.5 text-[10px] opacity-60">
        {active
          ? "Janela de comparação: 1 ano antes e 1 ano depois"
          : "Período completo: jan/2021 – jun/2025"}
      </p>

      {noEvents ? (
        <p className="mt-2 opacity-80">
          Nenhum óbito registrado{active ? " na janela" : " no período"}.
        </p>
      ) : (
        <div className="mt-2 flex flex-col gap-1">
          <TooltipStatRow
            label="Antes"
            swatchColor={COLOR_BEFORE}
            stats={stats.before}
          />
          <TooltipStatRow
            label="Depois"
            swatchColor={COLOR_AFTER}
            stats={stats.after}
          />
        </div>
      )}

      {afterIncomplete && (
        <p className="mt-2 text-[10px] italic opacity-60">
          Período &ldquo;depois&rdquo; ainda incompleto: ~{afterMonths}{" "}
          {afterMonths === 1 ? "mês" : "meses"} de dados.
        </p>
      )}
    </div>
  );
}

export function TimelineChart({ active = false }: { active?: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const progress = useRef({ t: 0 });
  const [hover, setHover] = useState<{
    row: AvenidaData;
    x: number;
    y: number;
  } | null>(null);

  const handleHover = (row: AvenidaData, e: React.MouseEvent) => {
    setHover({ row, x: e.clientX, y: e.clientY });
  };
  const handleLeave = () => setHover(null);

  useGSAP(
    () => {
      gsap.to(progress.current, {
        t: active ? 1 : 0,
        duration: 0.8,
        ease: "power2.inOut",
        overwrite: true,
        onUpdate: () => {
          rootRef.current?.style.setProperty("--t", String(progress.current.t));
        },
      });
    },
    { dependencies: [active] },
  );

  return (
    <div
      ref={rootRef}
      className="flex h-full w-full font-inter"
      style={{ color: brandColor, ["--t" as string]: 0 } as React.CSSProperties}
    >
      {/* Colunas flex-1 espelham o gráfico no centro; a legenda vive só na margem direita. */}
      <div className="hidden min-w-0 flex-1 md:block" aria-hidden="true" />

      <div className="mx-auto flex h-full w-full max-w-xl min-w-0 flex-col md:mx-0 md:max-w-2xl 2xl:max-w-3xl">
        <div className="flex min-h-0 flex-1 gap-1 overflow-visible md:gap-2.5">
          <div className="flex w-19 shrink-0 flex-col gap-1.5 overflow-visible md:w-44 md:gap-1.5">
            {acidentesData.map((row) => (
              <div
                key={row.bairro}
                className={`flex min-h-0 flex-1 items-center justify-end overflow-visible whitespace-nowrap text-right text-[7.5px] leading-none md:text-[11px] ${
                  hover?.row.bairro === row.bairro ? "font-semibold" : ""
                }`}
                title={row.bairro}
              >
                {row.bairro}
              </div>
            ))}
          </div>

          <div className="relative flex min-h-0 min-w-0 flex-1 flex-col">
            {/* Grade de semestres: some conforme o grafico alinha. */}
            <div
              className="pointer-events-none absolute -top-1.5 -bottom-1.5 right-0 left-0 z-0 md:-top-2 md:-bottom-2"
              style={{ opacity: "calc(1 - var(--t))" }}
              aria-hidden="true"
            >
              {SEMESTER_MARKS.map((ym) => (
                <div
                  key={ym}
                  className="absolute inset-y-0 w-px"
                  style={{
                    left: `${dayToPercent(ym)}%`,
                    backgroundColor: COLOR_GRID,
                  }}
                />
              ))}
            </div>

            <div className="relative z-1 flex min-h-0 flex-1 flex-col gap-1.5 overflow-visible md:gap-1.5">
              {acidentesData.map((row) => (
                <AvenueBar
                  key={row.bairro}
                  row={row}
                  hovered={hover?.row.bairro === row.bairro}
                  onHover={handleHover}
                  onLeave={handleLeave}
                />
              ))}
            </div>

            {/* Mascaras: recortam tudo fora da janela [-1, +1] conforme alinha. */}
            <div
              className="pointer-events-none absolute inset-y-0 left-0 right-0 z-2"
              style={{ opacity: "var(--t)" }}
              aria-hidden="true"
            >
              <div
                className="absolute inset-y-0 left-0"
                style={{ width: `${MINUS1_PCT}%`, backgroundColor: COLOR_BG }}
              />
              <div
                className="absolute inset-y-0 right-0"
                style={{
                  width: `${100 - PLUS1_PCT}%`,
                  backgroundColor: COLOR_BG,
                }}
              />
            </div>

            {/* Linhas pontilhadas vermelhas em -1 e +1. */}
            <div
              className="pointer-events-none absolute -top-1.5 -bottom-1.5 left-0 right-0 z-3 md:-top-2 md:-bottom-2"
              style={{ opacity: "var(--t)" }}
              aria-hidden="true"
            >
              <div
                className="absolute inset-y-0"
                style={{
                  left: `${MINUS1_PCT}%`,
                  borderLeft: `1.5px dashed ${COLOR_GUIDE}`,
                }}
              />
              <div
                className="absolute inset-y-0"
                style={{
                  left: `${PLUS1_PCT}%`,
                  borderLeft: `1.5px dashed ${COLOR_GUIDE}`,
                }}
              />
            </div>
          </div>
        </div>

        <div className="mt-1 flex shrink-0 gap-1 md:gap-2.5">
          <div className="w-19 shrink-0 md:w-44" aria-hidden="true" />
          <div className="relative h-3.5 min-w-0 flex-1 md:h-5">
            {/* Anos: somem conforme alinha. */}
            {YEAR_TICKS.map((year) => (
              <span
                key={year}
                className="absolute top-0 -translate-x-1/2 text-[8px] tabular-nums md:text-[10px]"
                style={{
                  left: `${yearToPercent(year)}%`,
                  opacity: "calc((1 - var(--t)) * 0.7)",
                }}
              >
                {year}
              </span>
            ))}
            {/* Rotulo da janela de comparacao: aparece conforme alinha. */}
            <span
              className="absolute top-0 left-1/2 -translate-x-1/2 whitespace-nowrap text-[8px] font-medium md:text-[10px]"
              style={{ opacity: "var(--t)" }}
            >
              Período analisado = 1 ano
            </span>
          </div>
        </div>

        <MobileChartLegend />
      </div>

      <div className="hidden min-w-0 flex-1 items-center justify-start pl-4 md:flex lg:pl-6">
        <ChartLegend className="w-max max-w-44 lg:max-w-48" />
      </div>

      {hover && (
        <ChartTooltip row={hover.row} x={hover.x} y={hover.y} active={active} />
      )}
    </div>
  );
}
