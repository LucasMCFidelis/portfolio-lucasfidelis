import { getExperiences } from "@/data/experiences/getExperiences";
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
  const experiences = await getExperiences();

  return (
    <SectionWrapper id={appSections.experiences.id} className="pt-[10vh]">
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
            {experiences.length > 0 ? (
              experiences.map((experience, index) => (
                <ExperienceCard
                  key={index}
                  title={experience.title}
                  company={experience.company}
                  startDate={experience.startDate}
                  endDate={experience.endDate}
                  description={experience.description}
                  technologies={experience.technologies}
                  type={experience.type}
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
