import { renderHook, waitFor } from "@testing-library/react";

import { getAllSocialMedias } from "@/actions/socialMedias/getAllSocialMedias";
import { socialMediasFixture } from "@/test/fixtures";
import {
  createQueryWrapper,
  createTestQueryClient,
} from "@/test/renderWithQueryClient";

import { SOCIAL_MEDIAS_FALLBACK } from "./socialMediasFallback";
import { useSocialMedias } from "./useSocialMedias";

jest.mock("@/actions/socialMedias/getAllSocialMedias", () => ({
  getAllSocialMedias: jest.fn(),
}));

const mockGetAllSocialMedias = getAllSocialMedias as jest.Mock;

describe("useSocialMedias", () => {
  afterEach(() => mockGetAllSocialMedias.mockReset());

  it("devolve as redes do banco quando a busca dá certo", async () => {
    mockGetAllSocialMedias.mockResolvedValue(socialMediasFixture);

    const { result } = renderHook(() => useSocialMedias(), {
      wrapper: createQueryWrapper(),
    });

    await waitFor(() => expect(result.current.isFallback).toBe(false));
    expect(result.current.data).toEqual(socialMediasFixture);
  });

  it("devolve as redes padrão quando a busca falha", async () => {
    mockGetAllSocialMedias.mockRejectedValue(new Error("banco fora do ar"));
    const queryClient = createTestQueryClient();

    const { result } = renderHook(() => useSocialMedias(), {
      wrapper: createQueryWrapper(queryClient),
    });

    await waitFor(() =>
      expect(queryClient.getQueryState(["social-medias"])?.status).toBe(
        "error"
      )
    );
    expect(result.current.isFallback).toBe(true);
    expect(result.current.data).toBe(SOCIAL_MEDIAS_FALLBACK);
  });
});
