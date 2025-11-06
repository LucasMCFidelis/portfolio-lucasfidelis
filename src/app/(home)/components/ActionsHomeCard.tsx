"use client";

import { ReactNode } from "react";

import { Icon } from "@/components/IconWrapper";
import { Button } from "@/components/ui/button";
import { scrollToContactSession } from "@/utils/scrollToContactSession";

export default function ActionsHomeCard({
  children,
}: {
  children?: ReactNode;
}) {
  return (
    <>
      <Button name="contact" onClick={scrollToContactSession}>
        CONTATE-ME
        <Icon name="ContactArrow" />
      </Button>
      {children}
    </>
  );
}
