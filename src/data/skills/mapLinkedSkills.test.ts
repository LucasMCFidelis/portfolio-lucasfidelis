import { mapLinkedSkills } from "./mapLinkedSkills";
import { SkillDTO } from "./skillDTO";

describe("mapLinkedSkills", () => {
  it("extrai só título e tipo e ordena em pt-BR", () => {
    const links = [
      { skill: { titleSkill: "Testes", typeSkill: "hard", extra: 1 } },
      { skill: { titleSkill: "Ágil", typeSkill: "soft" } },
      { skill: { titleSkill: "Cypress", typeSkill: "hard" } },
    ] as Array<{ skill: SkillDTO }>;

    expect(mapLinkedSkills(links)).toEqual([
      { titleSkill: "Ágil", typeSkill: "soft" },
      { titleSkill: "Cypress", typeSkill: "hard" },
      { titleSkill: "Testes", typeSkill: "hard" },
    ]);
  });

  it("devolve lista vazia sem vínculos", () => {
    expect(mapLinkedSkills([])).toEqual([]);
  });
});
