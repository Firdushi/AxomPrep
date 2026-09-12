"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Q={id:string;question_en:string;question_as?:string;options:string[];explanation_en?:string;explanation_as?:string};
export function TestRunner({test,questions}:{test:{id:string;title:string;duration:number};questions:Q[]}){
 const router=useRouter();const [index,setIndex]=useState(0);const [answers,setAnswers]=useState<Record<string,number>>({});const [seconds,setSeconds]=useState(test.duration*60);const [submitting,setSubmitting]=useState(false);
 useEffect(()=>{const t=setInterval(()=>setSeconds(s=>{if(s<=1){clearInterval(t);submit();return 0}return s-1}),1000);return()=>clearInterval(t)},[]);
 const current=questions[index]; const mins=Math.floor(seconds/60).toString().padStart(2,"0"), secs=(seconds%60).toString().padStart(2,"0");
 async function submit(){if(submitting)return;setSubmitting(true);const r=await fetch(`/api/tests/${test.id}/submit`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({answers})});const data=await r.json();if(!r.ok){alert(data.error||"Could not submit");setSubmitting(false);return}router.push(`/tests/${test.id}/result?attempt=${data.attemptId}`)}
 if(!current)return <div className="empty">This test has no questions yet.</div>;
 return <><div className="section-head"><div><span className="badge">QUESTION {index+1} / {questions.length}</span><h1 className="page-title">{test.title}</h1></div></div><div className="test-layout"><div className="question-card"><h2>{current.question_en}</h2><p className="muted">{current.question_as}</p>{current.options.map((o,i)=><label className={`option ${answers[current.id]===i?"selected":""}`} key={i}><input type="radio" name={current.id} checked={answers[current.id]===i} onChange={()=>setAnswers(a=>({...a,[current.id]:i}))}/><span>{o}</span></label>)}<div className="hero-actions"><button className="btn ghost" disabled={index===0} onClick={()=>setIndex(i=>i-1)}>Previous</button>{index<questions.length-1?<button className="btn primary" onClick={()=>setIndex(i=>i+1)}>Next</button>:<button className="btn primary" disabled={submitting} onClick={submit}>{submitting?"Submitting…":"Submit Test"}</button>}</div></div><aside className="timer"><span>TIME LEFT</span><strong>{mins}:{secs}</strong><span className="small">{Object.keys(answers).length}/{questions.length} answered</span></aside></div></>
}
