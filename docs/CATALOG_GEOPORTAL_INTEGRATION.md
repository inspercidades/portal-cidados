# Integração Bidirecional: Catálogo de Dados ↔ Geoportal

Documentação da feature de navegação bidirecional entre o Catálogo de Dados (`/catalogo-de-dados`) e o Geoportal (`/mapas`).

---

## Visão Geral

Os datasets publicados no Catálogo de Dados são as mesmas fontes que alimentam as camadas do Geoportal. A integração bidirecional conecta essas duas páginas de forma que o usuário possa navegar de uma para a outra sem perder o contexto — com a camada ou o modal de registro já pré-carregados na página de destino.

```mermaid
graph LR
    subgraph Catálogo
        C1["Card do dataset\n(modal aberto)"]
        C2["Botão 'Ver dados no mapa'"]
    end

    subgraph Geoportal
        G1["Camada ativa\n(slider de opacidade)"]
        G2["Link 'Acessar base de dados'"]
    end

    G2 -->|"?item=8"| C1
    C2 -->|"?city=...&layers=..."| G1
```

---

## Casos de Uso

### Caso 1 — Geoportal → Catálogo

**Cenário:** o usuário está explorando camadas no mapa e quer saber mais sobre a origem dos dados.

1. O usuário seleciona uma camada (ex: **Ilhas de Calor**)
2. Abaixo do slider de opacidade, aparece o link **"Acessar base de dados"**
3. O clique navega para `/catalogo-de-dados?item=8`
4. O Catálogo de Dados abre com o modal do registro **"Medições de ilhas de calor e qualidade do ar, Favela da Maré-RJ [2023]"** já expandido

### Caso 2 — Catálogo → Geoportal

**Cenário:** o usuário está pesquisando datasets e quer visualizá-los no mapa.

1. O usuário abre o modal de um dataset que tem camadas correspondentes (ex: **Sinistros de Trânsito**)
2. No modal, aparece o botão **"Ver dados no mapa"**
3. O clique navega para `/mapas?city=São+Paulo&layers=sinistros-por-distrito-spo,sinistros-por-trecho-spo`
4. O Geoportal abre com São Paulo selecionado e as duas camadas de sinistros já ativas

---

## URLs de Navegação

### Geoportal → Catálogo

```
/catalogo-de-dados?item={catalogItemId}
```

O `catalogItemId` é definido por camada em `city-layers.ts` e corresponde ao `id` do item em `catalog.ts`.

### Catálogo → Geoportal

```
/mapas?city={cidade}&layers={layerId1},{layerId2},...
```

Os IDs das camadas são derivados dinamicamente via `getLayersForCatalogItem()` em `city-layers.ts`.

---

## Mapeamento Completo

A tabela abaixo documenta todas as relações entre camadas do Geoportal e registros do Catálogo. O campo `catalogItemId` em cada entrada de `city-layers.ts` é a fonte de verdade.

| Cidade | Layer ID | Nome da Camada | Catalog ID | Título no Catálogo |
|---|---|---|---|---|
| Rio de Janeiro | `ic_areas-3ii8xj` | Ilhas de Calor | **8** | Medições de ilhas de calor e qualidade do ar, Favela da Maré-RJ [2023] |
| Rio de Janeiro | `ic_pontos-90vwh4` | Ilhas de Calor (pontos de captura) | **8** | Medições de ilhas de calor e qualidade do ar, Favela da Maré-RJ [2023] |
| Rio de Janeiro | `quali_area-1ci0wo` | Qualidade do Ar | **8** | Medições de ilhas de calor e qualidade do ar, Favela da Maré-RJ [2023] |
| Rio de Janeiro | `quali_pontos-b424eh` | Qualidade do Ar (pontos de captura) | **8** | Medições de ilhas de calor e qualidade do ar, Favela da Maré-RJ [2023] |
| São Paulo | `faixa-azul-trechos-spo` | Faixa Azul | **15** | Trechos com Faixas Dedicadas a Mociclistas (Faixa Azul) [2022-2025] |
| São Paulo | `sinistros-por-distrito-spo` | Sinistros por Distrito | **14** | Sinistros de Trânsito [2022-2025] |
| São Paulo | `sinistros-por-trecho-spo` | Sinistros em Trechos de Vias | **14** | Sinistros de Trânsito [2022-2025] |
| São Paulo | `densidade-hab-setor` | Densidade Hab. (setor censitário) | **2** | Densidade Populacional e Verticalização [2022,2024] |
| São Paulo | `densidade-hab-distrito-spo` | Densidade Hab. (distrito) | **2** | Densidade Populacional e Verticalização [2022,2024] |
| São Paulo | `densidade-pop-setor-spo` | Densidade Pop. (setor censitário) | **2** | Densidade Populacional e Verticalização [2022,2024] |
| São Paulo | `densidade-pop-distrito-spo` | Densidade Pop. (distrito) | **2** | Densidade Populacional e Verticalização [2022,2024] |
| São Paulo | `verticalizacao-setor` | Verticalização (setor censitário) | **2** | Densidade Populacional e Verticalização [2022,2024] |
| São Paulo | `verticalizacao-distrito-spo` | Verticalização (distrito) | **2** | Densidade Populacional e Verticalização [2022,2024] |
| São Paulo | `raster-dbiubd` | Verticalização (grid) | **2** | Densidade Populacional e Verticalização [2022,2024] |
| São Paulo | `populacao-por-distrito-spo` | População Feminina (distrito) | **2** | Densidade Populacional e Verticalização [2022,2024] |
| São Paulo | `geoses-spo` | GeoSES | **16** | Índice GeoSES [2010] |
| São Paulo | `gastos_ubs_distritos-c6rpx4` | Gastos UBS (distrito) | — | *(sem correspondência no catálogo)* |
| São Paulo | `mortalidade_materna_fem` | Mortalidade Materna (femi.) | **9** | Mortalidade prematura por distrito [2019] |
| São Paulo | `isquemicas_coracao_masc` | Doenças Isquêmicas do Coração (masc.) | **9** | Mortalidade prematura por distrito [2019] |
| São Paulo | `isquemicas_coracao_fem` | Doenças Isquêmicas do Coração (femi.) | **9** | Mortalidade prematura por distrito [2019] |
| São Paulo | `cerebrovasculares_masc` | Doenças Cerebrovasculares (masc.) | **9** | Mortalidade prematura por distrito [2019] |
| São Paulo | `cerebrovasculares_fem` | Doenças Cerebrovasculares (femi.) | **9** | Mortalidade prematura por distrito [2019] |
| São Paulo | `diabetes_masc` | Diabetes Mellitus (masc.) | **9** | Mortalidade prematura por distrito [2019] |
| São Paulo | `diabetes_fem` | Diabetes Mellitus (femi.) | **9** | Mortalidade prematura por distrito [2019] |
| Brasil | `tarifa_zero` | Tarifa Zero | — | *(sem correspondência no catálogo)* |

> **Nota:** quando múltiplas camadas apontam para o mesmo `catalogItemId` (ex: catálogo 2 com 8 layers de SP), o botão "Ver dados no mapa" ativa **todas** essas camadas simultaneamente.

---

## Implementação Técnica

### Fonte de verdade: `city-layers.ts`

O campo `catalogItemId` na interface `CityLayer` é o único ponto de configuração do mapeamento:

```ts
// src/app/(app)/mapas/lib/city-layers.ts

export interface CityLayer {
  id: string;
  name: string;
  // ... outros campos
  catalogItemId?: string;  // ← ID do item em catalog.ts
}
```

### Lookup reverso: `getLayersForCatalogItem()`

Função exportada por `city-layers.ts` que calcula o inverso do mapeamento em tempo de execução:

```ts
export function getLayersForCatalogItem(
  catalogId: string,
): { city: string; layerIds: string[] }[] {
  const result: { city: string; layerIds: string[] }[] = [];
  for (const [city, layers] of Object.entries(cityLayersConfig)) {
    const ids = layers
      .filter((l) => l.catalogItemId === catalogId)
      .map((l) => l.id);
    if (ids.length) result.push({ city, layerIds: ids });
  }
  return result;
}
```

### Fluxo de dados completo

```mermaid
sequenceDiagram
    actor User
    participant CL as CityLayers.tsx
    participant CLT as city-layers.ts
    participant DP as DataCard.tsx
    participant CP as CatalogPage.tsx

    Note over User,CP: Fluxo 1 — Geoportal → Catálogo
    User->>CL: Ativa camada "Ilhas de Calor"
    CL->>CLT: layer.catalogItemId === "8"
    CL->>User: Exibe link "Acessar base de dados" → /catalogo-de-dados?item=8
    User->>CP: Navega para a URL
    CP->>CP: useSearchParams() → openItemId = "8"
    CP->>DP: initialOpen={item.id === "8"}
    DP->>User: Modal do item 8 aberto automaticamente

    Note over User,CP: Fluxo 2 — Catálogo → Geoportal
    User->>DP: Abre modal do item 8
    DP->>CLT: getLayersForCatalogItem("8")
    CLT->>DP: [{city: "Rio de Janeiro", layerIds: ["ic_areas-3ii8xj", "ic_pontos-90vwh4", "quali_area-1ci0wo", "quali_pontos-b424eh"]}]
    DP->>User: Exibe botão → /mapas?city=Rio+de+Janeiro&layers=ic_areas-3ii8xj,ic_pontos-90vwh4,quali_area-1ci0wo,quali_pontos-b424eh
    User->>CL: Navega para o Geoportal
    CL->>CL: useSearchParams() → inicializa estado com city + layers
    CL->>User: Mapa com camadas já ativas
```

---

## Arquivos Envolvidos

| Arquivo | Papel na integração |
|---|---|
| `src/app/(app)/mapas/lib/city-layers.ts` | Define `catalogItemId` por camada e exporta `getLayersForCatalogItem()` |
| `src/app/(app)/mapas/components/city-layers.tsx` | Exibe link "Acessar base de dados" para camadas selecionadas |
| `src/app/(app)/mapas/components/city-layers-comparison.tsx` | Idem para o modo comparação |
| `src/components/DataCard.tsx` | Aceita `initialOpen`, exibe botão "Ver dados no mapa" |
| `src/components/CatalogPage.tsx` | Lê `?item` da URL e passa `initialOpen` para cada `DataCard` |
| `src/app/(app)/catalogo-de-dados/page.tsx` | Envolve `CatalogPage` em `<Suspense>` (necessário para `useSearchParams`) |

---

## Adicionando um novo mapeamento

Para vincular uma nova camada do Geoportal a um registro do Catálogo, basta adicionar o campo `catalogItemId` ao objeto da camada em `city-layers.ts`:

```ts
{
  id: "minha-nova-camada",
  name: "Minha Camada",
  // ...
  catalogItemId: "42",   // ← ID do item em catalog.ts
}
```

Não é necessário alterar nenhum outro arquivo. O link no Geoportal e o botão no modal do Catálogo aparecem automaticamente.

Para criar uma nova entrada no Catálogo, adicione o item em `src/lib/data/catalog.ts` com um `id` único e defina o `catalogItemId` correspondente na(s) camada(s) de `city-layers.ts`.
