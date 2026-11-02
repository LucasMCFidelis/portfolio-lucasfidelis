import { db } from "@/db";
import { DatabaseQueryError } from "@/db/queryDb";

import { getAllSocialMedias } from "./getAllSocialMedias";

jest.mock("@/db", () => ({
  db: { query: { socialMediasTable: { findMany: jest.fn() } } },
}));

const findMany = db.query.socialMediasTable.findMany as jest.Mock;

describe("getAllSocialMedias", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
    findMany.mockReset();
  });

  it("indexa as redes pelo título em minúsculas", async () => {
    const github = { id: "1", title: "GitHub", url: "https://github.com", createdAt: null };
    const linkedin = { id: "2", title: "LinkedIn", url: "https://linkedin.com", createdAt: null };
    findMany.mockResolvedValue([github, linkedin]);

    await expect(getAllSocialMedias()).resolves.toEqual({
      github,
      linkedin,
    });
  });

  it("propaga a falha do banco como DatabaseQueryError", async () => {
    findMany.mockRejectedValue(new Error("ECONNREFUSED"));

    await expect(getAllSocialMedias()).rejects.toBeInstanceOf(
      DatabaseQueryError
    );
  });
});
