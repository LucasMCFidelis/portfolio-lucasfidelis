import {
  dehydrate,
  HydrationBoundary,
  QueryExecuteOptions,
  QueryKey,
} from "@tanstack/react-query";
import { ReactNode } from "react";

import { getServerQueryClient } from "@/lib/getServerQueryClient";

interface PrefetchQuery {
  queryKey: QueryKey;
  queryFn?: (context: never) => unknown;
}

interface PrefetchBoundaryProps {
  queries: Array<PrefetchQuery>;
  children: ReactNode;
}

export default async function PrefetchBoundary({
  queries,
  children,
}: PrefetchBoundaryProps) {
  const queryClient = getServerQueryClient();

  await Promise.all(
    queries.map((query) =>
      queryClient.query(query as QueryExecuteOptions).catch(() => undefined)
    )
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
