
import "server-only";

import { createClient } from "./server";

export type ProjectMediaType = "image" | "video" | "document";

export interface ProjectMediaRecord {
  id: number;
  projectId: number;
  type: ProjectMediaType;
  title: string;
  description: string;
  url: string;
  storagePath: string | null;
  date?: string;
}

interface ProjectMediaRow {
  id: number;
  project_id: number;
  media_type: string;
  title: string;
  description: string | null;
  url: string | null;
  storage_path: string | null;
  media_date: string | null;
  date_label: string | null;
}

function formatMediaDate(
  mediaDate: string | null,
  dateLabel: string | null,
): string | undefined {
  if (dateLabel) {
    return dateLabel;
  }

  if (!mediaDate) {
    return undefined;
  }

  const date = new Date(`${mediaDate.slice(0, 10)}T00:00:00Z`);

  if (Number.isNaN(date.getTime())) {
    return undefined;
  }

  return new Intl.DateTimeFormat("en-GB", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function mapMediaRow(row: ProjectMediaRow): ProjectMediaRecord {
  const type: ProjectMediaType =
    row.media_type === "video" || row.media_type === "document"
      ? row.media_type
      : "image";

  return {
    id: row.id,
    projectId: row.project_id,
    type,
    title: row.title,
    description: row.description ?? "",
    url: row.url ?? "",
    storagePath: row.storage_path,
    date: formatMediaDate(row.media_date, row.date_label),
  };
}

export async function getProjectMedia(
  projectId?: number,
): Promise<ProjectMediaRecord[]> {
  const supabase = await createClient();

  let query = supabase
    .from("project_media")
    .select(
      "id, project_id, media_type, title, description, url, storage_path, media_date, date_label",
    )
    .order("created_at", { ascending: false });

  if (projectId !== undefined) {
    query = query.eq("project_id", projectId);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Could not retrieve project media:", error.message);
    return [];
  }

  return (data as ProjectMediaRow[]).map(mapMediaRow);
}
