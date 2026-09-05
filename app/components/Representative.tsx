import { ArrowUpRight, GraduationCap, MapPin } from "lucide-react";

export default function Representative() {
  return (
    <section className="representative-section" id="representative">
      <div className="representative-inner">
        <div className="representative-header">
          <div>
            <span className="representative-kicker">
              06 / REPRESENTATIVE
            </span>

            <h2>
              THE
              <br />
              <span>REPRESENTATIVE.</span>
            </h2>
          </div>

          <span className="representative-index">
            MWALA CONSTITUENCY · KENYA
          </span>
        </div>

        <div className="representative-grid">
          <div className="representative-portrait">
            <div className="representative-portrait-placeholder">
              <span>VMK</span>
            </div>
          </div>

          <div className="representative-content">
            <span className="representative-status">
              <span />
              Member of Parliament
            </span>

            <h3>
              HON. ENG.
              <br />
              VINCENT MUSYOKA
              <br />
              <em>KAWAYA</em>
            </h3>

            <p className="representative-intro">
              The Member of Parliament representing Mwala Constituency in the
              National Assembly of Kenya.
            </p>

            <div className="representative-facts">
              <div>
                <MapPin size={16} />

                <div>
                  <span>CONSTITUENCY</span>
                  <strong>Mwala</strong>
                </div>
              </div>

              <div>
                <GraduationCap size={16} />

                <div>
                  <span>PROFESSIONAL BACKGROUND</span>
                  <strong>Engineering &amp; Technology</strong>
                </div>
              </div>
            </div>

            <div className="representative-note">
              <span>THE PUBLIC RECORD</span>

              <p>
                Mwala Connect documents constituency projects, public
                investment, ward-level development and field activity around
                the constituency&apos;s public record.
              </p>
            </div>

            <a
              href="https://www.parliament.go.ke/index.php/node/3375"
              target="_blank"
              rel="noreferrer"
              className="representative-link"
            >
              View parliamentary profile
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>

        <div className="representative-related">
          <div>
            <span className="representative-related-kicker">
              RELATED DEVELOPMENT
            </span>

            <h4>
              MWALA TECHNICAL
              <br />
              &amp; VOCATIONAL COLLEGE
            </h4>

            <p>
              A public TVET institution serving Mwala Subcounty, providing
              technical and vocational training opportunities across multiple
              fields.
            </p>
          </div>

          <a
            href="https://www.mwalatvc.ac.ke/"
            target="_blank"
            rel="noreferrer"
            className="representative-related-link"
          >
            Visit institution
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}