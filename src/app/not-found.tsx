import { Metadata } from "next";
import Link from "next/link";

import { Icon } from "@/components/IconWrapper";
import SectionWrapper from "@/components/SectionWrapper";
import { buttonVariants } from "@/components/ui/button";
import { appSections } from "@/utils/lists/appSections";

export const metadata: Metadata = {
  title: "Página não encontrada",
  description:
    "A página que você procurou não existe ou foi movida. Volte ao início do portfólio de Lucas Fidelis.",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <SectionWrapper
      id="not-found"
      className="min-h-0 items-center text-center gap-4 py-10 md:py-16"
    >
      <span className="text-sm font-semibold tracking-widest text-muted-foreground animate-rise-in motion-reduce:animate-none">
        ERRO 404
      </span>
      <h1 className="text-2xl md:text-4xl xl:text-5xl animate-rise-in motion-reduce:animate-none [animation-delay:100ms]">
        Página não encontrada
      </h1>
      <p className="max-w-md text-muted-foreground animate-rise-in motion-reduce:animate-none [animation-delay:200ms]">
        O endereço acessado não existe ou foi movido.
      </p>
      <Link
        href={appSections.home.href}
        id="redirect-to-home"
        aria-label="Voltar para a página inicial"
        className={buttonVariants({
          className:
            "mt-2 animate-rise-in motion-reduce:animate-none [animation-delay:300ms]",
        })}
      >
        <Icon name="ArrowBack" />
        Voltar ao início
      </Link>
    </SectionWrapper>
  );
}
