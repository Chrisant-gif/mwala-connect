export type EngagementStatus = "upcoming" | "completed";

export type EngagementType =
  | "Project Launch"
  | "Community Meeting"
  | "Project Visit"
  | "Public Participation"
  | "Community Event";

export interface Engagement {
  id: string;
  title: string;
  type: EngagementType;
  status: EngagementStatus;
  date: string;
  time?: string;
  location: string;
  ward: string;
  description: string;
  image?: string;
}