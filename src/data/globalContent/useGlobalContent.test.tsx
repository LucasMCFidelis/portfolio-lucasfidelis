import { renderHook, waitFor } from "@testing-library/react";

import { getGlobalContent } from "@/actions/globalContent/getGlobalContent";
import { globalContentFixture } from "@/test/fixtures";
import {
  createQueryWrapper,
  createTestQueryClient,
} from "@/test/renderWithQueryClient";

import { GLOBAL_CONTENT_FALLBACK } from "./globalContentFallback";
import { useGlobalContent } from "./useGlobalContent";

jest.mock("@/actions/globalContent/getGlobalContent", () => ({
  getGlobalContent: jest.fn(),
}));

const mockGetGlobalContent = getGlobalContent as jest.Mock;

describe("useGlobalContent", () => {
  afterEach(() => mockGetGlobalContent.mockReset());

  it("devolve os dados do banco quando a busca dá certo", async () => {
    mockGetGlobalContent.mockResolvedValue(globalContentFixture);

    const { result } = renderHook(() => useGlobalContent(), {
      wrapper: createQueryWrapper(),
    });

    await waitFor(() => expect(result.current.isFallback).toBe(false));
    expect(result.current.data).toEqual(globalContentFixture);
  });

  it("devolve a versão padrão quando a busca falha", async () => {
    mockGetGlobalContent.mockRejectedValue(new Error("banco fora do ar"));
    const queryClient = createTestQueryClient();

    const { result } = renderHook(() => useGlobalContent(), {
      wrapper: createQueryWrapper(queryClient),
    });

    await waitFor(() =>
      expect(queryClient.getQueryState(["global-content"])?.status).toBe(
        "error"
      )
    );
    expect(result.current.isFallback).toBe(true);
    expect(result.current.data).toBe(GLOBAL_CONTENT_FALLBACK);
  });
});
