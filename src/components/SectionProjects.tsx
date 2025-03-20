import { projectsList } from "@/projectsList";
import ProjectCard from "./ProjectCard";

export default function SectionProjects() {
  return (
    <section className="w-full flex flex-col items-start gap-8">
      <h2>Projetos em destaque</h2>
      <div className="w-full space-y-10 sm:space-y-20">
        {projectsList.map(
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
