"use client";

import { FallbackNotice } from "@/components/FallbackNotice";
import { CardDescription } from "@/components/ui/card";
import { useGlobalContent } from "@/data/globalContent/useGlobalContent";

interface HomeDescriptionProps {
  className?: string;
}

export default function HomeDescription({ className }: HomeDescriptionProps) {
  const { data, isFallback } = useGlobalContent();

  return (
    <CardDescription className={className}>
      {data.aboutCurtDescription}
      {isFallback && <FallbackNotice className="mt-3" />}
    </CardDescription>
  );
}
