import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function Dashboard(){
 const {user,profile}=await requireUser(); const supabase=await createClient();
 const {data:attempts=[]}=await supabase.from("attempts").select("id,score,total,submitted_at,tests(title_en,title_as)").eq("user_id",user!.id).order("submitted_at",{ascending:false}).limit(10);
 const avg=attempts.length?Math.round(attempts.reduce((a:any,x:any)=>a+(x.total?x.score/x.total*100:0),0)/attempts.length):0;
 return <div className="page"><div className="container"><div className="section-head"><div><span className="badge">STUDENT DASHBOARD</span><h1 className="page-title">Welcome, {profile?.full_name||"Student"}.</h1><p className="muted">Your preparation activity in one place.</p></div><Link className="btn primary" href="/tests">Take a test</Link></div>
 <div className="dashboard-grid"><Metric label="Attempts" value={attempts.length}/><Metric label="Average score" value={`${avg}%`}/><Metric label="Role" value={profile?.role||"user"}/><Metric label="Language" value={profile?.preferred_language==="as"?"অসমীয়া":"English"}/></div>
 <section className="section"><div className="section-head"><div><h2>Recent attempts</h2><p className="muted">Your latest mock-test results.</p></div></div>{attempts.length?<div className="table-wrap"><table className="table"><thead><tr><th>Test</th><th>Score</th><th>Date</th><th>Result</th></tr></thead><tbody>{attempts.map((a:any)=><tr key={a.id}><td>{a.tests?.title_en}</td><td>{a.score}/{a.total}</td><td>{a.submitted_at?new Date(a.submitted_at).toLocaleDateString():"—"}</td><td><span className="badge">{a.total?Math.round(a.score/a.total*100):0}%</span></td></tr>)}</tbody></table></div>:<div className="empty">No attempts yet. <Link href="/tests">Take your first mock test →</Link></div>}</section>
 </div></div>
}
function Metric({label,value}:{label:string,value:any}){return <div className="metric"><strong>{value}</strong><span>{label}</span></div>}
