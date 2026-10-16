"use server";

import { desc, eq } from "drizzle-orm";

import { mapProfessionalExperience } from "@/data/experiences/mapExperience";
import { ProfessionalExperienceDTO } from "@/data/experiences/professionalExperienceDTO";
import { db } from "@/db";
import { experiencesTable } from "@/db/schema";

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

  return experiences.map(mapProfessionalExperience);
}
