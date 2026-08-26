export type ProjectStatus = "ongoing" | "completed" | "pending";

export type VerificationStatus =
  | "verified"
  | "in_progress"
  | "unverified";

export interface Project {
  id: number;

  location: string;

  ward: string;

  title: string;

  description: string;

  status: ProjectStatus;

  progress: number;

  budget: string;

  startDate: string;

  expectedCompletion: string;

  source: string;

  verificationStatus: VerificationStatus;

  lastVerified?: string;

  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: 1,
    location: "Masii Ward",
    ward: "Masii",
    title: "Masii Water Project",
    description:
      "A water infrastructure project focused on improving access to reliable water for residents of Masii Ward.",
    status: "ongoing",
    progress: 65,
    budget: "To be verified",
    startDate: "To be confirmed",
    expectedCompletion: "To be confirmed",
    source: "Project information pending official verification",
    verificationStatus: "in_progress",
    featured: true,
  },

  {
    id: 2,
    location: "Matuu Ward",
    ward: "Matuu",
    title: "Community Development Initiative",
    description:
      "Development works supporting community infrastructure and improving access to essential public services.",
    status: "ongoing",
    progress: 48,
    budget: "To be verified",
    startDate: "To be confirmed",
    expectedCompletion: "To be confirmed",
    source: "Project information pending official verification",
    verificationStatus: "in_progress",
  },

  {
    id: 3,
    location: "Mwala Constituency",
    ward: "Multiple wards",
    title: "Public Infrastructure Programme",
    description:
      "A constituency-wide programme focused on strengthening local infrastructure and community facilities.",
    status: "pending",
    progress: 0,
    budget: "To be verified",
    startDate: "To be confirmed",
    expectedCompletion: "To be confirmed",
    source: "Project information pending official verification",
    verificationStatus: "in_progress",
  },
];