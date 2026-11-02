import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { getAllProjects } from "@/actions/projects/getAllProjects";
import { getInEvidenceProjects } from "@/actions/projects/getInEvidenceProjects";
import { projectFixture } from "@/test/fixtures";
import { renderWithQueryClient } from "@/test/renderWithQueryClient";

import SectionProjects from "./SectionProjects";

jest.mock("@/actions/projects/getAllProjects", () => ({
  getAllProjects: jest.fn(),
}));
jest.mock("@/actions/projects/getInEvidenceProjects", () => ({
  getInEvidenceProjects: jest.fn(),
}));

const mockGetAll = getAllProjects as jest.Mock;
const mockGetInEvidence = getInEvidenceProjects as jest.Mock;

const errorMessage = "Não foi possível carregar os projetos agora.";

describe("SectionProjects", () => {
  afterEach(() => {
    mockGetAll.mockReset();
    mockGetInEvidence.mockReset();
  });

  it("lista todos os projetos na variante 'all'", async () => {
    mockGetAll.mockResolvedValue([projectFixture]);

    renderWithQueryClient(
      <SectionProjects variant="all" title="Todos os projetos" />
    );

    expect(
      screen.getByRole("heading", { name: "Todos os projetos" })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("heading", { name: "Portfólio" })
    ).toBeInTheDocument();
    expect(document.getElementById("project-project-1")).toBeInTheDocument();
    expect(mockGetAll).toHaveBeenCalled();
    expect(mockGetInEvidence).not.toHaveBeenCalled();
  });

  it("usa os projetos em evidência na variante 'inEvidence'", async () => {
    mockGetInEvidence.mockResolvedValue([projectFixture]);

    renderWithQueryClient(<SectionProjects variant="inEvidence" />);

    expect(
      await screen.findByRole("heading", { name: "Portfólio" })
    ).toBeInTheDocument();
    expect(mockGetInEvidence).toHaveBeenCalled();
    expect(mockGetAll).not.toHaveBeenCalled();
  });

  it("exibe o aviso de indisponibilidade e mantém os children quando a busca falha", async () => {
    mockGetInEvidence.mockRejectedValue(new Error("banco fora do ar"));

    renderWithQueryClient(
      <SectionProjects variant="inEvidence">
        <a href="/projects">Ver todos</a>
      </SectionProjects>
    );

    expect(await screen.findByText("Tentar novamente")).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveAttribute(
      "id",
      "unavailable-projects-inEvidence"
    );
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Ver todos" })).toBeInTheDocument();
    expect(screen.queryByRole("article")).not.toBeInTheDocument();
  });

  it("recupera os projetos após clicar em 'Tentar novamente'", async () => {
    mockGetAll
      .mockRejectedValueOnce(new Error("banco fora do ar"))
      .mockResolvedValueOnce([projectFixture]);

    renderWithQueryClient(<SectionProjects variant="all" />);

    await userEvent.click(await screen.findByText("Tentar novamente"));

    expect(
      await screen.findByRole("heading", { name: "Portfólio" })
    ).toBeInTheDocument();
    expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();
  });
});
