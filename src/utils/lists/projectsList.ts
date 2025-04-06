import { ProjectCardProps } from "@/interfaces/ProjectCardProps";
import { allProjectsImages } from "../getAllProjectsImages";

const portfolioImages = Object.entries(allProjectsImages)
  .filter(([path]) => path.includes("/portfolio/"))
  .map(([, module]) => module as string);

const toDoListImages = Object.entries(allProjectsImages)
  .filter(([path]) => path.includes("/toDoList/"))
  .map(([, module]) => module as string);

const catalogBackEndImages = Object.entries(allProjectsImages)
  .filter(([path]) => path.includes("/catalogBackEnd/"))
  .map(([, module]) => module as string);

const positivusImages = Object.entries(allProjectsImages)
  .filter(([path]) => path.includes("/positivus/"))
  .map(([, module]) => module as string);

  const testsCypressImages = Object.entries(allProjectsImages)
  .filter(([path]) => path.includes("/testsCypress/"))
  .map(([, module]) => module as string);

export const projectsList: ProjectCardProps[] = [
  {
    title: "Backend do Catálogo de Eventos",
    description:
      "Conjunto de APIs desenvolvidas com arquitetura de microserviços utilizando Node.js e Fastify, garantindo alta performance e escalabilidade. O sistema é composto por microserviços independentes, incluindo Gerenciamento de Eventos, Gerenciamento e Autenticação de Usuários, e Envio de E-mails. A persistência de dados é feita com PostgreSQL e Prisma ORM, permitindo consultas eficientes e seguras. A autenticação é implementada com bcrypt, enquanto a validação de dados é realizada com Joi. Além disso, os serviços se comunicam de forma assíncrona, garantindo eficiência na troca de informações. Boas práticas, como padronização de respostas, logs detalhados e testes manuais no Postman, foram aplicadas para assegurar a confiabilidade do sistema.",
    year: 2024,
    area: "Backend",
    urlGitHub: [
      {
        name: "API Eventos",
        url: "https://github.com/LucasMCFidelis/event-service-eventsCatalog",
      },
      {
        name: "API Usuários",
        url: "https://github.com/LucasMCFidelis/user-service-eventsCatalog",
      },
      {
        name: "API Emails",
        url: "https://github.com/LucasMCFidelis/email-service-eventsCatalog-",
      },
      {
        name: "API Autenticação",
        url: "https://github.com/LucasMCFidelis/auth-service-eventsCatalog-",
      },
    ],
    images: catalogBackEndImages,
  },
  {
    title: "To Do List com Screen Themes",
    description:
      "Este projeto é uma To Do List e me permitiu aplicar meus conhecimentos em versionamento com Git e GitHub, além de desenvolver interfaces responsivas e dinâmicas com TypeScript, React e Tailwind.",
    year: 2024,
    area: "Frontend",
    urlGitHub: [{ url: "https://github.com/LucasMCFidelis/To-do-list" }],
    images: toDoListImages,
  },
  {
    title: "Positivus Landing Page",
    description:
      "Landing page para uma empresa fictícia de marketing digital, incluindo seções de serviços, processo de trabalho, equipe, entre outras. As principais tecnologias usadas neste projeto foram React.js, TypeScript e Tailwind CSS.",
    year: 2024,
    area: "Frontend",
    urlGitHub: [
      { url: "https://github.com/LucasMCFidelis/Positivus-Landing-Page" },
    ],
    images: positivusImages,
  },
  {
    title: "Portfólio",
    description:
      "Portfólio pessoal para exibir projetos e habilidades. A aplicação foi construída utilizando React, TypeScript e Tailwind CSS, garantindo uma estrutura robusta e responsiva. Alem disso foi implementada a biblioteca shadcn/ui, que oferece componentes personalizáveis e com foco na usabilidade e desempenho. O layout foi projetado para ser completamente responsivo, adaptando-se a diferentes tamanhos de tela e proporcionando uma experiência de navegação fluída e agradável.",
    year: 2025,
    area: "Frontend",
    urlGitHub: [
      { url: "https://github.com/LucasMCFidelis/portfolio-lucasfidelis" },
    ],
    images: portfolioImages,
  },
  {
    title: "Testes end to end usando Cypress",
    description:
      "Automatização de testes end-to-end com base nos requisitos do sistema, empregando Cypress em conjunto com o módulo “faker” para gerar dados fictícios e testar o processo de cadastro.",
    year: 2024,
    area: "Quality Assurance (QA)",
    urlGitHub: [
      { url: "https://github.com/LucasMCFidelis/Testes-golden-movie-studio" },
    ],
    images: testsCypressImages,
  },
];
