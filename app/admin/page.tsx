
import Link from "next/link";
import { getConstituencyStatistics } from "../../lib/supabase/data";
import { createClient } from "../../lib/supabase/server";

export const dynamic = "force-dynamic";

function StatCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string | number;
  detail: string;
}) {
  return (
    <section className="rounded-xl border border-[#e2dfd5] bg-white p-5 sm:p-6">
      <p className="text-sm font-medium text-[#6e7069]">{label}</p>
      <p className="mt-3 break-words text-3xl font-bold tracking-tight">
        {value}
      </p>
      <p className="mt-2 text-sm leading-5 text-[#777970]">{detail}</p>
    </section>
  );
}

export default async function AdminDashboardPage() {
  const [statistics, supabase] = await Promise.all([
    getConstituencyStatistics(),
    createClient(),
  ]);

  const { data: memberCount, error: memberCountError } =
    await supabase.rpc("count_active_members");

  const cards = [
    {
      label: "Wards",
      value: statistics.wards,
      detail: "Constituency wards in the database",
    },
    {
      label: "Projects",
      value: statistics.projects,
      detail: "Projects currently recorded",
    },
    {
      label: "Ongoing projects",
      value: statistics.ongoingProjects,
      detail: "Recorded as ongoing",
    },
    {
      label: "Completed projects",
      value: statistics.completedProjects,
      detail: "Recorded as completed",
    },
    {
      label: "Active members",
      value: memberCountError
        ? "Unavailable"
        : Number(memberCount ?? 0).toLocaleString("en-KE"),
      detail: memberCountError
        ? "The member count could not be loaded"
        : "Active member profiles",
    },
    {
      label: "Latest allocation",
      value: statistics.totalAllocation,
      detail: statistics.financialYear,
    },
  ];

  return (
    <div className="mx-auto max-w-7xl">
      <header className="flex flex-col gap-5 border-b border-[#dcd8cd] pb-7 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#55705d]">
            Administration
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Dashboard overview
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#6e7069]">
            Monitor development projects, public investment,
            field activities, and community membership across
            Mwala Constituency.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex w-fit items-center rounded-lg border border-[#d7d8d0] bg-white px-4 py-2.5 text-sm font-semibold transition hover:bg-[#f0eee7]"
        >
          View public website
        </Link>
      </header>

      <section className="mt-8" aria-labelledby="overview-stats">
        <div className="mb-4">
          <h2 id="overview-stats" className="text-lg font-bold">
            Constituency snapshot
          </h2>
          <p className="mt-1 text-sm text-[#6e7069]">
            Figures loaded from the current database records.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => (
            <StatCard
              key={card.label}
              label={card.label}
              value={card.value}
              detail={card.detail}
            />
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-xl border border-[#e2dfd5] bg-white p-5 sm:p-6">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#55705d]">
          Next stage
        </p>

        <h2 className="mt-2 text-xl font-bold">
          Development management
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6e7069]">
          The existing database already contains projects, wards,
          allocations, field activities, and project media. The next
          stage is to add secure management screens for these records
          and a member directory for authorized administrators.
        </p>
      </section>
    </div>
  );
}
