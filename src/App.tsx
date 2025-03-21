import Header from "./components/Header";
import SectionAboutMe from "./components/SectionAboutMe";
import SectionHome from "./components/SectionHome";
import SectionProjects from "./components/SectionProjects";
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
    </div>
  );
}

export default App;
