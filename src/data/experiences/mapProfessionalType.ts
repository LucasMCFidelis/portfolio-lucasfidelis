import { ProfessionalExperience } from "./getProfessionalExperiences";

export const professionalTypes = [
  "full-time",
  "part-time",
  "volunteer",
  "contract",
  "freelance",
  "internship",
] as const;

export type ProfessionalType = (typeof professionalTypes)[number];

function isProfessionalType(
  type: string,
): type is (typeof professionalTypes)[number] {
  return professionalTypes.includes(type as (typeof professionalTypes)[number]);
}

export function mapProfessionalType(
  type: string,
): ProfessionalExperience["typeComplement"] {
  if (isProfessionalType(type)) return type;

  throw new Error(`Tipo inválido para experiência profissional: ${type}`);
}
