import { Button } from "../ui/button";

export function SkillButton({ titleSkill }: { titleSkill: string }) {
  return (
    <Button
      id={`skill-button-${titleSkill.toLowerCase()}`}
      aria-label={`Habilidade ${titleSkill}`}
      variant="outline"
      size="lg"
      className="uppercase dark:border-primary"
    >
      {titleSkill}
    </Button>
  );
}
