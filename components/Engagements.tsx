"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  MapPin,
} from "lucide-react";

import { engagements } from "../app/data/engagements";

export default function Engagements() {
  const featuredEngagement = engagements.find(
    (engagement) => engagement.status === "upcoming",
  );

  const pastEngagements = engagements.filter(
    (engagement) => engagement.status === "completed",
  );

  return (
    <section id="engagements" className="engagements-section">
      <div className="engagements-inner">
        {/* Section introduction */}
        <div className="engagements-intro">
          <div>
            <p className="section-kicker">03 / ENGAGEMENT</p>

            <h2>
              CONSTITUENCY
              <br />
              <span>ENGAGEMENTS.</span>
            </h2>
          </div>

          <div className="engagements-intro-copy">
            <p>
              A record of constituency visits, community meetings, project
              launches and other public engagements — organised by date,
              location and engagement type.
            </p>

            <div className="engagements-status-label">
              <span />
              Public engagement record
            </div>
          </div>
        </div>

        {/* Next engagement */}
        {featuredEngagement && (
          <section className="engagement-next">
            <div className="engagement-next-header">
              <div>
                <span className="section-label">NEXT ENGAGEMENT</span>
                <p>Upcoming constituency activity</p>
              </div>

              <span className="engagement-index">
                ENGAGEMENT {String(featuredEngagement.id).padStart(2, "0")}
              </span>
            </div>

            <div className="engagement-next-content">
              <div className="engagement-next-main">
                <p className="engagement-type">
                  {featuredEngagement.type}
                </p>

                <h3>{featuredEngagement.title}</h3>

                <p className="engagement-description">
                  {featuredEngagement.description}
                </p>
              </div>

              <div className="engagement-next-details">
                <div>
                  <span>
                    <CalendarDays />
                    Date
                  </span>

                  <strong>{featuredEngagement.date}</strong>
                </div>

                <div>
                  <span>
                    <MapPin />
                    Location
                  </span>

                  <strong>
                    {featuredEngagement.location}
                  </strong>

                  <small>
                    {featuredEngagement.ward} Ward
                  </small>
                </div>
              </div>
            </div>

            <div className="engagement-next-footer">
              <span>STATUS · UPCOMING</span>

              <Link
                href={`/engagements/${featuredEngagement.id}`}
                className="engagement-link"
              >
                View engagement record
                <ArrowUpRight />
              </Link>
            </div>
          </section>
        )}

        {/* Engagement archive */}
        <section className="engagement-archive">
          <div className="engagement-archive-header">
            <div>
              <span className="section-label">
                ENGAGEMENT ARCHIVE
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