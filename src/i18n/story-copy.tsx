"use client";

import { createContext, useContext, type ReactNode } from "react";

const StoryCopyContext = createContext<unknown>(null);

export function StoryCopyProvider<T>({
  copy,
  children,
}: {
  copy: T;
  children: ReactNode;
}) {
  return (
    <StoryCopyContext.Provider value={copy}>{children}</StoryCopyContext.Provider>
  );
}

export function useStoryCopy<T>(): T {
  const value = useContext(StoryCopyContext);
  if (value == null) {
    throw new Error("StoryCopyProvider is missing");
  }
  return value as T;
}
