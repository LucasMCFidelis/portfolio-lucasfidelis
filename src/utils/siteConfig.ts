import type { Metadata } from "next";

/** Dados de SEO do site (metadata, Open Graph, sitemap e JSON-LD). */
export const siteConfig = {
  name: "Portfólio de Lucas Fidelis",
  author: "Lucas Fidelis",
  jobTitle: "Analista de Qualidade de Software (QA)",
  description:
    "Portfólio de Lucas Fidelis, Analista de QA: testes manuais, funcionais e de regressão, testes de APIs e automação de testes web e mobile com Cypress, Playwright e Appium.",
  locale: "pt_BR",
  location: { city: "João Pessoa", region: "PB", country: "BR" },
  githubUrl: "https://github.com/LucasMCFidelis",
  ogImage: {
    url: "/profile.jpeg",
    width: 1200,
    height: 1600,
    alt: "Foto de Lucas Fidelis",
  },
  /** Competências (CV): entram nas keywords e no `knowsAbout` do JSON-LD. */
  expertise: [
    "Qualidade de Software",
    "Testes Manuais",
    "Testes Funcionais",
    "Testes de Regressão",
    "Testes de API",
    "Testes E2E",
    "Automação de Testes",
    "BDD",
    "Gherkin",
    "Cypress",
    "Playwright",
    "Appium",
    "Postman",
    "TypeScript",
    "GitHub Actions",
  ],
} as const;

export const siteKeywords = [
  siteConfig.author,
  "Analista de QA",
  "Analista de Testes",
  "QA Júnior",
  ...siteConfig.expertise,
];

interface PageSeo {
  title: string;
  description: string;
  path: string;
}

/**
 * `title`, `description`, canonical e Open Graph/Twitter de uma página. O
 * `openGraph` de uma página substitui o do layout por inteiro, então a base
 * compartilhada (imagem, siteName, locale) é repetida aqui.
 */
export function pageMetadata({ title, description, path }: PageSeo): Metadata {
  const fullTitle = `${title} - ${siteConfig.name}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      url: path,
      title: fullTitle,
      description,
      images: [siteConfig.ogImage],
    },
    twitter: {
      card: "summary",
      title: fullTitle,
      description,
      images: [siteConfig.ogImage.url],
    },
  };
}

const DEFAULT_SITE_URL = "https://portfolio-lucasfidelis.vercel.app";

/**
 * URL pública do site, em ordem: `SITE_URL`; o domínio de produção da Vercel
 * (acompanha um domínio próprio, se configurado no projeto); o domínio atual.
 */
export function getSiteUrl(): URL {
  const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

  return new URL(
    process.env.SITE_URL ??
      (vercelUrl ? `https://${vercelUrl}` : DEFAULT_SITE_URL)
  );
}
