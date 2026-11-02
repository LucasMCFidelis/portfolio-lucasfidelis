"use client";

import Link from "next/link";
import { useEffect } from "react";

import { Icon } from "@/components/IconWrapper";
import SectionWrapper from "@/components/SectionWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { appSections } from "@/utils/lists/appSections";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/** Rede de segurança: um erro inesperado na página não derruba o layout. */
export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <SectionWrapper
      id="page-error"
      className="min-h-0 items-center text-center gap-4 py-10 md:py-16"
    >
      <span className="text-sm font-semibold tracking-widest text-muted-foreground">
        ALGO DEU ERRADO
      </span>
      <h1 className="text-2xl md:text-4xl xl:text-5xl">
        Não foi possível carregar esta página
      </h1>
      <p className="max-w-md text-muted-foreground">
        Pode ser uma instabilidade temporária. Tente novamente em instantes.
      </p>
      <div className="mt-2 flex flex-wrap justify-center gap-3">
        <Button
          id="retry-page"
          aria-label="Tentar carregar a página novamente"
          onClick={reset}
        >
          Tentar novamente
        </Button>
        <Link
          href={appSections.home.href}
          id="error-redirect-to-home"
          aria-label="Voltar para a página inicial"
          className={buttonVariants({ variant: "outline" })}
        >
          <Icon name="ArrowBack" />
          Voltar ao início
        </Link>
      </div>
    </SectionWrapper>
  );
}
