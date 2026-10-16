"use server";

import { asc } from "drizzle-orm";

import { GlobalContentDTO } from "@/data/globalContent/globalContentDTO";
import { db } from "@/db";
import { globalContentTable } from "@/db/schema";

export async function getGlobalContent(): Promise<GlobalContentDTO> {
  const allGlobalContent = await db.query.globalContentTable.findFirst({
    orderBy: asc(globalContentTable.createdAt),
  });

  return {
    aboutCurtDescription: allGlobalContent?.aboutCurtDescription || "",
    aboutLargeDescription: allGlobalContent?.aboutLargeDescription || "",
    fileResumeId: allGlobalContent?.fileResumeId || "",
  };
}
