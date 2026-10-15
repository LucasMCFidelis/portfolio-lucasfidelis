"use server";

import { asc, eq } from "drizzle-orm";

import { SkillDTO } from "@/data/skills/skillDTO";
import { db } from "@/db";
import { skillsTable } from "@/db/schema";

export async function getHardSkills(): Promise<Array<SkillDTO>> {
  return db.query.skillsTable.findMany({
    where: eq(skillsTable.typeSkill, "hard"),
    orderBy: asc(skillsTable.titleSkill),
  });
}
