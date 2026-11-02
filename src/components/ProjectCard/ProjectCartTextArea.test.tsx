import { render, screen } from "@testing-library/react";

import { projectFixture } from "@/test/fixtures";

import { ProjectCardTextArea } from "./ProjectCartTextArea";

// `images` fica de fora: o card de texto não as usa.
const { images, ...project } = projectFixture;
void images;

describe("ProjectCardTextArea", () => {
  it("exibe título, descrição, ano e área do projeto", () => {
    render(<ProjectCardTextArea {...project} haveImages={false} />);

    expect(
      screen.getByRole("heading", { name: "Portfólio" })
    ).toBeInTheDocument();
    expect(screen.getByText("Meu portfólio pessoal.")).toBeInTheDocument();
    expect(screen.getByText("2025")).toBeInTheDocument();
    expect(screen.getByText("frontend")).toBeInTheDocument();
  });

  it("exibe o nome completo da área de QA", () => {
    render(
      <ProjectCardTextArea {...project} typeProject="qa" haveImages={false} />
    );

    expect(screen.getByText("Quality Assurance (QA)")).toBeInTheDocument();
  });

  it("usa 'Repositório' quando o repositório não tem título e abre os links em nova guia", () => {
    render(<ProjectCardTextArea {...project} haveImages={false} />);

    const repository = screen.getByRole("link", {
      name: "Repositório, abre em uma nova guia",
    });
    expect(repository).toHaveAttribute("href", "https://github.com/x/portfolio");
    expect(repository).toHaveAttribute("target", "_blank");
    expect(repository).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("exibe deploy e documentação apenas quando existem", () => {
    const { rerender } = render(
      <ProjectCardTextArea {...project} haveImages={false} />
    );

    expect(
      screen.getByRole("link", { name: "Deploy, abre em uma nova guia" })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /Documentação/ })
    ).not.toBeInTheDocument();

    rerender(
      <ProjectCardTextArea
        {...project}
        deploymentUrl={null}
        documentationUrl="https://docs.example.com"
        haveImages={false}
      />
    );

    expect(screen.queryByRole("link", { name: /Deploy/ })).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Documentação, abre em uma nova guia" })
    ).toHaveAttribute("href", "https://docs.example.com");
  });

  it("lista as skills e omite a seção quando não há skills", () => {
    const { rerender } = render(
      <ProjectCardTextArea {...project} haveImages={false} />
    );

    expect(document.getElementById("project-project-1-skills")).toHaveTextContent(
      "React"
    );

    rerender(<ProjectCardTextArea {...project} skills={[]} haveImages={false} />);

    expect(screen.queryByText("Skills")).not.toBeInTheDocument();
    expect(
      document.getElementById("project-project-1-skills")
    ).not.toBeInTheDocument();
  });
});
