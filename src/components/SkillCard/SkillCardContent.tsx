import { Star, StarBorder } from "@mui/icons-material";
import { Rating } from "@mui/material";

import { SkillDTO } from "@/data/skills/skillDTO";

export function SkillCardContent({
  titleSkill,
  levelSkill,
  descriptionSkill,
}: Omit<SkillDTO, "typeSkill">) {
  return (
    <div id={`skill-card-content-${titleSkill.toLowerCase()}`}>
      <h4 className="font-sans font-semibold capitalize">{titleSkill}</h4>
      <Rating
        value={levelSkill}
        precision={0.5}
        readOnly
        max={5}
        icon={<Star fontSize="inherit" className="text-primary" />}
        emptyIcon={
          <StarBorder fontSize="inherit" className="text-muted-foreground" />
        }
      />
      <p>{descriptionSkill}</p>
    </div>
  );
}
