"use server";

import { and, asc, desc, eq } from "drizzle-orm";

import { mapProject } from "@/data/projects/mapProject";
import { ProjectDTO } from "@/data/projects/projectDTO";
import { db } from "@/db";
import {
  imagesTable,
  projectRepositoriesTable,
  projectsTable,
} from "@/db/schema";

export async function getInEvidenceProjects(): Promise<Array<ProjectDTO>> {
  const projects = await db.query.projectsTable.findMany({
    where: and(
      eq(projectsTable.visible, true),
      eq(projectsTable.projectInEvidence, true)
    ),
    orderBy: [desc(projectsTable.yearDevelopment), asc(projectsTable.title)],
    with: {
      images: { orderBy: asc(imagesTable.indexDisplay) },
      repositories: {
        columns: { repositoryTitle: true, repositoryUrl: true },
        orderBy: asc(projectRepositoriesTable.indexDisplay),
      },
      projectSkills: {
        with: { skill: { columns: { titleSkill: true, typeSkill: true } } },
      },
    },
  });

  return projects.map(mapProject);
}
