"use client";

import { ReactNode, useEffect, useState } from "react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface SkillCardWrapperProps {
  skillButtonElement: ReactNode;
  skillCardContentElement: ReactNode;
}

export default function SkillCardWrapper({
  skillButtonElement,
  skillCardContentElement,
}: SkillCardWrapperProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  return isMobile ? (
    <Popover>
      <PopoverTrigger asChild>{skillButtonElement}</PopoverTrigger>
      <PopoverContent>{skillCardContentElement}</PopoverContent>
    </Popover>
  ) : (
    <HoverCard openDelay={100} closeDelay={300}>
      <HoverCardTrigger asChild>{skillButtonElement}</HoverCardTrigger>
      <HoverCardContent>{skillCardContentElement}</HoverCardContent>
    </HoverCard>
  );
}
