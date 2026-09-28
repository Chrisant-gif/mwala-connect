export type ProjectStatus =
  | "ongoing"
  | "completed"
  | "pending";

export type VerificationStatus =
  | "verified"
  | "in_progress"
  | "unverified";

export interface Project {
  id: number;
  location: string;
  ward: string;
  title: string;
  category: string;
  description: string;
  keyDetail: string;
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
    category: "Water infrastructure",
    description:
      "A water infrastructure project focused on improving access to reliable water for residents of Masii Ward.",
    keyDetail:
      "Project progress is currently documented at 65%, with further project information pending official verification.",
    status: "ongoing",
    progress: 65,
    budget: "To be verified",
    startDate: "To be confirmed",
    expectedCompletion: "To be confirmed",
    source: "Project information pending official verification",
    verificationStatus: "in_progress",
    lastVerified: "Verification in progress",
    featured: true,
  },

  {
    id: 2,
    location: "Muthetheni Ward",
    ward: "Muthetheni",
    title: "Utithini Water Project",
    category: "Water infrastructure",
    description:
      "A completed water project serving the local community through improved access to water.",
    keyDetail:
      "The project is powered by solar energy, adding a clean-energy component to the water infrastructure.",
    status: "completed",
    progress: 100,
    budget: "To be verified",
    startDate: "To be confirmed",
    expectedCompletion: "Completed",
    source: "Field information",
    verificationStatus: "in_progress",
    lastVerified: "To be verified",
  },

  {
    id: 3,
    location: "Muthetheni Ward",
    ward: "Muthetheni",
    title: "Kiluu Bridge",
    category: "Community infrastructure",
    description:
      "A bridge construction project intended to improve local community connectivity and movement.",
    keyDetail:
      "The project was recently flagged off for the local community.",
    status: "ongoing",
    progress: 0,
    budget: "To be verified",
    startDate: "To be confirmed",
    expectedCompletion: "To be confirmed",
    source: "Field information",
    verificationStatus: "in_progress",
    lastVerified: "To be verified",
  },

  {
    id: 4,
    location: "Muthetheni Ward",
    ward: "Muthetheni",
    title: "Matuu Water Project",
    category: "Water infrastructure",
    description:
      "A water project that has experienced a period of stalled activity and is expected to receive renewed support.",
    keyDetail:
      "Solar panels are expected to be introduced to provide power for the water project.",
    status: "pending",
    progress: 0,
    budget: "To be verified",
    startDate: "To be confirmed",
    expectedCompletion: "To be confirmed",
    source: "Field information",
    verificationStatus: "in_progress",
    lastVerified: "To be verified",
  },
];