import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
} from "lucide-react";

import { visits } from "../../data/visits";
import { projects } from "../../data/projects";

interface VisitDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

function getVisitTypeLabel(type: string) {
  switch (type) {
    case "project_launch":
      return "Project Launch";

    case "site_visit":
      return "Site Visit";

    case "community_engagement":
      return "Community Engagement";

    case "public_event":
      return "Public Event";

    default:
      return type.replaceAll("_", " ");
  }
}

function getStatusLabel(status: string) {
  switch (status) {
    case "upcoming":
      return "Upcoming";

    case "ongoing":
      return "Ongoing";

    case "completed":
      return "Completed";

    default:
      return status;
  }
}

export default async function VisitDetailsPage({
  params,
}: VisitDetailsPageProps) {
  const { id } = await params;

  const visit = visits.find(
    (item) => item.id === Number(id),
  );

  if (!visit) {
    return (
      <main className="visit-record-page">
        <section className="visit-record-not-found">
          <div>
            <p className="section-kicker">
              Constituency Engagements
            </p>

            <h1>
              VISIT
              <br />
              NOT FOUND.
            </h1>

            <p>
              The engagement record you are looking for could not
              be found.
            </p>

            <Link
              href="/#visits"
              className="visit-record-button"
            >
              <ArrowLeft size={16} />
              Back to Engagements
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const relatedProject = visit.projectId
    ? projects.find(
        (project) => project.id === visit.projectId,
      )
    : undefined;

  const statusLabel = getStatusLabel(visit.status);
  const typeLabel = getVisitTypeLabel(visit.type);

  return (
    <main className="visit-record-page">
      {/* Header */}
      <header className="visit-record-header">
        <div className="visit-record-header-inner">
          <Link
            href="/#visits"
            className="visit-record-back"
          >
            <ArrowLeft size={15} />
            <span>Back to Engagements</span>
          </Link>

          <span className="visit-record-header-label">
            ENGAGEMENT RECORD
          </span>
        </div>
      </header>

      {/* Hero */}
      <section className="visit-record-hero">
        <div className="visit-record-inner">
          <div className="visit-record-top">
            <span>
              ENGAGEMENT {String(visit.id).padStart(2, "0")}
            </span>

            <span className="visit-record-status">
              <span />
              {statusLabel}
            </span>
          </div>

          <div className="visit-record-hero-content">
            <p className="visit-record-type">
              {typeLabel}
            </p>

            <h1>{visit.title}</h1>

            <p className="visit-record-description">
              {visit.description}
            </p>
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="visit-record-section">
        <div className="visit-record-inner">
          <div className="visit-record-section-heading">
            <span>01 / ENGAGEMENT SCHEDULE</span>
          </div>

          <div className="visit-record-schedule">
            <article className="visit-record-date-card">
              <span>DATE</span>

              <strong>{visit.date}</strong>

              <b>{visit.month}</b>

              <small>{visit.day}</small>
            </article>

            <article>
              <CalendarDays size={19} />

              <span>Date</span>

              <strong>
                {visit.date} {visit.month} · {visit.day}
              </strong>
            </article>

            <article>
              <Clock3 size={19} />

              <span>Time</span>

              <strong>{visit.time}</strong>
            </article>

            <article>
              <MapPin size={19} />

              <span>Location</span>

              <strong>{visit.location}</strong>
            </article>
          </div>
        </div>
      </section>

      {/* Location & Ward */}
      <section className="visit-record-section visit-record-section-green">
        <div className="visit-record-inner">
          <div className="visit-record-location-block">
            <div>
              <span>FIELD LOCATION</span>

              <h2>{visit.location}</h2>

              <p>
                {visit.ward} Ward · Mwala Constituency ·
                Machakos County
              </p>
            </div>

            <div className="visit-record-location-icon">
              <MapPin size={30} />
            </div>
          </div>
        </div>
      </section>

      {/* Engagement Overview */}
      <section className="visit-record-section">
        <div className="visit-record-inner">
          <div className="visit-record-section-heading">
            <span>02 / ENGAGEMENT OVERVIEW</span>
          </div>

          <div className="visit-record-overview">
            <div>
              <p className="section-kicker">
                Why this engagement matters
              </p>

              <h2>
                DEVELOPMENT
                <br />
                <span>IN THE FIELD.</span>
              </h2>
            </div>

            <div>
              <p>
                {visit.description}
              </p>

              <div className="visit-record-source">
                <span />
                <span>
                  Mwala Connect · Constituency Engagement Record
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Project */}
      {relatedProject && (
        <section className="visit-record-section">
          <div className="visit-record-inner">
            <div className="visit-record-section-heading">
              <span>03 / RELATED PROJECT</span>
            </div>

            <Link
              href={`/projects/${relatedProject.id}`}
              className="visit-record-project"
            >
              <div>
                <span>
                  {relatedProject.location} ·{" "}
                  {relatedProject.ward}
                </span>

                <h2>{relatedProject.title}</h2>

                <p>
                  {relatedProject.description}
                </p>
              </div>

              <div className="visit-record-project-arrow">
                <ArrowUpRight size={21} />
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Information Status */}
      <section className="visit-record-section visit-record-status-section">
        <div className="visit-record-inner">
          <div className="visit-record-verification">
            <CheckCircle2 size={24} />

            <div>
              <span>ENGAGEMENT STATUS</span>

              <h2>{statusLabel}</h2>

              <p>
                This engagement record reflects the current
                schedule information available to Mwala Connect.
                Details may be updated as the field schedule
                develops.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="visit-record-footer">
        <div className="visit-record-inner">
          <div>
            <span>MWALA CONNECT</span>

            <h2>
              FOLLOW THE
              <br />
              <em>ENGAGEMENT.</em>
            </h2>
          </div>

          <Link
            href="/#visits"
            className="visit-record-button"
          >
            Back to engagements
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </footer>
    </main>
  );
}