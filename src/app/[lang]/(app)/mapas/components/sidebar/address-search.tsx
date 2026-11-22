"use client";

import { Command } from "cmdk";
import { MapPin, Search, X } from "lucide-react";
import { useState } from "react";
import { chrome } from "@/i18n/messages/chrome";
import { useLocale } from "@/i18n/use-locale";
import { useAddressSearch } from "../../hooks/use-address-search";
import type { GeoportalCity } from "../../lib/cities";
import type { AddressResult } from "../../lib/geocoding";

/**
 * Busca de endereço restrita à cidade escolhida. Combobox do cmdk: setas,
 * Enter e Esc funcionam; a filtragem é da API, não do cmdk.
 */
export function AddressSearch({
  city,
  onSelect,
}: {
  city: GeoportalCity | null;
  onSelect: (result: AddressResult) => void;
}) {
  const lang = useLocale();
  const copy = chrome[lang].maps;
  const [term, setTerm] = useState("");
  const [open, setOpen] = useState(false);
  // O nome do resultado escolhido vai para o campo; buscá-lo de novo gastaria uma requisição.
  const [picked, setPicked] = useState<string | null>(null);
  const { status, results } = useAddressSearch(
    term === picked ? "" : term,
    city,
    lang,
  );

  const showList = open && status !== "idle";

  const clear = () => {
    setTerm("");
    setOpen(false);
  };

  return (
    <Command
      shouldFilter={false}
      label={copy.searchAddress}
      className="relative min-w-0 flex-1"
      onKeyDown={(event) => {
        if (event.key === "Escape") setOpen(false);
      }}
    >
      <div className="flex h-10 items-center gap-2 rounded-[8px] border border-border bg-background px-3 focus-within:ring-2 focus-within:ring-ring">
        <Command.Input
          value={term}
          onValueChange={(next) => {
            setTerm(next);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          disabled={!city}
          placeholder={copy.searchAddress}
          className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
        />
        {term ? (
          <button
            type="button"
            onClick={clear}
            aria-label={copy.clearSearch}
            className="flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-[6px] text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <X className="size-4" aria-hidden />
          </button>
        ) : (
          <Search
            className="size-4 shrink-0 text-muted-foreground"
            aria-hidden
          />
        )}
      </div>

      {showList ? (
        <Command.List
          // Clicar num resultado não pode tirar o foco do campo antes do clique valer.
          onMouseDown={(event) => event.preventDefault()}
          className="absolute inset-x-0 top-full z-30 mt-1 max-h-64 overflow-y-auto rounded-[8px] border border-border bg-background shadow-md"
        >
          {status === "loading" ? (
            <Command.Loading>
              <p className="px-3 py-2.5 text-sm text-muted-foreground">
                {copy.searching}
              </p>
            </Command.Loading>
          ) : null}
          {status === "error" ? (
            <p
              role="alert"
              className="px-3 py-2.5 text-sm text-muted-foreground"
            >
              {copy.addressError}
            </p>
          ) : null}
          {status === "done" && results.length === 0 ? (
            <output className="block px-3 py-2.5 text-sm text-muted-foreground">
              {copy.noAddress}
            </output>
          ) : null}
          {results.map((result) => (
            <Command.Item
              key={result.id}
              value={result.id}
              onSelect={() => {
                setPicked(result.name);
                setTerm(result.name);
                setOpen(false);
                onSelect(result);
              }}
              className="flex cursor-pointer items-start gap-2 px-3 py-2.5 text-left text-sm data-[selected=true]:bg-accent"
            >
              <MapPin
                className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                aria-hidden
              />
              <span className="min-w-0">
                <span className="block">{result.name}</span>
                {result.context ? (
                  <span className="block text-xs text-muted-foreground">
                    {result.context}
                  </span>
                ) : null}
              </span>
            </Command.Item>
          ))}
        </Command.List>
      ) : null}
    </Command>
  );
}
