import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import AboutMe from "./pages/AbouteMe";
import { appSections } from "./appSections"; 

export function AppRoutes() {
  return (
    <Routes>
      <Route path={appSections.home.href} element={<HomePage />} />
      <Route path={appSections.about.href} element={<AboutMe />} />
    </Routes>
  );
}
