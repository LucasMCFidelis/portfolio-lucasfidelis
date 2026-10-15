"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

import { makeQueryClient } from "@/lib/makeQueryClient";

export function QueryProvider({ children }: { children: ReactNode }) {
  // useState (e não uma variável de módulo) garante um client por sessão de
  // browser e evita recriá-lo se o React suspender durante a renderização.
  const [queryClient] = useState(makeQueryClient);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
