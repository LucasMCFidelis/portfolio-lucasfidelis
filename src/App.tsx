import Header from "./components/Header";
import SectionContact from "./components/sections/SectionContact";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import AboutMe from "./pages/AbouteMe";

function App() {
  return (
    <div className="max-w-screen flex flex-col items-center md:gap-20 container-padding ">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/home" element={<HomePage />}></Route>
          <Route path="/about" element={<AboutMe />}></Route>
        </Routes>
      </BrowserRouter>
      <SectionContact />
    </div>
  );
}

export default App;
