import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/Home";
import AboutMe from "../pages/AbouteMe";
import { appSections } from "../utils/lists/appSections"; 

export function AppRoutes() {
  return (
    <Routes>
      <Route path={"/"} element={<Navigate to={appSections.home.href ?? "/home"} replace/>}  />
      <Route path={appSections.home.href} element={<HomePage />} />
      <Route path={appSections.about.href} element={<AboutMe />} />
    </Routes>
  );
}
