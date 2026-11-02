import { Metadata } from "next";

import PrefetchBoundary from "@/components/PrefetchBoundary";
import SectionProjects from "@/components/sections/SectionProjects";
import { allProjectsQueryOptions } from "@/data/projects/projectsQueries";
import { socialMediasQueryOptions } from "@/data/socialMedias/socialMediasQueries";
import { appSections } from "@/utils/lists/appSections";
import { pageMetadata } from "@/utils/siteConfig";

export const metadata: Metadata = pageMetadata({
  title: "Projetos",
  description:
    "Projetos de qualidade de software de Lucas Fidelis: automação de testes E2E, de API e mobile, BDD com Gherkin, testes de integração e pipelines de CI com GitHub Actions.",
  path: appSections.projects.href,
});

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
