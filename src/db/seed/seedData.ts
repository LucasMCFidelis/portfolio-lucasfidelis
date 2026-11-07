import type {
  experiencesTable,
  globalContentTable,
  projectsTable,
  skillsTable,
  socialMediasTable,
} from "../schema";

// Conteúdo fictício usado para popular bancos de desenvolvimento/CI.
// Skills, imagens e repositórios são ligados aos projetos/experiências pelo título.

type NewSkill = typeof skillsTable.$inferInsert;
type NewProject = typeof projectsTable.$inferInsert;
type NewExperience = typeof experiencesTable.$inferInsert;

export const globalContentSeed: typeof globalContentTable.$inferInsert = {
  aboutCurtDescription:
    "Analista de QA e desenvolvedor front-end. Conteúdo gerado pelo seed do banco.",
  aboutLargeDescription: [
    "Este texto vem do seed do banco de dados e serve para desenvolvimento e testes.",
    "Atuo com qualidade de software, automação de testes e desenvolvimento de interfaces.",
    "Gosto de transformar requisitos em cenários de teste claros e reproduzíveis.",
  ],
  // ID fictício: o currículo aparece como "indisponível" (arquivo inexistente no Drive).
  fileResumeId: "seed-resume-file-id",
};

export const socialMediasSeed: Array<typeof socialMediasTable.$inferInsert> = [
  { title: "GitHub", url: "https://github.com/LucasMCFidelis" },
  { title: "LinkedIn", url: "https://www.linkedin.com/" },
];

export const skillsSeed: Array<NewSkill> = [
  { titleSkill: "Cypress", typeSkill: "hard" },
  { titleSkill: "Playwright", typeSkill: "hard" },
  { titleSkill: "Jest", typeSkill: "hard" },
  { titleSkill: "React", typeSkill: "hard" },
  { titleSkill: "Next.js", typeSkill: "hard" },
  { titleSkill: "TypeScript", typeSkill: "hard" },
  { titleSkill: "PostgreSQL", typeSkill: "hard" },
  { titleSkill: "Postman", typeSkill: "hard", skillInEvidence: false },
  { titleSkill: "Comunicação", typeSkill: "soft" },
  { titleSkill: "Trabalho em equipe", typeSkill: "soft" },
  { titleSkill: "Pensamento crítico", typeSkill: "soft" },
];

interface ProjectSeed extends NewProject {
  title: string;
  skills: Array<string>;
  images: Array<{ title: string; url: string; mobileScreen?: boolean }>;
  repositories: Array<{ repositoryTitle?: string; repositoryUrl: string }>;
}

export const projectsSeed: Array<ProjectSeed> = [
  {
    title: "Portfólio",
    description: "Portfólio pessoal com conteúdo vindo de um banco PostgreSQL.",
    yearDevelopment: 2025,
    typeProject: "frontend",
    deploymentUrl: "https://portfolio-lucasfidelis.vercel.app",
    projectInEvidence: true,
    skills: ["Next.js", "React", "TypeScript", "PostgreSQL", "Jest", "Playwright"],
    // Imagens locais (public/): não dependem de domínio remoto em `remotePatterns`.
    images: [{ title: "Logo do portfólio", url: "/icon.svg" }],
    repositories: [
      { repositoryUrl: "https://github.com/LucasMCFidelis/portfolio-lucasfidelis" },
    ],
  },
  {
    title: "Automação de testes E2E",
    description: "Suíte de testes end-to-end de uma aplicação web de exemplo.",
    yearDevelopment: 2024,
    typeProject: "qa",
    documentationUrl: "https://docs.cypress.io",
    projectInEvidence: true,
    skills: ["Cypress", "TypeScript"],
    images: [{ title: "Ícone do projeto", url: "/icon.svg" }],
    repositories: [
      { repositoryTitle: "Testes", repositoryUrl: "https://github.com/LucasMCFidelis" },
    ],
  },
  {
    title: "API de tarefas",
    description: "Coleção de testes de API para um serviço de tarefas.",
    yearDevelopment: 2023,
    typeProject: "backend",
    skills: ["Postman"],
    images: [],
    repositories: [],
  },
  {
    title: "Projeto oculto",
    description: "Não deve aparecer na interface (visible = false).",
    yearDevelopment: 2022,
    visible: false,
    skills: [],
    images: [],
    repositories: [],
  },
];

interface ExperienceSeed extends NewExperience {
  skills: Array<string>;
}

export const experiencesSeed: Array<ExperienceSeed> = [
  {
    title: "Analista de QA",
    company: "Empresa Exemplo",
    description: [
      "Planejamento e execução de testes manuais.",
      "Automação de testes E2E com Cypress e Playwright.",
    ],
    startDate: "2025-01-06",
    category: "professional",
    type: "full-time",
    experienceInEvidence: true,
    skills: ["Cypress", "Playwright", "Comunicação"],
  },
  {
    title: "Desenvolvedor Front-end",
    company: "Projeto Voluntário",
    description: ["Desenvolvimento de interfaces com React e TypeScript."],
    startDate: "2023-03-01",
    endDate: "2024-06-30",
    category: "professional",
    type: "volunteer",
    skills: ["React", "TypeScript", "Trabalho em equipe"],
  },
  {
    title: "Análise e Desenvolvimento de Sistemas",
    company: "Instituição Exemplo",
    description: ["Graduação tecnológica."],
    startDate: "2021-02-01",
    endDate: "2024-12-20",
    category: "academic",
    type: "degree",
    experienceInEvidence: true,
    skills: ["PostgreSQL"],
  },
  {
    title: "Bootcamp de Testes Automatizados",
    company: "Escola Exemplo",
    description: ["Formação prática em automação de testes."],
    startDate: "2024-02-01",
    endDate: "2024-05-31",
    category: "academic",
    type: "bootcamp",
    skills: ["Cypress", "Jest"],
  },
];
