import { screen, waitFor } from "@testing-library/react";

import { getGlobalContent } from "@/actions/globalContent/getGlobalContent";
import { GLOBAL_CONTENT_FALLBACK } from "@/data/globalContent/globalContentFallback";
import { globalContentFixture } from "@/test/fixtures";
import { renderWithQueryClient } from "@/test/renderWithQueryClient";

import HomeDescription from "./HomeDescription";

jest.mock("@/actions/globalContent/getGlobalContent", () => ({
  getGlobalContent: jest.fn(),
}));

const mockGetGlobalContent = getGlobalContent as jest.Mock;

describe("HomeDescription", () => {
  afterEach(() => mockGetGlobalContent.mockReset());

  it("exibe a descrição do banco sem o aviso de versão padrão", async () => {
    mockGetGlobalContent.mockResolvedValue(globalContentFixture);

    renderWithQueryClient(<HomeDescription />);

    expect(
      await screen.findByText(globalContentFixture.aboutCurtDescription!)
    ).toBeInTheDocument();
    expect(
      document.getElementById("fallback-content-notice")
    ).not.toBeInTheDocument();
  });

  it("exibe a descrição padrão e o aviso quando o banco falha", async () => {
    mockGetGlobalContent.mockRejectedValue(new Error("banco fora do ar"));

    const { queryClient } = renderWithQueryClient(<HomeDescription />);

    await waitFor(() =>
      expect(queryClient.getQueryState(["global-content"])?.status).toBe(
        "error"
      )
    );
    expect(
      screen.getByText(GLOBAL_CONTENT_FALLBACK.aboutCurtDescription!)
    ).toBeInTheDocument();
    expect(document.getElementById("fallback-content-notice")).toHaveTextContent(
      /Versão padrão: não foi possível carregar os dados atualizados/
    );
  });
});
