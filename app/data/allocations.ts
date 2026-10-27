
export type AllocationVerificationStatus =
  | "verified"
  | "in_progress"
  | "unverified";

export interface AllocationRecord {
  financialYear: string;
  amount: number;
  source: string | null;
  verificationStatus: AllocationVerificationStatus;
  lastVerified: string | null;
}

export const allocationHistory: AllocationRecord[] = [
  {
    financialYear: "2025 / 2026",
    amount: 202243910.0,
    source: null,
    verificationStatus: "unverified",
    lastVerified: null,
  },
  {
    financialYear: "2024 / 2025",
    amount: 188414052.19,
    source: null,
    verificationStatus: "unverified",
    lastVerified: null,
  },
];
