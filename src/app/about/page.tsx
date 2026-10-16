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

import AboutMeCard from "./components/AboutMeCard";

export const metadata: Metadata = {
  title: "Sobre Mim - Portfólio de Lucas Fidelis",
  description:
    "Conheça mais sobre Lucas Fidelis — desenvolvedor focado em soluções web modernas. Saiba sobre sua trajetória, principais habilidades técnicas e comportamentais, experiências e formas de contato.",
};

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
          <h2 className="font-semibold">Sobre mim</h2>
          <AboutMeCard />
        </div>
        <Image
          src={image}
          alt=""
          className="w-full md:max-h-96 object-contain py-4"
        />
      </SectionWrapper>
      <SectionExperience />
      <SectionSkills />
    </PrefetchBoundary>
  );
}
