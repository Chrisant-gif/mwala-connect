

import Link from "next/link";
import { notFound } from "next/navigation";

import { createClient } from "../../../../lib/supabase/server";
import { getWards } from "../../../../lib/supabase/data";
import type { ProjectRow } from "../../../../lib/supabase/mappers";
import EditProjectForm from "../EditProjectForm";


export const dynamic = "force-dynamic";

interface EditProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditProjectPage({
  params,
}: EditProjectPageProps) {
  const { id } = await params;

  if (!/^[1-9]\d*$/.test(id) || !Number.isSafeInteger(Number(id))) {
    notFound();
  }

  const supabase = await createClient();

  const [{ data, error }, wards] = await Promise.all([
    supabase
      .from("projects")
      .select("*")
      .eq("id", Number(id))
      .maybeSingle(),
    getWards(),
  ]);

  if (error) {
    console.error("Unable to load project for editing:", error.message);
    throw new Error("Unable to load this project.");
  }

  if (!data) {
    notFound();
  }

  const project = data as unknown as ProjectRow;

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <header>
        <Link
          href="/admin/projects"
          className="text-sm font-medium text-green-800 hover:text-green-950"
        >
          ← Back to projects
        </Link>

        <p className="mt-6 text-sm font-medium uppercase tracking-widest text-green-700">
          Content management
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-950">
          Edit project
        </h1>

        <p className="mt-2 text-sm text-gray-600">
          Update the project record and save your changes to the database.
        </p>
      </header>

      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
        <EditProjectForm
          project={{
            id: Number(project.id),
            wardId:
              project.ward_id === null ? null : Number(project.ward_id),
            title: project.title,
            location: project.location ?? "",
            category: project.category ?? "",
            description: project.description ?? "",
            keyDetail: project.key_detail ?? "",
            status: project.status,
            progress: Number(project.progress),
            budgetAmount: project.budget_amount,
            budgetDisplay: project.budget_display ?? "",
            startDate: project.start_date ?? "",
            expectedCompletion: project.expected_completion ?? "",
            source: project.source ?? "",
            verificationStatus: project.verification_status,
            lastVerified: project.last_verified ?? "",
            featured: Boolean(project.featured),
          }}
          wards={wards.map((ward) => ({
            id: ward.id,
            name: ward.name,
          }))}
        />
      </section>
    </div>
  );
}
