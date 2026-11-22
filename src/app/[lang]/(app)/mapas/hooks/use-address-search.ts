"use client";

import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import {
  type AddressResult,
  buildGeocodeUrl,
  type GeocodeArea,
  MIN_QUERY_LENGTH,
  normalizeQuery,
  parseGeocodeResponse,
} from "../lib/geocoding";

const DEBOUNCE_MS = 350;

export type AddressSearchStatus = "idle" | "loading" | "done" | "error";

interface SearchResult {
  /** Consulta que produziu o resultado; evita mostrar resposta de um termo antigo. */
  query: string;
  status: AddressSearchStatus;
  results: AddressResult[];
}

const IDLE: SearchResult = { query: "", status: "idle", results: [] };

/**
 * Busca de endereço dentro de `area`. Uma requisição por pausa na digitação
 * (debounce), a partir de 3 caracteres, cancelando a anterior.
 */
export function useAddressSearch(
  term: string,
  area: GeocodeArea | null,
  language: string,
) {
  const query = useDebounce(normalizeQuery(term), DEBOUNCE_MS);
  const [state, setState] = useState<SearchResult>(IDLE);

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";
    const url = area ? buildGeocodeUrl({ query, token, area, language }) : null;
    if (!url || !area) {
      setState(IDLE);
      return;
    }

    const controller = new AbortController();
    setState({ query, status: "loading", results: [] });
    fetch(url, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error(`Geocoding ${response.status}`);
        const results = parseGeocodeResponse(
          await response.json(),
          area.wikidataId,
        );
        setState({ query, status: "done", results });
      })
      .catch((error: unknown) => {
        // Abortar é o usuário continuando a digitar, não uma falha.
        if ((error as Error)?.name === "AbortError") return;
        console.error("[geoportal] busca de endereço:", error);
        setState({ query, status: "error", results: [] });
      });

    return () => controller.abort();
  }, [query, area, language]);

  // Enquanto o debounce não alcança o que foi digitado, a resposta é de outro termo.
  const typed = normalizeQuery(term);
  if (state.query === typed)
    return { status: state.status, results: state.results };
  const status: AddressSearchStatus =
    area && typed.length >= MIN_QUERY_LENGTH ? "loading" : "idle";
  return { status, results: [] as AddressResult[] };
}
