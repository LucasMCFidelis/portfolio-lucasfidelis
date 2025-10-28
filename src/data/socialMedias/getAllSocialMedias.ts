import { asc } from "drizzle-orm";
import { cache } from "react";

import { db } from "@/db";
import { socialMediasTable } from "@/db/schema";

import { SocialMediaDTO } from "./socialMediaDTO";

export const getAllSocialMedias = cache(
  async (): Promise<Record<string, SocialMediaDTO>> => {
    const allSocialMedias = await db.query.socialMediasTable.findMany({
      orderBy: asc(socialMediasTable.title),
    });

    const mappedSocialMedias = allSocialMedias.reduce<
      Record<string, SocialMediaDTO>
    >((acc, media) => {
      acc[media.title.toLowerCase()] = media;
      return acc;
    }, {});

    return mappedSocialMedias;
  }
);
