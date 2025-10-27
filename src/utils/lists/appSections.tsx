type Section = {
  title: string;
  id: string;
  href?: string;
};

export const appSections: Record<string, Section> = {
  home: { 
    title: "Início", 
    id: "home", 
    href: "/" 
  },
  projects: {
    title: "Projetos",
    id: "projects",
    href: "/projects",
  },
  about: { title: "Sobre", 
    id: "about", 
    href: "/about" 
  },
  skills: {
    title: "Habilidades",
    id: "skills",
    href: "/skills",
  },
  contact: {
    title: "Contato",
    id: "contact",
  },
};
