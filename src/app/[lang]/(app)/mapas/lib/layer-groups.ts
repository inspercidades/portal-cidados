// Agrupa as camadas de uma cidade pelos temas do catálogo, na ordem da sidebar.
//
// Sem imports: os testes carregam o arquivo por transpile.

/** Ordem dos temas na sidebar. Temas fora da lista vêm depois, na ordem em que aparecem. */
export const THEME_ORDER = [
  "Mobilidade",
  "Clima e Meio Ambiente",
  "Habitação e Mercado Imobiliário",
  "Saúde",
  "Multidisciplinar e Transversal",
] as const;

/** Grupo das camadas sem tema. Sempre o último. */
export const OTHER_GROUP = "__other";

export interface ThemedLayer {
  /** Tema canônico (em português), usado como chave. */
  theme?: string;
  /** Tema no idioma da página. */
  themeLabel?: string;
}

export interface LayerGroup<T> {
  key: string;
  label: string;
  layers: T[];
}

export function groupLayersByTheme<T extends ThemedLayer>(
  layers: readonly T[],
  otherLabel: string,
  order: readonly string[] = THEME_ORDER,
): LayerGroup<T>[] {
  const groups = new Map<string, LayerGroup<T>>();

  for (const layer of layers) {
    const key = layer.theme ?? OTHER_GROUP;
    let group = groups.get(key);
    if (!group) {
      group = {
        key,
        label: key === OTHER_GROUP ? otherLabel : (layer.themeLabel ?? key),
        layers: [],
      };
      groups.set(key, group);
    }
    group.layers.push(layer);
  }

  const rank = (key: string) => {
    if (key === OTHER_GROUP) return Number.POSITIVE_INFINITY;
    const index = order.indexOf(key);
    return index < 0 ? order.length : index;
  };

  // `sort` é estável: temas fora da lista mantêm a ordem de aparição.
  return [...groups.values()].sort((a, b) => rank(a.key) - rank(b.key));
}
