import { ProfessionalType, professionalTypes } from "./professionalExperienceDTO";

function isProfessionalType(type: string): type is ProfessionalType {
  return professionalTypes.includes(type as ProfessionalType);
}

export function mapProfessionalType(type: string): ProfessionalType {
  if (isProfessionalType(type)) return type;

  throw new Error(`Tipo inválido para experiência profissional: ${type}`);
}
