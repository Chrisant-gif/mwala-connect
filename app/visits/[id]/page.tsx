import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock, MapPin } from "lucide-react";

import { visits } from "../../data/visits";

interface VisitDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function VisitDetailsPage({
  params,
}: VisitDetailsPageProps) {
  const { id } = await params;

  const visit = visits.find(
    (item) => item.id === Number(id)
  );

  if (!visit) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-24 text-white">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Constituency Visits
          </p>

          <h1 className="mt-4 text-4xl font-bold">
            Visit not found
          </h1>

          <p className="mt-4 text-slate-400">
            The visit record you are looking for could not be found.
          </p>

          <Link
            href="/#visits"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Visits
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
          href="/#visits"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Visits
        </Link>

        {/* Header */}
        <div className="mt-12">
          <span className="inline-flex rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-blue-300">
            Upcoming Visit
          </span>

          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
            {visit.title}
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">
            {visit.description}
          </p>
        </div>

        {/* Visit details */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
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
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Ward
              </p>

              <p className="mt-1 text-sm font-medium text-white">
                {visit.ward}
              </p>
            </div>
          </div>
        </div>

        {/* Visit information */}
        <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Visit Information
          </p>

          <p className="mt-3 text-base leading-8 text-slate-400">
            This visit is part of the constituency's ongoing programme of
            community engagements, project launches and public activities.
          </p>
        </div>

        {/* Media placeholder */}
        <div className="mt-8 rounded-3xl border border-dashed border-white/10 bg-white/[0.02] p-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            Visit Media
          </p>

          <p className="mt-3 text-sm text-slate-500">
            Photographs, video and visit updates will appear here.
          </p>
        </div>
      </div>
    </main>
  );
}