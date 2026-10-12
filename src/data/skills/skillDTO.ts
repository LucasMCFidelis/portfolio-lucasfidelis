export interface SkillDTO {
  titleSkill: string;
  levelSkill: number;
  descriptionSkill?: string | null;
  typeSkill: "hard" | "soft";
}
