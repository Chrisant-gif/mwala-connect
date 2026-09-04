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

export default function Stats() {
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

          <span>FY {constituencyStatistics.financialYear}</span>
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

        {/* Development Archive */}
        <div className="development-archive">
          <div className="development-archive-header">
            <div>
              <span className="development-archive-kicker">
                DEVELOPMENT ARCHIVE
              </span>

              <h3>Current project records</h3>
            </div>

            <span className="development-archive-index">
              02 / DEVELOPMENT STATUS
            </span>
          </div>

          <div className="development-archive-intro">
            <p>
              Current project records across Mwala Constituency, organised by
              implementation stage.
            </p>

            <span>
              {constituencyStatistics.projects} TOTAL PROJECTS
            </span>
          </div>

          <div className="development-archive-grid">
            {developmentStatus.map((stat) => (
              <article
                className="development-archive-card"
                key={stat.number}
              >
                <div className="development-archive-card-top">
                  <span>{stat.number}</span>
                  <span>RECORD</span>
                </div>

                <strong>{stat.value}</strong>

                <div className="development-archive-card-bottom">
                  <span>{stat.label}</span>
                  <span className="archive-status-dot" />
                </div>
              </article>
            ))}
          </div>

          {/* Public Investment */}
          {/* Public Investment */}
<div className="public-investment" id="money">
            <div className="financial-heading">
              <span>PUBLIC INVESTMENT</span>

              <span>
                FY {constituencyStatistics.financialYear}
              </span>
            </div>

            <div className="financial-main">
              <div>
                <span>Total allocation</span>

                <strong>
                  {constituencyStatistics.totalAllocation}
                </strong>
              </div>

              <div className="financial-status">
                <span className="source-dot" />

                <p>
                  Official allocation for FY 2026 / 2027 as published
                  by NGCDF Mwala Constituency.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}