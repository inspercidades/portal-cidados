"use client";

import { ChevronDown, ListFilter } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import { flushSync } from "react-dom";
import type {
  CatalogFacets,
  CatalogSortBy,
  CatalogFilters as FiltersType,
} from "@/app/api/catalog/route";
import { CATALOG_SORT_OPTIONS } from "@/app/api/catalog/route";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks/useDebounce";
import { localizeCatalogItem } from "@/i18n/catalog";
import { chrome } from "@/i18n/messages/chrome";
import { useLocale } from "@/i18n/use-locale";
import type { DataCatalogItem } from "@/lib/data/catalog";
import { cn } from "@/lib/utils";
import { CardSkeleton } from "./CardSkeleton";
import { CatalogDetailSheet } from "./CatalogDetailSheet";
import { CatalogFilters } from "./CatalogFilters";
import { DataCard } from "./DataCard";
import { SearchBar } from "./SearchBar";
import { SelectedFilters } from "./SelectedFilters";
import { SortDropdown } from "./SortDropdown";

const EMPTY_FACETS: CatalogFacets = {
  themes: {},
  regions: {},
  accessMethods: {},
};

const CARD_ATTR = "data-catalog-card";

interface CatalogResponse {
  data: DataCatalogItem[];
  total: number;
  filters: {
    themes: string[];
    regions: string[];
    accessMethods: string[];
  };
  facets: CatalogFacets;
}

function isSortOption(value: string | null): value is CatalogSortBy {
  return (
    value !== null &&
    (CATALOG_SORT_OPTIONS as readonly string[]).includes(value)
  );
}

function readList(params: URLSearchParams, key: string) {
  const values = params.getAll(key).filter(Boolean);
  return values.length > 0 ? values : undefined;
}

function filtersFromParams(params: URLSearchParams): FiltersType {
  const sortBy = params.get("sortBy");
  const search = params.get("q")?.trim() || params.get("search")?.trim();
  return {
    search: search || undefined,
    theme: readList(params, "theme"),
    region: readList(params, "region"),
    accessMethod: readList(params, "accessMethod"),
    sortBy: isSortOption(sortBy) ? sortBy : "newest",
  };
}

function filtersToParams(filters: FiltersType, itemId?: string | null) {
  const params = new URLSearchParams();
  if (filters.search) params.set("q", filters.search);
  for (const value of filters.theme ?? []) params.append("theme", value);
  for (const value of filters.region ?? []) params.append("region", value);
  for (const value of filters.accessMethod ?? [])
    params.append("accessMethod", value);
  if (filters.sortBy && filters.sortBy !== "newest") {
    params.set("sortBy", filters.sortBy);
  }
  if (itemId) params.set("item", itemId);
  return params;
}

function nameCards(on: boolean) {
  document.querySelectorAll<HTMLElement>(`[${CARD_ATTR}]`).forEach((card) => {
    const id = card.getAttribute(CARD_ATTR);
    card.style.viewTransitionName = on && id ? `catalog-${id}` : "";
    card.style.setProperty("view-transition-class", on ? "catalog-card" : "");
  });
}

function applyWithTransition(apply: () => void) {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (reduceMotion || typeof document.startViewTransition !== "function") {
    apply();
    return;
  }

  nameCards(true);
  const transition = document.startViewTransition(() => {
    flushSync(apply);
    nameCards(true);
  });
  transition.ready.catch(() => {});
  const reset = () => nameCards(false);
  transition.finished.then(reset, reset);
}

function toggleValue(list: string[] | undefined, value: string) {
  const current = list ?? [];
  return current.includes(value)
    ? current.filter((entry) => entry !== value)
    : [...current, value];
}

export function CatalogPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const lang = useLocale();
  const catalogCopy = chrome[lang].catalog;
  const [, startTransition] = useTransition();

  const initialRef = useRef({
    filters: filtersFromParams(searchParams),
    itemId: searchParams.get("item"),
  });

  const [filters, setFilters] = useState<FiltersType>(
    () => initialRef.current.filters,
  );
  const [searchTerm, setSearchTerm] = useState(
    () => initialRef.current.filters.search ?? "",
  );
  const debouncedSearch = useDebounce(searchTerm, 300);
  const [data, setData] = useState<DataCatalogItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [filterOptions, setFilterOptions] = useState({
    themes: [] as string[],
    regions: [] as string[],
    accessMethods: [] as string[],
  });
  const [facets, setFacets] = useState<CatalogFacets>(EMPTY_FACETS);
  const [selectedId, setSelectedId] = useState<string | null>(
    () => initialRef.current.itemId,
  );
  const [filtersOpen, setFiltersOpen] = useState(false);
  const skipSearchEffect = useRef(true);
  const skipUrlEffect = useRef(true);

  const selectedItem = useMemo(() => {
    if (!selectedId) return null;
    return (
      data.find((item) => item.id === selectedId) ??
      localizeCatalogItem(lang, selectedId) ??
      null
    );
  }, [data, selectedId, lang]);

  const syncUrl = useCallback(
    (nextFilters: FiltersType, itemId: string | null) => {
      const params = filtersToParams(nextFilters, itemId);
      const query = params.toString();
      const href = query ? `${pathname}?${query}` : pathname;
      startTransition(() => {
        router.replace(href, { scroll: false });
      });
    },
    [pathname, router],
  );

  const fetchData = useCallback(
    async (currentFilters: FiltersType) => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (currentFilters.search)
          params.append("search", currentFilters.search);
        for (const value of currentFilters.theme ?? [])
          params.append("theme", value);
        for (const value of currentFilters.region ?? [])
          params.append("region", value);
        for (const value of currentFilters.accessMethod ?? [])
          params.append("accessMethod", value);
        if (currentFilters.sortBy)
          params.append("sortBy", currentFilters.sortBy);
        params.set("lang", lang);

        const response = await fetch(`/api/catalog?${params.toString()}`);
        const result: CatalogResponse = await response.json();

        applyWithTransition(() => {
          setData(result.data);
          setTotal(result.total);
          setFilterOptions(result.filters);
          setFacets(result.facets);
        });
      } catch (error) {
        console.error("Error fetching catalog data:", error);
      } finally {
        setLoading(false);
        setInitialLoading(false);
      }
    },
    [lang],
  );

  useEffect(() => {
    fetchData(filters);
  }, [filters, fetchData]);

  useEffect(() => {
    if (skipSearchEffect.current) {
      skipSearchEffect.current = false;
      return;
    }
    setFilters((prev) => ({
      ...prev,
      search: debouncedSearch || undefined,
    }));
  }, [debouncedSearch]);

  useEffect(() => {
    if (skipUrlEffect.current) {
      skipUrlEffect.current = false;
      return;
    }
    syncUrl(filters, selectedId);
  }, [filters, selectedId, syncUrl]);

  const updateFilters = (patch: Partial<FiltersType>) => {
    setFilters((prev) => ({ ...prev, ...patch }));
  };

  const handleToggleFilter = (
    group: "theme" | "region" | "accessMethod",
    value: string,
  ) => {
    setFilters((prev) => ({
      ...prev,
      [group]: toggleValue(prev[group], value),
    }));
  };

  const handleRemoveValue = (
    group: "theme" | "region" | "accessMethod",
    value: string,
  ) => {
    setFilters((prev) => ({
      ...prev,
      [group]: (prev[group] ?? []).filter((entry) => entry !== value),
    }));
  };

  const handleClearAll = () => {
    setSearchTerm("");
    setFilters({ sortBy: "newest" });
  };

  const resultsLabel =
    total === 1 ? `1 ${catalogCopy.result}` : `${total} ${catalogCopy.results}`;

  if (initialLoading) {
    return (
      <div className="min-h-screen font-inter antialiased">
        <div className="mx-auto px-4 pt-2 pb-12 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[20rem_minmax(0,1fr)]">
            <div className="h-64 animate-pulse bg-foreground/3" />
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 min-[96rem]:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-inter antialiased">
      <div className="mx-auto px-4 pt-2 pb-12 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[20rem_minmax(0,1fr)]">
          {/* Coluna de filtros */}
          <div className="h-fit border border-foreground/10 lg:h-auto lg:border-0">
            <div className="flex h-12 items-center px-4 lg:mb-3 lg:h-9 lg:pr-5 lg:pl-0">
              <div className="relative flex flex-1 items-center lg:flex-none">
                <button
                  type="button"
                  onClick={() => setFiltersOpen((open) => !open)}
                  aria-expanded={filtersOpen}
                  aria-controls="catalog-filters"
                  className="flex cursor-pointer items-center gap-2 after:absolute after:inset-0 lg:hidden"
                >
                  <ListFilter className="size-4" aria-hidden />
                  <h2 className="text-sm font-normal tracking-normal">
                    {catalogCopy.filters}
                  </h2>
                  <ChevronDown
                    className={cn(
                      "absolute right-0 size-4 transition-transform duration-200",
                      filtersOpen && "rotate-180",
                    )}
                    aria-hidden
                  />
                </button>
                <div className="hidden lg:block">
                  <h2 className="text-base font-semibold tracking-normal">
                    {catalogCopy.filters}
                  </h2>
                </div>
                <p className="ml-3 hidden whitespace-nowrap text-sm text-foreground/45 lg:absolute lg:left-full lg:block">
                  {resultsLabel}
                </p>
              </div>
            </div>

            <div
              id="catalog-filters"
              className={filtersOpen ? "lg:contents" : "hidden lg:contents"}
            >
              <div className="mx-4 mb-4 border-t border-foreground/10 lg:hidden" />
              <CatalogFilters
                filters={filters}
                filterOptions={filterOptions}
                facets={facets}
                onToggle={handleToggleFilter}
              />
            </div>
          </div>

          {/* Busca mobile: caixa com a mesma borda de "Filtros" */}
          <div className="-mt-3 flex h-12 items-center border border-foreground/10 px-4 lg:hidden">
            <SearchBar
              className="min-w-0 flex-1"
              value={searchTerm}
              onSearch={setSearchTerm}
            />
          </div>

          <div>
            <div className="mb-1 flex flex-wrap items-center gap-4 lg:mb-3">
              <SelectedFilters
                filters={filters}
                onRemoveValue={handleRemoveValue}
              />
              <div className="ml-auto flex w-full items-center justify-end gap-3 lg:w-auto lg:gap-6">
                <div className="hidden lg:block lg:w-32">
                  <SearchBar value={searchTerm} onSearch={setSearchTerm} />
                </div>
                <SortDropdown
                  currentSort={filters.sortBy || "newest"}
                  onSortChange={(sortBy) => updateFilters({ sortBy })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 min-[96rem]:grid-cols-3">
              {loading
                ? [1, 2, 3, 4, 5, 6].map((i) => <CardSkeleton key={i} />)
                : data.map((item) => (
                    <DataCard
                      key={item.id}
                      item={item}
                      onSelect={setSelectedId}
                    />
                  ))}
            </div>

            {!loading && data.length === 0 && (
              <div className="flex flex-col items-center gap-4 py-12 text-center">
                <div>
                  <p className="font-medium text-foreground">
                    {catalogCopy.emptyTitle}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {catalogCopy.empty}
                  </p>
                </div>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={handleClearAll}
                  className="rounded-none"
                >
                  {catalogCopy.clearFilters}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <CatalogDetailSheet
        item={selectedItem}
        open={Boolean(selectedId)}
        onOpenChange={(open) => {
          if (!open) setSelectedId(null);
        }}
      />
    </div>
  );
}
