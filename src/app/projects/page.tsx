import SectionProjects from "@/components/sections/SectionProjects";
import { getAllProjects } from "@/data/projects/getAllProjects";

export default async function ProjectsPage() {
  const allProjects = await getAllProjects();

  return (
    <SectionProjects
      description="Aqui você pode visualizar maioria dos projetos públicos que já desenvolvi, ordenados por relevância e posteriormente por ano de desenvolvimento"
      projects={allProjects}
    />
  );
}
