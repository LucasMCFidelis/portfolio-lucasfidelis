import { getSiteUrl, siteConfig } from "@/utils/siteConfig";

/**
 * Dados estruturados (schema.org `Person`) para os buscadores. O conteúdo é
 * estático e controlado pelo projeto; `<` é escapado para não fechar a tag.
 */
export default function PersonJsonLd() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.author,
    jobTitle: siteConfig.jobTitle,
    description: siteConfig.description,
    url: getSiteUrl().toString(),
    sameAs: [siteConfig.githubUrl],
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.location.city,
      addressRegion: siteConfig.location.region,
      addressCountry: siteConfig.location.country,
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Universidade Estadual da Paraíba (UEPB)",
    },
    knowsAbout: siteConfig.expertise,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(person).replace(/</g, "\\u003c"),
      }}
    />
  );
}
