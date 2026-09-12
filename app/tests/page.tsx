import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const dynamic="force-dynamic";

export default async function Tests(){
 const supabase=await createClient(); const {data:tests=[]}=await supabase.from("tests").select("id,title_en,title_as,description_en,duration_minutes,test_questions(count)").eq("published",true).order("created_at",{ascending:false});
 return <div className="page"><div className="container"><span className="badge">EXAM PRACTICE</span><h1 className="page-title">Mock Tests</h1><p className="muted">Timed, auto-scored MCQ practice.</p><div className="grid">{tests.map((t:any)=><div className="card" key={t.id}><span className="badge">{t.duration_minutes} min</span><h3>{t.title_en}</h3><p>{t.description_en||"Attempt this test under exam-style timing."}</p><Link className="btn primary" href={`/tests/${t.id}`}>Start Test</Link></div>)}</div>{!tests.length&&<div className="empty">No published tests yet.</div>}</div></div>
}
