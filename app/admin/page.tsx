import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export const dynamic="force-dynamic";

export default async function Admin(){
 await requireAdmin();const s=await createClient();
 const [{count:notes},{count:questions},{count:tests},{count:users}]=await Promise.all([
 s.from("notes").select("*",{count:"exact",head:true}),s.from("questions").select("*",{count:"exact",head:true}),s.from("tests").select("*",{count:"exact",head:true}),s.from("profiles").select("*",{count:"exact",head:true})
 ]);
 return <div className="page"><div className="container admin-layout"><AdminNav/><div className="admin-main"><span className="badge">ADMIN CONTROL CENTER</span><h1 className="page-title">Content & Platform</h1><p className="muted">Manage your study platform from one place.</p><div className="dashboard-grid"><Metric label="Notes" value={notes??0}/><Metric label="Questions" value={questions??0}/><Metric label="Tests" value={tests??0}/><Metric label="Users" value={users??0}/></div><section className="section"><div className="cards"><Link className="card" href="/admin/notes"><h3>Notes CMS</h3><p>Create, edit, publish and attach PDFs.</p></Link><Link className="card" href="/admin/questions"><h3>Question Bank</h3><p>Maintain bilingual MCQs and explanations.</p></Link><Link className="card" href="/admin/tests"><h3>Test Builder</h3><p>Create tests and arrange question order.</p></Link></div></section></div></div></div>
}
function Metric({label,value}:{label:string,value:any}){return <div className="metric"><strong>{value}</strong><span>{label}</span></div>}
export function AdminNav(){return <aside className="sidebar"><strong>Admin</strong><hr/><Link href="/admin">Overview</Link><Link href="/admin/notes">Notes</Link><Link href="/admin/questions">Questions</Link><Link href="/admin/tests">Tests</Link><Link href="/admin/categories">Categories</Link><Link href="/dashboard">Student Dashboard</Link></aside>}
