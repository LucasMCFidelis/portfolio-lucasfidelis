import { SkillDTO } from "../skills/skillDTO";

export const academicTypes = ["degree", "bootcamp"] as const;

export type AcademicType = (typeof academicTypes)[number];

export type AcademicExperienceType = "academic";

export interface AcademicExperienceDTO {
  title: string;
  company: string;
  startDate: string;
  endDate?: string;
  description: Array<string>;
  skills: Array<SkillDTO>;
  type: AcademicExperienceType;
  typeComplement: AcademicType;
}
