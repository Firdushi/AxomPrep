import Link from "next/link";

export const metadata = {
  title: "Our Vision | AxomPrep",
  description:
    "Discover the vision behind AxomPrep and our goal of building a trusted digital learning ecosystem for learners across Assam.",
};

export default function VisionPage() {
  return (
    <main className="page">
      <div className="container">

        <section className="hero-section">
          <span className="badge">OUR VISION</span>

          <h1 className="page-title">
            Building a trusted learning ecosystem for Assam.
          </h1>

          <p className="lead">
            Our vision is to build a trusted digital learning
            ecosystem where students and exam aspirants across
            Assam can find the resources, practice and support
            they need to move confidently towards their goals.
          </p>
        </section>

        <section className="section">
          <h2>Where We Want to Go</h2>

          <p>
            Education is changing rapidly with the help of
            technology. We envision a future where quality
            learning resources are not limited by geography,
            availability or traditional barriers.
          </p>

          <p>
            AxomPrep aims to become a dependable digital
            destination for learners across Assam by bringing
            learning materials, practice, assessment and
            useful educational information together.
          </p>
        </section>

        <section className="section">
          <h2>Our Vision for Learners</h2>

          <div className="grid">

            <div className="card">
              <h3>🌐 Accessible Learning</h3>

              <p>
                A future where learners can access useful
                educational resources whenever and wherever
                they need them.
              </p>
            </div>

            <div className="card">
              <h3>🎯 Focused Preparation</h3>

              <p>
                Help students prepare with structured,
                relevant and examination-oriented resources.
              </p>
            </div>

            <div className="card">
              <h3>📊 Smarter Practice</h3>

              <p>
                Use technology and performance insights to
                help learners understand their strengths and
                improve their weaknesses.
              </p>
            </div>

            <div className="card">
              <h3>🏛️ Assam-Centred</h3>

              <p>
                Build one of the most useful digital
                educational resources for learners preparing
                for Assam-focused examinations.
              </p>
            </div>

            <div className="card">
              <h3>🚀 Continuous Growth</h3>

              <p>
                Continuously expand subjects, examinations,
                resources and technology as the needs of
                learners evolve.
              </p>
            </div>

            <div className="card">
              <h3>🤝 A Learning Community</h3>

              <p>
                Encourage a culture where learners can
                learn, practise, improve and grow together.
              </p>
            </div>

          </div>
        </section>

        <section className="section">
          <h2>The Future We Imagine</h2>

          <p>
            We imagine AxomPrep growing from a resource
            platform into a complete learning ecosystem.
          </p>

          <div className="card">
            <p className="lead">
              <strong>
                Learn → Practice → Test → Analyse → Improve
              </strong>
            </p>

            <p>
              From study materials and MCQs to mock tests,
              performance analytics, current affairs and
              future learning services, every part of AxomPrep
              will be designed around the learner.
            </p>
          </div>
        </section>

        <section className="section">
          <h2>Our Long-Term Goal</h2>

          <p>
            Our long-term goal is to contribute to a stronger
            culture of accessible digital learning in Assam
            and help more learners prepare for academic and
            competitive opportunities with confidence.
          </p>

          <p>
            We know that building this vision takes time.
            AxomPrep will grow step by step, listening to
            learners and continuously improving the platform.
          </p>
        </section>

        <section className="section cta-section">
          <span className="badge">THE JOURNEY AHEAD</span>

          <h2>
            A better way to learn is being built.
          </h2>

          <p>
            AxomPrep is only getting started. Our journey is
            to make learning more accessible, useful and
            meaningful for students across Assam.
          </p>

          <div className="actions">
            <Link href="/about" className="btn">
              About AxomPrep
            </Link>

            <Link href="/tests" className="btn primary">
              Start Practising
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
