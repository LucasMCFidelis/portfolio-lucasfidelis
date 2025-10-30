import { asc } from "drizzle-orm";
import { cache } from "react";

import { db } from "@/db";
import { globalContentTable } from "@/db/schema";

import { GlobalContentDTO } from "./globalContentDTO";

export const getGlobalContent = cache(async (): Promise<GlobalContentDTO> => {
  const allGlobalContent = await db.query.globalContentTable.findFirst({
    orderBy: asc(globalContentTable.createdAt),
  });

  return {
    aboutCurtDescription: allGlobalContent?.aboutCurtDescription || "",
    aboutLargeDescription: allGlobalContent?.aboutLargeDescription || "",
    fileResumeId: "",
  };
});
