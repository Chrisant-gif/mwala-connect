import Link from "next/link";

import { wards } from "../data/wards";

export default function Wards() {
  return (
    <section className="wards-section" id="wards">
      <div className="wards-inner">
        <div className="wards-header">
          <div>
            <span className="wards-kicker">03 / WARDS</span>

            <h2>
              SIX WARDS.
              <br />
              <span>ONE CONSTITUENCY.</span>
            </h2>
          </div>

          <span className="wards-index">MWALA CONSTITUENCY · KENYA</span>
        </div>

        <div className="wards-intro">
          <p>
            Mwala Constituency is organised across six wards. Mwala Connect
            gives each ward its own development record, creating a structured
            way to document projects, progress and community activity as
            verified information is added.
          </p>

          <span>WARD DEVELOPMENT RECORDS</span>
        </div>

        <div className="wards-grid">
          {wards.map((ward, index) => (
            <Link
              href={`/wards/${ward.id}`}
              className="ward-record"
              key={ward.id}
            >
              <div className="ward-record-top">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>MWALA / {String(ward.id).padStart(2, "0")}</span>
              </div>

              <div className="ward-record-main">
                <h3>{ward.name}</h3>

                <p>{ward.description}</p>
              </div>

              <div className="ward-record-bottom">
                <span>PROJECT RECORDS</span>
                <strong>{ward.projectCount}</strong>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}