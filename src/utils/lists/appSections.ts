type Section = {
  title: string;
  id?: string;
  href?: string;
};

export const appSections: Record<string, Section> = {
  home: { title: "Início", href: "/home", id: "home" },
  projects: { title: "Projetos", href: "/home", id: "projects" },
  about: { title: "Sobre", href: "/about", id: "about" },
  contact: { title: "Contato", id: "contact" },
};
