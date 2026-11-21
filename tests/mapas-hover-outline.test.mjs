import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import ts from "typescript";

async function loadTypescript(path) {
  const source = readFileSync(new URL(path, import.meta.url), "utf8");
  const javascript = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext },
  }).outputText;
  return import(
    `data:text/javascript;base64,${Buffer.from(javascript).toString("base64")}`
  );
}

const {
  HOVER_OUTLINE_COLOR,
  HOVER_OUTLINE_WIDTH,
  NO_HOVER_FILTER,
  buildHoverFilter,
  createHoverOutlineLayer,
  getHoverOutlineLayerId,
} = await loadTypescript("../src/app/[lang]/(app)/mapas/lib/hover-outline.ts");

test("a feature id identifies the polygon exactly", () => {
  const filter = buildHoverFilter({
    id: 4321,
    sourceLayer: "geoses-spo",
    properties: { "GeoSES (-1 a 1)": -0.07 },
  });
  assert.deepEqual(filter, ["==", ["id"], 4321]);
});

test("an id of 0 is still an id", () => {
  assert.deepEqual(buildHoverFilter({ id: 0, properties: { a: 1 } }), [
    "==",
    ["id"],
    0,
  ]);
});

test("without an id the polygon is matched on all of its properties", () => {
  const filter = buildHoverFilter({
    sourceLayer: "sinistros-por-distrito-spo",
    properties: {
      Distrito: "Grajaú",
      "Número de Sinistros (2022-2025)": 2976,
    },
  });
  assert.deepEqual(filter, [
    "all",
    ["==", ["get", "Distrito"], "Grajaú"],
    ["==", ["get", "Número de Sinistros (2022-2025)"], 2976],
  ]);
});

test("properties a tile filter cannot match on are left out", () => {
  const filter = buildHoverFilter({
    properties: {
      Distrito: "Sé",
      ok: true,
      nan: Number.NaN,
      infinite: Number.POSITIVE_INFINITY,
      missing: null,
      absent: undefined,
      nested: { a: 1 },
    },
  });
  assert.deepEqual(filter, [
    "all",
    ["==", ["get", "Distrito"], "Sé"],
    ["==", ["get", "ok"], true],
  ]);
});

test("a polygon with nothing to match on yields no filter", () => {
  assert.equal(buildHoverFilter({ properties: {} }), null);
  assert.equal(buildHoverFilter({ properties: null }), null);
  assert.equal(buildHoverFilter({}), null);
  assert.equal(buildHoverFilter({ properties: { nan: Number.NaN } }), null);
});

test("census tracts without ids are not outlined, since their values repeat", () => {
  for (const sourceLayer of [
    "densidade_hab_setor",
    "densidade_pop_setor_spo",
  ]) {
    assert.equal(
      buildHoverFilter({
        sourceLayer,
        properties: { Domicílios: 0, "Domicílios Ocupados": 0 },
      }),
      null,
    );
  }
});

test("census tracts are outlined as soon as their tiles carry ids", () => {
  assert.deepEqual(
    buildHoverFilter({
      id: 77,
      sourceLayer: "densidade_hab_setor",
      properties: { Domicílios: 0 },
    }),
    ["==", ["id"], 77],
  );
});

test("the outline layer sits on the base layer's source and starts empty", () => {
  const layer = createHoverOutlineLayer("geoses-spo", "geoses-spo");
  assert.equal(layer.id, "geoses-spo__hover-outline");
  assert.equal(layer.id, getHoverOutlineLayerId("geoses-spo"));
  assert.equal(layer.type, "line");
  assert.equal(layer.source, "geoses-spo");
  assert.equal(layer["source-layer"], "geoses-spo");
  assert.deepEqual(layer.filter, NO_HOVER_FILTER);
  assert.equal(layer.paint["line-color"], HOVER_OUTLINE_COLOR);
  assert.equal(layer.paint["line-width"], HOVER_OUTLINE_WIDTH);
  assert.equal(HOVER_OUTLINE_COLOR, "#000000");
  // Thicker than the 1px fill outline it emphasises.
  assert.ok(HOVER_OUTLINE_WIDTH > 1);
});

test("the empty filter cannot match a feature with or without an id", () => {
  // ["==", ["id"], -1]: ids are never negative and a missing id is null.
  assert.deepEqual(NO_HOVER_FILTER, ["==", ["id"], -1]);
});
