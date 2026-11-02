import { DatabaseQueryError, queryDb } from "./queryDb";

describe("queryDb", () => {
  let consoleError: jest.SpyInstance;

  beforeEach(() => {
    consoleError = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleError.mockRestore();
  });

  it("devolve o resultado da consulta", async () => {
    await expect(queryDb("getX", async () => [1, 2])).resolves.toEqual([1, 2]);
    expect(consoleError).not.toHaveBeenCalled();
  });

  it("lança DatabaseQueryError sem vazar a mensagem do driver", async () => {
    const driverError = Object.assign(
      new Error("connect ECONNREFUSED 127.0.0.1:5432 (SELECT * FROM users)"),
      { code: "ECONNREFUSED" }
    );

    const error = await queryDb("getX", () => Promise.reject(driverError)).catch(
      (e: unknown) => e
    );

    expect(error).toBeInstanceOf(DatabaseQueryError);
    expect((error as Error).message).toBe(
      "Não foi possível consultar o banco de dados (getX)."
    );
    expect((error as Error).cause).toBeUndefined();
  });

  it("registra um resumo com código e mensagem do erro", async () => {
    const driverError = Object.assign(new Error("timeout"), {
      code: "ETIMEDOUT",
    });

    await queryDb("getY", () => Promise.reject(driverError)).catch(() => {});

    expect(consoleError).toHaveBeenCalledWith(
      "[db] Falha em getY: ETIMEDOUT - timeout"
    );
  });

  it("resume um AggregateError (IPv4 + IPv6) usado como causa", async () => {
    const aggregate = new AggregateError(
      [new Error("ECONNREFUSED ::1"), new Error("ECONNREFUSED 127.0.0.1")],
      ""
    );
    const error = new Error("Failed query", { cause: aggregate });

    await queryDb("getZ", () => Promise.reject(error)).catch(() => {});

    expect(consoleError).toHaveBeenCalledWith(
      "[db] Falha em getZ: ECONNREFUSED ::1; ECONNREFUSED 127.0.0.1"
    );
  });
});
