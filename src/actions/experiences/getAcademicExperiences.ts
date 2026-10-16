"use server";

import { desc, eq } from "drizzle-orm";

import { AcademicExperienceDTO } from "@/data/experiences/academicExperienceDTO";
import { mapAcademicExperience } from "@/data/experiences/mapExperience";
import { db } from "@/db";
import { experiencesTable } from "@/db/schema";

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

  return experiences.map(mapAcademicExperience);
}
