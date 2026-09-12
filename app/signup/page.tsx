"use client";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup(){
 const [name,setName]=useState("");const [email,setEmail]=useState("");const [password,setPassword]=useState("");const [error,setError]=useState("");const [message,setMessage]=useState("");const router=useRouter();
 async function submit(e:React.FormEvent){e.preventDefault();setError("");const {data,error}=await createClient().auth.signUp({email,password,options:{data:{full_name:name}}});if(error)setError(error.message);else if(data.session){router.push("/dashboard");router.refresh()}else setMessage("Account created. Check your email if email confirmation is enabled.")}
 return <div className="auth-wrap"><div className="auth-card"><span className="badge">JOIN AXOMPREP</span><h1>Create account</h1><p className="muted">Save your attempts and track your progress.</p>{error&&<div className="notice">{error}</div>}{message&&<div className="notice">{message}</div>}<form className="form" onSubmit={submit}><div><label className="label">Full name</label><input className="input" required value={name} onChange={e=>setName(e.target.value)}/></div><div><label className="label">Email</label><input className="input" type="email" required value={email} onChange={e=>setEmail(e.target.value)}/></div><div><label className="label">Password</label><input className="input" type="password" minLength={6} required value={password} onChange={e=>setPassword(e.target.value)}/></div><button className="btn primary">Create account</button></form><p className="small">Already registered? <Link href="/login">Log in</Link></p></div></div>
}
