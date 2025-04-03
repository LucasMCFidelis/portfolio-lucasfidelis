type Section = {
  title: string;
  id: string;
};

export const appSections: Record<string, Section> = {
  home: { title: "Início", id: "home" },
  projects: { title: "Projetos", id: "projects" },
  about: { title: "Sobre", id: "about" },
  contact: { title: "Contato", id: "contact" },
  skills: { title: "Habilidades", id: "skills" },
};
