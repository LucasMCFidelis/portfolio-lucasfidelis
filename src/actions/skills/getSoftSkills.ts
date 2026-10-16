"use server";

import { asc, eq } from "drizzle-orm";

import { SkillDTO } from "@/data/skills/skillDTO";
import { db } from "@/db";
import { skillsTable } from "@/db/schema";

export async function getSoftSkills(): Promise<Array<SkillDTO>> {
  return db.query.skillsTable.findMany({
    where: eq(skillsTable.typeSkill, "soft"),
    orderBy: asc(skillsTable.titleSkill),
  });
}
