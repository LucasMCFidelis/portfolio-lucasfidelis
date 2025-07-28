export interface ProjectCardProps {
  title: string;
  description?: string;
  year: number;
  area: string;
  urlList: { name?: string; url: string , icon?: "default" | "link"}[];
}
