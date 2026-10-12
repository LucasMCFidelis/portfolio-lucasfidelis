import { desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { experiencesTable } from "@/db/schema";
import { formatDate } from "@/utils/formatDate";

import { mapProfessionalType } from "./mapProfessionalType";
import { ProfessionalExperienceDTO } from "./professionalExperienceDTO";

export async function getProfessionalExperiences(): Promise<
  Array<ProfessionalExperienceDTO>
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
