import { ProjectCardProps } from "@/interfaces/ProjectCardProps";
import ProjectCard from "./ProjectCard";

export default function SectionProjects() {
  const projects: ProjectCardProps[] = [
    {
      title: "EventosApp",
      description:
        "Sistema backend para gerenciamento de eventos com autenticação e validação de dados.",
      year: 2024,
      area: "Backend",
      urlGitHub: "https://github.com/seuusuario/EventosApp",
    },
    {
      title: "To-do List",
      description:
        "Aplicação web para gerenciamento de tarefas, com funcionalidades de edição e exclusão.",
      year: 2024,
      area: "Frontend",
      urlGitHub: "https://github.com/seuusuario/To-do-list",
    },
    {
      title: "Positivus Landing Page",
      description:
        "Landing page responsiva desenvolvida com React e Tailwind CSS.",
      year: 2024,
      area: "Frontend",
      urlGitHub: "https://github.com/seuusuario/Positivus-Landing-Page",
    },
    {
      title: "Portfólio",
      description: "Portfólio pessoal para exibir projetos e habilidades.",
      year: 2024,
      area: "Frontend",
      urlGitHub: "https://github.com/seuusuario/Portfolio",
    },
    {
      title: "API de Usuários",
      description:
        "API RESTful para gerenciamento de usuários, incluindo autenticação e autorização.",
      year: 2024,
      area: "Backend",
      urlGitHub: "https://github.com/seuusuario/API-Usuarios",
    },
  ];

  return (
    <section className="w-full flex flex-col items-start gap-8">
      <h2>Projetos em destaque</h2>
      <div className="w-full space-y-10 sm:space-y-20">
        {projects.map(
          ({ title, description, year, area, urlGitHub }, index) => (
            <ProjectCard
              key={index}
              title={title}
              description={description}
              year={year}
              area={area}
              urlGitHub={urlGitHub}
            />
          )
        )}
      </div>
    </section>
  );
}
