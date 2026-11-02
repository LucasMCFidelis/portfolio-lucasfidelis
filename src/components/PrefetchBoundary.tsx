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

  // Uma query que falha (ex.: banco fora do ar) não derruba a página: ela fica
  // fora do cache hidratado, os componentes exibem a versão padrão/aviso e o
  // browser tenta buscar de novo após a hidratação.
  await Promise.all(
    queries.map((query) =>
      queryClient.query(query as QueryExecuteOptions).catch((error) => {
        // Só a mensagem: falhas de banco já foram detalhadas em `queryDb`.
        console.error(
          `[PrefetchBoundary] Falha ao buscar ${JSON.stringify(query.queryKey)}: ${
            error instanceof Error ? error.message : String(error)
          }`
        );
      })
    )
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
