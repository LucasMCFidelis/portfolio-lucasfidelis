import SectionAboutMe from "@/components/sections/SectionAboutMe";
import SectionSkills from "@/components/sections/SectionSkills";
import { Separator } from "@/components/ui/separator";

export default function AboutMe() {
  return (
    <>
      <SectionAboutMe />
      <Separator/>
      <SectionSkills/>
    </>
  );
}
