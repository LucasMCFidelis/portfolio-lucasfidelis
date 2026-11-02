import { AcademicExperienceDTO } from "@/data/experiences/academicExperienceDTO";
import { ProfessionalExperienceDTO } from "@/data/experiences/professionalExperienceDTO";
import { GlobalContentDTO } from "@/data/globalContent/globalContentDTO";
import { ProjectDTO } from "@/data/projects/projectDTO";
import { SkillDTO } from "@/data/skills/skillDTO";
import { SocialMediaDTO } from "@/data/socialMedias/socialMediaDTO";

export const hardSkillsFixture: Array<SkillDTO> = [
  { titleSkill: "Cypress", typeSkill: "hard" },
  { titleSkill: "Playwright", typeSkill: "hard" },
];

export const softSkillsFixture: Array<SkillDTO> = [
  { titleSkill: "Comunicação", typeSkill: "soft" },
  { titleSkill: "Trabalho em equipe", typeSkill: "soft" },
];

export const academicExperiencesFixture: Array<AcademicExperienceDTO> = [
  {
    title: "Análise e Desenvolvimento de Sistemas",
    company: "UEPB",
    startDate: "Fev 2021",
    endDate: "Dez 2024",
    description: ["Graduação tecnológica."],
    skills: [],
    type: "academic",
    typeComplement: "degree",
  },
];

export const professionalExperiencesFixture: Array<ProfessionalExperienceDTO> =
  [
    {
      title: "Analista de QA",
      company: "Empresa X",
      startDate: "Jan 2025",
      description: ["Testes manuais.", "Automação com Cypress."],
      skills: [{ titleSkill: "Cypress", typeSkill: "hard" }],
      type: "professional",
      typeComplement: "full-time",
    },
  ];

export const projectFixture: ProjectDTO = {
  id: "project-1",
  title: "Portfólio",
  description: "Meu portfólio pessoal.",
  yearDevelopment: 2025,
  typeProject: "frontend",
  repositories: [
    { repositoryTitle: null, repositoryUrl: "https://github.com/x/portfolio" },
  ],
  deploymentUrl: "https://portfolio.example.com",
  documentationUrl: null,
  projectInEvidence: true,
  createdAt: null,
  images: [],
  skills: [{ titleSkill: "React", typeSkill: "hard" }],
};

export const globalContentFixture: GlobalContentDTO = {
  aboutCurtDescription: "Descrição curta vinda do banco.",
  aboutLargeDescription: ["Primeiro parágrafo.", "Segundo parágrafo."],
  fileResumeId: "resume-file-id",
};

export const socialMediasFixture: Record<string, SocialMediaDTO> = {
  github: {
    id: "1",
    title: "GitHub",
    url: "https://github.com/LucasMCFidelis",
    createdAt: null,
  },
  linkedin: {
    id: "2",
    title: "LinkedIn",
    url: "https://linkedin.com/in/lucas",
    createdAt: null,
  },
};
