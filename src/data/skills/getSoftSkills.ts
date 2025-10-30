import { asc, eq } from "drizzle-orm";

import { db } from "@/db";
import { skillsTable } from "@/db/schema";

import { SkillDTO } from "./skillDTO";

export const getSoftSkills = async (): Promise<Array<SkillDTO>> => {
  const softSkills = await db.query.skillsTable.findMany({
    where: eq(skillsTable.typeSkill, "soft"),
    orderBy: asc(skillsTable.titleSkill),
  });

  return softSkills;
};
