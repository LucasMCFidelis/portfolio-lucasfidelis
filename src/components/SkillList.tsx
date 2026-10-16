import { SkillDTO } from "@/data/skills/skillDTO";

import { Badge } from "./ui/badge";

interface SkillListProps {
  skills: Array<Pick<SkillDTO, "titleSkill">>;
  label: string;
}

export default function SkillList({ skills, label }: SkillListProps) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-2">
      {skills.map(({ titleSkill }) => (
        <li key={titleSkill}>
          <Badge
            id={`skill-badge-${titleSkill.toLowerCase().replace(/\s+/g, "-")}`}
            variant="outline"
            className="px-3 py-1 text-sm dark:border-primary"
          >
            {titleSkill}
          </Badge>
        </li>
      ))}
    </ul>
  );
}
