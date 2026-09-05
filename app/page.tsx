import Wards from "./components/Wards";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import AllocationHistory from "./components/AllocationHistory";
import Projects from "./components/Projects";
import Visits from "../components/Visits";

export default function Home() {
  return (
    <main>
      <Navbar />

      <Hero />

      <Stats />

      <AllocationHistory />

      <Projects />

      <Wards />

      <Visits />

      <footer className="site-footer">
        <div className="footer-inner">
          <div>
            <div className="footer-brand">
              <div className="brand-mark">
                <span />
                <span />
                <span />
              </div>

              <span>MWALA CONNECT</span>
            </div>

            <p>
              A digital home for the people, places, projects and
              opportunities shaping the future of Mwala.
            </p>
          </div>

          <div className="footer-right">
            <span>MWALA · MACHAKOS · KENYA</span>

            <span>© {new Date().getFullYear()} MWALA CONNECT</span>
          </div>
        </div>
      </footer>
    </main>
  );
}