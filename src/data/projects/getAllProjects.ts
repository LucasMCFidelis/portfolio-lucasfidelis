import { asc, desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { imagesTable, projectsTable } from "@/db/schema";

import { ProjectDTO } from "./projectDTO";

export const getAllProjects = async (): Promise<Array<ProjectDTO>> => {
  let allProjects: Array<ProjectDTO>;
  try {
    allProjects = await db.query.projectsTable.findMany({
      where: eq(projectsTable.visible, true),
      orderBy: [
        desc(projectsTable.projectInEvidence),
        desc(projectsTable.yearDevelopment),
        asc(projectsTable.title),
      ],
      with: { images: { orderBy: asc(imagesTable.indexDisplay) } },
    });
  } catch (error) {
    console.error(error);
  }

  return allProjects;
};
