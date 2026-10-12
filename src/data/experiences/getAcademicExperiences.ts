import { desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { experiencesTable } from "@/db/schema";
import { formatDate } from "@/utils/formatDate";

import { AcademicExperienceDTO } from "./academicExperienceDTO";
import { mapAcademicType } from "./mapAcademicType";

export async function getAcademicExperiences(): Promise<
  Array<AcademicExperienceDTO>
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
    type: "academic",
    typeComplement: mapAcademicType(exp.type),
  }));
}
