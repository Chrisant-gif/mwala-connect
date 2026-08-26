"use client";

import { CalendarDays, MapPin, ArrowUpRight } from "lucide-react";

const engagements = [
  {
    date: "Upcoming",
    title: "Water Project Launch",
    location: "Masii Ward",
    description:
      "Constituency engagement during the launch of a community water project.",
    featured: true,
  },
  {
    date: "Recent",
    title: "Community Engagement",
    location: "Mwala Constituency",
    description:
      "Meeting with residents and community representatives to discuss local priorities.",
    featured: false,
  },
  {
    date: "Recent",
    title: "Development Project Visit",
    location: "Mwala Constituency",
    description:
      "Site visit to review progress and engage with residents around an ongoing development project.",
    featured: false,
  },
];

export default function Engagements() {
  const featuredEngagement = engagements.find(
    (engagement) => engagement.featured
  );

  const otherEngagements = engagements.filter(
    (engagement) => !engagement.featured
  );

  return (
    <section
      id="engagements"
      className="bg-slate-950 px-6 py-24 text-white sm:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-14 max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
            Constituency Engagements
          </p>

          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Connected with the
            <span className="block text-slate-400">people of Mwala.</span>
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
            Follow upcoming visits, community meetings, project launches and
            other constituency engagements.
          </p>
        </div>

        {/* Next engagement */}
        {featuredEngagement && (
          <div className="mb-8 overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-600/20 via-slate-900 to-slate-900 p-6 shadow-2xl sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <div className="mb-5 inline-flex items-center rounded-full border border-blue-400/30 bg-blue-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-blue-300">
                  Next Engagement
                </div>

                <h3 className="text-3xl font-bold sm:text-4xl">
                  {featuredEngagement.title}
                </h3>

                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
                  {featuredEngagement.description}
                </p>

                <div className="mt-6 flex flex-col gap-3 text-sm text-slate-300 sm:flex-row sm:gap-6">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-blue-400" />
                    {featuredEngagement.location}
                  </div>

                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-blue-400" />
                    {featuredEngagement.date}
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
              >
                View Details
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Engagement cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {otherEngagements.map((engagement) => (
            <article
              key={engagement.title}
              className="group rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05] sm:p-8"
            >
              <div className="mb-6 flex items-center justify-between gap-4">
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-slate-300">
                  {engagement.date}
                </span>

                <ArrowUpRight className="h-5 w-5 text-slate-500 transition group-hover:text-white" />
              </div>

              <h3 className="text-2xl font-semibold">
                {engagement.title}
              </h3>

              <div className="mt-4 flex items-center gap-2 text-sm text-blue-400">
                <MapPin className="h-4 w-4" />
                {engagement.location}
              </div>

              <p className="mt-5 text-sm leading-7 text-slate-400">
                {engagement.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}