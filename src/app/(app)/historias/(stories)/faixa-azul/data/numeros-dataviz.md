# Números do dataviz a partir dos CSVs

Como os valores exibidos na história Faixa Azul saem das tabelas em `data/faixa_azul/`. A regra geral dos pictogramas é: **`share × 100`, arredondado a 1 casa decimal**. Não há outra agregação nesses três gráficos — a coluna `share` já vem pronta no CSV.

CSVs de origem: [`tab_modais_transporte.csv`](faixa_azul/tab_modais_transporte.csv), [`tab_sinistros_tipo_veiculo.csv`](faixa_azul/tab_sinistros_tipo_veiculo.csv), [`tab_mortes_tipo_veiculo.csv`](faixa_azul/tab_mortes_tipo_veiculo.csv), [`tab_avenidas_faixa_azul.csv`](faixa_azul/tab_avenidas_faixa_azul.csv), [`tab_obitos_faixa_azul.csv`](faixa_azul/tab_obitos_faixa_azul.csv).

Valores hardcoded em [`transport-charts.ts`](transport-charts.ts). A linha do tempo usa [`acidentes-faixa-azul-data.ts`](acidentes-faixa-azul-data.ts), gerado a partir dos dois CSVs da Faixa Azul.

---

## 1. Pictograma de viagens — `tab_modais_transporte.csv`

Cada linha já traz `share` (soma 1). No gráfico: `share × 100`.

| CSV (`grouped_mode`) | `share` | Dataviz        |
| ---------------------- | --------- | -------------- |
| Transporte público    | 0,3235    | 32,3%          |
| Automóvel             | 0,2992    | 29,9%          |
| A pé                  | 0,2707    | 27,1%          |
| Outros                 | 0,0783    | 7,8%           |
| Moto                   | 0,0284    | **2,8%** |

O **2,8%** do card (“motocicletas representem apenas 2,8% dos deslocamentos diários”) é esse `share` de Moto.

---

## 2. Pictograma de sinistros — `tab_sinistros_tipo_veiculo.csv`

Mesma regra. Unidade do CSV: partes envolvidas (não sinistros). Período no gráfico: 2022–2025.

| CSV (`tipo_veiculo`) | `share` | Dataviz         |
| ---------------------- | --------- | --------------- |
| Automóvel             | 0,4200    | 42,0%           |
| Moto                   | 0,3967    | **39,7%** |
| A pé                  | 0,0832    | 8,3%            |
| Outros                 | 0,0558    | 5,6%            |
| Transporte público    | 0,0443    | 4,4%            |

O **39,7%** do card é o `share` de Moto. “Segundo tipo de veículo mais frequentemente envolvido” segue da ordem das linhas: Automóvel (42,0%) > Moto (39,7%).

---

## 3. Pictograma de mortes — `tab_mortes_tipo_veiculo.csv`

Mesma regra. Unidade do CSV: vítimas fatais. Período no gráfico: 2022–2025.

| CSV (`tipo_vitima`) | `share` | Dataviz         |
| --------------------- | --------- | --------------- |
| Moto                  | 0,4629    | **46,3%** |
| A pé                 | 0,3851    | 38,5%           |
| Automóvel            | 0,1011    | 10,1%           |
| Outros                | 0,0473    | 4,7%            |
| Transporte público   | 0,0037    | 0,4%            |

O **46,3%** do card é o `share` de Moto.

---

## 4. Linha do tempo (óbitos por via)

Não há percentual pré-calculado. O gráfico junta os dois CSVs da Faixa Azul:

- **`tab_avenidas_faixa_azul.csv`**: uma barra por via. `d0` é a data de implementação (corte antes/depois). `logradouro_pretty` / `nome` são o rótulo. Há **46 linhas** → o texto do mapa (“presente em 46 vias”) coincide com essa contagem.
- **`tab_obitos_faixa_azul.csv`**: um ponto por sinistro fatal. `data` posiciona no eixo; `motocicleta` (`TRUE`/`FALSE`) escolhe a cor (moto vs. outro). `nome`/`id` ligam o ponto à via.

No tooltip, os totais “Antes” / “Depois” (e “de moto”) são a **contagem desses pontos** em relação a `d0`. Na janela alinhada, só entram eventos a até 365 dias da implementação.

---

## 5. Números na história que não saem destes CSVs

Usados no texto, mas **não calculados** a partir das tabelas acima (vêm do estudo):

- **68%** e **quase 70%** (sinistros com ao menos uma moto, 2022–2025 e jan–set/2025)
- **48,4%** (share de motociclistas nas mortes em 2024)
- **403 → 483** óbitos e **cerca de 20%** (2023–2024, seção de contexto)
- **200 km** / **212,2 km** (extensão da Faixa Azul)
- Nota metodológica do estudo original: **5%** (viagens na RMSP), **70%** (sinistros com moto, 2015–2024), **50% ≈ 48,8%** de 960 óbitos em 2024

`tab_sinistros_moto.csv` e `tab_mortes_moto.csv` existem na pasta, mas **não alimentam** nenhum número da história.
