import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request:Request,{params}:{params:Promise<{id:string}>}){
 const {id}=await params;const body=await request.json();const answers=body.answers||{};const supabase=await createClient();
 const {data:{user}}=await supabase.auth.getUser();if(!user)return NextResponse.json({error:"Login required"},{status:401});
 const {data:test}=await supabase.from("tests").select("id,published,test_questions(question_id,questions(id,correct_index))").eq("id",id).single();
 if(!test||!test.published)return NextResponse.json({error:"Test not available"},{status:404});
 const qs=(test.test_questions||[]).map((x:any)=>x.questions).filter(Boolean);let score=0;
 for(const q of qs)if(Number(answers[q.id])===Number(q.correct_index))score++;
 const {data:attempt,error}=await supabase.from("attempts").insert({user_id:user.id,test_id:id,submitted_at:new Date().toISOString(),score,total:qs.length,answers}).select("id").single();
 if(error)return NextResponse.json({error:error.message},{status:500});
 return NextResponse.json({attemptId:attempt.id,score,total:qs.length});
}
