"use client";

import { CardDescription } from "@/components/ui/card";
import { useGlobalContent } from "@/data/globalContent/useGlobalContent";

interface HomeDescriptionProps {
  className?: string;
}

export default function HomeDescription({ className }: HomeDescriptionProps) {
  const { data } = useGlobalContent();

  return (
    <CardDescription className={className}>
      {data?.aboutCurtDescription}
    </CardDescription>
  );
}
