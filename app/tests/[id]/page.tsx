import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { TestRunner } from "@/components/TestRunner";

export const dynamic="force-dynamic";

export default async function TestPage({params}:{params:Promise<{id:string}>}){
 const {id}=await params; const supabase=await createClient();
 const {data:test}=await supabase.from("tests").select("id,title_en,title_as,duration_minutes,test_questions(position,questions(id,question_en,question_as,options,explanation_en,explanation_as))").eq("id",id).eq("published",true).single();
 if(!test)notFound();
 const questions=(test.test_questions||[]).sort((a:any,b:any)=>a.position-b.position).map((x:any)=>x.questions);
 return <div className="page"><div className="container"><TestRunner test={{id:test.id,title:test.title_en,duration:test.duration_minutes}} questions={questions}/></div></div>
}
