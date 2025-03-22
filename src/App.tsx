import Header from "./components/Header";
import SectionAboutMe from "./components/sections/SectionAboutMe";
import SectionContact from "./components/sections/SectionContact";
import SectionHome from "./components/sections/SectionHome";
import SectionProjects from "./components/sections/SectionProjects";
import { Separator } from "./components/ui/separator";

function App() {
  return (
    <div className="max-w-screen flex flex-col items-center md:gap-20 container-padding ">
      <Header />
      <SectionHome />
      <Separator />
      <SectionProjects />
      <Separator />
      <SectionAboutMe />
      <Separator />
      <SectionContact />
    </div>
  );
}

export default App;
