// Hover outline for polygon layers.
//
// The geoportal draws every polygon layer as a Mapbox `fill` layer on a vector
// source. A fill outline is always 1px, so the hovered polygon is emphasised
// by a second, `line` layer on the same source and source-layer. That layer is
// filtered down to the hovered polygon, so it draws a single thick outline.
//
// This module only holds the pure parts (layer spec and filter building) so it
// can be unit tested. It must stay import-free: tests load it through a
// TypeScript transpile, exactly like `layer-styles.ts`.

export const HOVER_OUTLINE_LAYER_SUFFIX = "__hover-outline";
export const HOVER_OUTLINE_COLOR = "#000000";
export const HOVER_OUTLINE_WIDTH = 3;

/** A Mapbox filter expression, e.g. `["==", ["id"], 12]`. */
export type HoverFilter = unknown[];

/**
 * Matches nothing. No feature has a negative id, and features without an id
 * evaluate `["id"]` to null, so this is false for every feature.
 */
export const NO_HOVER_FILTER: HoverFilter = ["==", ["id"], -1];

/**
 * Source layers whose tiles carry neither feature ids nor a property
 * combination that is unique per polygon (census tracts: 1% to 11% of the
 * tracts in a tile share all their values, in groups of up to ~200). Matching
 * them by properties would outline unrelated polygons together, so they are
 * left alone. Once a tileset publishes feature ids the id is used instead and
 * the entry has no effect.
 */
const UNIDENTIFIABLE_WITHOUT_ID = new Set([
  "densidade_hab_setor",
  "densidade_pop_setor_spo",
]);

/** The subset of a Mapbox feature needed to pick it out in a filter. */
export interface HoverableFeature {
  id?: string | number | null;
  sourceLayer?: string;
  properties?: Record<string, unknown> | null;
}

export function getHoverOutlineLayerId(layerId: string): string {
  return `${layerId}${HOVER_OUTLINE_LAYER_SUFFIX}`;
}

/** The `line` layer that outlines the hovered polygon of `layerId`. */
export function createHoverOutlineLayer(layerId: string, sourceLayer: string) {
  return {
    id: getHoverOutlineLayerId(layerId),
    type: "line" as const,
    source: layerId,
    "source-layer": sourceLayer,
    filter: NO_HOVER_FILTER,
    layout: {
      visibility: "visible",
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": HOVER_OUTLINE_COLOR,
      "line-width": HOVER_OUTLINE_WIDTH,
      "line-opacity": 1,
    },
  };
}

/**
 * Builds a filter that selects the polygon `feature` belongs to, in every tile
 * it was cut into, or null when it cannot be told apart from other polygons.
 *
 * - With a feature id, that id is the exact answer.
 * - Without one, the polygon is identified by all of its scalar properties,
 *   which is unique for the district and grid layers.
 */
export function buildHoverFilter(
  feature: HoverableFeature,
): HoverFilter | null {
  if (feature.id !== undefined && feature.id !== null) {
    return ["==", ["id"], feature.id];
  }

  if (
    feature.sourceLayer &&
    UNIDENTIFIABLE_WITHOUT_ID.has(feature.sourceLayer)
  ) {
    return null;
  }

  const clauses = Object.entries(feature.properties ?? {})
    .filter(([, value]) => isMatchable(value))
    .map(([key, value]) => ["==", ["get", key], value]);

  return clauses.length > 0 ? ["all", ...clauses] : null;
}

// Vector tiles only hold strings, booleans and numbers. NaN is skipped because
// it never equals itself, which would make the whole filter match nothing.
function isMatchable(value: unknown): boolean {
  if (typeof value === "number") return Number.isFinite(value);
  return typeof value === "string" || typeof value === "boolean";
}
