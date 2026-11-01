import { Metadata } from "next";
import Image from "next/image";

import image from "@/assets/undraw_profile.svg";
import PrefetchBoundary from "@/components/PrefetchBoundary";
import SectionExperience from "@/components/sections/SectionExperience";
import SectionSkills from "@/components/sections/SectionSkills";
import SectionWrapper from "@/components/SectionWrapper";
import {
  academicExperiencesQueryOptions,
  professionalExperiencesQueryOptions,
} from "@/data/experiences/experiencesQueries";
import { globalContentQueryOptions } from "@/data/globalContent/globalContentQueries";
import {
  hardSkillsQueryOptions,
  softSkillsQueryOptions,
} from "@/data/skills/skillsQueries";
import { socialMediasQueryOptions } from "@/data/socialMedias/socialMediasQueries";
import { appSections } from "@/utils/lists/appSections";
import { pageMetadata } from "@/utils/siteConfig";

import AboutMeCard from "./components/AboutMeCard";

export const metadata: Metadata = pageMetadata({
  title: "Sobre Mim",
  description:
    "Conheça a trajetória de Lucas Fidelis como Analista de QA: formação em ADS pela UEPB, bootcamps em qualidade de software, experiências em times ágeis e habilidades em testes e automação.",
  path: appSections.about.href,
});

export default function AboutMePage() {
  return (
    <PrefetchBoundary
      queries={[
        globalContentQueryOptions(),
        socialMediasQueryOptions(),
        professionalExperiencesQueryOptions(),
        academicExperiencesQueryOptions(),
        hardSkillsQueryOptions(),
        softSkillsQueryOptions(),
      ]}
    >
      <SectionWrapper id={appSections.about.id} className="lg:flex-col">
        <div className="flex flex-col lg:flex-row w-full lg:justify-between">
          <h2 className="font-semibold animate-rise-in motion-reduce:animate-none">
            Sobre mim
          </h2>
          <AboutMeCard />
        </div>
        <Image
          src={image}
          alt=""
          className="w-full md:max-h-96 object-contain py-4 animate-rise-in motion-reduce:animate-none [animation-delay:200ms]"
        />
      </SectionWrapper>
      <SectionExperience />
      <SectionSkills />
    </PrefetchBoundary>
  );
}
