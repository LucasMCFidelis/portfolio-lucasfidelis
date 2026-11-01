"use client";

import { useQuery } from "@tanstack/react-query";

import { SOCIAL_MEDIAS_FALLBACK } from "./socialMediasFallback";
import { socialMediasQueryOptions } from "./socialMediasQueries";

/** Sem dados do banco, devolve as redes padrão (ver `socialMediasFallback`). */
export function useSocialMedias() {
  const { data } = useQuery(socialMediasQueryOptions());

  return {
    data: data ?? SOCIAL_MEDIAS_FALLBACK,
    isFallback: data === undefined,
  };
}
