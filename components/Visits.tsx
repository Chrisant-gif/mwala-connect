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
  const activeVisits = visits.filter(
    (visit) =>
      visit.status === "upcoming" ||
      visit.status === "ongoing",
  );

  const completedVisits = visits.filter(
    (visit) => visit.status === "completed",
  );

  const renderVisitCard = (
    visit: (typeof visits)[number],
    index: number,
  ) => (
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
            STATUS · {visit.status.toUpperCase()}
          </span>

          <span className="visit-view">
            View engagement
            <ArrowUpRight size={13} />
          </span>
        </div>
      </div>
    </Link>
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
              Follow constituency visits, project launches
              and public engagements across Mwala.
            </p>

            <div className="verified-label">
              <span />
              Field engagements
            </div>
          </div>
        </div>

        {/* Active visits */}
        {activeVisits.length > 0 && (
          <div className="visits-list">
            {activeVisits.map((visit, index) =>
              renderVisitCard(visit, index),
            )}
          </div>
        )}

        {/* Empty upcoming state */}
        {activeVisits.length === 0 && (
          <div className="visits-empty">
            <CalendarDays size={32} />

            <span>NO UPCOMING ENGAGEMENTS</span>

            <h3>
              THE NEXT FIELD VISIT
              <br />
              WILL APPEAR HERE.
            </h3>

            <p>
              Upcoming constituency visits, project launches
              and public engagements will appear here as they
              are added.
            </p>
          </div>
        )}

        {/* Completed engagements */}
        {completedVisits.length > 0 && (
          <div className="visits-completed">
            <div className="visits-completed-header">
              <div>
                <p className="section-kicker">
                  Engagement History
                </p>

                <h3>RECENT ENGAGEMENTS</h3>
              </div>

              <span className="verified-label">
                <span />
                Completed field activities
              </span>
            </div>

            <div className="visits-list">
              {completedVisits.map((visit, index) =>
                renderVisitCard(visit, index),
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}