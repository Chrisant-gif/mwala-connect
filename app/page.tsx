import Representative from "./components/Representative";
import Wards from "./components/Wards";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import AllocationHistory from "./components/AllocationHistory";
import Projects from "./components/Projects";
import Visits from "../components/Visits";
import Engagements from "../components/Engagements";

const footerLinks = [
  { label: "Overview", href: "#overview" },
  { label: "Development", href: "#development" },
  { label: "Investment", href: "#allocations" },
  { label: "Wards", href: "#wards" },
  { label: "Field Visits", href: "#visits" },
  { label: "Engagements", href: "#engagements" },
  { label: "The Rep", href: "#representative" },
];

export default function Home() {
  return (
    <main>
      <Navbar />

      <Hero />

      <Stats />

      <Projects />

      <AllocationHistory />

      <Wards />

      <Visits />

      <Engagements />

      <Representative />

      <footer
        className="site-footer"
        style={{
          position: "relative",
          overflow: "hidden",
          background: "var(--green-dark)",
          color: "var(--paper)",
          padding: "88px 6vw 28px",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.07,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "1400px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "minmax(0, 1.5fr) minmax(220px, 0.5fr)",
              gap: "80px",
              paddingBottom: "72px",
            }}
          >
            <div>
              <div
                className="footer-brand"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  fontSize: "14px",
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                }}
              >
                <div
                  className="brand-mark"
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: "4px",
                    height: "22px",
                  }}
                >
                  <span
                    style={{
                      display: "block",
                      width: "4px",
                      height: "10px",
                      background: "currentColor",
                    }}
                  />
                  <span
                    style={{
                      display: "block",
                      width: "4px",
                      height: "16px",
                      background: "currentColor",
                    }}
                  />
                  <span
                    style={{
                      display: "block",
                      width: "4px",
                      height: "22px",
                      background: "currentColor",
                    }}
                  />
                </div>

                <span>MWALA CONNECT</span>
              </div>

              <h2
                style={{
                  margin: "34px 0 22px",
                  fontSize: "clamp(3.5rem, 8vw, 8rem)",
                  lineHeight: 0.82,
                  letterSpacing: "-0.055em",
                  fontWeight: 800,
                }}
              >
                MWALA
                <br />
                <span style={{ opacity: 0.42 }}>CONNECT.</span>
              </h2>

              <p
                style={{
                  maxWidth: "520px",
                  margin: 0,
                  color: "rgba(245, 242, 235, 0.68)",
                  fontSize: "15px",
                  lineHeight: 1.7,
                }}
              >
                A digital home for the people, places, projects and
                opportunities shaping the future of Mwala.
              </p>
            </div>

            <div style={{ paddingTop: "8px" }}>
              <span
                style={{
                  display: "block",
                  marginBottom: "24px",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  opacity: 0.45,
                }}
              >
                EXPLORE
              </span>

              <nav
                aria-label="Footer navigation"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "13px",
                }}
              >
                {footerLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    style={{
                      color: "var(--paper)",
                      textDecoration: "none",
                      fontSize: "15px",
                      opacity: 0.78,
                      transition: "opacity 180ms ease",
                    }}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          <div
            style={{
              borderTop: "1px solid rgba(245, 242, 235, 0.16)",
              paddingTop: "24px",
              display: "flex",
              justifyContent: "space-between",
              gap: "20px",
              flexWrap: "wrap",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              color: "rgba(245, 242, 235, 0.48)",
            }}
          >
            <span>MWALA · MACHAKOS · KENYA</span>

            <span>© {new Date().getFullYear()} MWALA CONNECT</span>
          </div>
        </div>
      </footer>
    </main>
  );
}