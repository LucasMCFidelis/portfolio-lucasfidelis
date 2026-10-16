import { SkillDTO } from "../skills/skillDTO";

export const professionalTypes = [
  "full-time",
  "part-time",
  "volunteer",
  "contract",
  "freelance",
  "internship",
] as const;

export type ProfessionalType = (typeof professionalTypes)[number];

export type ProfessionalExperienceType = "professional";

export interface ProfessionalExperienceDTO {
  title: string;
  company: string;
  startDate: string;
  endDate?: string;
  description: string;
  skills: Array<SkillDTO>;
  type: ProfessionalExperienceType;
  typeComplement: ProfessionalType;
}
