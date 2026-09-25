import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { faArrowRight, faCirclePlay, faClock, faFire, faRadio } from "@fortawesome/free-solid-svg-icons";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { apiArticleToStory, type Story } from "@/lib/content";
import { ApiArticle, ApiHeadline, publicApi } from "@/lib/api";
import { AdSlot } from "@/components/ad-slot";

type HomeSection = { id: string; name: string; title?: string; type: string; items: Array<{ article: ApiArticle }> };
const href = (story: Story) => `/news/${story.slug || story.id}`;
function Meta({ story }: { story: Story }) { return <div className="meta"><span><FontAwesomeIcon icon={faClock} /> {story.time}</span>{story.author && <span>{story.author}</span>}</div>; }
function Headlines({ headlines }: { headlines: ApiHeadline[] }) { const primary = headlines.find((item) => item.isBreaking) || headlines[0]; return primary ? <div className="breaking"><div className="container breaking-inner"><strong><FontAwesomeIcon icon={faRadio} /> {primary.isBreaking ? "ब्रेकिङ" : "शीर्षक"}</strong><span><Link href={primary.url || "/"}>{primary.title}</Link></span><time>अहिले</time></div></div> : null; }

export default async function Home() {
  const [articles, sections, headlines, popular] = await Promise.all([publicApi<ApiArticle[]>("/articles/public").catch(() => []), publicApi<HomeSection[]>("/homepage").catch(() => []), publicApi<ApiHeadline[]>("/headline/public").catch(() => []), publicApi<ApiArticle[]>("/articles/public/popular?limit=5").catch(() => [])]);
  const selected = sections.flatMap((section) => section.items.map((item) => item.article));
  const all = [...selected, ...articles].filter((article, index, list) => list.findIndex((item) => item.id === article.id) === index);
  const stories = all.map(apiArticleToStory), [lead, ...side] = stories, latest = stories.slice(1, 7), trending = popular.map(apiArticleToStory), videos = articles.filter((article) => article.type === "VIDEO").map(apiArticleToStory);
  if (!lead) return <><Header /><main className="container inner-page"><div className="empty-state"><h1>समाचार प्रकाशनको तयारीमा</h1><p>प्रकाशित समाचार यहाँ देखिनेछ।</p></div></main><Footer /></>;
  return <><Header /><main><Headlines headlines={headlines} /><div className="container"><AdSlot placement="HEADER" /></div>
    <section className="container hero-grid"><article className="lead-card"><Link href={href(lead)}><div className="image-wrap"><img src={lead.image} alt={lead.title} /><span className="category">{lead.category}</span></div><h1>{lead.title}</h1></Link>{lead.summary && <p>{lead.summary}</p>}<Meta story={lead} /></article><div className="side-stories">{side.slice(0, 2).map((story) => <article className="side-card" key={String(story.id)}><Link href={href(story)}><div className="image-wrap"><img src={story.image} alt={story.title} /><span className="category">{story.category}</span></div><h2>{story.title}</h2></Link><Meta story={story} /></article>)}</div><aside className="trending"><div className="section-heading compact"><h2><FontAwesomeIcon icon={faFire} /> लोकप्रिय</h2></div>{trending.map((story, index) => <article key={String(story.id)}><b>{String(index + 1).padStart(2, "0")}</b><div><span>{story.category}</span><h3><Link href={href(story)}>{story.title}</Link></h3></div></article>)}</aside></section>
    <section className="container section"><div className="section-heading"><h2>ताजा अपडेट</h2><Link href="/search">सबै हेर्नुहोस् <FontAwesomeIcon icon={faArrowRight} /></Link></div><div className="latest-grid">{latest.map((story) => <article className="story-card" key={String(story.id)}><Link href={href(story)}><img src={story.image} alt={story.title} /></Link><div><span className="text-category">{story.category}</span><h3><Link href={href(story)}>{story.title}</Link></h3><Meta story={story} /></div></article>)}</div></section>
    {sections.filter((section) => section.type === "CATEGORY" || section.type === "OPINION").map((section) => { const items = section.items.map((item) => apiArticleToStory(item.article)); return items.length ? <section className="container section" key={section.id}><div className="section-heading"><h2>{section.title || section.name}</h2></div><div className="latest-grid">{items.slice(0, 6).map((story) => <article className="story-card" key={String(story.id)}><Link href={href(story)}><img src={story.image} alt={story.title} /></Link><div><span className="text-category">{story.category}</span><h3><Link href={href(story)}>{story.title}</Link></h3><Meta story={story} /></div></article>)}</div></section> : null; })}
    {videos.length > 0 && <section className="video-section"><div className="container section"><div className="section-heading light"><h2>भिडियो</h2></div><div className="video-grid">{videos.slice(0, 3).map((story) => <article key={String(story.id)}><Link href={href(story)}><div className="video-image"><img src={story.image} alt={story.title} /><FontAwesomeIcon className="play" icon={faCirclePlay} /></div><span>{story.category}</span><h3>{story.title}</h3></Link></article>)}</div></div></section>}
  </main><Footer /></>;
}
