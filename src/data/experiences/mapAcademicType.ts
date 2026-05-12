import { AcademicExperienceType } from "./getAcademicExperiences";

export function mapAcademicType(type: string): AcademicExperienceType {
  if (type === "bootcamp") return "bootcamp";
  return "academic";
}
