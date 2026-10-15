"use client";

import { useQuery } from "@tanstack/react-query";

import {
  allProjectsQueryOptions,
  inEvidenceProjectsQueryOptions,
  projectsQueryOptions,
  ProjectsVariant,
} from "./projectsQueries";

export function useAllProjects() {
  return useQuery(allProjectsQueryOptions());
}

export function useInEvidenceProjects() {
  return useQuery(inEvidenceProjectsQueryOptions());
}

// Para componentes que alternam entre as duas listas por prop.
export function useProjects(variant: ProjectsVariant) {
  return useQuery(projectsQueryOptions(variant));
}
