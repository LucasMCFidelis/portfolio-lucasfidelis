import { screen, waitFor } from "@testing-library/react";

import { getAllSocialMedias } from "@/actions/socialMedias/getAllSocialMedias";
import { socialMediasFixture } from "@/test/fixtures";
import { renderWithQueryClient } from "@/test/renderWithQueryClient";

import { SocialMediasButtons } from "./SocialMediasButtons";

jest.mock("@/actions/socialMedias/getAllSocialMedias", () => ({
  getAllSocialMedias: jest.fn(),
}));

const mockGetAllSocialMedias = getAllSocialMedias as jest.Mock;

describe("SocialMediasButtons", () => {
  afterEach(() => mockGetAllSocialMedias.mockReset());

  it("renderiza um link externo seguro para cada rede do banco", async () => {
    mockGetAllSocialMedias.mockResolvedValue(socialMediasFixture);

    renderWithQueryClient(<SocialMediasButtons />);

    const linkedin = await screen.findByRole("link", { name: "LinkedIn" });
    expect(linkedin).toHaveAttribute("href", "https://linkedin.com/in/lucas");
    expect(linkedin).toHaveAttribute("target", "_blank");
    expect(linkedin).toHaveAttribute("rel", "noopener noreferrer");
    expect(linkedin).toHaveAttribute("id", "linkedin");
    expect(screen.getAllByRole("link")).toHaveLength(2);
  });

  it("exibe apenas as redes padrão quando o banco falha", async () => {
    mockGetAllSocialMedias.mockRejectedValue(new Error("banco fora do ar"));

    const { queryClient } = renderWithQueryClient(<SocialMediasButtons />);

    await waitFor(() =>
      expect(queryClient.getQueryState(["social-medias"])?.status).toBe(
        "error"
      )
    );
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveAccessibleName("GitHub");
    expect(links[0]).toHaveAttribute(
      "href",
      "https://github.com/LucasMCFidelis"
    );
  });
});
