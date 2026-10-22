"use client";

import { Slot } from "@radix-ui/react-slot";
import { ReactNode, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  /** Aplica a animação direto no filho (sem `div` extra), como no `asChild` do shadcn. */
  asChild?: boolean;
  /** Atraso da animação em ms (útil para cascata em listas). */
  delay?: number;
  className?: string;
}

/** Faz o conteúdo surgir de baixo quando entra na viewport (uma única vez). */
export default function Reveal({
  children,
  asChild = false,
  delay = 0,
  className,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      ref={ref}
      data-reveal
      className={cn(
        visible ? "animate-rise-in" : "opacity-0",
        "motion-reduce:animate-none motion-reduce:opacity-100",
        className
      )}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Comp>
  );
}
