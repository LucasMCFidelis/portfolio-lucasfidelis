import { Metadata } from "next";

import PrefetchBoundary from "@/components/PrefetchBoundary";
import SectionProjects from "@/components/sections/SectionProjects";
import { allProjectsQueryOptions } from "@/data/projects/projectsQueries";
import { socialMediasQueryOptions } from "@/data/socialMedias/socialMediasQueries";

export const metadata: Metadata = {
  title: "Projetos - Portfólio de Lucas Fidelis",
  description:
    "Explore os principais projetos desenvolvidos por Lucas Fidelis, organizados por relevância e ano. Conheça aplicações web, soluções front-end, automações e outros trabalhos profissionais e acadêmicos.",
};

export default function ProjectsPage() {
  return (
    <PrefetchBoundary
      queries={[allProjectsQueryOptions(), socialMediasQueryOptions()]}
    >
      <SectionProjects
        description="Aqui você pode visualizar maioria dos projetos públicos que já desenvolvi, ordenados por relevância e posteriormente por ano de desenvolvimento"
        variant="all"
      />
    </PrefetchBoundary>
  );
}
