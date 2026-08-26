"use client";

import { constituencyStatistics } from "../data/statistics";

const statistics = [
  {
    number: "01",
    value: String(constituencyStatistics.wards),
    label: "Wards",
  },
  {
    number: "02",
    value:
      constituencyStatistics.projects > 0
        ? String(constituencyStatistics.projects)
        : "—",
    label: "Development Projects",
  },
  {
    number: "03",
    value: constituencyStatistics.residentsServed,
    label: "Residents Served",
  },
];

const developmentStatus = [
  {
    number: "01",
    value: constituencyStatistics.ongoingProjects,
    label: "Ongoing",
  },
  {
    number: "02",
    value: constituencyStatistics.completedProjects,
    label: "Completed",
  },
  {
    number: "03",
    value: constituencyStatistics.pendingProjects,
    label: "Pending",
  },
];

function formatProjectCount(value: number) {
  return value > 0 ? String(value) : "—";
}

export default function Stats() {
  const allocationIsVerified =
    constituencyStatistics.totalAllocation !== "To be verified";

  return (
    <>
      {/* Overview */}
      <section className="overview-section" id="overview">
        <div className="section-number">01 / OVERVIEW</div>

        <div className="overview-content">
          <p className="section-kicker">The constituency</p>

          <h2>
            DEVELOPMENT
            <br />
            <span>WITH PURPOSE.</span>
          </h2>

          <p className="overview-copy">
            Mwala Constituency is made up of six wards, each with unique
            priorities and development needs. Mwala Connect brings those
            projects together so residents can follow what is happening in
            their communities.
          </p>

          <div className="source-note">
            <span className="source-dot" />

            Development information is being organised by project, ward and
            implementation status.
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="stats-section">
        <div className="stats-intro">
          <span>MWALA AT A GLANCE</span>

          <span>
            FY {constituencyStatistics.financialYear}
          </span>
        </div>

        <div className="stats-grid">
          {statistics.map((stat) => (
            <article className="stat-card" key={stat.number}>
              <span className="stat-index">{stat.number}</span>

              <strong>{stat.value}</strong>

              <span>{stat.label}</span>
            </article>
          ))}
        </div>

        {/* Development Status */}
        <div className="development-status">
          <div className="development-status-heading">
            <div>
              <span>DEVELOPMENT STATUS</span>

              <p>
                Current project records by implementation stage.
              </p>
            </div>

            <span>PROJECTS</span>
          </div>

          <div className="development-status-grid">
            {developmentStatus.map((item) => (
              <article
                className="development-status-card"
                key={item.number}
              >
                <span className="stat-index">{item.number}</span>

                <strong>
                  {formatProjectCount(item.value)}
                </strong>

                <span>{item.label}</span>
              </article>
            ))}
          </div>
        </div>

        {/* Financial Overview */}
        <div className="financial-overview">
          <div className="financial-heading">
            <span>PUBLIC INVESTMENT</span>

            <span>
              FY {constituencyStatistics.financialYear}
            </span>
          </div>

          <div className="financial-main">
            <div>
              <span>Total allocation</span>

              {allocationIsVerified ? (
                <strong>
                  {constituencyStatistics.totalAllocation}
                </strong>
              ) : (
                <p className="financial-pending">
                  To be verified
                </p>
              )}
            </div>

            <div className="financial-status">
              <span className="source-dot" />

              <p>
                Official financial figures will be published here
                once verified against the relevant public records.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}