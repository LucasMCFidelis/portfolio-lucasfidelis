import { getAcademicExperiences } from "@/data/experiences/getAcademicExperiences";
import { getProfessionalExperiences } from "@/data/experiences/getProfessionalExperiences";
import { appSections } from "@/utils/lists/appSections";

import ExperienceCard from "../ExperienceCard/ExperienceCard";
import SectionWrapper from "../SectionWrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default async function SectionExperiences() {
  const results = await Promise.allSettled([
    getProfessionalExperiences(),
    getAcademicExperiences(),
  ]);

  const professionalExperiences =
    results[0].status === "fulfilled" ? results[0].value : [];

  const academicExperiences =
    results[1].status === "fulfilled" ? results[1].value : [];

  return (
    <SectionWrapper id={appSections.experiences.id} className="pt-[10vh]">
      <Card className="bg-transparent border-none w-full px-5">
        <CardHeader className="p-0 flex flex-col md:flex-row justify-between">
          <CardTitle>
            <h2>Formação</h2>
          </CardTitle>
          <CardDescription className="md:max-w-1/2">
            Minha formação acadêmica em Análise e Desenvolvimento de Sistemas,
            complementada com especializações intensivas em Engenharia de
            Qualidade de Software. Uma base sólida que une conhecimento técnico
            com expertise em garantia de qualidade.
          </CardDescription>
        </CardHeader>
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
                <ExperienceCard
                  key={index}
                  title={experience.title}
                  company={experience.company}
                  startDate={experience.startDate}
                  endDate={experience.endDate}
                  description={experience.description}
                  technologies={experience.technologies}
                />
              ))
            ) : (
              <p className="text-muted-foreground">Carregando formação...</p>
            )}
          </div>
        </CardContent>
      </Card>
      <Card className="bg-transparent border-none w-full px-5">
        <CardHeader className="p-0 flex flex-col md:flex-row justify-between">
          <CardTitle>
            <h2>Experiência Profissional</h2>
          </CardTitle>
          <CardDescription className="md:max-w-1/2">
            Resumo da minha trajetória profissional construída sobre projetos
            desafiadores, soluções inovadoras e constante aprendizado. Focada
            especialmente na garantia de qualidade de software, cada experiência
            reflete minha adaptabilidade e comprometimento com entrega de valor.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-0">
          <div className="w-full flex flex-col gap-6 mt-6">
            {professionalExperiences.length > 0 ? (
              professionalExperiences.map((experience, index) => (
                <ExperienceCard
                  key={index}
                  title={experience.title}
                  company={experience.company}
                  startDate={experience.startDate}
                  endDate={experience.endDate}
                  description={experience.description}
                  technologies={experience.technologies}
                  type={experience.typeComplement}
                />
              ))
            ) : (
              <p className="text-muted-foreground">
                Carregando experiências...
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </SectionWrapper>
  );
}
