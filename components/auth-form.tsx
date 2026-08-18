"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { browserApi } from "@/lib/api";

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const registering = mode === "register";
  const router = useRouter();
  const [message, setMessage] = useState("");
  const submit = async (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); const form=new FormData(event.currentTarget);setMessage("");try{const result=await browserApi<{accessToken:string}>(`/auth/${registering?"register":"login"}`,{method:"POST",body:JSON.stringify({name:form.get("name"),email:form.get("email"),password:form.get("password")})});localStorage.setItem("sutradhaar_reader_token",result.accessToken);router.push("/profile");}catch(error){setMessage(error instanceof Error?error.message:"लगइन हुन सकेन")} };
  return <div className="auth-card"><div className="auth-brand"><span>सूत्रधार</span><small>पाठक खाता</small></div><h1>{registering ? "नयाँ खाता बनाउनुहोस्" : "आफ्नो खातामा लगइन गर्नुहोस्"}</h1><p>{registering ? "समाचारमा प्रतिक्रिया दिन र मनपर्ने सामग्री सुरक्षित गर्न खाता बनाउनुहोस्।" : "प्रतिक्रिया, सुरक्षित समाचार र व्यक्तिगत अनुभवका लागि लगइन गर्नुहोस्।"}</p><form onSubmit={submit}>{registering && <label>पूरा नाम<input required name="name" placeholder="तपाईंको पूरा नाम" /></label>}<label>इमेल ठेगाना<input required type="email" name="email" placeholder="name@example.com" /></label><label>पासवर्ड<input required type="password" name="password" minLength={8} placeholder="कम्तीमा ८ अक्षर" /></label>{registering && <label className="check"><input type="checkbox" required /> म प्रयोगका सर्त र गोपनीयता नीतिमा सहमत छु।</label>}<button className="auth-submit" type="submit">{registering ? "खाता बनाउनुहोस्" : "लगइन गर्नुहोस्"}</button>{message && <div className="form-message">{message}</div>}</form><div className="auth-switch">{registering ? "पहिले नै खाता छ?" : "खाता छैन?"} <Link href={registering ? "/login" : "/register"}>{registering ? "लगइन" : "नयाँ खाता"}</Link></div></div>;
}
