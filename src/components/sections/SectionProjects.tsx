import { appSections } from "@/utils/lists/appSections";
import { projectsList } from "@/utils/lists/projectsList";

import ProjectCard from "../ProjectCard";
import SectionWrapper from "../SectionWrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function SectionProjects() {
  return (
    <SectionWrapper id={appSections.projects.id}>
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
          {projectsList.map(
            ({ title, description, year, area, urlList, images }, index) => (
              <ProjectCard
                key={index}
                title={title}
                description={description}
                year={year}
                area={area}
                urlList={urlList}
                images={images}
              />
            )
          )}
        </CardContent>
      </Card>
    </SectionWrapper>
  );
}
