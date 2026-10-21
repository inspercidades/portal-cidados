# 07 — Geoportal

[← Voltar ao índice](./README.md)

O Geoportal (`/mapas`) é o mapa interativo da plataforma, baseado em
**Mapbox GL JS**. Este capítulo dá a visão de desenvolvedor e aponta para a
documentação detalhada já existente no módulo.

## Sumário

- [Visão geral do módulo](#visão-geral-do-módulo)
- [Documentação do módulo (links)](#documentação-do-módulo-links)
- [Estrutura de arquivos](#estrutura-de-arquivos)
- [Orquestrador: `property-map.tsx`](#orquestrador-property-maptsx)
- [Camadas: `city-layers.ts` e `layer-styles.ts`](#camadas-city-layersts-e-layer-stylests)
- [Estado serializado na URL](#estado-serializado-na-url)
- [Modo de comparação](#modo-de-comparação)
- [Legenda, opacidade e hover](#legenda-opacidade-e-hover)
- [Integração com o Catálogo](#integração-com-o-catálogo)
- [Checklist: adicionar uma nova camada](#checklist-adicionar-uma-nova-camada)
- [Checklist: adicionar uma nova cidade](#checklist-adicionar-uma-nova-cidade)

---

## Visão geral do módulo

O Geoportal permite:

- Selecionar cidade (Rio de Janeiro, São Paulo, ou visão nacional "Brasil").
- Ligar/desligar camadas temáticas por cidade, com opacidade ajustável.
- Comparar duas camadas lado a lado (slider divisório).
- Compartilhar a visualização inteira via URL (cidade, camadas, opacidades,
  viewport e tema).
- Ver atributos do feature no hover e legenda automática por camada.
- Saltar para o registro correspondente no Catálogo de Dados.

Diferentemente das demais páginas, o Geoportal tem UI de tela cheia própria e
**não** usa o `Header` global.

## Documentação do módulo (links)

O módulo já possui documentação detalhada. **Este capítulo não a duplica** —
consulte diretamente:

- [Geoportal README](../../src/app/(app)/mapas/README.md) — visão completa:
  features, arquitetura de componentes, parâmetros de URL, inventário de camadas.
- [WORKFLOW.md](../../src/app/(app)/mapas/WORKFLOW.md) — passo a passo do
  Mapbox Studio ao código (para a equipe de dados).
- [LAYER_STYLES_GUIDE.md](../../src/app/(app)/mapas/LAYER_STYLES_GUIDE.md) —
  como integrar estilos visuais de camada.
- [PROPOSTA_WORKFLOW_R.md](../../src/app/(app)/mapas/PROPOSTA_WORKFLOW_R.md) —
  proposta de gerar estilos Mapbox GL diretamente em R (ainda não implementada).
- [CATALOG_GEOPORTAL_INTEGRATION.md](../CATALOG_GEOPORTAL_INTEGRATION.md) —
  integração bidirecional Catálogo ↔ Geoportal.

## Estrutura de arquivos

```
src/app/(app)/mapas/
├── page.tsx                          # Rota /mapas (Suspense + PropertyMap)
├── components/
│   ├── property-map.tsx              # Orquestrador principal (mapa, estado, URL)
│   ├── city-accordion.tsx            # Seleção de cidade (ativo)
│   ├── city-layers.tsx               # Painel de camadas — modo normal
│   ├── city-layers-comparison.tsx    # Painel de camadas — modo comparação
│   ├── collapsible-legend.tsx        # Legenda colapsável + toggle de tema
│   ├── map-legend.tsx                # Renderização da legenda por layer
│   ├── city-combobox.tsx             # (NÃO UTILIZADO — city-accordion é o ativo)
│   └── map-popup.tsx                 # (NÃO UTILIZADO — popup é inline no orquestrador)
└── lib/
    ├── city-layers.ts                # Metadados de camadas por cidade + mapeamento catálogo
    └── layer-styles.ts               # Estilos Mapbox (paint/layout) + parsing de legenda
```

> **Arquivos não utilizados:** `city-combobox.tsx` e `map-popup.tsx` não são
> importados atualmente. O seletor de cidade ativo é o `city-accordion.tsx`, e o
> popup de hover é implementado **inline** no `property-map.tsx` (via
> `mapboxgl.Popup`), não pelo componente `map-popup.tsx`.

## Orquestrador: `property-map.tsx`

[`PropertyMap`](../../src/app/(app)/mapas/components/property-map.tsx) é o
componente central (~1600 linhas). Ele detém todo o estado do mapa, a
sincronização com a URL, o ciclo de vida das camadas, o modo de comparação, os
popups de hover e o layout da UI.

- Token: `mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN`.
- `mapbox-gl-compare` é importado **dinamicamente** (evita erro de SSR).
- Basemaps: **dark** `mapbox://styles/mapbox/dark-v11`; **light**
  `mapbox://styles/observatorio-nacional/...`.
- Ao alternar tema (`setStyle`), o Mapbox remove as camadas customizadas — o
  código as **re-adiciona** no evento `style.load`.

Pipeline de adição de camada (modo normal), quando o usuário liga uma camada:

1. Adiciona o source vetorial (`mapbox://{tilesetId}`).
2. Tenta o estilo customizado via `createStyledLayer()` (busca por
   `sourceLayer`); se não houver, cai no estilo padrão azul
   (`createDefaultLayerConfig()`).
3. Anexa handlers de hover.
4. Define opacidade (padrão **80%**).
5. `flyTo` opcional se a camada tiver `mapView`.

## Camadas: `city-layers.ts` e `layer-styles.ts`

**Metadados** ([`lib/city-layers.ts`](../../src/app/(app)/mapas/lib/city-layers.ts)):

```ts
export interface CityLayer {
  id: string;              // usado na URL (?layers=)
  name: string;            // nome exibido na UI
  description?: string;    // tooltip
  tilesetId?: string;      // mapbox://{tilesetId}
  sourceLayer?: string;    // chave para o estilo em layer-styles.ts
  layerType?: "fill" | "line" | "circle" | "symbol";
  hasCustomStyle?: boolean;
  mapView?: LayerMapView;  // flyTo ao ativar (com overrides mobile)
  catalogItemId?: string;  // liga ao item do catálogo
}
```

**Estilos** ([`lib/layer-styles.ts`](../../src/app/(app)/mapas/lib/layer-styles.ts)):
o objeto `layerStyles` é **indexado pelo nome do `sourceLayer`** (não pelo `id`).

```ts
export function createStyledLayer(layerId, sourceLayer, _tilesetId): LayerStyle | null {
  const style = getLayerStyle(sourceLayer);   // lookup por sourceLayer
  if (!style) return null;                     // → cai no estilo padrão azul
  return { ...style, id: layerId, source: layerId, "source-layer": sourceLayer };
}
```

> **Nota importante (corrige docs antigas):** o campo `hasCustomStyle` é uma
> **convenção de metadados**; o runtime **não o consulta**. A resolução de
> estilo é sempre: existe entrada em `layerStyles[sourceLayer]` → usa o estilo
> customizado; senão → aplica o azul padrão. Ou seja, o que faz o estilo
> funcionar é a **chave `sourceLayer`** bater exatamente entre `city-layers.ts` e
> `layer-styles.ts`.

## Estado serializado na URL

Toda a visualização é capturada em query params e restaurada ao abrir a URL.
Referência completa dos parâmetros no
[Geoportal README](../../src/app/(app)/mapas/README.md#estado-serializado-na-url).
Resumo:

- Modo normal: `city`, `layers` (CSV de IDs), `opacity` (`id:val,...`), `zoom`,
  `bearing`, `pitch`, `lat`, `lng`, `theme`.
- Modo comparação: `compare=1`, `layer1`, `layer2` (no lugar de `layers`).

A escrita é feita com `router.replace(..., { scroll: false })` em resposta a
mudanças de estado e ao `moveend` do mapa.

## Modo de comparação

Usa a biblioteca `mapbox-gl-compare`, instanciando dois mapas (`beforeMap` /
`afterMap`) com um slider divisório:

- Orientação **vertical** no desktop, **horizontal** no mobile (reinicializa no
  `resize`).
- Exatamente **1 camada por lado**; ao entrar no modo, as camadas ativas são
  limpas.
- O viewport é rastreado pelo `beforeMap` (os mapas sincronizam via lib).

## Legenda, opacidade e hover

- **Legenda automática:** `getLayerLegend(sourceLayer)` parseia as expressões de
  `paint` (`interpolate`, `step`, `match`, `case`) — não é preciso configurar a
  legenda manualmente. Renderizada por `collapsible-legend.tsx` + `map-legend.tsx`.
- **Opacidade:** slider 0–100% por camada (padrão 80%), aplicado à propriedade de
  paint específica do tipo (`fill-opacity`, `line-opacity`, etc.). Serializada na
  URL como `opacity=id:val,...`.
- **Hover popup:** implementado **inline** no `property-map.tsx` — `mousemove`
  cria um `mapboxgl.Popup` com até 8 propriedades do feature; `mouseleave`
  remove.

## Integração com o Catálogo

O elo é o campo `catalogItemId` em cada `CityLayer`, que corresponde ao `id` em
[`catalog.ts`](../../src/lib/data/catalog.ts):

- **Geoportal → Catálogo:** quando uma camada com `catalogItemId` está ativa, o
  painel mostra um link "Acessar base de dados"
  (`/catalogo-de-dados?item={id}`).
- **Catálogo → Geoportal:** o `DataCard` usa `getLayersForCatalogItem(id)` e
  renderiza "Ver dados no mapa" (`/mapas?city=...&layers=...`).

Detalhes e tabela de mapeamento completa em
[CATALOG_GEOPORTAL_INTEGRATION.md](../CATALOG_GEOPORTAL_INTEGRATION.md). Ver
também o [capítulo 08](./08-catalogo-de-dados.md).

## Checklist: adicionar uma nova camada

Fluxo completo em [WORKFLOW.md](../../src/app/(app)/mapas/WORKFLOW.md).
Resumo:

1. Faça upload do tileset no Mapbox Studio (conta `observatorio-nacional`).
2. Anote o **`tilesetId`** e o **`source-layer name`**.
3. Estilize no Studio e copie o JSON de estilo.
4. Adicione o estilo em `lib/layer-styles.ts` — **chave = `source-layer name`**,
   com `layout: { visibility: "none" }`.
5. Registre os metadados em `lib/city-layers.ts` na cidade correta:

```ts
{
  id: "meu-layer-id",                       // usado em ?layers=
  name: "Nome na UI",
  description: "Aparece no tooltip.",
  tilesetId: "observatorio-nacional.XXXXXXXX",
  sourceLayer: "nome_do_source_layer",      // DEVE bater com a chave em layer-styles.ts
  layerType: "fill",                        // fill | line | circle | symbol
  catalogItemId: "42",                      // opcional — ID no catálogo
  mapView: { center: [-46.63, -23.55], zoom: 11, bearing: 0, pitch: 0 }, // opcional
}
```

6. Se ligar ao catálogo, garanta o item com `id` correspondente em
   `src/lib/data/catalog.ts`.
7. Teste: toggle, legenda, opacidade, hover, compartilhamento por URL e os links
   catálogo ↔ geoportal.

> **Erro mais comum:** camada aparece azul em vez do estilo customizado → o
> `sourceLayer` em `city-layers.ts` não bate exatamente com a chave em
> `layer-styles.ts`.

## Checklist: adicionar uma nova cidade

As cidades são hardcoded em múltiplos lugares (não há carregamento dinâmico):

1. Adicione a cidade em `cityLayersConfig` (`lib/city-layers.ts`).
2. Adicione coordenadas e zoom em `cityCoordinates` e `cityZoomLevels`
   (`property-map.tsx`).
3. Adicione a cidade ao array `cities` em `city-accordion.tsx`.
4. Faça upload/registro de todas as camadas da cidade (checklist acima).

---

[← 06 — Histórias](./06-historias-scrollytelling.md) · [Voltar ao índice](./README.md) · [Próximo: 08 — Catálogo de Dados →](./08-catalogo-de-dados.md)
