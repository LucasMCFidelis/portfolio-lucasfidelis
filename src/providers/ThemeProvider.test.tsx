import { render, renderHook, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ThemeToggle from "@/components/ThemeToggle";
import { useThemeContext } from "@/hooks/states/useThemeContext";

import { ThemeProvider } from "./ThemeProvider";

function mockPrefersDark(matches: boolean) {
  (window.matchMedia as jest.Mock).mockImplementation((query: string) => ({
    matches,
    media: query,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  }));
}

function renderToggle() {
  return render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>
  );
}

const html = document.documentElement;

describe("ThemeProvider + ThemeToggle", () => {
  beforeEach(() => {
    localStorage.clear();
    html.classList.remove("dark");
    mockPrefersDark(false);
  });

  it("usa a preferência salva no localStorage", async () => {
    localStorage.setItem("isDarkMode", "true");

    renderToggle();

    await waitFor(() => expect(html).toHaveClass("dark"));
  });

  it("segue o prefers-color-scheme quando não há preferência salva", async () => {
    mockPrefersDark(true);

    renderToggle();

    await waitFor(() => expect(html).toHaveClass("dark"));
    expect(localStorage.getItem("isDarkMode")).toBe("true");
  });

  it("alterna o tema e persiste a escolha", async () => {
    renderToggle();
    await waitFor(() => expect(localStorage.getItem("isDarkMode")).toBe("false"));

    await userEvent.click(screen.getByRole("button", { name: "toggle-theme" }));

    expect(html).toHaveClass("dark");
    expect(localStorage.getItem("isDarkMode")).toBe("true");

    await userEvent.click(screen.getByRole("button", { name: "toggle-theme" }));

    expect(html).not.toHaveClass("dark");
    expect(localStorage.getItem("isDarkMode")).toBe("false");
  });
});

describe("useThemeContext", () => {
  it("lança erro fora do ThemeProvider", () => {
    jest.spyOn(console, "error").mockImplementation(() => {});

    expect(() => renderHook(() => useThemeContext())).toThrow(
      "Theme Provider not found"
    );

    jest.restoreAllMocks();
  });
});
