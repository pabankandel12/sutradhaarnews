"use client";

import { FormEvent, useState } from "react";
import { useEffect } from "react";
import { browserApi } from "@/lib/api";

type Comment = { id: number; name: string; text: string; time: string };
const initial: Comment[] = [
  { id: 1, name: "आरती शर्मा", text: "समाचारले उठाएको विषय महत्त्वपूर्ण छ। कार्यान्वयन पक्षमा पनि निरन्तर खबरदारी आवश्यक छ।", time: "१८ मिनेट अगाडि" },
  { id: 2, name: "सुरेश थापा", text: "यस्ता विस्तृत र तथ्यमा आधारित सामग्री अझै पढ्न पाइयोस्।", time: "४५ मिनेट अगाडि" },
];

export function Comments({articleId}:{articleId:string}) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");
  useEffect(()=>{browserApi<Array<{id:string;body:string;createdAt:string;user:{name:string}}>>(`/comments/article/${articleId}`).then(items=>setComments(items.map(item=>({id:Number.parseInt(item.id.slice(-8),36)||Date.now(),name:item.user.name,text:item.body,time:new Date(item.createdAt).toLocaleDateString("ne-NP")})))).catch(()=>{})},[articleId]);
  const submit = async (event: FormEvent) => { event.preventDefault(); if (!text.trim()) return; try{await browserApi(`/comments/article/${articleId}`,{method:"POST",body:JSON.stringify({body:text.trim()})});setComments([{ id: Date.now(), name: "तपाईं", text: text.trim(), time: "समीक्षामा" }, ...comments]);setText("");}catch(error){alert(error instanceof Error?error.message:"प्रतिक्रिया पठाउन सकिएन")} };
  return <section className="comments"><div className="section-heading"><h2>प्रतिक्रिया ({comments.length})</h2></div><form onSubmit={submit}><label htmlFor="comment">आफ्नो प्रतिक्रिया लेख्नुहोस्</label><textarea id="comment" value={text} onChange={(event) => setText(event.target.value)} placeholder="मर्यादित र विषयसँग सम्बन्धित प्रतिक्रिया लेख्नुहोस्..." /><div className="comment-actions"><small>प्रतिक्रिया प्रकाशित भएपछि सम्पादकीय समीक्षा हुन सक्छ।</small><button type="submit">प्रतिक्रिया पठाउनुहोस्</button></div></form><div className="comment-list">{comments.map(comment => <article key={comment.id}><div className="comment-avatar">{comment.name.charAt(0)}</div><div><h3>{comment.name}<time>{comment.time}</time></h3><p>{comment.text}</p><button>जवाफ दिनुहोस्</button></div></article>)}</div></section>;
}
