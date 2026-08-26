export type ProjectMediaType = "image" | "video" | "document";

export interface ProjectMedia {
  id: number;
  projectId: number;
  type: ProjectMediaType;
  title: string;
  description: string;
  url: string;
  date?: string;
}

export const projectMedia: ProjectMedia[] = [
  {
    id: 1,
    projectId: 1,
    type: "image",
    title: "Masii Water Project",
    description:
      "Project photography will be added here as field documentation becomes available.",
    url: "",
    date: "August 2026",
  },
];