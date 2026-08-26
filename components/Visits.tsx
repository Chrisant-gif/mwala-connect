"use client";

import Link from "next/link";
import {
  CalendarDays,
  Clock,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

import { visits } from "../app/data/visits";

export default function Visits() {
  const upcomingVisits = visits.filter(
    (visit) => visit.status === "upcoming",
  );

  return (
    <section
      id="visits"
      className="bg-white px-6 py-20 sm:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
              Constituency Engagements
            </p>

            <h2 className="max-w-2xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              Where development is happening next.
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
              Follow upcoming constituency visits, project launches and
              public engagements across Mwala.
            </p>
          </div>

          <div className="hidden md:block">
            <CalendarDays className="h-12 w-12 text-slate-200" />
          </div>
        </div>

        {/* Upcoming visits */}
        {upcomingVisits.length > 0 ? (
          <div className="space-y-6">
            {upcomingVisits.map((visit) => (
              <Link
                key={`${visit.date}-${visit.title}`}
                href={`/visits/${visit.id}`}
                className="group block overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="grid lg:grid-cols-[220px_1fr]">
                  {/* Date */}
                  <div className="flex flex-row items-center gap-5 bg-slate-950 p-8 text-white lg:flex-col lg:items-start lg:justify-center">
                    <div>
                      <p className="text-5xl font-bold tracking-tight">
                        {visit.date}
                      </p>

                      <p className="mt-1 text-sm font-semibold tracking-[0.2em] text-slate-400">
                        {visit.month}
                      </p>
                    </div>

                    <div className="h-px w-12 bg-slate-700 lg:w-16" />

                    <p className="text-sm font-medium text-slate-300">
                      {visit.day}
                    </p>
                  </div>

                  {/* Details */}
                  <div className="p-7 sm:p-9 lg:p-10">
                    <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                      <div>
                        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                          Upcoming engagement
                        </p>

                        <h3 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                          {visit.title}
                        </h3>

                        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                          {visit.description}
                        </p>
                      </div>

                      <div className="hidden rounded-full bg-white p-3 text-slate-400 shadow-sm md:block">
                        <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </div>
                    </div>

                    <div className="mt-8 grid gap-4 border-t border-slate-200 pt-6 sm:grid-cols-2">
                      <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-white p-2.5 shadow-sm">
                          <Clock className="h-5 w-5 text-blue-600" />
                        </div>

                        <div>
                          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                            Time
                          </p>

                          <p className="mt-1 font-semibold text-slate-800">
                            {visit.time}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-white p-2.5 shadow-sm">
                          <MapPin className="h-5 w-5 text-blue-600" />
                        </div>

                        <div>
                          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                            Location
                          </p>

                          <p className="mt-1 font-semibold text-slate-800">
                            {visit.location}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-10 text-center">
            <CalendarDays className="mx-auto h-10 w-10 text-slate-300" />

            <h3 className="mt-5 text-xl font-semibold text-slate-900">
              No upcoming engagements
            </h3>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-500">
              Upcoming constituency visits, project launches and public
              engagements will appear here as they are added.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}