import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SkillDTO } from "@/data/skills/skillDTO";

interface ExperienceCardProps {
  title: string;
  company: string;
  startDate: string;
  endDate?: string;
  description: string;
  skills: Array<SkillDTO>;
  type?: string;
}

const typeLabels: Record<string, string> = {
  "full-time": "Tempo integral",
  "part-time": "Meio período",
  volunteer: "Voluntário",
  contract: "Contrato",
  freelance: "Freelancer",
  internship: "Estágio",
};

export default function ExperienceCard({
  title,
  company,
  startDate,
  endDate,
  description,
  skills,
  type,
}: ExperienceCardProps) {
  const formattedEndDate = endDate || "Atualmente";

  return (
    <Card className="border-l-4 border-l-primary bg-card/50 hover:bg-card/80 transition-colors">
      <CardHeader className="pb-3">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="text-lg lg:text-xl">{title}</CardTitle>
            <CardDescription className="text-base font-semibold mt-1">
              {company}
            </CardDescription>
          </div>
          {type && typeLabels[type] && (
            <Badge variant="secondary" className="w-fit">
              {typeLabels[type]}
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          {startDate} — {formattedEndDate}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm md:text-base text-foreground/90 leading-relaxed">
          {description}
        </p>
        {skills.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {skills.map(({ titleSkill }) => (
              <Badge key={titleSkill} variant="outline" className="text-xs">
                {titleSkill}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
