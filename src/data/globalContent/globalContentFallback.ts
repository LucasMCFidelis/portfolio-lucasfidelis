import { GlobalContentDTO } from "./globalContentDTO";

/**
 * Versão padrão exibida quando o banco está inacessível. É uma cópia estática
 * (baseada no currículo) e pode estar desatualizada em relação ao
 * `global_content` — a UI avisa isso ao usuário. Sem `fileResumeId`, o botão
 * de download do currículo é ocultado.
 */
export const GLOBAL_CONTENT_FALLBACK: GlobalContentDTO = {
  aboutCurtDescription:
    "Analista de Qualidade de Software (QA) com foco em testes manuais, testes de APIs e automação de testes web e mobile.",
  aboutLargeDescription: [
    "Sou Analista de QA, formado em Análise e Desenvolvimento de Sistemas pela UEPB, com experiência prática em testes manuais, funcionais, exploratórios e de regressão, testes de APIs e automação de testes web e mobile.",
    "Atuo desde a análise de requisitos e a definição de critérios de aceite até a validação das funcionalidades: mapeio e escrevo cenários de teste (fluxo principal, alternativos e de exceção), aplico técnicas como partição de equivalência e valor-limite, documento casos de teste com evidências e registro e acompanho defeitos.",
    "Na automação, desenvolvo e mantenho scripts com Cypress, Playwright e WebdriverIO/Appium em TypeScript, usando Page Object Model e cenários BDD em Cucumber/Gherkin, além de testes de APIs REST com Postman/Newman, integração das suítes em CI/CD com GitHub Actions e validação de dados com SQL em PostgreSQL.",
    "Trabalho em times ágeis (Scrum), em colaboração próxima com Desenvolvimento, Produto e UX, apoiando a melhoria contínua dos processos de teste e a priorização de riscos para entregas mais consistentes.",
  ],
  fileResumeId: "",
};
