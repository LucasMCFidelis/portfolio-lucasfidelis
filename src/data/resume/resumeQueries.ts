import { queryOptions } from "@tanstack/react-query";

import { getResumeAvailability } from "@/actions/resume/getResumeAvailability";
import { globalContentQueryOptions } from "@/data/globalContent/globalContentQueries";

/**
 * Disponibilidade do currículo no Google Drive. Depende do `fileResumeId` do
 * `global_content`, lido do mesmo QueryClient (`ensureQueryData`): assim a
 * query não precisa de argumentos, pode entrar no `PrefetchBoundary` ao lado de
 * `globalContentQueryOptions()` e não gera uma segunda consulta ao banco.
 */
export const resumeAvailabilityQueryOptions = () =>
  queryOptions({
    queryKey: ["resume-availability"],
    queryFn: async ({ client }) => {
      const { fileResumeId } = await client.ensureQueryData(
        globalContentQueryOptions()
      );

      return fileResumeId ? getResumeAvailability(fileResumeId) : false;
    },
  });
