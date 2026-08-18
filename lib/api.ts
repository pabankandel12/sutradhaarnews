export const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://sutradhaarnews-api.onrender.com/api/v1";

export type ApiArticle = {
  id:string; title:string; slug:string; excerpt?:string; content?:{text?:string}|string; type:string; status:string;
  category:{id:string;name:string;slug:string}; author:{id:string;name:string}; featuredImage?:{id:string;deliveryUrl?:string;url:string}|null;
  publishedAt?:string; createdAt:string; allowComments:boolean;
};

export type ApiCategory = { id:string; name:string; slug:string };

export async function publicApi<T>(path:string, options:RequestInit={}) {
  const response = await fetch(`${API_URL}${path}`, { ...options, headers:{"Content-Type":"application/json",...options.headers}, next: options.method ? undefined : { revalidate: 60 } });
  if(!response.ok) throw new Error(`API request failed: ${response.status}`);
  return response.json() as Promise<T>;
}

export async function browserApi<T>(path:string, options:RequestInit={}) {
  const token = typeof window!=="undefined" ? localStorage.getItem("sutradhaar_reader_token") : null;
  const response=await fetch(`${API_URL}${path}`,{...options,headers:{"Content-Type":"application/json",...(token?{Authorization:`Bearer ${token}`}:{ }),...options.headers}});
  const body=await response.json().catch(()=>({}));
  if(!response.ok) throw new Error(Array.isArray(body.message)?body.message.join(", "):body.message||"अनुरोध पूरा भएन");
  return body as T;
}
