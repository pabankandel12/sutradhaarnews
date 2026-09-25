import type { MetadataRoute } from "next";
import { ApiArticle, ApiCategory, publicApi } from "@/lib/api";
const site = process.env.NEXT_PUBLIC_SITE_URL || "https://sutradhaarnews.vercel.app";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> { const [articles, categories] = await Promise.all([publicApi<ApiArticle[]>("/articles/public").catch(() => []), publicApi<ApiCategory[]>("/categories").catch(() => [])]); return [{ url: site, lastModified: new Date() }, ...categories.map((category) => ({ url: `${site}/category/${category.slug}`, lastModified: new Date() })), ...articles.map((article) => ({ url: `${site}/news/${article.slug}`, lastModified: new Date(article.publishedAt || article.createdAt) }))]; }
