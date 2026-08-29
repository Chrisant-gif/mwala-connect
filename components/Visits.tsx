"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  Clock3,
  MapPin,
} from "lucide-react";

import { visits } from "../app/data/visits";

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

export default function Visits() {
  const upcomingVisits = visits.filter(
    (visit) => visit.status === "upcoming",
  );

  return (
    <section className="visits-section" id="visits">
      <div className="visits-inner">
        {/* Section heading */}
        <div className="visits-header">
          <div>
            <div className="section-number">
              05 / CONSTITUENCY ENGAGEMENTS
            </div>

            <p className="section-kicker">
              Field Schedule
            </p>

            <h2>
              WHERE DEVELOPMENT
              <br />
              <span>IS HAPPENING NEXT.</span>
            </h2>
          </div>

          <div className="visits-header-note">
            <p>
              Follow upcoming constituency visits, project launches
              and public engagements across Mwala.
            </p>

            <div className="verified-label">
              <span />
              Upcoming field engagements
            </div>
          </div>
        </div>

        {/* Upcoming visits */}
        {upcomingVisits.length > 0 ? (
          <div className="visits-list">
            {upcomingVisits.map((visit, index) => (
              <Link
                key={visit.id}
                href={`/visits/${visit.id}`}
                className="visit-card"
              >
                {/* Date panel */}
                <div className="visit-date">
                  <span className="visit-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <strong>{visit.date}</strong>

                  <span className="visit-month">
                    {visit.month}
                  </span>

                  <span className="visit-day">
                    {visit.day}
                  </span>
                </div>

                {/* Main details */}
                <div className="visit-content">
                  <div className="visit-top">
                    <div>
                      <span className="visit-type">
                        <span />
                        {getVisitTypeLabel(visit.type)}
                      </span>

                      <h3>{visit.title}</h3>
                    </div>

                    <div className="visit-arrow">
                      <ArrowUpRight size={20} />
                    </div>
                  </div>

                  <p className="visit-description">
                    {visit.description}
                  </p>

                  <div className="visit-meta">
                    <div>
                      <Clock3 size={15} />

                      <div>
                        <span>TIME</span>
                        <strong>{visit.time}</strong>
                      </div>
                    </div>

                    <div>
                      <MapPin size={15} />

                      <div>
                        <span>LOCATION</span>
                        <strong>{visit.location}</strong>
                      </div>
                    </div>

                    <div>
                      <CalendarDays size={15} />

                      <div>
                        <span>WARD</span>
                        <strong>{visit.ward}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="visit-footer">
                    <span>
                      STATUS · {visit.status}
                    </span>

                    <span className="visit-view">
                      View engagement
                      <ArrowUpRight size={13} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="visits-empty">
            <CalendarDays size={32} />

            <span>NO UPCOMING ENGAGEMENTS</span>

            <h3>
              THE NEXT FIELD VISIT
              <br />
              WILL APPEAR HERE.
            </h3>

            <p>
              Upcoming constituency visits, project launches and
              public engagements will appear here as they are added.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}