"use client";

import { useHardSkills, useSoftSkills } from "@/data/skills/useSkills";
import { appSections } from "@/utils/lists/appSections";

import Reveal from "../Reveal";
import SectionWrapper from "../SectionWrapper";
import SkillList from "../SkillList";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function SectionSkills() {
  const { data: hardSkills = [] } = useHardSkills();
  const { data: softSkills = [] } = useSoftSkills();

  return (
    <SectionWrapper id={appSections.skills.id} className="pt-[10vh]">
      <Card className="bg-transparent border-none w-full px-5">
        <Reveal asChild>
          <CardHeader className="p-0 flex flex-col md:flex-row justify-between">
            <CardTitle>
              <h2>Minhas habilidades</h2>
            </CardTitle>
            <CardDescription className="md:max-w-1/2">
              Estou constantemente buscando aprimorar minhas habilidades e
              aprender novas, conforme necessário. Atualmente, minhas principais
              competências incluem:
            </CardDescription>
          </CardHeader>
        </Reveal>
        <CardContent className="flex flex-col md:flex-row justify-between gap-8 px-0">
          <div className="w-full md:w-1/2 h-min flex flex-wrap justify-start gap-y-5">
            <p className="text-sm lg:text-2xl font-sans w-full">Hard Skills</p>
            <SkillList skills={hardSkills} label="Hard Skills" />
          </div>
          <div className="w-full md:w-1/2 h-min flex flex-wrap gap-x-3 gap-y-5">
            <p className="text-sm lg:text-2xl font-sans w-full">Soft Skills</p>
            <SkillList skills={softSkills} label="Soft Skills" />
          </div>
        </CardContent>
      </Card>
    </SectionWrapper>
  );
}
