import { asc } from "drizzle-orm";

import { db } from "@/db";
import { projectsTable } from "@/db/schema";

import { ProjectDTO } from "./projectDTO";

export const getAllProjects = async (): Promise<Array<ProjectDTO>> => {
  let allProjects: Array<ProjectDTO>;
  try {
    allProjects = await db.query.projectsTable.findMany({
      orderBy: [asc(projectsTable.yearDevelopment), asc(projectsTable.title)],
      with: { images: true },
    });
  } catch (error) {
    console.error(error);
  }

  return allProjects;
};
