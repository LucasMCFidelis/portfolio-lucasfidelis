import { and, asc, desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { imagesTable, projectsTable } from "@/db/schema";

import { ProjectDTO } from "./projectDTO";

export const getInEvidenceProjects = async (): Promise<Array<ProjectDTO>> => {
  let inEvidenceProjects: Array<ProjectDTO>;
  try {
    inEvidenceProjects = await db.query.projectsTable.findMany({
      where: and(
        eq(projectsTable.visible, true),
        eq(projectsTable.projectInEvidence, true)
      ),
      orderBy: [
        desc(projectsTable.projectInEvidence),
        asc(projectsTable.yearDevelopment),
        asc(projectsTable.title),
      ],
      with: { images: { orderBy: asc(imagesTable.indexDisplay) } },
    });
  } catch (error) {
    console.error(error);
  }

  return inEvidenceProjects;
};
