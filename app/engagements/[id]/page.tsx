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
        <div className="engagement-record-shell">
          <Link
            href="/#engagements"
            className="engagement-back-link"
          >
            <ArrowLeft size={16} />
            Back to Engagements
          </Link>

          <section className="engagement-not-found">
            <p className="engagement-eyebrow">ENGAGEMENTS</p>

            <h1>Engagement not found.</h1>

            <p>
              The engagement you are looking for could not be found in the
              current records.
            </p>

            <Link
              href="/#engagements"
              className="engagement-primary-link"
            >
              Return to Engagements
              <ArrowUpRight size={16} />
            </Link>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="engagement-record-page">
      <div className="engagement-record-shell">
        {/* Back navigation */}
        <Link
          href="/#engagements"
          className="engagement-back-link"
        >
          <ArrowLeft size={16} />
          Back to Engagements
        </Link>

        {/* Record header */}
        <header className="engagement-record-header">
          <div className="engagement-record-index">
            <span>CONSTITUENCY ENGAGEMENT</span>
            <span>{engagement.status}</span>
          </div>

          <div className="engagement-record-heading">
            <p className="engagement-eyebrow">
              {engagement.type}
            </p>

            <h1>{engagement.title}</h1>

            <p className="engagement-record-description">
              {engagement.description}
            </p>
          </div>
        </header>

        {/* Key information */}
        <section className="engagement-record-meta">
          <div className="engagement-meta-item">
            <div className="engagement-meta-icon">
              <CalendarDays size={18} />
            </div>

            <div>
              <span>Date</span>
              <strong>{engagement.date}</strong>
            </div>
          </div>

          <div className="engagement-meta-item">
            <div className="engagement-meta-icon">
              <MapPin size={18} />
            </div>

            <div>
              <span>Location</span>
              <strong>{engagement.location}</strong>
            </div>
          </div>

          <div className="engagement-meta-item">
            <div className="engagement-meta-icon">
              <MapPin size={18} />
            </div>

            <div>
              <span>Ward</span>
              <strong>{engagement.ward}</strong>
            </div>
          </div>
        </section>

        {/* Record information */}
        <section className="engagement-record-body">
          <div className="engagement-section-label">
            <span>01</span>
            <p>ENGAGEMENT RECORD</p>
          </div>

          <div className="engagement-record-content">
            <h2>Constituency engagement</h2>

            <p>
              This record documents an engagement associated with
              development and public activity within Mwala Constituency.
            </p>

            <div className="engagement-detail-grid">
              <div>
                <span>Engagement type</span>
                <strong>{engagement.type}</strong>
              </div>

              <div>
                <span>Status</span>
                <strong>{engagement.status}</strong>
              </div>

              <div>
                <span>Ward</span>
                <strong>{engagement.ward}</strong>
              </div>

              <div>
                <span>Location</span>
                <strong>{engagement.location}</strong>
              </div>
            </div>
          </div>
        </section>

        {/* Media */}
        <section className="engagement-media-section">
          <div className="engagement-section-label">
            <span>02</span>
            <p>FIELD DOCUMENTATION</p>
          </div>

          <div className="engagement-media-placeholder">
            <div>
              <span>PHOTOS & VIDEO</span>

              <h2>Documentation will appear here.</h2>

              <p>
                Field photographs, video and supporting documentation can
                be added once verified material is available.
              </p>
            </div>
          </div>
        </section>

        {/* Footer navigation */}
        <div className="engagement-record-footer">
          <Link
            href="/#engagements"
            className="engagement-footer-link"
          >
            <ArrowLeft size={16} />
            All engagements
          </Link>
        </div>
      </div>
    </main>
  );
}