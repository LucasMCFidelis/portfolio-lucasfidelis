import Link from "next/link";

import { Icon, IconName } from "@/components/IconWrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ProjectDTO } from "@/data/projects/projectDTO";
import { cn } from "@/lib/utils";

import { buttonVariants } from "../ui/button";

interface ProjectCardTextAreaProps extends Omit<ProjectDTO, "images"> {
  haveImages: boolean;
}

interface LinkInProjectCartProps {
  iconKey: IconName;
  href: string;
  title: string;
}

function LinkInProjectCart({ href, iconKey, title }: LinkInProjectCartProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "first-letter:uppercase",
        buttonVariants({ variant: "link" })
      )}
    >
      {title}
      <Icon name={iconKey} />
    </Link>
  );
}

export function ProjectCardTextArea({
  title,
  description,
  yearDevelopment,
  typeProject,
  repositoryUrl,
  deploymentUrl,
  documentationUrl,
  haveImages,
}: ProjectCardTextAreaProps) {
  return (
    <Card
      className={`bg-transparent border-none shadow-none w-full flex-1 ${
        haveImages ? "flex justify-between" : "grid lg:grid-cols-2"
      }`}
    >
      <CardHeader className={`${!haveImages && "pl-0"}`}>
        <CardTitle>
          <h3>{title}</h3>
        </CardTitle>
        <CardDescription className="flex-1">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 space-y-3 sm:space-y-5">
        <h4 className="uppercase">Informações do Projeto</h4>
        <Separator />
        <div className="flex justify-between items-center">
          <p>Ano</p>
          <p>{yearDevelopment}</p>
        </div>
        <Separator />
        <div className="flex justify-between items-center">
          <p>Área</p>
          <p className="first-letter:uppercase">
            {typeProject === "qa" ? "Quality Assurance (QA)" : typeProject}
          </p>
        </div>
        <Separator />
        <CardFooter className="max-w-full flex flex-wrap gap-x-2 px-0">
          <LinkInProjectCart
            iconKey={"GitHub"}
            href={repositoryUrl}
            title={"Repositório"}
          />
          {deploymentUrl && (
            <LinkInProjectCart
              iconKey={"Link"}
              href={deploymentUrl}
              title={"Deploy"}
            />
          )}
          {documentationUrl && (
            <LinkInProjectCart
              iconKey={"Folder"}
              href={documentationUrl}
              title={"Documentação"}
            />
          )}
        </CardFooter>
      </CardContent>
    </Card>
  );
}
