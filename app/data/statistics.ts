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

export const constituencyStatistics: ConstituencyStatistics = {
  wards: 6,

  projects: 0,

  completedProjects: 0,

  ongoingProjects: 0,

  pendingProjects: 0,

  residentsServed: "To be verified",

  totalAllocation: "To be verified",

  financialYear: "2026 / 2027",
};