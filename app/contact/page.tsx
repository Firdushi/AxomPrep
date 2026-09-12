import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Contact Us | AxomPrep",
  description:
    "Contact AxomPrep for questions, suggestions, corrections, feedback and collaboration.",
};

async function submitContact(formData: FormData) {
  "use server";

  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const subject = String(formData.get("subject") || "").trim();
  const message = String(formData.get("message") || "").trim();

  if (!name || !email || !subject || !message) {
    return;
  }

  const supabase = await createClient();

  await supabase.from("contact_messages").insert({
    name,
    email,
    subject,
    message,
  });
}

export default function ContactPage() {
  return (
    <main className="page">
      <div className="container">

        <section className="hero-section">
          <span className="badge">CONTACT AXOMPREP</span>

          <h1 className="page-title">
            We'd love to hear from you.
          </h1>

          <p className="lead">
            Have a question, suggestion, correction,
            feedback or collaboration idea? Get in touch
            with the AxomPrep team.
          </p>
        </section>

        <div className="grid">

          <section className="card">
            <h2>Get in Touch</h2>

            <p>
              We value feedback from learners and continuously
              work to improve AxomPrep.
            </p>

            <div className="contact-item">
              <strong>📧 Email</strong>

              <p>
                <a href="mailto:firdushiyuup999@gmail.com">
                  firdushiyuup999@gmail.com
                </a>
              </p>
            </div>

            <div className="contact-item">
              <strong>💬 WhatsApp</strong>

              <p className="muted">
                Coming soon
              </p>
            </div>

            <div className="contact-item">
              <strong>📸 Instagram</strong>

              <p className="muted">
                Coming soon
              </p>
            </div>

            <div className="contact-item">
              <strong>▶️ YouTube</strong>

              <p className="muted">
                Coming soon
              </p>
            </div>

            <div className="contact-item">
              <strong>✈️ Telegram</strong>

              <p className="muted">
                Coming soon
              </p>
            </div>
          </section>

          <section className="card">
            <h2>Send a Message</h2>

            <form action={submitContact}>

              <label htmlFor="name">
                Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                required
              />

              <label htmlFor="email">
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
              />

              <label htmlFor="subject">
                Subject
              </label>

              <input
                id="subject"
                name="subject"
                type="text"
                placeholder="What is your message about?"
                required
              />

              <label htmlFor="message">
                Message
              </label>

              <textarea
                id="message"
                name="message"
                rows={6}
                placeholder="Write your message..."
                required
              />

              <button
                type="submit"
                className="btn primary"
              >
                Send Message
              </button>

            </form>
          </section>

        </div>

        <section className="section">
          <h2>What Can You Contact Us About?</h2>

          <div className="grid">

            <div className="card">
              <h3>💡 Suggestions</h3>
              <p>
                Suggest new features, subjects or resources
                you'd like to see on AxomPrep.
              </p>
            </div>

            <div className="card">
              <h3>🐛 Report an Issue</h3>
              <p>
                Found an incorrect question, broken link or
                technical problem?
              </p>
            </div>

            <div className="card">
              <h3>🤝 Collaboration</h3>
              <p>
                Interested in educational or content
                collaboration? We'd be happy to hear from you.
              </p>
            </div>

          </div>
        </section>

      </div>
    </main>
  );
}
