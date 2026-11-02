"use client";

import { useQuery } from "@tanstack/react-query";

import { resumeAvailabilityQueryOptions } from "./resumeQueries";

export type ResumeAvailabilityStatus = "checking" | "available" | "unavailable";

/**
 * `available` só quando o Drive confirmou que o arquivo existe e é público.
 * Erro na consulta conta como `unavailable`; se uma verificação anterior deu
 * certo, ela é mantida.
 */
export function useResumeAvailability(): ResumeAvailabilityStatus {
  const { data, isPending, isError } = useQuery(
    resumeAvailabilityQueryOptions()
  );

  if (data === true) return "available";
  if (isPending && !isError) return "checking";
  return "unavailable";
}
