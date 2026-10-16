import { SkillDTO } from "./skillDTO";

export function mapLinkedSkills(
  links: Array<{ skill: SkillDTO }>
): Array<SkillDTO> {
  return links
    .map(({ skill }) => ({
      titleSkill: skill.titleSkill,
      typeSkill: skill.typeSkill,
    }))
    .sort((a, b) => a.titleSkill.localeCompare(b.titleSkill, "pt-BR"));
}
