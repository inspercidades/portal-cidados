// Estado do geoportal e as regras de cada ação. O mapa é derivado deste estado:
// os hooks só aplicam no Mapbox o que o reducer decidiu.
//
// Sem imports em runtime: os testes carregam o arquivo por transpile.

export const DEFAULT_OPACITY = 80;

export type CompareView = "swipe" | "split";

export interface CompareState {
  enabled: boolean;
  view: CompareView;
  /** Camada do mapa da esquerda (ou de cima, no celular). */
  left: string | null;
  /** Camada do mapa da direita (ou de baixo, no celular). */
  right: string | null;
}

export interface GeoportalState {
  /** Nome da cidade, como em `cityLayersConfig`. `null` abre o seletor. */
  city: string | null;
  /** Camadas ativas na ordem de desenho: a primeira fica embaixo. */
  layers: string[];
  /** Opacidade 0–100 por camada. Ausente = `DEFAULT_OPACITY`. */
  opacity: Record<string, number>;
  baseMap: string;
  terrain: boolean;
  compare: CompareState;
}

export type GeoportalAction =
  | { type: "selectCity"; city: string }
  | { type: "toggleLayer"; id: string; on: boolean }
  | { type: "setLayerOrder"; layers: string[] }
  | { type: "setOpacity"; id: string; value: number }
  | { type: "setBaseMap"; baseMap: string }
  | { type: "setTerrain"; on: boolean }
  | { type: "setCompare"; enabled: boolean }
  | { type: "setCompareView"; view: CompareView }
  | { type: "toggleCompareLayer"; id: string; on: boolean };

export function opacityOf(state: GeoportalState, id: string): number {
  return state.opacity[id] ?? DEFAULT_OPACITY;
}

/** Camadas que cada mapa desenha agora. */
export function visibleLayers(state: GeoportalState): {
  primary: string[];
  secondary: string[];
} {
  if (!state.compare.enabled) return { primary: state.layers, secondary: [] };
  return {
    primary: state.compare.left ? [state.compare.left] : [],
    secondary: state.compare.right ? [state.compare.right] : [],
  };
}

function withoutOpacity(opacity: Record<string, number>, id: string) {
  if (!(id in opacity)) return opacity;
  const next = { ...opacity };
  delete next[id];
  return next;
}

function clampOpacity(value: number) {
  return Math.min(100, Math.max(0, Math.round(value)));
}

export function geoportalReducer(
  state: GeoportalState,
  action: GeoportalAction,
): GeoportalState {
  switch (action.type) {
    case "selectCity": {
      if (action.city === state.city) return state;
      // Cada cidade tem as próprias camadas: nada da anterior faz sentido.
      return {
        ...state,
        city: action.city,
        layers: [],
        opacity: {},
        compare: { ...state.compare, left: null, right: null },
      };
    }

    case "toggleLayer": {
      const isActive = state.layers.includes(action.id);
      if (action.on === isActive) return state;
      if (action.on) {
        // Nova camada entra por cima das que já estão ligadas.
        return { ...state, layers: [...state.layers, action.id] };
      }
      return {
        ...state,
        layers: state.layers.filter((id) => id !== action.id),
        opacity: withoutOpacity(state.opacity, action.id),
      };
    }

    case "setLayerOrder": {
      const same =
        action.layers.length === state.layers.length &&
        action.layers.every((id) => state.layers.includes(id));
      // Só reordena: não deixa a ordem ligar nem desligar camadas.
      if (!same) return state;
      return { ...state, layers: [...action.layers] };
    }

    case "setOpacity":
      return {
        ...state,
        opacity: { ...state.opacity, [action.id]: clampOpacity(action.value) },
      };

    case "setBaseMap":
      return action.baseMap === state.baseMap
        ? state
        : { ...state, baseMap: action.baseMap };

    case "setTerrain":
      return action.on === state.terrain
        ? state
        : { ...state, terrain: action.on };

    case "setCompare": {
      if (action.enabled === state.compare.enabled) return state;
      // Entrar ou sair da comparação recomeça a escolha das camadas.
      return {
        ...state,
        layers: [],
        opacity: {},
        compare: {
          ...state.compare,
          enabled: action.enabled,
          left: null,
          right: null,
        },
      };
    }

    case "setCompareView":
      return action.view === state.compare.view
        ? state
        : { ...state, compare: { ...state.compare, view: action.view } };

    case "toggleCompareLayer": {
      const { left, right } = state.compare;
      if (action.on) {
        if (left === action.id || right === action.id) return state;
        // A primeira camada escolhida vai para a esquerda; a segunda, para a direita.
        if (left === null) {
          return { ...state, compare: { ...state.compare, left: action.id } };
        }
        if (right === null) {
          return { ...state, compare: { ...state.compare, right: action.id } };
        }
        return state;
      }

      if (left !== action.id && right !== action.id) return state;
      return {
        ...state,
        opacity: withoutOpacity(state.opacity, action.id),
        compare: {
          ...state.compare,
          left: left === action.id ? null : left,
          right: right === action.id ? null : right,
        },
      };
    }
  }
}
