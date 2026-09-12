import Link from "next/link";

export const metadata = {
  title: "Our Mission | AxomPrep",
  description:
    "Learn about the mission of AxomPrep and our commitment to accessible, practical and quality education across Assam.",
};

export default function MissionPage() {
  return (
    <main className="page">
      <div className="container">

        <section className="hero-section">
          <span className="badge">OUR MISSION</span>

          <h1 className="page-title">
            Making quality learning accessible to every learner.
          </h1>

          <p className="lead">
            Our mission is to make quality education and
            exam preparation more accessible, practical and
            inclusive for learners across Assam.
          </p>
        </section>

        <section className="section">
          <h2>What We Believe</h2>

          <p>
            We believe that every learner deserves access to
            useful educational resources, regardless of where
            they live or what their background is.
          </p>

          <p>
            Preparation becomes more effective when learning
            resources are organised, practice is consistent
            and students have the right tools to understand
            their progress.
          </p>

          <p>
            AxomPrep exists to bring these resources together
            in one accessible digital learning platform.
          </p>
        </section>

        <section className="section">
          <h2>Our Mission in Action</h2>

          <div className="grid">

            <div className="card">
              <h3>📚 Accessible Education</h3>

              <p>
                Make useful study materials and learning
                resources easier to access for students
                across Assam.
              </p>
            </div>

            <div className="card">
              <h3>📝 Meaningful Practice</h3>

              <p>
                Help learners strengthen their preparation
                through MCQs, practice questions and
                examination-focused exercises.
              </p>
            </div>

            <div className="card">
              <h3>🧪 Better Preparation</h3>

              <p>
                Provide mock tests and structured resources
                that help students prepare with greater
                confidence.
              </p>
            </div>

            <div className="card">
              <h3>🏛️ Assam Focus</h3>

              <p>
                Develop resources that are particularly
                relevant to Assam-based academic and
                competitive examinations.
              </p>
            </div>

            <div className="card">
              <h3>🌐 Digital Learning</h3>

              <p>
                Use technology to make learning resources
                available anytime and from anywhere.
              </p>
            </div>

            <div className="card">
              <h3>🤝 Inclusive Learning</h3>

              <p>
                Build a learning environment that welcomes
                students with different educational needs
                and goals.
              </p>
            </div>

          </div>
        </section>

        <section className="section">
          <h2>What We Aim to Build</h2>

          <p>
            We are working towards an ecosystem where a
            learner can find study materials, practise
            questions, take mock examinations, follow
            current affairs and understand their progress
            without having to search across multiple
            platforms.
          </p>

          <p>
            As AxomPrep grows, we aim to continuously expand
            our subjects, examination coverage, learning
            resources and technology while keeping the
            platform simple and learner-friendly.
          </p>
        </section>

        <section className="section cta-section">
          <span className="badge">OUR PURPOSE</span>

          <h2>
            Learn with clarity. Practice with purpose.
          </h2>

          <p>
            Every resource we build is intended to make the
            journey from learning to examination a little
            more organised and accessible.
          </p>

          <div className="actions">
            <Link href="/about" className="btn">
              About AxomPrep
            </Link>

            <Link href="/notes" className="btn primary">
              Explore Resources
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
