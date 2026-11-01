import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Icon } from "@/components/IconWrapper";
import PersonJsonLd from "@/components/PersonJsonLd";
import PrefetchBoundary from "@/components/PrefetchBoundary";
import SectionProjects from "@/components/sections/SectionProjects";
import SectionWrapper from "@/components/SectionWrapper";
import { SocialMediasButtons } from "@/components/SocialMediasButtons";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { globalContentQueryOptions } from "@/data/globalContent/globalContentQueries";
import { inEvidenceProjectsQueryOptions } from "@/data/projects/projectsQueries";
import { socialMediasQueryOptions } from "@/data/socialMedias/socialMediasQueries";
import { appSections } from "@/utils/lists/appSections";
import { pageMetadata } from "@/utils/siteConfig";

import ActionsHomeCard from "./components/ActionsHomeCard";
import HomeDescription from "./components/HomeDescription";

export const metadata: Metadata = pageMetadata({
  title: "Analista de QA",
  description:
    "Lucas Fidelis, Analista de QA em João Pessoa (PB). Projetos em destaque de testes manuais e de APIs e automação de testes web e mobile com Cypress, Playwright, Appium e BDD.",
  path: appSections.home.href,
});

export default function HomePage() {
  return (
    <PrefetchBoundary
      queries={[
        globalContentQueryOptions(),
        inEvidenceProjectsQueryOptions(),
        socialMediasQueryOptions(),
      ]}
    >
      <PersonJsonLd />
      <SectionWrapper
        id={appSections.home.id}
        className="sm:items-center sm:flex-row-reverse sm:justify-between gap-5"
      >
        <div className="relative w-full max-w-sm self-center h-[60vh] sm:h-[40vh] sm:w-[30vh] lg:h-[65vh] lg:w-[55vh] xl:min-w-lg rounded-2xl animate-rise-in motion-reduce:animate-none">
          <Image
            src={"/profile.jpeg"}
            alt="Foto Lucas"
            fill
            className="object-cover object-top rounded-2xl"
          />
        </div>
        <Card className="w-full md:max-w-xl flex flex-col md:flex-1 gap-y-5 bg-transparent border-none">
          <CardHeader>
            <CardTitle className="animate-rise-in motion-reduce:animate-none [animation-delay:100ms]">
              <h1>
                Olá, eu sou
                <br className="hidden md:inline" /> Lucas Fidelis
              </h1>
            </CardTitle>
            <HomeDescription className="animate-rise-in motion-reduce:animate-none [animation-delay:200ms]" />
          </CardHeader>
          <CardAction className="flex justify-start items-center gap-4 px-5 animate-rise-in motion-reduce:animate-none [animation-delay:300ms]">
            <ActionsHomeCard>
              <SocialMediasButtons />
            </ActionsHomeCard>
          </CardAction>
        </Card>
      </SectionWrapper>
      <SectionProjects
        title="Projetos em Destaque"
        description="Aqui estão os principais projetos que já desenvolvi, com uma breve descrição sobre os aprendizados e as tecnologias utilizadas em cada um."
        variant="inEvidence"
      >
        <Link
          href={appSections.projects.href}
          id="redirect-to-all-projects"
          className={buttonVariants({ variant: "link" })}
        >
          Visualizar todos os Projetos
          <Icon name="ChevronRight" />
        </Link>
      </SectionProjects>
    </PrefetchBoundary>
  );
}
