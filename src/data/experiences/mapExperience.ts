import type { experiencesTable } from "@/db/schema";
import { formatDate } from "@/utils/formatDate";

import { SkillDTO } from "../skills/skillDTO";
import { AcademicExperienceDTO } from "./academicExperienceDTO";
import { mapAcademicType } from "./mapAcademicType";
import { mapProfessionalType } from "./mapProfessionalType";
import { ProfessionalExperienceDTO } from "./professionalExperienceDTO";

type ExperienceRow = typeof experiencesTable.$inferSelect & {
  experienceSkills: Array<{ skill: SkillDTO }>;
};

type ExperienceBaseDTO = Omit<
  AcademicExperienceDTO,
  "type" | "typeComplement"
>;

function mapExperienceBase(row: ExperienceRow): ExperienceBaseDTO {
  return {
    title: row.title,
    company: row.company,
    startDate: formatDate(row.startDate),
    endDate: row.endDate ? formatDate(row.endDate) : undefined,
    description: row.description,
    skills: row.experienceSkills
      .map(({ skill }) => ({
        titleSkill: skill.titleSkill,
        typeSkill: skill.typeSkill,
      }))
      .sort((a, b) => a.titleSkill.localeCompare(b.titleSkill, "pt-BR")),
  };
}

export function mapAcademicExperience(
  row: ExperienceRow
): AcademicExperienceDTO {
  return {
    ...mapExperienceBase(row),
    type: "academic",
    typeComplement: mapAcademicType(row.type),
  };
}

export function mapProfessionalExperience(
  row: ExperienceRow
): ProfessionalExperienceDTO {
  return {
    ...mapExperienceBase(row),
    type: "professional",
    typeComplement: mapProfessionalType(row.type),
  };
}
