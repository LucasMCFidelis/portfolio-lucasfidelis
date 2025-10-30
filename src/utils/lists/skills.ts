import { SkillDTO } from "@/data/skills/skillDTO";

export const hardSkills: Omit<SkillDTO, "typeSkill">[] = [
  {
    titleSkill: "html",
    levelSkill: 4,
    descriptionSkill:
      "Boa compreensão da estrutura semântica, acessibilidade e SEO on-page.",
  },
  {
    titleSkill: "css",
    levelSkill: 4,
    descriptionSkill:
      "Domínio de estilização com CSS puro e experiência avançada com Tailwind CSS.",
  },
  {
    titleSkill: "javascript",
    levelSkill: 4.5,
    descriptionSkill:
      "Sólido conhecimento em ES6+, manipulação do DOM, async/await e consumo de APIs.",
  },
  {
    titleSkill: "typescript",
    levelSkill: 3.5,
    descriptionSkill:
      "Experiência prática com tipagem estática, interfaces e utility types, aprimorando generics e mapeamento de tipos.",
  },
  {
    titleSkill: "react",
    levelSkill: 4,
    descriptionSkill:
      "Desenvolvimento de componentes reutilizáveis, gerenciamento de estado (useState, useReducer, Context API) e otimizações de renderização.",
  },
  {
    titleSkill: "tailwind css",
    levelSkill: 4.5,
    descriptionSkill:
      "Uso avançado com customizações, design tokens e integração otimizada com React.",
  },
  {
    titleSkill: "git",
    levelSkill: 4,
    descriptionSkill:
      "Gerenciamento de versionamento, branches, merges e colaboração em equipe usando Git.",
  },
  {
    titleSkill: "github",
    levelSkill: 4,
    descriptionSkill:
      "Experiência com GitHub Actions, controle de versionamento e boas práticas em repositórios.",
  },
  {
    titleSkill: "figma",
    levelSkill: 3.5,
    descriptionSkill:
      "Capacidade de transformar designs em código, respeitando espaçamentos e hierarquia visual.",
  },
  {
    titleSkill: "cypress",
    levelSkill: 3.5,
    descriptionSkill:
      "Criação de testes end-to-end para validação de fluxos, aprimorando mocks e testes de integração.",
  },
  {
    titleSkill: "node.js",
    levelSkill: 4,
    descriptionSkill:
      "Desenvolvimento de APIs REST, integração com banco de dados e autenticação.",
  },
  {
    titleSkill: "fastify",
    levelSkill: 4.5,
    descriptionSkill:
      "Desenvolvimento de APIs performáticas em microserviços, uso de plugins, validação de dados e otimização de resposta.",
  },
  {
    titleSkill: "prisma orm",
    levelSkill: 3.5,
    descriptionSkill:
      "Uso para CRUD, migrations e gerenciamento de banco de dados, aprimorando otimização de queries e relacionamentos avançados.",
  },
];

export const softSkills: Omit<SkillDTO, "typeSkill">[] = [
  {
    titleSkill: "Adaptabilidade",
    levelSkill: 4,
    descriptionSkill:
      "Capacidade de aprender rapidamente novas tecnologias e se ajustar a diferentes contextos.",
  },
  {
    titleSkill: "Proatividade",
    levelSkill: 4,
    descriptionSkill:
      "Busca ativa por soluções eficientes e melhorias contínuas nos projetos.",
  },
  {
    titleSkill: "Organização",
    levelSkill: 4,
    descriptionSkill:
      "Boa gestão de tarefas, código versionado e processos documentados.",
  },
  {
    titleSkill: "Comunicação",
    levelSkill: 4,
    descriptionSkill:
      "Clareza na documentação e colaboração eficaz em equipe técnica.",
  },
  {
    titleSkill: "Aprendizado Contínuo",
    levelSkill: 5,
    descriptionSkill:
      "Compromisso com estudos, atualizações e aprimoramento profissional constante.",
  },
  {
    titleSkill: "Comprometimento",
    levelSkill: 5,
    descriptionSkill:
      "Foco na entrega eficiente, qualidade de código e responsabilidade com prazos.",
  },
];
