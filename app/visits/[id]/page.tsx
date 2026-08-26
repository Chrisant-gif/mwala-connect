import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  MapPin,
  Tag,
} from "lucide-react";

import { visits } from "../../data/visits";

interface VisitDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

function getStatusLabel(
  status: "upcoming" | "ongoing" | "completed",
) {
  switch (status) {
    case "upcoming":
      return "Upcoming";

    case "ongoing":
      return "Ongoing";

    case "completed":
      return "Completed";

    default:
      return status;
  }
}

function getTypeLabel(
  type:
    | "project_launch"
    | "site_visit"
    | "community_engagement"
    | "public_event",
) {
  switch (type) {
    case "project_launch":
      return "Project Launch";

    case "site_visit":
      return "Site Visit";

    case "community_engagement":
      return "Community Engagement";

    case "public_event":
      return "Public Event";

    default:
      return type;
  }
}

export default async function VisitDetailsPage({
  params,
}: VisitDetailsPageProps) {
  const { id } = await params;

  const visit = visits.find(
    (item) => item.id === Number(id),
  );

  if (!visit) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-24 text-white">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Constituency Engagements
          </p>

          <h1 className="mt-4 text-4xl font-bold">
            Visit not found
          </h1>

          <p className="mt-4 text-slate-400">
            The engagement record you are looking for could not be
            found.
          </p>

          <Link
            href="/#visits"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold !text-slate-950 transition hover:bg-slate-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Visits
          </Link>
        </div>
      </main>
    );
  }

  const statusLabel = getStatusLabel(visit.status);
  const typeLabel = getTypeLabel(visit.type);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white sm:px-10 lg:px-16">
      <div className="mx-auto max-w-5xl">
        {/* Back link */}
        <Link
          href="/#visits"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Visits
        </Link>

        {/* Header */}
        <header className="mt-12">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-blue-300">
              {statusLabel}
            </span>

            <span className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs font-semibold uppercase tracking-widest text-slate-300">
              {typeLabel}
            </span>
          </div>

          <h1 className="mt-7 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {visit.title}
          </h1>

          <div className="mt-5 flex flex-col gap-3 text-sm text-slate-400 sm:flex-row sm:items-center sm:gap-5">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-blue-400" />
              <span>{visit.location}</span>
            </div>

            <span className="hidden text-slate-700 sm:block">
              /
            </span>

            <span>{visit.ward} Ward</span>
          </div>

          <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-400">
            {visit.description}
          </p>
        </header>

        {/* Date highlight */}
        <section className="mt-12 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
          <div className="grid md:grid-cols-[180px_1fr]">
            <div className="flex flex-row items-center gap-5 bg-white/[0.04] p-7 md:flex-col md:items-start md:justify-center">
              <div>
                <p className="text-5xl font-bold tracking-tight">
                  {visit.date}
                </p>

                <p className="mt-1 text-sm font-semibold tracking-[0.2em] text-blue-400">
                  {visit.month}
                </p>
              </div>

              <div className="h-px w-12 bg-white/10 md:w-16" />

              <p className="text-sm font-medium text-slate-400">
                {visit.day}
              </p>
            </div>

            <div className="flex items-center p-7 sm:p-9">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Scheduled engagement
                </p>

                <p className="mt-3 text-2xl font-semibold">
                  {visit.title}
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  {statusLabel} · {typeLabel}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Visit details */}
        <section className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <div className="flex items-center gap-3">
              <CalendarDays className="h-5 w-5 text-blue-400" />

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Date
                </p>

                <p className="mt-1 text-sm font-medium text-white">
                  {visit.date} {visit.month} · {visit.day}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-blue-400" />

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Time
                </p>

                <p className="mt-1 text-sm font-medium text-white">
                  {visit.time}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-blue-400" />

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Location
                </p>

                <p className="mt-1 text-sm font-medium text-white">
                  {visit.location}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <div className="flex items-center gap-3">
              <Tag className="h-5 w-5 text-blue-400" />

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Engagement Type
                </p>

                <p className="mt-1 text-sm font-medium text-white">
                  {typeLabel}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Visit information */}
        <section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Engagement Information
          </p>

          <p className="mt-3 text-base leading-8 text-slate-400">
            This engagement is part of the constituency's ongoing
            programme of community engagements, project launches and
            public activities.
          </p>
        </section>

        {/* Media */}
        <section className="mt-8 rounded-3xl border border-dashed border-white/10 bg-white/[0.02] p-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            Visit Media
          </p>

          <p className="mt-3 text-sm text-slate-500">
            Photographs, video and visit updates will appear here.
          </p>
        </section>
      </div>
    </main>
  );
}