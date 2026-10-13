"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  MapPin,
} from "lucide-react";

import { engagements } from "../data/engagements";

export default function Engagements() {
  const pastEngagements = engagements.filter(
    (engagement) => engagement.status === "completed",
  );

  return (
    <section id="engagements" className="engagements-section">
      <div className="engagements-inner">
        {/* Section introduction */}
        <div className="engagements-intro">
          <div>
            <p className="section-kicker">
              Recent Engagements
            </p>

            <h2>
              FIELD
              <br />
              <span>RECORDS.</span>
            </h2>
          </div>

          <div className="engagements-intro-copy">
            <p>
              A record of completed constituency visits, community meetings,
              project launches and other public engagements, organised by
              date, location and engagement type.
            </p>

            <div className="engagements-status-label">
              <span />
              Completed field records
            </div>
          </div>
        </div>

        {/* Engagement archive */}
        <section className="engagement-archive">
          <div className="engagement-archive-header">
            <div>
              <span className="section-label">
                RECENT ENGAGEMENTS
              </span>

              <p>
                {pastEngagements.length}{" "}
                {pastEngagements.length === 1
                  ? "record"
                  : "records"}{" "}
                currently displayed
              </p>
            </div>

            <span className="engagement-archive-index">
              PUBLIC RECORDS
            </span>
          </div>

          {pastEngagements.length > 0 ? (
            <div className="engagement-grid">
              {pastEngagements.map((engagement, index) => (
                <Link
                  key={engagement.id}
                  href={`/engagements/${engagement.id}`}
                  className="engagement-card"
                >
                  <div className="engagement-card-top">
                    <span>
                      RECORD{" "}
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <ArrowUpRight className="engagement-card-arrow" />
                  </div>

                  <div className="engagement-card-main">
                    <p>{engagement.type}</p>

                    <h3>{engagement.title}</h3>

                    <div className="engagement-card-location">
                      <MapPin />

                      <span>
                        {engagement.location}
                      </span>

                      <small>
                        {engagement.ward} Ward
                      </small>
                    </div>
                  </div>

                  <div className="engagement-card-bottom">
                    <span>
                      <CalendarDays />
                      {engagement.date}
                    </span>

                    <span>COMPLETED</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="engagement-empty">
              <span>NO COMPLETED ENGAGEMENTS</span>

              <h3>No records yet.</h3>

              <p>
                Completed constituency engagements will appear here as
                verified records are added to Mwala Connect.
              </p>
            </div>
          )}
        </section>
      </div>
    </section>
  );
}