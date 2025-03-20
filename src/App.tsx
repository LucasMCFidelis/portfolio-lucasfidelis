import Header from "./components/Header";
import SectionHome from "./components/SectionHome";

import SectionProjects from "./components/SectionProjects";
import { Separator } from "./components/ui/separator";

function App() {
  return (
    <div className="max-w-screen flex flex-col items-center gap-10 sm:gap-20 container-padding ">
      <Header />
      <SectionHome />
      <Separator />
      <SectionProjects />
    </div>
  );
}

export default App;
