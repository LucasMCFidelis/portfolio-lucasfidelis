"use client";

import { FallbackNotice } from "@/components/FallbackNotice";
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
  const { data, isFallback } = useGlobalContent();

  return (
    <Card className="bg-transparent border-none w-full lg:w-3/5 animate-rise-in motion-reduce:animate-none [animation-delay:100ms]">
      <CardHeader>
        <CardTitle className="text-sm lg:text-2xl font-sans">
          {data.aboutCurtDescription}
        </CardTitle>
        <div className="flex flex-col gap-2">
          {data.aboutLargeDescription.map((paragraph) => (
            <CardDescription key={paragraph}>{paragraph}</CardDescription>
          ))}
        </div>
        {isFallback && <FallbackNotice className="mt-2" />}
      </CardHeader>
      <CardFooter className="max-w-full flex flex-wrap justify-start items-center gap-4">
        {data.fileResumeId && <DownloadResumeButton fileId={data.fileResumeId} />}
        <SocialMediasButtons />
      </CardFooter>
    </Card>
  );
}
