import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { DataUnavailable } from "./DataUnavailable";

describe("DataUnavailable", () => {
  const message = "Não foi possível carregar os projetos agora.";

  it("exibe a mensagem de indisponibilidade com ids estáveis", () => {
    render(
      <DataUnavailable
        id="projects"
        message={message}
        onRetry={jest.fn()}
        isRetrying={false}
      />
    );

    const status = screen.getByRole("status");
    expect(status).toHaveAttribute("id", "unavailable-projects");
    expect(status).toHaveTextContent(message);
    expect(
      screen.getByRole("button", { name: `Tentar carregar novamente: ${message}` })
    ).toHaveAttribute("id", "retry-projects");
  });

  it("chama onRetry ao clicar em 'Tentar novamente'", async () => {
    const onRetry = jest.fn();
    render(
      <DataUnavailable
        id="projects"
        message={message}
        onRetry={onRetry}
        isRetrying={false}
      />
    );

    await userEvent.click(screen.getByText("Tentar novamente"));

    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("desabilita o botão enquanto tenta novamente", () => {
    render(
      <DataUnavailable
        id="projects"
        message={message}
        onRetry={jest.fn()}
        isRetrying
      />
    );

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent("Tentando...");
  });
});
