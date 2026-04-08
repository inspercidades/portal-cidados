import { catalogData, filterOptions, type DataCatalogItem } from '@/lib/data/catalog';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// Revalida o cache a cada 10 minutos (600 segundos)
export const revalidate = 600;

export interface CatalogFilters {
  search?: string;
  theme?: string;
  region?: string;
  accessMethod?: string;
  sortBy?: 'newest' | 'oldest';
}

function searchItems(items: DataCatalogItem[], searchTerm: string): DataCatalogItem[] {
  if (!searchTerm.trim()) return items;
  
  const term = searchTerm.toLowerCase();
  return items.filter(item => 
    item.title.toLowerCase().includes(term) ||
    item.description.toLowerCase().includes(term) ||
    item.keywords.some(keyword => keyword.toLowerCase().includes(term))
  );
}

function filterItems(items: DataCatalogItem[], filters: CatalogFilters): DataCatalogItem[] {
  return items.filter(item => {
    if (filters.theme && item.theme !== filters.theme) return false;
    if (filters.region && item.region !== filters.region) return false;
    if (filters.accessMethod && item.accessMethod !== filters.accessMethod) return false;
    return true;
  });
}

function sortItems(items: DataCatalogItem[], sortBy: string): DataCatalogItem[] {
  const sorted = [...items].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return sortBy === 'newest' ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
  });
  return sorted;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const filters: CatalogFilters = {
      search: searchParams.get('search') || undefined,
      theme: searchParams.get('theme') || undefined,
      region: searchParams.get('region') || undefined,
      accessMethod: searchParams.get('accessMethod') || undefined,
      sortBy: (searchParams.get('sortBy') as 'newest' | 'oldest') || 'newest'
    };

    let filteredData = catalogData;

    // Apply search filter
    if (filters.search) {
      filteredData = searchItems(filteredData, filters.search);
    }

    // Apply other filters
    filteredData = filterItems(filteredData, filters);

    // Apply sorting
    filteredData = sortItems(filteredData, filters.sortBy || 'newest');

    return NextResponse.json({
      data: filteredData,
      total: filteredData.length,
      filters: filterOptions
    });
  } catch (error) {
    console.error('Error fetching catalog data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
