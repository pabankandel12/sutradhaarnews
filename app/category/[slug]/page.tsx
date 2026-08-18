import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { StoryList } from "@/components/story-list";
import { allStories, categoryMap } from "@/lib/content";
import { apiArticleToStory } from "@/lib/content";
import { ApiArticle, publicApi } from "@/lib/api";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const title = categoryMap[slug];
  if (!title) notFound();
  const live = await publicApi<ApiArticle[]>("/articles/public").catch(() => []);
  let stories = live.filter(story => story.category.slug === slug).map(apiArticleToStory);
  
  return <><Header /><main className="container inner-page"><div className="breadcrumbs"><a href="/">गृहपृष्ठ</a><span>/</span>{title}</div><header className="archive-header"><span>सूत्रधार विशेष</span><h1>{title}</h1><p>{title}सँग सम्बन्धित ताजा समाचार, विश्लेषण, अन्तर्वार्ता र विशेष रिपोर्टहरू।</p></header><div className="content-with-sidebar"><StoryList stories={stories} /><aside><div className="ad sidebar-ad">विज्ञापन<br /><small>३०० × २५०</small></div><div className="newsletter"><h3>सूत्रधार अपडेट</h3><p>मुख्य समाचार सिधै आफ्नो इमेलमा पाउनुहोस्।</p><input type="email" placeholder="इमेल ठेगाना" /><button>सदस्य बन्नुहोस्</button></div></aside></div></main><Footer /></>;
}
