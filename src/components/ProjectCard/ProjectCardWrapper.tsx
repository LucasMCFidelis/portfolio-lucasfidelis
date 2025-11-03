import { ReactNode } from "react";

export default function ProjectCardWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <article className="w-full flex flex-col justify-between items-center lg:flex-row lg:items-start lg:gap-20 lg:pl-20">
      {children}
    </article>
  );
}
