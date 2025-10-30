import { asc, eq } from "drizzle-orm";

import { db } from "@/db";
import { skillsTable } from "@/db/schema";

import { SkillDTO } from "./skillDTO";

export const getHardSkills = async (): Promise<Array<SkillDTO>> => {
  const hardSkills = await db.query.skillsTable.findMany({
    where: eq(skillsTable.typeSkill, "hard"),
    orderBy: asc(skillsTable.titleSkill),
  });

  return hardSkills;
};
