"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { PostMeta } from "@/lib/blog/repository";
import { formatPostDate } from "@/lib/blog/format";
import { Badge } from "@/components/ui/badge";
import { getCategory } from "@/lib/blog/categories";

interface BlogSearchProps {
  posts: PostMeta[];
}

export function BlogSearch({ posts }: BlogSearchProps) {
  const [query, setQuery] = useState("");

  const filtered = query.trim()
    ? posts.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.excerpt.toLowerCase().includes(query.toLowerCase())
      )
    : posts;

  return (
    <div>
      <div className="relative mb-8">
        <input
          type="search"
          aria-label="Search articles"
          placeholder="Search articles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full max-w-xl rounded-full border-0 bg-white/10 px-5 py-3 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-orange backdrop-blur-sm"
        />
      </div>
      {query.trim() && (
        <div className="mt-4">
          {filtered.length === 0 ? (
            <p className="text-white/70">No articles found for &quot;{query}&quot;.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((post) => {
                const cat = getCategory(post.category);
                return (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="group block rounded-2xl overflow-hidden bg-surface shadow hover:shadow-lg transition-shadow">
                    <Image
                      src={post.cover}
                      alt={post.title}
                      width={400}
                      height={160}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="h-40 w-full object-cover"
                    />
                    <div className="p-4">
                      {cat && <Badge className="mb-2 text-xs">{cat.name}</Badge>}
                      <h3 className="font-semibold text-midnight group-hover:text-orange transition-colors line-clamp-2">{post.title}</h3>
                      <p className="mt-1 text-sm text-midnight/60 line-clamp-2">{post.excerpt}</p>
                      <p className="mt-2 text-xs text-midnight/40">{post.author} · {formatPostDate(post.date)} · {post.readingTime}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
