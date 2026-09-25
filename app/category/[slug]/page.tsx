import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { StoryList } from "@/components/story-list";
import { apiArticleToStory } from "@/lib/content";
import { ApiArticle, ApiCategory, ApiPage, publicApi } from "@/lib/api";

export default async function CategoryPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ page?: string }> }) {
  const { slug } = await params, { page = "1" } = await searchParams;
  const [categories, result] = await Promise.all([publicApi<ApiCategory[]>("/categories").catch(() => []), publicApi<ApiPage<ApiArticle>>(`/articles/public/page?category=${encodeURIComponent(slug)}&page=${encodeURIComponent(page)}`).catch(() => null)]);
  const category = categories.find((item) => item.slug === slug);
  if (!category) notFound();
  const stories = result?.data.map(apiArticleToStory) || [];
  return <><Header /><main className="container inner-page"><div className="breadcrumbs"><a href="/">गृहपृष्ठ</a><span>/</span>{category.name}</div><header className="archive-header"><span>समाचार श्रेणी</span><h1>{category.name}</h1><p>{category.description || `${category.name}सँग सम्बन्धित प्रकाशित समाचारहरू।`}</p></header><div className="content-with-sidebar"><div>{stories.length ? <StoryList stories={stories} /> : <div className="empty-state"><h2>समाचार भेटिएन</h2><p>यस श्रेणीमा हाल प्रकाशित समाचार छैन।</p></div>}{result && result.meta.totalPages > 1 && <nav className="pagination"><span>पृष्ठ {result.meta.page} / {result.meta.totalPages}</span></nav>}</div><aside><div className="ad sidebar-ad">विज्ञापन<br /><small>३०० × २५०</small></div></aside></div></main><Footer /></>;
}
