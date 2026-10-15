import { queryOptions } from "@tanstack/react-query";

import { getAllProjects } from "@/actions/projects/getAllProjects";
import { getInEvidenceProjects } from "@/actions/projects/getInEvidenceProjects";

export type ProjectsVariant = "all" | "inEvidence";

export const allProjectsQueryOptions = () =>
  queryOptions({
    queryKey: ["projects", "all"],
    queryFn: () => getAllProjects(),
  });

export const inEvidenceProjectsQueryOptions = () =>
  queryOptions({
    queryKey: ["projects", "in-evidence"],
    queryFn: () => getInEvidenceProjects(),
  });

export const projectsQueryOptions = (variant: ProjectsVariant) =>
  variant === "all" ? allProjectsQueryOptions() : inEvidenceProjectsQueryOptions();
