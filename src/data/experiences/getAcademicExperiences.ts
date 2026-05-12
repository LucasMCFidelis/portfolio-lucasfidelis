import { desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { experiencesTable } from "@/db/schema";
import { formatDate } from "@/utils/formatDate";

import { mapAcademicType } from "./mapAcademicType";

export type AcademicExperienceType = "academic" | "bootcamp";

export type AcademicExperience = {
  title: string;
  company: string;
  startDate: string;
  endDate?: string;
  description: string;
  technologies: string[];
  type: AcademicExperienceType;
};

export async function getAcademicExperiences(): Promise<
  Array<AcademicExperience>
> {
  const experiences = await db.query.experiencesTable.findMany({
    where: eq(experiencesTable.category, "academic"),
    orderBy: [
      desc(experiencesTable.experienceInEvidence),
      desc(experiencesTable.endDate),
    ],
  });

  return experiences.map((exp) => ({
    title: exp.title,
    company: exp.company,
    startDate: formatDate(exp.startDate),
    endDate: exp.endDate ? formatDate(exp.endDate) : undefined,
    description: exp.description,
    technologies: exp.technologies,
    type: mapAcademicType(exp.type),
  }));
}
