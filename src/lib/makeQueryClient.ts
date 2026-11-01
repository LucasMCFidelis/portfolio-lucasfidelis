import { isServer, QueryClient } from "@tanstack/react-query";

const STALE_TIME_MS = 5 * 60 * 1000;

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: STALE_TIME_MS,
        refetchOnWindowFocus: false,
        // No browser, uma nova tentativa basta: com o banco fora do ar, o
        // padrão (3, com backoff) só atrasa o aviso de indisponibilidade.
        retry: isServer ? false : 1,
      },
    },
  });
}
