import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

import { projects } from "../../data/projects";
import { projectMedia } from "../../data/project-media";
import { visits } from "../../data/visits";

interface ProjectDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

function getVerificationLabel(
  status: "verified" | "in_progress" | "unverified",
) {
  switch (status) {
    case "verified":
      return "Verified";

    case "in_progress":
      return "Verification in progress";

    case "unverified":
      return "Not yet verified";

    default:
      return status;
  }
}

function getStatusLabel(
  status: "ongoing" | "completed" | "pending",
) {
  switch (status) {
    case "ongoing":
      return "Ongoing";

    case "completed":
      return "Completed";

    case "pending":
      return "Pending";

    default:
      return status;
  }
}

export default async function ProjectDetailsPage({
  params,
}: ProjectDetailsPageProps) {
  const { id } = await params;

  const project = projects.find(
    (item) => item.id === Number(id),
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
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold !text-slate-950 transition hover:bg-slate-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>
        </div>
      </main>
    );
  }

  const verificationLabel = getVerificationLabel(
    project.verificationStatus,
  );

  const statusLabel = getStatusLabel(project.status);

  const isVerified =
    project.verificationStatus === "verified";

  const relatedVisits = visits.filter(
    (visit) => visit.projectId === project.id,
  );

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

        {/* Project Header */}
        <header className="mt-12">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs font-semibold uppercase tracking-widest text-slate-300">
              Project {String(project.id).padStart(2, "0")}
            </span>

            <span className="rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-blue-300">
              {statusLabel}
            </span>
          </div>

          <h1 className="mt-7 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {project.title}
          </h1>

          <div className="mt-5 flex flex-col gap-3 text-sm text-slate-400 sm:flex-row sm:items-center sm:gap-5">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-blue-400" />
              <span>{project.location}</span>
            </div>

            <span className="hidden text-slate-700 sm:block">
              /
            </span>

            <span>{project.ward} Ward</span>
          </div>

          <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-400">
            {project.description}
          </p>
        </header>

        {/* Implementation Highlight */}
        <section className="mt-12 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
          <div className="flex flex-col gap-6 p-7 sm:p-9 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Implementation Progress
              </p>

              <p className="mt-3 text-5xl font-bold tracking-tight sm:text-6xl">
                {project.progress}%
              </p>
            </div>

            <div className="w-full md:max-w-md">
              <div className="mb-3 flex items-center justify-between text-xs font-medium uppercase tracking-wider">
                <span className="text-slate-500">
                  Current progress
                </span>

                <span className="text-slate-300">
                  {statusLabel}
                </span>
              </div>

              <div
                className="h-3 overflow-hidden rounded-full bg-white/10"
                aria-label={`Project progress: ${project.progress}%`}
              >
                <span
                  className="block h-full rounded-full bg-blue-400 transition-all"
                  style={{
                    width: `${project.progress}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Verification status */}
        <section className="mt-8 rounded-3xl border border-blue-400/20 bg-blue-400/[0.05] p-6 sm:p-8">
          <div className="flex items-start gap-4">
            {isVerified ? (
              <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-blue-400" />
            ) : (
              <Clock3 className="mt-0.5 h-6 w-6 shrink-0 text-blue-400" />
            )}

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">
                Information Status
              </p>

              <h2 className="mt-2 text-xl font-semibold text-white">
                {verificationLabel}
              </h2>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400">
                Project information is presented according to the
                current source and verification status. Details will
                be updated when supporting records are confirmed.
              </p>

              {project.lastVerified && (
                <p className="mt-4 text-xs font-medium uppercase tracking-wider text-slate-500">
                  Last verified: {project.lastVerified}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Project Media */}
        <section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Project Media
            </p>

            <h2 className="mt-2 text-2xl font-semibold text-white">
              Field documentation
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
              Photographs, video and supporting documentation will be added
              as verified project material becomes available.
            </p>
          </div>

          {projectMedia.filter(
            (media) => media.projectId === project.id,
          ).length > 0 ? (
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {projectMedia
                .filter((media) => media.projectId === project.id)
                .map((media) => (
                  <div
                    key={media.id}
                    className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
                  >
                    {media.url ? (
                      <div className="aspect-video bg-white/5">
                        {/* Media will be rendered here once a verified URL is available. */}
                      </div>
                    ) : (
                      <div className="flex aspect-video items-center justify-center bg-white/[0.02] px-6 text-center">
                        <div>
                          <p className="text-sm font-semibold text-slate-300">
                            {media.title}
                          </p>

                          <p className="mt-2 text-xs leading-6 text-slate-500">
                            Media awaiting upload
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="p-5">
                      <p className="text-sm font-semibold text-white">
                        {media.title}
                      </p>

                      <p className="mt-2 text-sm leading-6 text-slate-400">
                        {media.description}
                      </p>

                      {media.date && (
                        <p className="mt-4 text-xs font-medium uppercase tracking-wider text-slate-500">
                          {media.date}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-dashed border-white/10 p-8 text-center">
              <p className="text-sm text-slate-500">
                No project media has been added yet.
              </p>
            </div>
          )}
        </section>

        {/* Project metrics */}
        <section className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
              Status
            </p>

            <p className="mt-3 text-xl font-semibold">
              {statusLabel}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Ward
            </p>

            <p className="mt-3 text-xl font-semibold">
              {project.ward}
            </p>
          </div>
        </section>

        {/* Related Engagements */}
        <section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">
                Constituency Engagements
              </p>

              <h2 className="mt-2 text-2xl font-semibold text-white">
                Related engagements
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
                Visits and public engagements connected to this project.
              </p>
            </div>

            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {relatedVisits.length}{" "}
              {relatedVisits.length === 1 ? "engagement" : "engagements"}
            </span>
          </div>

          {relatedVisits.length > 0 ? (
            <div className="mt-8 space-y-4">
              {relatedVisits.map((visit) => (
                <Link
                  key={visit.id}
                  href={`/visits/${visit.id}`}
                  className="group block rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition hover:border-blue-400/30 hover:bg-white/[0.04]"
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                        {visit.type.replaceAll("_", " ")}
                      </p>

                      <h3 className="mt-2 text-xl font-semibold text-white">
                        {visit.title}
                      </h3>

                      <div className="mt-3 flex flex-col gap-2 text-sm text-slate-400 sm:flex-row sm:gap-5">
                        <span className="flex items-center gap-2">
                          <CalendarDays className="h-4 w-4 text-blue-400" />
                          {visit.date} {visit.month} · {visit.day}
                        </span>

                        <span className="flex items-center gap-2">
                          <Clock3 className="h-4 w-4 text-blue-400" />
                          {visit.time}
                        </span>

                        <span className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-blue-400" />
                          {visit.location}
                        </span>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-2 text-sm font-semibold text-blue-300">
                      View engagement
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-dashed border-white/10 p-8 text-center">
              <p className="text-sm text-slate-500">
                No engagements have been linked to this project yet.
              </p>
            </div>
          )}
        </section>

        {/* Project timeline */}
        <section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
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
        </section>

        {/* Source */}
        <section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Information Source
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-400">
            {project.source}
          </p>
        </section>

        {/* Media placeholder */}
        <section className="mt-8 rounded-3xl border border-dashed border-white/10 bg-white/[0.02] p-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            Project Media
          </p>

          <p className="mt-3 text-sm text-slate-500">
            Project photographs, documents and video will appear here.
          </p>
        </section>
      </div>
    </main>
  );
}