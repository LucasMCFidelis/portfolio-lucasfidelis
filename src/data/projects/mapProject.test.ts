import { mapProject } from "./mapProject";

type Row = Parameters<typeof mapProject>[0];

describe("mapProject", () => {
  it("troca projectSkills por skills ordenadas, mantendo os demais campos", () => {
    const row = {
      id: "p1",
      title: "Portfólio",
      images: [],
      repositories: [],
      projectSkills: [
        { skill: { titleSkill: "TypeScript", typeSkill: "hard" } },
        { skill: { titleSkill: "React", typeSkill: "hard" } },
      ],
    } as unknown as Row;

    const result = mapProject(row);

    expect(result).not.toHaveProperty("projectSkills");
    expect(result).toMatchObject({ id: "p1", title: "Portfólio" });
    expect(result.skills).toEqual([
      { titleSkill: "React", typeSkill: "hard" },
      { titleSkill: "TypeScript", typeSkill: "hard" },
    ]);
  });
});
