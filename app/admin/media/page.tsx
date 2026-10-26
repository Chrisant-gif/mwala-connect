
import Link from "next/link";

import { getProjects } from "../../../lib/supabase/data";
import { getProjectMedia } from "../../../lib/supabase/project-media";
import UploadMediaForm from "./UploadMediaForm";

export const dynamic = "force-dynamic";

export default async function AdminMediaPage() {
  const [projects, mediaRecords] = await Promise.all([
    getProjects(),
    getProjectMedia(),
  ]);

  const projectNames = new Map(
    projects.map((project) => [project.id, project.title]),
  );

  return (
    <div className="space-y-8">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-green-700">
            Content management
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-950">
            Project media
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
            Upload photographs, videos and supporting documents to
            the relevant development project.
          </p>
        </div>

        <Link
          href="/admin"
          className="inline-flex w-fit items-center justify-center rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
        >
          Back to overview
        </Link>
      </header>

      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Upload new media
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Only upload material intended for public viewing.
          </p>
        </div>

        {projects.length > 0 ? (
          <UploadMediaForm
            projects={projects.map((project) => ({
              id: project.id,
              title: project.title,
              ward: project.ward,
            }))}
          />
        ) : (
          <p className="rounded-lg bg-amber-50 p-4 text-sm text-amber-900">
            No projects are available. Create a project before
            uploading media.
          </p>
        )}
      </section>

      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-col justify-between gap-2 border-b border-gray-200 p-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Existing media records
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Records currently stored in Supabase.
            </p>
          </div>

          <span className="text-sm font-medium text-gray-600">
            {mediaRecords.length}{" "}
            {mediaRecords.length === 1 ? "record" : "records"}
          </span>
        </div>

        {mediaRecords.length === 0 ? (
          <p className="p-6 text-sm text-gray-500">
            No media records could be found.
          </p>
        ) : (
          <div className="divide-y divide-gray-100">
            {mediaRecords.map((media) => (
              <article
                key={media.id}
                className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center"
              >
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-green-50 text-xs font-bold uppercase tracking-wide text-green-800">
                  {media.type}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-900">
                    {media.title}
                  </h3>

                  <p className="mt-1 text-sm text-gray-600">
                    {projectNames.get(media.projectId) ??
                      `Project ${media.projectId}`}
                  </p>

                  {media.description && (
                    <p className="mt-1 text-sm text-gray-500">
                      {media.description}
                    </p>
                  )}

                  {media.date && (
                    <p className="mt-1 text-xs text-gray-500">
                      {media.date}
                    </p>
                  )}
                </div>

                {media.url ? (
                  <a
                    href={media.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-fit items-center rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                  >
                    View file
                  </a>
                ) : (
                  <span className="w-fit rounded-full bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-800">
                    Awaiting upload
                  </span>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
