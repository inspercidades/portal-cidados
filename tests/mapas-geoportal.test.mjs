import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import ts from "typescript";

async function loadTypescript(path) {
  const source = readFileSync(new URL(path, import.meta.url), "utf8");
  // O alvo padrão do transpile é ES5, em que `[...new Set()]` vira [].
  const javascript = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  return import(
    `data:text/javascript;base64,${Buffer.from(javascript).toString("base64")}`
  );
}

const lib = "../src/app/[lang]/(app)/mapas/lib";
const { CITIES, cityView, findCity, BRAZIL_VIEW } = await loadTypescript(
  `${lib}/cities.ts`,
);
const { cityLayersConfig } = await loadTypescript(`${lib}/city-layers.ts`);
const { BASE_MAP_IDS, DEFAULT_BASE_MAP } = await loadTypescript(
  `${lib}/base-maps.ts`,
);
const { DEFAULT_OPACITY, geoportalReducer, visibleLayers, opacityOf } =
  await loadTypescript(`${lib}/geoportal-state.ts`);
const { parseGeoportalUrl, serializeGeoportalUrl } = await loadTypescript(
  `${lib}/url-state.ts`,
);
const { moveInDisplayOrder, toDisplayOrder } = await loadTypescript(
  `${lib}/layer-order.ts`,
);
const { groupLayersByTheme, OTHER_GROUP } = await loadTypescript(
  `${lib}/layer-groups.ts`,
);
const { buildGeocodeUrl, parseGeocodeResponse, MAX_RESULTS } =
  await loadTypescript(`${lib}/geocoding.ts`);
const { computeScaleBar } = await loadTypescript(`${lib}/scale.ts`);

const cityLayers = Object.fromEntries(
  Object.entries(cityLayersConfig).map(([city, layers]) => [
    city,
    layers.map((layer) => layer.id),
  ]),
);
const parseOptions = {
  cityLayers,
  baseMaps: BASE_MAP_IDS,
  defaultBaseMap: DEFAULT_BASE_MAP,
};
const defaults = { baseMap: DEFAULT_BASE_MAP, opacity: DEFAULT_OPACITY };
const parse = (query) =>
  parseGeoportalUrl(new URLSearchParams(query), parseOptions);

const SP = "São Paulo";
const RJ = "Rio de Janeiro";
const [spA, spB, spC] = cityLayers[SP];
const [rjA] = cityLayers[RJ];

function emptyState(overrides = {}) {
  return {
    city: SP,
    layers: [],
    opacity: {},
    baseMap: DEFAULT_BASE_MAP,
    terrain: false,
    compare: { enabled: false, view: "swipe", left: null, right: null },
    ...overrides,
  };
}

// --- cidades ---------------------------------------------------------------

test("every city of the generated layer config has a view and a search area", () => {
  for (const city of Object.keys(cityLayersConfig)) {
    const config = findCity(city);
    assert.ok(config, `${city} falta em lib/cities.ts`);
    const [minLng, minLat, maxLng, maxLat] = config.bbox;
    assert.ok(minLng < maxLng && minLat < maxLat, `${city}: bbox invertido`);
    const [lng, lat] = config.center;
    assert.ok(lng >= minLng && lng <= maxLng && lat >= minLat && lat <= maxLat);
    assert.match(config.wikidataId, /^Q\d+$/);
  }
  assert.equal(CITIES.length, Object.keys(cityLayersConfig).length);
});

test("an unknown city falls back to the view of Brazil", () => {
  assert.deepEqual(cityView("Brasil"), BRAZIL_VIEW);
  assert.deepEqual(cityView(null), BRAZIL_VIEW);
  assert.deepEqual(cityView(SP), { center: findCity(SP).center, zoom: 10.5 });
});

// --- URL ---------------------------------------------------------------------

test("links from the catalog and the stories still open their layers", () => {
  const { state, camera } = parse(`city=${SP}&layers=${spA},${spB}`);
  assert.equal(state.city, SP);
  assert.deepEqual(state.layers, [spA, spB]);
  assert.equal(camera, null);
});

test("unknown city and layers from another city are dropped", () => {
  assert.equal(parse("city=Brasil").state.city, null);
  assert.deepEqual(
    parse(`city=${SP}&layers=${rjA},${spA},${spA}`).state.layers,
    [spA],
  );
  assert.deepEqual(parse(`layers=${spA}`).state.layers, []);
});

test("old theme links keep working and the default base map is light", () => {
  assert.equal(parse("theme=light").state.baseMap, "light");
  assert.equal(parse("theme=dark").state.baseMap, "dark");
  assert.equal(parse("theme=satellite").state.baseMap, "satellite");
  assert.equal(parse("theme=sepia").state.baseMap, DEFAULT_BASE_MAP);
  assert.equal(parse("").state.baseMap, "light");
});

test("comparison links pick one layer per side", () => {
  const { state } = parse(
    `city=${SP}&compare=1&layer1=${spA}&layer2=${spB}&layers=${spC}`,
  );
  assert.deepEqual(state.compare, {
    enabled: true,
    view: "swipe",
    left: spA,
    right: spB,
  });
  assert.deepEqual(state.layers, []);
  assert.equal(
    parse(`city=${SP}&compare=1&layer1=${spA}&layer2=${spA}`).state.compare
      .right,
    null,
  );
  assert.equal(
    parse(`city=${SP}&compare=1&view=split`).state.compare.view,
    "split",
  );
});

test("camera values are validated instead of becoming NaN", () => {
  const { camera } = parse(
    "zoom=abc&lat=-23.5&lng=-46.6&pitch=120&bearing=540",
  );
  assert.deepEqual(camera, { center: [-46.6, -23.5], pitch: 85, bearing: 180 });
  assert.equal(parse("lat=-23.5").camera, null);
  assert.equal(parse("zoom=99").camera.zoom, 22);
});

test("opacity only keeps active layers, clamped to 0-100", () => {
  const { state } = parse(
    `city=${SP}&layers=${spA}&opacity=${spA}:140,${spB}:20,bad`,
  );
  assert.deepEqual(state.opacity, { [spA]: 100 });
});

test("serializing and parsing give back the same state", () => {
  const state = emptyState({
    layers: [spA, spB],
    opacity: { [spA]: 35, [spB]: DEFAULT_OPACITY },
    baseMap: "satellite",
    terrain: true,
  });
  const camera = {
    center: [-46.63881, -23.55052],
    zoom: 11.25,
    bearing: 12.5,
    pitch: 55,
  };
  const params = serializeGeoportalUrl(state, camera, defaults);

  assert.equal(
    params.get("opacity"),
    `${spA}:35`,
    "a opacidade padrão não vai para a URL",
  );
  assert.equal(params.get("theme"), "satellite");
  const parsed = parseGeoportalUrl(params, parseOptions);
  assert.deepEqual(parsed.state, { ...state, opacity: { [spA]: 35 } });
  assert.deepEqual(parsed.camera, camera);
});

test("the default base map and comparison view stay out of the URL", () => {
  const params = serializeGeoportalUrl(
    emptyState({
      compare: { enabled: true, view: "swipe", left: spA, right: null },
    }),
    null,
    defaults,
  );
  assert.equal(
    params.toString(),
    `city=${encodeURIComponent(SP).replace(/%20/g, "+")}&compare=1&layer1=${spA}`,
  );
});

// --- reducer -------------------------------------------------------------------

test("a new layer is drawn above the active ones and leaves with its opacity", () => {
  let state = geoportalReducer(emptyState(), {
    type: "toggleLayer",
    id: spA,
    on: true,
  });
  state = geoportalReducer(state, { type: "toggleLayer", id: spB, on: true });
  assert.deepEqual(state.layers, [spA, spB]);
  state = geoportalReducer(state, { type: "setOpacity", id: spA, value: 30.4 });
  assert.equal(opacityOf(state, spA), 30);
  assert.equal(opacityOf(state, spB), DEFAULT_OPACITY);
  state = geoportalReducer(state, { type: "toggleLayer", id: spA, on: false });
  assert.deepEqual(state.layers, [spB]);
  assert.deepEqual(state.opacity, {});
});

test("changing city clears layers but keeps the comparison mode", () => {
  const start = emptyState({
    layers: [spA],
    opacity: { [spA]: 10 },
    compare: { enabled: true, view: "split", left: spA, right: spB },
  });
  const state = geoportalReducer(start, { type: "selectCity", city: RJ });
  assert.equal(state.city, RJ);
  assert.deepEqual(state.layers, []);
  assert.deepEqual(state.opacity, {});
  assert.deepEqual(state.compare, {
    enabled: true,
    view: "split",
    left: null,
    right: null,
  });
});

test("reordering cannot add or drop layers", () => {
  const start = emptyState({ layers: [spA, spB] });
  assert.deepEqual(
    geoportalReducer(start, { type: "setLayerOrder", layers: [spB, spA] })
      .layers,
    [spB, spA],
  );
  assert.equal(
    geoportalReducer(start, { type: "setLayerOrder", layers: [spA, spC] }),
    start,
  );
});

test("comparison fills the left side first, then the right one", () => {
  let state = geoportalReducer(emptyState({ layers: [spC] }), {
    type: "setCompare",
    enabled: true,
  });
  assert.deepEqual(state.layers, []);
  state = geoportalReducer(state, {
    type: "toggleCompareLayer",
    id: spA,
    on: true,
  });
  state = geoportalReducer(state, {
    type: "toggleCompareLayer",
    id: spB,
    on: true,
  });
  assert.deepEqual([state.compare.left, state.compare.right], [spA, spB]);
  const full = geoportalReducer(state, {
    type: "toggleCompareLayer",
    id: spC,
    on: true,
  });
  assert.equal(
    full,
    state,
    "com os dois lados ocupados, uma terceira camada não entra",
  );

  state = geoportalReducer(state, {
    type: "toggleCompareLayer",
    id: spA,
    on: false,
  });
  assert.deepEqual([state.compare.left, state.compare.right], [null, spB]);
  assert.deepEqual(visibleLayers(state), { primary: [], secondary: [spB] });
  state = geoportalReducer(state, {
    type: "toggleCompareLayer",
    id: spC,
    on: true,
  });
  assert.equal(state.compare.left, spC);
});

// --- ordem, grupos, geocoding, escala ------------------------------------------

test("dragging in the list moves the layer in the draw order", () => {
  // Lista exibida: [C, B, A] (C desenhada por cima).
  const draw = [spA, spB, spC];
  assert.deepEqual(toDisplayOrder(draw), [spC, spB, spA]);
  assert.deepEqual(moveInDisplayOrder(draw, spA, spC), [spB, spC, spA]);
  assert.deepEqual(moveInDisplayOrder(draw, spC, spB), [spA, spC, spB]);
  assert.deepEqual(moveInDisplayOrder(draw, "x", spB), draw);
});

test("layers are grouped by catalog theme in the sidebar order", () => {
  const layers = [
    {
      id: "a",
      theme: "Habitação e Mercado Imobiliário",
      themeLabel: "Habitação",
    },
    { id: "b", theme: "Multidisciplinar e Transversal", themeLabel: "Multi" },
    { id: "c" },
    { id: "d", theme: "Saúde", themeLabel: "Saúde" },
    { id: "e", theme: "Tema novo", themeLabel: "Novo" },
    {
      id: "f",
      theme: "Habitação e Mercado Imobiliário",
      themeLabel: "Habitação",
    },
  ];
  const groups = groupLayersByTheme(layers, "Outras camadas");
  assert.deepEqual(
    groups.map((group) => [group.label, group.layers.map((layer) => layer.id)]),
    [
      ["Habitação", ["a", "f"]],
      ["Saúde", ["d"]],
      ["Multi", ["b"]],
      ["Novo", ["e"]],
      ["Outras camadas", ["c"]],
    ],
  );
  assert.equal(groups.at(-1).key, OTHER_GROUP);
});

const area = { ...findCity(SP) };

test("the geocoding request is limited to the city", () => {
  assert.equal(
    buildGeocodeUrl({ query: "ab", token: "pk", area, language: "pt" }),
    null,
  );
  const url = new URL(
    buildGeocodeUrl({
      query: "  Rua   Augusta ",
      token: "pk",
      area,
      language: "en",
    }),
  );
  assert.equal(url.searchParams.get("q"), "Rua Augusta");
  assert.equal(url.searchParams.get("bbox"), area.bbox.join(","));
  assert.equal(url.searchParams.get("proximity"), area.center.join(","));
  assert.equal(url.searchParams.get("country"), "br");
  assert.equal(url.searchParams.get("language"), "en");
});

function feature(name, wikidataId, extra = {}) {
  return {
    type: "Feature",
    geometry: { type: "Point", coordinates: [-46.65, -23.56] },
    properties: {
      mapbox_id: `${name}-${wikidataId}`,
      name,
      place_formatted: "São Paulo - São Paulo, Brasil",
      context: wikidataId
        ? { place: { name: "x", wikidata_id: wikidataId } }
        : {},
      ...extra,
    },
  };
}

test("results from neighbouring cities inside the bbox are discarded", () => {
  const payload = {
    features: [
      feature("Avenida Paulista 1000", "Q174"),
      feature("Rua Paulista 1000", "Q4035"), // Osasco
      feature("Travessa Paulista", "Q174"),
      feature("Travessa Paulista", "Q174"), // repetido
      feature("Sem município", null),
      feature("Pinheiros", "Q174", { bbox: [-46.7, -23.57, -46.67, -23.55] }),
    ],
  };
  const results = parseGeocodeResponse(payload, "Q174");
  assert.deepEqual(
    results.map((result) => result.name),
    ["Avenida Paulista 1000", "Travessa Paulista", "Pinheiros"],
  );
  assert.deepEqual(results[2].bbox, [-46.7, -23.57, -46.67, -23.55]);
  assert.deepEqual(
    parseGeocodeResponse({ message: "Not Authorized" }, "Q174"),
    [],
  );

  const many = {
    features: Array.from({ length: 9 }, (_, index) =>
      feature(`Rua ${index}`, "Q174"),
    ),
  };
  assert.equal(parseGeocodeResponse(many, "Q174").length, MAX_RESULTS);
});

test("the scale bar uses a round distance that fits", () => {
  assert.deepEqual(computeScaleBar(1340, 100), {
    width: 75,
    value: 1,
    unit: "km",
  });
  assert.deepEqual(computeScaleBar(420, 100), {
    width: 71,
    value: 300,
    unit: "m",
  });
  assert.deepEqual(computeScaleBar(5600, 100), {
    width: 89,
    value: 5,
    unit: "km",
  });
  assert.equal(computeScaleBar(0, 100), null);
});
