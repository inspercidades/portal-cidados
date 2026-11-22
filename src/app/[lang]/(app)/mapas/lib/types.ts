import type { CityLayer } from "./city-layers";

/**
 * Camada como o geoportal a recebe: os campos de `city-layers.ts` (gerado),
 * já no idioma da página, mais o que vem do catálogo e das histórias.
 */
export interface GeoportalLayer extends CityLayer {
  /** Tema do catálogo em português: chave do agrupamento na sidebar. */
  theme?: string;
  /** Tema no idioma da página. */
  themeLabel?: string;
  /** Caminho interno (em português) da história que usa o dado. */
  storyHref?: string;
}

export type GeoportalLayersConfig = Record<string, GeoportalLayer[]>;
