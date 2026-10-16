"use client";

import { useQuery } from "@tanstack/react-query";

import { hardSkillsQueryOptions, softSkillsQueryOptions } from "./skillsQueries";

export function useHardSkills() {
  return useQuery(hardSkillsQueryOptions());
}

export function useSoftSkills() {
  return useQuery(softSkillsQueryOptions());
}
