import Header from "./components/Header";
import SectionContact from "./components/sections/SectionContact";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";

function App() {
  return (
    <div className="max-w-screen flex flex-col items-center md:gap-20 container-padding md:mb-[15vh] ">
      <BrowserRouter>
        <Header />
        <AppRoutes/>
      </BrowserRouter>
      <SectionContact />
    </div>
  );
}

export default App;
