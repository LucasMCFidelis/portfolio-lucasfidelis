import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ErrorPage from "./error";

describe("ErrorPage", () => {
  let consoleError: jest.SpyInstance;

  beforeEach(() => {
    consoleError = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => consoleError.mockRestore());

  it("exibe a mensagem de erro e registra o erro no console", () => {
    const error = new Error("falha inesperada");

    render(<ErrorPage error={error} reset={jest.fn()} />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Não foi possível carregar esta página",
      })
    ).toBeInTheDocument();
    expect(screen.getByText("ALGO DEU ERRADO")).toBeInTheDocument();
    expect(consoleError).toHaveBeenCalledWith(error);
  });

  it("tenta renderizar a página de novo ao clicar em 'Tentar novamente'", async () => {
    const reset = jest.fn();

    render(<ErrorPage error={new Error("x")} reset={reset} />);

    await userEvent.click(
      screen.getByRole("button", { name: "Tentar carregar a página novamente" })
    );

    expect(reset).toHaveBeenCalledTimes(1);
  });

  it("oferece um link de volta para o início", () => {
    render(<ErrorPage error={new Error("x")} reset={jest.fn()} />);

    const link = screen.getByRole("link", {
      name: "Voltar para a página inicial",
    });
    expect(link).toHaveAttribute("href", "/");
    expect(link).toHaveAttribute("id", "error-redirect-to-home");
  });
});
