import { getAllProjects } from "@/data/projects/getAllProjects";

import ProjectCard from "../../components/ProjectCard";
import SectionWrapper from "../../components/SectionWrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

export default async function ProjectsPage() {
  const allProjects = await getAllProjects();

  return (
    <SectionWrapper>
      <Card className="bg-transparent border-none w-full gap-10">
        <CardHeader className="lg:w-1/2">
          <CardTitle>
            <h2>Projetos em destaque</h2>
          </CardTitle>
          <CardDescription>
            Aqui estão os principais projetos que já desenvolvi, com uma breve
            descrição sobre os aprendizados e as tecnologias utilizadas em cada
            um.
          </CardDescription>
        </CardHeader>
        <CardContent className="w-full space-y-10">
          {allProjects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </CardContent>
      </Card>
    </SectionWrapper>
  );
}
