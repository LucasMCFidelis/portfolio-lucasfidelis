"use client";

import "react-toastify/dist/ReactToastify.css";

import { ReactNode } from "react";

import { ProjectsVariant } from "@/data/projects/projectsQueries";
import { useProjects } from "@/data/projects/useProjects";

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
  variant: ProjectsVariant;
  children?: ReactNode;
}

export default function SectionProjects({
  title = "Projetos",
  description,
  variant,
  children,
}: SectionProjectsProps) {
  const { data: projects = [] } = useProjects(variant);

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
