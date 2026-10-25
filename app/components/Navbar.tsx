
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/client";

export default function Navbar() {
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    let isMounted = true;

    const supabase = createClient();

    async function checkSession() {
      try {
        const { data, error } = await supabase.auth.getUser();

        if (isMounted) {
          setIsSignedIn(!error && !!data.user);
        }
      } catch {
        if (isMounted) {
          setIsSignedIn(false);
        }
      } finally {
        if (isMounted) {
          setIsCheckingSession(false);
        }
      }
    }

    void checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!isMounted) return;

      setIsSignedIn(!!session?.user);

      if (event === "SIGNED_OUT") {
        setMenuOpen(false);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  async function handleSignOut() {
    if (isSigningOut) return;

    setIsSigningOut(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Sign-out failed:", error.message);
        return;
      }

      setIsSignedIn(false);
      closeMenu();
      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("Sign-out failed:", error);
    } finally {
      setIsSigningOut(false);
    }
  }

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
          <a href="#representative">The Rep</a>
        </nav>

        {/* Desktop CTA and Authentication */}
        <div className="flex items-center gap-3">
          {!isCheckingSession && (
            isSignedIn ? (
              <button
                type="button"
                onClick={() => void handleSignOut()}
                disabled={isSigningOut}
                className="nav-cta"
              >
                {isSigningOut ? "Signing out..." : "Sign out"}
              </button>
            ) : (
              <Link href="/login" className="nav-cta">
                Sign in
              </Link>
            )
          )}

          <a href="#projects" className="nav-cta">
            Explore Development
            <span>↗</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className={`menu-button ${menuOpen ? "is-open" : ""}`}
          onClick={() => setMenuOpen((current) => !current)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          <span />
          <span />
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        id="mobile-navigation"
        className={`mobile-menu ${menuOpen ? "is-visible" : ""}`}
      >
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

        <a href="#representative" onClick={closeMenu}>
          The Rep
        </a>

        {!isCheckingSession && (
          isSignedIn ? (
            <button
              type="button"
              onClick={() => void handleSignOut()}
              disabled={isSigningOut}
              className="mobile-menu-cta"
            >
              {isSigningOut ? "Signing out..." : "Sign out"}
            </button>
          ) : (
            <Link
              href="/login"
              className="mobile-menu-cta"
              onClick={closeMenu}
            >
              Sign in
            </Link>
          )
        )}

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
