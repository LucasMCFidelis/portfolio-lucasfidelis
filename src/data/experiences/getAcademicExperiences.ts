export type AcademicExperienceType = "academic" | "bootcamp";

export type AcademicExperience = {
  title: string;
  company: string;
  startDate: string;
  endDate?: string;
  description: string;
  technologies: string[];
  type: AcademicExperienceType;
};

export async function getAcademicExperiences(): Promise<
  Array<AcademicExperience>
> {
  const experiences: AcademicExperience[] = [
    {
      title: "Análise e Desenvolvimento de Sistemas",
      company: "Universidade Estadual da Paraíba (UEPB)",
      startDate: "Ago 2023",
      endDate: "Jul 2025",
      description:
        "Formação superior com foco em desenvolvimento de software, com participação na turma pioneira do curso. Como trabalho de conclusão de curso, desenvolvi o backend de uma plataforma de catálogo de eventos utilizando arquitetura de microserviços.\n\nO projeto envolveu a criação de serviços independentes para usuários, autenticação, eventos e envio de e-mails, utilizando Node.js e Fastify. Implementei autenticação segura com JWT, validação de dados com Joi e integração com serviços externos para geração de mapas.\n\nAtuei também na garantia de qualidade do sistema, realizando testes manuais e automatizados de API com Postman e Cypress, além da criação de pipelines de CI/CD com GitHub Actions para execução de testes automatizados (incluindo smoke tests e regressão). O projeto teve foco em segurança, escalabilidade e organização de código, aplicando boas práticas de arquitetura e versionamento.",
      technologies: [
        "Node.js",
        "Fastify",
        "PostgreSQL",
        "Prisma ORM",
        "JWT",
        "Joi",
        "Postman",
        "Cypress",
        "Testes de API",
        "CI/CD",
        "GitHub Actions",
        "Microserviços",
        "Git",
      ],
      type: "academic",
    },
    {
      title: "FAST - Engenharia de Qualidade de Software",
      company: "CESAR School",
      startDate: "Out 2025",
      endDate: "Dez 2025",
      description:
        "Formação acelerada (80h) em Engenharia de Qualidade de Software, com foco na preparação para atuação em times ágeis e ambientes reais de desenvolvimento.\n\nAo longo do programa, apliquei conceitos fundamentais de QA em práticas como modelagem de cenários com BDD, automação de testes web com Selenium e testes de API com Postman, além da execução de testes de performance e integração de testes em pipelines de CI/CD.\n\nTambém explorei a atuação de QA em ambientes DevOps, entendendo o papel da qualidade ao longo de todo o ciclo de desenvolvimento, e tive contato com o uso de Inteligência Artificial aplicada a testes para otimização de processos.\n\nA formação foi complementada por mentorias de soft skills, reforçando comunicação, colaboração em equipe e pensamento crítico na análise de qualidade de software.",
      technologies: [
        "Selenium",
        "Postman",
        "Testes E2E",
        "Testes de API (REST)",
        "BDD",
        "Testes de Performance",
        "CI/CD",
        "DevOps",
      ],
      type: "bootcamp",
    },
    {
      title: "Avanti Bootcamp - Quality Assurance",
      company: "Instituto Atlântico",
      startDate: "Jun 2025",
      endDate: "Jul 2025",
      description:
        "Bootcamp prático (80h) focado em qualidade de software, com atuação em um projeto colaborativo utilizando o sistema OrangeHRM. Participei de todas as etapas do ciclo de QA, desde a análise exploratória até a automação de testes.\n\nAtuei na elaboração de artefatos essenciais de qualidade, incluindo Plano de Testes, Casos de Teste, Relatórios de Execução e Relatórios de Bugs, garantindo organização, rastreabilidade e clareza dos cenários.\n\nNa etapa de automação, implementei testes end-to-end utilizando Cypress e JavaScript, aplicando boas práticas como Page Object Model e uso do Faker para geração de dados dinâmicos. O projeto foi desenvolvido em equipe, exigindo adaptação a mudanças no time, organização das entregas e colaboração contínua até a finalização.",
      technologies: [
        "Cypress",
        "JavaScript",
        "Faker",
        "Testes E2E",
        "Testes de API",
        "BDD",
        "CI/CD",
        "Git",
      ],
      type: "bootcamp",
    },
  ];

  return experiences;
}
