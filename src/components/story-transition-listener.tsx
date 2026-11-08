"use client";

import { useEffect } from "react";
import { startBackTransition } from "@/lib/story-transition";

/** Dá ao botão voltar a mesma transição de imagem do clique. */
export function StoryTransitionListener() {
  useEffect(() => {
    const onPopState = () => startBackTransition(window.location.pathname);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  return null;
}
