# Workflow: Do Mapbox Studio ao GeoPortal

## Visão geral

O fluxo para inserir um novo mapa no GeoPortal tem **3 etapas**:

1. Upload do tileset no Mapbox Studio
2. Estilização no Mapbox Studio e cópia do JSON de estilo
3. Colagem do estilo e metadados no código do frontend

---

## Etapa 1 — Upload do tileset

Os dados geoespaciais (shapefiles, geojson, mbtiles) são enviados como **tilesets** para a conta `observatorio-nacional` no Mapbox Studio.

Cada tileset recebe um ID único (ex: `observatorio-nacional.5m2vt75v`) e um **source layer name** (ex: `sinistros_distritos`).

---

## Etapa 2 — Estilização no Mapbox Studio

No Mapbox Studio, o layer é estilizado visualmente: cores, breaks numéricos, interpolações, etc.

Depois de estilizar, **copie a configuração JSON do estilo** gerada pelo Studio. Ela segue o formato de expressões do Mapbox GL JS. Exemplo:

```json
{
  "type": "fill",
  "source": "composite",
  "id": "sinistros-distritos",
  "paint": {
    "fill-color": [
      "interpolate",
      ["linear"],
      ["get", "Número.de.Sinistros..2022.2025."],
      500, "#fee5d9",
      1000, "#fcbba1",
      1500, "#fc9272",
      2100, "#fb6a4a",
      2500, "#ef3b2c",
      3000, "#cb181d",
      3914, "#99000d"
    ],
    "fill-outline-color": "#000000"
  },
  "source-layer": "sinistros_distritos"
}
```

---

## Etapa 3 — Colagem no código do frontend

### 3a. Registrar o estilo em `lib/layer-styles.ts`

Adicione uma entrada no objeto `layerStyles`, usando o **source layer name** como chave:

```typescript
export const layerStyles: Record<string, LayerStyle> = {
  // ... estilos existentes ...
  "seu_source_layer": {
    id: "seu-layer-id",
    type: "fill",           // fill | line | circle | symbol
    source: "composite",
    "source-layer": "seu_source_layer",
    paint: {
      "fill-color": [
        "interpolate",
        ["linear"],
        ["get", "sua_propriedade"],
        0, "#cor1",
        100, "#cor2"
      ]
    },
    layout: { visibility: "none" },
    slot: "",
  }
};
```

### 3b. Registrar os metadados em `lib/city-layers.ts`

Adicione o layer na configuração da cidade correspondente:

```typescript
{
  id: "seu-layer-id",
  name: "Nome exibido na UI",
  description: "Descrição que aparece no tooltip de informações.",
  tilesetId: "observatorio-nacional.XXXXXXXX",
  sourceLayer: "seu_source_layer", // DEVE bater com a chave em layer-styles.ts
  layerType: "fill",
  hasCustomStyle: true             // convenção (não é lido em runtime)
}
```

> **Importante:** o que faz o sistema usar o estilo de `layer-styles.ts` é a
> **chave `sourceLayer`** bater exatamente com a entrada de `layerStyles` (via
> `createStyledLayer`). Se não bater, um estilo padrão azul é aplicado. O campo
> `hasCustomStyle` é apenas documental e **não é consultado** pelo runtime.

---

## Legenda automática

A legenda é gerada **automaticamente** a partir das expressões de `paint` em `layer-styles.ts`. O componente `map-legend.tsx` parseia expressões do tipo:

| Tipo de expressão | Uso típico                        |
|--------------------|-----------------------------------|
| `interpolate`      | Escalas contínuas de cor          |
| `step`             | Faixas discretas de valor         |
| `match`            | Categorias (ex: tipo de tarifa)   |
| `case`             | Condições booleanas               |

Não é necessário configurar a legenda manualmente.

---

## Checklist para adicionar um novo layer

- [ ] Dados carregados como tileset no Mapbox Studio
- [ ] Anotar o **tileset ID** e o **source layer name**
- [ ] Estilizar no Mapbox Studio e copiar o JSON de estilo
- [ ] Adicionar estilo em `lib/layer-styles.ts` (chave = source layer name)
- [ ] Adicionar metadados em `lib/city-layers.ts` (com `sourceLayer` igual à chave em `layer-styles.ts`)
- [ ] Testar no site: toggle do layer, legenda e opacidade

---

## Tipos de layer suportados

| Tipo     | Uso                     |
|----------|-------------------------|
| `fill`   | Polígonos (áreas)       |
| `line`   | Linhas (vias, trechos)  |
| `circle` | Pontos                  |
| `symbol` | Textos / labels         |

---

## Arquivos relevantes

| Arquivo                          | Responsabilidade                          |
|----------------------------------|-------------------------------------------|
| `lib/layer-styles.ts`            | Estilos visuais (paint/layout) dos layers |
| `lib/city-layers.ts`             | Metadados e configuração por cidade       |
| `components/city-layers.tsx`     | UI de seleção de layers (sidebar)         |
| `components/map-legend.tsx`      | Legenda automática baseada nos estilos    |
