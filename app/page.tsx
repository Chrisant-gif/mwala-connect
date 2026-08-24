"use client";

import { useState } from "react";

const wards = [
  { name: "Mbiuni", population: "32,142" },
  { name: "Mwala", population: "32,142" },
  { name: "Muthetheni", population: "22,805" },
  { name: "Kibauni", population: "17,927" },
  { name: "Masii", population: "32,367" },
  { name: "Wamunyu", population: "25,664" },
];

const projects = [
  {
    category: "WATER",
    title: "Mwala Cluster Water Supply",
    location: "Mwala · Masii · Kabaa · Mbiuni",
    status: "Ongoing",
    progress: 33,
    amount: "KSh 1.7B",
    description:
      "A major water infrastructure project designed to expand access to clean drinking water across the Mwala cluster.",
    featured: true,
  },
  {
    category: "EDUCATION",
    title: "Masii Township Primary School",
    location: "Masii Ward",
    status: "Project record",
    progress: null,
    amount: "KSh 805,400",
    description:
      "Construction to completion of one classroom under the FY 2023/24 Mwala NG-CDF project proposals.",
    featured: false,
  },
  {
    category: "EDUCATION",
    title: "Maiani Primary School",
    location: "Mwala Constituency",
    status: "Project record",
    progress: null,
    amount: "KSh 805,400",
    description:
      "Construction to completion of one classroom under the FY 2023/24 project proposals.",
    featured: false,
  },
];

const moneySteps = [
  {
    number: "01",
    title: "Allocation",
    description:
      "Funds approved for constituency development in a financial year.",
  },
  {
    number: "02",
    title: "Disbursement",
    description:
      "Funds transferred for implementation of approved programmes and projects.",
  },
  {
    number: "03",
    title: "Implementation",
    description:
      "Projects move from approval into procurement, construction and delivery.",
  },
  {
    number: "04",
    title: "Impact",
    description:
      "The final question: what changed for the people of Mwala?",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState("All");

  const filteredProjects =
    activeProject === "All"
      ? projects
      : projects.filter((project) => project.status === activeProject);

  return (
    <main className="site-shell">
      {/* NAVIGATION */}
      <header className="navbar">
        <div className="nav-inner">
          <a href="#" className="brand" aria-label="Mwala Connect home">
            <span className="brand-mark">
              <span />
              <span />
              <span />
            </span>

            <span className="brand-name">
              MWALA<span>CONNECT</span>
            </span>
          </a>

          <nav className="desktop-nav" aria-label="Main navigation">
            <a href="#overview">Overview</a>
            <a href="#projects">Projects</a>
            <a href="#wards">Wards</a>
            <a href="#leadership">Leadership</a>
          </nav>

          <a href="#projects" className="nav-cta">
            Explore development
            <span>↗</span>
          </a>

          <button
            className={`menu-button ${menuOpen ? "is-open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span />
            <span />
          </button>
        </div>

        <div className={`mobile-menu ${menuOpen ? "is-visible" : ""}`}>
          <a href="#overview" onClick={() => setMenuOpen(false)}>
            Overview
          </a>

          <a href="#projects" onClick={() => setMenuOpen(false)}>
            Projects
          </a>

          <a href="#wards" onClick={() => setMenuOpen(false)}>
            Wards
          </a>

          <a href="#leadership" onClick={() => setMenuOpen(false)}>
            Leadership
          </a>

          <a
            href="#projects"
            className="mobile-menu-cta"
            onClick={() => setMenuOpen(false)}
          >
            Explore development <span>↗</span>
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="hero-grid" />

        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />

        <div className="hero-content">
          <div className="eyebrow reveal">
            <span className="eyebrow-dot" />
            Mwala · Machakos · Kenya
          </div>

          <h1 className="hero-title reveal reveal-delay-one">
            MWALA,
            <br />
            <em>CONNECTED.</em>
          </h1>

          <p className="hero-description reveal reveal-delay-two">
            A digital home for the people, places, projects and opportunities
            shaping the future of Mwala.
          </p>

          <div className="hero-actions reveal reveal-delay-three">
            <a href="#overview" className="primary-button">
              Discover Mwala
              <span>↗</span>
            </a>

            <a href="#projects" className="secondary-button">
              Track development
              <span>↓</span>
            </a>
          </div>
        </div>

        <div className="hero-side-label">
          <span>01</span>
          <span className="side-line" />
          <span>MWALA CONNECT</span>
        </div>

        <div className="hero-bottom">
          <div className="hero-location">
            <span className="location-pulse" />
            <span>Constituency information platform</span>
          </div>

          <div className="scroll-indicator">
            <span>Scroll to explore</span>
            <span className="scroll-arrow">↓</span>
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="overview-section" id="overview">
        <div className="section-number">02 / MWALA AT A GLANCE</div>

        <div className="overview-content">
          <p className="section-kicker">The constituency</p>

          <h2>
            Know the
            <br />
            <span>place you call home.</span>
          </h2>

          <p className="overview-copy">
            Mwala Connect brings together public information, development
            projects and community stories into one simple digital experience.
          </p>

          <div className="source-note">
            <span className="source-dot" />
            Core constituency figures sourced from Mwala NG-CDF.
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats-section">
        <div className="stats-intro">
          <span>MWALA / AT A GLANCE</span>
          <span>OFFICIAL FIGURES</span>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-index">01</span>
            <strong>163K+</strong>
            <span>Approx. population</span>
          </div>

          <div className="stat-card">
            <span className="stat-index">02</span>
            <strong>6</strong>
            <span>County assembly wards</span>
          </div>

          <div className="stat-card">
            <span className="stat-index">03</span>
            <strong>1,018</strong>
            <span>Approx. km²</span>
          </div>
        </div>
      </section>

      {/* DEVELOPMENT INTRO */}
      <section className="development-intro" id="projects">
        <div>
          <p className="section-kicker">Development intelligence</p>

          <h2>
            DEVELOPMENT
            <br />
            <span>TRACKED.</span>
          </h2>
        </div>

        <div className="development-intro-copy">
          <p>
            Projects should not disappear into documents. Mwala Connect makes
            it easier to see what is planned, what is happening and what has
            been delivered.
          </p>

          <span className="verified-label">
            <span />
            Public information · Source-linked
          </span>
        </div>
      </section>

      {/* PROJECT FILTER */}
      <section className="project-section">
        <div className="project-filter">
          {["All", "Ongoing", "Completed", "Pending"].map((filter) => (
            <button
              key={filter}
              className={activeProject === filter ? "active" : ""}
              onClick={() => setActiveProject(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="project-grid">
          {filteredProjects.length === 0 ? (
            <div className="empty-projects">
              <span>PROJECT DATABASE</span>
              <h3>More records coming soon.</h3>
              <p>
                This section is designed to grow as verified constituency
                project records are added.
              </p>
            </div>
          ) : (
            filteredProjects.map((project) => (
              <article
                className={`project-card ${
                  project.featured ? "project-card-featured" : ""
                }`}
                key={project.title}
              >
                <div className="project-top">
                  <span>{project.category}</span>

                  <span
                    className={`project-status ${
                      project.status === "Ongoing" ? "status-live" : ""
                    }`}
                  >
                    <span />
                    {project.status}
                  </span>
                </div>

                <div className="project-main">
                  <p className="project-location">{project.location}</p>

                  <h3>{project.title}</h3>

                  <p className="project-description">
                    {project.description}
                  </p>
                </div>

                <div className="project-bottom">
                  <div>
                    <span>Recorded amount</span>
                    <strong>{project.amount}</strong>
                  </div>

                  {project.progress !== null ? (
                    <div className="progress-block">
                      <div className="progress-heading">
                        <span>Reported progress</span>
                        <strong>{project.progress}%</strong>
                      </div>

                      <div className="progress-track">
                        <span
                          style={{
                            width: `${project.progress}%`,
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="project-record">
                      <span>DATA STATUS</span>
                      <strong>Verified record</strong>
                    </div>
                  )}
                </div>

                <button className="project-link">
                  View project record
                  <span>↗</span>
                </button>
              </article>
            ))
          )}
        </div>
      </section>

      {/* FEATURED WATER PROJECT */}
      <section className="water-section">
        <div className="water-visual">
          <div className="water-rings">
            <span />
            <span />
            <span />
          </div>

          <div className="water-badge">
            <span>FEATURED</span>
            <strong>WATER</strong>
            <small>PROJECT</small>
          </div>

          <div className="water-word">WATER</div>
        </div>

        <div className="water-content">
          <p className="section-kicker">Featured development</p>

          <h2>
            Mwala
            <br />
            <span>needs water.</span>
          </h2>

          <p>
            The Mwala Cluster Water Supply Project is a major water
            infrastructure programme covering Mwala, Makutano, Masii, Kabaa
            and Mbiuni.
          </p>

          <div className="water-metrics">
            <div>
              <strong>KSh 1.7B</strong>
              <span>Reported project cost</span>
            </div>

            <div>
              <strong>6,600</strong>
              <span>m³/day treatment capacity</span>
            </div>

            <div>
              <strong>80 KM</strong>
              <span>Transmission & distribution</span>
            </div>

            <div>
              <strong>33%</strong>
              <span>Officially reported completion</span>
            </div>
          </div>

          <div className="water-note">
            <span>IMPORTANT</span>

            <p>
              Completion figures are displayed exactly as reported by Tanathi
              Water Works Development Agency and should be updated when newer
              official progress information becomes available.
            </p>
          </div>

          <a
            href="https://tanathi.go.ke/wp/ongoing-projects/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            View official project source
            <span>↗</span>
          </a>
        </div>
      </section>

      {/* FOLLOW THE MONEY */}
      <section className="money-section">
        <div className="money-header">
          <div>
            <p className="section-kicker">Transparency</p>

            <h2>
              FOLLOW
              <br />
              <span>THE MONEY.</span>
            </h2>
          </div>

          <p>
            A future Mwala Connect feature designed to connect public funding
            with the projects and outcomes residents can actually see.
          </p>
        </div>

        <div className="money-grid">
          {moneySteps.map((step) => (
            <div className="money-card" key={step.number}>
              <span>{step.number}</span>

              <h3>{step.title}</h3>

              <p>{step.description}</p>

              <div className="money-arrow">↗</div>
            </div>
          ))}
        </div>
      </section>

      {/* WARDS */}
      <section className="wards-section" id="wards">
        <div className="wards-header">
          <div>
            <p className="section-kicker">Six communities</p>

            <h2>
              EVERY WARD
              <br />
              <span>COUNTS.</span>
            </h2>
          </div>

          <p>
            Explore Mwala from the ward level. Eventually, each ward can have
            its own project dashboard, updates, opportunities and community
            stories.
          </p>
        </div>

        <div className="wards-grid">
          {wards.map((ward, index) => (
            <article className="ward-card" key={ward.name}>
              <span>0{index + 1}</span>

              <h3>{ward.name}</h3>

              <div>
                <strong>{ward.population}</strong>
                <small>Approx. population</small>
              </div>

              <button>
                Explore ward
                <span>↗</span>
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="leadership-section" id="leadership">
        <div className="leadership-visual">
          <div className="visual-grid" />

          <div className="visual-badge">
            <span>MWALA</span>
            <strong>MP</strong>
          </div>

          <div className="visual-word">MWALA</div>
        </div>

        <div className="leadership-content">
          <p className="section-kicker">Public leadership</p>

          <h2>
            Your
            <br />
            <span>representative.</span>
          </h2>

          <p>
            Hon. Eng. Vincent Musyoka, known as Kawaya, is the current Member
            of Parliament for Mwala Constituency.
          </p>

          <a
            href="https://mwala.ngcdf.go.ke/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            View official constituency information
            <span>↗</span>
          </a>

          <div className="leadership-note">
            <span>THE IDEA</span>

            <p>
              Make development information easier for residents to discover,
              understand and follow.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="cta-section">
        <div className="cta-orbit orbit-one" />
        <div className="cta-orbit orbit-two" />

        <div className="cta-content">
          <p className="section-kicker">The future of Mwala</p>

          <h2>
            Let's keep
            <br />
            <span>Mwala connected.</span>
          </h2>

          <a href="#projects" className="primary-button cta-button">
            Explore development
            <span>↗</span>
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-top">
          <a href="#" className="brand footer-brand">
            <span className="brand-mark">
              <span />
              <span />
              <span />
            </span>

            <span className="brand-name">
              MWALA<span>CONNECT</span>
            </span>
          </a>

          <p>
            Connecting people,
            <br />
            places &amp; development.
          </p>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Mwala Connect</span>
          <span>Machakos · Kenya</span>
          <span>Built for the community.</span>
        </div>
      </footer>
    </main>
  );
}