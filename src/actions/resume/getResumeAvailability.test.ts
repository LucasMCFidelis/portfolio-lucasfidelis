import { getResumeAvailability } from "./getResumeAvailability";

const originalFetch = global.fetch;
const mockFetch = jest.fn();

function driveResponse(status: number, url: string, contentType: string) {
  return {
    ok: status >= 200 && status < 300,
    status,
    url,
    headers: {
      get: (name: string) =>
        name.toLowerCase() === "content-type" ? contentType : null,
    },
    body: { cancel: jest.fn().mockResolvedValue(undefined) },
  };
}

const DOWNLOAD_URL =
  "https://drive.usercontent.google.com/download?id=file-id&export=download";

describe("getResumeAvailability", () => {
  beforeEach(() => {
    global.fetch = mockFetch as unknown as typeof fetch;
  });

  afterEach(() => {
    global.fetch = originalFetch;
    mockFetch.mockReset();
  });

  it("consulta o link de download do Drive e devolve true para arquivo público", async () => {
    const response = driveResponse(200, DOWNLOAD_URL, "application/pdf");
    mockFetch.mockResolvedValue(response);

    await expect(getResumeAvailability("file-id")).resolves.toBe(true);
    expect(mockFetch).toHaveBeenCalledWith(
      "https://drive.google.com/uc?export=download&id=file-id",
      expect.objectContaining({ redirect: "follow" })
    );
    // Não baixa o arquivo inteiro.
    expect(response.body.cancel).toHaveBeenCalled();
  });

  it.each([
    ["id inexistente (404)", driveResponse(404, DOWNLOAD_URL, "text/html")],
    ["acesso negado (403)", driveResponse(403, DOWNLOAD_URL, "text/html")],
    [
      "arquivo privado (login do Google)",
      driveResponse(
        200,
        "https://accounts.google.com/v3/signin/identifier",
        "text/html; charset=utf-8"
      ),
    ],
    ["página HTML no lugar do arquivo", driveResponse(200, DOWNLOAD_URL, "text/html")],
  ])("devolve false para %s", async (_, response) => {
    mockFetch.mockResolvedValue(response);

    await expect(getResumeAvailability("file-id")).resolves.toBe(false);
  });

  it("devolve false sem consultar o Drive quando o id é inválido", async () => {
    await expect(
      getResumeAvailability("../outro-caminho?x=1")
    ).resolves.toBe(false);
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("propaga falhas de rede", async () => {
    mockFetch.mockRejectedValue(new TypeError("fetch failed"));

    await expect(getResumeAvailability("file-id")).rejects.toThrow(
      "fetch failed"
    );
  });
});
