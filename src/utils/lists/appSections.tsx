import SectionAboutMe from "@/components/sections/SectionAboutMe";
import SectionContact from "@/components/sections/SectionContact";
import SectionHome from "@/components/sections/SectionHome";
import SectionProjects from "@/components/sections/SectionProjects";
import SectionSkills from "@/components/sections/SectionSkills";

type Section = {
  title: string;
  id: string;
  sectionElement: React.ReactElement;
};

export const appSections: Record<string, Section> = {
  home: { title: "Início", id: "home", sectionElement: <SectionHome /> },
  projects: { title: "Projetos", id: "projects", sectionElement: <SectionProjects /> },
  about: { title: "Sobre", id: "about", sectionElement: <SectionAboutMe /> },
  skills: { title: "Habilidades", id: "skills", sectionElement: <SectionSkills /> },
  contact: { title: "Contato", id: "contact", sectionElement: <SectionContact /> },
};
