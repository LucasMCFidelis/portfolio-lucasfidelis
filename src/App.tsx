import React from "react";
import Header from "./components/Header";
import { Separator } from "./components/ui/separator";
import { appSections } from "./utils/lists/appSections";

function App() {
  const sectionsArray = Object.values(appSections);

  return (
    <div className="max-w-screen flex flex-col items-center gap-10 md:gap-20 container-padding mb-[8vh] md:mb-[15vh] ">
      <Header/>
      {sectionsArray.map((section, index) => (
        <React.Fragment key={section.id}>
          {section.sectionElement}
          {index !== sectionsArray.length - 1 && <Separator />}
        </React.Fragment>
      ))}
    </div>
  );
}

export default App;
