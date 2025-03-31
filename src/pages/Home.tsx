import SectionAboutMe from "@/components/sections/SectionAboutMe";
import SectionHome from "@/components/sections/SectionHome";
import SectionProjects from "@/components/sections/SectionProjects";
import { Separator } from "@radix-ui/react-menubar";

export default function HomePage() {
  return (
    <>
      <SectionHome />
      <Separator />
      <SectionProjects />
      <Separator />
      <SectionAboutMe />
      <Separator />
    </>
  );
}
