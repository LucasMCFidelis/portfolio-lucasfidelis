import { CardContent } from "@mui/material";
import SectionWrapper from "../SectionWrapper";
import { Card, CardDescription, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

export default function SectionSkills() {
  const hardSkills = [
    "html",
    "css",
    "javascript",
    "git",
    "tailwind css",
    "figma",
    "github",
    "cypress",
    "typescript",
    "node.js",
  ];
  const softSkills = [
    "Adaptabilidade",
    "Empatia ",
    "Proatividade",
    "Organização",
    "Flexibilidade",
    "Comunicação",
    "Aprendizado Contínuo",
  ];
  return (
    <SectionWrapper>
      <Card className="bg-transparent border-none w-full">
        <div className="flex flex-col md:flex-row justify-between">
          <CardTitle>
            <h2>Minhas habilidades</h2>
          </CardTitle>
          <CardDescription className="md:max-w-1/2">
            Estou constantemente buscando aprimorar minhas habilidades e
            aprender novas, conforme necessário. Atualmente, minhas principais
            competências incluem:
          </CardDescription>
        </div>
        <CardContent className="flex flex-col md:flex-row justify-between gap-8">
          <div className="w-full md:w-1/2 h-min flex flex-wrap justify-start gap-y-5">
            <p className="text-sm lg:text-2xl font-sans w-full">Hard Skills</p>
            <div className="h-full flex flex-wrap gap-3">
              {hardSkills.map((skill) => (
                <Button variant={"outline"} size={"lg"} className="uppercase dark:border-primary">
                  {skill}
                </Button>
              ))}
            </div>
          </div>
          <div className="w-full md:w-1/2 h-min flex flex-wrap gap-x-3 gap-y-5">
            <p className="text-sm lg:text-2xl font-sans w-full">Soft Skills</p>
            <div className="h-full flex flex-wrap gap-3">
              {softSkills.map((skill) => (
                <Button variant={"outline"} size={"lg"} className="uppercase dark:border-primary">
                  {skill}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </SectionWrapper>
  );
}
