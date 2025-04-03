import Header from "./components/Header";
import SectionContact from "./components/sections/SectionContact";
import { Separator } from "./components/ui/separator";
import SectionAboutMe from "./components/sections/SectionAboutMe";
import SectionHome from "./components/sections/SectionHome";
import SectionProjects from "./components/sections/SectionProjects";
import SectionSkills from "./components/sections/SectionSkills";

function App() {
  return (
    <div className="max-w-screen flex flex-col items-center gap-10 md:gap-20 container-padding mb-[8vh] md:mb-[15vh] ">
      <Header />
      <SectionHome />
      <Separator />
      <SectionProjects />
      <Separator />
      <SectionAboutMe />
      <Separator />
      <SectionSkills />
      <Separator />
      <SectionContact />
    </div>
  );
}

export default App;
