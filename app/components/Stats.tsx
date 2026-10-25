
import type { ConstituencyStatistics } from "../data/statistics";

interface StatsProps {
  statistics: ConstituencyStatistics;
}

export default function Stats({ statistics }: StatsProps) {
  const headlineStatistics = [
    {
      number: "01",
      value: String(statistics.wards),
      label: "Wards",
    },
    {
      number: "02",
      value: statistics.projects > 0 ? String(statistics.projects) : "—",
      label: "Development Projects",
    },
    {
      number: "03",
      value: statistics.residentsServed,
      label: "Residents Served",
    },
  ];

  const developmentStatus = [
    {
      number: "01",
      value: statistics.ongoingProjects,
      label: "Ongoing",
    },
    {
      number: "02",
      value: statistics.completedProjects,
      label: "Completed",
    },
    {
      number: "03",
      value: statistics.pendingProjects,
      label: "Pending",
    },
  ];

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

          <span>FY {statistics.financialYear}</span>
        </div>

        <div className="stats-grid">
          {headlineStatistics.map((stat) => (
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

            <span>{statistics.projects} TOTAL PROJECTS</span>
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
        </div>
      </section>
    </>
  );
}
