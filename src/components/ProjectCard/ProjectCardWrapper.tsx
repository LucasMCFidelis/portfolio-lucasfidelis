import { ReactNode } from "react";

import Reveal from "../Reveal";

interface ProjectCardWrapperProps {
  projectId: string;
  children: ReactNode;
}

export default function ProjectCardWrapper({
  projectId,
  children,
}: ProjectCardWrapperProps) {
  return (
    <Reveal asChild>
      <article
        id={`project-${projectId}`}
        className="w-full flex flex-col justify-between items-center lg:flex-row lg:items-start lg:gap-20 lg:pl-20"
      >
        {children}
      </article>
    </Reveal>
  );
}
