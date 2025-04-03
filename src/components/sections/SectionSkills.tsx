import { CardContent } from "@mui/material";
import SectionWrapper from "../SectionWrapper";
import { Card, CardDescription, CardTitle } from "../ui/card";
import SkillButton from "../SkillButton";
import { hardSkills, softSkills } from "@/utils/lists/skills";

export default function SectionSkills() {
  return (
    <SectionWrapper id="skills">
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
              {hardSkills.map((skill, index) => (
                <SkillButton
                  key={index}
                  titleSkill={skill.titleSkill}
                  levelSkill={skill.levelSkill}
                  descriptionSkill={skill.descriptionSkill}
                />
              ))}
            </div>
          </div>
          <div className="w-full md:w-1/2 h-min flex flex-wrap gap-x-3 gap-y-5">
            <p className="text-sm lg:text-2xl font-sans w-full">Soft Skills</p>
            <div className="h-full flex flex-wrap gap-3">
              {softSkills.map((skill, index) => (
                <SkillButton
                  key={index}
                  titleSkill={skill.titleSkill}
                  levelSkill={skill.levelSkill}
                  descriptionSkill={skill.descriptionSkill}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </SectionWrapper>
  );
}
