import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
} from "lucide-react";

import { projects } from "../../data/projects";
import { projectMedia } from "../../data/project-media";
import { visits } from "../../data/visits";

interface ProjectDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

function getVerificationLabel(
  status: "verified" | "in_progress" | "unverified",
) {
  switch (status) {
    case "verified":
      return "Verified";

    case "in_progress":
      return "Verification in progress";

    case "unverified":
      return "Not yet verified";

    default:
      return status;
  }
}

function getStatusLabel(
  status: "ongoing" | "completed" | "pending",
) {
  switch (status) {
    case "ongoing":
      return "Ongoing";

    case "completed":
      return "Completed";

    case "pending":
      return "Pending";

    default:
      return status;
  }
}

export default async function ProjectDetailsPage({
  params,
}: ProjectDetailsPageProps) {
  const { id } = await params;

  const project = projects.find(
    (item) => item.id === Number(id),
  );

  if (!project) {
    return (
      <main className="project-record-page">
        <section className="project-record-not-found">
          <div>
            <p className="section-kicker">
              Development Projects
            </p>

            <h1>
              PROJECT
              <br />
              NOT FOUND.
            </h1>

            <p>
              The project record you are looking for could not
              be found.
            </p>

            <Link
              href="/#projects"
              className="project-record-button"
            >
              <ArrowLeft size={16} />
              Back to Projects
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const verificationLabel = getVerificationLabel(
    project.verificationStatus,
  );

  const statusLabel = getStatusLabel(project.status);

  const isVerified =
    project.verificationStatus === "verified";

  const relatedVisits = visits.filter(
    (visit) => visit.projectId === project.id,
  );

  const relatedMedia = projectMedia.filter(
    (media) => media.projectId === project.id,
  );

  return (
    <main className="project-record-page">
      {/* Header */}
      <header className="project-record-header">
        <div className="project-record-header-inner">
          <Link
            href="/#projects"
            className="project-record-back"
          >
            <ArrowLeft size={15} />
            <span>Back to Projects</span>
          </Link>

          <span className="project-record-header-label">
            PROJECT RECORD
          </span>
        </div>
      </header>

      {/* Hero */}
      <section className="project-record-hero">
        <div className="project-record-inner">
          <div className="project-record-top">
            <span>
              PROJECT {String(project.id).padStart(2, "0")}
            </span>

            <span className="project-record-status">
              <span />
              {statusLabel}
            </span>
          </div>

          <div className="project-record-hero-content">
            <p className="project-record-location">
              {project.location} · {project.ward}
            </p>

            <h1>{project.title}</h1>

            <p className="project-record-hero-description">
              {project.description}
            </p>
          </div>
        </div>
      </section>

      {/* Project Information */}
      <section className="project-record-section">
        <div className="project-record-inner">
          <div className="project-record-section-heading">
            <span>01 / PROJECT INFORMATION</span>
          </div>

          <div className="project-record-information-grid">
            <article>
              <span>Budget</span>
              <strong>{project.budget}</strong>
            </article>

            <article>
              <span>Implementation</span>

              <strong>{project.progress}%</strong>

              <div className="project-record-progress">
                <span
                  style={{
                    width: `${project.progress}%`,
                  }}
                />
              </div>
            </article>

            <article>
              <span>Start</span>
              <strong>{project.startDate}</strong>
            </article>

            <article>
              <span>Expected completion</span>
              <strong>
                {project.expectedCompletion}
              </strong>
            </article>
          </div>
        </div>
      </section>

      {/* Verification */}
      <section className="project-record-section project-record-section-green">
        <div className="project-record-inner">
          <div className="project-record-verification">
            {isVerified ? (
              <CheckCircle2 size={25} />
            ) : (
              <Clock3 size={25} />
            )}

            <div>
              <span>INFORMATION STATUS</span>

              <h2>{verificationLabel}</h2>

              <p>
                Project information is presented according to
                the current source and verification status.
                Details will be updated when supporting records
                are confirmed.
              </p>

              {project.lastVerified && (
                <small>
                  Last verified: {project.lastVerified}
                </small>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="project-record-section">
        <div className="project-record-inner">
          <div className="project-record-section-heading">
            <span>02 / PROJECT OVERVIEW</span>
          </div>

          <div className="project-record-overview">
            <p>{project.description}</p>

            <div className="project-record-source">
              <span />
              <span>{project.source}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Media */}
      <section className="project-record-section project-record-media-section">
        <div className="project-record-inner">
          <div className="project-record-section-heading">
            <span>03 / PROJECT MEDIA</span>
          </div>

          <div className="project-record-media-heading">
            <div>
              <h2>
                FIELD
                <br />
                <span>DOCUMENTATION.</span>
              </h2>

              <p>
                Photographs, video and supporting documentation
                will be added as verified project material becomes
                available.
              </p>
            </div>
          </div>

          {relatedMedia.length > 0 ? (
            <div className="project-record-media-grid">
              {relatedMedia.map((media) => (
                <article
                  className="project-record-media-card"
                  key={media.id}
                >
                  {media.url ? (
                    <div className="project-record-media-image">
                      {/* Verified media will be rendered here. */}
                    </div>
                  ) : (
                    <div className="project-record-media-placeholder">
                      <span>MEDIA</span>

                      <strong>{media.title}</strong>

                      <p>Media awaiting upload</p>
                    </div>
                  )}

                  <div className="project-record-media-details">
                    <h3>{media.title}</h3>

                    <p>{media.description}</p>

                    {media.date && (
                      <span>{media.date}</span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="project-record-empty">
              <span>NO MEDIA AVAILABLE</span>

              <p>
                Project photographs, documents and video will
                appear here when verified material is added.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Related Engagements */}
      <section className="project-record-section">
        <div className="project-record-inner">
          <div className="project-record-section-heading">
            <span>04 / CONSTITUENCY ENGAGEMENTS</span>
          </div>

          <div className="project-record-engagement-heading">
            <div>
              <h2>
                RELATED
                <br />
                <span>ENGAGEMENTS.</span>
              </h2>

              <p>
                Visits and public engagements connected to this
                project.
              </p>
            </div>

            <span>
              {relatedVisits.length}{" "}
              {relatedVisits.length === 1
                ? "engagement"
                : "engagements"}
            </span>
          </div>

          {relatedVisits.length > 0 ? (
            <div className="project-record-engagement-list">
              {relatedVisits.map((visit) => (
                <Link
                  key={visit.id}
                  href={`/visits/${visit.id}`}
                  className="project-record-engagement"
                >
                  <div>
                    <span>
                      {visit.type.replaceAll("_", " ")}
                    </span>

                    <h3>{visit.title}</h3>

                    <div className="project-record-engagement-meta">
                      <span>
                        <CalendarDays size={14} />
                        {visit.date} {visit.month} · {visit.day}
                      </span>

                      <span>
                        <Clock3 size={14} />
                        {visit.time}
                      </span>

                      <span>
                        <MapPin size={14} />
                        {visit.location}
                      </span>
                    </div>
                  </div>

                  <ArrowUpRight size={20} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="project-record-empty">
              <span>NO ENGAGEMENTS LINKED</span>

              <p>
                No constituency engagements have been linked
                to this project yet.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Timeline */}
      <section className="project-record-section project-record-timeline-section">
        <div className="project-record-inner">
          <div className="project-record-section-heading">
            <span>05 / PROJECT TIMELINE</span>
          </div>

          <div className="project-record-timeline">
            <div>
              <CalendarDays size={18} />

              <span>Start</span>

              <strong>{project.startDate}</strong>
            </div>

            <div>
              <CalendarDays size={18} />

              <span>Expected Completion</span>

              <strong>
                {project.expectedCompletion}
              </strong>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="project-record-footer">
        <div className="project-record-inner">
          <div>
            <span>MWALA CONNECT</span>

            <h2>
              FOLLOW THE
              <br />
              <em>DEVELOPMENT.</em>
            </h2>
          </div>

          <Link
            href="/#projects"
            className="project-record-button"
          >
            Back to projects
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </footer>
    </main>
  );
}