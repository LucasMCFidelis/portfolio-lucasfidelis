import { ReactNode } from "react";

interface ProjectCardWrapperProps {
  projectId: string;
  children: ReactNode;
}

export default function ProjectCardWrapper({
  projectId,
  children,
}: ProjectCardWrapperProps) {
  return (
    <article
      id={`project-${projectId}`}
      className="w-full flex flex-col justify-between items-center lg:flex-row lg:items-start lg:gap-20 lg:pl-20"
    >
      {children}
    </article>
  );
}
