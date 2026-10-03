# Proposta: Configuração de mapas direto no R

## Contexto

Atualmente, o fluxo do Vinicius é:

1. Importar shapes e fazer limpeza no R
2. Exportar para geojson/mbtiles
3. Upload manual no Mapbox Studio
4. Estilização manual no Mapbox Studio (cores, breaks, etc.)
5. Copiar o JSON de estilo e colar no código

**O gargalo está na etapa 4** — a estilização manual no Mapbox Studio.

---

## Proposta: eliminar a estilização no Mapbox Studio

O frontend espera um JSON de estilo no formato **Mapbox GL JS expressions**. Esse JSON pode ser gerado diretamente no R, sem precisar abrir o Mapbox Studio para estilizar.

O Mapbox Studio passaria a ser usado **apenas para upload do tileset** (ou nem isso, se usar a API de uploads).

### Novo fluxo

```
R: limpeza dos dados
R: definir cores, breaks, tipo de layer → gerar JSON de estilo
R ou Mapbox Studio: upload do tileset
Entregar ao dev: JSON de estilo + tileset ID + source layer name
Dev: colar no código (layer-styles.ts + city-layers.ts)
```

---

## O que o frontend precisa

O frontend precisa de um objeto JSON com esta estrutura:

```json
{
  "id": "nome-do-layer",
  "type": "fill",
  "source": "composite",
  "source-layer": "nome_do_source_layer",
  "paint": {
    "fill-color": [
      "interpolate",
      ["linear"],
      ["get", "nome_da_propriedade"],
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
  "layout": { "visibility": "none" },
  "slot": ""
}
```

As variações possíveis de `paint` são:

| Tipo de layer | Propriedade principal de cor |
|---------------|------------------------------|
| `fill`        | `fill-color`                 |
| `line`        | `line-color`                 |
| `circle`      | `circle-color`               |

---

## Exemplo prático em R

### Escala contínua (interpolate)

Para dados numéricos contínuos (ex: densidade populacional):

```r
library(jsonlite)
library(classInt)

# Dados
valores <- seu_shapefile$Densidade_Populacional

# Definir breaks (usando classInt ou manualmente)
breaks <- classIntervals(valores, n = 6, style = "jenks")$brks

# Paleta de cores
cores <- c("#e5f5f9", "#99d8c9", "#66c2a4", "#41ae76", "#238b45", "#00441b")

# Gerar a expressão interpolate do Mapbox GL
gerar_interpolate <- function(propriedade, breaks, cores) {
  stops <- as.list(interleave(breaks, cores))

  lista <- list(
    "interpolate",
    list("linear"),
    list("get", propriedade)
  )
  lista <- c(lista, stops)

  return(lista)
}

# Função auxiliar para intercalar breaks e cores
interleave <- function(a, b) {
  n <- min(length(a), length(b))
  resultado <- vector("list", 2 * n)
  resultado[seq(1, 2 * n, 2)] <- as.list(a[1:n])
  resultado[seq(2, 2 * n, 2)] <- as.list(b[1:n])
  return(resultado)
}

# Gerar o JSON completo do estilo
estilo <- list(
  id = "densidade-populacional-setor",
  type = "fill",
  source = "composite",
  `source-layer` = "densidade_populacional_setor",
  paint = list(
    `fill-color` = gerar_interpolate("Densidade.Populacional", breaks, cores),
    `fill-outline-color` = "#000000"
  ),
  layout = list(visibility = "none"),
  slot = ""
)

# Exportar para JSON
cat(toJSON(estilo, auto_unbox = TRUE, pretty = TRUE))

# Ou salvar em arquivo
write(toJSON(estilo, auto_unbox = TRUE, pretty = TRUE), "estilo_densidade.json")
```

### Escala categórica (match)

Para dados categóricos (ex: tipo de tarifa):

```r
gerar_match <- function(propriedade, categorias, cores, cor_fallback = "#000000") {
  lista <- list(
    "match",
    list("get", propriedade)
  )

  for (i in seq_along(categorias)) {
    lista <- c(lista, list(list(categorias[i])), list(cores[i]))
  }

  lista <- c(lista, list(cor_fallback))
  return(lista)
}

categorias <- c("Integral", "Parcial", "Revogado")
cores <- c("#2166ac", "#80cdc1", "#b2182b")

estilo <- list(
  id = "tarifa-zero",
  type = "circle",
  source = "composite",
  `source-layer` = "tarifa_zero_municipios",
  paint = list(
    `circle-color` = gerar_match("Tipo de Tarifa Zero", categorias, cores),
    `circle-radius` = 8
  )
)

cat(toJSON(estilo, auto_unbox = TRUE, pretty = TRUE))
```

### Escala discreta (step)

Para dados com faixas definidas:

```r
gerar_step <- function(propriedade, breaks, cores) {
  # step: cor_default, break1, cor1, break2, cor2, ...
  lista <- list(
    "step",
    list("get", propriedade),
    cores[1]  # cor para valores abaixo do primeiro break
  )

  for (i in 2:length(breaks)) {
    lista <- c(lista, list(breaks[i]), list(cores[i]))
  }

  return(lista)
}
```

---

## Upload do tileset via R (opcional)

Para eliminar também o upload manual no Mapbox Studio, é possível usar a API do Mapbox diretamente no R:

```r
library(httr)

# Upload de tileset via Mapbox Uploads API
mapbox_token <- Sys.getenv("MAPBOX_SECRET_TOKEN")
username <- "observatorio-nacional"

# 1. Pedir credenciais de upload
creds <- GET(
  paste0("https://api.mapbox.com/uploads/v1/", username, "/credentials"),
  query = list(access_token = mapbox_token)
)
creds_body <- content(creds)

# 2. Upload do arquivo para S3 (usando as credenciais)
# 3. Criar o tileset
# Documentação: https://docs.mapbox.com/api/maps/uploads/
```

Ou usar o pacote `mapboxapi`:

```r
# install.packages("mapboxapi")
library(mapboxapi)

upload_tiles(
  input = "dados/meu_shapefile.geojson",
  username = "observatorio-nacional",
  tileset_id = "meu_novo_tileset",
  tileset_name = "Meu Novo Tileset",
  multipart = TRUE
)
```

---

## O que o Vinicius entrega ao dev

Depois de rodar o script R, o Vinicius entrega **3 coisas**:

| Item              | Exemplo                                  | Onde vai no código         |
|-------------------|------------------------------------------|----------------------------|
| JSON de estilo    | `estilo_densidade.json`                  | `lib/layer-styles.ts`      |
| Tileset ID        | `observatorio-nacional.46yoduf9`         | `lib/city-layers.ts`       |
| Source layer name | `densidade_populacional_setor`           | Ambos os arquivos          |

Além disso, os metadados para a UI:

| Item        | Exemplo                                      |
|-------------|----------------------------------------------|
| Nome        | "Densidade Populacional"                     |
| Descrição   | "Habitantes por hectare. Fonte: Censo 2022." |
| Tipo        | `fill` / `line` / `circle`                   |
| Cidade      | "São Paulo"                                  |

---

## Resumo da melhoria

| Etapa                     | Antes               | Depois                   |
|---------------------------|----------------------|--------------------------|
| Limpeza de dados          | R                    | R (igual)                |
| Definição de cores/breaks | Mapbox Studio manual | R (automatizado)         |
| Upload do tileset         | Mapbox Studio manual | R via API (ou Studio)    |
| Entrega ao dev            | JSON copiado à mão   | JSON exportado pelo R    |

O Mapbox Studio se torna **opcional** — útil apenas para preview visual, não mais como ferramenta de produção.
