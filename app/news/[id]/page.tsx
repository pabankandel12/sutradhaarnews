import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Comments } from "@/components/comments";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ApiArticle, publicApi } from "@/lib/api";

export const revalidate = 60;

const site = process.env.NEXT_PUBLIC_SITE_URL || "https://sutradhaarnews.vercel.app";
const getArticle = (id: string) => publicApi<ApiArticle>(`/articles/public/${encodeURIComponent(id)}`).catch(() => null);
const imageFor = (article: ApiArticle) => {
  const media = article.featuredImage;
  return media?.url?.startsWith("http") && !media.url.includes("res.cloudinary.com/") ? media.url : media?.deliveryUrl || media?.url;
};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const article = await getArticle((await params).id);
  if (!article) return {};
  const image = imageFor(article);
  const url = `${site}/news/${article.slug}`;
  return {
    title: article.seoTitle || article.title,
    description: article.seoDescription || article.excerpt,
    alternates: { canonical: article.canonicalUrl || url },
    openGraph: { type: "article", title: article.seoTitle || article.title, description: article.seoDescription || article.excerpt || undefined, url, images: image ? [{ url: image }] : [] },
    twitter: { card: "summary_large_image", title: article.seoTitle || article.title, description: article.seoDescription || article.excerpt || undefined, images: image ? [image] : [] },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const article = await getArticle((await params).id);
  if (!article) notFound();
  const related = await publicApi<ApiArticle[]>(`/articles/public/related/${article.slug}`).catch(() => []);
  const richContent = typeof article.content === "object" ? article.content?.html : undefined;
  const content = typeof article.content === "object" ? article.content?.text : article.content;
  const image = imageFor(article);
  const url = `${site}/news/${article.slug}`;
  const jsonLd = { "@context": "https://schema.org", "@type": "NewsArticle", headline: article.title, description: article.excerpt, datePublished: article.publishedAt, dateModified: article.publishedAt, mainEntityOfPage: url, author: { "@type": "Person", name: article.author.name }, publisher: { "@type": "Organization", name: "सूत्रधार न्यूज", logo: { "@type": "ImageObject", url: `${site}/logo.png` } }, image: image ? [image] : undefined };

  return <>
    <Header />
    <main><article className="article container">
      <div className="breadcrumbs"><Link href="/">गृहपृष्ठ</Link><span>/</span><Link href={`/category/${article.category.slug}`}>{article.category.name}</Link></div>
      <span className="article-category">{article.category.name}</span><h1>{article.title}</h1>
      {article.excerpt && <p className="article-deck">{article.excerpt}</p>}
      <div className="article-meta"><div className="author-avatar">{article.author.avatarUrl ? <img src={article.author.avatarUrl} alt={`${article.author.name} को प्रोफाइल`} /> : "सू"}</div><div><strong>{article.author.name}</strong><span>{article.publishedAt ? new Date(article.publishedAt).toLocaleString("ne-NP") : ""}</span></div></div>
      {image && <><img className="article-hero" src={image} alt={article.title} /><small className="caption">{article.featuredImage?.title || "तस्बिर: सूत्रधार न्यूज"}</small></>}
      <div className="article-layout"><div className="article-body">{richContent ? <div className="rich-article-content" dangerouslySetInnerHTML={{ __html: richContent }} /> : content ? content.split("\n").filter(Boolean).map((paragraph, index) => <p key={index}>{paragraph}</p>) : <p>यस समाचारको विस्तृत सामग्री उपलब्ध छैन।</p>}</div></div>
      {article.tags?.length ? <div className="tags"><b>सम्बन्धित विषय:</b>{article.tags.map((tag) => <Link href={`/search?q=${encodeURIComponent(tag.name)}`} key={tag.id}>{tag.name}</Link>)}</div> : null}
      <section className="related"><div className="section-heading"><h2>सम्बन्धित समाचार</h2></div><div className="related-grid">{related.map((story) => { const relatedImage = imageFor(story); return <article key={story.id}><Link href={`/news/${story.slug}`}>{relatedImage && <img src={relatedImage} alt={story.title} />}<span>{story.category.name}</span><h3>{story.title}</h3></Link></article>; })}</div></section>
      {article.allowComments && <Comments articleId={article.id} />}
    </article></main>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <Footer />
  </>;
}
