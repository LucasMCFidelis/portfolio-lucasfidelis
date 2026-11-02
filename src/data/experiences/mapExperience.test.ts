import {
  mapAcademicExperience,
  mapProfessionalExperience,
} from "./mapExperience";

type Row = Parameters<typeof mapAcademicExperience>[0];

function makeRow(overrides: Record<string, unknown> = {}): Row {
  return {
    id: "exp-1",
    title: "Analista de QA",
    company: "Empresa X",
    startDate: "2024-01-15T12:00:00",
    endDate: "2024-06-15T12:00:00",
    description: ["Testes manuais."],
    category: "professional",
    type: "full-time",
    experienceInEvidence: false,
    createdAt: null,
    experienceSkills: [
      { skill: { titleSkill: "Playwright", typeSkill: "hard" } },
      { skill: { titleSkill: "Cypress", typeSkill: "hard" } },
    ],
    ...overrides,
  } as unknown as Row;
}

describe("mapProfessionalExperience", () => {
  it("formata datas, ordena skills e define o tipo", () => {
    expect(mapProfessionalExperience(makeRow())).toEqual({
      title: "Analista de QA",
      company: "Empresa X",
      startDate: "Jan 2024",
      endDate: "Jun 2024",
      description: ["Testes manuais."],
      skills: [
        { titleSkill: "Cypress", typeSkill: "hard" },
        { titleSkill: "Playwright", typeSkill: "hard" },
      ],
      type: "professional",
      typeComplement: "full-time",
    });
  });

  it("deixa endDate indefinido quando a experiência está em andamento", () => {
    const result = mapProfessionalExperience(makeRow({ endDate: null }));

    expect(result.endDate).toBeUndefined();
  });

  it("lança erro para um tipo profissional inválido", () => {
    expect(() =>
      mapProfessionalExperience(makeRow({ type: "degree" }))
    ).toThrow("Tipo inválido para experiência profissional: degree");
  });
});

describe("mapAcademicExperience", () => {
  it("define o tipo acadêmico", () => {
    const result = mapAcademicExperience(
      makeRow({ category: "academic", type: "bootcamp" })
    );

    expect(result.type).toBe("academic");
    expect(result.typeComplement).toBe("bootcamp");
  });

  it("lança erro para um tipo acadêmico inválido", () => {
    expect(() => mapAcademicExperience(makeRow({ type: "full-time" }))).toThrow(
      "Tipo inválido para experiência acadêmica: full-time"
    );
  });
});
