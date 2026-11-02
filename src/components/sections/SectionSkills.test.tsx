import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { getHardSkills } from "@/actions/skills/getHardSkills";
import { getSoftSkills } from "@/actions/skills/getSoftSkills";
import { hardSkillsFixture, softSkillsFixture } from "@/test/fixtures";
import { renderWithQueryClient } from "@/test/renderWithQueryClient";

import SectionSkills from "./SectionSkills";

jest.mock("@/actions/skills/getHardSkills", () => ({ getHardSkills: jest.fn() }));
jest.mock("@/actions/skills/getSoftSkills", () => ({ getSoftSkills: jest.fn() }));

const mockGetHardSkills = getHardSkills as jest.Mock;
const mockGetSoftSkills = getSoftSkills as jest.Mock;

describe("SectionSkills", () => {
  afterEach(() => {
    mockGetHardSkills.mockReset();
    mockGetSoftSkills.mockReset();
  });

  it("exibe as hard e soft skills", async () => {
    mockGetHardSkills.mockResolvedValue(hardSkillsFixture);
    mockGetSoftSkills.mockResolvedValue(softSkillsFixture);

    renderWithQueryClient(<SectionSkills />);

    const hardList = await screen.findByRole("list", { name: "Hard Skills" });
    const softList = screen.getByRole("list", { name: "Soft Skills" });

    expect(within(hardList).getAllByRole("listitem")).toHaveLength(2);
    expect(within(hardList).getByText("Cypress")).toBeInTheDocument();
    expect(within(softList).getByText("Comunicação")).toBeInTheDocument();
    expect(
      document.getElementById("skill-badge-trabalho-em-equipe")
    ).toBeInTheDocument();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("exibe o aviso de indisponibilidade quando uma das listas falha", async () => {
    mockGetHardSkills.mockResolvedValue(hardSkillsFixture);
    mockGetSoftSkills.mockRejectedValue(new Error("banco fora do ar"));

    renderWithQueryClient(<SectionSkills />);

    // Durante o carregamento o botão mostra "Tentando..."; após a falha, volta a habilitar.
    expect(await screen.findByText("Tentar novamente")).toBeEnabled();
    expect(screen.getByRole("status")).toHaveAttribute("id", "unavailable-skills");
    expect(
      screen.getByText("Não foi possível carregar as habilidades agora.")
    ).toBeInTheDocument();
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  it("refaz só a busca que falhou e exibe as skills ao recuperar", async () => {
    mockGetHardSkills.mockResolvedValue(hardSkillsFixture);
    mockGetSoftSkills
      .mockRejectedValueOnce(new Error("banco fora do ar"))
      .mockResolvedValueOnce(softSkillsFixture);

    renderWithQueryClient(<SectionSkills />);

    await userEvent.click(await screen.findByText("Tentar novamente"));

    expect(
      await screen.findByRole("list", { name: "Soft Skills" })
    ).toBeInTheDocument();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(mockGetHardSkills).toHaveBeenCalledTimes(1);
    expect(mockGetSoftSkills).toHaveBeenCalledTimes(2);
  });
});
