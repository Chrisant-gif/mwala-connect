
import type {
  AllocationRecord,
  AllocationVerificationStatus,
} from "../../app/data/allocations";
import type {
  Project,
  ProjectStatus,
  VerificationStatus,
} from "../../app/data/projects";
import type {
  ProjectMedia,
  ProjectMediaType,
} from "../../app/data/project-media";
import type { ConstituencyStatistics } from "../../app/data/statistics";
import type {
  Visit,
  VisitStatus,
  VisitType,
} from "../../app/data/visits";
import type { Ward } from "../../app/data/wards";
import type {
  Engagement,
  EngagementStatus,
  EngagementType,
} from "../../app/types/engagement";

export interface WardRow {
  id: number;
  slug: string;
  name: string;
  description: string | null;
}

export interface ProjectRow {
  id: number;
  ward_id: number | null;
  location: string | null;
  title: string;
  category: string;
  description: string | null;
  key_detail: string | null;
  status: string;
  progress: number;
  budget_amount: number | string | null;
  budget_display: string | null;
  start_date: string | null;
  expected_completion: string | null;
  start_date_label: string | null;
  expected_completion_label: string | null;
  source: string | null;
  verification_status: string;
  last_verified: string | null;
  last_verified_label: string | null;
  featured: boolean | null;
}

export interface AllocationRow {
  financial_year: string;
  amount: number | string;
  source: string | null;
  verification_status: string;
  last_verified: string | null;
}

export interface FieldActivityRow {
  id: number;
  source_kind: "visit" | "engagement";
  source_id: string;
  project_id: number | null;
  title: string;
  activity_type: string;
  status: string;
  activity_date: string | null;
  date_label: string | null;
  activity_time: string | null;
  time_label: string | null;
  location: string | null;
  ward_id: number | null;
  ward_label: string | null;
  description: string | null;
  image_url: string | null;
}

export interface ProjectMediaRow {
  id: number;
  source_media_id: number | null;
  project_id: number;
  media_type: string;
  title: string | null;
  description: string | null;
  url: string | null;
  storage_path: string | null;
  media_date: string | null;
  date_label: string | null;
}

function requireProjectStatus(value: string): ProjectStatus {
  if (
    value === "ongoing" ||
    value === "completed" ||
    value === "pending"
  ) {
    return value;
  }

  throw new Error(
    `Unsupported project status received from Supabase: ${value}`,
  );
}

function requireVerificationStatus(value: string): VerificationStatus {
  if (
    value === "verified" ||
    value === "in_progress" ||
    value === "unverified"
  ) {
    return value;
  }

  throw new Error(
    `Unsupported verification status received from Supabase: ${value}`,
  );
}

function requireAllocationVerificationStatus(
  value: string,
): AllocationVerificationStatus {
  if (
    value === "verified" ||
    value === "in_progress" ||
    value === "unverified"
  ) {
    return value;
  }

  throw new Error(
    `Unsupported allocation verification status received from Supabase: ${value}`,
  );
}

function formatAmount(amount: number | string): string {
  const value = Number(amount);

  if (!Number.isFinite(value)) {
    return "To be verified";
  }

  return `KSh ${value.toLocaleString("en-KE", {
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;
}

export function mapProjectRow(
  row: ProjectRow,
  wardName?: string,
): Project {
  const budget =
    row.budget_display ||
    (row.budget_amount !== null
      ? formatAmount(row.budget_amount)
      : "To be verified");

  return {
    id: Number(row.id),
    location:
      row.location || (wardName ? `${wardName} Ward` : "To be confirmed"),
    ward: wardName || "To be confirmed",
    title: row.title,
    category: row.category,
    description: row.description || "",
    keyDetail: row.key_detail || "",
    status: requireProjectStatus(row.status),
    progress: Number(row.progress),
    budget,
    startDate: row.start_date_label || row.start_date || "To be confirmed",
    expectedCompletion:
      row.expected_completion_label ||
      row.expected_completion ||
      "To be confirmed",
    source: row.source || "Project information pending official verification",
    verificationStatus: requireVerificationStatus(row.verification_status),
    lastVerified:
      row.last_verified_label || row.last_verified || "To be verified",
    featured: Boolean(row.featured),
  };
}

export function mapWardRow(row: WardRow, projects: Project[]): Ward {
  return {
    id: Number(row.id),
    name: row.name,
    description: row.description || "",
    projects,
    projectCount: projects.length,
  };
}

export function mapAllocationRow(row: AllocationRow): AllocationRecord {
  return {
    financialYear: row.financial_year,
    amount: Number(row.amount),
    source: row.source,
    verificationStatus: requireAllocationVerificationStatus(
      row.verification_status,
    ),
    lastVerified: row.last_verified,
  };
}

function mapActivityStatus(value: string): VisitStatus {
  if (
    value === "upcoming" ||
    value === "ongoing" ||
    value === "completed"
  ) {
    return value;
  }

  throw new Error(
    `Unsupported field activity status received from Supabase: ${value}`,
  );
}

function mapVisitType(value: string): VisitType {
  const normalized = value.toLowerCase().replace(/[\s-]+/g, "_");

  if (
    normalized === "project_launch" ||
    normalized === "site_visit" ||
    normalized === "community_engagement" ||
    normalized === "public_event"
  ) {
    return normalized;
  }

  throw new Error(`Unsupported visit type received from Supabase: ${value}`);
}

function getVisitDateParts(
  label: string | null,
  activityDate: string | null,
) {
  const displayLabel = label || activityDate || "";
  const match = displayLabel.match(
    /^(?:(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday),?\s+)?(\d{1,2})\s+([A-Za-z]{3,})$/i,
  );

  if (!match) {
    return {
      date: displayLabel || "To be confirmed",
      month: "",
      day: "",
    };
  }

  return {
    date: match[2],
    month: match[3].slice(0, 3).toUpperCase(),
    day: match[1] || "",
  };
}

export function mapVisitRow(row: FieldActivityRow): Visit {
  const dateParts = getVisitDateParts(row.date_label, row.activity_date);

  return {
    id: Number(row.source_id),
    ...(row.project_id !== null
      ? { projectId: Number(row.project_id) }
      : {}),
    ...dateParts,
    time: row.time_label || row.activity_time || "To be confirmed",
    location: row.location || row.ward_label || "To be confirmed",
    ward: row.ward_label || "To be confirmed",
    title: row.title,
    description: row.description || "",
    type: mapVisitType(row.activity_type),
    status: mapActivityStatus(row.status),
  };
}

function mapEngagementType(value: string): EngagementType {
  const normalized = value.toLowerCase().replace(/[_-]+/g, " ").trim();

  switch (normalized) {
    case "project launch":
      return "Project Launch";
    case "community meeting":
    case "community engagement":
      return "Community Meeting";
    case "project visit":
    case "site visit":
      return "Project Visit";
    case "public participation":
      return "Public Participation";
    case "community event":
      return "Community Event";
    default:
      throw new Error(
        `Unsupported engagement type received from Supabase: ${value}`,
      );
  }
}

function mapEngagementStatus(value: string): EngagementStatus {
  if (
    value === "upcoming" ||
    value === "ongoing" ||
    value === "completed"
  ) {
    return value;
  }

  throw new Error(
    `Unsupported engagement status received from Supabase: ${value}`,
  );
}

export function mapEngagementRow(row: FieldActivityRow): Engagement {
  return {
    id: row.source_id,
    ...(row.project_id !== null
      ? { projectId: Number(row.project_id) }
      : {}),
    title: row.title,
    type: mapEngagementType(row.activity_type),
    status: mapEngagementStatus(row.status),
    date: row.date_label || row.activity_date || "To be confirmed",
    ...(row.time_label || row.activity_time
      ? { time: row.time_label || row.activity_time || undefined }
      : {}),
    location: row.location || "To be confirmed",
    ward: row.ward_label || "To be confirmed",
    description: row.description || "",
    ...(row.image_url ? { image: row.image_url } : {}),
  };
}

export function mapProjectMediaRow(row: ProjectMediaRow): ProjectMedia {
  if (
    row.media_type !== "image" &&
    row.media_type !== "video" &&
    row.media_type !== "document"
  ) {
    throw new Error(
      `Unsupported project media type received from Supabase: ${row.media_type}`,
    );
  }

  return {
    id: Number(row.source_media_id ?? row.id),
    projectId: Number(row.project_id),
    type: row.media_type as ProjectMediaType,
    title: row.title || "Project media",
    description: row.description || "",
    url: row.url || "",
    ...(row.date_label || row.media_date
      ? { date: row.date_label || row.media_date || undefined }
      : {}),
  };
}

export function mapConstituencyStatistics(input: {
  wards: WardRow[];
  projects: ProjectRow[];
  allocations: AllocationRow[];
}): ConstituencyStatistics {
  const completedProjects = input.projects.filter(
    (project) => project.status === "completed",
  ).length;

  const ongoingProjects = input.projects.filter(
    (project) => project.status === "ongoing",
  ).length;

  const pendingProjects = input.projects.filter(
    (project) => project.status === "pending",
  ).length;

  const latestAllocation = [...input.allocations].sort((a, b) =>
    b.financial_year.localeCompare(a.financial_year),
  )[0];

  return {
    wards: input.wards.length,
    projects: input.projects.length,
    completedProjects,
    ongoingProjects,
    pendingProjects,
    residentsServed: "To be verified",
    totalAllocation: latestAllocation
      ? formatAmount(latestAllocation.amount)
      : "To be verified",
    financialYear: latestAllocation?.financial_year || "To be confirmed",
  };
}
