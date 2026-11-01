import { SocialMediaDTO } from "./socialMediaDTO";

/**
 * Redes exibidas quando o banco está inacessível (cópia estática, pode estar
 * desatualizada). Mesmo formato de `getAllSocialMedias`: chave = título em
 * minúsculas.
 */
export const SOCIAL_MEDIAS_FALLBACK: Record<string, SocialMediaDTO> = {
  github: {
    id: "fallback-github",
    title: "GitHub",
    url: "https://github.com/LucasMCFidelis",
    createdAt: null,
  },
};
