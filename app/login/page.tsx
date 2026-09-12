"use client";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login(){
 const [email,setEmail]=useState(""); const [password,setPassword]=useState(""); const [error,setError]=useState(""); const [loading,setLoading]=useState(false); const router=useRouter();
 async function submit(e:React.FormEvent){e.preventDefault();setLoading(true);setError("");const {error}=await createClient().auth.signInWithPassword({email,password});if(error)setError(error.message);else{router.push("/dashboard");router.refresh()}setLoading(false)}
 return <div className="auth-wrap"><div className="auth-card"><span className="badge">WELCOME BACK</span><h1>Log in</h1><p className="muted">Continue your preparation.</p>{error&&<div className="notice">{error}</div>}<form className="form" onSubmit={submit}><div><label className="label">Email</label><input className="input" type="email" required value={email} onChange={e=>setEmail(e.target.value)}/></div><div><label className="label">Password</label><input className="input" type="password" required value={password} onChange={e=>setPassword(e.target.value)}/></div><button className="btn primary" disabled={loading}>{loading?"Logging in…":"Log in"}</button></form><p className="small">New here? <Link href="/signup">Create an account</Link></p></div></div>
}
