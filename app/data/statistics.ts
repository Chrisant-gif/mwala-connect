import { projects } from "./projects";

export interface ConstituencyStatistics {
  wards: number;
  projects: number;
  completedProjects: number;
  ongoingProjects: number;
  pendingProjects: number;
  residentsServed: string;
  totalAllocation: string;
  financialYear: string;
}

const totalProjects = projects.length;

const completedProjects = projects.filter(
  (project) => project.status === "completed",
).length;

const ongoingProjects = projects.filter(
  (project) => project.status === "ongoing",
).length;

const pendingProjects = projects.filter(
  (project) => project.status === "pending",
).length;

export const constituencyStatistics: ConstituencyStatistics = {
  wards: 6,
  projects: totalProjects,
  completedProjects,
  ongoingProjects,
  pendingProjects,
  residentsServed: "To be verified",
  totalAllocation: "KSh 202,243,910",
  financialYear: "2026 / 2027",
};