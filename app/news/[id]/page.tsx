import { notFound } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faClock, faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Comments } from "@/components/comments";
import { ApiArticle, publicApi } from "@/lib/api";

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const live = await publicApi<ApiArticle>(`/articles/public/${id}`).catch(() => null);
  if (!live) notFound();
  const story = { id: live.id, title: live.title, category: live.category.name, summary: live.excerpt, image: live.featuredImage?.deliveryUrl || "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1400&q=80", time: live.publishedAt ? new Date(live.publishedAt).toLocaleDateString("ne-NP") : "भर्खरै", author: live.author.name };
  const relatedLive = await publicApi<ApiArticle[]>("/articles/public").catch(() => []);
  const related = relatedLive.filter(item => item.id !== story.id).slice(0,3).map(item=>({id:item.id,title:item.title,category:item.category.name,image:item.featuredImage?.deliveryUrl||"https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=600&q=80",time:""}));
  const articleText = live && typeof live.content === "object" ? live.content.text : undefined;
  return <><Header /><main><div className="ad container">विज्ञापनका लागि सुरक्षित स्थान <span>९७० × ९०</span></div><article className="article container"><div className="breadcrumbs"><Link href="/">गृहपृष्ठ</Link><span>/</span><Link href="/category/samachar">{story.category}</Link></div><span className="article-category">{story.category}</span><h1>{story.title}</h1><p className="article-deck">{story.summary || "सम्बन्धित पक्ष, विज्ञ र उपलब्ध तथ्यका आधारमा तयार गरिएको विस्तृत समाचार।"}</p><div className="article-meta"><div className="author-avatar">सू</div><div><strong>{story.author || "सूत्रधार संवाददाता"}</strong><span><FontAwesomeIcon icon={faClock} /> {story.time} · ५ मिनेट पढाइ</span></div><div className="share-actions"><button><FontAwesomeIcon icon={faBookmark} /></button><button><FontAwesomeIcon icon={faShareNodes} /></button></div></div><img className="article-hero" src={story.image} alt={story.title} /><small className="caption">तस्बिर: सूत्रधार अभिलेख</small><div className="article-layout"><div className="article-body">{articleText ? articleText.split("\n").filter(Boolean).map((paragraph,index)=><p key={index}>{paragraph}</p>) : <><p><b>काठमाडौं —</b> सरकारले उत्पादन, रोजगारी र पूर्वाधार विकासलाई केन्द्रमा राख्दै आगामी कार्यक्रमको तयारी अघि बढाएको छ।</p><p>सम्बन्धित मन्त्रालय तथा सरोकारवाला निकायसँग चरणबद्ध छलफल भइरहेको अधिकारीहरूले बताएका छन्।</p></>}</div><aside><div className="ad sidebar-ad">विज्ञापन<br /><small>३०० × २५०</small></div></aside></div><div className="tags"><b>सम्बन्धित विषय:</b><a href="#">सरकार</a><a href="#">अर्थतन्त्र</a><a href="#">रोजगारी</a></div><section className="related"><div className="section-heading"><h2>सम्बन्धित समाचार</h2></div><div className="related-grid">{related.map(item => <article key={item.id}><Link href={`/news/${item.id}`}><img src={item.image} alt="" /><span>{item.category}</span><h3>{item.title}</h3></Link></article>)}</div></section><Comments articleId={String(story.id)} /></article></main><Footer /></>;
}
