
import "server-only";

import { createClient } from "./server";

import {
  mapAllocationRow,
  mapConstituencyStatistics,
  mapEngagementRow,
  mapProjectMediaRow,
  mapProjectRow,
  mapVisitRow,
  mapWardRow,
  type AllocationRow,
  type FieldActivityRow,
  type ProjectMediaRow,
  type ProjectRow,
  type WardRow,
} from "./mappers";

import type { AllocationRecord } from "../../app/data/allocations";
import type { Engagement } from "../../app/types/engagement";
import type { Project } from "../../app/data/projects";
import type { ProjectMedia } from "../../app/data/project-media";
import type { ConstituencyStatistics } from "../../app/data/statistics";
import type { Visit } from "../../app/data/visits";
import type { Ward } from "../../app/data/wards";

async function getWardRows(): Promise<WardRow[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("wards")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    throw new Error(`Unable to load wards: ${error.message}`);
  }

  return (data ?? []) as unknown as WardRow[];
}

async function getProjectRows(): Promise<ProjectRow[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    throw new Error(`Unable to load projects: ${error.message}`);
  }

  return (data ?? []) as unknown as ProjectRow[];
}

async function getAllocationRows(): Promise<AllocationRow[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("allocations")
    .select("*")
    .order("financial_year", { ascending: false });

  if (error) {
    throw new Error(`Unable to load allocations: ${error.message}`);
  }

  return (data ?? []) as unknown as AllocationRow[];
}

async function getFieldActivityRows(
  sourceKind: "visit" | "engagement",
): Promise<FieldActivityRow[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("field_activities")
    .select("*")
    .eq("source_kind", sourceKind)
    .order("id", { ascending: true });

  if (error) {
    throw new Error(`Unable to load ${sourceKind} records: ${error.message}`);
  }

  return (data ?? []) as unknown as FieldActivityRow[];
}

export async function getProjects(): Promise<Project[]> {
  const [wardRows, projectRows] = await Promise.all([
    getWardRows(),
    getProjectRows(),
  ]);

  const wardNames = new Map(
    wardRows.map((ward) => [Number(ward.id), ward.name]),
  );

  return projectRows.map((project) =>
    mapProjectRow(
      project,
      project.ward_id === null
        ? undefined
        : wardNames.get(Number(project.ward_id)),
    ),
  );
}

export async function getWards(): Promise<Ward[]> {
  const [wardRows, projectRows] = await Promise.all([
    getWardRows(),
    getProjectRows(),
  ]);

  const wardNames = new Map(
    wardRows.map((ward) => [Number(ward.id), ward.name]),
  );

  const projectsByWard = new Map<number, Project[]>();

  for (const projectRow of projectRows) {
    if (projectRow.ward_id === null) {
      continue;
    }

    const wardId = Number(projectRow.ward_id);
    const project = mapProjectRow(projectRow, wardNames.get(wardId));
    const existing = projectsByWard.get(wardId) ?? [];

    existing.push(project);
    projectsByWard.set(wardId, existing);
  }

  return wardRows.map((ward) =>
    mapWardRow(ward, projectsByWard.get(Number(ward.id)) ?? []),
  );
}

export async function getAllocations(): Promise<AllocationRecord[]> {
  const rows = await getAllocationRows();
  return rows.map(mapAllocationRow);
}

export async function getVisits(): Promise<Visit[]> {
  const rows = await getFieldActivityRows("visit");
  return rows.map(mapVisitRow);
}

export async function getEngagements(): Promise<Engagement[]> {
  const rows = await getFieldActivityRows("engagement");
  return rows.map(mapEngagementRow);
}

export async function getProjectMedia(
  projectId?: number,
): Promise<ProjectMedia[]> {
  const supabase = await createClient();

  let query = supabase
    .from("project_media")
    .select("*")
    .order("id", { ascending: true });

  if (projectId !== undefined) {
    query = query.eq("project_id", projectId);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`Unable to load project media: ${error.message}`);
  }

  return ((data ?? []) as unknown as ProjectMediaRow[]).map(
    mapProjectMediaRow,
  );
}

export async function getConstituencyStatistics(): Promise<ConstituencyStatistics> {
  const [wards, projects, allocations] = await Promise.all([
    getWardRows(),
    getProjectRows(),
    getAllocationRows(),
  ]);

  return mapConstituencyStatistics({
    wards,
    projects,
    allocations,
  });
}

export async function getProjectById(
  id: number,
): Promise<Project | undefined> {
  const projects = await getProjects();
  return projects.find((project) => project.id === id);
}

export async function getWardById(
  id: number,
): Promise<Ward | undefined> {
  const wards = await getWards();
  return wards.find((ward) => ward.id === id);
}

export async function getVisitById(
  id: number,
): Promise<Visit | undefined> {
  const visits = await getVisits();
  return visits.find((visit) => visit.id === id);
}

export async function getEngagementById(
  id: string,
): Promise<Engagement | undefined> {
  const engagements = await getEngagements();
  return engagements.find((engagement) => engagement.id === id);
}
