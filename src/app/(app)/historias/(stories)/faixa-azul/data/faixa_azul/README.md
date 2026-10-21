
# Dados — Motos no trânsito de São Paulo

Tabelas de apoio à narrativa "motos são ~3% das viagens, mas concentram
~60% dos sinistros e ~40% das mortes no trânsito" (município de São Paulo).
As três primeiras ficam em `historia_4/` e são geradas por
`historias/R/historia_4_export.R`; as duas últimas (Faixa Azul) ficam na raiz
deste diretório e vêm de `historias/R/historia_4_faixa_azul_lookup.R`
(rodar primeiro — gera os lookups intermediários) +
`historias/R/historia_4_faixa_azul_export.R`.

Fontes brutas:

- **Pesquisa Origem e Destino 2023** (Metrô-SP), microdados `Banco2023_divulgacao_190225.sav`
- **Infosiga-SP** via pacote `infosigasp` (`read_infosiga()`), que cuida do download e da limpeza das bases de sinistros e de pessoas. As tabelas da Faixa Azul ainda leem a base bruta de sinistros pela pipeline de matching.
- **OpenStreetMap** (`dado_osm.gpkg`) e **Faixa Azul** (`faixa_azul.gpkg`, cronograma de implementação de faixas exclusivas de moto), via a pipeline de matching sinistro↔trecho já existente no repo (`pipelines/sao_paulo/faixa-azul/`)

---

## `historia_4/tab_modais_transporte.csv`

Divisão modal das viagens diárias **no município de São Paulo** (residentes,
`muni_dom == 36`), a partir da Pesquisa OD 2023, com pesos amostrais aplicados
via `survey`/`srvyr` (`svydesign(weights = ~fe_via, strata = ~zona)`).

| Coluna           | Descrição                                                                                                                   |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `grouped_mode` | Modo de transporte agrupado (ver metodologia abaixo)                                                                          |
| `trips`        | Total estimado de viagens/dia (expandido pelo peso amostral`fe_via`), soma ponderada, sem intervalo de confiança calculado |
| `share`        | Participação do modo no total de viagens (soma 1)                                                                           |

O script também calcula o recorte RMSP (`tab_modais`, viagens com origem ou
destino na capital), mas ele não é exportado — serve para conferir os totais
contra os publicados pelo Metrô.

**Metodologia — agrupamento de `modoprin` (modo principal declarado) em `grouped_mode`:**

- **Transporte público**: Metrô, Monotrilho, Trem e ônibus/micro-ônibus/van (municipal, metropolitano ou de outros municípios)
- **Automóvel**: dirigindo ou passageiro de automóvel, **táxi convencional e táxi por aplicativo** (agrupados junto com automóvel, não como transporte público)
- **Moto**: dirigindo moto, passageiro de moto e **passageiro de mototáxi** (mototáxi tratado como moto, não como táxi)
- **Transporte escolar**: categoria própria, sem agrupamento
- **A pé**: categoria própria
- **Outros**: qualquer modo não coberto pelas categorias acima (ex.: bicicleta, outros)

Encoding dos rótulos do SPSS (`.sav`) é normalizado (`Encoding(x) <- "unknown"`) antes do agrupamento para evitar falhas de correspondência entre acentuação UTF-8 do arquivo e strings nativas do R.

---

## `historia_4/tab_sinistros_tipo_veiculo.csv` e `historia_4/tab_mortes_tipo_veiculo.csv`

Par de tabelas nas categorias do design (Automóvel, Moto, Transporte público,
A pé, Outros): a primeira mostra a participação de cada modo nas **partes
envolvidas em sinistros**, a segunda nas **vítimas fatais**. Fonte: pacote
`infosigasp`, que traz `qtd_pedestre` e permite incluir "A pé" nas duas
tabelas. Ambas usam o mesmo recorte:
município de São Paulo, **2021–2025** (2025 é o último ano completo).

| Coluna                             | Descrição                                   |
| ---------------------------------- | --------------------------------------------- |
| `tipo_veiculo` / `tipo_vitima` | Categoria do modo                             |
| `veiculos` / `mortes`          | Nº de partes envolvidas / de vítimas fatais |
| `share`                          | Participação da categoria no total (soma 1) |

**Metodologia — sinistros:**

- Mantidos só `tipo_registro %in% c("SINISTRO FATAL", "SINISTRO NAO FATAL")`; registros de `NOTIFICACAO` não trazem contagem de veículos.
- Excluídos registros sem nenhuma informação de contexto da via (`tipo_via`, `administracao`, `conservacao`, `circunscricao` todos `NA` — no `infosigasp` esses campos vêm como `NA`, não como "NAO DISPONIVEL"). Excluídos também os registros sem nenhuma parte informada (`qtd_*` todos `NA`), o que ainda descarta ~8% dos `SINISTRO NAO FATAL`.
- `NA` em `qtd_*` significa zero.
- **A base é o total de partes envolvidas, não de sinistros** — um sinistro pode ter mais de uma parte do mesmo tipo, e por isso as shares somam 100%. `qtd_veic_nao_disponivel` fica fora do total (tipo desconhecido não é categoria).

**Metodologia — mortes:**

- Vítima fatal = `gravidade_lesao == "FATAL"`; óbitos em até 30 dias do sinistro.
- Pedestres são identificados por `tipo_de_vitima == "PEDESTRE"` e têm `tipo_veiculo_vitima` sempre `NA` — por isso "A pé" é resolvido antes das demais categorias no `case_when()`.
- Vítimas sem tipo identificável (ambos os campos `NA`) ficam fora do total: ~1,5% no recorte.
- Bicicleta, caminhão e demais veículos entram em "Outros".

**Ressalvas de leitura (valem para o par):**

- **Unidades diferentes**: na tabela de sinistros um veículo conta 1 independente do número de ocupantes, enquanto pedestre conta por pessoa; na de mortes tudo conta por pessoa. O Infosiga não informa ocupantes, então essa é a melhor aproximação possível — mas a participação do automóvel nas duas tabelas não é diretamente comparável.
- **"Transporte público" é só ônibus** aqui: metrô e trem não entram no Infosiga. Já em `tab_modais_transporte.csv` a categoria inclui os modos sobre trilhos, então comparar a participação nas viagens com a participação nos sinistros/mortes superestima a segurança do modo.

---

## `tab_avenidas_faixa_azul.csv` e `tab_obitos_faixa_azul.csv`

Reproduzem a Figura 6 do repositório original de pesquisa
(`gustavo-tm/faixa-azul`, `scripts/descritivas.R::plot_datas_FA()`): uma
linha do tempo por avenida, mostrando o período antes/depois da
implementação da faixa azul e cada sinistro fatal ocorrido naquela avenida,
marcado por data e por envolvimento (ou não) de motocicleta.

**`tab_avenidas_faixa_azul.csv`** (uma linha por avenida — as barras do gráfico):

| Coluna                | Descrição                                                                                                                              |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `nome`              | Nome "limpo"/tokenizado da avenida (maiúsculo, sem acento — ex.`"NACOES UNIDAS"`), usado como rótulo do eixo Y no gráfico original |
| `logradouro_pretty` | Nome de exibição (ex.`"Avenida das Nações Unidas"`), recuperado do `faixa_azul.gpkg`                                             |
| `d0`                | Data de implementação da faixa azul nessa avenida (a mais antiga entre todos os trechos que compõem a avenida)                        |
| `id`                | Posição da linha no eixo Y do gráfico (1 = avenida com implementação mais recente)                                                  |

**`tab_obitos_faixa_azul.csv`** (um ponto por sinistro fatal — os pontos do gráfico):

| Coluna          | Descrição                                                                             |
| --------------- | --------------------------------------------------------------------------------------- |
| `id_sinistro` | Identificador do sinistro (base bruta Infosiga-SP)                                      |
| `data`        | Data do sinistro                                                                        |
| `nome`        | Avenida onde ocorreu (mesma chave`nome` de `tab_avenidas_faixa_azul.csv`)           |
| `id`          | Posição no eixo Y (herdada de`tab_avenidas_faixa_azul.csv`, já pronta para plotar) |
| `motocicleta` | `TRUE` se pelo menos uma motocicleta esteve envolvida no sinistro                     |

**Metodologia — decisões que reproduzem (ou corrigem) o script original:**

- **Ponto = sinistro fatal, não vítima.** `motocicleta` classifica o
  *sinistro* (`qtd_motocicleta >= 1` entre os veículos envolvidos), não o
  modo de transporte de cada vítima individual. Um sinistro com várias
  vítimas fatais gera um único ponto. Isso reproduz o script original
  (`descritivas.R::plot_datas_FA`), que nunca usa a base de vítimas para
  esta figura — só `tipo == "SINISTRO FATAL"` na base de sinistros.
- **Avenida = "logradouro" no sentido de rede conectada, não só os trechos
  pintados.** `faixa_azul.gpkg` só contém os trechos OSM que de fato
  receberam a pintura azul — uma fração do comprimento total de uma
  avenida. Um sinistro em um trecho não pintado da mesma avenida (mesmo
  nome, conectado geometricamente) ainda conta. Isso foi reproduzido do
  zero localmente: agrupamos todos os trechos do OSM (`dado_osm.gpkg`,
  ~26 mil segmentos primary/secondary/trunk) por nome + conectividade
  geométrica (buffer de 10m + componentes conexos via `igraph`), igual ao
  `agrupar_logradouros()` do repositório original
  (`pipelines/sao_paulo/faixa-azul/R/old_script.R:150-197`). **Isso
  aumenta a contagem de sinistros em ~78% (327 vs. 184) em relação a
  restringir só aos trechos pintados** — ver comparação abaixo.
- **`nome` (não o nome "bonito") é a chave de agrupamento.** O nome
  tokenizado (maiúsculo, sem acento, ex. `"VINTE E TRES MAIO"`) é o que o
  script original usa como identidade da avenida — isso importa porque
  duas variantes de nome do mesmo logradouro no OSM (ex. `"Avenida 23 de Maio"` e `"Avenida Vinte e Três de Maio"`) tokenizam para o mesmo nome e
  são fundidas em uma única linha, mesmo sendo componentes geometricamente
  desconexos no grafo. Sem essa fusão, a Figura 6 teria uma linha a mais
  (Avenida 23 de Maio apareceria separada de Avenida Vinte e Três de Maio).
- **Data de implementação = a mais antiga entre os trechos, calculada com
  `min()`/`sort()`, nunca `first()` sem ordenar.** Achado durante a
  reprodução: uma versão inicial deste script (descartada) usava
  `first(data_implementacao, na_rm = TRUE)` sem ordenar por data antes —
  isso pega a primeira linha na ordem em que aparece no arquivo bruto, não
  necessariamente a mais antiga. Para "Avenida Vinte e Três de Maio" isso
  dava 2024-09-01 em vez do valor correto, 2022-01-01 (a implementação real
  começou em 2022; o arquivo bruto só lista essa data depois de outras
  linhas de 2024). Afetava 1 de 48 avenidas nessa versão.
- **Janela temporal:** sinistros filtrados para `data` entre 2021-01-01 e
  2025-04-01, mesma janela do eixo X da figura original.
- **Qualidade do match:** apenas sinistros com `golden_match == TRUE` (a
  mesma régua de qualidade usada no resto da pipeline, ver `match.csv`).

**Comparação de abordagens (conforme pedido para revisão da equipe):**

|                              | Rede completa da avenida             | Só trechos pintados |
| ---------------------------- | ------------------------------------ | -------------------- |
| Sinistros fatais matched     | 327                                  | 184 (56% do total)   |
| dos quais com moto           | 185 (56,6%)                          | —                   |
| Avenidas resolvidas com data | 46 (após fundir nomes) / 58 (bruto) | 52                   |

A restrição aos trechos pintados (mais simples, reaproveita só
`match.csv` + `faixa_azul.gpkg`) sub-representa os sinistros em quase
metade — avenidas são compridas, e a maior parte do comprimento de uma
via com faixa azul não é literalmente pintada. Para esta figura
específica, a reprodução completa da rede (via `dado_osm.gpkg`) é
necessária, não só um atalho.

---

## Observações gerais para revisão

- As tabelas usam fontes e unidades de análise diferentes: `tab_modais_transporte` é uma estimativa amostral ponderada (viagens/dia declaradas), enquanto o par `tab_*_tipo_veiculo` e as tabelas da Faixa Azul são contagens administrativas de registros (sinistros e óbitos). Não comparar `trips`/`share` de um com `mortes`/`veiculos` do outro sem essa ressalva. As tabelas da Faixa Azul também usam recorte diferente (só avenidas com faixa azul, sinistro fatal por veículo envolvido — não por vítima), então totais não devem ser somados diretamente.
- Nenhuma das tabelas de sinistros/mortes pondera por exposição (ex.: km percorridos, frota) — são contagens absolutas e participações relativas dentro da própria base.
- A decisão de tratar táxi/app como "Automóvel" e mototáxi como "Moto" é uma escolha de agrupamento por natureza do veículo, não por natureza do serviço (transporte remunerado vs. privado) — vale confirmar se essa é a leitura que a equipe quer para a narrativa.
