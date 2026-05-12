import { desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { experiencesTable } from "@/db/schema";
import { formatDate } from "@/utils/formatDate";

import { mapProfessionalType, ProfessionalType } from "./mapProfessionalType";

export type ProfessionalExperienceType = "professional";

export type ProfessionalExperience = {
  title: string;
  company: string;
  startDate: string;
  endDate?: string;
  description: string;
  technologies: string[];
  type: ProfessionalExperienceType;
  typeComplement: ProfessionalType;
};

export async function getProfessionalExperiences(): Promise<
  Array<ProfessionalExperience>
> {
  const experiences = await db.query.experiencesTable.findMany({
    where: eq(experiencesTable.category, "professional"),
    orderBy: [
      desc(experiencesTable.experienceInEvidence),
      desc(experiencesTable.startDate),
    ],
  });

  return experiences.map((exp) => ({
    title: exp.title,
    company: exp.company,
    startDate: formatDate(exp.startDate),
    endDate: exp.endDate ? formatDate(exp.endDate) : undefined,
    description: exp.description,
    technologies: exp.technologies,
    type: "professional",
    typeComplement: mapProfessionalType(exp.type),
  }));
}
