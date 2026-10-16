import type { projectsTable } from "@/db/schema";

import { ImageDTO } from "../images/imageDTO";
import { mapLinkedSkills } from "../skills/mapLinkedSkills";
import { SkillDTO } from "../skills/skillDTO";
import { ProjectDTO } from "./projectDTO";

type ProjectRow = typeof projectsTable.$inferSelect & {
  images: Array<ImageDTO>;
  projectSkills: Array<{ skill: SkillDTO }>;
};

export function mapProject({
  projectSkills,
  ...project
}: ProjectRow): ProjectDTO {
  return { ...project, skills: mapLinkedSkills(projectSkills) };
}
