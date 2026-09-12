import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export const dynamic="force-dynamic";

export default async function GK(){
 const supabase=await createClient();const {data:notes=[]}=await supabase.from("notes").select("slug,title_en,title_as,excerpt_en").eq("published",true).eq("category_id",(await supabase.from("categories").select("id").eq("slug","assam-gk").single()).data?.id);
 return <div className="page"><div className="container"><span className="badge">ASSAM FOCUS</span><h1 className="page-title">Assam GK</h1><p className="muted">A dedicated area for Assam-focused general knowledge.</p><div className="grid">{notes.map((n:any)=><Link href={`/notes/${n.slug}`} className="card" key={n.slug}><h3>{n.title_en}</h3><p>{n.excerpt_en}</p><span className="small">{n.title_as}</span></Link>)}</div>{!notes.length&&<div className="empty">Assam GK content will appear here after the admin publishes it.</div>}</div></div>
}
