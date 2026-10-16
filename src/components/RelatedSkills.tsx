import { Badge } from "@/components/ui/badge";
import { SkillDTO } from "@/data/skills/skillDTO";
import { cn } from "@/lib/utils";

interface RelatedSkillsProps {
  skills: Array<Pick<SkillDTO, "titleSkill">>;
  id?: string;
  className?: string;
}

/** Badges das skills relacionadas a uma experiência ou projeto. Não renderiza nada se a lista for vazia. */
export default function RelatedSkills({
  skills,
  id,
  className,
}: RelatedSkillsProps) {
  if (skills.length === 0) return null;

  return (
    <ul
      id={id}
      aria-label="Skills relacionadas"
      className={cn("flex flex-wrap gap-2", className)}
    >
      {skills.map(({ titleSkill }) => (
        <li key={titleSkill}>
          <Badge variant="outline" className="text-xs">
            {titleSkill}
          </Badge>
        </li>
      ))}
    </ul>
  );
}
