import { getSiteUrl, pageMetadata, siteConfig } from "./siteConfig";

describe("pageMetadata", () => {
  it("monta title, canonical, Open Graph e Twitter da página", () => {
    const metadata = pageMetadata({
      title: "Projetos",
      description: "Lista de projetos",
      path: "/projects",
    });

    expect(metadata.title).toBe("Projetos");
    expect(metadata.description).toBe("Lista de projetos");
    expect(metadata.alternates).toEqual({ canonical: "/projects" });
    expect(metadata.openGraph).toMatchObject({
      url: "/projects",
      title: `Projetos - ${siteConfig.name}`,
      siteName: siteConfig.name,
      images: [siteConfig.ogImage],
    });
    expect(metadata.twitter).toMatchObject({
      title: `Projetos - ${siteConfig.name}`,
      images: [siteConfig.ogImage.url],
    });
  });
});

describe("getSiteUrl", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
    delete process.env.SITE_URL;
    delete process.env.VERCEL_PROJECT_PRODUCTION_URL;
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it("prioriza SITE_URL", () => {
    process.env.SITE_URL = "https://meusite.dev";
    process.env.VERCEL_PROJECT_PRODUCTION_URL = "projeto.vercel.app";

    expect(getSiteUrl().href).toBe("https://meusite.dev/");
  });

  it("usa o domínio de produção da Vercel quando não há SITE_URL", () => {
    process.env.VERCEL_PROJECT_PRODUCTION_URL = "projeto.vercel.app";

    expect(getSiteUrl().href).toBe("https://projeto.vercel.app/");
  });

  it("cai no domínio padrão sem variáveis de ambiente", () => {
    expect(getSiteUrl().href).toBe("https://portfolio-lucasfidelis.vercel.app/");
  });
});
