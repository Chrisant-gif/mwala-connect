import Link from "next/link";
import { ArrowLeft, CalendarDays, MapPin } from "lucide-react";

import { projects } from "../../data/projects";

interface ProjectDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProjectDetailsPage({
  params,
}: ProjectDetailsPageProps) {
  const { id } = await params;

  const project = projects.find(
    (item) => item.id === Number(id)
  );

  if (!project) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-24 text-white">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Development Projects
          </p>

          <h1 className="mt-4 text-4xl font-bold">
            Project not found
          </h1>

          <p className="mt-4 text-slate-400">
            The project record you are looking for could not be found.
          </p>

          <Link
            href="/#projects"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white sm:px-10 lg:px-16">
      <div className="mx-auto max-w-5xl">
        {/* Back link */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Link>

        {/* Header */}
        <div className="mt-12">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs font-semibold uppercase tracking-widest text-slate-300">
              Project {String(project.id).padStart(2, "0")}
            </span>

            <span className="rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-blue-300">
              {project.status}
            </span>
          </div>

          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
            {project.title}
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">
            {project.description}
          </p>
        </div>

        {/* Location */}
        <div className="mt-10 flex flex-col gap-3 text-sm text-slate-300 sm:flex-row sm:gap-6">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-blue-400" />
            {project.location}
          </div>

          <div className="text-slate-500">
            {project.ward} Ward
          </div>
        </div>

        {/* Project metrics */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Budget
            </p>

            <p className="mt-3 text-xl font-semibold">
              {project.budget}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Implementation
            </p>

            <p className="mt-3 text-xl font-semibold">
              {project.progress}%
            </p>

            <div
              className="mt-4 h-2 overflow-hidden rounded-full bg-white/10"
              aria-label={`Project progress: ${project.progress}%`}
            >
              <span
                className="block h-full rounded-full bg-blue-400"
                style={{
                  width: `${project.progress}%`,
                }}
              />
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Status
            </p>

            <p className="mt-3 text-xl font-semibold capitalize">
              {project.status}
            </p>
          </div>
        </div>

        {/* Project timeline */}
        <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-blue-400" />

                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Start
                </p>
              </div>

              <p className="mt-3 text-lg font-medium">
                {project.startDate}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-blue-400" />

                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Expected Completion
                </p>
              </div>

              <p className="mt-3 text-lg font-medium">
                {project.expectedCompletion}
              </p>
            </div>
          </div>
        </div>

        {/* Source */}
        <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Information Source
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-400">
            {project.source}
          </p>
        </div>

        {/* Media placeholder */}
        <div className="mt-8 rounded-3xl border border-dashed border-white/10 bg-white/[0.02] p-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            Project Media
          </p>

          <p className="mt-3 text-sm text-slate-500">
            Project photographs, documents and video will appear here.
          </p>
        </div>
      </div>
    </main>
  );
}