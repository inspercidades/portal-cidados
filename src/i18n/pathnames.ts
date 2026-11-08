import type { Locale } from "@/i18n/config";

/**
 * Segmento interno (pasta e href dos dados) → segmento público em inglês.
 * Ausente do mapa, o segmento fica igual nos dois idiomas.
 */
const EN_SEGMENT = {
  historias: "stories",
  mapas: "maps",
  "catalogo-de-dados": "data-catalog",
  sobre: "about",
  privacidade: "privacy",
  "ilhas-de-calor": "heat-islands",
  "desigualdades-em-saude-sp": "health-inequalities-sp",
  adensamento: "densification",
  habitacao: "housing",
  "faixa-azul": "faixa-azul",
} as const;

const INTERNAL_FROM_EN: Record<string, string> = Object.fromEntries(
  Object.entries(EN_SEGMENT).map(([internal, en]) => [en, internal]),
);

export function toPublicSegment(segment: string, locale: Locale): string {
  if (locale !== "en") return segment;
  return EN_SEGMENT[segment as keyof typeof EN_SEGMENT] ?? segment;
}

export function toInternalSegment(segment: string, locale: Locale): string {
  if (locale !== "en") return segment;
  return INTERNAL_FROM_EN[segment] ?? segment;
}
