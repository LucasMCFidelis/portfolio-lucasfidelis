import { Separator } from "@/components/ui/separator";
import { appSections } from "@/utils/lists/appSections";
import React from "react";

export default function Page() {
  const sectionsArray = Object.values(appSections);

  return (
    <>
      {sectionsArray.map((section, index) => (
        <React.Fragment key={section.id}>
          {section.sectionElement}
          {index !== sectionsArray.length - 1 && <Separator />}
        </React.Fragment>
      ))}
    </>
  );
}
