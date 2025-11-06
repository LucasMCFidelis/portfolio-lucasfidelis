import "react-toastify/dist/ReactToastify.css";

import { ReactNode } from "react";

import { ProjectDTO } from "@/data/projects/projectDTO";

import { ProjectCardCarousel } from "../ProjectCard/ProjectCardCarousel";
import ProjectCardWrapper from "../ProjectCard/ProjectCardWrapper";
import { ProjectCardTextArea } from "../ProjectCard/ProjectCartTextArea";
import SectionWrapper from "../SectionWrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface SectionProjectsProps {
  title?: string;
  description?: string;
  projects: Array<ProjectDTO>;
  children?: ReactNode;
}

export default async function SectionProjects({
  title = "Projetos",
  description,
  projects,
  children,
}: SectionProjectsProps) {
  return (
    <>
      <SectionWrapper>
        <Card className="bg-transparent border-none w-full gap-10">
          <CardHeader className="lg:w-1/2">
            <CardTitle>
              <h2>{title}</h2>
            </CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </CardHeader>
          <CardContent className="w-full space-y-10">
            {projects.map((project) => {
              const { images, ...rest } = project;
              const haveImages = project.images.length > 0;
              return (
                <ProjectCardWrapper key={project.id} projectId={project.id}>
                  {haveImages && <ProjectCardCarousel images={images} />}
                  <ProjectCardTextArea haveImages={haveImages} {...rest} />
                </ProjectCardWrapper>
              );
            })}
            {children}
          </CardContent>
        </Card>
      </SectionWrapper>
    </>
  );
}
