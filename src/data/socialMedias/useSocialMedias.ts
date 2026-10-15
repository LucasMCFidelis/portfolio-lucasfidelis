"use client";

import { useQuery } from "@tanstack/react-query";

import { socialMediasQueryOptions } from "./socialMediasQueries";

export function useSocialMedias() {
  return useQuery(socialMediasQueryOptions());
}
