# Geoportal — Documentação Técnica

Mapa interativo baseado em **Mapbox GL JS** que permite visualizar camadas de dados geoespaciais por cidade, com suporte a modo de comparação, estado compartilhável via URL e navegação integrada ao Catálogo de Dados.

---

## Funcionalidades

| Funcionalidade | Descrição |
|---|---|
| **Seleção de cidade** | Rio de Janeiro e São Paulo |
| **Camadas temáticas** | Toggle de layers vetoriais por cidade com opacidade ajustável |
| **Modo comparação** | Visualização lado a lado de duas camadas com slider divisório |
| **Estado na URL** | Toda a visualização é serializável e compartilhável via URL |
| **Integração com catálogo** | Link direto da camada para o registro no Catálogo de Dados |
| **Tema do mapa** | Alternância entre basemap dark e light |
| **Hover popup** | Exibe atributos do feature ao passar o mouse |
| **Legenda automática** | Gerada a partir dos estilos de cada camada |

---

## Arquitetura de Componentes

```mermaid
graph TD
    A["GeoportalPage\n/mapas/page.tsx"] --> B["PropertyMap\ncomponents/property-map.tsx"]

    B --> C["CityAccordion\nSeleção de cidade"]
    B --> D["CityLayers\nModo normal"]
    B --> E["CityLayersComparison\nModo comparação"]
    B --> F["CollapsibleLegend\nLegenda + tema"]
    B --> G["Hover popup\n(inline no property-map)"]

    D --> H["city-layers.ts\nConfiguração e metadados"]
    E --> H
    H --> I["layer-styles.ts\nEstilos visuais Mapbox"]
```

> **Nota:** o popup de hover é implementado **inline** no `property-map.tsx`
> (via `mapboxgl.Popup`). O componente `map-popup.tsx` e o seletor alternativo
> `city-combobox.tsx` existem no diretório mas **não são utilizados** atualmente
> (o seletor de cidade ativo é o `city-accordion.tsx`).

---

## Estado serializado na URL

Toda a visualização é capturada em query params. Ao copiar e colar a URL, o mapa restaura exatamente o mesmo estado.

### Modo normal

```
/mapas?city=Rio+de+Janeiro
  &layers=ic_areas-3ii8xj,quali_area-1ci0wo
  &opacity=ic_areas-3ii8xj:50,quali_area-1ci0wo:80
  &zoom=12.2900
  &bearing=17.60
  &pitch=34.50
  &lat=-22.84302
  &lng=-43.26905
```

### Modo comparação

```
/mapas?compare=1
  &city=Rio+de+Janeiro
  &layer1=ic_areas-3ii8xj
  &layer2=quali_area-1ci0wo
  &opacity=ic_areas-3ii8xj:50,quali_area-1ci0wo:80
  &zoom=12.2900&bearing=17.60&pitch=34.50
  &lat=-22.84302&lng=-43.26905
```

### Parâmetros disponíveis

| Param | Tipo | Padrão | Descrição |
|---|---|---|---|
| `city` | string | `""` | Nome da cidade selecionada |
| `layers` | CSV | `""` | IDs das camadas ativas (modo normal) |
| `opacity` | CSV de `id:val` | `""` | Opacidade por camada (0–100) |
| `zoom` | float | zoom da cidade | Nível de zoom do mapa |
| `bearing` | float | `0` | Rotação em graus |
| `pitch` | float | `0` | Inclinação em graus |
| `lat` | float | — | Latitude do centro |
| `lng` | float | — | Longitude do centro |
| `theme` | `dark` \| `light` | `light` | Tema do basemap |
| `compare` | `1` | — | Ativa modo comparação |
| `layer1` | string | — | Camada esquerda (modo comparação) |
| `layer2` | string | — | Camada direita (modo comparação) |

### Fluxo de leitura/escrita da URL

```mermaid
sequenceDiagram
    participant URL
    participant Component as PropertyMap
    participant Map as Mapbox GL

    URL->>Component: useSearchParams() na montagem
    Component->>Component: Inicializa estado (cidade, layers, opacidades)
    Component->>Map: new mapboxgl.Map({ center, zoom, bearing, pitch })
    Map->>Map: on("load") → adiciona layers salvas
    Map->>Component: on("moveend") → atualiza mapViewportRef
    Component->>URL: router.replace() via updateURL()
    Note over Component,URL: useEffect observa todas mudanças de estado
```

---

## Camadas disponíveis

As camadas vêm do registro `portal/geoportal/data/geoportal_layers.csv`, no repositório [portalcidados-data](https://github.com/inspercidades/portalcidados-data).

### Rio de Janeiro

| ID | Nome | Catálogo |
|---|---|---|
| `ic_areas-3ii8xj` | Ilhas de calor | [Item 8](/catalogo-de-dados?item=8) |
| `ic_pontos-90vwh4` | Ilhas de calor (pontos de medição) | [Item 8](/catalogo-de-dados?item=8) |
| `quali_area-1ci0wo` | Qualidade do ar | [Item 8](/catalogo-de-dados?item=8) |
| `quali_pontos-b424eh` | Qualidade do ar (pontos de medição) | [Item 8](/catalogo-de-dados?item=8) |

### São Paulo

| ID | Nome | Catálogo |
|---|---|---|
| `faixa-azul-trechos-spo` | Faixa Azul | [Item 15](/catalogo-de-dados?item=15) |
| `sinistros-por-distrito-spo` | Sinistros por distrito | [Item 14](/catalogo-de-dados?item=14) |
| `sinistros-por-trecho-spo` | Sinistros por trecho de via | [Item 14](/catalogo-de-dados?item=14) |
| `densidade-hab-setor` | Densidade habitacional (setor censitário) | [Item 2](/catalogo-de-dados?item=2) |
| `densidade-hab-distrito-spo` | Densidade habitacional (distrito) | [Item 2](/catalogo-de-dados?item=2) |
| `densidade-pop-setor-spo` | Densidade populacional (setor censitário) | [Item 2](/catalogo-de-dados?item=2) |
| `densidade-pop-distrito-spo` | Densidade populacional (distrito) | [Item 2](/catalogo-de-dados?item=2) |
| `verticalizacao-setor` | Verticalização (setor censitário) | [Item 2](/catalogo-de-dados?item=2) |
| `verticalizacao-distrito-spo` | Verticalização (distrito) | [Item 2](/catalogo-de-dados?item=2) |
| `raster-dbiubd` | Verticalização (grade) | [Item 2](/catalogo-de-dados?item=2) |
| `geoses-spo` | GeoSES | [Item 16](/catalogo-de-dados?item=16) |
| `mortalidade_materna_fem` | Mortalidade materna (fem.) | [Item 9](/catalogo-de-dados?item=9) |
| `isquemicas_coracao_masc` | Doenças isquêmicas do coração (masc.) | [Item 9](/catalogo-de-dados?item=9) |
| `isquemicas_coracao_fem` | Doenças isquêmicas do coração (fem.) | [Item 9](/catalogo-de-dados?item=9) |
| `cerebrovasculares_masc` | Doenças cerebrovasculares (masc.) | [Item 9](/catalogo-de-dados?item=9) |
| `cerebrovasculares_fem` | Doenças cerebrovasculares (fem.) | [Item 9](/catalogo-de-dados?item=9) |
| `diabetes_masc` | Diabetes mellitus (masc.) | [Item 9](/catalogo-de-dados?item=9) |
| `diabetes_fem` | Diabetes mellitus (fem.) | [Item 9](/catalogo-de-dados?item=9) |

---

## Modo de Comparação

O modo comparação instancia dois mapas Mapbox independentes (`beforeMap` e `afterMap`) e usa a biblioteca `mapbox-gl-compare` para o slider divisório. Os mapas compartilham o mesmo viewport via sincronização automática do `mapbox-gl-compare`.

```mermaid
graph LR
    subgraph "Modo Normal"
        M1["map.current\n(único)"]
    end

    subgraph "Modo Comparação"
        M2["beforeMap\n(esquerda)"]
        M3["afterMap\n(direita)"]
        S["Slider divisório\nmapbox-gl-compare"]
        M2 <--> S
        S <--> M3
    end

    Toggle["toggleComparisonMode()"] -->|"isComparisonMode = true"| M2
    Toggle -->|"isComparisonMode = true"| M3
```

**Limitações do modo comparação:**
- Suporta exatamente **1 camada por lado**
- Ao entrar no modo comparação, todas as camadas ativas são removidas
- O viewport é rastreado pelo `beforeMap` (os dois mapas se movem em sincronia)

---

## Integração com o Catálogo de Dados

Quando uma camada está selecionada e possui `catalogItemId` definido em `city-layers.ts`, um link **"Acessar base de dados"** aparece abaixo do slider de opacidade. O caminho inverso (catálogo → geoportal) está documentado em [`docs/CATALOG_GEOPORTAL_INTEGRATION.md`](../../../../../docs/CATALOG_GEOPORTAL_INTEGRATION.md).

---

## Adicionando uma camada

As camadas, os textos e as cores são gerados no repositório [portalcidados-data](https://github.com/inspercidades/portalcidados-data). Não edite `lib/city-layers.ts` nem `lib/layer-styles.ts` à mão: a próxima geração sobrescreve as mudanças.

1. Lá, adicione uma linha ao registro `portal/geoportal/data/geoportal_layers.csv`, com cidade, nome, textos, tileset, `source-layer`, variável, item do catálogo e enquadramento.
2. Gere o tileset e o estilo com o pipeline em R (`geoportal/R/mapbox.R`). Ele escreve `layer-styles-*.ts`.
3. Rode `portal/geoportal/R/create_city_layers.R`, que escreve `city-layers.ts`.
4. Copie os dois arquivos gerados para `lib/` e abra um PR aqui.

Cada camada de `cityLayersConfig` segue a interface `CityLayer`:

```ts
{
  id: "meu-layer-id",
  name: "Nome na UI",
  summary: "Texto curto do tooltip (i) no painel.",
  description: "Texto da legenda, com unidade, período e fonte.",
  tilesetId: "observatorio-nacional.XXXXXXXX",
  sourceLayer: "nome_do_source_layer", // DEVE bater com a chave em layer-styles.ts
  layerType: "fill",          // fill | line | circle | symbol
  hasCustomStyle: true,       // convenção (não é lido em runtime; ver nota abaixo)
  catalogItemId: "42",        // opcional — ID do item no catálogo
  mapView: {                  // opcional — voo automático ao ativar
    center: [-43.27, -22.84],
    zoom: 12,
    bearing: 0,
    pitch: 0,
  },
}
```

O tooltip mostra `summary` e, na falta dele, `description`.

> O estilo customizado é resolvido pela **chave `sourceLayer`** em
> `lib/layer-styles.ts` (via `createStyledLayer`). O campo `hasCustomStyle`
> **não é consultado** pelo runtime — se o `sourceLayer` não bater com uma
> entrada de `layerStyles`, a camada aparece no estilo azul padrão.

---

## Variáveis de ambiente

```env
NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1...
```

---

## Arquivos do módulo

| Arquivo | Responsabilidade |
|---|---|
| `page.tsx` | Entry point da rota `/mapas` |
| `components/property-map.tsx` | Orquestrador principal — mapa, estado, URL |
| `components/city-accordion.tsx` | Seleção de cidade |
| `components/city-layers.tsx` | Painel de camadas (modo normal) |
| `components/city-layers-comparison.tsx` | Painel de camadas (modo comparação) |
| `components/collapsible-legend.tsx` | Legenda colapsável + toggle de tema |
| `components/map-legend.tsx` | Renderização da legenda por layer |
| `components/city-combobox.tsx` | Seletor de cidade alternativo — **não utilizado** |
| `components/map-popup.tsx` | Componente de popup — **não utilizado** (popup é inline no `property-map.tsx`) |
| `lib/city-layers.ts` | Configuração de camadas por cidade + lookup catálogo |
| `lib/layer-styles.ts` | Estilos visuais Mapbox (paint/layout) |
