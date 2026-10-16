"use client";

import { useQuery } from "@tanstack/react-query";

import { globalContentQueryOptions } from "./globalContentQueries";

export function useGlobalContent() {
  return useQuery(globalContentQueryOptions());
}
