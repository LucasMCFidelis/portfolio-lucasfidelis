"use client";

import {
  useAcademicExperiences,
  useProfessionalExperiences,
} from "@/data/experiences/useExperiences";
import { appSections } from "@/utils/lists/appSections";

import ExperienceCard from "../ExperienceCard/ExperienceCard";
import Reveal from "../Reveal";
import SectionWrapper from "../SectionWrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function SectionExperiences() {
  const { data: professionalExperiences = [] } = useProfessionalExperiences();
  const { data: academicExperiences = [] } = useAcademicExperiences();

  return (
    <SectionWrapper id={appSections.experiences.id} className="pt-[10vh]">
      <Card className="bg-transparent border-none w-full px-5">
        <Reveal asChild>
          <CardHeader className="p-0 flex flex-col md:flex-row justify-between">
            <CardTitle>
              <h2>Formação</h2>
            </CardTitle>
            <CardDescription className="md:max-w-1/2">
              Minha formação acadêmica em Análise e Desenvolvimento de Sistemas,
              complementada com especializações intensivas em Engenharia de
              Qualidade de Software. Uma base sólida que une conhecimento
              técnico com expertise em garantia de qualidade.
            </CardDescription>
          </CardHeader>
        </Reveal>
        <CardContent className="px-0">
          <div
            className="w-full mt-6"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {academicExperiences.length > 0 ? (
              academicExperiences.map((experience, index) => (
                <Reveal
                  key={`${experience.company}-${experience.title}-${experience.startDate}`}
                  className="grid"
                  delay={(index % 2) * 100}
                >
                  <ExperienceCard
                    title={experience.title}
                    company={experience.company}
                    startDate={experience.startDate}
                    endDate={experience.endDate}
                    description={experience.description}
                    skills={experience.skills}
                  />
                </Reveal>
              ))
            ) : (
              <p className="text-muted-foreground">
                Nenhuma formação disponível no momento.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
      <Card className="bg-transparent border-none w-full px-5">
        <Reveal asChild>
          <CardHeader className="p-0 flex flex-col md:flex-row justify-between">
            <CardTitle>
              <h2>Experiência Profissional</h2>
            </CardTitle>
            <CardDescription className="md:max-w-1/2">
              Resumo da minha trajetória profissional construída sobre projetos
              desafiadores, soluções inovadoras e constante aprendizado. Focada
              especialmente na garantia de qualidade de software, cada
              experiência reflete minha adaptabilidade e comprometimento com
              entrega de valor.
            </CardDescription>
          </CardHeader>
        </Reveal>
        <CardContent className="px-0">
          <div className="w-full flex flex-col gap-6 mt-6">
            {professionalExperiences.length > 0 ? (
              professionalExperiences.map((experience) => (
                <Reveal
                  key={`${experience.company}-${experience.title}-${experience.startDate}`}
                  className="grid"
                >
                  <ExperienceCard
                    title={experience.title}
                    company={experience.company}
                    startDate={experience.startDate}
                    endDate={experience.endDate}
                    description={experience.description}
                    skills={experience.skills}
                    type={experience.typeComplement}
                  />
                </Reveal>
              ))
            ) : (
              <p className="text-muted-foreground">
                Nenhuma experiência disponível no momento.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </SectionWrapper>
  );
}
