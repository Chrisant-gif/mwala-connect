
import Link from "next/link";
import { getWards } from "../../../../lib/supabase/data";
import CreateProjectForm from "../CreateProjectForm";

export const dynamic = "force-dynamic";

export default async function NewProjectPage() {
  const wards = await getWards();

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <header>
        <Link
          href="/admin/projects"
          className="text-sm font-medium text-green-800 hover:underline"
        >
          ← Back to projects
        </Link>

        <p className="mt-6 text-sm font-medium uppercase tracking-widest text-green-700">
          Project management
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-950">
          Add a project
        </h1>

        <p className="mt-2 text-sm text-gray-600">
          Record a development project for Mwala Constituency.
        </p>
      </header>

      {wards.length === 0 ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
          No wards are available. Add or restore the ward records before
          creating a project.
        </div>
      ) : (
        <CreateProjectForm
          wards={wards.map((ward) => ({
            id: ward.id,
            name: ward.name,
          }))}
        />
      )}
    </div>
  );
}
