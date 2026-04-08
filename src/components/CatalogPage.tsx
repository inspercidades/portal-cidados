"use client";

import type { CatalogFilters as FiltersType } from "@/app/api/catalog/route";
import { useDebounce } from "@/hooks/useDebounce";
import type { DataCatalogItem } from "@/lib/data/catalog";
import { useCallback, useEffect, useRef, useState } from "react";
import { CardSkeleton } from "./CardSkeleton";
import { CatalogFilters } from "./CatalogFilters";
import { DataCard } from "./DataCard";
import { SearchBar } from "./SearchBar";
import { SelectedFilters } from "./SelectedFilters";
import { SortDropdown } from "./SortDropdown";

interface CatalogResponse {
  data: DataCatalogItem[];
  total: number;
  filters: {
    themes: string[];
    regions: string[];
    accessMethods: string[];
  };
}

export function CatalogPage() {
  const [data, setData] = useState<DataCatalogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [filters, setFilters] = useState<FiltersType>({
    sortBy: "newest",
  });
  const [filterOptions, setFilterOptions] = useState<{
    themes: string[];
    regions: string[];
    accessMethods: string[];
  }>({
    themes: [],
    regions: [],
    accessMethods: [],
  });
  const isFirstRender = useRef(true);

  const fetchData = useCallback(async (currentFilters: FiltersType) => {
    setLoading(true);

    try {
      const params = new URLSearchParams();

      if (currentFilters.search) params.append("search", currentFilters.search);
      if (currentFilters.theme) params.append("theme", currentFilters.theme);
      if (currentFilters.region) params.append("region", currentFilters.region);
      if (currentFilters.accessMethod)
        params.append("accessMethod", currentFilters.accessMethod);
      if (currentFilters.sortBy) params.append("sortBy", currentFilters.sortBy);

      const response = await fetch(`/api/catalog?${params.toString()}`);
      const result: CatalogResponse = await response.json();

      setData(result.data);
      setFilterOptions(result.filters);
    } catch (error) {
      console.error("Error fetching catalog data:", error);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(filters);
  }, [filters, fetchData]);

  // Debounced search
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Update filters when debounced search term changes (skip first render)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setFilters((prev: FiltersType) => ({
      ...prev,
      search: debouncedSearchTerm || undefined,
    }));
  }, [debouncedSearchTerm]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleFiltersChange = (newFilters: FiltersType) => {
    setFilters((prev: FiltersType) => ({ ...prev, ...newFilters }));
  };

  const handleRemoveFilter = (filterType: keyof FiltersType) => {
    setFilters((prev: FiltersType) => ({ ...prev, [filterType]: undefined }));
  };

  const handleClearAllFilters = () => {
    setFilters({ sortBy: "newest" });
  };

  const handleSortChange = (sortBy: "newest" | "oldest") => {
    setFilters((prev: FiltersType) => ({ ...prev, sortBy }));
  };

  // Show initial loading skeleton
  if (initialLoading) {
    return (
      <div className="min-h-screen">
        <div className="mx-auto px-4 md:px-8 lg:px-12 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left sidebar skeleton */}
            <div className="lg:col-span-1">
              {/* Search bar skeleton - matching SearchBar component */}
              <div className="mb-6">
                <div className="h-12 bg-background-2 rounded-none animate-pulse"></div>
              </div>

              {/* Filters skeleton - matching CatalogFilters component */}
              <div className="bg-background-2 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="h-6 bg-foreground/10 w-20 animate-pulse"></div>
                  <div className="h-4 bg-foreground/10 w-12 animate-pulse"></div>
                </div>

                {/* Filter groups skeleton */}
                {[1, 2, 3].map((i) => (
                  <div key={i} className="mb-6 last:mb-0">
                    <div className="h-4 bg-foreground/10 w-24 mb-3 animate-pulse"></div>
                    <div className="space-y-2">
                      {[1, 2, 3, 4].map((j) => (
                        <div key={j} className="flex items-center space-x-2">
                          <div className="h-4 w-4 bg-foreground/10 rounded animate-pulse"></div>
                          <div className="h-4 bg-foreground/10 w-28 animate-pulse"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right content skeleton */}
            <div className="lg:col-span-3">
              {/* Top bar skeleton - matching SelectedFilters + SortDropdown */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  {/* Selected filters skeleton */}
                  <div className="h-10 bg-background-2 w-24 animate-pulse"></div>
                  <div className="h-10 bg-background-2 w-32 animate-pulse"></div>
                </div>
                {/* Sort dropdown skeleton */}
                <div className="h-12 bg-background-2 w-40 animate-pulse"></div>
              </div>

              {/* Results count skeleton */}
              <div className="mb-6">
                <div className="h-5 bg-foreground/10 w-40 animate-pulse"></div>
              </div>

              {/* Cards grid skeleton */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <CardSkeleton key={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto px-4 md:px-8 lg:px-12 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            {/* Search Bar */}
            <div className="mb-6">
              <SearchBar onSearch={handleSearch} />
            </div>

            {/* Filters */}
            <CatalogFilters
              onFiltersChange={handleFiltersChange}
              initialFilters={filters}
              filterOptions={filterOptions}
            />
          </div>

          {/* Right Content */}
          <div className="lg:col-span-3">
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-6">
              <SelectedFilters
                filters={filters}
                onRemoveFilter={handleRemoveFilter}
                onClearAll={handleClearAllFilters}
              />
              <div className="ml-auto">
                <SortDropdown
                  onSortChange={handleSortChange}
                  currentSort={filters.sortBy || "newest"}
                />
              </div>
            </div>

            {/* Data Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {loading
                ? // Show skeleton cards when loading
                  [1, 2, 3, 4, 5, 6].map((i) => <CardSkeleton key={i} />)
                : data.map((item) => <DataCard key={item.id} item={item} />)}
            </div>

            {/* No Results */}
            {data.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  Nenhum resultado encontrado com os filtros selecionados.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
