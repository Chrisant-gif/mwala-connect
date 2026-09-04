"use client";

import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="nav-inner">
        {/* Brand */}
        <a href="#top" className="brand" onClick={closeMenu}>
          <div className="brand-mark" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>

          <div className="brand-name">
            MWALA <span>CONNECT</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#overview">Overview</a>
          <a href="#projects">Projects</a>
          <a href="#money">Public Funds</a>
          <a href="#wards">Wards</a>
          <a href="#engagements">Engagements</a>
        </nav>

        {/* Desktop CTA */}
        <a href="#projects" className="nav-cta">
          Explore Development
          <span>↗</span>
        </a>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className={`menu-button ${menuOpen ? "is-open" : ""}`}
          onClick={() => setMenuOpen((current) => !current)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`mobile-menu ${menuOpen ? "is-visible" : ""}`}>
        <a href="#overview" onClick={closeMenu}>
          Overview
        </a>

        <a href="#projects" onClick={closeMenu}>
          Projects
        </a>

        <a href="#money" onClick={closeMenu}>
          Public Funds
        </a>

        <a href="#wards" onClick={closeMenu}>
          Wards
        </a>

        <a href="#engagements" onClick={closeMenu}>
          Engagements
        </a>

        <a
          href="#projects"
          className="mobile-menu-cta"
          onClick={closeMenu}
        >
          Explore Development
          <span>↗</span>
        </a>
      </div>
    </header>
  );
}