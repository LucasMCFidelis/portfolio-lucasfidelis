import Link from "next/link";

import { getAllSocialMedias } from "@/data/socialMedias/getAllSocialMedias";

import { Icon, IconName } from "./IconWrapper";
import { buttonVariants } from "./ui/button";

export async function SocialMediasButtons() {
  const socialMedias = await getAllSocialMedias();
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
