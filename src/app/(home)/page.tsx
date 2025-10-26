import Image from "next/image";

import SectionWrapper from "@/components/SectionWrapper";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { appSections } from "@/utils/lists/appSections";

import ActionsHomeCard from "./components/ActionsHomeCard";

export default function HomePage() {
  return (
    <SectionWrapper
      id={appSections.home.id}
      className="sm:items-center sm:flex-row-reverse sm:justify-between gap-5"
    >
      <div className="relative w-full max-w-sm self-center h-[60vh] sm:h-[40vh] sm:w-[30vh] lg:h-[65vh] lg:w-[55vh] rounded-2xl">
        <Image
          src={"/profile-1.jpg"}
          alt="Foto Lucas"
          fill
          className="object-cover object-top rounded-2xl"
        />
      </div>
      <Card className="w-full md:max-w-xl flex flex-col md:flex-1 gap-y-5 bg-transparent border-none">
        <CardHeader>
          <CardTitle>
            <h1>
              Olá, eu sou
              <br className="hidden md:inline" /> Lucas Fidelis
            </h1>
          </CardTitle>
          <CardDescription>
            Estudante de Análise e Desenvolvimento de Sistemas e futuro
            desenvolvedor de frontend.
          </CardDescription>
        </CardHeader>
        <CardAction className="flex justify-start items-center gap-4 px-5">
          <ActionsHomeCard />
        </CardAction>
      </Card>
    </SectionWrapper>
  );
}
