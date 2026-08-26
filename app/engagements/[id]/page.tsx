import Link from "next/link";
import { ArrowLeft, CalendarDays, MapPin } from "lucide-react";

import { engagements } from "../../data/engagements";

interface EngagementDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EngagementDetailsPage({
  params,
}: EngagementDetailsPageProps) {
  const { id } = await params;

  const engagement = engagements.find(
    (item) => item.id === id
  );

  if (!engagement) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-24 text-white">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Engagements
          </p>

          <h1 className="mt-4 text-4xl font-bold">
            Engagement not found
          </h1>

          <p className="mt-4 text-slate-400">
            The engagement you are looking for could not be found.
          </p>

          <Link
            href="/#engagements"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Engagements
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
          href="/#engagements"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Engagements
        </Link>

        {/* Header */}
        <div className="mt-12">
          <span className="inline-flex rounded-full border border-blue-400/30 bg-blue-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-blue-300">
            {engagement.status}
          </span>

          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
            {engagement.title}
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">
            {engagement.description}
          </p>
        </div>

        {/* Details */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <div className="flex items-center gap-3">
              <CalendarDays className="h-5 w-5 text-blue-400" />

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Date
                </p>

                <p className="mt-1 text-sm font-medium text-white">
                  {engagement.date}
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
                  {engagement.location}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Engagement information */}
        <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Engagement Type
          </p>

          <p className="mt-2 text-xl font-semibold">
            {engagement.type}
          </p>

          <div className="mt-6 border-t border-white/10 pt-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Ward
            </p>

            <p className="mt-2 text-lg font-medium">
              {engagement.ward}
            </p>
          </div>
        </div>

        {/* Media placeholder */}
        <div className="mt-8 rounded-3xl border border-dashed border-white/10 bg-white/[0.02] p-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            Photos & Video
          </p>

          <p className="mt-3 text-sm text-slate-500">
            Engagement media will appear here.
          </p>
        </div>
      </div>
    </main>
  );
}