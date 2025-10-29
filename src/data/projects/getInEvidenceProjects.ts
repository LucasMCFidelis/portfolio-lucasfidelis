import { asc, eq } from "drizzle-orm";

import { db } from "@/db";
import { imagesTable, projectsTable } from "@/db/schema";

import { ProjectDTO } from "./projectDTO";

export const getInEvidenceProjects = async (): Promise<Array<ProjectDTO>> => {
  let inEvidenceProjects: Array<ProjectDTO>;
  try {
    inEvidenceProjects = await db.query.projectsTable.findMany({
      where: eq(projectsTable.projectInEvidence, true),
      orderBy: [asc(projectsTable.yearDevelopment), asc(projectsTable.title)],
      with: { images: { orderBy: asc(imagesTable.indexDisplay) } },
    });
  } catch (error) {
    console.error(error);
  }

  return inEvidenceProjects;
};
