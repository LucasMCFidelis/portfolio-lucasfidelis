"use server";

import { asc, desc, eq } from "drizzle-orm";

import { mapProject } from "@/data/projects/mapProject";
import { ProjectDTO } from "@/data/projects/projectDTO";
import { db } from "@/db";
import { imagesTable, projectsTable } from "@/db/schema";

export async function getAllProjects(): Promise<Array<ProjectDTO>> {
  const projects = await db.query.projectsTable.findMany({
    where: eq(projectsTable.visible, true),
    orderBy: [
      desc(projectsTable.projectInEvidence),
      desc(projectsTable.yearDevelopment),
      asc(projectsTable.title),
    ],
    with: {
      images: { orderBy: asc(imagesTable.indexDisplay) },
      projectSkills: {
        with: { skill: { columns: { titleSkill: true, typeSkill: true } } },
      },
    },
  });

  return projects.map(mapProject);
}
