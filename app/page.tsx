import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const [{ count: notes }, { count: tests }, { count: questions }] = await Promise.all([
    supabase.from("notes").select("*", { count: "exact", head: true }).eq("published", true),
    supabase.from("tests").select("*", { count: "exact", head: true }).eq("published", true),
    supabase.from("questions").select("*", { count: "exact", head: true })
  ]);
  return <>
    <section className="hero">
      <div className="container hero-grid">
        <div>
          <span className="eyebrow">Assam-first preparation platform</span>
          <h1>Study smarter.<br/><span>Score stronger.</span></h1>
          <p>One professional place for notes, PDFs, Assam GK, current affairs and real timed mock tests — with your performance saved to your account.</p>
          <div className="hero-actions"><Link className="btn primary" href="/signup">Start Preparing</Link><Link className="btn ghost" href="/tests">Explore Mock Tests</Link></div>
          <div className="stats">
            <div className="stat"><strong>{notes ?? 0}+</strong><span>Published notes</span></div>
            <div className="stat"><strong>{tests ?? 0}+</strong><span>Mock tests</span></div>
            <div className="stat"><strong>{questions ?? 0}+</strong><span>MCQs</span></div>
          </div>
        </div>
        <div className="hero-card"><div className="mock-window"><div className="mock-top"><span>Mock Test</span><span>09:42</span></div><div className="mock-score">72%</div><p>Keep improving — every attempt is saved.</p><div className="progress"><i/></div><p className="small">18 correct · 7 incorrect · 25 questions</p></div></div>
      </div>
    </section>
    <section className="section"><div className="container"><div className="section-head"><div><h2>Everything you need</h2><p className="muted">Built as a serious study platform, not a static notes page.</p></div></div>
      <div className="cards">
        <Feature icon="N" title="Notes & PDFs" text="Organised notes by subject and category, with bilingual content and downloadable PDFs." href="/notes"/>
        <Feature icon="✓" title="Timed Mock Tests" text="Attempt real MCQs with a countdown, automatic scoring and answer explanations." href="/tests"/>
        <Feature icon="অসম" title="Assam GK" text="Dedicated Assam-focused preparation area for competitive examinations." href="/gk"/>
        <Feature icon="CA" title="Current Affairs" text="Publish date-wise current-affairs material from the admin panel." href="/current-affairs"/>
        <Feature icon="↗" title="Performance" text="Track attempts, scores and progress from your personal dashboard." href="/dashboard"/>
        <Feature icon="⚙" title="Admin CMS" text="Manage notes, PDFs, questions, tests and content without editing source code." href="/admin"/>
      </div>
    </div></section>
  </>;
}
function Feature({icon,title,text,href}:{icon:string,title:string,text:string,href:string}){return <Link href={href} className="card"><div className="icon">{icon}</div><h3>{title}</h3><p>{text}</p><span className="badge">Open →</span></Link>}
