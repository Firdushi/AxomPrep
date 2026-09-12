import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">

          {/* Brand */}
          <div className="footer-brand">
            <Link href="/" className="footer-logo">
              AxomPrep
            </Link>

            <p className="footer-tagline">
              Learn. Practice. Prepare.
            </p>

            <p className="footer-description">
              AxomPrep is an Assam-focused learning platform
              providing accessible study materials, practice
              resources, mock tests, current affairs and
              exam-focused content for students and
              competitive-exam aspirants.
            </p>
          </div>

          {/* Explore */}
          <div className="footer-column">
            <h3>Explore</h3>

            <Link href="/notes">Notes</Link>
            <Link href="/tests">Mock Tests</Link>
            <Link href="/gk">Assam GK</Link>
            <Link href="/current-affairs">
              Current Affairs
            </Link>
          </div>

          {/* Resources */}
          <div className="footer-column">
            <h3>Resources</h3>

            <Link href="/notes">Study Materials</Link>
            <Link href="/tests">MCQ & Mock Tests</Link>
            <Link href="/gk">Assam GK</Link>
            <Link href="/current-affairs">
              Current Affairs
            </Link>
          </div>

          {/* About */}
          <div className="footer-column">
            <h3>AxomPrep</h3>

            <Link href="/about">About Us</Link>
            <Link href="/mission">Our Mission</Link>
            <Link href="/vision">Our Vision</Link>
            <Link href="/contact">Contact Us</Link>
          </div>
        </div>

        {/* Social */}
        <div className="footer-social">
          <a
            href="#"
            aria-label="Instagram"
            title="Instagram"
          >
            ◎
          </a>

          <a
            href="#"
            aria-label="YouTube"
            title="YouTube"
          >
            ▶
          </a>

          <a
            href="#"
            aria-label="Telegram"
            title="Telegram"
          >
            ➤
          </a>

          <a
            href="#"
            aria-label="Facebook"
            title="Facebook"
          >
            f
          </a>

          <a
            href="mailto:firdushiyuup999@gmail.com"
            aria-label="Email"
            title="Email"
          >
            ✉
          </a>
        </div>

        {/* Bottom */}
        <div className="footer-bottom">
          <div className="footer-legal">
            <Link href="/privacy">
              Privacy Policy
            </Link>

            <Link href="/terms">
              Terms & Conditions
            </Link>

            <Link href="/disclaimer">
              Disclaimer
            </Link>
          </div>

          <p>
            © {new Date().getFullYear()} AxomPrep.
            All rights reserved.
          </p>

          <p className="footer-made">
            Built for learners across Assam 🇮🇳
          </p>
        </div>
      </div>
    </footer>
  );
}
