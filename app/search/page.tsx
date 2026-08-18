"use client";

import { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { StoryList } from "@/components/story-list";
import { allStories } from "@/lib/content";
import { apiArticleToStory, type Story } from "@/lib/content";
import { ApiArticle, browserApi } from "@/lib/api";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [stories,setStories]=useState<Story[]>([]);
  useEffect(()=>{browserApi<ApiArticle[]>("/articles/public").then(items=>items.length&&setStories(items.map(apiArticleToStory))).catch(()=>{})},[]);
  const results = useMemo(() => query.trim() ? stories.filter(story => `${story.title} ${story.category} ${story.summary || ""}`.toLowerCase().includes(query.trim().toLowerCase())) : stories.slice(0, 5), [query,stories]);
  return <><Header /><main className="container inner-page"><header className="archive-header"><span>खोज</span><h1>समाचार खोज्नुहोस्</h1><p>शीर्षक, विषय वा समाचारको शब्द लेखेर खोज्नुहोस्।</p></header><div className="search-box"><FontAwesomeIcon icon={faMagnifyingGlass} /><input autoFocus value={query} onChange={event => setQuery(event.target.value)} placeholder="उदाहरण: अर्थतन्त्र, खेलकुद, प्रविधि..." /></div><p className="result-count">{query ? `“${query}” का लागि ${results.length} नतिजा` : "हालका प्रमुख समाचार"}</p>{results.length ? <StoryList stories={results} /> : <div className="empty-state"><h2>समाचार भेटिएन</h2><p>फरक वा छोटो शब्द प्रयोग गरेर पुनः खोज्नुहोस्।</p></div>}</main><Footer /></>;
}
