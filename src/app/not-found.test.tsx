import { render, screen } from "@testing-library/react";

import NotFound, { metadata } from "./not-found";

describe("NotFound", () => {
  it("exibe a página 404 com link para o início", () => {
    render(<NotFound />);

    expect(screen.getByText("ERRO 404")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: "Página não encontrada" })
    ).toBeInTheDocument();

    const link = screen.getByRole("link", {
      name: "Voltar para a página inicial",
    });
    expect(link).toHaveAttribute("href", "/");
    expect(link).toHaveAttribute("id", "redirect-to-home");
  });

  it("não é indexada pelos buscadores", () => {
    expect(metadata.robots).toEqual({ index: false });
  });
});
