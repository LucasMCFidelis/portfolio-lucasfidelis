import { screen, waitFor } from "@testing-library/react";

import { getGlobalContent } from "@/actions/globalContent/getGlobalContent";
import { getAllSocialMedias } from "@/actions/socialMedias/getAllSocialMedias";
import { GLOBAL_CONTENT_FALLBACK } from "@/data/globalContent/globalContentFallback";
import { globalContentFixture, socialMediasFixture } from "@/test/fixtures";
import { renderWithQueryClient } from "@/test/renderWithQueryClient";

import AboutMeCard from "./AboutMeCard";

jest.mock("@/actions/globalContent/getGlobalContent", () => ({
  getGlobalContent: jest.fn(),
}));
jest.mock("@/actions/socialMedias/getAllSocialMedias", () => ({
  getAllSocialMedias: jest.fn(),
}));

const mockGetGlobalContent = getGlobalContent as jest.Mock;
const mockGetAllSocialMedias = getAllSocialMedias as jest.Mock;

// A disponibilidade do currículo tem testes próprios (ResumeAvailability.test);
// aqui o Drive sempre responde com o arquivo público.
const originalFetch = global.fetch;
const publicDriveFile = {
  ok: true,
  status: 200,
  url: "https://drive.usercontent.google.com/download?id=resume-file-id",
  headers: {
    get: (name: string) =>
      name.toLowerCase() === "content-type" ? "application/pdf" : null,
  },
  body: null,
};

describe("AboutMeCard", () => {
  beforeEach(() => {
    global.fetch = jest
      .fn()
      .mockResolvedValue(publicDriveFile) as unknown as typeof fetch;
    mockGetAllSocialMedias.mockResolvedValue(socialMediasFixture);
  });

  afterEach(() => {
    global.fetch = originalFetch;
    mockGetGlobalContent.mockReset();
    mockGetAllSocialMedias.mockReset();
  });

  it("exibe o conteúdo do banco e o botão de download do currículo", async () => {
    mockGetGlobalContent.mockResolvedValue(globalContentFixture);

    renderWithQueryClient(<AboutMeCard />);

    expect(
      await screen.findByText(globalContentFixture.aboutCurtDescription!)
    ).toBeInTheDocument();
    expect(screen.getByText("Primeiro parágrafo.")).toBeInTheDocument();
    expect(screen.getByText("Segundo parágrafo.")).toBeInTheDocument();
    expect(
      await screen.findByRole("link", { name: /DOWNLOAD RESUME/ })
    ).toHaveAttribute(
      "href",
      expect.stringContaining("id=resume-file-id")
    );
    expect(
      document.getElementById("fallback-content-notice")
    ).not.toBeInTheDocument();
  });

  it("exibe a versão padrão, o aviso e oculta o download quando o banco falha", async () => {
    mockGetGlobalContent.mockRejectedValue(new Error("banco fora do ar"));

    const { queryClient } = renderWithQueryClient(<AboutMeCard />);

    await waitFor(() =>
      expect(queryClient.getQueryState(["global-content"])?.status).toBe(
        "error"
      )
    );
    expect(
      screen.getByText(GLOBAL_CONTENT_FALLBACK.aboutLargeDescription[0])
    ).toBeInTheDocument();
    expect(
      document.getElementById("fallback-content-notice")
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /DOWNLOAD RESUME/ })
    ).not.toBeInTheDocument();
  });
});
