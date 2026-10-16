export interface ImageDTO {
  id: string;
  title: string;
  mobileScreen: boolean;
  createdAt: Date | null;
  url: string;
  projectId: string;
  indexDisplay: number | null;
}
