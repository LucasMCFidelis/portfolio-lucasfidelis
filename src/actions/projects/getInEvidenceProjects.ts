"use server";

import { and, asc, desc, eq } from "drizzle-orm";

import { ProjectDTO } from "@/data/projects/projectDTO";
import { db } from "@/db";
import { imagesTable, projectsTable } from "@/db/schema";

export async function getInEvidenceProjects(): Promise<Array<ProjectDTO>> {
  return db.query.projectsTable.findMany({
    where: and(
      eq(projectsTable.visible, true),
      eq(projectsTable.projectInEvidence, true)
    ),
    orderBy: [desc(projectsTable.yearDevelopment), asc(projectsTable.title)],
    with: { images: { orderBy: asc(imagesTable.indexDisplay) } },
  });
}
