import type { Locale } from "@/i18n/config";
import {
  cityLayersConfig,
  type CityLayersConfig,
} from "@/app/[lang]/(app)/mapas/lib/city-layers";

const en: Record<string, { name: string; summary: string; description: string }> =
  {
    "ic_areas-3ii8xj": {
      name: "Heat islands",
      summary:
        "Average temperature in areas of Maré, from March to September 2023.",
      description:
        "Average temperature (°C), by collection area, from March to September 2023. Source: Dias, C. et al. (2026).",
    },
    "ic_pontos-90vwh4": {
      name: "Heat islands (measurement points)",
      summary:
        "Maximum temperature at each measurement point in Maré, from March to September 2023.",
      description:
        "Maximum temperature (°C), by measurement point, from March to September 2023. Source: Dias, C. et al. (2026).",
    },
    "quali_area-1ci0wo": {
      name: "Air quality",
      summary:
        "Particulate pollution in areas of Maré, from March to September 2023.",
      description:
        "PM10 particulate matter (µg/m³), average by collection area, measured in the last week of each month, from March to September 2023. Source: Dias, C. et al. (2026).",
    },
    "quali_pontos-b424eh": {
      name: "Air quality (measurement points)",
      summary:
        "Particulate pollution at each measurement point in Maré, from March to September 2023.",
      description:
        "PM10 particulate matter (µg/m³), average by measurement point, measured in the last week of each month, from March to September 2023. Source: Dias, C. et al. (2026).",
    },
    "faixa-azul-trechos-spo": {
      name: "Faixa Azul",
      summary: "Streets with motorcycle lanes, built from 2022 to 2025.",
      description:
        "Segments with Faixa Azul, lanes reserved for motorcycles, built from 2022 to 2025. Source: Costa, A.; Theil, G.; Mugnol, J. (2025).",
    },
    "sinistros-por-distrito-spo": {
      name: "Crashes by district",
      summary:
        "Traffic crashes in each district, from January 2022 to May 2025.",
      description:
        "Number of recorded traffic crashes, by district, from January 2022 to May 2025. Source: Costa, A.; Theil, G.; Mugnol, J. (2025).",
    },
    "sinistros-por-trecho-spo": {
      name: "Crashes by street segment",
      summary:
        "Traffic crashes on each street segment, from January 2022 to May 2025.",
      description:
        "Number of recorded traffic crashes, by street segment, from January 2022 to May 2025. Source: Costa, A.; Theil, G.; Mugnol, J. (2025).",
    },
    "densidade-hab-setor": {
      name: "Housing density (census tract)",
      summary: "Households per hectare in each census tract, 2022 Census.",
      description:
        "Households per hectare, by census tract, 2022 Census. Source: Theil, G. (2025).",
    },
    "densidade-hab-distrito-spo": {
      name: "Housing density (district)",
      summary: "Households per hectare in each district, 2022 Census.",
      description:
        "Households per hectare, by district, 2022 Census. Source: Theil, G. (2025).",
    },
    "densidade-pop-setor-spo": {
      name: "Population density (census tract)",
      summary: "Residents per hectare in each census tract, 2022 Census.",
      description:
        "Residents per hectare, by census tract, 2022 Census. Source: Theil, G. (2025).",
    },
    "densidade-pop-distrito-spo": {
      name: "Population density (district)",
      summary: "Residents per hectare in each district, 2022 Census.",
      description:
        "Residents per hectare, by district, 2022 Census. Source: Theil, G. (2025).",
    },
    "verticalizacao-setor": {
      name: "Building height (census tract)",
      summary:
        "Average number of floors in each census tract, in 2024.",
      description:
        "Height index, by census tract, in 2024: built area divided by the footprint of buildings on the lot, from the property tax. It is the average number of floors. Tracts without color have no property-tax data. Source: Theil, G. (2025).",
    },
    "verticalizacao-distrito-spo": {
      name: "Building height (district)",
      summary: "Average number of floors in each district, in 2024.",
      description:
        "Height index, by district, in 2024: built area divided by the footprint of buildings on the lot, from the property tax. It is the average number of floors. Source: Theil, G. (2025).",
    },
    "raster-dbiubd": {
      name: "Building height (grid)",
      summary:
        "Average number of floors in each 800 m square, in 2024.",
      description:
        "Height index, on 800 m squares, in 2024: built area divided by the footprint of buildings on the lot, from the property tax. It is the average number of floors. Source: Theil, G. (2025).",
    },
    "geoses-spo": {
      name: "GeoSES",
      summary:
        "Socioeconomic index from the 2010 Census: higher means a better local context.",
      description:
        "GeoSES socioeconomic index, by 2010 Census weighting area. It combines education, mobility, poverty, material deprivation, wealth, income, and segregation. It ranges from -1 to 1: higher means a better context relative to other weighting areas in the city. Source: Barrozo, L. V. et al. (2025).",
    },
    mortalidade_materna_fem: {
      name: "Maternal mortality (women)",
      summary: "Risk of maternal death in each district, in 2019.",
      description:
        "Relative risk of maternal mortality, by district, in 2019. Above 1, the district has more deaths than expected. Source: Saldiva, P. H. N. et al. (2026).",
    },
    isquemicas_coracao_masc: {
      name: "Ischemic heart disease (men)",
      summary:
        "Risk of death from heart disease among men in each district, in 2019.",
      description:
        "Relative risk of death from ischemic heart disease among men, by district, in 2019. Above 1, the district has more deaths than expected. Source: Saldiva, P. H. N. et al. (2026).",
    },
    isquemicas_coracao_fem: {
      name: "Ischemic heart disease (women)",
      summary:
        "Risk of death from heart disease among women in each district, in 2019.",
      description:
        "Relative risk of death from ischemic heart disease among women, by district, in 2019. Above 1, the district has more deaths than expected. Source: Saldiva, P. H. N. et al. (2026).",
    },
    cerebrovasculares_masc: {
      name: "Cerebrovascular disease (men)",
      summary:
        "Risk of death from stroke and other cerebrovascular diseases among men in each district, in 2019.",
      description:
        "Relative risk of death from cerebrovascular disease among men, by district, in 2019. Above 1, the district has more deaths than expected. Source: Saldiva, P. H. N. et al. (2026).",
    },
    cerebrovasculares_fem: {
      name: "Cerebrovascular disease (women)",
      summary:
        "Risk of death from stroke and other cerebrovascular diseases among women in each district, in 2019.",
      description:
        "Relative risk of death from cerebrovascular disease among women, by district, in 2019. Above 1, the district has more deaths than expected. Source: Saldiva, P. H. N. et al. (2026).",
    },
    diabetes_masc: {
      name: "Diabetes mellitus (men)",
      summary:
        "Risk of death from diabetes among men in each district, in 2019.",
      description:
        "Relative risk of death from diabetes mellitus among men, by district, in 2019. Above 1, the district has more deaths than expected. Source: Saldiva, P. H. N. et al. (2026).",
    },
    diabetes_fem: {
      name: "Diabetes mellitus (women)",
      summary:
        "Risk of death from diabetes among women in each district, in 2019.",
      description:
        "Relative risk of death from diabetes mellitus among women, by district, in 2019. Above 1, the district has more deaths than expected. Source: Saldiva, P. H. N. et al. (2026).",
    },
  };

export function localizeCityLayers(locale: Locale): CityLayersConfig {
  if (locale === "pt") return cityLayersConfig;

  return Object.fromEntries(
    Object.entries(cityLayersConfig).map(([city, layers]) => [
      city,
      layers.map((layer) => {
        const copy = en[layer.id];
        return copy ? { ...layer, ...copy } : layer;
      }),
    ]),
  );
}
