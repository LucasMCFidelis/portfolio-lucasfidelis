"use client";

import { Icon } from "@/components/IconWrapper";
import { Button } from "@/components/ui/button";
import { scrollToContactSession } from "@/utils/scrollToContactSession";

export default function ActionsHomeCard() {
  return (
    <>
      <Button onClick={scrollToContactSession}>
        CONTATE-ME
        <Icon name="ContactArrow" />
      </Button>
      <a
        href="https://www.linkedin.com/in/lucas-fidelis-778705149"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button size="icon" variant="secondary">
          <Icon name="LinkedIn" />
        </Button>
      </a>
      <a
        href="https://github.com/LucasMCFidelis"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button size="icon" variant="secondary">
          <Icon name="GitHub" />
        </Button>
      </a>
    </>
  );
}
