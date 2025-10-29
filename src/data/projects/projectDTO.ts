import { ImageDTO } from "../images/imageDTO";

export interface ProjectDTO {
  id: string;
  title: string;
  description: string;
  yearDevelopment: number;
  typeProject: "frontend" | "backend" | "fullstack" | "qa" | "outros";
  repositoryUrl: string;
  deploymentUrl: string | null;
  documentationUrl: string | null;
  projectInEvidence: boolean;
  createdAt: Date;
  images: Array<ImageDTO>;
}
