import Header from "./components/Header";
import SectionContact from "./components/sections/SectionContact";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./components/AppRoutes";
import { Separator } from "./components/ui/separator";

function App() {
  return (
    <div className="max-w-screen flex flex-col items-center gap-10 md:gap-20 container-padding mb-[8vh] md:mb-[15vh] ">
      <BrowserRouter>
        <Header />
        <AppRoutes />
      </BrowserRouter>
      <Separator />
      <SectionContact />
    </div>
  );
}

export default App;
