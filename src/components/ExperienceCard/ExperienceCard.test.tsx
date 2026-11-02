import { render, screen, within } from "@testing-library/react";

import ExperienceCard from "./ExperienceCard";

const baseProps = {
  title: "Analista de QA",
  company: "Empresa X",
  startDate: "Jan 2025",
  description: ["Testes manuais."],
  skills: [],
};

describe("ExperienceCard", () => {
  it("exibe título, empresa e período", () => {
    render(<ExperienceCard {...baseProps} endDate="Jun 2025" />);

    expect(screen.getByText("Analista de QA")).toBeInTheDocument();
    expect(screen.getByText("Empresa X")).toBeInTheDocument();
    expect(screen.getByText("Jan 2025 — Jun 2025")).toBeInTheDocument();
  });

  it("mostra 'Atualmente' quando não há data de término", () => {
    render(<ExperienceCard {...baseProps} />);

    expect(screen.getByText("Jan 2025 — Atualmente")).toBeInTheDocument();
  });

  it("traduz o tipo de experiência profissional", () => {
    render(<ExperienceCard {...baseProps} type="internship" />);

    expect(screen.getByText("Estágio")).toBeInTheDocument();
  });

  it("não exibe rótulo para tipos desconhecidos", () => {
    render(<ExperienceCard {...baseProps} type="desconhecido" />);

    expect(screen.queryByText("desconhecido")).not.toBeInTheDocument();
  });

  it("usa parágrafo para uma descrição e lista para várias", () => {
    const { rerender } = render(<ExperienceCard {...baseProps} />);
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
    expect(screen.getByText("Testes manuais.").tagName).toBe("P");

    rerender(
      <ExperienceCard
        {...baseProps}
        description={["Testes manuais.", "Automação com Cypress."]}
      />
    );
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  it("exibe as skills relacionadas", () => {
    render(
      <ExperienceCard
        {...baseProps}
        skills={[
          { titleSkill: "Cypress", typeSkill: "hard" },
          { titleSkill: "Postman", typeSkill: "hard" },
        ]}
      />
    );

    const skills = screen.getByRole("list", { name: "Skills relacionadas" });
    expect(within(skills).getByText("Cypress")).toBeInTheDocument();
    expect(within(skills).getByText("Postman")).toBeInTheDocument();
  });
});
