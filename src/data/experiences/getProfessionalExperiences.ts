export type ProfessionalExperienceType = "professional";

export type ProfessionalExperience = {
  title: string;
  company: string;
  startDate: string;
  endDate?: string;
  description: string;
  technologies: string[];
  type: ProfessionalExperienceType;
  typeComplement:
    | "full-time"
    | "part-time"
    | "volunteer"
    | "contract"
    | "freelance"
    | "internship";
};

export async function getProfessionalExperiences(): Promise<
  Array<ProfessionalExperience>
> {
  // Substitua com seus dados reais de experiência
  const experiences: ProfessionalExperience[] = [
    {
      title: "Analista de Testes (QA)",
      company: "Rota Financeira",
      startDate: "Mar 2026",
      // endDate deixado undefined = "Atualmente"
      description:
        "Suporte à qualidade do sistema em ambiente ágil com Scrum, realizando execução de testes exploratórios e validação de funcionalidades. Registro, gestão e reporte de bugs no ClickUp com detalhamento de evidências para apoio à resolução pelos desenvolvedores. Escrita de critérios de aceite em Gherkin.",
      technologies: ["Scrum", "ClickUp", "Gherkin", "Testes Exploratórios"],
      type: "professional",
      typeComplement: "volunteer",
    },
    {
      title: "Analista de QA",
      company: "Pipoca Ágil",
      startDate: "Jan 2026",
      // endDate deixado undefined = "Atualmente"
      description:
        "Atuação em projeto de desenvolvimento do MVP Ethos (Plataforma de Decisões Éticas) em ciclo intensivo de 5 sprints. Participação em Lean Inception, definição de cenários de teste e critérios de aceite desde as etapas iniciais. Documentação estruturada de 54 casos em 8 suites (Qase), criação de collection Postman com 32 requests de API e testes manuais de interface (E2E), responsividade e usabilidade. Atuação também como desenvolvedor para garantir testabilidade e entrega no prazo.",
      technologies: [
        "Qase",
        "Postman",
        "Scrum",
        "Lean Inception",
        "E2E Testing",
      ],
      type: "professional",
      typeComplement: "volunteer",
    },
    {
      title: "Estagiário em Desenvolvimento de Sistemas",
      company: "Fundação Casa de José Américo",
      startDate: "Nov 2024",
      endDate: "Mai 2025",
      description:
        "Suporte técnico e modernização do sistema de gerenciamento da biblioteca, configurando e parametrizando o software Koha em ambiente virtualizado. Ajustes na interface OPAC, testes em ambientes virtualizados e implementação de rotinas de backup. Modelagem de banco de dados e desenvolvimento inicial de aplicativo desktop com Electron e JavaScript.",
      technologies: ["Koha", "Electron", "JavaScript", "Virtualização", "SQL"],
      type: "professional",
      typeComplement: "internship",
    },
  ];

  return experiences;
}
