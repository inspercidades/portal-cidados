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

const { cityLayersConfig } = await loadTypescript(
  "../src/app/(app)/mapas/lib/city-layers.ts",
);
const { catalogData, filterOptions } = await loadTypescript(
  "../src/lib/data/catalog.ts",
);

test("catalog collections keep the GeoPortal links and filter values", () => {
  const byId = new Map(catalogData.map((item) => [item.id, item]));
  assert.equal(byId.size, catalogData.length);

  const linkedIds = new Set(
    Object.values(cityLayersConfig)
      .flat()
      .map((layer) => layer.catalogItemId)
      .filter(Boolean),
  );
  for (const id of linkedIds)
    assert.ok(byId.has(id), `Missing catalog ID ${id}`);

  for (const [id, title] of Object.entries({
    2: "Densidade",
    8: "Maré",
    9: "mortalidade",
    14: "Sinistros",
    15: "Faixa Azul",
    16: "GeoSES",
  })) {
    assert.ok(
      byId.get(id)?.title.includes(title),
      `Catalog ID ${id} changed collection`,
    );
  }

  for (const item of catalogData) {
    assert.ok(
      filterOptions.themes.includes(item.theme),
      `${item.id}: unknown theme`,
    );
    assert.ok(
      filterOptions.regions.includes(item.region),
      `${item.id}: unknown region`,
    );
    assert.ok(
      filterOptions.accessMethods.includes(item.accessMethod),
      `${item.id}: unknown access method`,
    );
  }
});

test("catalog data includes publication dates and source metadata", () => {
  for (const item of catalogData) {
    assert.match(item.createdAt, /^\d{4}-\d{2}-\d{2}$/);
    assert.notEqual(
      item.createdAt,
      "2026-09-25",
      `${item.id}: placeholder date`,
    );
    assert.ok(item.sources.length > 0, `${item.id}: missing source`);
    assert.ok(item.periodStart <= item.periodEnd, `${item.id}: invalid period`);
    assert.ok(Array.isArray(item.formats), `${item.id}: missing formats`);
    assert.ok(item.dataset_info.length > 0, `${item.id}: missing datasets`);
    for (const dataset of item.dataset_info) {
      assert.ok(dataset.source, `${item.id}: dataset missing source`);
      assert.ok(
        Array.isArray(dataset.formats),
        `${item.id}: dataset missing formats`,
      );
    }
  }
});
