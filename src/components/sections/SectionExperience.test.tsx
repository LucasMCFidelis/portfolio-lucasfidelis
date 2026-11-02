import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { getAcademicExperiences } from "@/actions/experiences/getAcademicExperiences";
import { getProfessionalExperiences } from "@/actions/experiences/getProfessionalExperiences";
import {
  academicExperiencesFixture,
  professionalExperiencesFixture,
} from "@/test/fixtures";
import { renderWithQueryClient } from "@/test/renderWithQueryClient";

import SectionExperiences from "./SectionExperience";

jest.mock("@/actions/experiences/getAcademicExperiences", () => ({
  getAcademicExperiences: jest.fn(),
}));
jest.mock("@/actions/experiences/getProfessionalExperiences", () => ({
  getProfessionalExperiences: jest.fn(),
}));

const mockGetAcademic = getAcademicExperiences as jest.Mock;
const mockGetProfessional = getProfessionalExperiences as jest.Mock;

const academicError = "Não foi possível carregar a formação agora.";
const professionalError =
  "Não foi possível carregar as experiências profissionais agora.";

describe("SectionExperiences", () => {
  afterEach(() => {
    mockGetAcademic.mockReset();
    mockGetProfessional.mockReset();
  });

  it("exibe a formação e as experiências profissionais", async () => {
    mockGetAcademic.mockResolvedValue(academicExperiencesFixture);
    mockGetProfessional.mockResolvedValue(professionalExperiencesFixture);

    renderWithQueryClient(<SectionExperiences />);

    expect(
      await screen.findByText("Análise e Desenvolvimento de Sistemas")
    ).toBeInTheDocument();
    expect(await screen.findByText("Analista de QA")).toBeInTheDocument();
    expect(screen.getByText("Empresa X")).toBeInTheDocument();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("exibe mensagens de lista vazia", async () => {
    mockGetAcademic.mockResolvedValue([]);
    mockGetProfessional.mockResolvedValue([]);

    renderWithQueryClient(<SectionExperiences />);

    expect(
      await screen.findByText("Nenhuma formação disponível no momento.")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Nenhuma experiência disponível no momento.")
    ).toBeInTheDocument();
  });

  it("mostra o aviso só na formação quando apenas ela falha", async () => {
    mockGetAcademic.mockRejectedValue(new Error("banco fora do ar"));
    mockGetProfessional.mockResolvedValue(professionalExperiencesFixture);

    renderWithQueryClient(<SectionExperiences />);

    expect(await screen.findByText("Analista de QA")).toBeInTheDocument();
    expect(await screen.findByText("Tentar novamente")).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveAttribute(
      "id",
      "unavailable-academic-experiences"
    );
    expect(screen.getByText(academicError)).toBeInTheDocument();
    expect(screen.queryByText(professionalError)).not.toBeInTheDocument();
  });

  it("mostra o aviso só nas experiências profissionais quando apenas elas falham", async () => {
    mockGetAcademic.mockResolvedValue(academicExperiencesFixture);
    mockGetProfessional.mockRejectedValue(new Error("banco fora do ar"));

    renderWithQueryClient(<SectionExperiences />);

    expect(
      await screen.findByText("Análise e Desenvolvimento de Sistemas")
    ).toBeInTheDocument();
    expect(await screen.findByText("Tentar novamente")).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveAttribute(
      "id",
      "unavailable-professional-experiences"
    );
    expect(screen.queryByText(academicError)).not.toBeInTheDocument();
  });

  it("recupera a lista após clicar em 'Tentar novamente'", async () => {
    mockGetAcademic
      .mockRejectedValueOnce(new Error("banco fora do ar"))
      .mockResolvedValueOnce(academicExperiencesFixture);
    mockGetProfessional.mockResolvedValue([]);

    renderWithQueryClient(<SectionExperiences />);

    await userEvent.click(await screen.findByText("Tentar novamente"));

    expect(
      await screen.findByText("Análise e Desenvolvimento de Sistemas")
    ).toBeInTheDocument();
    expect(screen.queryByText(academicError)).not.toBeInTheDocument();
  });
});
