import { AcademicType, academicTypes } from "./academicExperienceDTO";

function isAcademicType(type: string): type is AcademicType {
  return academicTypes.includes(type as AcademicType);
}

export function mapAcademicType(type: string): AcademicType {
  if (isAcademicType(type)) return type;

  throw new Error(`Tipo inválido para experiência acadêmica: ${type}`);
}
