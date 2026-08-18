import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { faArrowRight, faCirclePlay, faClock, faFire, faRadio } from "@fortawesome/free-solid-svg-icons";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { latest, leadStories, videos, type Story } from "@/lib/content";
import { apiArticleToStory } from "@/lib/content";
import { ApiArticle, publicApi } from "@/lib/api";
import { AdSlot } from "@/components/ad-slot";
type HomeSection={id:string;type:string;items:Array<{article:{id:string}}>};

function Meta({ story }: { story: Story }) { return <div className="meta"><span><FontAwesomeIcon icon={faClock} /> {story.time}</span>{story.author && <span>{story.author}</span>}</div>; }

export default async function Home() {
  const [live,layout]=await Promise.all([publicApi<ApiArticle[]>("/articles/public").catch(()=>[]),publicApi<HomeSection[]>("/homepage").catch(()=>[])]);
  const orderedIds=layout.flatMap(section=>section.items.map(item=>item.article.id));
  const ordered=orderedIds.length?[...orderedIds.map(id=>live.find(article=>article.id===id)).filter((article):article is ApiArticle=>Boolean(article)),...live.filter(article=>!orderedIds.includes(article.id))]:live;
  const liveStories = ordered.map(apiArticleToStory);
  const homeStories = liveStories;
  const latestStories = liveStories.slice(0, 6);
  const videoStories = live.filter(item => item.type === "VIDEO").map(apiArticleToStory);
  const [lead, ...side] = homeStories;
  if (!lead) return <><Header/><main className="container inner-page"><div className="empty-state"><h1>समाचार प्रकाशनको तयारीमा</h1><p>न्युजरुमबाट स्वीकृत समाचार प्रकाशित भएपछि यहाँ देखिनेछ।</p></div></main><Footer/></>;
  return <>
    <Header />
    <main>
      <div className="breaking"><div className="container breaking-inner"><strong><FontAwesomeIcon icon={faRadio} /> ब्रेकिङ</strong><span>सरकार र सरोकारवालाबीच महत्त्वपूर्ण सहमति, विस्तृत विवरण आउँदै</span><time>अहिले</time></div></div>
      <div className="container"><AdSlot placement="HEADER"/></div>

      <section className="container hero-grid">
        <article className="lead-card"><Link href={`/news/${lead.id}`}><div className="image-wrap"><img src={lead.image} alt="" /><span className="category">{lead.category}</span></div><h1>{lead.title}</h1></Link><p>{lead.summary}</p><Meta story={lead} /></article>
        <div className="side-stories">{side.map(story => <article className="side-card" key={story.id}><Link href={`/news/${story.id}`}><div className="image-wrap"><img src={story.image} alt="" /><span className="category">{story.category}</span></div><h2>{story.title}</h2></Link><Meta story={story} /></article>)}</div>
        <aside className="trending"><div className="section-heading compact"><h2><FontAwesomeIcon icon={faFire} /> लोकप्रिय</h2></div>{latestStories.slice(0, 4).map((story, i) => <article key={story.id}><b>{String(i + 1).padStart(2, "0")}</b><div><span>{story.category}</span><h3>{story.title}</h3></div></article>)}</aside>
      </section>

      <section className="container section"><div className="section-heading"><h2>ताजा अपडेट</h2><Link href="/category/samachar">सबै हेर्नुहोस् <FontAwesomeIcon icon={faArrowRight} /></Link></div><div className="latest-grid">{latestStories.map(story => <article className="story-card" key={story.id}><Link href={`/news/${story.id}`}><img src={story.image} alt="" /></Link><div><span className="text-category">{story.category}</span><h3><Link href={`/news/${story.id}`}>{story.title}</Link></h3><Meta story={story} /></div></article>)}</div></section>

      {videoStories.length>0&&<section className="video-section"><div className="container section"><div className="section-heading light"><h2>भिडियो</h2></div><div className="video-grid">{videoStories.map(story => <article key={story.id}><div className="video-image"><img src={story.image} alt="" /><FontAwesomeIcon className="play" icon={faCirclePlay} /></div><span>{story.category}</span><h3>{story.title}</h3></article>)}</div></div></section>}

      <section className="container section"><div className="section-heading"><h2>विचार</h2><a href="#">सबै विचार <FontAwesomeIcon icon={faArrowRight} /></a></div><div className="opinion-grid">{["देश बनाउने बहस अब परिणाममा केन्द्रित गरौँ", "डिजिटल युगमा जिम्मेवार पत्रकारिताको आवश्यकता", "युवालाई स्वदेशमै अवसर कसरी सिर्जना गर्ने?"].map((title, i) => <article key={title}><div className="avatar">{["अ", "स", "प"][i]}</div><div><h3>{title}</h3><p>{["अनिल श्रेष्ठ", "सुमना कार्की", "प्रदीप अधिकारी"][i]}</p></div></article>)}</div></section>
    </main>
    <Footer />
  </>;
}
