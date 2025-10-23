"use client"

import { Star, StarBorder } from "@mui/icons-material";
import { Rating } from "@mui/material";
import { useEffect,useState } from "react";

import { SkillInterface } from "@/interfaces/SkillInterface";

import { Button } from "./ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

function CardSkillContent({
  titleSkill,
  levelSkill,
  descriptionSkill,
}: SkillInterface) {
  return (
    <>
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
    </>
  );
}

export default function SkillButton({
  titleSkill,
  levelSkill,
  descriptionSkill,
}: SkillInterface) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  return isMobile ? (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="uppercase dark:border-primary"
        >
          {titleSkill}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <CardSkillContent
          titleSkill={titleSkill}
          levelSkill={levelSkill}
          descriptionSkill={descriptionSkill}
        />
      </PopoverContent>
    </Popover>
  ) : (
    <HoverCard openDelay={100} closeDelay={300}>
      <HoverCardTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="uppercase dark:border-primary"
        >
          {titleSkill}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <CardSkillContent
          titleSkill={titleSkill}
          levelSkill={levelSkill}
          descriptionSkill={descriptionSkill}
        />
      </HoverCardContent>
    </HoverCard>
  );
}
