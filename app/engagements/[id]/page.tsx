import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  MapPin,
} from "lucide-react";

import { engagements } from "../../data/engagements";

interface EngagementDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EngagementDetailsPage({
  params,
}: EngagementDetailsPageProps) {
  const { id } = await params;

  const engagement = engagements.find((item) => item.id === id);

  if (!engagement) {
    return (
      <main className="engagement-record-page">
        <div className="engagement-record-not-found">
          <div>
            <p className="section-kicker">ENGAGEMENTS</p>

            <h1>Engagement not found.</h1>

            <p>
              The engagement you are looking for could not be found in the
              current records.
            </p>

            <Link
              href="/#engagements"
              className="engagement-record-button"
            >
              <ArrowLeft size={15} />
              Return to Engagements
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="engagement-record-page">
      {/* =====================================================
          HEADER
          ===================================================== */}

      <header className="engagement-record-header">
        <div className="engagement-record-header-inner">
          <Link
            href="/#engagements"
            className="engagement-record-back"
          >
            <ArrowLeft size={15} />
            Back to Engagements
          </Link>

          <span className="engagement-record-header-label">
            MWALA CONNECT · ENGAGEMENT RECORD
          </span>
        </div>
      </header>

      {/* =====================================================
          HERO
          ===================================================== */}

      <section className="engagement-record-hero">
        <div className="engagement-record-inner">
          <div className="engagement-record-top">
            <span>CONSTITUENCY ENGAGEMENT</span>

            <span className="engagement-record-status">
              <span />
              {engagement.status}
            </span>
          </div>

          <div className="engagement-record-hero-content">
            <p className="engagement-record-location">
              {engagement.type} · {engagement.ward}
            </p>

            <h1>{engagement.title}</h1>

            <p className="engagement-record-hero-description">
              {engagement.description}
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          INFORMATION
          ===================================================== */}

      <section className="engagement-record-section">
        <div className="engagement-record-inner">
          <p className="engagement-record-section-heading">
            ENGAGEMENT INFORMATION
          </p>

          <div className="engagement-record-information-grid">
            <article>
              <span>Date</span>

              <strong>{engagement.date}</strong>
            </article>

            <article>
              <span>Location</span>

              <strong>{engagement.location}</strong>
            </article>

            <article>
              <span>Ward</span>

              <strong>{engagement.ward}</strong>
            </article>

            <article>
              <span>Status</span>

              <strong>{engagement.status}</strong>
            </article>
          </div>
        </div>
      </section>

      {/* =====================================================
          RECORD
          ===================================================== */}

      <section className="engagement-record-section">
        <div className="engagement-record-inner">
          <p className="engagement-record-section-heading">
            01 · ENGAGEMENT RECORD
          </p>

          <div className="engagement-record-overview">
            <div>
              <h2>Constituency engagement</h2>

              <p>
                This record documents an engagement associated with
                development and public activity within Mwala Constituency.
              </p>
            </div>

            <div className="engagement-record-source">
              <span />
              <span>
                Mwala Connect
                <br />
                Constituency field record
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FIELD DOCUMENTATION
          ===================================================== */}

      <section className="engagement-record-media-section">
        <div className="engagement-record-inner">
          <div className="engagement-record-media-heading">
            <h2 className="engagement-record-media-title">
  <span className="engagement-record-media-title-line">
    Field
  </span>
  <br />
  <span className="engagement-record-media-title-line">
    documentation.
  </span>
</h2>

            <p>
              Photographs, video and supporting material from this
              engagement can be added here once verified field media is
              available.
            </p>
          </div>

          <div className="engagement-record-media-grid">
            <article className="engagement-record-media-card">
              <div className="engagement-record-media-placeholder">
                <span>PHOTOS</span>

                <strong>
                  Field photographs will appear here.
                </strong>

                <p>
                  Verified photographs from the engagement can be added to
                  this record.
                </p>
              </div>

              <div className="engagement-record-media-details">
                <h3>Photo documentation</h3>

                <p>
                  Visual documentation from the field.
                </p>

                <span>MEDIA · TO BE ADDED</span>
              </div>
            </article>

            <article className="engagement-record-media-card">
              <div className="engagement-record-media-placeholder">
                <span>VIDEO</span>

                <strong>
                  Video documentation will appear here.
                </strong>

                <p>
                  Supporting video can be added once verified material is
                  available.
                </p>
              </div>

              <div className="engagement-record-media-details">
                <h3>Video documentation</h3>

                <p>
                  Supporting footage from the engagement.
                </p>

                <span>MEDIA · TO BE ADDED</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* =====================================================
          RECORD DETAILS
          ===================================================== */}

      <section className="engagement-record-section engagement-record-section-green">
        <div className="engagement-record-inner">
          <p className="engagement-record-section-heading">
            02 · RECORD DETAILS
          </p>

          <div className="engagement-record-details">
            <div>
              <CalendarDays size={20} />

              <span>Date</span>

              <strong>{engagement.date}</strong>
            </div>

            <div>
              <MapPin size={20} />

              <span>Location</span>

              <strong>{engagement.location}</strong>
            </div>

            <div>
              <MapPin size={20} />

              <span>Ward</span>

              <strong>{engagement.ward}</strong>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FOOTER
          ===================================================== */}

      <footer className="engagement-record-footer">
        <div className="engagement-record-inner">
          <div>
            <span>MWALA CONNECT</span>

            <h2>
              Engagements
              <br />
              <em>in the field.</em>
            </h2>
          </div>

          <Link
            href="/#engagements"
            className="engagement-record-button"
          >
            All engagements
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </footer>
    </main>
  );
}