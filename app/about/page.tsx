import Link from "next/link";

export const metadata = {
  title: "About Us | AxomPrep",
  description:
    "Learn about AxomPrep, an independent Assam-focused learning platform for students and competitive-exam aspirants.",
};

export default function AboutPage() {
  return (
    <main className="page">
      <div className="container">

        <section className="hero-section">
          <span className="badge">ABOUT AXOMPREP</span>

          <h1 className="page-title">
            Learning made accessible for Assam.
          </h1>

          <p className="lead">
            AxomPrep is an independent learning platform
            created to make quality education, study
            materials and exam preparation resources more
            accessible to learners across Assam.
          </p>
        </section>

        <section className="section">
          <h2>Who We Are</h2>

          <p>
            AxomPrep is an independent educational platform
            focused on students, learners and competitive
            examination aspirants, particularly those
            preparing for examinations and academic goals
            in Assam.
          </p>

          <p>
            We bring study materials, MCQ practice, mock
            tests, Assam-focused general knowledge, current
            affairs and other useful learning resources
            together in one simple digital platform.
          </p>

          <p>
            Our aim is to reduce the difficulty of finding
            useful preparation resources and help learners
            study in a more organised, practical and
            accessible way.
          </p>
        </section>

        <section className="section">
          <h2>What We Focus On</h2>

          <div className="grid">
            <div className="card">
              <h3>📚 Study Materials</h3>
              <p>
                Accessible and exam-oriented notes and
                digital study resources.
              </p>
            </div>

            <div className="card">
              <h3>📝 MCQ Practice</h3>
              <p>
                Topic-wise questions to help learners
                practise and strengthen their preparation.
              </p>
            </div>

            <div className="card">
              <h3>🧪 Mock Tests</h3>
              <p>
                Timed tests designed to help students
                practise under examination-like conditions.
              </p>
            </div>

            <div className="card">
              <h3>🏛️ Assam GK</h3>
              <p>
                Assam-focused general knowledge and
                examination resources.
              </p>
            </div>

            <div className="card">
              <h3>📰 Current Affairs</h3>
              <p>
                Important events and information relevant
                to students and competitive examinations.
              </p>
            </div>

            <div className="card">
              <h3>🎓 Academic Support</h3>
              <p>
                Resources covering school, college,
                university and other learning needs.
              </p>
            </div>
          </div>
        </section>

        <section className="section">
          <h2>Who We Serve</h2>

          <p>
            AxomPrep is designed for a wide range of
            learners, including:
          </p>

          <div className="grid">
            <div className="card">
              <h3>School Students</h3>
              <p>
                Resources for HSLC and higher-secondary
                level preparation.
              </p>
            </div>

            <div className="card">
              <h3>College & University Students</h3>
              <p>
                Academic resources and practice materials
                for higher education.
              </p>
            </div>

            <div className="card">
              <h3>Competitive Aspirants</h3>
              <p>
                Preparation resources for Assam and
                government job examinations.
              </p>
            </div>
          </div>
        </section>

        <section className="section">
          <h2>Our Commitment</h2>

          <p>
            We believe that access to useful educational
            resources should not depend on where a learner
            lives or how much they can spend on preparation.
          </p>

          <p>
            AxomPrep is committed to continuously improving
            its resources, expanding its subject coverage
            and building a dependable digital learning
            platform for learners across Assam.
          </p>
        </section>

        <section className="section cta-section">
          <span className="badge">START LEARNING</span>

          <h2>Learn. Practice. Prepare.</h2>

          <p>
            Explore our study materials and start preparing
            for your next academic or competitive goal.
          </p>

          <div className="actions">
            <Link href="/notes" className="btn primary">
              Explore Notes
            </Link>

            <Link href="/tests" className="btn">
              Take a Mock Test
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
