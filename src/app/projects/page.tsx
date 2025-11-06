import { Metadata } from "next";

import SectionProjects from "@/components/sections/SectionProjects";
import { getAllProjects } from "@/data/projects/getAllProjects";

export const metadata: Metadata = {
  title: "Projetos - Portfólio de Lucas Fidelis",
  description:
    "Explore os principais projetos desenvolvidos por Lucas Fidelis, organizados por relevância e ano. Conheça aplicações web, soluções front-end, automações e outros trabalhos profissionais e acadêmicos.",
};

export default async function ProjectsPage() {
  const allProjects = await getAllProjects();

  return (
    <SectionProjects
      description="Aqui você pode visualizar maioria dos projetos públicos que já desenvolvi, ordenados por relevância e posteriormente por ano de desenvolvimento"
      projects={allProjects}
    />
  );
}
