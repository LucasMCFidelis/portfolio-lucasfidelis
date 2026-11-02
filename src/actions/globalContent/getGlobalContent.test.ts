import { db } from "@/db";
import { DatabaseQueryError } from "@/db/queryDb";

import { getGlobalContent } from "./getGlobalContent";

jest.mock("@/db", () => ({
  db: { query: { globalContentTable: { findFirst: jest.fn() } } },
}));

const findFirst = db.query.globalContentTable.findFirst as jest.Mock;

describe("getGlobalContent", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
    findFirst.mockReset();
  });

  it("devolve apenas os campos usados pela UI", async () => {
    findFirst.mockResolvedValue({
      id: "1",
      aboutCurtDescription: "Curta",
      aboutLargeDescription: ["Longa"],
      fileResumeId: "file-id",
      createdAt: new Date(),
    });

    await expect(getGlobalContent()).resolves.toEqual({
      aboutCurtDescription: "Curta",
      aboutLargeDescription: ["Longa"],
      fileResumeId: "file-id",
    });
  });

  it("usa valores vazios quando não há registro", async () => {
    findFirst.mockResolvedValue(undefined);

    await expect(getGlobalContent()).resolves.toEqual({
      aboutCurtDescription: "",
      aboutLargeDescription: [],
      fileResumeId: "",
    });
  });

  it("propaga a falha do banco em vez de devolver conteúdo vazio", async () => {
    findFirst.mockRejectedValue(new Error("ECONNREFUSED"));

    await expect(getGlobalContent()).rejects.toBeInstanceOf(DatabaseQueryError);
  });
});
