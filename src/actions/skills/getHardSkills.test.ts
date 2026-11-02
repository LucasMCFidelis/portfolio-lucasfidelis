import { db } from "@/db";
import { DatabaseQueryError } from "@/db/queryDb";

import { getHardSkills } from "./getHardSkills";

jest.mock("@/db", () => ({
  db: { query: { skillsTable: { findMany: jest.fn() } } },
}));

const findMany = db.query.skillsTable.findMany as jest.Mock;

describe("getHardSkills", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
    findMany.mockReset();
  });

  it("devolve as skills retornadas pelo banco", async () => {
    const skills = [{ titleSkill: "Cypress", typeSkill: "hard" }];
    findMany.mockResolvedValue(skills);

    await expect(getHardSkills()).resolves.toEqual(skills);
  });

  it("propaga a falha do banco (não cacheia lista vazia)", async () => {
    findMany.mockRejectedValue(new Error("ECONNREFUSED"));

    await expect(getHardSkills()).rejects.toBeInstanceOf(DatabaseQueryError);
  });
});
