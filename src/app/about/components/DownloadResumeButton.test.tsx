import { act, fireEvent, render, screen } from "@testing-library/react";

import DownloadResumeButton from "./DownloadResumeButton";

describe("DownloadResumeButton", () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it("aponta para o download do arquivo no Google Drive", () => {
    render(<DownloadResumeButton fileId="abc123" />);

    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "https://drive.google.com/uc?export=download&id=abc123"
    );
  });

  it("mostra o estado de download ao clicar e volta ao normal após 3 s", () => {
    render(<DownloadResumeButton fileId="abc123" />);
    const link = screen.getByRole("link");

    // Evita a navegação (não implementada no jsdom) sem impedir o onClick.
    link.addEventListener("click", (event) => event.preventDefault());
    fireEvent.click(link);

    expect(link).toHaveTextContent("BAIXANDO O ARQUIVO");
    expect(link).toHaveAttribute("aria-disabled", "true");

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(link).toHaveTextContent("DOWNLOAD RESUME");
    expect(link).toHaveAttribute("aria-disabled", "false");
  });
});
