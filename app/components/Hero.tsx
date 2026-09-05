"use client";

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-grid" aria-hidden="true" />

      <div className="hero-glow hero-glow-one" aria-hidden="true" />
      <div className="hero-glow hero-glow-two" aria-hidden="true" />

      <div className="hero-content">
        <div className="eyebrow reveal">
          <span className="eyebrow-dot" />
          Mwala Constituency · Kenya
        </div>

        <h1 className="hero-title reveal reveal-delay-one">
          DEVELOPMENT
          <br />
          <em>YOU CAN SEE.</em>
        </h1>

        <p className="hero-description reveal reveal-delay-two">
          A digital development record for Mwala Constituency — bringing
          projects, wards, public investment, progress and field activity
          together in one place.
        </p>

        <div className="hero-actions reveal reveal-delay-three">
          <a href="#projects" className="primary-button">
            Explore Projects
            <span>↗</span>
          </a>

          <a href="#overview" className="secondary-button">
            View Constituency
            <span>↓</span>
          </a>
        </div>
      </div>

      <div className="hero-side-label" aria-hidden="true">
        <span>MWALA</span>
        <div className="side-line" />
        <span>DEVELOPMENT</span>
      </div>

      <div className="hero-bottom">
        <div className="hero-location">
          <span className="location-pulse" />
          Machakos County · Kenya
        </div>

        <div className="scroll-indicator">
          <span>Scroll to explore</span>
          <span className="scroll-arrow">↓</span>
        </div>
      </div>
    </section>
  );
}