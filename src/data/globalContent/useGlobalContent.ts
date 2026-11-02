"use client";

import { useQuery } from "@tanstack/react-query";

import { GLOBAL_CONTENT_FALLBACK } from "./globalContentFallback";
import { globalContentQueryOptions } from "./globalContentQueries";

/**
 * Enquanto não há dados do banco (prefetch falhou ou banco fora do ar), devolve
 * a versão padrão com `isFallback: true` — a UI deve sinalizar que o conteúdo
 * pode estar desatualizado. O fallback não entra no cache: assim que uma busca
 * der certo, os dados reais o substituem.
 */
export function useGlobalContent() {
  const { data } = useQuery(globalContentQueryOptions());

  return {
    data: data ?? GLOBAL_CONTENT_FALLBACK,
    isFallback: data === undefined,
  };
}
