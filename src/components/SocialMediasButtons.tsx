"use client";

import Link from "next/link";

import { useSocialMedias } from "@/data/socialMedias/useSocialMedias";

import { Icon, IconName } from "./IconWrapper";
import { buttonVariants } from "./ui/button";

export function SocialMediasButtons() {
  const { data: socialMedias = {} } = useSocialMedias();
  return (
    <>
      {Object.entries(socialMedias).map(({ 0: key, 1: data }) => (
        <Link
          key={key}
          id={data.title.toLowerCase()}
          href={data.url}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({
            variant: "secondary",
            size: "icon",
          })}
        >
          <Icon name={data.title as IconName} />
        </Link>
      ))}
    </>
  );
}
