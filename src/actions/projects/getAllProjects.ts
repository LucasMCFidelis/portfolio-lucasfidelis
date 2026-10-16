"use server";

import { asc, desc, eq } from "drizzle-orm";

import { ProjectDTO } from "@/data/projects/projectDTO";
import { db } from "@/db";
import { imagesTable, projectsTable } from "@/db/schema";

export async function getAllProjects(): Promise<Array<ProjectDTO>> {
  return db.query.projectsTable.findMany({
    where: eq(projectsTable.visible, true),
    orderBy: [
      desc(projectsTable.projectInEvidence),
      desc(projectsTable.yearDevelopment),
      asc(projectsTable.title),
    ],
    with: { images: { orderBy: asc(imagesTable.indexDisplay) } },
  });
}
