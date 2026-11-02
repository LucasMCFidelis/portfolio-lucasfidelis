"use server";

import { and, asc, eq } from "drizzle-orm";

import { SkillDTO } from "@/data/skills/skillDTO";
import { db } from "@/db";
import { queryDb } from "@/db/queryDb";
import { skillsTable } from "@/db/schema";

export async function getSoftSkills(): Promise<Array<SkillDTO>> {
  return queryDb("getSoftSkills", () =>
    db.query.skillsTable.findMany({
      columns: { titleSkill: true, typeSkill: true },
      where: and(
        eq(skillsTable.typeSkill, "soft"),
        eq(skillsTable.skillInEvidence, true)
      ),
      orderBy: asc(skillsTable.titleSkill),
    })
  );
}
