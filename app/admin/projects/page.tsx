
import Link from "next/link";
import { getProjects } from "../../../lib/supabase/data";

export const dynamic = "force-dynamic";

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    ongoing: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    pending: "bg-amber-100 text-amber-800",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${
        styles[status] ?? "bg-gray-100 text-gray-700"
      }`}
    >
      {status.replaceAll("_", " ")}
    </span>
  );
}

function VerificationBadge({ status }: { status: string }) {
  const labels: Record<string, string> = {
    verified: "Verified",
    in_progress: "In progress",
    unverified: "Unverified",
  };

  const styles: Record<string, string> = {
    verified: "bg-green-100 text-green-800",
    in_progress: "bg-blue-100 text-blue-800",
    unverified: "bg-gray-100 text-gray-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
        styles[status] ?? "bg-gray-100 text-gray-700"
      }`}
    >
      {labels[status] ?? status.replaceAll("_", " ")}
    </span>
  );
}

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="space-y-8">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-green-700">
            Content management
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-950">
            Projects
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            Review and manage development projects recorded for Mwala
            Constituency.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin"
            className="inline-flex w-fit items-center justify-center rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
          >
            Back to overview
          </Link>

          <Link
            href="/admin/projects/new"
            className="inline-flex w-fit items-center justify-center rounded-lg bg-green-800 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-900"
          >
            + Add project
          </Link>
        </div>
      </header>

      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-col justify-between gap-2 border-b border-gray-200 p-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Project directory
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Current records retrieved from Supabase.
            </p>
          </div>

          <span className="text-sm font-medium text-gray-600">
            {projects.length}{" "}
            {projects.length === 1 ? "project" : "projects"}
          </span>
        </div>

        {projects.length === 0 ? (
          <div className="p-8 text-center">
            <h3 className="font-semibold text-gray-900">
              No projects found
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Projects will appear here once records are available.
            </p>

            <Link
              href="/admin/projects/new"
              className="mt-4 inline-flex items-center rounded-lg bg-green-800 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-900"
            >
              Add your first project
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
                <tr>
                  <th className="px-5 py-4 font-semibold">Project</th>
                  <th className="px-5 py-4 font-semibold">Ward</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                  <th className="px-5 py-4 font-semibold">Progress</th>
                  <th className="px-5 py-4 font-semibold">
                    Verification
                  </th>
                  <th className="px-5 py-4 font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {projects.map((project) => {
                  const progress = Math.min(
                    100,
                    Math.max(0, Number(project.progress) || 0),
                  );

                  return (
                    <tr
                      key={project.id}
                      className="transition hover:bg-gray-50"
                    >
                      <td className="px-5 py-4">
                        <p className="font-semibold text-gray-900">
                          {project.title}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          {project.category || "Uncategorised"}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-gray-700">
                        {project.ward || "Not assigned"}
                      </td>

                      <td className="px-5 py-4">
                        <StatusBadge status={project.status} />
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-200">
                            <div
                              className="h-full rounded-full bg-green-700"
                              style={{ width: `${progress}%` }}
                            />
                          </div>

                          <span className="whitespace-nowrap text-xs font-medium text-gray-600">
                            {progress}%
                          </span>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <VerificationBadge
                          status={project.verificationStatus}
                        />
                      </td>

                      <td className="px-5 py-4">
                        <Link
                          href={`/admin/projects/${project.id}`}
                          className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 transition hover:border-green-700 hover:bg-green-50 hover:text-green-800"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
