import { ImageDTO } from "../images/imageDTO";

export interface ProjectDTO {
  id: string;
  title: string;
  description: string;
  yearDevelopment: number;
  typeProject: "frontend" | "backend" | "qa" | "outros";
  repositoryUrl: string;
  deploymentUrl: string;
  projectInEvidence: boolean;
  createdAt: Date;
  images: Array<ImageDTO>;
}
