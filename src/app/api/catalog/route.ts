import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { localizeCatalog, localizeFilterOptions } from "@/i18n/catalog";
import { defaultLocale, hasLocale } from "@/i18n/config";
import type { DataCatalogItem } from "@/lib/data/catalog";

// Revalida o cache a cada 10 minutos (600 segundos)
export const revalidate = 600;

export const CATALOG_SORT_OPTIONS = ["newest", "oldest", "az", "za"] as const;
export type CatalogSortBy = (typeof CATALOG_SORT_OPTIONS)[number];

export interface CatalogFilters {
  search?: string;
  theme?: string[];
  region?: string[];
  accessMethod?: string[];
  sortBy?: CatalogSortBy;
}

export interface CatalogFacets {
  themes: Record<string, number>;
  regions: Record<string, number>;
  accessMethods: Record<string, number>;
}

const normalize = (value: string) => value.trim().toLowerCase();

const isSortOption = (value: string | null): value is CatalogSortBy =>
  value !== null && (CATALOG_SORT_OPTIONS as readonly string[]).includes(value);

const matchesAny = (value: string, selected: string[] | undefined) =>
  !selected ||
  selected.length === 0 ||
  selected.some((option) => normalize(option) === normalize(value));

type Selection = {
  themes: string[];
  regions: string[];
  accessMethods: string[];
  search?: string;
};

function matchesSearch(item: DataCatalogItem, term: string) {
  const haystack = [
    item.title,
    item.description,
    ...item.keywords,
    ...item.tags,
  ].join(" ");
  return normalize(haystack).includes(term);
}

function applyFilters(
  items: DataCatalogItem[],
  selection: Selection,
  skip?: keyof Selection,
) {
  return items.filter((item) => {
    if (skip !== "themes" && !matchesAny(item.theme, selection.themes))
      return false;
    if (skip !== "regions" && !matchesAny(item.region, selection.regions))
      return false;
    if (
      skip !== "accessMethods" &&
      !matchesAny(item.accessMethod, selection.accessMethods)
    )
      return false;
    if (
      skip !== "search" &&
      selection.search &&
      !matchesSearch(item, selection.search)
    )
      return false;
    return true;
  });
}

function buildFacets(
  items: DataCatalogItem[],
  selection: Selection,
  filterOptions: {
    themes: string[];
    regions: string[];
    accessMethods: string[];
  },
): CatalogFacets {
  const count = (
    skip: keyof Selection,
    pick: (item: DataCatalogItem) => string,
    values: string[],
  ) => {
    const scope = applyFilters(items, selection, skip);
    return Object.fromEntries(
      values.map((value) => [
        value,
        scope.filter((item) => normalize(pick(item)) === normalize(value))
          .length,
      ]),
    );
  };

  return {
    themes: count("themes", (item) => item.theme, filterOptions.themes),
    regions: count("regions", (item) => item.region, filterOptions.regions),
    accessMethods: count(
      "accessMethods",
      (item) => item.accessMethod,
      filterOptions.accessMethods,
    ),
  };
}

function sortItems(items: DataCatalogItem[], sortBy: CatalogSortBy) {
  return [...items].sort((a, b) => {
    if (sortBy === "az" || sortBy === "za") {
      const diff = a.title.localeCompare(b.title, "pt-BR");
      return sortBy === "za" ? -diff : diff;
    }
    const diff =
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    return sortBy === "oldest" ? diff : -diff;
  });
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get("lang");
    const locale = lang && hasLocale(lang) ? lang : defaultLocale;

    const rawSort = searchParams.get("sortBy");
    const sortBy: CatalogSortBy = isSortOption(rawSort) ? rawSort : "newest";

    const selection: Selection = {
      themes: searchParams.getAll("theme").filter(Boolean),
      regions: searchParams.getAll("region").filter(Boolean),
      accessMethods: searchParams.getAll("accessMethod").filter(Boolean),
      search: searchParams.get("search")?.trim()
        ? normalize(searchParams.get("search") as string)
        : undefined,
    };

    const catalog = localizeCatalog(locale);
    const filterOptions = localizeFilterOptions(locale);
    const filtered = applyFilters(catalog, selection);
    const data = sortItems(filtered, sortBy);

    return NextResponse.json({
      data,
      total: data.length,
      filters: filterOptions,
      facets: buildFacets(catalog, selection, filterOptions),
    });
  } catch (error) {
    console.error("Error fetching catalog data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
