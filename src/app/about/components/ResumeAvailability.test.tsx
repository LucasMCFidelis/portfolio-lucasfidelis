import { screen, waitFor } from "@testing-library/react";

import { getGlobalContent } from "@/actions/globalContent/getGlobalContent";
import { getAllSocialMedias } from "@/actions/socialMedias/getAllSocialMedias";
import { globalContentFixture, socialMediasFixture } from "@/test/fixtures";
import { renderWithQueryClient } from "@/test/renderWithQueryClient";

import AboutMeCard from "./AboutMeCard";

/**
 * Especificação: o currículo só pode ser baixado se o arquivo existir no Google
 * Drive e for público. Caso contrário, no lugar do botão de download aparece um
 * aviso desabilitado ("Currículo indisponível no momento"), e o restante do
 * card (texto e redes sociais) continua visível.
 *
 * O teste é caixa-preta: simula só a resposta do Drive via `fetch` global, sem
 * depender de onde a verificação vai ficar (action, hook ou componente).
 */

jest.mock("@/actions/globalContent/getGlobalContent", () => ({
  getGlobalContent: jest.fn(),
}));
jest.mock("@/actions/socialMedias/getAllSocialMedias", () => ({
  getAllSocialMedias: jest.fn(),
}));

const mockGetGlobalContent = getGlobalContent as jest.Mock;
const mockGetAllSocialMedias = getAllSocialMedias as jest.Mock;

const FILE_ID = globalContentFixture.fileResumeId;
const DOWNLOAD_URL = `https://drive.usercontent.google.com/download?id=${FILE_ID}&export=download`;

interface DriveResponse {
  status: number;
  url: string;
  headers?: Record<string, string>;
}

/** Resposta mínima no formato do `fetch` (o jsdom não tem `Response`). */
function driveResponse({ status, url, headers = {} }: DriveResponse) {
  const normalized = Object.fromEntries(
    Object.entries(headers).map(([key, value]) => [key.toLowerCase(), value])
  );

  return {
    ok: status >= 200 && status < 300,
    status,
    url,
    redirected: !url.includes("drive.google.com/uc"),
    headers: { get: (name: string) => normalized[name.toLowerCase()] ?? null },
    text: async () => "<html></html>",
    blob: async () => new Blob(),
    arrayBuffer: async () => new ArrayBuffer(0),
    body: null,
  };
}

/** Respostas reais do Drive, observadas em `uc?export=download&id=<id>` (já com o redirect seguido). */
const DRIVE = {
  // id inexistente: 303 → drive.usercontent.google.com → 404 em HTML.
  notFound: () =>
    driveResponse({
      status: 404,
      url: DOWNLOAD_URL,
      headers: { "content-type": "text/html; charset=utf-8" },
    }),
  // arquivo privado: redireciona para o login do Google (página HTML, sem anexo).
  private: () =>
    driveResponse({
      status: 200,
      url: "https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fdrive.google.com",
      headers: { "content-type": "text/html; charset=utf-8" },
    }),
  // arquivo privado (variação): acesso negado.
  forbidden: () =>
    driveResponse({
      status: 403,
      url: DOWNLOAD_URL,
      headers: { "content-type": "text/html; charset=utf-8" },
    }),
  // arquivo público: o próprio PDF como anexo.
  public: () =>
    driveResponse({
      status: 200,
      url: DOWNLOAD_URL,
      headers: {
        "content-type": "application/pdf",
        "content-disposition": 'attachment; filename="curriculo.pdf"',
      },
    }),
};

const originalFetch = global.fetch;
const mockFetch = jest.fn();

const downloadLink = () =>
  screen.queryByRole("link", { name: /DOWNLOAD RESUME/ });

/** Aviso esperado: elemento desabilitado com o texto de indisponibilidade. */
async function expectResumeUnavailableNotice() {
  const notice = await screen.findByRole("button", {
    name: /Currículo indisponível no momento/i,
  });
  expect(notice).toBeDisabled();
  expect(downloadLink()).not.toBeInTheDocument();
  // O resto do card continua de pé.
  expect(
    screen.getByText(globalContentFixture.aboutCurtDescription!)
  ).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "GitHub" })).toBeInTheDocument();
}

describe("AboutMeCard — disponibilidade do currículo no Google Drive", () => {
  beforeEach(() => {
    global.fetch = mockFetch as unknown as typeof fetch;
    mockGetGlobalContent.mockResolvedValue(globalContentFixture);
    mockGetAllSocialMedias.mockResolvedValue(socialMediasFixture);
  });

  afterEach(() => {
    global.fetch = originalFetch;
    mockFetch.mockReset();
    mockGetGlobalContent.mockReset();
    mockGetAllSocialMedias.mockReset();
  });

  it("mantém o botão de download quando o arquivo é público", async () => {
    mockFetch.mockResolvedValue(DRIVE.public());

    renderWithQueryClient(<AboutMeCard />);

    await waitFor(() =>
      expect(downloadLink()).toHaveAttribute(
        "href",
        `https://drive.google.com/uc?export=download&id=${FILE_ID}`
      )
    );
    expect(
      screen.queryByRole("button", { name: /Currículo indisponível/i })
    ).not.toBeInTheDocument();
  });

  it(
    "exibe o aviso desabilitado quando o id do currículo não existe no Drive",
    async () => {
      mockFetch.mockResolvedValue(DRIVE.notFound());

      renderWithQueryClient(<AboutMeCard />);

      await expectResumeUnavailableNotice();
    }
  );

  it(
    "exibe o aviso desabilitado quando o arquivo é privado (redireciona para o login)",
    async () => {
      mockFetch.mockResolvedValue(DRIVE.private());

      renderWithQueryClient(<AboutMeCard />);

      await expectResumeUnavailableNotice();
    }
  );

  it(
    "exibe o aviso desabilitado quando o Drive nega o acesso (403)",
    async () => {
      mockFetch.mockResolvedValue(DRIVE.forbidden());

      renderWithQueryClient(<AboutMeCard />);

      await expectResumeUnavailableNotice();
    }
  );

  it(
    "exibe o aviso desabilitado quando não é possível consultar o Drive",
    async () => {
      mockFetch.mockRejectedValue(new TypeError("fetch failed"));

      renderWithQueryClient(<AboutMeCard />);

      await expectResumeUnavailableNotice();
    }
  );
});
