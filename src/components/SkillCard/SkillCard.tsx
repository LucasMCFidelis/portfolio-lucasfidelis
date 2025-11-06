import { SkillDTO } from "@/data/skills/skillDTO";

import { SkillButton } from "./SkillButton";
import { SkillCardContent } from "./SkillCardContent";
import SkillCardWrapper from "./SkillCardWrapper";

export default function SkillCard({
  titleSkill,
  levelSkill,
  descriptionSkill,
}: Omit<SkillDTO, "typeSkill">) {
  return (
    <SkillCardWrapper
      skillButtonElement={<SkillButton titleSkill={titleSkill} />}
      skillCardContentElement={
        <SkillCardContent
          titleSkill={titleSkill}
          levelSkill={levelSkill}
          descriptionSkill={descriptionSkill}
        />
      }
    />
  );
}
