export interface ProjectCardProps {
  title: string;
  description?: string;
  year: number;
  area: string;
  urlGitHub: { name?: string; url: string }[];
}
