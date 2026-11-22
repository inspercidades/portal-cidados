// Barra de escala: escolhe uma distância "redonda" (1, 2, 3, 5 × 10ⁿ) que caiba
// na largura máxima, como o ScaleControl do Mapbox. O controle nativo não é
// usado porque o canto em que ele fica é escondido no CSS global.
//
// Sem imports: os testes carregam o arquivo por transpile.

export interface ScaleBar {
  /** Largura da barra, em px. */
  width: number;
  value: number;
  unit: "m" | "km";
}

function roundDown(value: number): number {
  const pow10 = 10 ** Math.floor(Math.log10(value));
  const digit = value / pow10;
  const nice = digit >= 5 ? 5 : digit >= 3 ? 3 : digit >= 2 ? 2 : 1;
  return nice * pow10;
}

/**
 * @param maxMeters distância real coberta por `maxWidth` pixels
 * @param maxWidth largura máxima da barra, em px
 */
export function computeScaleBar(
  maxMeters: number,
  maxWidth: number,
): ScaleBar | null {
  if (!Number.isFinite(maxMeters) || maxMeters <= 0 || maxWidth <= 0) {
    return null;
  }

  const meters = roundDown(maxMeters);
  const width = Math.round((meters / maxMeters) * maxWidth);
  return meters >= 1000
    ? { width, value: meters / 1000, unit: "km" }
    : { width, value: meters, unit: "m" };
}
