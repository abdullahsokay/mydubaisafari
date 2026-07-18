import type { MetadataRoute } from "next";
import { listTourSlugs } from "@/lib/catalog/repository";
import { getAllPosts } from "@/lib/blog/repository";
import { SITE_URL as BASE_URL } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [tourSlugs, posts] = await Promise.all([
    listTourSlugs(),
    Promise.resolve(getAllPosts()),
  ]);

  // Build-time timestamp for pages without their own change date. This file is
  // generated at build, so `now` = deploy time — a real signal, not a
  // per-request "changed today" that trains crawlers to ignore lastModified.
  const now = new Date();

  // Core static pages
  const corePages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/tours`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/reviews`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/policy/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/policy/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/policy/cancellation`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Tour detail pages
  const tourPages: MetadataRoute.Sitemap = tourSlugs.map((slug) => ({
    url: `${BASE_URL}/tours/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  // Blog post pages — use each post's real published date so lastModified is
  // a meaningful per-URL signal (falls back to build time if a date is blank).
  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : now,
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  return [...corePages, ...tourPages, ...blogPages];
}
