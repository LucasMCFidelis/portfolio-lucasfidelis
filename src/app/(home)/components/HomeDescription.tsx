"use client";

import { CardDescription } from "@/components/ui/card";
import { useGlobalContent } from "@/data/globalContent/useGlobalContent";

export default function HomeDescription() {
  const { data } = useGlobalContent();

  return <CardDescription>{data?.aboutCurtDescription}</CardDescription>;
}
