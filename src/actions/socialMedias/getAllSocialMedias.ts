"use server";

import { asc } from "drizzle-orm";

import { SocialMediaDTO } from "@/data/socialMedias/socialMediaDTO";
import { db } from "@/db";
import { socialMediasTable } from "@/db/schema";

export async function getAllSocialMedias(): Promise<
  Record<string, SocialMediaDTO>
> {
  const allSocialMedias = await db.query.socialMediasTable.findMany({
    orderBy: asc(socialMediasTable.title),
  });

  return allSocialMedias.reduce<Record<string, SocialMediaDTO>>(
    (acc, media) => {
      acc[media.title.toLowerCase()] = media;
      return acc;
    },
    {}
  );
}
