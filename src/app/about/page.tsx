import { Metadata } from "next";
import Image from "next/image";

import image from "@/assets/undraw_profile.svg";
import SectionSkills from "@/components/sections/SectionSkills";
import SectionWrapper from "@/components/SectionWrapper";
import { SocialMediasButtons } from "@/components/SocialMediasButtons";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getGlobalContent } from "@/data/globalContent/getGlobalContent";
import { appSections } from "@/utils/lists/appSections";

import DownloadResumeButton from "./components/DownloadResumeButton";

export const metadata: Metadata = {
  title: "Sobre Mim - Portfólio de Lucas Fidelis",
  description:
    "Conheça mais sobre Lucas Fidelis — desenvolvedor focado em soluções web modernas. Saiba sobre sua trajetória, principais habilidades técnicas e comportamentais, experiências e formas de contato.",
};

export default async function AboutMePage() {
  const { aboutCurtDescription, aboutLargeDescription, fileResumeId } =
    await getGlobalContent();

  return (
    <>
      <SectionWrapper id={appSections.about.id} className="lg:flex-col">
        <div className="flex flex-col lg:flex-row w-full lg:justify-between">
          <h2>Sobre mim</h2>

          <Card className="bg-transparent border-none w-full lg:w-3/5">
            <CardHeader>
              <CardTitle className="text-sm lg:text-2xl font-sans">
                {aboutCurtDescription}
              </CardTitle>
              <CardDescription
                dangerouslySetInnerHTML={{ __html: aboutLargeDescription }}
              />
            </CardHeader>
            <CardFooter className="max-w-full flex flex-wrap justify-start items-center gap-4">
              <DownloadResumeButton fileId={fileResumeId} />
              <SocialMediasButtons />
            </CardFooter>
          </Card>
        </div>
        <Image
          src={image}
          alt=""
          className="w-full md:max-h-96 object-contain py-4"
        />
      </SectionWrapper>
      <SectionSkills />
    </>
  );
}
