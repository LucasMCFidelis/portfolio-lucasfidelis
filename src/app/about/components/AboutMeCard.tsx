"use client";

import { SocialMediasButtons } from "@/components/SocialMediasButtons";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGlobalContent } from "@/data/globalContent/useGlobalContent";

import DownloadResumeButton from "./DownloadResumeButton";

export default function AboutMeCard() {
  const { data } = useGlobalContent();

  return (
    <Card className="bg-transparent border-none w-full lg:w-3/5">
      <CardHeader>
        <CardTitle className="text-sm lg:text-2xl font-sans">
          {data?.aboutCurtDescription}
        </CardTitle>
        <div className="flex flex-col gap-2">
          {data?.aboutLargeDescription.map((paragraph) => (
            <CardDescription key={paragraph}>{paragraph}</CardDescription>
          ))}
        </div>
      </CardHeader>
      <CardFooter className="max-w-full flex flex-wrap justify-start items-center gap-4">
        <DownloadResumeButton fileId={data?.fileResumeId ?? ""} />
        <SocialMediasButtons />
      </CardFooter>
    </Card>
  );
}
