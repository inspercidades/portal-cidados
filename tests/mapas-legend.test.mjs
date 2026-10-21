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

const { extractLegendFromPaint, formatNumber } = await loadTypescript(
  "../src/app/(app)/mapas/lib/layer-styles.ts",
);

const NA = "#737373";

// The pipeline wraps every scale in a typeof check, so features without a
// value take the fallback color instead of Mapbox's black default.
const withNA = (property, scale) => [
  "case",
  ["==", ["typeof", ["get", property]], "number"],
  scale,
  NA,
];

test("numbers use a decimal comma and at most one decimal", () => {
  assert.equal(formatNumber(27.6), "27,6");
  assert.equal(formatNumber(1.4), "1,4");
  assert.equal(formatNumber(1772.49), "1.772,5");
  assert.equal(formatNumber(154205), "154.205");
  assert.equal(formatNumber(-0.5), "-0,5");
  assert.equal(formatNumber(0), "0");
});

test("step legends read as ranges and end with a no-data item", () => {
  const legend = extractLegendFromPaint({
    type: "fill",
    paint: {
      "fill-color": withNA("Densidade", [
        "step",
        ["get", "Densidade"],
        "#225EA8",
        40,
        "#41B6C4",
        62.5,
        "#FFFFCC",
      ]),
    },
  });
  assert.deepEqual(
    legend.map((item) => item.value),
    ["< 40", "40 a 62,5", "62,5+", "Sem dado"],
  );
  assert.equal(legend.at(-1).color, NA);
});

test("interpolate legends print each stop, negatives included", () => {
  const legend = extractLegendFromPaint({
    type: "fill",
    paint: {
      "fill-color": withNA("GeoSES", [
        "interpolate",
        ["linear"],
        ["get", "GeoSES"],
        -0.6,
        "#B2182B",
        0,
        "#F7F7F7",
        0.6,
        "#2166AC",
      ]),
    },
  });
  assert.deepEqual(
    legend.map((item) => item.value),
    ["-0,6", "0", "0,6", "Sem dado"],
  );
});

test("a scale without a no-data branch gets no no-data item", () => {
  const legend = extractLegendFromPaint({
    type: "line",
    paint: {
      "line-color": ["step", ["get", "Sinistros"], "#F03B20", 5, "#FFFFB2"],
    },
  });
  assert.deepEqual(
    legend.map((item) => item.value),
    ["< 5", "5+"],
  );
});
