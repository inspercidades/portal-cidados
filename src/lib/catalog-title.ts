/** "Título [2004-2024]" → { name, years: "2004 · 2024" }. */
export function splitCatalogTitle(title: string) {
  const match = title.match(/^(.*?)\s*\[([^\]]+)\]\s*$/);
  if (!match) return { name: title, years: null as string | null };
  const years = match[2].replace(/\s*[-–,]\s*/g, " · ").replace(/\s*·\s*$/, "");
  return { name: match[1], years };
}

export function formatCatalogPeriod(
  periodStart: number | null | undefined,
  periodEnd: number | null | undefined,
) {
  if (periodStart == null && periodEnd == null) return null;
  if (periodStart != null && periodEnd != null) {
    if (periodStart === periodEnd) return String(periodStart);
    return `${periodStart} · ${periodEnd}`;
  }
  return String(periodStart ?? periodEnd);
}
