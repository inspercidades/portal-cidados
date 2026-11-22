# 07 — Geoportal

[← Voltar ao índice](./README.md)

O Geoportal (`/mapas`) é o mapa interativo da plataforma, baseado em
**Mapbox GL JS**. Este capítulo dá a visão de desenvolvedor e aponta para a
documentação detalhada já existente no módulo.

## Sumário

- [Visão geral do módulo](#visão-geral-do-módulo)
- [Documentação do módulo (links)](#documentação-do-módulo-links)
- [Estrutura de arquivos](#estrutura-de-arquivos)
- [Estado e motor do mapa](#estado-e-motor-do-mapa)
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

- Escolher a cidade (Rio de Janeiro ou São Paulo) num modal de entrada e trocar
  depois pelo dropdown sobre o mapa.
- Ligar camadas agrupadas pelo tema do catálogo, ajustar a opacidade e mudar a
  ordem de empilhamento arrastando.
- Buscar endereços dentro do município escolhido.
- Comparar duas camadas em barra deslizante ou lado a lado.
- Trocar o mapa base (claro, escuro, satélite) e ligar a visão 3D com relevo.
- Compartilhar a visualização (Web Share API, com cópia do link como
  alternativa) e entrar no modo apresentação.
- Ver atributos do polígono sob o cursor e a legenda fixa de cada camada.
- Saltar para o item do catálogo e para a história que usa o dado.

Diferentemente das demais páginas, o Geoportal tem UI de tela cheia própria e
**não** usa o `Header` global. Os painéis são sempre claros
(`force-light-theme`), independentemente do tema do site.

## Documentação do módulo (links)

O módulo já possui documentação detalhada. **Este capítulo não a duplica** —
consulte diretamente:

- [Geoportal README](../../src/app/[lang]/(app)/mapas/README.md) — visão completa:
  features, arquitetura de componentes, parâmetros de URL, inventário de camadas.
- [WORKFLOW.md](../../src/app/[lang]/(app)/mapas/WORKFLOW.md) — passo a passo do
  Mapbox Studio ao código (para a equipe de dados).
- [LAYER_STYLES_GUIDE.md](../../src/app/[lang]/(app)/mapas/LAYER_STYLES_GUIDE.md) —
  como integrar estilos visuais de camada.
- [PROPOSTA_WORKFLOW_R.md](../../src/app/[lang]/(app)/mapas/PROPOSTA_WORKFLOW_R.md) —
  proposta de gerar estilos Mapbox GL diretamente em R (ainda não implementada).
- [CATALOG_GEOPORTAL_INTEGRATION.md](../CATALOG_GEOPORTAL_INTEGRATION.md) —
  integração bidirecional Catálogo ↔ Geoportal.

## Estrutura de arquivos

```
src/app/[lang]/(app)/mapas/
├── page.tsx                  # Server: metadados + getGeoportalLayers(locale)
├── geoportal-map.tsx         # Fronteira cliente (next/dynamic, ssr: false)
├── components/
│   ├── geoportal.tsx         # Composição: estado, URL, ações, layout
│   ├── city-picker.tsx       # Modal de cidade + dropdown sobre o mapa
│   ├── menus.tsx             # Menu do site e mapa base
│   ├── map-legend.tsx        # Legenda fixa
│   ├── map-scale.tsx         # Escala
│   └── sidebar/              # Busca, camadas por tema, comparação, ordem
├── hooks/                    # Mapas e comparação, busca, media query
├── engine/                   # Imperativo (Mapbox): controller, hover, sync
└── lib/                      # Puro e testado; city-layers.ts e layer-styles.ts são gerados
```

## Estado e motor do mapa

- O estado vive num reducer puro (`lib/geoportal-state.ts`). O mapa é
  derivado dele: os componentes não chamam `addLayer` diretamente.
- `engine/map-controller.ts` envolve uma instância do Mapbox e aplica a
  diferença entre o que deve estar no mapa e o que está. Ao trocar o mapa base
  (`setStyle`), recoloca camadas, relevo e listeners no `style.load`.
- Token: `NEXT_PUBLIC_MAPBOX_TOKEN`. Sem ele, a página mostra um aviso em vez
  do mapa.
- Mapas base: **claro** `mapbox://styles/observatorio-nacional/...` (Mapbox
  Standard, exige `'wasm-unsafe-eval'` na CSP), **escuro**
  `mapbox://styles/mapbox/dark-v11`, **satélite**
  `mapbox://styles/mapbox/satellite-streets-v12`.
- Custo: tudo cabe no map load do GL JS, exceto a busca de endereço (geocoding
  temporário, gratuito até 100 mil requisições/mês).

Pipeline de adição de camada, quando o usuário liga uma camada:

1. Adiciona o source vetorial (`mapbox://{tilesetId}`).
2. Tenta o estilo customizado via `createStyledLayer()` (busca por
   `sourceLayer`); se não houver, cai no estilo padrão azul.
3. Anexa o hover (popup só da camada de cima + contorno do polígono).
4. Define opacidade (padrão **80%**) e a ordem de empilhamento.
5. `flyTo` se a camada tiver `mapView`.

## Camadas: `city-layers.ts` e `layer-styles.ts`

**Metadados** ([`lib/city-layers.ts`](../../src/app/[lang]/(app)/mapas/lib/city-layers.ts)):

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

**Estilos** ([`lib/layer-styles.ts`](../../src/app/[lang]/(app)/mapas/lib/layer-styles.ts)):
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
Referência completa no
[Geoportal README](../../src/app/[lang]/(app)/mapas/README.md#estado-serializado-na-url).
Resumo:

- Modo normal: `city`, `layers` (CSV, de baixo para cima), `opacity`
  (`id:val,...`), `theme` (`dark` | `satellite`; claro é o padrão), `terrain`,
  `zoom`, `bearing`, `pitch`, `lat`, `lng`.
- Modo comparação: `compare=1`, `layer1`, `layer2` (no lugar de `layers`) e
  `view=split` para lado a lado.

A leitura (`lib/url-state.ts`) valida tudo. A escrita usa
`window.history.replaceState` com debounce.

## Modo de comparação

- Entrar cria um segundo mapa com a câmera do principal; sair remove só ele.
- **Deslizar:** `mapbox-gl-compare` (vertical no desktop, horizontal no
  celular). **Lado a lado:** metades com câmeras sincronizadas
  (`engine/sync-cameras.ts`). Alternar não recria mapas.
- Exatamente **1 camada por lado**; entrar ou sair limpa as camadas.

## Legenda, opacidade e hover

- **Legenda automática:** `getLayerLegend(sourceLayer)` parseia as expressões de
  `paint` (`interpolate`, `step`, `match`, `case`) — não é preciso configurar a
  legenda manualmente. Fica fixa no canto inferior esquerdo (`map-legend.tsx`),
  um card por camada.
- **Opacidade:** slider 0–100% por camada (padrão 80%), aplicado à propriedade de
  paint específica do tipo (`fill-opacity`, `line-opacity`, etc.). Serializada na
  URL como `opacity=id:val,...`.
- **Hover popup:** `engine/hover.ts` — um popup por mapa, da camada de cima,
  com até 8 propriedades (montado com nós de texto, sem `innerHTML`). Em toque,
  o toque faz o papel do hover.

## Integração com o Catálogo

O elo é o campo `catalogItemId` em cada `CityLayer`, que corresponde ao `id` em
[`catalog.ts`](../../src/lib/data/catalog.ts):

- **Geoportal → Catálogo:** quando uma camada com `catalogItemId` está ativa, o
  painel mostra os links "Acessar dado" e, se houver, "Acessar história"
  (`/catalogo-de-dados?item={id}`).
- **Catálogo → Geoportal:** o `DataCard` usa `getLayersForCatalogItem(id)` e
  renderiza "Ver dados no mapa" (`/mapas?city=...&layers=...`).

Detalhes e tabela de mapeamento completa em
[CATALOG_GEOPORTAL_INTEGRATION.md](../CATALOG_GEOPORTAL_INTEGRATION.md). Ver
também o [capítulo 08](./08-catalogo-de-dados.md).

## Checklist: adicionar uma nova camada

Fluxo completo em [WORKFLOW.md](../../src/app/[lang]/(app)/mapas/WORKFLOW.md).
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

1. As camadas da cidade chegam em `cityLayersConfig` (`lib/city-layers.ts`),
   pelo pipeline em R.
2. Adicione a cidade em `lib/cities.ts`: centro, zoom, bbox e Wikidata do
   município. O teste `tests/mapas-geoportal.test.mjs` falha se faltar.

---

[← 06 — Histórias](./06-historias-scrollytelling.md) · [Voltar ao índice](./README.md) · [Próximo: 08 — Catálogo de Dados →](./08-catalogo-de-dados.md)
