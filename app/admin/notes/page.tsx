import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { AdminNav } from "../page";

export const dynamic="force-dynamic";

export default async function AdminNotes(){
 await requireAdmin();const s=await createClient();const {data:notes=[]}=await s.from("notes").select("id,slug,title_en,published,created_at,categories(name_en)").order("created_at",{ascending:false});
 return <div className="page"><div className="container admin-layout"><AdminNav/><div className="admin-main"><div className="section-head"><div><span className="badge">CMS</span><h1 className="page-title">Notes</h1></div><Link className="btn primary" href="/admin/notes/new">+ New Note</Link></div><div className="table-wrap"><table className="table"><thead><tr><th>Title</th><th>Category</th><th>Status</th><th>Action</th></tr></thead><tbody>{notes.map((n:any)=><tr key={n.id}><td>{n.title_en}</td><td>{n.categories?.name_en||"—"}</td><td><span className="badge">{n.published?"Published":"Draft"}</span></td><td><span className="small">ID {n.id.slice(0,8)}</span></td></tr>)}</tbody></table></div></div></div></div>
}
