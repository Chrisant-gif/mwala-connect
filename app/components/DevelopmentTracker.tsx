import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Clock3, MapPin } from "lucide-react";

import { projects } from "../data/projects";
import { visits } from "../data/visits";

export default function DevelopmentTracker() {
  const ongoingProjects = projects.filter(
    (project) => project.status === "ongoing"
  );

  const completedProjects = projects.filter(
    (project) => project.status === "completed"
  );

  const pendingProjects = projects.filter(
    (project) => project.status === "pending"
  );

  const featuredProject =
    projects.find((project) => project.featured) ?? ongoingProjects[0];

  const latestVisit = visits[visits.length - 1];

  if (!featuredProject) {
    return null;
  }

  return (
    <section className="development-tracker" id="tracker">
      <div className="development-tracker-inner">
        <div className="development-tracker-header">
          <div>
            <p className="section-kicker">Development tracker</p>

            <h2>
              What is being
              <span> documented.</span>
            </h2>
          </div>

          <p className="development-tracker-intro">
            A live view of projects currently recorded across Mwala
            Constituency, alongside the latest field activity.
          </p>
        </div>

        <div className="development-tracker-stats">
          <div className="development-tracker-stat">
            <span className="development-tracker-stat-index">01</span>
            <strong>{projects.length.toString().padStart(2, "0")}</strong>
            <span>Projects recorded</span>
          </div>

          <div className="development-tracker-stat">
            <span className="development-tracker-stat-index">02</span>
            <strong>{ongoingProjects.length.toString().padStart(2, "0")}</strong>
            <span>Ongoing</span>
          </div>

          <div className="development-tracker-stat">
            <span className="development-tracker-stat-index">03</span>
            <strong>
              {completedProjects.length.toString().padStart(2, "0")}
            </strong>
            <span>Completed</span>
          </div>

          <div className="development-tracker-stat">
            <span className="development-tracker-stat-index">04</span>
            <strong>{pendingProjects.length.toString().padStart(2, "0")}</strong>
            <span>Pending</span>
          </div>
        </div>

        <div className="development-tracker-records">
          <article className="development-tracker-project">
            <div className="development-tracker-project-top">
              <div>
                <p className="development-tracker-label">
                  Current development record
                </p>

                <p className="development-tracker-location">
                  <MapPin size={14} strokeWidth={1.7} />
                  {featuredProject.location}
                </p>
              </div>

              <span className="development-tracker-status">
                {featuredProject.status}
              </span>
            </div>

            <div className="development-tracker-project-main">
              <div>
                <h3>{featuredProject.title}</h3>

                <p>{featuredProject.description}</p>
              </div>

              <div className="development-tracker-progress">
                <div className="development-tracker-progress-heading">
                  <span>Documented progress</span>
                  <strong>{featuredProject.progress}%</strong>
                </div>

                <div
                  className="development-tracker-progress-track"
                  aria-label={`${featuredProject.progress}% documented progress`}
                >
                  <span
                    style={{
                      width: `${featuredProject.progress}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="development-tracker-project-footer">
              <span>
                <Clock3 size={14} strokeWidth={1.7} />
                {featuredProject.lastVerified ?? "Verification pending"}
              </span>

              <Link href={`/projects/${featuredProject.id}`}>
                View project
                <ArrowUpRight size={15} strokeWidth={1.8} />
              </Link>
            </div>
          </article>

          {latestVisit && (
            <article className="development-tracker-visit">
              <div className="development-tracker-visit-heading">
                <p className="development-tracker-label">Field record</p>

                {latestVisit.status === "completed" ? (
                  <CheckCircle2 size={19} strokeWidth={1.6} />
                ) : (
                  <Clock3 size={19} strokeWidth={1.6} />
                )}
              </div>

              <div className="development-tracker-date">
                <strong>{latestVisit.date}</strong>

                <span>
                  {latestVisit.month} · {latestVisit.day}
                </span>
              </div>

              <h3>{latestVisit.title}</h3>

              <p>{latestVisit.description}</p>

              <div className="development-tracker-visit-meta">
                <span>
                  <MapPin size={14} strokeWidth={1.7} />
                  {latestVisit.location}
                </span>

                <span>{latestVisit.status}</span>
              </div>

              <Link href={`/visits/${latestVisit.id}`}>
                View field record
                <ArrowUpRight size={15} strokeWidth={1.8} />
              </Link>
            </article>
          )}
        </div>
      </div>
    </section>
  );
}