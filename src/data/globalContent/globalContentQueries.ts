import { queryOptions } from "@tanstack/react-query";

import { getGlobalContent } from "@/actions/globalContent/getGlobalContent";

export const globalContentQueryOptions = () =>
  queryOptions({
    queryKey: ["global-content"],
    queryFn: () => getGlobalContent(),
  });
