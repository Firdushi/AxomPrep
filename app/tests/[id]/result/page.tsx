import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/auth";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic="force-dynamic";

export default async function Result({params,searchParams}:{params:Promise<{id:string}>,searchParams:Promise<{attempt?:string}>}){
 const {id}=await params;const {attempt}=await searchParams;await requireUser();if(!attempt)notFound();const supabase=await createClient();
 const {data:a}=await supabase.from("attempts").select("*,tests(title_en)").eq("id",attempt).eq("test_id",id).single();if(!a)notFound();
 const pct=a.total?Math.round(a.score/a.total*100):0;
 return <div className="page"><div className="container"><div className="auth-card" style={{margin:"30px auto",textAlign:"center"}}><span className="badge">TEST COMPLETE</span><h1 className="page-title">{pct}%</h1><p className="muted">{a.tests?.title_en}</p><h2>{a.score} / {a.total}</h2><p>{pct>=80?"Excellent performance. Keep it up!":pct>=50?"Good attempt. Review the explanations and try again.":"Use this attempt to identify weak areas and improve."}</p><div className="hero-actions" style={{justifyContent:"center"}}><Link className="btn primary" href="/tests">More Tests</Link><Link className="btn ghost" href="/dashboard">Dashboard</Link></div></div></div></div>
}
