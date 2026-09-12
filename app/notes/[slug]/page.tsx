import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";

export const dynamic="force-dynamic";

export default async function NotePage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params; const supabase=await createClient();
 const {data:note}=await supabase.from("notes").select("*,categories(name_en,name_as)").eq("slug",slug).eq("published",true).single();
 if(!note)notFound();
 let pdfUrl=null;
 if(note.pdf_path){const {data}=await supabase.storage.from("notes-pdfs").createSignedUrl(note.pdf_path,600);pdfUrl=data?.signedUrl||null}
 return <div className="page"><div className="container"><Link className="small" href="/notes">← Back to notes</Link><div className="section-head" style={{marginTop:18}}><div><span className="badge">{note.categories?.name_en||"Notes"}</span><h1 className="page-title">{note.title_en}</h1><p className="muted">{note.title_as||""}</p></div>{pdfUrl&&<a className="btn primary" href={pdfUrl} target="_blank">Open PDF</a>}</div><div className="two-col"><article className="content-box"><h2>English</h2>{note.content_en}</article><article className="content-box"><h2>অসমীয়া</h2>{note.content_as||"Assamese version will be added by the admin."}</article></div></div></div>
}
