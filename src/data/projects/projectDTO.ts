import { ImageDTO } from "../images/imageDTO";
import { SkillDTO } from "../skills/skillDTO";

export interface ProjectRepositoryDTO {
  repositoryTitle: string | null;
  repositoryUrl: string;
}

export interface ProjectDTO {
  id: string;
  title: string;
  description: string | null;
  yearDevelopment: number;
  typeProject: "frontend" | "backend" | "fullstack" | "qa" | "outros";
  repositories: Array<ProjectRepositoryDTO>;
  deploymentUrl: string | null;
  documentationUrl: string | null;
  projectInEvidence: boolean;
  createdAt: Date | null;
  images: Array<ImageDTO>;
  skills: Array<SkillDTO>;
}
