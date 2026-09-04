import type { Ward, WardProjectStatus } from "../data/wards";

interface WardRecordProps {
  ward: Ward;
}

function getStatusLabel(status: WardProjectStatus) {
  switch (status) {
    case "completed":
      return "Completed";
    case "ongoing":
      return "Ongoing";
    case "upcoming":
      return "Upcoming";
  }
}

function getStatusClass(status: WardProjectStatus) {
  switch (status) {
    case "completed":
      return "ward-project-status ward-project-status-completed";
    case "ongoing":
      return "ward-project-status ward-project-status-ongoing";
    case "upcoming":
      return "ward-project-status ward-project-status-upcoming";
  }
}

export default function WardRecord({ ward }: WardRecordProps) {
  const completed = ward.projects.filter(
    (project) => project.status === "completed"
  ).length;

  const ongoing = ward.projects.filter(
    (project) => project.status === "ongoing"
  ).length;

  const upcoming = ward.projects.filter(
    (project) => project.status === "upcoming"
  ).length;

  return (
    <section className="ward-record-page">
      <div className="ward-record-container">
        <div className="ward-record-header">
          <div>
            <span className="ward-record-kicker">
              WARD {String(ward.id).padStart(2, "0")} / MWALA CONSTITUENCY
            </span>

            <h1>{ward.name}</h1>
          </div>

          <span className="ward-record-label">WARD RECORD</span>
        </div>

        <div className="ward-record-intro">
          <p>{ward.description}</p>

          <span>
            {ward.projects.length} DEVELOPMENT{" "}
            {ward.projects.length === 1 ? "PROJECT" : "PROJECTS"}
          </span>
        </div>

        <div className="ward-record-stats">
          <div>
            <span>COMPLETED</span>
            <strong>{completed}</strong>
          </div>

          <div>
            <span>ONGOING</span>
            <strong>{ongoing}</strong>
          </div>

          <div>
            <span>UPCOMING</span>
            <strong>{upcoming}</strong>
          </div>
        </div>

        <div className="ward-record-projects">
          <div className="ward-record-section-heading">
            <span>DEVELOPMENT ACTIVITY</span>
            <span>PROJECT REGISTER</span>
          </div>

          {ward.projects.length === 0 ? (
            <div className="ward-record-empty">
              <span>NO PROJECT RECORDS YET</span>
              <p>
                Development information for this ward is being progressively
                documented and verified.
              </p>
            </div>
          ) : (
            <div className="ward-project-list">
              {ward.projects.map((project, index) => (
                <article className="ward-project" key={project.id}>
                  <div className="ward-project-index">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="ward-project-content">
                    <div className="ward-project-topline">
                      <span>{project.category}</span>

                      <span className={getStatusClass(project.status)}>
                        {getStatusLabel(project.status)}
                      </span>
                    </div>

                    <h2>{project.title}</h2>

                    <p>{project.description}</p>

                    <div className="ward-project-detail">
                      <span>KEY DETAIL</span>
                      <p>{project.keyDetail}</p>
                    </div>

                    <div className="ward-project-meta">
                      <div>
                        <span>SOURCE</span>
                        <strong>{project.source}</strong>
                      </div>

                      <div>
                        <span>LAST VERIFIED</span>
                        <strong>{project.lastVerified}</strong>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}